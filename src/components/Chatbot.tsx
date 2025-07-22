"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";
import { Message } from "../lib/Messages";
import { generateGeminiResponse } from "../lib/Gemini";
import ReactMarkdown from "react-markdown"; // ✅ Markdown support

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const hasInteracted = useRef(false);

  const playPopSound = () => {
    const audio = new Audio("/pop.mp3");
    audio.play().catch((err) => {
      console.warn("Pop sound blocked until interaction:", err);
    });
  };

  useEffect(() => {
    const enableSoundOnFirstInteraction = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        playPopSound();
        setIsOpen(true);
        setMessages([
          { role: "bot", text: "Hi sir/mam 👋 How can I help you today?" },
        ]);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener("click", enableSoundOnFirstInteraction, {
        once: true,
      });
      window.addEventListener("scroll", enableSoundOnFirstInteraction, {
        once: true,
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", enableSoundOnFirstInteraction);
      window.removeEventListener("scroll", enableSoundOnFirstInteraction);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    const reply = await generateGeminiResponse(input);
    const newBotMessage: Message = { role: "bot", text: reply };
    setMessages((prev) => [...prev, newBotMessage]);

    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => {
            playPopSound();
            setIsOpen(true);
            setMessages([
              { role: "bot", text: "Hi sir/mam 👋 How can I help you today?" },
            ]);
          }}
          className="rounded-full shadow-lg"
        >
          💬 Chat
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-[90vw] sm:w-[350px] z-50">
      <Card className="h-[500px] flex flex-col shadow-2xl rounded-2xl border bg-white dark:bg-[#1a1a1a]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-base">🍕 Pizza Bites Assistant</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardContent className="flex flex-col h-full p-4 pt-2 space-y-2 overflow-hidden">
          <ScrollArea className="flex-1 pr-2 space-y-2 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl max-w-[80%] mt-3 text-sm break-words whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-white ml-auto"
                    : "bg-muted text-black dark:text-white"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            <div ref={chatEndRef} />
          </ScrollArea>
          <div className="flex gap-2 pt-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} variant="default" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

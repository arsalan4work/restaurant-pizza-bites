export async function generateGeminiResponse(message: string) {
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      const data = await res.json();
      if (res.ok && data.response) {
        return data.response;
      } else {
        return "Sorry, I couldn't understand that.";
      }
    } catch (error) {
      console.error("Error calling /api/chatbot:", error);
      return "Sorry, something went wrong!";
    }
  }
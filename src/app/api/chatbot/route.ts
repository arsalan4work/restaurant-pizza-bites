import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { pizzaProducts, beveragesProducts } from "@/data/product";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build menu content as a structured markdown-like prompt
    const pizzas = pizzaProducts
      .map(
        (p) => `• **${p.name}** – ${p.description} ($${p.price.toFixed(2)})`
      )
      .join("\n");

    const beverages = beveragesProducts
      .map(
        (b) => `• **${b.name}** – ${b.description} ($${b.price.toFixed(2)})`
      )
      .join("\n");

    const systemPrompt = `
You are a helpful and friendly AI assistant for **Pizza Bites 🍕**.

Here’s our current menu:

### 🍕 Pizzas
${pizzas}

### 🥤 Beverages
${beverages}

---

Your job is to:
- Help users explore the menu.
- Answer questions about items.
- If they want to place an order, politely say:
👉 "Please go to the **Order** page to place your order manually."

Always be polite, helpful, and concise.

---

**User:** ${message}
**Assistant:**
`;

    const result = await model.generateContent([{ text: systemPrompt }]);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({
      response: "Sorry, something went wrong while processing your request.",
    });
  }
}

import { chatSystemPrompt } from "@/lib/prompts/chat-system-prompt";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Dynamically import Groq
    const Groq = (await import("groq-sdk")).default;
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: chatSystemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 800,
    });

    return new Response(
      JSON.stringify({ message: response.choices[0].message.content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch response from AI" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

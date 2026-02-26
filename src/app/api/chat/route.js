import { OpenAI } from "openai";

// Switching to Groq for FREE usage (OpenAI Compatible)
const client = new OpenAI({ 
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are a professional customer support assistant for Anoon (Anoon LLC).
Anoon is a digital agency based in Palestine, Gaza Strip, specializing in:
- Web development
- UI/UX design
- SEO
- Mobile apps

Contact Details:
- Email: info@anoonsolutions.com
- Phone: +972 567098648
- Working hours: Sun–Thu, 9am–5pm

Tone and Behavior:
- Professional, friendly, and clear.
- Be concise in your responses.
- Support both Arabic and English. Respond in the language used by the user.
- Answer questions about company services and pricing in a general way.
- If asked something unrelated to Anoon's services or the company, gently redirect the user to company-related topics.
- You are here to help potential clients and visitors understand what Anoon does and how to contact them.`;

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiMessage = response.choices[0].message.content;

    return new Response(JSON.stringify({ message: aiMessage }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Handle Quota/Billing errors specifically
    if (error.code === 'insufficient_quota') {
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI Billing Error: You have reached your quota or have no credits left.' 
        }), 
        { status: 402, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ error: 'Failed to fetch response from AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

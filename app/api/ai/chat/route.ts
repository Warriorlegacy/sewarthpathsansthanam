import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL: GROQ_API_KEY is missing from environment variables");
      return NextResponse.json(
        { error: "AI service is currently unavailable. Please check environment variables." }, 
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });
    const { messages } = await req.json();

    const systemPrompt = {
      role: 'system',
      content: `You are "Seva AI", a helpful and compassionate assistant for Sewarth Path Sansthanam, an NGO.
Your mission is to guide users on the NGO's mission focusing on Education, Health, Culture, and Social Welfare.
Knowledge Base:
- Membership Tiers: Volunteer, Annual, Supporter, and Lifetime.
- Goals: Help users understand how to donate, join as a member, or volunteer.
- Behavior: Be empathetic, professional, and welcoming. 
- Language: Reply in the same language the user uses (Bilingual: Hindi and English).
- If you don't know a specific detail, guide them to the contact page or the admin.`,
    };

    const completion = await groq.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const responseText = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error('Groq API Error Detail:', error);
    return NextResponse.json(
      { error: `AI Error: ${error.message || 'Unknown error occurred'}` }, 
      { status: 500 }
    );
  }
}

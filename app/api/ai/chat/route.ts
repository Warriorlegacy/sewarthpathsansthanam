import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
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
      model: 'llama3-8b-8192',
    });

    return NextResponse.json({ response: completion.choices[0].message.content });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

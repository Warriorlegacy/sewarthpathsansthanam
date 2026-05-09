import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { email, name, type } = await req.json();

    if (!email || !name || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sendWelcomeEmail({ email, name, type });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send-welcome error:', error);
    return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { sendReceiptEmail } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { email, name, amount, purpose, receiptNumber } = await req.json();

    if (!email || !name || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sendReceiptEmail({ email, name, amount, purpose, receiptNumber });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send-receipt error:', error);
    return NextResponse.json({ error: 'Failed to send receipt email' }, { status: 500 });
  }
}

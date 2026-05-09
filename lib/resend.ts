import { Resend } from 'resend';
import { groq } from './groq';

export const resend = new Resend(process.env.RESEND_API_KEY);

async function generateAIThanks(name: string, amount: string | number, purpose?: string) {
  try {
    const prompt = `Generate a heartfelt, personalized 2-sentence thank you message for a donation.
Donor Name: ${name}
Amount: ₹${amount}
Purpose: ${purpose || "General Donation"}

Return the response in JSON format with two keys: 'en' (English) and 'hi' (Hindi).
The messages should be warm, grateful, and professional.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (content) {
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("AI thanks generation failed:", error);
  }
  return { 
    en: "Thank you for your generous contribution. Your support makes a real difference in our mission.", 
    hi: "आपके उदार योगदान के लिए धन्यवाद। आपका समर्थन हमारे मिशन में वास्तविक बदलाव लाता है।" 
  };
}

export async function sendReceiptEmail({ email, name, amount, purpose, receiptNumber }: { email: string; name: string; amount: string | number; purpose?: string; receiptNumber?: string }) {
  const aiMessage = await generateAIThanks(name, amount, purpose);

  return resend.emails.send({
    from: 'Sewarth Path Sansthanam <onboarding@resend.dev>',
    to: email,
    subject: `Donation Receipt - ${receiptNumber || 'Thank You'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
        <div style="text-align: center; border-bottom: 4px solid #FF9933; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #FF9933; margin: 0;">Sewarth Path Sansthanam</h1>
          <p style="color: #138808; font-weight: bold; margin: 5px 0 0 0;">Serving Humanity with Love</p>
        </div>
        <p>Dear ${name},</p>
        <p style="font-size: 1.1em; font-weight: 500; color: #333;">${aiMessage.en}</p>
        <p style="font-size: 1.1em; font-weight: 500; color: #333; font-family: 'Noto Sans Devanagari', sans-serif;">${aiMessage.hi}</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #138808;">
          <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${amount}</p>
          <p style="margin: 5px 0;"><strong>Purpose:</strong> ${purpose || 'General Donation'}</p>
          <p style="margin: 5px 0;"><strong>Receipt Number:</strong> ${receiptNumber || 'N/A'}</p>
        </div>
        <p style="font-style: italic; color: #666; font-size: 0.9em;">Note: 80G tax exemption certificate will be issued once certification is complete.</p>
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 0.8em;">
          <p>&copy; ${new Date().getFullYear()} Sewarth Path Sansthanam. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}

export async function sendCertificateEmail({
  email,
  name,
  pdfBuffer,
  certificateType,
}: {
  email: string;
  name: string;
  pdfBuffer: Buffer;
  certificateType: string;
}) {
  // Validate environment
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY missing. Skipping certificate email.");
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Sewarth Path Sansthanam <onboarding@resend.dev>",
      to: email,
      subject: `Your Certificate - ${certificateType.toUpperCase()} - Sewarth Path Sansthanam`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <div style="text-align: center; border-bottom: 4px solid #FF9933; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #FF9933; margin: 0;">Sewarth Path Sansthanam</h1>
            <p style="color: #138808; font-weight: bold; margin: 5px 0 0 0;">Serving Humanity with Love</p>
          </div>
          <p>Dear ${name},</p>
          <p>Congratulations! Please find your certificate attached to this email.</p>
          <p>We appreciate your valuable contribution and look forward to your continued support.</p>
          <div style="text-align: center; margin: 30px 0;">
            <p style="font-style: italic; color: #666;">॥ श्री ॥</p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 0.8em;">
            <p>&copy; ${new Date().getFullYear()} Sewarth Path Sansthanam. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `${name.replace(/\s+/g, "_")}_Certificate.pdf`,
          content: pdfBuffer.toString("base64"),
        },
      ],
    });

    if (error) {
      console.error("Certificate email error:", error);
      return false;
    }
    return !!data?.id;
  } catch (error) {
    console.error("Certificate email exception:", error);
    return false;
  }
}

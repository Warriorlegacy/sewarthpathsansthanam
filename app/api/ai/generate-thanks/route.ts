import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { donorName, amount, purpose } = await req.json();

    if (!donorName || !amount) {
      return NextResponse.json({ error: "Donor name and amount are required" }, { status: 400 });
    }

    const prompt = `Generate a heartfelt, personalized 2-sentence thank you message for a donation.
Donor Name: ${donorName}
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
    if (!content) {
      throw new Error("No content generated from AI");
    }

    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error("AI generate-thanks error:", error);
    return NextResponse.json(
      { 
        en: "Thank you for your generous contribution. Your support makes a real difference in our mission.", 
        hi: "आपके उदार योगदान के लिए धन्यवाद। आपका समर्थन हमारे मिशन में वास्तविक बदलाव लाता है।" 
      }, 
      { status: 200 } // Return fallback instead of error to avoid blocking email
    );
  }
}

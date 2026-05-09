import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const applicationData = await req.json();

    const prompt = `Analyze the following volunteer application and generate 3-5 descriptive "AI tags" (short phrases like "High Empathy", "Tech Savvy", "Education Expert", "Community Leader") that summarize the applicant's profile based on their interests and message.

Application Data:
Interests: ${JSON.stringify(applicationData.interests)}
Message: ${applicationData.message}

Return the response as a JSON array of strings.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content generated from AI");
    }

    const parsed = JSON.parse(content);
    // Handle cases where AI returns { tags: [...] } instead of just [...]
    const tags = Array.isArray(parsed) ? parsed : (parsed.tags || []);

    return NextResponse.json({ tags });
  } catch (error) {
    console.error("AI analyze-volunteer error:", error);
    return NextResponse.json({ tags: [] }, { status: 200 }); // Return empty tags to avoid blocking registration
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { groq } from "@/lib/groq";
import { generateVolunteerId } from "@/lib/utils/memberId";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, state, ageGroup, availability, interests, howHeard, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    // AI Volunteer Analysis
    let aiTags: string[] = [];
    try {
      const prompt = `Analyze the following volunteer application and generate 3-5 descriptive "AI tags" (short phrases like "High Empathy", "Tech Savvy", "Education Expert", "Community Leader") that summarize the applicant's profile based on their interests and message.

Application Data:
Interests: ${JSON.stringify(interests)}
Message: ${message}`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-8b-8192",
        response_format: { type: "json_object" },
      });

      const content = chatCompletion.choices[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        aiTags = Array.isArray(parsed) ? parsed : (parsed.tags || []);
      }
    } catch (aiError) {
      console.error("AI volunteer analysis failed:", aiError);
      // Continue without tags
    }

    const { data: insertedVolunteer } = await supabase
      .from("volunteer_applications")
      .insert({
        full_name: name,
        email: email || null,
        phone,
        city: city || null,
        state: state || null,
        age_group: ageGroup || null,
        availability: availability || null,
        interests: interests || [],
        how_heard: howHeard || null,
        message: message || null,
        status: "pending",
        tags: aiTags,
      })
      .select("id")
      .single();

    if (insertedVolunteer?.id) {
      const volunteerId = await generateVolunteerId(supabase);
      await supabase
        .from("volunteer_applications")
        .update({ volunteer_id: volunteerId })
        .eq("id", insertedVolunteer.id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("volunteer register error:", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

"use server";

import { createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { sendCertificateEmail } from "@/lib/resend";

export async function approveVolunteerApplication(id: string) {
  const supabase = await createServiceClient();

  // Fetch application details first
  const { data: application, error: fetchError } = await supabase
    .from("volunteer_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // Update status to approved
  const { error: updateError } = await supabase
    .from("volunteer_applications")
    .update({ status: "approved" })
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);

  // Generate and send certificate
  try {
    // Build absolute URL for internal API call
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const certRes = await fetch(
      `${baseUrl}/api/certificates/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: application.full_name,
          recipientNameHindi: application.full_name, // Fallback: use same name; enhance with transliteration if needed
          certificateType: "appreciation",
          date: new Date().toISOString().split("T")[0],
          volunteerHours: undefined,
          volunteerApplicationId: id,
        }),
      }
    );

    if (!certRes.ok) {
      console.error(
        "Certificate generation failed:",
        await certRes.text()
      );
    } else {
      const pdfBuffer = Buffer.from(await certRes.arrayBuffer());

      // Send certificate email if applicant email exists
      if (application.email) {
        await sendCertificateEmail({
          email: application.email,
          name: application.full_name,
          pdfBuffer,
          certificateType: "appreciation",
        });
      }
    }
  } catch (certError) {
    console.error("Certificate generation/sending error:", certError);
    // Don't throw - approval still succeeded
  }

  revalidatePath("/[locale]/admin", "page");
}

export async function rejectVolunteerApplication(id: string) {
  const supabase = await createServiceClient();
  
  const { error } = await supabase
    .from("volunteer_applications")
    .update({ status: "rejected" })
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "page");
}

export async function updateMembershipStatus(id: string, status: "active" | "expired" | "cancelled") {
  const supabase = await createServiceClient();
  
  const { error } = await supabase
    .from("memberships")
    .update({ status })
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "page");
}

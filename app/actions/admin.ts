"use server";

import { createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

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

  // Generate volunteer ID
  const volunteerId = `VOL-${Date.now().toString(36).toUpperCase()}`;

  // Update volunteer record
  await supabase
    .from("volunteer_applications")
    .update({ volunteer_id: volunteerId })
    .eq("id", id);

  // Build absolute URL for internal API calls
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  // Generate certificate in background (non-blocking)
  try {
    const certRes = await fetch(
      `${baseUrl}/api/certificates/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: application.full_name,
          recipientNameHindi: application.full_name,
          certificateType: "volunteer_appreciation",
          date: new Date().toISOString().split("T")[0],
          volunteerApplicationId: id,
        }),
      }
    );

    if (certRes.ok) {
      console.log("Volunteer certificate generated for:", application.full_name);
    }
  } catch (certError) {
    console.error("Certificate generation failed:", certError);
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

  const { data: membership } = await supabase
    .from("memberships")
    .select("profile_id, public_member_id")
    .eq("id", id)
    .single();

  if (!membership) throw new Error("Membership not found");

  // Generate public_member_id if activating and none exists
  if (status === "active" && !membership.public_member_id) {
    const memberId = `SPS-${Date.now().toString(36).toUpperCase()}`;
    await supabase
      .from("memberships")
      .update({
        status,
        public_member_id: memberId,
        activated_at: new Date().toISOString(),
      })
      .eq("id", id);

    // Get profile for certificate
    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", membership.profile_id)
      .single();

    if (profile) {
      // Generate certificate in background
      const host = headers().get("host");
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      const baseUrl = `${protocol}://${host}`;

      fetch(`${baseUrl}/api/certificates/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: profile.full_name,
          recipientNameHindi: profile.full_name,
          certificateType: "membership",
          date: new Date().toISOString().split("T")[0],
          userId: membership.profile_id,
        }),
      }).catch(err => console.error("Certificate generation failed:", err));
    }
  } else {
    await supabase
      .from("memberships")
      .update({ status })
      .eq("id", id);
  }

  revalidatePath("/[locale]/admin", "page");
}

export async function markMessageRead(id: string) {
  const supabase = await createServiceClient();

  const { error } = await supabase
    .from("contact_messages")
    .update({ status: "read" })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "page");
}

export async function markAllMessagesRead() {
  const supabase = await createServiceClient();

  const { error } = await supabase
    .from("contact_messages")
    .update({ status: "read" })
    .eq("status", "unread");

  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "page");
}

export async function sendBulkEmail(to: string[], subject: string, message: string) {
  const supabase = await createServiceClient();

  // Save bulk email record
  await supabase.from("bulk_emails").insert({
    subject,
    message,
    recipient_count: to.length,
    status: "sent",
  });

  // Note: Actual email sending would be handled by a background job
  // For now, just log it
  console.log("Bulk email scheduled:", { subject, recipientCount: to.length });

  return { success: true, recipientCount: to.length };
}
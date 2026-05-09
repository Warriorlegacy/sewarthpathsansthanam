import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { sendReceiptEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      donationId,
      membershipId,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = hmac.digest("hex");

    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    if (donationId) {
      const { data: donation } = await supabase
        .from("donations")
        .select("email, donor_name, amount, purpose")
        .eq("id", donationId)
        .single();

      await supabase
        .from("donations")
        .update({
          status: "completed",
          razorpay_payment_id,
          paid_at: new Date().toISOString(),
        })
        .eq("id", donationId);

      if (donation) {
        sendReceiptEmail({
          email: donation.email,
          name: donation.donor_name || "Donor",
          amount: donation.amount,
          purpose: donation.purpose,
          receiptNumber: razorpay_payment_id,
        }).catch((err) => console.error("Failed to send donation receipt:", err));
      }
    }

    if (membershipId) {
      const { data: membership } = await supabase
        .from("memberships")
        .select("user_id")
        .eq("id", membershipId)
        .single();

      if (membership) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email, full_name")
          .eq("id", membership.user_id)
          .single();

        const { data: plan } = await supabase
          .from("membership_plans")
          .select("price")
          .eq("id", (await supabase.from("memberships").select("plan_id").eq("id", membershipId).single()).data?.plan_id)
          .single();

        await supabase
          .from("memberships")
          .update({
            status: "active",
            razorpay_payment_id,
            activated_at: new Date().toISOString(),
          })
          .eq("id", membershipId);

        if (profile) {
          sendReceiptEmail({
            email: profile.email,
            name: profile.full_name || "Member",
            amount: plan?.price || 0,
            purpose: "Membership Fee",
            receiptNumber: razorpay_payment_id,
          }).catch((err) => console.error("Failed to send membership receipt:", err));
        }
      }
    }

    await supabase.from("payment_events").insert({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      event_type: "payment.authorized",
      entity_type: donationId ? "donation" : "membership",
      entity_id: donationId ?? membershipId,
      raw_payload: body,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

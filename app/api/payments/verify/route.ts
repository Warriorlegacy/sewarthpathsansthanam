import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { sendReceiptEmail } from "@/lib/resend";

export const runtime = 'nodejs';

function numberToWords(num: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
                "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
                "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  if (num === 0) return "Zero";
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
  if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + numberToWords(num % 100) : "");
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + numberToWords(num % 1000) : "");
  if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + numberToWords(num % 100000) : "");
  return numberToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + numberToWords(num % 10000000) : "");
}

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
        .select("email, donor_name, amount, purpose, razorpay_payment_id")
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
        const receiptNumber = donation.razorpay_payment_id || `RCPT-${Date.now()}`;
        const receiptDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        const amountWords = numberToWords(donation.amount);

        // Save receipt record
        await supabase.from("receipts").insert({
          receipt_number: receiptNumber,
          donation_id: donationId,
          amount: donation.amount,
          donor_name: donation.donor_name,
          donor_email: donation.email,
          purpose: donation.purpose,
          status: "completed",
        });

        // Send receipt email
        sendReceiptEmail({
          email: donation.email,
          name: donation.donor_name || "Donor",
          amount: donation.amount,
          purpose: donation.purpose,
          receiptNumber: receiptNumber,
        }).catch((err) => console.error("Failed to send donation receipt:", err));
      }
    }

    if (membershipId) {
      const { data: membership } = await supabase
        .from("memberships")
        .select("profile_id, plan_code")
        .eq("id", membershipId)
        .single();

      if (membership) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email, full_name")
          .eq("id", membership.profile_id)
          .single();

        const { data: plan } = await supabase
          .from("membership_plans")
          .select("name, price_inr")
          .eq("plan_code", membership.plan_code)
          .maybeSingle();

        await supabase
          .from("memberships")
          .update({
            status: "active",
            razorpay_payment_id,
            activated_at: new Date().toISOString(),
          })
          .eq("id", membershipId);

        if (profile) {
          // Generate public_member_id if not exists
          const { data: existingMem } = await supabase
            .from("memberships")
            .select("public_member_id")
            .eq("id", membershipId)
            .single();

          if (!existingMem?.public_member_id) {
            const memberId = `SPS-${Date.now().toString(36).toUpperCase()}`;
            await supabase
              .from("memberships")
              .update({ public_member_id: memberId })
              .eq("id", membershipId);
          }

          const receiptNumber = razorpay_payment_id || `RCPT-${Date.now()}`;

          // Save receipt record
          await supabase.from("receipts").insert({
            receipt_number: receiptNumber,
            membership_id: membershipId,
            amount: plan?.price_inr || 0,
            donor_name: profile.full_name,
            donor_email: profile.email,
            purpose: "Membership Fee",
            status: "completed",
          });

          sendReceiptEmail({
            email: profile.email,
            name: profile.full_name || "Member",
            amount: plan?.price_inr || 0,
            purpose: plan?.name || "Membership Fee",
            receiptNumber: receiptNumber,
          }).catch((err) => console.error("Failed to send membership receipt:", err));
        }
      }
    }

    // Record payment event
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
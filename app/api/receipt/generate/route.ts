import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { donationId, membershipId, userId, include80G = true } = body;

    const supabase = await createServiceClient();

    // Fetch donation data
    let donation = null;
    if (donationId) {
      const { data } = await supabase
        .from("donations")
        .select("*")
        .eq("id", donationId)
        .single();
      donation = data;
    }

    // Fetch membership data if membershipId provided
    let membership = null;
    let profile = null;
    let plan = null;

    if (membershipId) {
      const { data: memData } = await supabase
        .from("memberships")
        .select("*")
        .eq("id", membershipId)
        .single();
      membership = memData;

      if (membership?.profile_id) {
        const { data: profData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", membership.profile_id)
          .single();
        profile = profData;

        const { data: planData } = await supabase
          .from("membership_plans")
          .select("*")
          .eq("plan_code", membership.plan_code)
          .maybeSingle();
        plan = planData;
      }
    }

    if (!donation && !membership) {
      return NextResponse.json({ error: "No donation or membership found" }, { status: 404 });
    }

    // Read logo
    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
    let logoBase64 = "";
    try {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = logoBuffer.toString("base64");
    } catch (e) {
      console.error("Logo not found:", e);
    }

    // Generate receipt number
    const receiptNumber = donation?.razorpay_payment_id || `RCPT-${Date.now()}`;
    const receiptDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const amount = donation?.amount || plan?.price_inr || 0;
    const amountWords = numberToWords(amount);
    const purpose = donation?.purpose || "Membership Fee";
    const donorName = donation?.donor_name || profile?.full_name || "Donor";
    const donorEmail = donation?.donor_email || profile?.email || "";
    const donorPhone = donation?.donor_phone || profile?.phone || "";

    // Generate Receipt HTML
    const receiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Receipt - ${receiptNumber}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  :root { --saffron: #E07B39; --green: #2D6A4F; --green-dark: #1B4332; --gold: #C9952A; --cream: #FFFBF5; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', 'Noto Sans Devanagari', sans-serif; background: #f5f5f5; padding: 30px; }

  .receipt-container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }

  .header { background: linear-gradient(135deg, #FF6B35 0%, #E85D25 30%, #1B4332 100%); color: white; padding: 30px; text-align: center; }
  .logo { width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.6); margin: 0 auto 15px; overflow: hidden; }
  .logo img { width: 100%; height: 100%; object-fit: cover; }
  .org-hindi { font-size: 28px; font-weight: 700; }
  .org-eng { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.9; margin-top: 5px; }

  .receipt-title { background: var(--saffron); color: white; padding: 15px; text-align: center; font-size: 20px; font-weight: 700; letter-spacing: 2px; }
  .receipt-title-hi { background: var(--green); font-size: 14px; letter-spacing: 1px; }

  .receipt-body { padding: 30px; }

  .receipt-number-row { display: flex; justify-content: space-between; padding: 15px; background: #f9f9f9; border-radius: 8px; margin-bottom: 20px; }
  .receipt-number-row .label { font-weight: 600; color: var(--green); }
  .receipt-number-row .value { font-weight: 700; color: var(--saffron); font-size: 18px; }

  .donor-info { margin-bottom: 25px; }
  .info-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--green); background: #D8F3DC; padding: 8px 12px; border-left: 4px solid var(--green); margin-bottom: 15px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .info-item { display: flex; flex-direction: column; gap: 3px; }
  .info-label { font-size: 10px; font-weight: 600; text-transform: uppercase; color: #888; }
  .info-value { font-size: 14px; color: #333; font-weight: 500; }

  .amount-section { background: linear-gradient(135deg, rgba(224,123,57,0.05) 0%, white 100%); border: 2px solid var(--saffron); border-radius: 12px; padding: 25px; margin-bottom: 25px; text-align: center; }
  .amount-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--saffron); margin-bottom: 5px; }
  .amount-value { font-size: 36px; font-weight: 700; color: var(--green); }
  .amount-hindi { font-size: 16px; color: #666; margin-top: 5px; font-family: 'Noto Sans Devanagari', sans-serif; }
  .purpose-badge { display: inline-block; background: var(--green); color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; margin-top: 10px; }

  .amount-words { background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
  .amount-words-label { font-size: 10px; text-transform: uppercase; color: #888; margin-bottom: 5px; }
  .amount-words-value { font-size: 16px; font-weight: 600; color: #333; }

  .declaration { border: 1px solid var(--gold); border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #FFFBF5; }
  .declaration-title { font-weight: 700; color: var(--green); margin-bottom: 10px; }
  .declaration-text { font-size: 13px; line-height: 1.8; color: #555; }
  .declaration-hi { font-family: 'Noto Sans Devanagari', sans-serif; margin-top: 10px; font-size: 12px; }

  .footer { background: var(--green-dark); color: white; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; }
  .footer-left { display: flex; align-items: center; gap: 10px; }
  .footer-logo { width: 30px; height: 30px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.4); overflow: hidden; }
  .footer-logo img { width: 100%; height: 100%; object-fit: cover; }
  .footer-text { font-size: 11px; line-height: 1.5; }
  .footer-right { text-align: right; font-size: 10px; opacity: 0.8; }

  .print-btn { display: block; width: 200px; margin: 30px auto; padding: 12px; background: var(--green); color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; text-align: center; }
  .print-btn:hover { background: var(--green-dark); }

  @media print { body { background: white; padding: 0; } .print-btn { display: none; } .receipt-container { box-shadow: none; } }
</style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      ${logoBase64 ? `<div class="logo"><img src="data:image/png;base64,${logoBase64}" alt="Logo"></div>` : ''}
      <div class="org-hindi">सेवार्थ पथ संस्थानम्</div>
      <div class="org-eng">SEWARTH PATH SANSTHANAM</div>
      <div style="font-size: 11px; opacity: 0.8; margin-top: 5px;">Registered Trust No: 202200996052093 | Varanasi, UP</div>
    </div>

    <div class="receipt-title">
      DONATION RECEIPT / दान रसीद
    </div>
    <div class="receipt-title-hi">
      Official Receipt for Contributions Received
    </div>

    <div class="receipt-body">
      <div class="receipt-number-row">
        <div class="label">Receipt No. / रसीद नं.</div>
        <div class="value">${receiptNumber}</div>
      </div>
      <div class="receipt-number-row">
        <div class="label">Date / दिनांक</div>
        <div class="value" style="font-size: 14px;">${receiptDate}</div>
      </div>

      <div class="donor-info">
        <div class="info-title">Donor / Contribution Details</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Name / नाम</span>
            <span class="info-value">${donorName}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Email</span>
            <span class="info-value">${donorEmail || 'N/A'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Phone / फोन</span>
            <span class="info-value">${donorPhone || 'N/A'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">PAN (if provided)</span>
            <span class="info-value">${donation?.pan || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div class="amount-section">
        <div class="amount-label">Amount Received / प्राप्त राशि</div>
        <div class="amount-value">₹${amount.toLocaleString('en-IN')}</div>
        <div class="amount-hindi">${amountWords} only</div>
        <div class="purpose-badge">${purpose.toUpperCase()}</div>
      </div>

      <div class="amount-words">
        <div class="amount-words-label">Amount in Words</div>
        <div class="amount-words-value">${amountWords} Rupees Only</div>
      </div>

      ${include80G ? `
      <div class="declaration">
        <div class="declaration-title">80G Tax Benefit Statement</div>
        <div class="declaration-text">
          This donation is eligible for tax exemption under Section 80G of the Income Tax Act, 1961.
          Sewarth Path Sansthanam is registered under the relevant provisions of the Income Tax Act.
          <br><br>
         PAN: AADCS9976F<br>
         80G Registration: AADCS9976F/05/2022/202200996052093<br>
         Valid from: Financial Year 2022-23 onwards
        </div>
        <div class="declaration-hi">
          यह दान आयकर अधिनियम, 1961 की धारा 80G के तहत कर छूट के लिए पात्र है।
        </div>
      </div>
      ` : ''}

      <div style="display: flex; justify-content: space-between; margin-top: 30px;">
        <div style="text-align: center;">
          <div style="border-bottom: 1.5px solid #333; width: 150px; height: 40px; margin-bottom: 5px;"></div>
          <div style="font-size: 10px; color: #666;">Authorized Signatory<br>हस्ताक्षरकर्ता</div>
        </div>
        <div style="text-align: center;">
          <div style="border-bottom: 1.5px solid #333; width: 150px; height: 40px; margin-bottom: 5px;"></div>
          <div style="font-size: 10px; color: #666;">Date / तिथि<br>${receiptDate}</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">
        ${logoBase64 ? `<div class="footer-logo"><img src="data:image/png;base64,${logoBase64}" alt="Logo"></div>` : ''}
        <div class="footer-text">
          <strong>एको अहं द्वितीयो नास्ति</strong><br>
          Service is the Highest Dharma<br>
          www.sewarthpathsansthanam.org
        </div>
      </div>
      <div class="footer-right">
        Reg. Trust No: 202200996052093<br>
        Varanasi, Uttar Pradesh, India
      </div>
    </div>
  </div>

  <button class="print-btn" onclick="window.print()">🖨️ Print Receipt</button>
</body>
</html>`;

    // Save receipt record
    await supabase.from("receipts").insert({
      receipt_number: receiptNumber,
      donation_id: donationId || null,
      membership_id: membershipId || null,
      amount: amount,
      donor_name: donorName,
      donor_email: donorEmail,
      purpose: purpose,
      html_content: receiptHtml,
      status: "generated",
    });

    return new NextResponse(receiptHtml, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename="Receipt_${receiptNumber}.html"`,
      },
    });

  } catch (err) {
    console.error("Receipt generation error:", err);
    return NextResponse.json({ error: "Failed to generate receipt" }, { status: 500 });
  }
}

// Helper function to convert number to words
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
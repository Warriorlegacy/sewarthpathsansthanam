import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      membershipId,
      userId,
      publicMemberId,
    } = body;

    if (!membershipId && !userId) {
      return NextResponse.json({ error: "Missing membershipId or userId" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    // Fetch membership and profile data
    let query = supabase.from("memberships").select("*");
    if (membershipId) {
      query = query.eq("id", membershipId);
    } else if (userId) {
      query = query.eq("profile_id", userId);
    }

    const { data: membership } = await query.maybeSingle();

    if (!membership) {
      return NextResponse.json({ error: "Membership not found" }, { status: 404 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", membership.profile_id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { data: plan } = await supabase
      .from("membership_plans")
      .select("*")
      .eq("plan_code", membership.plan_code)
      .maybeSingle();

    // Generate QR code
    const verificationUrl = `https://sewarthpathsansthanam.org/verify/${membership.public_member_id}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 120,
      margin: 1,
      color: {
        dark: "#2D6A4F",
        light: "#FFFFFF"
      }
    });

    // Read logo
    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
    let logoBase64 = "";
    try {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = logoBuffer.toString("base64");
    } catch (e) {
      console.error("Logo not found:", e);
    }

    // Generate ID Card HTML (for print/download)
    const idCardHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ID Card - ${profile.full_name}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  :root { --saffron: #E07B39; --green: #2D6A4F; --green-dark: #1B4332; --gold: #C9952A; --cream: #FFFBF5; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', 'Noto Sans Devanagari', sans-serif; background: #f5f5f5; padding: 20px; }
  .id-card-container { display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; }
  .id-card {
    width: 340px;
    background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 40%, #1B4332 100%);
    border-radius: 16px;
    padding: 20px;
    color: white;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
  }
  .id-card::before {
    content: "🕉";
    position: absolute;
    right: -10px;
    bottom: -10px;
    font-size: 80px;
    opacity: 0.05;
  }
  .card-header { display: flex; align-items: center; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .logo { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--gold); overflow: hidden; }
  .logo img { width: 100%; height: 100%; object-fit: cover; }
  .org-info { flex: 1; }
  .org-name-hi { font-size: 12px; color: var(--gold); font-weight: 600; }
  .org-name-en { font-size: 8px; color: rgba(255,255,255,0.6); letter-spacing: 1px; }
  .card-type-badge { background: rgba(224,123,57,0.2); border: 1px solid var(--saffron); padding: 4px 8px; border-radius: 4px; font-size: 10px; color: var(--saffron); font-weight: 600; }

  .card-body { display: flex; gap: 15px; padding: 15px 0; }
  .photo-section { text-align: center; }
  .photo-placeholder { width: 80px; height: 95px; background: rgba(255,255,255,0.1); border: 2px solid var(--saffron); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 5px; }
  .tier-badge { background: var(--gold); color: #1a1a1a; padding: 3px 8px; border-radius: 3px; font-size: 9px; font-weight: 600; }

  .info-section { flex: 1; }
  .member-name { font-size: 15px; font-weight: 700; color: white; margin-bottom: 3px; }
  .member-name-hi { font-family: 'Noto Sans Devanagari'; font-size: 11px; color: rgba(255,255,255,0.7); margin-bottom: 10px; }
  .info-row { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 10px; }
  .info-label { color: var(--saffron); font-weight: 600; }
  .info-value { color: rgba(255,255,255,0.9); }

  .qr-section { display: flex; flex-direction: column; align-items: center; }
  .qr-code { background: white; padding: 4px; border-radius: 4px; }
  .qr-code img { width: 80px; height: 80px; }
  .qr-label { font-size: 8px; color: rgba(255,255,255,0.5); text-align: center; margin-top: 4px; }

  .card-footer { background: var(--saffron); padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; margin: 15px -20px -20px; }
  .member-id { font-size: 11px; font-weight: 700; color: white; }
  .validity { font-size: 10px; color: rgba(255,255,255,0.9); }

  .print-btn { display: block; margin: 30px auto; padding: 12px 30px; background: var(--green); color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; }
  .print-btn:hover { background: var(--green-dark); }
  @media print { body { background: white; padding: 0; } .print-btn { display: none; } .id-card { box-shadow: none; } }
</style>
</head>
<body>
  <div class="id-card-container">
    <!-- Front -->
    <div class="id-card">
      <div class="card-header">
        ${logoBase64 ? `<div class="logo"><img src="data:image/png;base64,${logoBase64}" alt="Logo"></div>` : ''}
        <div class="org-info">
          <div class="org-name-hi">सेवार्थ पथ संस्थानम्</div>
          <div class="org-name-en">SEWARTH PATH SANSTHANAM</div>
        </div>
        <div class="card-type-badge">${plan?.name || membership.plan_code}</div>
      </div>

      <div class="card-body">
        <div class="photo-section">
          <div class="photo-placeholder">📷</div>
          <div class="tier-badge">${membership.plan_code}</div>
        </div>
        <div class="info-section">
          <div class="member-name">${profile.full_name || 'Member'}</div>
          <div class="member-name-hi">${profile.full_name || ''}</div>
          <div class="info-row">
            <span class="info-label">ID:</span>
            <span class="info-value">${membership.public_member_id}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value" style="font-size:9px;">${profile.email || 'N/A'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Phone:</span>
            <span class="info-value">${profile.phone || 'N/A'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Joined:</span>
            <span class="info-value">${membership.activated_at ? new Date(membership.activated_at).toLocaleDateString('en-IN') : 'N/A'}</span>
          </div>
        </div>
        <div class="qr-section">
          <div class="qr-code"><img src="${qrCodeDataUrl}" alt="QR Code"></div>
          <div class="qr-label">Scan to verify</div>
        </div>
      </div>

      <div class="card-footer">
        <span class="member-id">${membership.public_member_id}</span>
        <span class="validity">Valid: ${membership.expires_at ? new Date(membership.expires_at).toLocaleDateString('en-IN') : 'Lifetime'}</span>
      </div>
    </div>

    <!-- Back -->
    <div class="id-card" style="background: var(--cream); color: #333;">
      <div class="card-header" style="border-bottom-color: #ddd;">
        ${logoBase64 ? `<div class="logo"><img src="data:image/png;base64,${logoBase64}" alt="Logo"></div>` : ''}
        <div class="org-info">
          <div class="org-name-hi" style="color: var(--green);">सेवार्थ पथ संस्थानम्</div>
          <div class="org-name-en" style="color: #666;">SEWARTH PATH SANSTHANAM</div>
        </div>
      </div>

      <div style="padding: 15px 0; flex: 1;">
        <h4 style="font-size: 12px; color: var(--green); margin-bottom: 10px;">Important Guidelines / महत्वपूर्ण दिशा-निर्देश</h4>
        <ul style="font-size: 9px; line-height: 1.8; color: #555; padding-left: 15px;">
          <li>This card is property of Sewarth Path Sansthanam</li>
          <li>सेवार्थ पथ संस्थानम् की संपत्ति है</li>
          <li>Report if found to: contact@sewarthpathsansthanam.org</li>
          <li>कृपया खोने पर संपर्क करें</li>
        </ul>

        <h4 style="font-size: 12px; color: var(--green); margin: 15px 0 10px;">Contact Us / संपर्क करें</h4>
        <div style="font-size: 9px; line-height: 1.8;">
          <p>📧 contact@sewarthpathsansthanam.org</p>
          <p>🌐 www.sewarthpathsansthanam.org</p>
        </div>

        <div style="text-align: center; margin-top: 15px;">
          <img src="${qrCodeDataUrl}" alt="QR" style="width: 70px; height: 70px;">
          <p style="font-size: 8px; color: #888; margin-top: 5px;">${verificationUrl}</p>
        </div>
      </div>

      <div class="card-footer" style="background: var(--green-dark);">
        <span style="font-size: 10px;">सेवा परमो धर्म</span>
        <span style="font-size: 9px;">Reg: 202200996052093</span>
      </div>
    </div>
  </div>

  <button class="print-btn" onclick="window.print()">🖨️ Print ID Card</button>
</body>
</html>`;

    // Save ID card record
    const { error: idCardError } = await supabase
      .from("id_cards")
      .insert({
        membership_id: membership.id,
        profile_id: profile.id,
        public_member_id: membership.public_member_id,
        qr_code_url: verificationUrl,
        html_content: idCardHtml,
        status: "generated",
      })
      .select("id")
      .single();

    if (idCardError && idCardError.code !== "23505") {
      console.error("ID card record error:", idCardError);
    }

    return new NextResponse(idCardHtml, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename="ID_Card_${membership.public_member_id}.html"`,
      },
    });

  } catch (err) {
    console.error("ID Card generation error:", err);
    return NextResponse.json({ error: "Failed to generate ID card" }, { status: 500 });
  }
}
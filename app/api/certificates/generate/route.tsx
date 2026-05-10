import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { CertificatePDF } from "@/components/certificate/CertificatePDF";
import { renderToBuffer, Font, registerImage } from "@react-pdf/renderer";
import fs from "fs";
import path from "path";

// Register custom fonts (Google Fonts)
Font.register({
  family: "Cinzel",
  src: "https://fonts.gstatic.com/s/cinzel/v25/8vIJsgFCTV6MwRkzXPeUg57HNOPSjsp1.woff2",
});
Font.register({
  family: "Yatra One",
  src: "https://fonts.gstatic.com/s/yatraone/v16/XRXX3ICfX3K7KyCjnGMdC2Y.woff2",
});
Font.register({
  family: "Playfair Display",
  src: "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN6PKkFOwGTTwwFtq4.woff2",
});
Font.register({
  family: "Hind",
  src: "https://fonts.gstatic.com/s/hind/v5/xn7lYHE7ybgUweFd9n.woff2",
});
Font.register({
  family: "Poppins",
  src: "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2",
});

// Register logo image from public folder
try {
  const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
  const logoBuffer = fs.readFileSync(logoPath);
  registerImage("logo", logoBuffer);
} catch (err) {
  console.error("Failed to register logo image for PDF:", err);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recipientName,
      recipientNameHindi,
      certificateType,
      eventName,
      date,
      volunteerHours,
      userId,
      volunteerApplicationId,
    } = body;

    // Validate required fields
    if (!recipientName || !recipientNameHindi || !certificateType || !date) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: recipientName, recipientNameHindi, certificateType, date",
        },
        { status: 400 }
      );
    }

    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(
      <CertificatePDF
        recipientName={recipientName}
        recipientNameHindi={recipientNameHindi}
        certificateType={certificateType}
        eventName={eventName}
        date={date}
        volunteerHours={volunteerHours}
      />
    );

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const sanitizedName = recipientName
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");
    const filename = `certificates/${certificateType}/${sanitizedName}_${timestamp}.pdf`;
    const publicUrl = `certificates/${certificateType}/${sanitizedName}_${timestamp}.pdf`;

    // Upload to Supabase Storage
    const supabase = await createServiceClient();

    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(filename, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      // Continue without storage - just return PDF
    } else {
      // If storage upload succeeded and we have userId or volunteerApplicationId, store record in certificates table
      if (userId || volunteerApplicationId) {
        const { error: dbError } = await supabase.from("certificates").insert({
          recipient_name: recipientName,
          recipient_name_hindi: recipientNameHindi,
          certificate_type: certificateType,
          event_name: eventName || null,
          issue_date: date,
          volunteer_hours: volunteerHours
            ? parseFloat(volunteerHours)
            : null,
          user_id: userId || null,
          volunteer_application_id: volunteerApplicationId || null,
          storage_path: filename,
          public_url: publicUrl,
        });

        if (dbError) {
          console.error("Database insert error:", dbError);
          // Continue - storage still succeeded
        }
      }
    }

    // Return PDF response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${sanitizedName}_certificate.pdf"`,
      },
    });
  } catch (err) {
    console.error("Certificate generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { generateFormsZip } from "@/lib/utils/zip-generator";
import path from "path";

export async function GET(req: NextRequest) {
  const formsDir = path.join(process.cwd(), "public", "forms");

  const formFiles = [
    { src: "membership_form.html", dest: "1_Membership_Form.html" },
    { src: "volunteer_form.html", dest: "2_Volunteer_Form.html" },
    { src: "id_card_template.html", dest: "3_ID_Card_Template.html" },
    { src: "certificate_template.html", dest: "4_Certificate_Template.html" },
  ];

  const zipFileName = "sewarth_forms.zip";

  try {
    const stream = await generateFormsZip(formsDir, formFiles);
    return new Response(stream, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipFileName}"`,
      },
    });
  } catch (error) {
    console.error("ZIP generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate ZIP file. Please try again." },
      { status: 500 }
    );
  }
}

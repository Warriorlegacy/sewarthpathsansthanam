import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
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
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    const headers = {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${zipFileName}"`,
    };

    const stream = new ReadableStream({
      async start(controller) {
        try {
          archive.on("error", (err) => {
            console.error("Archiver error:", err);
            if (!controller.error(err)) {
              console.error("Cannot enqueue further chunks, aborting");
            }
          });

          archive.pipe(controller.enqueue(new Uint8Array(0)));

          // Append available files
          for (const file of formFiles) {
            const filePath = path.join(formsDir, file.src);
            if (existsSync(filePath)) {
              const fileBuffer = await readFile(filePath);
              archive.append(fileBuffer, { name: file.dest });
            } else {
              console.warn(`File not found, skipping: ${file.src}`);
            }
          }

          archive.finalize();
          archive.on("end", () => {
            controller.close();
          });
        } catch (error) {
          console.error("Zip creation error:", error);
          if (!controller.error(error)) {
            console.error("Cannot enqueue error, aborting");
          }
        }
      },
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.error("ZIP generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate ZIP file. Please try again." },
      { status: 500 }
    );
  }
}

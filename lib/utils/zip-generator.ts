import fs from 'fs/promises';
import JSZip from 'jszip';

export async function generateFormsZip(
  formsDir: string,
  formFiles: { src: string; dest: string }[]
): Promise<ReadableStream> {
  const zip = new JSZip();

  for (const file of formFiles) {
    try {
      const filePath = `${formsDir}/${file.src}`;
      const content = await fs.readFile(filePath);
      zip.file(file.dest, content);
    } catch (err) {
      console.warn(`File not found or could not be read: ${file.src}`, err);
    }
  }

  const uint8array = await zip.generateAsync({ type: 'uint8array' });

  return new ReadableStream({
    start(controller) {
      controller.enqueue(uint8array);
      controller.close();
    },
  });
}

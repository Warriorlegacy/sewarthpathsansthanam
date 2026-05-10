import fs from 'fs/promises';
import { Readable } from 'stream';

export async function generateFormsZip(
  formsDir: string,
  formFiles: { src: string; dest: string }[]
): Promise<ReadableStream> {
  const archiver = (await import('archiver')).default;
  const archive = archiver('zip', { zlib: { level: 9 } });

  const stream = new ReadableStream({
    start(controller) {
      archive.on('data', (chunk: Buffer) => {
        controller.enqueue(chunk);
      });

      archive.on('end', () => {
        controller.close();
      });

      archive.on('error', (err: Error) => {
        controller.error(err);
      });

      (async () => {
        try {
          for (const file of formFiles) {
            const filePath = `${formsDir}/${file.src}`;
            try {
              const content = await fs.readFile(filePath);
              archive.append(content, { name: file.dest });
            } catch (err) {
              console.warn(`File not found: ${filePath}`);
            }
          }
          await archive.finalize();
        } catch (err) {
          controller.error(err as Error);
        }
      })();
    },
  });

  return stream;
}

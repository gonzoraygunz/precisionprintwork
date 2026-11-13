import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { del, get } from "@vercel/blob";
import { BLOB_PREFIX, MAX_UPLOAD_BYTES, formatBytes } from "@/lib/upload";

type Attachment = { filename: string; content: Buffer };

// Only accept files our own /api/upload route put in Blob — never fetch arbitrary URLs.
function isOurBlobUrl(raw: string) {
  try {
    const url = new URL(raw);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".blob.vercel-storage.com") &&
      url.pathname.startsWith(`/${BLOB_PREFIX}`)
    );
  } catch {
    return false;
  }
}

async function readStream(stream: ReadableStream<Uint8Array>) {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const phone = form.get("phone") as string;
    const description = form.get("description") as string;
    const quantity = form.get("quantity") as string;
    const material = form.get("material") as string;
    const timeline = form.get("timeline") as string;
    const file = form.get("file") as File | null;
    const fileUrl = form.get("fileUrl") as string | null;
    const fileName = (form.get("fileName") as string | null) || "attachment";

    if (fileUrl && !isOurBlobUrl(fileUrl)) {
      return new NextResponse("Invalid file reference.", { status: 400 });
    }

    let fileNote = "No file attached.";
    let attachments: Attachment[] = [];
    let blobToDelete: string | null = null;

    if (file && file.size > 0) {
      // Small file posted directly with the form.
      if (file.size > MAX_UPLOAD_BYTES) {
        return new NextResponse("File is too large (max 25 MB).", { status: 413 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      fileNote = `File attached: ${file.name} (${formatBytes(file.size)})`;
      attachments = [{ filename: file.name, content: buffer }];
    } else if (fileUrl) {
      // Large file the browser already uploaded to private Blob storage (URL checked above).
      const blob = await get(fileUrl, { access: "private", useCache: false });
      if (blob?.statusCode === 200 && blob.blob.size <= MAX_UPLOAD_BYTES) {
        const buffer = await readStream(blob.stream);
        fileNote = `File attached: ${fileName} (${formatBytes(buffer.length)})`;
        attachments = [{ filename: fileName, content: buffer }];
        blobToDelete = fileUrl;
      } else {
        fileNote = `The customer uploaded "${fileName}", but it couldn't be retrieved. Ask them to email it.`;
      }
    }

    const to = process.env.TO_EMAIL ?? "michael@precisionprintwork.com";
    const from = process.env.FROM_EMAIL ?? "quotes@precisionprintwork.com";

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        ``,
        `Part Description:`,
        description,
        ``,
        `Quantity: ${quantity}`,
        `Material preference: ${material || "No preference"}`,
        `Timeline: ${timeline || "No rush"}`,
        ``,
        fileNote,
      ].join("\n"),
      attachments,
    });
    if (error) throw new Error(error.message);

    // The file now lives in the email; don't keep customer files in storage.
    if (blobToDelete) {
      await del(blobToDelete).catch((e) => console.error("Blob cleanup failed:", e));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order route error:", err);
    return new NextResponse("Failed to send request. Please email directly.", { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    let fileNote = "No file attached.";
    let attachments: { filename: string; content: Buffer }[] = [];

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fileNote = `File attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      attachments = [{ filename: file.name, content: buffer }];
    }

    const to = process.env.TO_EMAIL ?? "michael@precisionprintwork.com";
    const from = process.env.FROM_EMAIL ?? "quotes@precisionprintwork.com";

    await resend.emails.send({
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order route error:", err);
    return new NextResponse("Failed to send request. Please email directly.", { status: 500 });
  }
}

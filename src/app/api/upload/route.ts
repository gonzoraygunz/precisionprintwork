import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { BLOB_PREFIX, MAX_UPLOAD_BYTES, hasAllowedExtension } from "@/lib/upload";

// Issues short-lived client tokens so the browser can upload large quote files
// straight to Vercel Blob, bypassing the ~4.5 MB function body limit.
export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Large file uploads aren't available right now. Please email the file instead." },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json()) as HandleUploadBody;
    const result = await handleUpload({
      request: req,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith(BLOB_PREFIX) || !hasAllowedExtension(pathname)) {
          throw new Error("File type not allowed.");
        }
        return {
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("Upload token error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed." },
      { status: 400 }
    );
  }
}

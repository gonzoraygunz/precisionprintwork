// Shared upload rules for the quote form (client) and the API routes (server).

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // what the form promises

// Vercel rejects function request bodies over ~4.5 MB. Files up to this size ride
// along in the form post as before; anything bigger goes to Vercel Blob first.
export const DIRECT_UPLOAD_LIMIT_BYTES = 4 * 1024 * 1024;

export const ALLOWED_EXTENSIONS = [".stl", ".obj", ".step", ".stp", ".png", ".jpg", ".jpeg", ".pdf"];

// Every quote upload lives under this Blob prefix; the order route only accepts URLs here.
export const BLOB_PREFIX = "quote-uploads/";

export function hasAllowedExtension(name: string) {
  const lower = name.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
}

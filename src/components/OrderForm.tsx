"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { upload } from "@vercel/blob/client";
import Icon from "@/components/Icon";
import { btnPrimary, inputClass, textLink } from "@/lib/styles";
import {
  BLOB_PREFIX,
  DIRECT_UPLOAD_LIMIT_BYTES,
  MAX_UPLOAD_BYTES,
  formatBytes,
  hasAllowedExtension,
} from "@/lib/upload";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  description: z.string().min(20, "Please describe your part in at least 20 characters"),
  quantity: z.string().min(1, "Quantity is required"),
  material: z.string().optional(),
  timeline: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const labelClass = "block text-sm font-medium text-fg-secondary mb-1.5";
const legendClass = "font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-fg-muted";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-danger text-xs mt-1.5">
      {message}
    </p>
  );
}

export default function OrderForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Wires a field's error state to its input for screen readers.
  const a11y = (field: keyof FormData) =>
    errors[field]
      ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` }
      : {};

  // Single entry point for picking, dropping and removing a file.
  function pickFile(f: File | null) {
    setFileError("");
    if (!f) return setFile(null);
    if (!hasAllowedExtension(f.name)) {
      setFileError("Please attach an STL, OBJ, STEP, image, or PDF file.");
      return;
    }
    if (f.size > MAX_UPLOAD_BYTES) {
      setFileError(`That file is ${formatBytes(f.size)}. The limit is 25 MB — email larger files instead.`);
      return;
    }
    setFile(f);
  }

  async function onSubmit(data: FormData) {
    setStatus("submitting");
    setErrorMsg("");

    const body = new FormData();
    Object.entries(data).forEach(([k, v]) => body.append(k, v ?? ""));

    try {
      if (file && file.size > DIRECT_UPLOAD_LIMIT_BYTES) {
        // Too big for a function request body: send it to private Blob storage first.
        setUploadPct(0);
        let blob;
        try {
          blob = await upload(BLOB_PREFIX + file.name, file, {
            access: "private",
            handleUploadUrl: "/api/upload",
            multipart: true,
            onUploadProgress: ({ percentage }) => setUploadPct(Math.round(percentage)),
          });
        } catch (e) {
          console.error("Blob upload failed:", e);
          throw new Error(
            "Your file couldn't be uploaded. Try again, attach a smaller file (under 4 MB), or email it to michael@precisionprintwork.com."
          );
        } finally {
          setUploadPct(null);
        }
        body.append("fileUrl", blob.url);
        body.append("fileName", file.name);
      } else if (file) {
        body.append("file", file);
      }

      const res = await fetch("/api/order", { method: "POST", body });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      reset();
      setFile(null);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-8 text-center" role="status">
        <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-surface-overlay text-accent flex items-center justify-center">
          <Icon name="check" strokeWidth={2} />
        </div>
        <h2 className="text-xl font-bold text-fg mb-2">Request received!</h2>
        <p className="text-fg-muted">
          I&apos;ll review your request and send a quote to your email within 1–2 business days.
        </p>
        <button onClick={() => setStatus("idle")} className={`${textLink} mt-6 text-sm font-medium`}>
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className={`${legendClass} mb-4`}>Your Info</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>Name *</label>
            <input id="name" {...register("name")} {...a11y("name")} autoComplete="name" className={inputClass} placeholder="Your name" />
            <FieldError id="name-error" message={errors.name?.message} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email *</label>
            <input id="email" {...register("email")} {...a11y("email")} type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
          <input id="phone" {...register("phone")} type="tel" autoComplete="tel" className={inputClass} placeholder="(555) 000-0000" />
        </div>
      </fieldset>

      {/* Part details */}
      <fieldset className="space-y-4">
        <legend className={`${legendClass} mb-4`}>Part Details</legend>
        <div>
          <label htmlFor="description" className={labelClass}>
            Describe your part or project *
          </label>
          <textarea
            id="description"
            {...register("description")}
            {...a11y("description")}
            rows={5}
            className={inputClass + " resize-y min-h-32"}
            placeholder="What does the part do? What are the approximate dimensions? Does it need to fit with any existing components? Is there a material preference?"
          />
          <FieldError id="description-error" message={errors.description?.message} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className={labelClass}>Quantity *</label>
            <input id="quantity" {...register("quantity")} {...a11y("quantity")} type="number" min="1" className={inputClass} placeholder="1" />
            <FieldError id="quantity-error" message={errors.quantity?.message} />
          </div>
          <div>
            <label htmlFor="material" className={labelClass}>Material preference</label>
            <select id="material" {...register("material")} className={inputClass}>
              <option value="">No preference — suggest one</option>
              <option value="PLA">PLA (rigid, general purpose)</option>
              <option value="PETG">PETG (tough, moisture resistant)</option>
              <option value="TPU">TPU (flexible)</option>
              <option value="ASA">ASA (UV/heat resistant)</option>
              <option value="Resin">Resin (fine detail, minis)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="timeline" className={labelClass}>Timeline</label>
          <select id="timeline" {...register("timeline")} className={inputClass}>
            <option value="">No rush — whenever works</option>
            <option value="1-2 weeks">1–2 weeks</option>
            <option value="asap">As soon as possible</option>
          </select>
        </div>

        {/* File upload: click, keyboard (focusable sr-only input), or drag and drop */}
        <div>
          <p className={labelClass}>Attach a file (optional)</p>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const dropped = e.dataTransfer.files?.[0];
              if (dropped) pickFile(dropped);
            }}
            className={`relative border border-dashed rounded-xl px-4 py-6 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-colors ${
              dragging ? "border-accent bg-accent/10" : "border-line-control bg-surface hover:border-accent"
            }`}
          >
            <input
              type="file"
              id="file"
              accept=".stl,.obj,.step,.stp,.png,.jpg,.jpeg,.pdf"
              className="sr-only"
              aria-describedby={fileError ? "file-error" : "file-hint"}
              onChange={(e) => {
                pickFile(e.target.files?.[0] ?? null);
                e.target.value = ""; // allow re-picking the same file after "Remove file"
              }}
            />
            <label htmlFor="file" className="cursor-pointer flex items-center justify-center gap-3 text-sm text-fg-secondary">
              {file ? (
                <>
                  <Icon name="paperclip" size={20} className="text-accent shrink-0" />
                  <span>
                    <span className="text-accent font-medium break-all">{file.name}</span>
                    <span id="file-hint" className="block font-mono text-xs text-fg-muted mt-1">
                      {formatBytes(file.size)} · click to choose a different file
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <Icon name="upload" className="text-accent shrink-0" />
                  <span>
                    <span className="text-accent font-semibold">Click to upload</span> or drag and drop
                    <span id="file-hint" className="block font-mono text-xs text-fg-muted mt-1">
                      STL · OBJ · STEP · image · PDF — max 25 MB
                    </span>
                  </span>
                </>
              )}
            </label>
          </div>
          {file && (
            <button
              type="button"
              onClick={() => pickFile(null)}
              className="mt-2 inline-flex items-center gap-1 text-xs text-fg-muted hover:text-fg transition-colors"
            >
              <Icon name="close" size={14} strokeWidth={2} />
              Remove file
            </button>
          )}
          {fileError && (
            <p id="file-error" role="alert" className="text-danger text-xs mt-1.5">
              {fileError}
            </p>
          )}
        </div>
      </fieldset>

      {status === "error" && (
        <p role="alert" className="text-danger text-sm bg-danger-surface border border-danger-line rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className={`${btnPrimary} group w-full`}>
        {status === "submitting" ? (
          uploadPct !== null ? `Uploading file… ${uploadPct}%` : "Sending…"
        ) : (
          <>
            Submit Request
            <Icon name="arrowRight" size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-fg-muted">
        Quotes are free. I&apos;ll respond within 1–2 business days.
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { upload } from "@vercel/blob/client";
import Icon from "@/components/Icon";
import { btnPrimary, btnSecondary, inputClass, textLink } from "@/lib/styles";
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
const legendClass = "mb-5 flex items-center gap-3 text-lg font-semibold text-fg";

/** Numbered section title: brass step badge + label. */
function Legend({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <legend className={legendClass}>
      <span className="font-mono text-[0.8125rem] text-brass border border-brass/35 rounded-md px-2 py-0.5">{n}</span>
      {children}
    </legend>
  );
}

const materials = [
  { value: "", label: "Suggest one" },
  { value: "PLA", label: "PLA" },
  { value: "PETG", label: "PETG" },
  { value: "TPU", label: "TPU" },
  { value: "ASA", label: "ASA" },
  { value: "Resin", label: "Resin" },
];

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
  // What was sent, echoed back on the success screen so typos are easy to spot.
  const [sent, setSent] = useState<{ email: string; quantity: string; material: string; file?: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { material: "" } });

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
      // Keep the values so "Edit and resend" can reopen the filled-in form.
      setSent({ email: data.email, quantity: data.quantity, material: data.material || "Suggest one", file: file?.name });
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  }

  function startOver() {
    reset();
    setFile(null);
    setSent(null);
    setStatus("idle");
  }

  if (status === "success" && sent) {
    const rows: [string, string][] = [
      ["Reply to", sent.email],
      ["Quantity", sent.quantity],
      ["Material", sent.material],
      ...(sent.file ? ([["Attachment", sent.file]] as [string, string][]) : []),
    ];
    return (
      <div className="py-4 text-center flex flex-col items-center gap-6" role="status">
        <div className="w-14 h-14 rounded-2xl border border-accent-line bg-accent-line/25 text-accent flex items-center justify-center">
          <Icon name="check" size={26} strokeWidth={2.25} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-fg mb-2">Request received</h2>
          <p className="text-fg-muted">
            Your quote will be emailed within <span className="font-mono text-brass">1–2 business days</span>.
          </p>
        </div>
        <dl className="w-full max-w-md rounded-xl border border-line bg-surface text-sm text-left">
          {rows.map(([k, v], i) => (
            <div key={k} className={`flex justify-between gap-4 px-4 py-3 ${i ? "border-t border-line" : ""}`}>
              <dt className="text-fg-muted">{k}</dt>
              <dd className={`font-mono text-brass text-right [overflow-wrap:anywhere] ${k === "Material" ? "uppercase" : ""}`}>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-fg-muted">
          Wrong email?{" "}
          <button type="button" onClick={() => setStatus("idle")} className={`${textLink} font-semibold`}>
            Edit and resend
          </button>
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/portfolio" className={btnSecondary}>See past work</Link>
          <button type="button" onClick={startOver} className={btnSecondary}>Submit another</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      {/* Contact */}
      <fieldset className="space-y-4">
        <Legend n="01">About you</Legend>
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
      <fieldset className="space-y-4 border-t border-line pt-8">
        <Legend n="02">The part</Legend>
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
            <label htmlFor="timeline" className={labelClass}>Timeline</label>
            <select id="timeline" {...register("timeline")} className={inputClass}>
              <option value="">No rush — whenever works</option>
              <option value="1-2 weeks">1–2 weeks</option>
              <option value="asap">As soon as possible</option>
            </select>
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>Material preference</legend>
          <div className="flex flex-wrap gap-2">
            {materials.map((m) => (
              <label key={m.label} className="cursor-pointer">
                <input
                  type="radio"
                  value={m.value}
                  {...register("material")}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center h-11 px-4 rounded-full border border-line bg-surface font-mono text-[0.8125rem] uppercase text-fg-secondary transition-colors hover:border-line-control peer-checked:border-brass peer-checked:text-brass peer-checked:bg-brass/10 peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                  {m.label}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-fg-muted">
            Not sure? See the{" "}
            <Link href="/services#materials" className={textLink}>material comparison</Link>.
          </p>
        </fieldset>
      </fieldset>

      <fieldset className="space-y-4 border-t border-line pt-8">
        <Legend n="03">
          Reference <span className="text-sm font-normal text-fg-muted">optional</span>
        </Legend>
        {/* File upload: click, keyboard (focusable sr-only input), or drag and drop */}
        <div>
          <p className="sr-only">Attach a file</p>
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
        <div role="alert" className="flex gap-3 items-start rounded-xl border border-danger-line bg-danger-surface px-4 py-3.5 text-sm leading-relaxed">
          <Icon name="close" size={18} strokeWidth={2} className="text-danger shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-fg">Your request didn&apos;t send.</p>
            <p className="text-fg-secondary">
              Your details{file ? " and file" : ""} are still here. Try again, or email them to{" "}
              <a href="mailto:michael@precisionprintwork.com" className="font-semibold text-fg underline underline-offset-2 [overflow-wrap:anywhere]">
                michael@precisionprintwork.com
              </a>
              .
            </p>
            {errorMsg && errorMsg.length < 200 && <p className="mt-1 font-mono text-xs text-danger">{errorMsg}</p>}
          </div>
        </div>
      )}

      {/* Pinned to the bottom of the screen on phones while the form is in view */}
      <div className="sticky bottom-0 z-10 -mx-6 px-6 py-3 bg-surface-raised/95 backdrop-blur-md border-t border-line md:static md:m-0 md:p-0 md:bg-transparent md:backdrop-blur-none md:border-0">
      <button type="submit" disabled={status === "submitting"} className={`${btnPrimary} group w-full`}>
        {status === "submitting" ? (
          uploadPct !== null ? `Uploading file… ${uploadPct}%` : "Sending…"
        ) : (
          <>
            {status === "error" ? "Try Again" : "Submit Request"}
            <Icon name="arrowRight" size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      </div>

      <p className="text-center text-xs text-fg-muted">
        Quotes are free. I&apos;ll respond within 1–2 business days.
      </p>
    </form>
  );
}

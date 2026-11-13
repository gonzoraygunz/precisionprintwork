"use client";

import Icon from "@/components/Icon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { upload } from "@vercel/blob/client";
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

const inputClass =
  "w-full border border-slate-600/80 bg-slate-900/60 text-white placeholder:text-slate-500 rounded-lg px-4 py-2.5 text-sm transition-colors hover:border-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30";
const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";
const errorClass = "text-red-400 text-xs mt-1.5";
const legendClass = "w-full text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1";

function Legend({ children }: { children: React.ReactNode }) {
  return (
    <legend className={legendClass}>
      <span className="flex items-center gap-3">
        {children}
        <span className="flex-1 h-px bg-slate-700" aria-hidden="true" />
      </span>
    </legend>
  );
}

export default function OrderForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const [uploadPct, setUploadPct] = useState<number | null>(null);

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30">
          <Icon name="check" className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Request received!</h2>
        <p className="text-slate-400">
          I&apos;ll review your request and send a quote to your email within 1–2 business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Contact */}
      <fieldset className="space-y-4">
        <Legend>Your Info</Legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>Name *</label>
            <input
              id="name"
              {...register("name")}
              autoComplete="name"
              className={inputClass}
              placeholder="Your name"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email *</label>
            <input
              id="email"
              {...register("email")}
              type="email"
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="(555) 000-0000"
          />
        </div>
      </fieldset>

      {/* Part details */}
      <fieldset className="space-y-4">
        <Legend>Part Details</Legend>
        <div>
          <label htmlFor="description" className={labelClass}>
            Describe your part or project *
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={5}
            className={inputClass + " resize-y min-h-32"}
            placeholder="What does the part do? What are the approximate dimensions? Does it need to fit with any existing components? Is there a material preference?"
            aria-invalid={!!errors.description}
          />
          {errors.description && <p className={errorClass}>{errors.description.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className={labelClass}>Quantity *</label>
            <input
              id="quantity"
              {...register("quantity")}
              type="number"
              min="1"
              className={inputClass}
              placeholder="1"
              aria-invalid={!!errors.quantity}
            />
            {errors.quantity && <p className={errorClass}>{errors.quantity.message}</p>}
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

        {/* File upload: click, keyboard (focusable input), or drag and drop */}
        <div>
          <p className={labelClass}>
            Attach a file <span className="text-slate-500 font-normal">(optional)</span>
          </p>
          <input
            type="file"
            id="file"
            accept=".stl,.obj,.step,.stp,.png,.jpg,.jpeg,.pdf"
            className="peer sr-only"
            onChange={(e) => {
              pickFile(e.target.files?.[0] ?? null);
              e.target.value = ""; // allow re-picking the same file after "Remove file"
            }}
          />
          <label
            htmlFor="file"
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
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center cursor-pointer transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500/40 ${
              dragging
                ? "border-cyan-400 bg-cyan-500/10"
                : "border-slate-600 bg-slate-900/40 hover:border-cyan-600 hover:bg-slate-900/60"
            }`}
          >
            {file ? (
              <>
                <span className="w-10 h-10 rounded-full flex items-center justify-center bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/30">
                  <Icon name="paperclip" className="w-5 h-5" />
                </span>
                <span className="text-cyan-300 font-medium text-sm break-all">{file.name}</span>
                <span className="text-xs text-slate-500">
                  {formatBytes(file.size)} · Click to choose a different file
                </span>
              </>
            ) : (
              <>
                <span className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-slate-400 ring-1 ring-slate-600">
                  <Icon name="upload" className="w-5 h-5" />
                </span>
                <span className="text-sm text-slate-400">
                  <span className="text-cyan-400 font-medium">Click to upload</span> or drag and drop
                </span>
                <span className="text-xs text-slate-500">STL, OBJ, STEP, image, or PDF — max 25 MB</span>
              </>
            )}
          </label>
          {file && (
            <button
              type="button"
              onClick={() => pickFile(null)}
              className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Icon name="x" className="w-3.5 h-3.5" />
              Remove file
            </button>
          )}
          {fileError && (
            <p role="alert" className={errorClass}>
              {fileError}
            </p>
          )}
        </div>
      </fieldset>

      {status === "error" && (
        <p role="alert" className="text-red-300 text-sm bg-red-950/60 border border-red-800 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-500 hover:glow-blue transition-all disabled:opacity-60"
        >
          {status === "submitting" ? (
            uploadPct !== null ? `Uploading file… ${uploadPct}%` : "Sending…"
          ) : (
            <>
              Submit Request
              <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-500">Quotes are free. I&apos;ll respond within 1–2 business days.</p>
      </div>
    </form>
  );
}

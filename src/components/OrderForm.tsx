"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  "w-full border border-slate-600 bg-slate-700 text-white placeholder:text-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500";

export default function OrderForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
    if (file) body.append("file", file);

    try {
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
      <div className="circuit-bg bg-slate-800 border border-cyan-700 rounded-2xl p-10 text-center">
        <div className="text-4xl mb-4">✅</div>
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Your Info</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Name *</label>
            <input {...register("name")} className={inputClass} placeholder="Your name" />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email *</label>
            <input {...register("email")} type="email" className={inputClass} placeholder="you@example.com" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Phone (optional)</label>
          <input {...register("phone")} type="tel" className={inputClass} placeholder="(555) 000-0000" />
        </div>
      </fieldset>

      {/* Part details */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Part Details</legend>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Describe your part or project *
          </label>
          <textarea
            {...register("description")}
            rows={5}
            className={inputClass + " resize-none"}
            placeholder="What does the part do? What are the approximate dimensions? Does it need to fit with any existing components? Is there a material preference?"
          />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Quantity *</label>
            <input {...register("quantity")} type="number" min="1" className={inputClass} placeholder="1" />
            {errors.quantity && <p className="text-red-400 text-xs mt-1">{errors.quantity.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Material preference</label>
            <select {...register("material")} className={inputClass}>
              <option value="">No preference — suggest one</option>
              <option value="PLA">PLA (rigid, general purpose)</option>
              <option value="PETG">PETG (tough, moisture resistant)</option>
              <option value="TPU">TPU (flexible)</option>
              <option value="ASA">ASA (UV/heat resistant)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Timeline</label>
          <select {...register("timeline")} className={inputClass}>
            <option value="">No rush — whenever works</option>
            <option value="1-2 weeks">1–2 weeks</option>
            <option value="asap">As soon as possible</option>
          </select>
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Attach a file (optional)
          </label>
          <div className="border border-dashed border-slate-600 bg-slate-800 rounded-lg px-4 py-6 text-center hover:border-cyan-600 transition-colors">
            <input
              type="file"
              id="file"
              accept=".stl,.obj,.step,.stp,.png,.jpg,.jpeg,.pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="file" className="cursor-pointer text-sm text-slate-500 hover:text-slate-300 transition-colors">
              {file ? (
                <span className="text-cyan-400 font-medium">📎 {file.name}</span>
              ) : (
                <>
                  <span className="text-cyan-400 font-medium">Click to upload</span> or drag and drop
                  <br />
                  <span className="text-xs text-slate-500">STL, OBJ, STEP, image, or PDF — max 25 MB</span>
                </>
              )}
            </label>
          </div>
        </div>
      </fieldset>

      {status === "error" && (
        <p className="text-red-400 text-sm bg-red-950 border border-red-800 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit Request"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Quotes are free. I&apos;ll respond within 1–2 business days.
      </p>
    </form>
  );
}

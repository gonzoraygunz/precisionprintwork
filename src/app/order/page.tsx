import OrderForm from "@/components/OrderForm";

export default function Order() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Free Quote</p>
          <h1 className="text-4xl font-bold text-white">Request a Quote</h1>
          <p className="mt-4 text-slate-400">
            Describe your part, attach a file if you have one, and I&apos;ll send a quote to your email within
            1–2 business days.
          </p>
        </div>

        <OrderForm />
      </div>
    </div>
  );
}

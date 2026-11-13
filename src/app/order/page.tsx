import OrderForm from "@/components/OrderForm";
import SectionHeader from "@/components/SectionHeader";

export default function Order() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <SectionHeader
          as="h1"
          eyebrow="Free Quote"
          title="Request a Quote"
          lead={
            <>
              Describe your part, attach a file if you have one, and I&apos;ll send a quote to your email within
              1–2 business days.
            </>
          }
          className="mb-12"
        />

        <OrderForm />
      </div>
    </div>
  );
}

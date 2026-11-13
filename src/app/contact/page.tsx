import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { btnPrimary, textLink } from "@/lib/styles";

export default function Contact() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <SectionHeader
          as="h1"
          eyebrow="Get in Touch"
          title="Contact"
          lead={
            <>
              For quotes, use the{" "}
              <Link href="/order" className={textLink}>
                quote request form
              </Link>
              . For everything else, email works best.
            </>
          }
          className="mb-12"
        />

        <dl className="circuit-bg bg-surface-raised border border-line rounded-2xl p-8 space-y-6">
          <div>
            <dt className="eyebrow mb-1">Email</dt>
            <dd>
              <a
                href="mailto:michael@precisionprintwork.com"
                className="text-fg font-medium hover:text-accent transition-colors"
              >
                michael@precisionprintwork.com
              </a>
            </dd>
          </div>

          <div className="border-t border-line pt-6">
            <dt className="eyebrow mb-1">Response Time</dt>
            <dd className="text-fg-secondary">Typically within 1 business day.</dd>
          </div>

          <div className="border-t border-line pt-6">
            <dt className="eyebrow mb-1">Location</dt>
            <dd className="text-fg-secondary">Ships from United States.</dd>
          </div>
        </dl>

        <div className="mt-10 text-center">
          <Link href="/order" className={btnPrimary}>
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    src: "/Portfolio/tray-green.png",
    alt: "Perforated storage tray — green PLA",
    title: "Custom 510 Cartridge Tray // ABS",
    description: "Custom grid tray printed in green PLA. Available in any color.",
  },
  {
    src: "/Portfolio/tray-black.png",
    alt: "Perforated storage tray — black PLA",
    title: "Custom 510 Cartridge Tray // ABS",
    description: "Same design in black PETG for a more industrial look.",
  },
  {
    src: "/Portfolio/tray-white.png",
    alt: "Perforated storage tray — white PLA",
    title: "Custom 510 Cartridge Tray // ABS",
    description: "White PLA version — clean finish for lab or workshop use.",
  },
  {
    src: "/Portfolio/pipe-clamps.png",
    alt: "Machine vision alignment LED holder",
    title: "Machine Vision Alignment LED Holder",
    description: "Functional mounting brackets designed to fit a specific pipe diameter.",
  },
];

export default function Portfolio() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3">Past Work</p>
        <h1 className="text-4xl font-bold text-slate-900">Portfolio</h1>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          A sample of completed projects. Each one started as a problem — this is what came out the other end.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {projects.map((project) => (
          <div key={project.src} className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="aspect-square relative bg-slate-50">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 text-sm">{project.title}</h3>
              <p className="text-slate-500 text-xs mt-1">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Have a similar project in mind?</h2>
        <p className="text-slate-500 mb-6 text-sm">
          Every item here started with a request. Submit yours and get a free quote.
        </p>
        <Link
          href="/order"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
        >
          Start a Request
        </Link>
      </div>
    </div>
  );
}

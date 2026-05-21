import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layer Up — Precision Printworks",
  description: "Stack layers in this 3D printing-themed stacking game.",
};

export default function GamePage() {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
      <iframe
        src="/game/index.html"
        title="Layer Up — 3D printing stacking game"
        className="flex-1 w-full border-0"
        style={{ background: "#0D1B2A" }}
      />
    </div>
  );
}

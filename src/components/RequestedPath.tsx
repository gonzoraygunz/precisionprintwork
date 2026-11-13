"use client";

import { usePathname } from "next/navigation";

/** The URL that wasn't found, for the 404 page's inspection report. */
export default function RequestedPath() {
  const path = usePathname();
  return <span className="[overflow-wrap:anywhere]">{path}</span>;
}

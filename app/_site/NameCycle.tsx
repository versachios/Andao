"use client";

import { useEffect, useState } from "react";

// Sharp / technical faces only. The box around the name has a fixed height and
// never wraps, so cycling fonts cannot change the page layout or scroll position.
const FONTS: { family: string; weight: number }[] = [
  { family: "Space Grotesk", weight: 700 },
  { family: "JetBrains Mono", weight: 600 },
  { family: "Orbitron", weight: 700 },
  { family: "Chakra Petch", weight: 700 },
  { family: "Share Tech Mono", weight: 400 },
  { family: "Archivo Black", weight: 400 },
  { family: "Space Mono", weight: 700 },
];

export function NameCycle({ text, intervalMs = 2200 }: { text: string; intervalMs?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // preload so the swap never flashes a fallback font
    FONTS.forEach((f) => document.fonts?.load(`${f.weight} 28px "${f.family}"`).catch(() => {}));
    const id = window.setInterval(() => setI((n) => (n + 1) % FONTS.length), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  const f = FONTS[i];
  return (
    <h1 className="pf-name" style={{ fontFamily: `"${f.family}", sans-serif`, fontWeight: f.weight }}>
      {text}
    </h1>
  );
}

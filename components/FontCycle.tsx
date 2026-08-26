"use client";

import { useEffect, useState, ReactNode } from "react";

const FONT_STYLES: { fontFamily: string; letterSpacing?: string; fontStyle?: string }[] = [
  { fontFamily: "inherit" },
  { fontFamily: "Georgia, 'Times New Roman', serif" },
  { fontFamily: "ui-monospace, 'JetBrains Mono', Menlo, monospace", letterSpacing: "-0.02em" },
  { fontFamily: "'Brush Script MT', 'Segoe Script', cursive", fontStyle: "italic" },
  { fontFamily: "Georgia, serif", fontStyle: "italic" },
  { fontFamily: "Impact, 'Arial Narrow', sans-serif", letterSpacing: "0.01em" },
];

export function FontCycle({ children, intervalMs = 1800 }: { children: ReactNode; intervalMs?: number }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % FONT_STYLES.length);
        setVisible(true);
      }, 180);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  const style = FONT_STYLES[index];

  return (
    <span
      style={{
        fontFamily: style.fontFamily,
        letterSpacing: style.letterSpacing,
        fontStyle: style.fontStyle,
        transition: "opacity 180ms ease, filter 180ms ease",
        opacity: visible ? 1 : 0,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

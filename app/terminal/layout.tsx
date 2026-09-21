import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./terminal.css";
import { ThemeInit } from "./components/ThemeInit";

export const metadata: Metadata = {
  title: "Versachios",
  description:
    "Versachios: a Vietnamese student working through competitive programming and web development.",
};

export default function TerminalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="tm-root">
      <ThemeInit />
      {children}
    </div>
  );
}

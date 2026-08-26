"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [active, setActive] = useState<string>("#top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = ["top", "about", "projects", "notes"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b rule bg-paper/85 backdrop-blur-sm dark:bg-charcoal/85">
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-tight text-ink dark:text-cream">
          {SITE.name.toLowerCase()}<span className="text-ember dark:text-ember-dark">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "label transition-colors duration-300 hover:text-ink dark:hover:text-cream",
                active === item.href && "text-ink dark:text-cream"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/70 dark:bg-signal-dark/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal dark:bg-signal-dark" />
            </span>
            <span className="label">{SITE.status}</span>
          </div>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border rule md:hidden"
          >
            {open ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t rule px-6 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="label block text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

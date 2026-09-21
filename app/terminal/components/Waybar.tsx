"use client";

import { useEffect, useState } from "react";
import { Clock } from "./Clock";

const ITEMS = ["home", "about", "projects", "notes", "contact"] as const;

export function Waybar() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    let raf = 0;
    const mark = () => {
      raf = 0;
      const y = window.innerHeight * 0.35;
      let cur: string = ITEMS[0];
      for (const id of ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= y) cur = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        cur = ITEMS[ITEMS.length - 1];
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(mark);
    };
    mark();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <header className="tm-bar">
      <nav className="tm-ws" aria-label="Sections">
        {ITEMS.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            onClick={(e) => jump(e, id)}
          >
            <span className="tm-n">{i + 1}</span>
            {id}
          </a>
        ))}
      </nav>
      <div className="tm-title">andao@archlinux: ~</div>
      <div className="tm-status">
        <b>
          <Clock />
        </b>{" "}
        ICT
      </div>
    </header>
  );
}

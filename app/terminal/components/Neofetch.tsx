"use client";

import { useEffect, useState } from "react";
import { neofetch } from "../data";
import { Ps1 } from "./Ps1";

const ART = [
  "       /\\",
  "      /  \\",
  "     /    \\",
  "    /      \\",
  "   /   ,,   \\",
  "  /   |  |   \\",
  " /_-''    ''-_\\",
].join("\n");

const FULL = "fastfetch";

export function Neofetch() {
  const [typed, setTyped] = useState(FULL);
  const [ready, setReady] = useState(true);
  const [caret, setCaret] = useState(false);

  // type the first command once; skipped when the visitor prefers reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    setTyped("");
    setReady(false);
    setCaret(true);
    const step = () => {
      i += 1;
      setTyped(FULL.slice(0, i));
      if (i < FULL.length) {
        timer = setTimeout(step, 60);
      } else {
        timer = setTimeout(() => {
          setCaret(false);
          setReady(true);
        }, 220);
      }
    };
    timer = setTimeout(step, 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <p className="tm-cmd">
        <Ps1 /> <span className="tm-arg">{typed}</span>
        {caret && <span className="tm-caret" />}
      </p>
      <div className={`tm-nf${ready ? "" : " tm-hold"}`}>
        <pre className="tm-art" aria-hidden="true">
          {ART}
        </pre>
        <div>
          <div className="tm-who-line">versachios@andao</div>
          <div className="tm-rule">-----------------</div>
          <dl className="tm-kv">
            {neofetch.map((r) => (
              <div key={r.key} className="tm-kv-row">
                <dt>{r.key}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
          <div className="tm-swatches" aria-hidden="true">
            {["red", "amber", "green", "cyan", "dim", "fg"].map((c) => (
              <span key={c} className="tm-sw" style={{ background: `var(--${c})` }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

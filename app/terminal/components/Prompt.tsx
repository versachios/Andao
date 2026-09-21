"use client";

import { useRef, useState } from "react";
import { openTargets, sections } from "../data";
import { applyTheme, THEMES, type ThemeMode } from "../theme";
import { Ps1 } from "./Ps1";

type Result = { cmd: string; lines: string[]; error?: boolean };

const COMMANDS = ["help", "ls", "cd", "open", "whoami", "neofetch", "theme", "clear"];
const OPEN_NAMES = Object.keys(openTargets);

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function Prompt() {
  const [results, setResults] = useState<Result[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const hpos = useRef(0);

  const push = (r: Result) => setResults((prev) => [...prev, r]);

  const run = (raw: string) => {
    const line = raw.trim();
    if (!line) {
      push({ cmd: "", lines: [] });
      return;
    }
    const parts = line.split(/\s+/);
    const c = parts[0].toLowerCase();
    const arg = (parts[1] ?? "").toLowerCase().replace(/\/$/, "");

    switch (c) {
      case "help":
        push({
          cmd: line,
          lines: [
            "help            list commands",
            "ls              list sections",
            "cd <section>    jump to a section",
            "open <name>     open a project or profile",
            "theme <mode>    dark, light or auto",
            "neofetch        back to the top",
            "clear           clear this output",
          ],
        });
        break;
      case "ls":
        push({
          cmd: line,
          lines: [`${sections.join("  ")}   (open: ${OPEN_NAMES.join(", ")})`],
        });
        break;
      case "cd":
        if ((sections as readonly string[]).includes(arg)) {
          push({ cmd: line, lines: [] });
          scrollToSection(arg);
        } else if (!arg || arg === "~") {
          push({ cmd: line, lines: [] });
          scrollToSection("home");
        } else {
          push({ cmd: line, lines: [`cd: no such section: ${parts[1]}`, "try: ls"], error: true });
        }
        break;
      case "open":
        if (openTargets[arg]) {
          push({ cmd: line, lines: [`opening ${arg} ...`] });
          window.open(openTargets[arg], "_blank", "noopener,noreferrer");
        } else {
          push({ cmd: line, lines: [`open: unknown target: ${parts[1] ?? ""}`, "try: ls"], error: true });
        }
        break;
      case "whoami":
        push({ cmd: line, lines: ["versachios"] });
        break;
      case "neofetch":
        push({ cmd: line, lines: [] });
        scrollToSection("home");
        break;
      case "theme":
        if ((THEMES as string[]).includes(arg)) {
          applyTheme(arg as ThemeMode);
          push({ cmd: line, lines: [`theme: ${arg}`] });
        } else {
          push({ cmd: line, lines: ["usage: theme dark|light|auto"], error: true });
        }
        break;
      case "clear":
        setResults([]);
        break;
      default:
        push({
          cmd: line,
          lines: [`zsh: command not found: ${parts[0]}`, "type help for the list of commands"],
          error: true,
        });
    }
    requestAnimationFrame(() => rowRef.current?.scrollIntoView({ block: "nearest" }));
  };

  const complete = () => {
    const sp = value.indexOf(" ");
    let pool: string[];
    let prefix: string;
    let head = "";
    if (sp === -1) {
      pool = COMMANDS;
      prefix = value.toLowerCase();
    } else {
      const c = value.slice(0, sp).toLowerCase();
      head = value.slice(0, sp + 1);
      prefix = value.slice(sp + 1).toLowerCase();
      pool = c === "cd" ? [...sections] : c === "open" ? OPEN_NAMES : c === "theme" ? THEMES : [];
    }
    const matches = pool.filter((p) => p.startsWith(prefix));
    if (matches.length === 1) setValue(head + matches[0]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.trim()) history.current.push(value);
      hpos.current = history.current.length;
      run(value);
      setValue("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp" && history.current.length) {
      e.preventDefault();
      hpos.current = Math.max(0, hpos.current - 1);
      setValue(history.current[hpos.current] ?? "");
    } else if (e.key === "ArrowDown" && history.current.length) {
      e.preventDefault();
      hpos.current = Math.min(history.current.length, hpos.current + 1);
      setValue(history.current[hpos.current] ?? "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setResults([]);
    }
  };

  return (
    <>
      <div aria-live="polite">
        {results.map((r, idx) => (
          <div className="tm-res" key={idx}>
            <p className="tm-line">
              <Ps1 /> {r.cmd}
            </p>
            {r.lines.map((l, k) => (
              <p className={`tm-line${r.error ? " tm-err" : ""}`} key={k}>
                {l}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="tm-prompt" ref={rowRef} onClick={() => inputRef.current?.focus()}>
        <label htmlFor="tm-cmd">
          <Ps1 />
        </label>
        <input
          id="tm-cmd"
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          aria-label="Terminal command"
        />
      </div>
      <p className="tm-hint">
        Type <b>help</b> for commands. Tab completes.
      </p>
    </>
  );
}

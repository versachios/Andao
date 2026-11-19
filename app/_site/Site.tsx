"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  aboutFacts,
  achievements,
  contacts,
  education,
  moments,
  neofetch,
  notes,
  projects,
  skillGroups,
} from "../terminal/data";
import { Discord } from "./Discord";
import { Dict, Lang, T } from "./i18n";
import { MiniSort } from "./MiniSort";
import { NameCycle } from "./NameCycle";
import { SortViz } from "./SortViz";

type Tab = "home" | "about" | "viz" | "notes";
const TABS: { id: Tab; key: keyof Dict }[] = [
  { id: "home", key: "nHome" },
  { id: "about", key: "nAbout" },
  { id: "viz", key: "nViz" },
  { id: "notes", key: "nNotes" },
];

const STORE = { lang: "pf-lang", theme: "pf-theme" };
const ROT = ["-4deg", "3deg", "-2deg", "4deg"];
const fact = (k: string) => aboutFacts.find((f) => f.key === k)?.value ?? "";

// notes + achievements merged into one newest-first timeline
type FeedItem = { sort: string; label: string; tag: string; title: string; body: string };
const FEED: FeedItem[] = [
  ...notes.map((n) => ({ sort: n.date, label: n.date, tag: n.tag, title: n.title, body: n.body })),
  ...achievements.map((a) => ({ sort: `${a.year}-06-30`, label: a.year, tag: "win", title: a.title, body: a.body })),
].sort((a, b) => b.sort.localeCompare(a.sort));

function Card({ k, title, children }: { k: string; title: string; children: ReactNode }) {
  return (
    <section className={`pf-c pf-k-${k}`}>
      <div className="pf-tb"><b>{title}</b></div>
      <div className="pf-bd">{children}</div>
    </section>
  );
}

function Row({ a, b, mono }: { a: string; b: ReactNode; mono?: boolean }) {
  return (
    <div className="pf-row">
      <span>{a}</span>
      <span className={mono ? "pf-mono" : undefined}>{b}</span>
    </div>
  );
}

function Feed({ n }: { n: number }) {
  return (
    <div className="pf-tl">
      {FEED.slice(0, n).map((f) => (
        <article key={f.sort + f.title}>
          <time className="pf-mono">{f.label}</time>
          <span className="pf-tg">{f.tag}</span>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </article>
      ))}
    </div>
  );
}

export default function Site() {
  const [tab, setTab] = useState<Tab>("home");
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null); // null = follow the OS
  const [clock, setClock] = useState("--:--");
  const [hasAvatar, setHasAvatar] = useState(false);
  const t = T[lang];

  // restore saved language/theme after mount (keeps server and client markup identical)
  useEffect(() => {
    try {
      const l = localStorage.getItem(STORE.lang);
      if (l === "vi" || l === "en") setLang(l);
      const th = localStorage.getItem(STORE.theme);
      if (th === "light" || th === "dark") setTheme(th);
    } catch {
      /* storage can be unavailable */
    }
  }, []);

  // avatar = public/avatar.jpg; if the file is missing we keep the letter
  useEffect(() => {
    const im = new Image();
    im.onload = () => setHasAvatar(true);
    im.src = "/avatar.jpg";
  }, []);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
        }) + " ICT",
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const switchLang = () => {
    const next: Lang = lang === "en" ? "vi" : "en";
    setLang(next);
    document.documentElement.lang = next;
    try { localStorage.setItem(STORE.lang, next); } catch { /* ignore */ }
  };

  const switchTheme = () => {
    const dark = theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem(STORE.theme, next); } catch { /* ignore */ }
  };

  return (
    <div className="pf-root" data-theme={theme ?? undefined}>
      <div className="pf-wrap">
        <nav className="pf-nav" aria-label="Sections">
          <div className="pf-tabs">
            {TABS.map((x) => (
              <button
                key={x.id}
                className={`pf-tab${tab === x.id ? " on" : ""}`}
                aria-current={tab === x.id ? "page" : undefined}
                onClick={() => setTab(x.id)}
              >
                {t[x.key]}
              </button>
            ))}
          </div>
          <button className="pf-ic pf-mono" onClick={switchLang} aria-label="Switch language">
            {lang === "en" ? "VI" : "EN"}
          </button>
          <button className="pf-ic" onClick={switchTheme} aria-label="Toggle theme">◐</button>
        </nav>

        <main>
          {tab === "home" && (
            <div className="pf-hm">
              <Card k="hero" title="~/versachios">
                <div className="pf-hero-top">
                  <div className="pf-av" style={hasAvatar ? { backgroundImage: "url(/avatar.jpg)" } : undefined}>
                    {!hasAvatar && "V"}
                  </div>
                  <div>
                    <span className="pf-pill pf-mono">{clock}</span>
                    <span className="pf-pill pf-mono">andao@archlinux</span>
                  </div>
                </div>
                <NameCycle text="Versachios" />
                <p>{t.heroP}</p>
                <div className="pf-now pf-mono">{t.nowL} → {fact("currently")}</div>
              </Card>

              <Card k="links" title={t.findH}>
                <div className="pf-lk">
                  {contacts.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span>{c.label}</span>
                      <i className="pf-mono">{c.text} ↗</i>
                    </a>
                  ))}
                  <Discord />
                </div>
              </Card>

              <Card k="log" title={t.logGH}><Feed n={7} /></Card>

              <Card k="sort" title={t.liveH}><MiniSort /></Card>

              <Card k="mom" title={t.momH}>
                <div className="pf-pols">
                  {moments.map((m, i) => (
                    <a
                      key={m.file}
                      className="pf-pol"
                      href={`/moments/${m.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ transform: `rotate(${ROT[i % ROT.length]})` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/moments/${m.file}`} alt={m.caption} loading="lazy" />
                      {m.caption}
                    </a>
                  ))}
                </div>
              </Card>

              <Card k="pj" title={t.projH}>
                <div className="pf-pj">
                  {projects.map((p) => (
                    <div key={p.name}>
                      <h3>{p.name.replace(/\/$/, "")}</h3>
                      <p>{p.description}</p>
                      <p className="pf-mono">{p.stack}</p>
                      <a href={p.source} target="_blank" rel="noopener noreferrer">source ↗</a>
                      <a href={p.live} target="_blank" rel="noopener noreferrer">live ↗</a>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {tab === "about" && (
            <div className="pf-ab">
              <Card k="a1" title={t.hey}>
                <p>{t.heyP}</p>
                <h3 className="pf-sub">{t.whyH}</h3>
                <p>{t.whyP}</p>
              </Card>
              <Card k="a2" title={t.detH}>
                <Row a={t.dFocus} b={fact("focus")} />
                <Row a={t.dCountry} b="Vietnam" />
                <Row a={t.dStatus} b={fact("status")} />
                <Row a={t.dTime} b={clock} mono />
              </Card>
              <Card k="a3" title={t.stackH}>
                {neofetch.filter((r) => r.key !== "Focus").map((r) => (
                  <Row key={r.key} a={r.key} b={r.value} mono />
                ))}
              </Card>
              <Card k="a4" title={t.edH}>
                {education.map((e) => (
                  <div key={e.title}>
                    <Row a={e.title.trim()} b={e.years} mono />
                    <p className="pf-small">{e.body}</p>
                  </div>
                ))}
              </Card>
              <Card k="a5" title={t.skillH}>
                {skillGroups.map((g) => (
                  <Row
                    key={g.label}
                    a={g.label}
                    b={g.items.split(", ").map((s) => <i className="pf-chip" key={s}>{s}</i>)}
                  />
                ))}
              </Card>
              <Card k="a6" title={t.goalH}><p>{t.goalP}</p></Card>
            </div>
          )}

          {tab === "viz" && (
            <div className="pf-hm">
              <section className="pf-c pf-k-wide">
                <div className="pf-tb"><b>{t.playH}</b></div>
                <div className="pf-bd">
                  <p>{t.playP}</p>
                  <SortViz />
                </div>
              </section>
            </div>
          )}

          {tab === "notes" && (
            <div className="pf-hm">
              <section className="pf-c pf-k-wide">
                <div className="pf-tb"><b>{t.logH}</b></div>
                <div className="pf-bd"><Feed n={99} /></div>
              </section>
            </div>
          )}
        </main>

        <footer className="pf-foot pf-mono">© 2026 Versachios · {t.foot}</footer>
      </div>
    </div>
  );
}

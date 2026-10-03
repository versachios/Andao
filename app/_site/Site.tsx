"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { SiCodeforces, SiFacebook, SiGithub, SiTiktok } from "react-icons/si";
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
import { TagIcon } from "../terminal/components/Icons";
import { Discord } from "./Discord";
import { Dict, Lang, T } from "./i18n";
import { NameCycle } from "./NameCycle";
import { SortViz } from "./SortViz";

type Tab = "home" | "about" | "viz" | "notes";
const TABS: { id: Tab; icon: string; key: keyof Dict }[] = [
  { id: "home", icon: "🏠", key: "nHome" },
  { id: "about", icon: "🔍", key: "nAbout" },
  { id: "viz", icon: "🔗", key: "nViz" },
  { id: "notes", icon: "📔", key: "nNotes" },
];

const BUBBLES = ["compiling…", "AC ✔", "WA on test 7 :(", "sudo make coffee", "one more problem…"];
const STORE = { lang: "pf-lang", theme: "pf-theme" };

const fact = (k: string) => aboutFacts.find((f) => f.key === k)?.value ?? "";
const POLAROID_ROT = ["-4deg", "3deg", "-2deg", "4deg"];

function Contacts() {
  return (
    <div className="pf-ct">
      {contacts.map((c) => (
        <a
          key={c.label}
          className="pf-ci"
          data-t={c.label}
          href={c.href}
          aria-label={`${c.label}: ${c.text}`}
          {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {c.icon === "mail" && <Mail size={18} strokeWidth={1.8} />}
          {c.icon === "github" && <SiGithub />}
          {c.icon === "codeforces" && <SiCodeforces />}
          {c.icon === "tiktok" && <SiTiktok />}
          {c.icon === "facebook" && <SiFacebook />}
          {c.icon === "tag" && <TagIcon label={c.tag ?? "?"} width={20} height={20} />}
        </a>
      ))}
      <Discord />
    </div>
  );
}

export default function Site() {
  const [tab, setTab] = useState<Tab>("home");
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null); // null = follow the OS
  const [clock, setClock] = useState("--:--");
  const [bubble, setBubble] = useState(0);
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
        <header className="pf-box">
          <div className="pf-cover" />
          <div className="pf-prof">
            <div className="pf-avw">
              <button
                className="pf-av"
                aria-label="Avatar"
                onClick={() => setBubble((n) => n + 1)}
                style={hasAvatar ? { backgroundImage: "url(/avatar.jpg)" } : undefined}
              >
                {!hasAvatar && "V"}
              </button>
              <span className="pf-bub pf-mono">{bubble === 0 ? "hi!" : BUBBLES[(bubble - 1) % BUBBLES.length]}</span>
            </div>
            <div className="pf-who">
              <NameCycle text="Versachios" />
              <p className="pf-mono">andao@archlinux · {t.stat}</p>
            </div>
            <Contacts />
          </div>
        </header>

        <nav className="pf-box pf-nav" aria-label="Sections">
          <div className="pf-tabs">
            {TABS.map((x) => (
              <button
                key={x.id}
                className={`pf-tab${tab === x.id ? " on" : ""}`}
                aria-current={tab === x.id ? "page" : undefined}
                onClick={() => setTab(x.id)}
              >
                {x.icon} {t[x.key]}
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
            <section className="pf-view">
              <div className="pf-home">
                <div>
                  <div className="pf-box pf-tilt">
                    <h2>{t.detH}</h2>
                    <div className="pf-row"><span>{t.dFocus}</span><span>{fact("focus")}</span></div>
                    <div className="pf-row"><span>{t.dCountry}</span><span>Vietnam</span></div>
                    <div className="pf-row"><span>{t.dStatus}</span><span>{fact("status")}</span></div>
                    <div className="pf-row"><span>{t.dTime}</span><span className="pf-mono">{clock}</span></div>
                  </div>
                  <div className="pf-box pf-tilt">
                    <h2>{t.stackH}</h2>
                    {neofetch.filter((r) => r.key !== "Focus").map((r) => (
                      <div className="pf-row" key={r.key}><span>{r.key}</span><span className="pf-mono">{r.value}</span></div>
                    ))}
                  </div>
                  <div className="pf-box pf-tilt">
                    <h2>{t.edH}</h2>
                    {education.map((e) => (
                      <div className="pf-sch" key={e.title}>
                        <b>{e.title[0]}</b>
                        <div><h3>{e.title}</h3><p className="pf-yr pf-mono">{e.years}</p><p>{e.body}</p></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pf-box">
                  <h2 className="pf-h2m">{t.hey}</h2>
                  <p>{t.heyP}</p>
                  <h2 className="pf-h2m">{t.whyH}</h2>
                  <p>{t.whyP}</p>
                  <h2 className="pf-h2m">{t.projH}</h2>
                  <div className="pf-pj">
                    {projects.map((p) => (
                      <div key={p.name}>
                        <h3>{p.name.replace(/\/$/, "")}</h3>
                        <p>{p.description}</p>
                        <div className="pf-st pf-mono">{p.stack}</div>
                        <div className="pf-lk">
                          <a href={p.source} target="_blank" rel="noopener noreferrer">source ↗</a>
                          <a href={p.live} target="_blank" rel="noopener noreferrer">live ↗</a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h2 className="pf-h2m">{t.momH}</h2>
                  <div className="pf-pols">
                    {moments.map((m, i) => (
                      <a
                        key={m.file}
                        className="pf-pol"
                        href={`/moments/${m.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ transform: `rotate(${POLAROID_ROT[i % POLAROID_ROT.length]})` }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/moments/${m.file}`} alt={m.caption} loading="lazy" />
                        {m.caption}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {tab === "about" && (
            <section className="pf-view">
              <div className="pf-box">
                <h2 className="pf-h2m">{t.abH}</h2>
                {aboutFacts.map((f) => (
                  <div className="pf-row" key={f.key}><span>{f.key}</span><span>{f.value}</span></div>
                ))}
              </div>
              <div className="pf-box">
                <h2 className="pf-h2m">{t.skillH}</h2>
                {skillGroups.map((g) => (
                  <div className="pf-row" key={g.label}>
                    <span>{g.label}</span>
                    <span className="pf-chips">
                      {g.items.split(", ").map((s) => <i className="pf-chip" key={s}>{s}</i>)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pf-box">
                <h2 className="pf-h2m">{t.msH}</h2>
                <div className="pf-tl">
                  {achievements.map((a) => (
                    <article key={a.year}>
                      <time className="pf-mono">{a.year}</time>
                      <h3>{a.title}</h3>
                      <p>{a.body}</p>
                    </article>
                  ))}
                </div>
              </div>
              <div className="pf-box">
                <h2 className="pf-h2m">{t.goalH}</h2>
                <p>{t.goalP}</p>
              </div>
            </section>
          )}

          {tab === "viz" && (
            <section className="pf-view">
              <div className="pf-box">
                <h2 className="pf-h2m">{t.playH}</h2>
                <p>{t.playP}</p>
                <SortViz />
              </div>
            </section>
          )}

          {tab === "notes" && (
            <section className="pf-view">
              <div className="pf-box">
                <h2 className="pf-h2m">{t.logH}</h2>
                <div className="pf-tl">
                  {notes.map((n) => (
                    <article key={n.date + n.title}>
                      <time className="pf-mono">{n.date} · {n.tag}</time>
                      <h3>{n.title}</h3>
                      <p>{n.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <footer className="pf-foot">© 2026 Versachios · {t.foot}</footer>
      </div>
    </div>
  );
}

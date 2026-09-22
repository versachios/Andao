import {
  aboutFacts,
  achievements,
  contacts,
  education,
  notes,
  projects,
  skillBars,
  skillGroups,
} from "./data";
import { Clock } from "./components/Clock";
import { Moments } from "./components/Moments";
import { Neofetch } from "./components/Neofetch";
import { Cmd } from "./components/Ps1";
import { DiscordPresence } from "./components/DiscordPresence";
import { TagIcon } from "./components/Icons";
import { Mail } from "lucide-react";
import { SiCodeforces, SiFacebook, SiGithub, SiTiktok } from "react-icons/si";
import { Prompt } from "./components/Prompt";
import { AlgoverseShot, HvtShot } from "./components/Shots";
import { Visuals } from "./components/Visuals";
import { Waybar } from "./components/Waybar";

export default function TerminalPage() {
  return (
    <div className="tm-wrap">
      <Waybar />

      <main className="tm-term">
        {/* HOME: text left, live visuals right */}
        <section className="tm-blk tm-s-home" id="home">
          <div className="tm-home-grid">
            <div>
              <Neofetch />

              <Cmd as="p" style={{ marginTop: 26 }}>
                whoami
              </Cmd>
              <h1>{"Hi, I'm Versachios."}</h1>
              <p>I turn ideas into things that run.</p>
              <p className="tm-dim">
                A Vietnamese student working through competitive programming and web development.
              </p>
              <p className="tm-links">
                <a href="#projects">[projects]</a>
                <a href="#about">[about]</a>
                <a href="#contact">[contact]</a>
              </p>
            </div>
            <div>
              <Cmd as="p">./visualize --demo</Cmd>
              <Visuals />
            </div>
          </div>
        </section>

        {/* ABOUT / EDUCATION / SKILLS in one row */}
        <section className="tm-blk tm-s-about" id="about">
          <Cmd>cat about.txt</Cmd>
          <p className="tm-lead">{"This is a workbench, not a résumé."}</p>
          <p>
            {
              "I built this site as a place to keep the things I'm actually doing: projects that ship, problems I'm still stuck on, experiments that go nowhere, and the occasional idea worth writing down. It updates the way my understanding does: unevenly, and usually after something broke first."
            }
          </p>
          <dl className="tm-kv" style={{ marginTop: 14 }}>
            {aboutFacts.map((f) => (
              <div className="tm-kv-row" key={f.key}>
                <dt>{f.key}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            <div className="tm-kv-row">
              <dt>local time</dt>
              <dd>
                <Clock /> (Vietnam)
              </dd>
            </div>
          </dl>
        </section>

        <section className="tm-blk tm-s-education" id="education">
          <Cmd>ls education/</Cmd>
          <dl className="tm-rows">
            {education.map((e) => (
              <div className="tm-rows-row" key={e.years}>
                <dt>{e.years}</dt>
                <dd>
                  <strong>{e.title}</strong>
                  {e.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="tm-blk tm-s-skills" id="skills">
          <Cmd>cat skills.txt</Cmd>
          <dl className="tm-kv tm-lb">
            {skillBars.map((s) => (
              <div className="tm-kv-row" key={s.name}>
                <dt>{s.name}</dt>
                <dd role="img" aria-label={`${s.filled} out of ${s.total}`}>
                  <span className="tm-on">{"█".repeat(s.filled)}</span>
                  <span className="tm-off">{"░".repeat(s.total - s.filled)}</span>
                </dd>
              </div>
            ))}
          </dl>
          <dl className="tm-kv">
            {skillGroups.map((g) => (
              <div className="tm-kv-row" key={g.label}>
                <dt>{g.label}</dt>
                <dd>{g.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* PROJECTS: side by side */}
        <section className="tm-blk tm-s-projects" id="projects">
          <Cmd>ls ~/projects</Cmd>
          <div className="tm-projgrid">
            {projects.map((p) => (
              <article className="tm-proj tm-pj" key={p.name}>
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <p className="tm-dim">stack: {p.stack}</p>
                  <p className="tm-links">
                    <a href={p.source} target="_blank" rel="noopener noreferrer">
                      [source]
                    </a>
                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                      [live]
                    </a>
                  </p>
                </div>
                <div className="tm-shot">
                  {p.shot === "hvtcoder" ? <HvtShot /> : <AlgoverseShot />}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NOTES on the left, moments + achievements stacked on the right */}
        <section className="tm-blk tm-s-notes" id="notes">
          <Cmd>git log notes</Cmd>
          {notes.map((n) => (
            <article className="tm-note" key={n.date + n.title}>
              <h3>
                <span className="tm-date">{n.date}</span>
                <span className="tm-tag">[{n.tag}]</span>
                {n.title}
              </h3>
              <p>{n.body}</p>
            </article>
          ))}
        </section>

        <div className="tm-stack">
          <section className="tm-blk tm-s-moments" id="moments">
            <Cmd>ls moments/</Cmd>
            <Moments />
          </section>

          <section className="tm-blk tm-s-achievements" id="achievements">
            <Cmd>git tag -n</Cmd>
            <dl className="tm-rows">
              {achievements.map((a) => (
                <div className="tm-rows-row" key={a.year}>
                  <dt>{a.year}</dt>
                  <dd>
                    <strong>{a.title}</strong>
                    {a.body}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* CONTACT */}
        <section className="tm-blk tm-s-contact" id="contact">
          <Cmd>cat contact.txt</Cmd>
          <div className="tm-contact-icons">
            {contacts.map((c) => (
              <a
                key={c.label}
                className="tm-cicon"
                href={c.href}
                title={`${c.label}: ${c.text}`}
                aria-label={`${c.label}: ${c.text}`}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {c.icon === "mail" && <Mail size={22} strokeWidth={1.6} />}
                {c.icon === "github" && <SiGithub />}
                {c.icon === "codeforces" && <SiCodeforces />}
                {c.icon === "tiktok" && <SiTiktok />}
                {c.icon === "facebook" && <SiFacebook />}
                {c.icon === "tag" && <TagIcon label={c.tag ?? "?"} />}
              </a>
            ))}
            <DiscordPresence />
          </div>
        </section>

        <section className="tm-blk tm-s-prompt">
          <Prompt />
        </section>
      </main>

      <footer className="tm-footer">&copy; 2026 Versachios. Built with curiosity.</footer>
    </div>
  );
}

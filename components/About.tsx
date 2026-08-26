import { Reveal } from "./Reveal";

export function About() {
  return (
    <div>
      <Reveal>
        <p className="label mb-6">Why this exists</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-display-md font-semibold text-ink dark:text-cream">
          This is a{" "}
          <span className="marker font-accent italic text-signal dark:text-signal-dark">
            workbench
          </span>
          , not a résumé.
        </h2>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-6 max-w-xl text-balance leading-relaxed text-ink-soft dark:text-cream-soft">
          I built this site as a place to keep the things I&rsquo;m actually
          doing — projects that ship, problems I&rsquo;m still stuck on,
          experiments that go nowhere, and the occasional idea worth writing
          down. It updates the way my understanding does: unevenly, and
          usually after something broke first.
        </p>
      </Reveal>
    </div>
  );
}

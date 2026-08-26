import { NOTES } from "@/lib/data";
import { Reveal } from "./Reveal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function Notes() {
  return (
    <section id="notes" className="container-page pb-20 sm:pb-24">
      <Reveal>
        <p className="label mb-8">Notes</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-10 border-t rule dark:border-line-dark sm:grid-cols-2">
        {NOTES.map((note, i) => (
          <Reveal key={note.index} delay={i * 40}>
            <a
              href="#"
              className="group flex gap-4 border-b rule py-5 transition-colors duration-300 dark:border-line-dark sm:odd:pr-4"
            >
              <span className="index-mark pt-0.5">{note.index}</span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium text-ink transition-transform duration-300 ease-soft group-hover:translate-x-1 dark:text-cream">
                    {note.title}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wide text-signal dark:text-signal-dark">
                    {note.category}
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-soft dark:text-cream-soft">
                  {note.excerpt}
                </span>
                <span className="mt-1.5 block font-mono text-[0.65rem] text-ink-faint dark:text-cream-faint">
                  {formatDate(note.date)}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

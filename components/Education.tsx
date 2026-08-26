import { ExternalLink } from "lucide-react";
import { EDUCATION } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <div>
      <Reveal>
        <p className="label mb-8">Education</p>
      </Reveal>

      <ol className="relative border-l rule pl-7">
        {EDUCATION.map((item, i) => (
          <Reveal key={item.institution} delay={i * 90}>
            <li className="relative pb-8 last:pb-0">
              <span className="absolute -left-[2.06rem] top-1.5 h-2 w-2 rounded-full bg-signal dark:bg-signal-dark" />
              <p className="label mb-2">{item.year}</p>
              <h3 className="text-base font-medium text-ink dark:text-cream">
                <span className="marker font-accent not-italic text-ink dark:text-cream">
                  {item.institution}
                </span>
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft dark:text-cream-soft">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-ink-faint hover:text-ink dark:text-cream-faint dark:hover:text-cream"
                >
                  Learn more <ExternalLink size={11} />
                </a>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

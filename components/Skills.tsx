import { SKILLS } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <div>
      <Reveal>
        <p className="label mb-8">Skills &amp; interests</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SKILLS.map((group, i) => (
          <Reveal key={group.category} delay={i * 60}>
            <div className="border-t rule pt-3">
              <h3 className="mb-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint dark:text-cream-faint">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-sm text-ink-soft dark:text-cream-soft">
                {group.items.map((item, idx) => (
                  <span key={item} className="flex items-center">
                    {item}
                    {idx < group.items.length - 1 && (
                      <span className="ml-2 text-ink-faint/50 dark:text-cream-faint/50">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

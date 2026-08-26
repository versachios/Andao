import { Award, Flag, Medal, Star, Target, Trophy } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/data";
import { Reveal } from "./Reveal";

const ICONS = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  star: Star,
  target: Target,
  flag: Flag,
};

export function Achievements() {
  return (
    <section className="container-page pb-20 sm:pb-24">
      <Reveal>
        <p className="label mb-8">Achievements</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 border-t rule pt-8 dark:border-line-dark sm:grid-cols-3">
        {ACHIEVEMENTS.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal key={item.title} delay={i * 60}>
              <div className="sm:border-l sm:rule sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border rule text-ember dark:text-ember-dark">
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <span className="mt-3 block font-mono text-xs text-ink-faint dark:text-cream-faint">
                  {item.date}
                </span>
                <p className="mt-1.5 font-medium text-ink dark:text-cream">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft dark:text-cream-soft">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

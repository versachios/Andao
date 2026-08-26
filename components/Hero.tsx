import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/data";
import { HeroMark } from "./art/HeroMark";
import { FontCycle } from "./FontCycle";

export function Hero() {
  return (
    <section
      id="top"
      className="container-page grid grid-cols-1 items-center gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:pb-28"
    >
      <div className="lg:pr-4">
        <p className="label mb-7">Build &amp; learn</p>

        <h1 className="text-display-lg font-semibold text-ink dark:text-cream">
          Hi, I&rsquo;m <FontCycle>{SITE.name}</FontCycle>
          <br />
          <span className="text-ink-faint dark:text-cream-faint">
            I turn ideas into{" "}
            <span className="marker font-accent italic text-ember dark:text-ember-dark">
              things that run
            </span>
            .
          </span>
        </h1>

        <p className="mt-9 max-w-lg text-balance text-base leading-relaxed text-ink-soft dark:text-cream-soft sm:text-lg">
          A Vietnamese student working through competitive programming, web
          development.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors duration-300 hover:bg-ember dark:bg-cream dark:text-charcoal dark:hover:bg-ember-dark"
          >
            Explore projects
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full border rule px-5 py-2.5 text-sm text-ink transition-colors duration-300 hover:border-ember dark:text-cream dark:hover:border-ember-dark"
          >
            About me
            <ArrowDownRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md justify-self-center lg:mx-0 lg:max-w-none lg:justify-self-end">
        <HeroMark />
      </div>
    </section>
  );
}

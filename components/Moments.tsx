"use client";

import { Camera, Pin } from "lucide-react";
import { MOMENTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Hand-drawn wavy line, like a string connecting two pinned photos. */
function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("hidden h-8 w-14 shrink-0 text-ink-faint/50 dark:text-cream-faint/40 sm:block sm:w-20", className)}
    >
      <path
        d="M2 20 C 20 2, 40 38, 60 20 S 100 2, 118 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
    </svg>
  );
}

function PolaroidCard({ title, image, rotate }: { title: string; image?: string; rotate: number }) {
  return (
    <div
      className="group relative inline-block rounded-[2px] bg-cream p-3 pb-8 shadow-[0_10px_24px_-12px_rgba(35,32,25,0.35)] transition-shadow duration-300 hover:shadow-[0_16px_30px_-14px_rgba(35,32,25,0.45)] dark:bg-cream dark:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* the pin, half-stuck through the top edge */}
      <Pin
        size={20}
        strokeWidth={1.75}
        fill="currentColor"
        fillOpacity={0.18}
        className="absolute -top-2.5 left-5 -rotate-45 text-ember drop-shadow-sm"
      />

      <div className="relative aspect-[4/3] w-40 overflow-hidden bg-paper-dim sm:w-48">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-ink-faint/60">
            <Camera size={22} strokeWidth={1.5} />
            <span className="font-mono text-[0.6rem] uppercase tracking-wider">Add photo</span>
          </div>
        )}
      </div>

      <p className="mt-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
        {title}
      </p>
    </div>
  );
}

export function Moments() {
  return (
    <section id="moments" className="container-page pb-20 sm:pb-24">
      <Reveal>
        <p className="label mb-8">Random Images</p>
      </Reveal>

      <Reveal delay={60}>
        <div className="flex flex-wrap items-center justify-center gap-y-6 border-t rule pt-10 dark:border-line-dark sm:justify-start sm:gap-y-10">
          {MOMENTS.map((moment, i) => (
            <div key={moment.title} className="flex items-center">
              <PolaroidCard {...moment} />
              {i < MOMENTS.length - 1 && <Squiggle />}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
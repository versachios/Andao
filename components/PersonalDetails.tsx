"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/data";
import { calculateAge, formatTime } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function PersonalDetails() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  const rows: { label: string; value: string }[] = [
    { label: "Age", value: `${calculateAge(SITE.birthDateISO)}` },
    { label: "Location", value: SITE.location },
    { label: "Focus", value: SITE.focus },
    { label: "Currently", value: SITE.currently },
    { label: "Local time", value: now ? formatTime(now, SITE.timeZone) : "—" },
    { label: "Status", value: "Try my hardest to get into HVT :>" },
  ];

  return (
    <Reveal delay={100}>
      <dl className="divide-y divide-line rounded-md border rule dark:divide-line-dark">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-4 py-3">
            <dt className="label">{row.label}</dt>
            <dd className="font-mono text-sm text-ink-soft dark:text-cream-soft">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

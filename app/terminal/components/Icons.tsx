import type { SVGProps } from "react";

/**
 * Generic bracket-tag icon for competitive-programming judges that don't
 * have a widely recognized brand mark (VNOJ, ClueOJ).
 */
export function TagIcon({ label, ...rest }: { label: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M9 4L4 12l5 8M15 4l5 8-5 8" />
      <text
        x="12"
        y="14.5"
        textAnchor="middle"
        fontSize="6.5"
        fontFamily="var(--mono)"
        fill="currentColor"
        stroke="none"
      >
        {label}
      </text>
    </svg>
  );
}

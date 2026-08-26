export function HeroMark() {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      className="h-full w-full text-ink dark:text-cream"
      aria-hidden="true"
    >
      {/* loose dotted backdrop, deliberately uneven spacing for a sketched feel */}
      <g className="text-ink-faint/25 dark:text-cream-faint/20" fill="currentColor">
        {[
          [28, 24], [96, 18], [168, 26], [238, 16], [312, 24], [382, 18],
          [24, 92], [382, 88], [24, 330], [382, 336], [24, 396], [96, 402],
          [168, 394], [238, 404], [312, 396], [382, 402],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.6} />
        ))}
      </g>

      {/* hand-drawn terminal window — slightly bowed sides instead of a perfect rect */}
      <path
        d="M 58 96
           C 100 92, 300 90, 362 98
           C 366 150, 364 240, 361 302
           C 300 308, 110 309, 60 303
           C 56 240, 57 150, 58 96 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="text-ink dark:text-cream"
      />

      {/* title bar, drawn as a slightly wavy line rather than a ruler-straight one */}
      <path
        d="M 58 138 C 140 141, 300 135, 362 139"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-ink dark:text-cream"
      />
      <circle cx="80" cy="118" r="4.5" fill="currentColor" className="text-ember dark:text-ember-dark" />
      <circle cx="98" cy="118" r="4.5" fill="currentColor" className="text-ink-faint dark:text-cream-faint" />
      <circle cx="116" cy="118" r="4.5" fill="currentColor" className="text-ink-faint dark:text-cream-faint" />

      {/* code lines — short hand-sketched strokes of varying length */}
      <g strokeLinecap="round" strokeWidth="7" className="text-ink-faint dark:text-cream-faint">
        <path d="M 84 168 C 110 166, 136 170, 158 168" stroke="currentColor" />
        <path d="M 84 194 C 130 191, 200 196, 236 193" stroke="currentColor" />
        <path
          d="M 108 220 C 140 217, 190 222, 214 219"
          stroke="currentColor"
          className="text-signal dark:text-signal-dark"
        />
        <path d="M 84 246 C 120 244, 170 248, 190 245" stroke="currentColor" />
        <path
          d="M 84 272 C 100 270, 118 273, 130 271"
          stroke="currentColor"
          className="text-ember dark:text-ember-dark"
        />
      </g>

      {/* blinking cursor */}
      <rect x="140" y="266" width="9" height="16" rx="1.5" className="cursor-blink text-ember dark:text-ember-dark" fill="currentColor" />

      {/* a loose orbiting mark for warmth — echoes the accent color used elsewhere */}
      <path
        d="M 320 340 C 336 332, 352 336, 356 352 C 360 368, 346 380, 330 376"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-ember/70 dark:text-ember-dark/70"
      />
    </svg>
  );
}

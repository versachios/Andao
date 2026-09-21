/** Illustrations used as project thumbnails. Swap for real screenshots when you have them. */

export function HvtShot() {
  return (
    <svg
      viewBox="0 0 260 150"
      role="img"
      aria-label="Illustration of HVTCoder analysis output: complexity, likely bug, edge case, hint"
    >
      <rect width="260" height="150" fill="var(--bg0)" />
      <text x="10" y="17" className="tm-svg-t" fill="var(--dim)">
        solution.cpp
      </text>
      <rect x="10" y="28" width="90" height="4" rx="2" fill="var(--line)" />
      <rect x="22" y="38" width="130" height="4" rx="2" fill="var(--line)" />
      <rect x="22" y="48" width="104" height="4" rx="2" fill="var(--line)" />
      <rect x="34" y="58" width="72" height="4" rx="2" fill="var(--line)" />
      <rect x="10" y="68" width="28" height="4" rx="2" fill="var(--line)" />
      <rect x="0" y="80" width="260" height="1" fill="var(--line)" />
      <text x="10" y="98" className="tm-svg-t" fill="var(--amber)">complexity</text>
      <text x="86" y="98" className="tm-svg-t" fill="var(--green)">O(n log n)</text>
      <text x="10" y="113" className="tm-svg-t" fill="var(--amber)">bug?</text>
      <text x="86" y="113" className="tm-svg-t" fill="var(--red)">line 14, off-by-one</text>
      <text x="10" y="128" className="tm-svg-t" fill="var(--amber)">edge</text>
      <text x="86" y="128" className="tm-svg-t" fill="var(--fg)">n = 1</text>
      <text x="10" y="143" className="tm-svg-t" fill="var(--amber)">hint</text>
      <text x="86" y="143" className="tm-svg-t" fill="var(--cyan)">think binary search</text>
    </svg>
  );
}

const HEIGHTS = [30, 52, 22, 64, 40, 48];
const CY = 112;
const A = 14;
const B = 7;
const HOT = 3;

export function AlgoverseShot() {
  return (
    <svg
      viewBox="0 0 260 150"
      role="img"
      aria-label="Illustration of Algoverse: an array drawn as 2.5D bars with one element highlighted"
    >
      <rect width="260" height="150" fill="var(--bg0)" />
      <text x={30 + HOT * 40} y={22} textAnchor="middle" className="tm-svg-t" fill="var(--amber)">
        i
      </text>
      <line
        x1={30 + HOT * 40}
        y1={27}
        x2={30 + HOT * 40}
        y2={CY - HEIGHTS[HOT] - B - 4}
        stroke="var(--amber)"
        strokeWidth={1}
        strokeDasharray="2 2"
      />
      {HEIGHTS.map((h, n) => {
        const cx = 30 + n * 40;
        const col = n === HOT ? "var(--amber)" : "var(--cyan)";
        return (
          <g key={n}>
            <polygon
              points={`${cx - A},${CY - h} ${cx},${CY - h + B} ${cx},${CY + B} ${cx - A},${CY}`}
              fill={col}
              opacity={0.5}
            />
            <polygon
              points={`${cx + A},${CY - h} ${cx},${CY - h + B} ${cx},${CY + B} ${cx + A},${CY}`}
              fill={col}
              opacity={0.28}
            />
            <polygon
              points={`${cx},${CY - h - B} ${cx + A},${CY - h} ${cx},${CY - h + B} ${cx - A},${CY - h}`}
              fill={col}
            />
            <text x={cx} y={CY + B + 14} textAnchor="middle" className="tm-svg-t" fill="var(--dim)">
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

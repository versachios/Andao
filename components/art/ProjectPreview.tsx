export function ProjectPreview() {
  const nodes = [
    { x: 30, y: 100 },
    { x: 100, y: 40 },
    { x: 100, y: 140 },
    { x: 170, y: 70 },
    { x: 170, y: 130 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 4],
  ];

  return (
    <svg viewBox="0 0 200 180" fill="none" className="h-full w-full" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" className="text-ink-faint/70 dark:text-cream-faint/60">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 3 ? 7 : 5}
          className={i === 3 ? "text-signal dark:text-signal-dark" : "text-ink dark:text-cream"}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

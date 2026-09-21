"use client";

import { useEffect, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- BFS on a 15-node binary tree ---------- */

const NODES = Array.from({ length: 15 }, (_, i) => {
  const lv = Math.floor(Math.log2(i + 1));
  const k = i + 1 - 2 ** lv;
  return { x: (300 * (k + 0.5)) / 2 ** lv, y: 18 + lv * 36 };
});

function Bfs() {
  // 15 means "everything visited" (the static state, also used for reduced motion)
  const [t, setT] = useState(15);

  useEffect(() => {
    if (reducedMotion()) return;
    let cur = -1;
    let timer: ReturnType<typeof setTimeout>;
    setT(-1);
    const loop = () => {
      if (!document.hidden) {
        cur = cur + 1 > 15 ? -1 : cur + 1;
        setT(cur);
      }
      timer = setTimeout(loop, cur === 15 ? 1400 : 420);
    };
    timer = setTimeout(loop, 420);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      viewBox="0 0 300 140"
      role="img"
      aria-label="Breadth-first search visiting a binary tree level by level"
    >
      {NODES.slice(1).map((n, idx) => {
        const i = idx + 1;
        const p = NODES[Math.floor((i - 1) / 2)];
        return (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={n.x}
            y2={n.y}
            strokeWidth={1.5}
            stroke={i <= t ? "var(--green)" : "var(--line)"}
          />
        );
      })}
      {NODES.map((n, i) => {
        const cur = i === t;
        const seen = i < t;
        return (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={10}
              strokeWidth={1.5}
              fill={cur ? "var(--amber)" : seen ? "var(--green)" : "var(--bg)"}
              stroke={cur ? "var(--amber)" : seen ? "var(--green)" : "var(--line)"}
            />
            <text
              x={n.x}
              y={n.y + 3.5}
              textAnchor="middle"
              className="tm-svg-t"
              fill={cur || seen ? "var(--bg)" : "var(--dim)"}
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- insertion sort ---------- */

const N = 24;
const W = 300;
const H = 140;
const BW = W / N;

type Sort = { a: number[]; i: number; j: number };

function initial(): Sort {
  // deterministic permutation of 1..N, so server and client render the same first frame
  return { a: Array.from({ length: N }, (_, n) => ((n * 7) % N) + 1), i: 1, j: 1 };
}

function shuffled(): Sort {
  const a = Array.from({ length: N }, (_, n) => n + 1);
  for (let m = N - 1; m > 0; m--) {
    const z = Math.floor(Math.random() * (m + 1));
    [a[m], a[z]] = [a[z], a[m]];
  }
  return { a, i: 1, j: 1 };
}

/** advance one swap; returns the index being moved, or -1 when sorted */
function step(s: Sort): number {
  if (s.i >= N) return -1;
  if (s.j > 0 && s.a[s.j - 1] > s.a[s.j]) {
    [s.a[s.j], s.a[s.j - 1]] = [s.a[s.j - 1], s.a[s.j]];
    s.j -= 1;
    return s.j;
  }
  s.i += 1;
  s.j = s.i;
  return s.i - 1;
}

function SortBars() {
  const [frame, setFrame] = useState({ a: initial().a, i: 1, cur: -1 });

  useEffect(() => {
    if (reducedMotion()) {
      const s = initial();
      for (let k = 0; k < 140; k++) step(s);
      setFrame({ a: [...s.a], i: s.i, cur: -1 });
      return;
    }
    let s = shuffled();
    let timer: ReturnType<typeof setTimeout>;
    setFrame({ a: [...s.a], i: s.i, cur: -1 });
    const loop = () => {
      if (document.hidden) {
        timer = setTimeout(loop, 55);
        return;
      }
      const cur = step(s);
      if (cur === -1) {
        setFrame({ a: [...s.a], i: N, cur: -1 });
        timer = setTimeout(() => {
          s = shuffled();
          setFrame({ a: [...s.a], i: s.i, cur: -1 });
          loop();
        }, 1600);
        return;
      }
      setFrame({ a: [...s.a], i: s.i, cur });
      timer = setTimeout(loop, 55);
    };
    timer = setTimeout(loop, 55);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      viewBox="0 0 300 140"
      role="img"
      aria-label="Insertion sort arranging bars from short to tall"
    >
      {frame.a.map((v, n) => {
        const h = (v / N) * (H - 6);
        const cur = n === frame.cur;
        const done = n < frame.i;
        return (
          <rect
            key={n}
            x={n * BW + 1}
            y={H - h}
            width={BW - 2}
            height={h}
            rx={1.5}
            fill={cur ? "var(--amber)" : done ? "var(--green)" : "var(--cyan)"}
            opacity={cur || done ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

export function Visuals() {
  return (
    <div className="tm-tiles">
      <div className="tm-tile">
        <span className="tm-tt">bfs.cpp</span>
        <Bfs />
        <p className="tm-cap">nodes are numbered in the order they get visited</p>
      </div>
      <div className="tm-tile">
        <span className="tm-tt">insertion_sort.cpp</span>
        <SortBars />
        <p className="tm-cap">amber is the element being moved, green is sorted</p>
      </div>
    </div>
  );
}

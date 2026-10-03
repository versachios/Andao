"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Step = [number, number, 0 | 1]; // [i, j, isSwap]
type Algo = "insertion" | "bubble" | "selection";

const N = 28;

function* bubble(a: number[]): Generator<Step> {
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < a.length - i - 1; j++) {
      yield [j, j + 1, 0];
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield [j, j + 1, 1];
      }
    }
}

function* insertion(a: number[]): Generator<Step> {
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0) {
      yield [j - 1, j, 0];
      if (a[j - 1] <= a[j]) break;
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      yield [j - 1, j, 1];
      j--;
    }
  }
}

function* selection(a: number[]): Generator<Step> {
  for (let i = 0; i < a.length; i++) {
    let m = i;
    for (let j = i + 1; j < a.length; j++) {
      yield [m, j, 0];
      if (a[j] < a[m]) m = j;
    }
    if (m !== i) {
      [a[i], a[m]] = [a[m], a[i]];
      yield [i, m, 1];
    }
  }
}

const ALGOS: Record<Algo, (a: number[]) => Generator<Step>> = { bubble, insertion, selection };

function shuffled(): number[] {
  const a = Array.from({ length: N }, (_, i) => 8 + Math.round((i * 92) / (N - 1)));
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SortViz() {
  // start sorted so server and client render the same markup, shuffle after mount
  const [arr, setArr] = useState<number[]>(() => Array.from({ length: N }, (_, i) => 8 + Math.round((i * 92) / (N - 1))));
  const [hl, setHl] = useState<[number, number] | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [algo, setAlgo] = useState<Algo>("insertion");
  const [stats, setStats] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const shuffle = useCallback(() => {
    stop();
    setBusy(false);
    setDone(false);
    setHl(null);
    setStats("");
    setArr(shuffled());
  }, [stop]);

  useEffect(() => {
    shuffle();
    return stop;
  }, [shuffle, stop]);

  const run = () => {
    if (busy) return;
    setBusy(true);
    setDone(false);
    const work = [...arr];
    const it = ALGOS[algo](work);
    let cmp = 0;
    let sw = 0;
    timer.current = setInterval(() => {
      const r = it.next();
      if (r.done) {
        stop();
        setArr(work);
        setHl(null);
        setDone(true);
        setBusy(false);
        setStats(`sorted · ${cmp} comparisons · ${sw} swaps`);
        return;
      }
      const [i, j, isSwap] = r.value;
      if (isSwap) sw++;
      else cmp++;
      setArr([...work]);
      setHl([i, j]);
      setStats(`${cmp} comparisons · ${sw} swaps`);
    }, 35);
  };

  return (
    <>
      <div className="pf-bars" aria-hidden="true">
        {arr.map((v, i) => (
          <div
            key={i}
            className={`pf-bb${done ? " d" : ""}${hl && (i === hl[0] || i === hl[1]) ? " a" : ""}`}
            style={{ height: `${v}%` }}
          />
        ))}
      </div>
      <div className="pf-ctrls">
        <select className="pf-ic" value={algo} disabled={busy} onChange={(e) => setAlgo(e.target.value as Algo)} aria-label="Algorithm">
          <option value="insertion">Insertion sort</option>
          <option value="bubble">Bubble sort</option>
          <option value="selection">Selection sort</option>
        </select>
        <button className="pf-btn f" onClick={run} disabled={busy}>▶ Run</button>
        <button className="pf-btn" onClick={shuffle}>🔀 Shuffle</button>
      </div>
      <div className="pf-mono pf-st" aria-live="polite">{stats}</div>
    </>
  );
}

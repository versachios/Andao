"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Step = [number, number, 0 | 1 | 2]; // [i, j, kind]: 0 compare, 1 swap, 2 write (i = index)
type Algo = "bubble" | "insertion" | "selection" | "shell" | "quick" | "merge" | "heap";

const N = 40;

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

function* shell(a: number[]): Generator<Step> {
  for (let gap = a.length >> 1; gap > 0; gap >>= 1)
    for (let i = gap; i < a.length; i++) {
      let j = i;
      while (j >= gap) {
        yield [j - gap, j, 0];
        if (a[j - gap] <= a[j]) break;
        [a[j - gap], a[j]] = [a[j], a[j - gap]];
        yield [j - gap, j, 1];
        j -= gap;
      }
    }
}

function* qs(a: number[], lo: number, hi: number): Generator<Step> {
  if (lo >= hi) return;
  const p = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    yield [j, hi, 0];
    if (a[j] < p) {
      if (i !== j) {
        [a[i], a[j]] = [a[j], a[i]];
        yield [i, j, 1];
      }
      i++;
    }
  }
  if (i !== hi) {
    [a[i], a[hi]] = [a[hi], a[i]];
    yield [i, hi, 1];
  }
  yield* qs(a, lo, i - 1);
  yield* qs(a, i + 1, hi);
}
const quick = (a: number[]) => qs(a, 0, a.length - 1);

function* ms(a: number[], aux: number[], lo: number, hi: number): Generator<Step> {
  if (lo >= hi) return;
  const mid = (lo + hi) >> 1;
  yield* ms(a, aux, lo, mid);
  yield* ms(a, aux, mid + 1, hi);
  for (let k = lo; k <= hi; k++) aux[k] = a[k];
  let i = lo;
  let j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) a[k] = aux[j++];
    else if (j > hi) a[k] = aux[i++];
    else {
      yield [i, j, 0];
      a[k] = aux[i] <= aux[j] ? aux[i++] : aux[j++];
    }
    yield [k, k, 2];
  }
}
const merge = (a: number[]) => ms(a, [...a], 0, a.length - 1);

function* sift(a: number[], start: number, end: number): Generator<Step> {
  let r = start;
  while (2 * r + 1 <= end) {
    let c = 2 * r + 1;
    if (c + 1 <= end) {
      yield [c, c + 1, 0];
      if (a[c] < a[c + 1]) c++;
    }
    yield [r, c, 0];
    if (a[r] >= a[c]) return;
    [a[r], a[c]] = [a[c], a[r]];
    yield [r, c, 1];
    r = c;
  }
}
function* heap(a: number[]): Generator<Step> {
  for (let s = (a.length >> 1) - 1; s >= 0; s--) yield* sift(a, s, a.length - 1);
  for (let e = a.length - 1; e > 0; e--) {
    [a[0], a[e]] = [a[e], a[0]];
    yield [0, e, 1];
    yield* sift(a, 0, e - 1);
  }
}

const ALGOS: Record<Algo, (a: number[]) => Generator<Step>> = { bubble, insertion, selection, shell, quick, merge, heap };
const LABEL: Record<Algo, string> = {
  bubble: "Bubble sort", insertion: "Insertion sort", selection: "Selection sort", shell: "Shell sort",
  quick: "Quick sort", merge: "Merge sort", heap: "Heap sort",
};
const INFO: Record<Algo, string> = {
  bubble: "O(n²) time · O(1) space · stable",
  insertion: "best O(n), average O(n²) · O(1) space · stable",
  selection: "O(n²) time always · O(1) space · unstable",
  shell: "about O(n log² n) with halving gaps · O(1) space · unstable",
  quick: "average O(n log n), worst O(n²) · O(log n) stack · unstable",
  merge: "O(n log n) time always · O(n) extra space · stable",
  heap: "O(n log n) time always · O(1) space · unstable",
};
const SPEEDS = { "1×": 1, "2×": 2, "4×": 4 } as const;
type Speed = keyof typeof SPEEDS;

const sortedArr = () => Array.from({ length: N }, (_, i) => 8 + Math.round((i * 92) / (N - 1)));
function shuffled(): number[] {
  const a = sortedArr();
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SortViz() {
  // start sorted so server and client render the same markup, shuffle after mount
  const [arr, setArr] = useState<number[]>(sortedArr);
  const [hl, setHl] = useState<[number, number] | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [algo, setAlgo] = useState<Algo>("quick");
  const [speed, setSpeed] = useState<Speed>("2×");
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
    const per = SPEEDS[speed];
    let cmp = 0;
    let moves = 0;
    timer.current = setInterval(() => {
      let last: [number, number] | null = null;
      for (let s = 0; s < per; s++) {
        const r = it.next();
        if (r.done) {
          stop();
          setArr(work);
          setHl(null);
          setDone(true);
          setBusy(false);
          setStats(`sorted · ${cmp} comparisons · ${moves} swaps/writes`);
          return;
        }
        const [i, j, kind] = r.value;
        if (kind === 0) cmp++;
        else moves++;
        last = [i, j];
      }
      setArr([...work]);
      setHl(last);
      setStats(`${cmp} comparisons · ${moves} swaps/writes`);
    }, 16);
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
          {(Object.keys(LABEL) as Algo[]).map((k) => (
            <option key={k} value={k}>{LABEL[k]}</option>
          ))}
        </select>
        <select className="pf-ic" value={speed} onChange={(e) => setSpeed(e.target.value as Speed)} aria-label="Speed">
          {(Object.keys(SPEEDS) as Speed[]).map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <button className="pf-btn f" onClick={run} disabled={busy}>▶ Run</button>
        <button className="pf-btn" onClick={shuffle}>🔀 Shuffle</button>
      </div>
      <div className="pf-mono pf-st" aria-live="polite">{stats || "\u00A0"}</div>
      <div className="pf-mono pf-info">{INFO[algo]}</div>
    </>
  );
}

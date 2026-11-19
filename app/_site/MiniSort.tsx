"use client";

import { useEffect, useState } from "react";

const N = 28;
const sorted = () => Array.from({ length: N }, (_, i) => i + 3);
function shuffled() {
  const a = sorted();
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Self-running bubble sort. Starts sorted so server and client markup match. */
export function MiniSort() {
  const [arr, setArr] = useState<number[]>(sorted);
  const [cur, setCur] = useState(-1);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setArr(shuffled());
      return;
    }
    let a = shuffled();
    let i = 0;
    let k = 0;
    let wait = 0;
    setArr([...a]);
    const id = setInterval(() => {
      if (wait > 0) {
        if (--wait === 0) {
          a = shuffled();
          i = 0;
          k = 0;
          setArr([...a]);
        }
        return;
      }
      if (k >= a.length - 1 - i) {
        k = 0;
        i++;
      }
      if (i >= a.length - 1) {
        wait = 25;
        setCur(-1);
        return;
      }
      if (a[k] > a[k + 1]) [a[k], a[k + 1]] = [a[k + 1], a[k]];
      setArr([...a]);
      setCur(k);
      k++;
    }, 40);
    return () => clearInterval(id);
  }, [round]);

  return (
    <button type="button" className="pf-mbars" onClick={() => setRound((r) => r + 1)} aria-label="Sorting animation, click to reshuffle">
      {arr.map((v, x) => (
        <i key={x} className={x === cur || x === cur + 1 ? "a" : ""} style={{ height: `${v * 3.2}%` }} />
      ))}
    </button>
  );
}

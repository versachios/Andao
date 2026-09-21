"use client";

import { useState } from "react";
import { moments } from "../data";

function Frame({ file, caption }: { file: string; caption: string }) {
  const [failed, setFailed] = useState(false);
  const href = `/moments/${file}`;
  return (
    <figure>
      <a className="tm-ph" href={href} target="_blank" rel="noopener noreferrer">
        {file}
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={href} alt={caption} loading="lazy" onError={() => setFailed(true)} />
        )}
      </a>
      <figcaption>
        <a className="tm-f" href={href} target="_blank" rel="noopener noreferrer">
          {file}
        </a>
        {caption}
      </figcaption>
    </figure>
  );
}

export function Moments() {
  return (
    <div className="tm-gal">
      {moments.map((m) => (
        <Frame key={m.file} {...m} />
      ))}
    </div>
  );
}

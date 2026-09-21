import type { ReactNode } from "react";

export function Ps1({ cwd = "~" }: { cwd?: string }) {
  return (
    <span className="tm-ps1">
      <span>[</span>
      <span className="tm-who">andao@archlinux</span> <span className="tm-cwd">{cwd}</span>
      <span>]</span> <span className="tm-dollar">$</span>
    </span>
  );
}

/** A prompt line: `[andao@archlinux ~] $ <command>` */
export function Cmd({
  as = "h2",
  children,
  style,
}: {
  as?: "h2" | "p";
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  const Tag = as;
  return (
    <Tag className="tm-cmd" style={style}>
      <Ps1 /> <span className="tm-arg">{children}</span>
    </Tag>
  );
}

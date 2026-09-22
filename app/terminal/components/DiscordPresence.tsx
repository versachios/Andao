"use client";

import { useEffect, useRef, useState } from "react";
import { SiDiscord } from "react-icons/si";

/**
 * Live Discord presence via Lanyard (https://github.com/Phineas/lanyard).
 *
 * Lanyard only tracks members of its own Discord server, so this account
 * must join https://discord.gg/lanyard once for the API below to return
 * live data. DISCORD_USER_ID is your numeric Discord user ID (enable
 * Developer Mode in Discord, then "Copy User ID" from your profile).
 */
const DISCORD_USER_ID = "1129650326333558874"; // <-- replace with your Discord user ID

type LanyardStatus = "online" | "idle" | "dnd" | "offline";

type LanyardData = {
  discord_user: { id: string; username: string; global_name: string | null; avatar: string | null };
  discord_status: LanyardStatus;
  activities: { name: string; type: number; details?: string; state?: string }[];
  listening_to_spotify: boolean;
  spotify: { song: string; artist: string; album_art_url: string } | null;
};

const STATUS_LABEL: Record<LanyardStatus, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};
const STATUS_VAR: Record<LanyardStatus, string> = {
  online: "var(--green)",
  idle: "var(--amber)",
  dnd: "var(--red)",
  offline: "var(--dim)",
};

function avatarUrl(u: LanyardData["discord_user"]) {
  if (u.avatar) return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=64`;
  // mod-6 on the numeric ID string, done digit by digit to avoid needing BigInt
  const idx = u.id.split("").reduce((acc, d) => (acc * 10 + Number(d)) % 6, 0);
  return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
}

export function DiscordPresence() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<LanyardData | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const load = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const json = await res.json();
        if (cancelled) return;
        if (json.success) {
          setData(json.data);
          setState("ok");
        } else {
          setState("error");
        }
      } catch {
        if (!cancelled) setState("error");
      }
      timer = setTimeout(load, 20000);
    };
    setState("loading");
    load();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activity = data?.activities.find((a) => a.type !== 4); // 4 = custom status, shown separately if needed

  return (
    <div className="tm-dc-wrap" ref={boxRef}>
      <button
        type="button"
        className="tm-cicon"
        aria-label="Discord: live presence"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <SiDiscord />
      </button>

      {open && (
        <div className="tm-dc-pop" role="dialog" aria-label="Discord presence">
          <p className="tm-dc-head">
            <span className="tm-dim">$</span> discord --status
          </p>

          {state === "loading" && <p className="tm-dim">connecting to lanyard...</p>}

          {state === "error" && (
            <p className="tm-dim">
              couldn&apos;t load live status.{" "}
              <a href="https://discord.gg/lanyard" target="_blank" rel="noopener noreferrer">
                requires the Lanyard server
              </a>
              .
            </p>
          )}

          {state === "ok" && data && (
            <div className="tm-dc-body">
              <div className="tm-dc-id">
                <span className="tm-dc-avatar" style={{ position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl(data.discord_user)} alt="" width={40} height={40} />
                  <span
                    className="tm-dc-dot"
                    style={{ background: STATUS_VAR[data.discord_status] }}
                  />
                </span>
                <span>
                  <span className="tm-dc-name">
                    {data.discord_user.global_name || data.discord_user.username}
                  </span>
                  <span className="tm-dc-status" style={{ color: STATUS_VAR[data.discord_status] }}>
                    {STATUS_LABEL[data.discord_status]}
                  </span>
                </span>
              </div>

              {data.listening_to_spotify && data.spotify && (
                <p className="tm-dc-activity">
                  ♫ {data.spotify.song} — {data.spotify.artist}
                </p>
              )}
              {!data.listening_to_spotify && activity && (
                <p className="tm-dc-activity">
                  {activity.name}
                  {activity.details ? `: ${activity.details}` : ""}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

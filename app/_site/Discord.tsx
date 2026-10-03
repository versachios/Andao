"use client";

import { useEffect, useRef, useState } from "react";
import { SiDiscord } from "react-icons/si";
import { DISCORD_USER_ID } from "../terminal/components/DiscordPresence";

type Status = "online" | "idle" | "dnd" | "offline";
type Data = {
  discord_user: { id: string; username: string; global_name: string | null; avatar: string | null };
  discord_status: Status;
  activities: { name: string; type: number; details?: string }[];
  listening_to_spotify: boolean;
  spotify: { song: string; artist: string } | null;
};

const LABEL: Record<Status, string> = { online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline" };
const COLOR: Record<Status, string> = { online: "#2abd67", idle: "#f0b232", dnd: "#f23f43", offline: "#80848e" };

function avatarUrl(u: Data["discord_user"]) {
  if (u.avatar) return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=64`;
  const idx = u.id.split("").reduce((acc, d) => (acc * 10 + Number(d)) % 6, 0);
  return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
}

/** Live Discord presence via Lanyard; same user id as the /terminal page. */
export function Discord() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const box = useRef<HTMLDivElement>(null);

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
        } else setState("error");
      } catch {
        if (!cancelled) setState("error");
      }
      timer = setTimeout(load, 20000);
    };
    setState("loading");
    load();

    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activity = data?.activities.find((a) => a.type !== 4);

  return (
    <div className="pf-dc" ref={box}>
      <a
        role="button"
        tabIndex={0}
        className="pf-ci"
        data-t="Discord"
        aria-label="Discord: live presence"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen((v) => !v)}
      >
        <SiDiscord />
      </a>
      {open && (
        <div className="pf-dc-pop" role="dialog" aria-label="Discord presence">
          {state === "loading" && <p>connecting to lanyard...</p>}
          {state === "error" && (
            <p>
              couldn&apos;t load live status.{" "}
              <a href="https://discord.gg/lanyard" target="_blank" rel="noopener noreferrer">requires the Lanyard server</a>
            </p>
          )}
          {state === "ok" && data && (
            <>
              <div className="pf-dc-id">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatarUrl(data.discord_user)} alt="" width={40} height={40} />
                <span>
                  <b>{data.discord_user.global_name || data.discord_user.username}</b>
                  <small style={{ color: COLOR[data.discord_status] }}>{LABEL[data.discord_status]}</small>
                </span>
              </div>
              {data.listening_to_spotify && data.spotify && (
                <p>♫ {data.spotify.song} — {data.spotify.artist}</p>
              )}
              {!data.listening_to_spotify && activity && (
                <p>{activity.name}{activity.details ? `: ${activity.details}` : ""}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

import type { ComponentType } from "react";
import { SiFacebook, SiGithub, SiTiktok, SiDiscord, SiCodeforces } from "react-icons/si";
import { Code2, Terminal } from "lucide-react";
import { SOCIALS } from "@/lib/data";

// VNOI and ClueOJ aren't in the icon set (no official brand glyph), so they
// fall back to generic "judge site" icons rather than an official logo.
const ICONS: Record<string, ComponentType<{ size?: number | string; className?: string }>> = {
  Facebook: SiFacebook,
  GitHub: SiGithub,
  TikTok: SiTiktok,
  Discord: SiDiscord,
  VNOI: Code2,
  ClueOJ: Terminal,
  Codeforces: SiCodeforces,
};

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {SOCIALS.map((social) => {
        const Icon = ICONS[social.label] ?? Code2;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={social.label}
            title={social.label}
            className="text-ink-faint transition-colors duration-300 hover:text-ember dark:text-cream-faint dark:hover:text-ember-dark"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}

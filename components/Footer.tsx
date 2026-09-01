import { Mail } from "lucide-react";
import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t rule">
      <div className="container-page flex flex-col gap-8 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-sm text-ink dark:text-cream">{SITE.name}</p>
            <p className="mt-1 text-sm text-ink-faint dark:text-cream-faint">
              Built with curiosity
            </p>
          </div>

          <div>
            <p className="label mb-3">Contact</p>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-1 font-mono text-xs text-ink-faint transition-colors duration-300 hover:text-ink dark:text-cream-faint dark:hover:text-cream"
            >
              Email
              <Mail size={11} />
            </a>
          </div>
        </div>

        <p className="font-mono text-xs text-ink-faint dark:text-cream-faint">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}

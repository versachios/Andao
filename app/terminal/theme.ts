export type ThemeMode = "dark" | "light" | "auto";
export const THEMES: ThemeMode[] = ["dark", "light", "auto"];
const KEY = "tm-theme";

function root(): HTMLElement | null {
  return document.querySelector<HTMLElement>(".tm-root");
}

export function applyTheme(mode: ThemeMode) {
  const el = root();
  if (!el) return;
  if (mode === "auto") el.removeAttribute("data-theme");
  else el.setAttribute("data-theme", mode);
  try {
    if (mode === "auto") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, mode);
  } catch {
    /* storage can be unavailable */
  }
}

export function loadTheme() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark") root()?.setAttribute("data-theme", v);
  } catch {
    /* storage can be unavailable */
  }
}

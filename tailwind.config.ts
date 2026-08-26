import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#E8DCC2",
        "paper-dim": "#DECBA5",
        ink: "#232019",
        "ink-soft": "#5C5645",
        "ink-faint": "#8C8265",
        charcoal: "#211F17",
        "charcoal-raised": "#28261C",
        cream: "#F1EDE1",
        "cream-soft": "#BFB9A5",
        "cream-faint": "#867F69",
        signal: "#3E5C4E",
        "signal-dark": "#8FB6A2",
        ember: "#C7742E",
        "ember-dark": "#E29A5C",
        line: "#C9BA92",
        "line-dark": "#2C2A20",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "JetBrains Mono",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
        accent: ["Georgia", "'Times New Roman'", "serif"],
      },
      fontSize: {
        "display-lg": ["clamp(3.1rem, 7.4vw, 6.4rem)", { lineHeight: "0.97", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        content: "60rem",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

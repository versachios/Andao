import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: `${SITE.name}`,
  description:
    "Personal site.",
};

export const viewport: Viewport = {
  themeColor: "#232019",
};

// Defaults to light on first visit regardless of OS preference — only an
// explicit toggle (saved to localStorage) switches to dark.
const themeInitScript = `
(function() {
  try {
    var stored = window.localStorage.getItem('theme');
    if (stored === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;600&family=Orbitron:wght@700&family=Chakra+Petch:wght@700&family=Share+Tech+Mono&family=Archivo+Black&family=Space+Mono:wght@700&display=swap"
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

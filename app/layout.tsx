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
      </head>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

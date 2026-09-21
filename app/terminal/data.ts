// All copy for the /terminal page lives here. Edit this file to update the site.

export const neofetch = [
  { key: "OS", value: "Arch Linux" },
  { key: "WM", value: "Hyprland 0.56.2" },
  { key: "Shell", value: "zsh" },
  { key: "Editor", value: "VS Code" },
  { key: "Languages", value: "C++, Python, TypeScript" },
  { key: "Focus", value: "Competitive Programming, Web Development" },
];

export const aboutFacts = [
  { key: "focus", value: "Competitive Programming, Web Development" },
  { key: "currently", value: "Learning algorithms, shipping side projects" },
  { key: "status", value: "Try my hardest to get into HVT :>" },
];

export const education = [
  {
    years: "2023-2027",
    title: "Secondary School",
    body: "Focused track in algorithms and the new techniques, with most of the time spent between proofs and problem sets.",
  },
  {
    years: "2018-2023",
    title: "Primary School",
    body: "First contact with programming: Scratch in class, Python after class, and a slowly growing habit of finishing what I start.",
  },
];

export const skillBars = [
  { name: "C++", filled: 15, total: 18 },
  { name: "Python", filled: 8, total: 18 },
  { name: "TypeScript", filled: 11, total: 18 },
];

export const skillGroups = [
  { label: "programming", items: "C++, Python, JavaScript, TypeScript, Dart" },
  { label: "algorithms", items: "DP, BSOA, Data Structures" },
  { label: "development", items: "Next.js, React, Tailwind, Prisma, Flutter" },
  { label: "systems", items: "Linux, Arch Linux, Hyprland, Git" },
  { label: "other", items: "AI Integration, UI Design, Open Source" },
];

export type Project = {
  name: string;
  description: string;
  stack: string;
  source: string;
  live: string;
  shot: "hvtcoder" | "algoverse";
};

export const projects: Project[] = [
  {
    name: "HVTCoder/",
    description:
      "An AI-assisted judge for competitive programmers. Submit a problem and your C++ or Python solution, and get back complexity analysis, likely bugs, edge cases, and hints instead of a bare verdict.",
    stack: "Next.js, Tailwind, Gemini API, OCR",
    source: "https://github.com/versachios/HVTCoder",
    live: "https://hvtcoder.pages.dev/",
    shot: "hvtcoder",
  },
  {
    name: "Algoverse/",
    description:
      "An interactive learning platform for data structures and algorithms. Explore concepts through immersive 2.5D and 3D visualizations designed to make complex algorithms easier to understand.",
    stack: "Next.js, Tailwind, Three.js, React",
    source: "https://github.com/versachios/Algoverse",
    live: "https://hvt-algoverse.pages.dev/",
    shot: "algoverse",
  },
];

export type Note = { date: string; tag: "cp" | "project"; title: string; body: string };

// newest first, like git log
export const notes: Note[] = [
  {
    date: "2026-08-08",
    tag: "project",
    title: "Building HVTCoder",
    body: "Then it comes to building my first website. At first, it was just a small idea: a place where I could practice, submit code, and learn from my mistakes. But as I kept working on it, HVTCoder slowly became something much bigger, a platform built around my journey in competitive programming. It is far from perfect, but it is the first project that truly feels like my own.",
  },
  {
    date: "2026-02-09",
    tag: "cp",
    title: "The day I was overcome with happiness.",
    body: "I performed quite poorly on the provincial gifted student exam. Yet, when the results were announced, I had just enough points, by a margin of 0.05, to secure an award. I became the only student from a standard class, competing at a higher grade level, to win an award in that provincial competition.",
  },
  {
    date: "2026-01-11",
    tag: "cp",
    title: "Preparing for the final contest.",
    body: "We had about a month to prepare for the provincial-level competition for gifted students. During that time, we created wonderful memories, studying and journeying together through that final stretch.",
  },
  {
    date: "2026-01-01",
    tag: "cp",
    title: "Road to K81 IT",
    body: "I have worked through a great many entrance exam papers for specialized schools across various provinces. I have learned so much, and this marks a major step toward getting into the school of my dreams.",
  },
  {
    date: "2025-12-12",
    tag: "cp",
    title: "Preparing for the Competitive Programming contest",
    body: "I still remember the feelings when we all learning in the same room, the scent of coffee and snacks. And somehow I did it.",
  },
  {
    date: "2025-07-22",
    tag: "cp",
    title: "Learning how to code in Competitive Programming",
    body: "Spent the whole summer to learn before anyone did, and I have never regretted doing that <3.",
  },
];

// files live in /public/moments
export const moments = [
  { file: "WA.png", caption: "Wrong Answer VNOI" },
  { file: "team26.jpg", caption: "ACADEMIC IT 2026" },
  { file: "genshinteapot.png", caption: "Sunset in my tea pot" },
  { file: "amphoreus.png", caption: "Amphoreus in Algoverse" },
];

export const achievements = [
  {
    year: "2026",
    title: "Back-to-back wins in academic and sports competitions",
    body: "Competed consecutively in gifted-student contests and the Hội Khỏe Phù Đổng sports games with a 100% award rate, most notably placing at the Phú Thọ Provincial Excellent Student Contest in Informatics.",
  },
  {
    year: "2025",
    title: "Regional programming contest, top bracket",
    body: "Placed in the top bracket of a regional competitive programming contest.",
  },
  {
    year: "2021",
    title: "First steps in Python",
    body: "Picked up Python for the first time and built 20+ small projects along the way, from a Tkinter calculator to simple Pygame games.",
  },
];

export const contacts = [
  { label: "email", text: "alterlew@gmail.com", href: "mailto:alterlew@gmail.com" },
  { label: "github", text: "versachios", href: "https://github.com/versachios" },
  { label: "codeforces", text: "justme_tann", href: "https://codeforces.com/profile/justme_tann" },
  { label: "vnoj", text: "justme_tann", href: "https://oj.vnoi.info/user/justme_tann" },
  { label: "clueoj", text: "justme_tann", href: "https://oj.clue.edu.vn/user/justme_tann" },
  { label: "discord", text: "justme_tann", href: "https://discord.com/users/justme_tann" },
  { label: "tiktok", text: "@justme_tann", href: "https://www.tiktok.com/@justme_tann" },
  { label: "facebook", text: "versachios", href: "https://www.facebook.com/versachios/" },
];

// targets for the `open <name>` command in the prompt
export const openTargets: Record<string, string> = {
  hvtcoder: "https://hvtcoder.pages.dev/",
  algoverse: "https://hvt-algoverse.pages.dev/",
  github: "https://github.com/versachios",
  codeforces: "https://codeforces.com/profile/justme_tann",
  vnoj: "https://oj.vnoi.info/user/justme_tann",
  clueoj: "https://oj.clue.edu.vn/user/justme_tann",
  discord: "https://discord.com/users/justme_tann",
  tiktok: "https://www.tiktok.com/@justme_tann",
  facebook: "https://www.facebook.com/versachios/",
};

export const sections = [
  "home",
  "about",
  "education",
  "skills",
  "projects",
  "notes",
  "moments",
  "achievements",
  "contact",
] as const;

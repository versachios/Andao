// ---------------------------------------------------------------------------
// Every piece of personal content lives in this file on purpose — edit here,
// nothing else. Fields marked TODO are placeholders: swap them for your own
// details before shipping.
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Versachios",
  // TODO: set your real birthdate — this drives the "Age" field automatically.
  birthDateISO: "2012-02-16",
  location: "Vietnam",
  timeZone: "Asia/Ho_Chi_Minh",
  focus: "Competitive Programming · Web Development",
  currently: "Learning algorithms, shipping side projects",
  status: "Building" as "Building" | "Available",
  github: "https://github.com/versachios",
  // TODO: replace with your real Codeforces handle.
  codeforces: "https://codeforces.com/profile/justme_tann",
  // TODO: replace with a real inbox.
  email: "alterlew@gmail.com",
};

// Shown in the footer's "Elsewhere" section.
// NOTE: the Discord entry is a placeholder — Discord profile URLs need your
// numeric user ID or a real invite link, a @username alone won't resolve.
// Swap it for your actual link before shipping.
export const SOCIALS: { label: string; href: string }[] = [
  { label: "Facebook", href: "https://www.facebook.com/versachios/" },
  { label: "GitHub", href: "https://github.com/versachios" },
  { label: "TikTok", href: "https://www.tiktok.com/@justme_tann" },
  { label: "Discord", href: "https://discord.com/users/justme_tann" },
  { label: "VNOI", href: "https://oj.vnoi.info/user/justme_tann" },
  { label: "ClueOJ", href: "https://oj.clue.edu.vn/user/justme_tann" },
  { label: "Codeforces", href: "https://codeforces.com/profile/justme_tann" },
];

export const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Notes", href: "#notes" },
];

export const EDUCATION = [
  {
    year: "2023 – 2027",
    // TODO: swap in your real school/institution.
    institution: "Secondary School",
    description:
      "Focused track in algorithms and the new techniques — most of the week spent between proofs and problem sets.",
    link: undefined as string | undefined,
  },
  {
    year: "2018 – 2023",
    institution: "Primary School",
    description:
      "First contact with programming: Scratch in class, Python after class, and a slowly growing habit of finishing what I start.",
    link: undefined as string | undefined,
  },
];

export const SKILLS = [
  {
    category: "Programming",
    items: ["C++", "Python", "JavaScript", "TypeScript", "Dart"],
  },
  {
    category: "Algorithms",
    items: ["DP", "BSOA", "Data Structures"],
  },
  {
    category: "Development",
    items: ["Next.js", "React", "Tailwind", "Prisma", "Flutter"],
  },
  {
    category: "Systems",
    items: ["Linux", "Arch Linux", "Hyprland", "Git"],
  },
  {
    category: "Other",
    items: ["AI Integration", "UI Design", "Open Source"],
  },
];

// TODO: swap these placeholders for your real hobbies/interests.
export const HOBBIES: string[] = [
  "Gaming",
  "Anime",
  "Chess",
  "Music",
  "Reading",
];

// NOTE: only public/open-source work is listed here on purpose. Add more
// entries as they go public — the layout adapts from one project up to a
// full grid.
export const PROJECTS = [
  {
    number: "01",
    name: "HVTCoder",
    description:
      "An AI-assisted judge for competitive programmers — submit a problem and your C++ or Python solution, get back complexity analysis, likely bugs, edge cases, and hints instead of a bare verdict.",
    tech: ["Next.js", "Tailwind", "Gemini API", "OCR"],
    github: "https://github.com/versachios/HVTCoder",
    demo: "https://hvtcoder.pages.dev/",
  },
];

// A little corkboard of photos — pinned polaroids with a caption each.
// Drop real photos in /public/moments/ and point `image` at them, e.g.
// "/moments/award-day.jpg". Leave `image` unset to show a placeholder frame.
export const MOMENTS: {
  title: string;
  image?: string;
  rotate: number;
}[] = [
  { title: "Wrong Answer VNOI", image: "/moments/wa.png", rotate: -3 },
  { title: "ACADEMIC IT 2026", image: "/moments/team26.jpg",rotate: 2 },
  { title: "Sunset in my tea pot", image: "moments/genshinteapot.png" ,rotate: -1.5 },
];

export const NOTES = [
  {
    index: "01",
    date: "2025-07-22",
    category: "CP",
    title: "Learning how to code in Competitive Programming",
    excerpt:
      "Spent the whole summer to learn before anyone did, and i have never regret doing that <3.",
  },
  {
    index: "02",
    date: "2025-12-12",
    category: "CP",
    title: "Preparing for the Competitive Programming contest",
    excerpt:
      "I still remember the feelings when we all learning in the same room, the scent of coffe and snack. And somehow I did it.",
  },
  {
    index: "03",
    date: "2026-01-11",
    category: "CP",
    title: "Preparing for the final contest.",
    excerpt:
      "We had about a month to prepare for the provincial-level competition for gifted students. During that time, we created wonderful memories, studying and journeying together through that final stretch.",
  },
  {
    index: "04",
    date: "2026-02-09",
    category: "CP",
    title: "The day I was overcome with happiness.",
    excerpt:
      "I performed quite poorly on the provincial gifted student exam. Yet, when the results were announced, I had just enough points—by a margin of 0.05—to secure an award. I became the only student from a standard class—competing at a higher grade level—to win an award in that provincial competition.",
  },
  {
    index: "05",
    date: "Summer 2026",
    category: "CP",
    title: "Road to K81 IT",
    excerpt:
      "I have worked through a great many entrance exam papers for specialized schools across various provinces. I have learned so much, and this marks a major step toward getting into the school of my dreams.",
  },
  {
    index: "06",
    date: "2026-08-08",
    category: "Project",
    title: "Building HVTCoder",
    excerpt:
      "Then it comes to building my first website. At first, it was just a small idea — a place where I could practice, submit code, and learn from my mistakes. But as I kept working on it, HVTCoder slowly became something much bigger: a platform built around my journey in competitive programming. It is far from perfect, but it is the first project that truly feels like my own.",
  },
];

// Icon options: "trophy" | "medal" | "award" | "star" | "target" | "flag"
// pick whichever fits each entry — see the map in components/Achievements.tsx.
// TODO: this is placeholder content — replace with your real contest results and milestones.
export const ACHIEVEMENTS: {
  date: string;
  title: string;
  description: string;
  icon: "trophy" | "medal" | "award" | "star" | "target" | "flag";
}[] = [
  {
    date: "2026",
    title: "Back-to-back wins in academic & sports competitions",
    description:
      "Competed consecutively in gifted-student contests and the Hội Khỏe Phù Đổng sports games with a 100% award rate — most notably placing at the Phú Thọ Provincial Excellent Student Contest in Informatics.",
    icon: "award",
  },
  {
    date: "2025",
    title: "Regional programming contest — top bracket",
    description: "Placed in the top bracket of a regional competitive programming contest.",
    icon: "trophy",
  },
  {
    date: "2021",
    title: "First steps in Python",
    description:
      "Picked up Python for the first time and built 20+ small projects along the way, from a Tkinter calculator to simple Pygame games.",
    icon: "flag",
  },
];

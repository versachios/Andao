export type Lang = "en" | "vi";

export const T = {
  en: {
    nHome: "Home", nAbout: "About", nViz: "Visualizer", nNotes: "Notes",
    stat: "learning, building",
    detH: "✏️ Personal details", dFocus: "Focus", dCountry: "Country", dStatus: "Status", dTime: "Local time",
    stackH: "💻 Setup", edH: "🎓 Education",
    hey: "Hey! Welcome to my corner. 👋",
    heyP: "A Vietnamese student working through competitive programming and web development. I turn ideas into things that run. Glad you're here!",
    whyH: "Why does this site exist?",
    whyP: "It's a workbench, not a résumé: projects that ship, problems I'm still stuck on, and experiments that went nowhere. It updates the way my understanding does, unevenly and usually after something broke first.",
    projH: "Things I made", momH: "Moments",
    abH: "Intro", skillH: "Skills", msH: "Milestones", goalH: "Goals",
    goalP: "Get into HVT, keep improving at algorithms, and ship projects that are useful on the first try.",
    playH: "Sorting, step by step",
    playP: "Pick an algorithm, shuffle the bars, then watch it sort. Amber bars are the pair being compared.",
    logH: "Notes", contactH: "Contact", foot: "Built with curiosity",
    findH: "Find me", logGH: "git log", liveH: "Sorting, live · click to reshuffle",
    heroP: "A Vietnamese student into competitive programming and web dev.", nowL: "now",
  },
  vi: {
    nHome: "Trang chủ", nAbout: "Giới thiệu", nViz: "Mô phỏng", nNotes: "Ghi chép",
    stat: "đang học, đang làm",
    detH: "✏️ Thông tin cá nhân", dFocus: "Tập trung", dCountry: "Quốc gia", dStatus: "Trạng thái", dTime: "Giờ địa phương",
    stackH: "💻 Môi trường", edH: "🎓 Học vấn",
    hey: "Chào mừng đến góc nhỏ của mình! 👋",
    heyP: "Một học sinh Việt Nam đang theo đuổi lập trình thi đấu và phát triển web. Mình biến ý tưởng thành thứ chạy được. Vui vì bạn ghé qua!",
    whyH: "Vì sao có trang này?",
    whyP: "Đây là xưởng làm việc chứ không phải CV: dự án đã xong, bài còn đang mắc, và những thử nghiệm chẳng đi đến đâu. Nó cập nhật theo cách mình hiểu thêm, không đều và thường là sau khi có thứ gì đó hỏng.",
    projH: "Dự án của mình", momH: "Khoảnh khắc",
    abH: "Giới thiệu", skillH: "Kỹ năng", msH: "Cột mốc", goalH: "Mục tiêu",
    goalP: "Đỗ HVT, tiếp tục tiến bộ về giải thuật và làm ra những dự án dùng được ngay từ lần đầu.",
    playH: "Sắp xếp từng bước",
    playP: "Chọn thuật toán, xáo trộn các cột rồi xem nó sắp xếp. Cột vàng là cặp đang được so sánh.",
    logH: "Ghi chép", contactH: "Liên hệ", foot: "Làm bằng sự tò mò",
    findH: "Liên hệ", logGH: "git log", liveH: "Sắp xếp trực tiếp · bấm để xáo lại",
    heroP: "Một học sinh Việt Nam mê lập trình thi đấu và phát triển web.", nowL: "hiện tại",
  },
} as const;

export type Dict = (typeof T)["en"];

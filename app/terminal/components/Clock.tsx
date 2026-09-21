"use client";

import { useEffect, useState } from "react";

function vietnamTime(): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    const n = new Date(Date.now() + new Date().getTimezoneOffset() * 60000 + 7 * 3600000);
    return `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`;
  }
}

export function Clock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    setTime(vietnamTime());
    const id = setInterval(() => setTime(vietnamTime()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

"use client";

import { useEffect } from "react";
import { loadTheme } from "../theme";

export function ThemeInit() {
  useEffect(() => {
    loadTheme();
  }, []);
  return null;
}

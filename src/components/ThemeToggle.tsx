"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
      Toggle {isDark ? "Light" : "Dark"} Mode
    </button>
  );
}

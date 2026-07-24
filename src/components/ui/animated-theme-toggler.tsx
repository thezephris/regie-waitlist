"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { flushSync } from "react-dom";

export function AnimatedThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = (e: React.MouseEvent) => {
    document.documentElement.classList.add("theme-transitioning");
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 550);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? -90 : 0,
          scale: isDark ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute flex items-center justify-center"
      >
        <Sun className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 90,
          scale: isDark ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute flex items-center justify-center"
      >
        <Moon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
      </motion.div>
    </button>
  );
}

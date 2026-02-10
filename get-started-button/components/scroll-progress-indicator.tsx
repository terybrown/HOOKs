"use client";

import { useEffect, useState } from "react";

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-foreground via-foreground to-foreground/60 z-50 transition-all duration-300"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: "0 0 10px rgba(10, 10, 10, 0.2)",
        }}
      />

      {/* Scroll indicator dot (appears on right side) */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center gap-2"
        style={{
          opacity: Math.min(1, scrollProgress / 20),
        }}
      >
        <div className="h-2 w-2 rounded-full bg-foreground/40" />
        <div className="text-xs text-muted-foreground tabular-nums">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </>
  );
}

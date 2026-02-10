"use client";

import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  revealType?: "word" | "letter";
}

export function TextReveal({
  text,
  delay = 0,
  duration = 0.8,
  className = "",
  revealType = "word",
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const itemsToRender = revealType === "word" ? text.split(" ") : text.split("");
  const animationDuration = duration / itemsToRender.length;

  return (
    <div ref={ref} className={`${className} inline-flex flex-wrap gap-1`}>
      {itemsToRender.map((item, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            animation: isVisible
              ? `slide-up-fade ${duration}s ease-out forwards`
              : "none",
            animationDelay: `${index * animationDuration}s`,
            opacity: isVisible ? 1 : 0,
          }}
          className="inline"
        >
          {item}
          {revealType === "word" && index < itemsToRender.length - 1 && " "}
        </span>
      ))}
    </div>
  );
}

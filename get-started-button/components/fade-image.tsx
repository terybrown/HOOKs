"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

interface FadeImageProps extends Omit<ImageProps, "onLoad"> {
  fadeDelay?: number;
  blurUpEffect?: boolean;
}

export function FadeImage({ 
  className, 
  fadeDelay = 0, 
  blurUpEffect = true,
  ...props 
}: FadeImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, fadeDelay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [fadeDelay]);

  return (
    <div 
      ref={ref} 
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundColor: "var(--secondary)",
      }}
    >
      {/* Blur-up skeleton/placeholder effect */}
      {blurUpEffect && !isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundColor: "var(--secondary)",
            backdropFilter: "blur(8px)",
          }}
        />
      )}

      <Image
        {...props}
        className={`${className || ""} transition-all duration-700 ease-out ${
          isVisible && isLoaded 
            ? "opacity-100 scale-100 blur-0" 
            : "opacity-0 scale-[1.02] blur-sm"
        }`}
        onLoad={() => setIsLoaded(true)}
        priority={false}
      />

      {/* Loading shimmer effect */}
      {!isLoaded && isVisible && (
        <div
          className="absolute inset-0 animate-shimmer opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "shimmer 2s infinite",
          }}
        />
      )}
    </div>
  );
}

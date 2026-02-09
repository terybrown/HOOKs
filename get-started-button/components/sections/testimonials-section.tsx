"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useRef, useEffect, useState } from "react";

export function TestimonialsSection() {
  const { ref: containerRef, isVisible } = useScrollAnimation();
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom > 0 && rect.top < windowHeight) {
        const progress = 1 - (rect.top + rect.height / 2) / (windowHeight + rect.height);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxY = (scrollProgress - 0.5) * 20;

  return (
    <section ref={containerRef} id="about" className="bg-background overflow-hidden">
      {/* About Image with Text Overlay */}
      <div 
        ref={imageRef}
        className={`relative aspect-[16/9] w-full transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          style={{
            transform: `translateY(${parallaxY}px) scale(1.1)`,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <Image
            src="/images/testimonial-house.png"
            alt="Modern corten steel architecture in natural landscape"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Fade gradient overlay - dark at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/40" />
        
        {/* Text Overlay with animation */}
        <div className="absolute inset-0 flex items-end justify-center px-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
          <p 
            className={`mx-auto max-w-5xl text-2xl leading-relaxed text-white md:text-3xl lg:text-[2.5rem] lg:leading-snug text-center drop-shadow-lg transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? '200ms' : '0ms',
            }}
          >
            A passive house that combines contemporary design with environmental respect — 
            built for those who refuse to choose between modern comfort and ecological responsibility.
          </p>
        </div>
      </div>
    </section>
  );
}

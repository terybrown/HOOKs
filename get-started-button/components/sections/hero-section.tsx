"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(true);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background overflow-hidden">
      {/* Full screen hero container */}
      <div className="relative h-screen w-full flex items-center justify-center">
        
        {/* Background HOOK text - positioned behind image */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <h1 
            className={`text-[20vw] md:text-[25vw] lg:text-[30vw] font-bold leading-none tracking-tighter text-foreground/5 dark:text-white/5 select-none pointer-events-none transform transition-all duration-1000 ${
              isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              letterSpacing: '-0.02em',
              fontWeight: 900,
            }}
          >
            HOOK
          </h1>
        </div>

        {/* Center image container */}
        <div className="relative z-10 w-4/5 h-4/5 md:w-2/3 md:h-2/3 lg:w-1/2 lg:h-1/2 max-w-3xl">
          <div 
            className={`relative w-full h-full overflow-hidden shadow-2xl transform transition-all duration-1000 ${
              isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{
              aspectRatio: '3/4',
            }}
          >
            <Image
              src="/images/hero-mono.png"
              alt="Modern architectural structure"
              fill
              className="object-cover"
              priority
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>

        {/* Tagline at bottom */}
        <div className="absolute bottom-12 md:bottom-16 lg:bottom-20 left-0 right-0 z-20">
          <div className="px-6 md:px-12 lg:px-20">
            <p 
              className={`text-center text-lg md:text-2xl lg:text-3xl text-foreground/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ${
                isImageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: isImageLoaded ? '200ms' : '0ms',
              }}
            >
              Lightweight, durable and adventure-ready
            </p>
          </div>
        </div>
      </div>

      {/* Spacer for remaining sections */}
      <div className="w-full" />
    </section>
  );
}

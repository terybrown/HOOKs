"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "HOOK";

const sideImages = [
  {
    src: "/images/hero-side-1.png",
    alt: "Modern architecture with corten steel",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero-side-2.png",
    alt: "Aerial view of modern home",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero-side-3.png",
    alt: "Interior view with landscape",
    position: "right",
    span: 1,
  },
  {
    src: "/images/hero-side-4.png",
    alt: "Modern architecture at night",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Ensure video plays on load and handle errors
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("[v0] Video autoplay prevented:", error);
      });
    }
  }, []);

  const handleVideoError = (error: React.SyntheticEvent<HTMLVideoElement>) => {
    console.log("[v0] Video failed to load:", (error.target as HTMLVideoElement).error);
    setIsVideoLoaded(false);
  };

  const handleVideoLoadedData = () => {
    console.log("[v0] Video loaded successfully");
    setIsVideoLoaded(true);
  };

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations - More balanced distribution
  const centerWidth = 100 - (imageProgress * 80); // 100% to 20% (same as each side image)
  const centerHeight = 100; // Always 100% height
  const sideWidth = imageProgress * 40; // 0% to 40% (20% per image, 2 images = 40%)
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = 0; // No border radius
  const gap = imageProgress * 8; // 0px to 8px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background pt-24">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-24 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              {/* Video Background Layer */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoadedData}
                onError={handleVideoError}
                className="absolute inset-0 z-0 h-full w-full object-cover"
                style={{
                  opacity: isVideoLoaded ? 0.7 : 0,
                  transition: 'opacity 0.5s ease-out',
                }}
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27eb7fb4-0105-4010-ac9e-0ac977a31b05_1-FZ89nvBAAsR3caRJbhYv7T2mjBofth.mp4"
              />

              {/* Text Behind - Fades out first */}
              <div 
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{ opacity: textOpacity, transform: 'translateY(-200px)' }}
              >
                <style>{`
                  .hook-text {
                    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1);
                  }
                  @media (prefers-color-scheme: dark) {
                    .hook-text {
                      text-shadow: 0 10px 30px rgba(255, 255, 255, 0.25), 0 0 40px rgba(255, 255, 255, 0.1);
                    }
                  }
                `}</style>
                <h1 className="hook-text whitespace-nowrap text-[35vw] font-bold leading-[0.8] tracking-tighter text-foreground dark:text-white drop-shadow-2xl">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
              
              <Image
                src="/images/hero-mono.png"
                alt="Modern architectural structure with reflection"
                fill
                className="absolute inset-0 z-10 object-cover"
                priority
              />
            </div>

            {/* Right Column */}
            <div 
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Tagline Section - Fixed at bottom */}
      <div 
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20"
        style={{ opacity: textOpacity }}
      >
        <style>{`
          .tagline-text {
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }
          @media (prefers-color-scheme: dark) {
            .tagline-text {
              text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
            }
          }
        `}</style>
        <p className="tagline-text mx-auto max-w-2xl text-center text-2xl leading-relaxed text-foreground dark:text-white drop-shadow-lg md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Lightweight, durable
          <br />
          and adventure-ready.
        </p>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />
    </section>
  );
}

"use client";

import { FadeImage } from "@/components/fade-image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useRef, useState } from "react";

const features = [
  {
    image: "/images/4312e1bb-e030-4528-b6df-8a6ea69fe384.png",
    span: "col-span-2 row-span-2", // Large
  },
  {
    image: "/images/b2401fa5-4eac-465f-b1f9-014aadc182ee.png",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/dd1b32a8-3722-4ea2-8808-10d53532809d.png",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/61af06cc-84d0-4031-a0ed-76fc43b1c1e1.png",
    span: "col-span-1 row-span-2", // Tall
  },
  {
    image: "/images/249083d2-c49c-4c06-a125-376284d90c42.png",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/7638f650-8586-4403-8c13-141921a04f9d.png",
    span: "col-span-2 row-span-1", // Wide
  },
  {
    image: "/images/5b3bdb95-fac7-4d22-aa97-98b5d547b2db.png",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/634f7bae-77a5-49d0-a0ab-5271a6194e66.png",
    span: "col-span-1 row-span-2", // Tall
  },
  {
    image: "/images/09ffa8fd-cdd1-453f-9aa2-d6c702a1f4b5.png",
    span: "col-span-2 row-span-1", // Wide
  },
  {
    image: "/images/040e36b1-d16f-474b-a712-a9979e6ab479.png",
    span: "col-span-1 row-span-1", // Small
  },
];

function ProductCard({ feature, index, isVisible }: { feature: typeof features[0]; index: number; isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Parallax effect based on mouse position
  const parallaxX = (mousePos.x - 0.5) * 10;
  const parallaxY = (mousePos.y - 0.5) * 10;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-lg border border-border group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-foreground/40 hover:-translate-y-1 ${feature.span} ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
        transformStyle: 'preserve-3d',
      }}
    >
      <FadeImage
        src={feature.image || "/placeholder.svg"}
        alt={`Architecture sketch ${index + 1}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      id="technology" 
      className="relative bg-background py-20 md:py-32"
    >
      <div className="px-4 md:px-12 lg:px-20">
        {/* Section Header with scroll animation */}
        <div
          className={`mb-12 transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Hover over any project to see the details and parallax effect
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-7xl mx-auto auto-rows-[180px] md:auto-rows-[220px]">
          {features.map((feature, index) => (
            <ProductCard
              key={index}
              feature={feature}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

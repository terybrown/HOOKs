"use client";

import { FadeImage } from "@/components/fade-image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const accessories = [
  {
    id: 1,
    name: "Compact Model",
    description: "120m² living space with optimal energy efficiency",
    price: "$285,000",
    image: "/images/hero-side-1.png",
  },
  {
    id: 2,
    name: "Standard Model",
    description: "180m² perfect balance of space and sustainability",
    price: "$395,000",
    image: "/images/hero-side-2.png",
  },
  {
    id: 3,
    name: "Premium Model",
    description: "250m² expansive design with maximum comfort",
    price: "$525,000",
    image: "/images/hero-side-4.png",
  },
];

export function CollectionSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="accessories" className="bg-background">
      {/* Section Title with animation */}
      <div className={`px-6 py-20 md:px-12 lg:px-20 md:py-10 transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Surface Options
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {accessories.map((accessory, index) => (
            <div 
              key={accessory.id} 
              className={`group flex-shrink-0 w-[75vw] snap-center transform transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary group-hover:shadow-xl transition-shadow duration-300">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {accessories.map((accessory, index) => (
            <div 
              key={accessory.id} 
              className={`group transform transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary group-hover:shadow-xl transition-shadow duration-300">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="font-medium text-foreground text-2xl">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

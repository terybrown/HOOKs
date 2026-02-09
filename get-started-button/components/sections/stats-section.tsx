'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'Happy Customers', value: 10000, suffix: 'K+' },
  { label: 'Products Shipped', value: 50000, suffix: 'K+' },
  { label: 'Countries Reached', value: 85, suffix: '+' },
  { label: 'Years of Innovation', value: 15, suffix: '+' },
];

function CountUp({ target, isVisible, suffix }: { target: number; isVisible: boolean; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <>
      <span>{count.toLocaleString()}</span>
      <span className="text-2xl md:text-3xl lg:text-4xl ml-1">{suffix}</span>
    </>
  );
}

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative bg-background py-20 md:py-32 border-y border-border overflow-hidden"
    >
      {/* Decorative background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="px-4 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`mb-16 text-center transform transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              By The Numbers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our impact across the globe and the trust of our community
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group flex flex-col items-center justify-center p-6 md:p-8 rounded-lg border border-border bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 hover:border-foreground/20 transform transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Animated underline on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-foreground/30 rounded-full transition-all duration-500 group-hover:w-full w-0" />

                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 transition-all duration-500 group-hover:scale-110">
                  {isVisible ? <CountUp target={stat.value} isVisible={isVisible} suffix={stat.suffix} /> : `0${stat.suffix}`}
                </div>
                <p className="text-sm md:text-base text-muted-foreground text-center transition-colors duration-300 group-hover:text-foreground/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

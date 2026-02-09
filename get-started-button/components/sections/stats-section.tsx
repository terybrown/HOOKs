'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'Happy Customers', value: 10000 },
  { label: 'Products Shipped', value: 50000 },
  { label: 'Countries Reached', value: 85 },
  { label: 'Years of Innovation', value: 15 },
];

function CountUp({ target, isVisible }: { target: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative bg-background py-20 md:py-32 border-y border-border"
    >
      <div className="px-4 md:px-12 lg:px-20">
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
                className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-lg border border-border bg-secondary/30 backdrop-blur-sm transform transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  {isVisible ? <CountUp target={stat.value} isVisible={isVisible} /> : '0'}
                  {stat.value >= 1000 && stat.value < 100000 ? 'K+' : stat.value >= 100000 ? 'K+' : '+'}
                </div>
                <p className="text-sm md:text-base text-muted-foreground text-center">
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

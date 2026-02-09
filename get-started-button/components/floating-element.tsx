'use client';

import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  distance = 20,
}: FloatingElementProps) {
  return (
    <div
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );
}

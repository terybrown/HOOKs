'use client';

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`relative bg-clip-text text-transparent bg-gradient-to-r from-foreground via-muted-foreground to-foreground animate-pulse ${className}`}
      style={{
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 8s ease infinite, pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
    >
      {children}
    </span>
  );
}

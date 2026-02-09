"use client";

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface AnimatedCTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

export function AnimatedCTAButton({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  showArrow = true,
}: AnimatedCTAButtonProps) {
  const baseClass = `
    relative px-6 py-3 text-sm font-medium rounded-full 
    transition-all duration-300 overflow-hidden 
    inline-flex items-center gap-2 whitespace-nowrap
    prefers-reduced-motion:no-animation
  `;

  const variantClass = variant === "primary"
    ? "bg-foreground text-background hover:shadow-lg hover:shadow-foreground/20"
    : "bg-transparent text-foreground border border-foreground/30 hover:border-foreground/50 hover:bg-foreground/5";

  const Element = href ? "a" : "button";
  const elementProps = href ? { href } : { onClick, type: "button" as const };

  return (
    <Element
      {...elementProps}
      className={`${baseClass} ${variantClass} ${className} group`}
    >
      {/* Shimmer effect background */}
      <div
        className="absolute inset-0 -top-2 h-full w-full translate-x-full 
        transform bg-gradient-to-r from-transparent via-white/30 to-transparent 
        group-hover:animate-shimmer"
      />

      {/* Animated glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 -z-10 blur-xl 
        bg-foreground/10"
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Animated arrow */}
      {showArrow && (
        <ArrowRight
          size={16}
          className="relative z-10 transition-transform duration-300 
          group-hover:translate-x-1 group-hover:scale-110"
        />
      )}
    </Element>
  );
}

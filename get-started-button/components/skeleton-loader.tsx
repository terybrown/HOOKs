"use client";

import { useEffect, useState } from "react";

interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  borderRadius?: string;
}

export function SkeletonLoader({
  width = "100%",
  height = "400px",
  className = "",
  borderRadius = "lg",
}: SkeletonLoaderProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Skeleton fades out after 5 seconds or when image loads
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  } as const;

  return (
    <div
      className={`${className} ${radiusClasses[borderRadius as keyof typeof radiusClasses] || "rounded-lg"} 
      overflow-hidden relative`}
      style={{
        width,
        height,
        backgroundColor: "var(--secondary)",
      }}
    >
      {/* Animated gradient shimmer */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(90deg, var(--secondary) 0%, var(--muted) 50%, var(--secondary) 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s infinite",
        }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg, var(--muted-foreground) 25%, transparent 25%),
            linear-gradient(-45deg, var(--muted-foreground) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, var(--muted-foreground) 75%),
            linear-gradient(-45deg, transparent 75%, var(--muted-foreground) 75%)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      />
    </div>
  );
}

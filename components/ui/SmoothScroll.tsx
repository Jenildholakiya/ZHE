"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,        // Smoothness factor (Higher is more immediate)
        duration: 1.2,     // Scroll duration
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {/* Explicitly cast to any to resolve the ReactNode version mismatch */}
      {children as any}
    </ReactLenis>
  );
}
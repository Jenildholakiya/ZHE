"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function InkDropLoader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Calibrated sequence timing for the ink impact
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#F9F8F3] flex items-center justify-center overflow-hidden"
        >
          {/* LIQUID DISTORTION PIPELINE */}
          <svg className="absolute w-0 h-0">
            <filter id="gooey">
              {/* Blur edges to prepare for alpha-channel sharpening */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              {/* Sharpen the blurred edges to create the liquid "merging" effect */}
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </svg>

          {/* THE KINETIC DROP CORE */}
          <div style={{ filter: "url(#gooey)" }} className="relative">
            {/* MAIN IMPACT DROP:
              We use irregular border-radius percentages to ensure it never forms a square
             .
            */}
            <motion.div
              initial={{ y: -600, scale: 0.4, borderRadius: "50%" }}
              animate={{
                y: 0,
                scale: [0.4, 0.7, 45], // High-velocity impact explosion
                borderRadius: [
                  "50%",
                  "30% 70% 50% 50% / 30% 30% 70% 70%", // Impact deformation
                  "60% 40% 30% 70% / 60% 30% 70% 40%", // Secondary unshaped phase
                  "40% 60% 70% 30% / 40% 50% 60% 50%"  // Final unshaped expansion
                ],
              }}
              transition={{
                y: { duration: 0.7, ease: [0.11, 0, 0.5, 0] },
                scale: { delay: 0.7, duration: 1.8, ease: [0.76, 0, 0.24, 1] },
                borderRadius: { delay: 0.7, duration: 0.8, ease: "easeInOut" }
              }}
              className="w-24 h-24 bg-[#1A1A1A] relative z-10"
            />

            {/* SPLATTER PARTICLES:
              Randomized unshaped bits that break away from the core upon impact
             .
            */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{
                  x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 200 + 100),
                  y: (Math.random() * 300 - 150),
                  scale: [0, Math.random() * 2 + 1, 0],
                  borderRadius: `${Math.random() * 40 + 20}% ${Math.random() * 40 + 40}% ${Math.random() * 40 + 20}% ${Math.random() * 40 + 40}% / ${Math.random() * 40 + 40}% ${Math.random() * 40 + 20}% ${Math.random() * 40 + 40}% ${Math.random() * 40 + 20}%`
                }}
                transition={{
                  delay: 0.75,
                  duration: 1,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 w-10 h-10 bg-[#1A1A1A] -translate-x-1/2 -translate-y-1/2"
              />
            ))}
          </div>

          {/* REMOVED: Chinese Text and Spiritual Overlays.
            The center remains clear for the hero reveal.
          */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
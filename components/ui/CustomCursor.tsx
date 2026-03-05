"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  // 1. High-tension spring for the "Pointer" (Precise)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mainConfig = { damping: 30, stiffness: 250 };
  const quickX = useSpring(mouseX, mainConfig);
  const quickY = useSpring(mouseY, mainConfig);

  // 2. Low-tension spring for the "Shadow" (Fluid Flow)
  const shadowConfig = { damping: 20, stiffness: 80 };
  const trailX = useSpring(mouseX, shadowConfig);
  const trailY = useSpring(mouseY, shadowConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .kinetic-card')) setIsHovering(true);
      else setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* THE SHADOW TRAIL: Represents the "Flow" */}
      <motion.div
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        className="absolute w-12 h-12 rounded-full border border-[#BC2F32]/20 flex items-center justify-center"
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.1 : 0.4
        }}
      >
        <div className="w-full h-full bg-[#BC2F32]/5 rounded-full blur-md" />
      </motion.div>

      {/* THE BRUSH CORE: Represents the "Strike" */}
      <motion.div
        style={{ x: quickX, y: quickY, translateX: "-50%", translateY: "-50%" }}
        className="absolute w-4 h-4 flex items-center justify-center"
      >
        {/* Unshaped Impact Shape */}
        <motion.div
          animate={{
            borderRadius: isHovering ? "20%" : "50%",
            rotate: isHovering ? 90 : 0,
            scale: isHovering ? 0.5 : 1
          }}
          className="w-full h-full bg-[#BC2F32]"
        />

        {/* Inner Light Core */}
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60" />
      </motion.div>

      {/* CALLIGRAPHY TAG: Follows the cursor at a distance */}
      {/* <motion.div
        style={{ x: trailX, y: trailY }}
        animate={{ opacity: isHovering ? 1 : 0, y: isHovering ? 40 : 20 }}
        className="absolute ml-8 text-[8px] font-black uppercase tracking-[0.5em] text-[#BC2F32] whitespace-nowrap"
      >
        哲 // Flow_State
      </motion.div> */}
    </div>
  );
}
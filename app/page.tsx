"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import InkDropLoader from "@/components/loader/InkDropLoader";
import TheVoid from "@/components/hero/TheVoid";
import ElementsMatrix from "@/components/programs/ElementsMatrix";
import MastersPath from "@/components/about/MastersPath";
import MagneticDojo from "@/components/gallery/MagneticDojo";
import Connection from "@/components/contact/Connection";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* INITIAL BOOT SEQUENCE: Organic Ink Reveal */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <InkDropLoader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* CORE EXPERIENCE */}
      <main className={isLoading ? "h-screen overflow-hidden" : ""}>
        {!isLoading && (
          <>
            {/* STEP 2: The Kinetic Hero */}
            <TheVoid />

            {/* STEP 3: Five Elements Horizontal Matrix */}
            <ElementsMatrix />

            {/* STEP 4: Lineage & Faculty - Vertical Split-Parallax */}
            <MastersPath />

            {/* STEP 5: Magnetic Dojo Gallery */}
            <MagneticDojo />

            {/* STEP 6: Final Connection & Enrollment */}
            <Connection />
          </>
        )}
      </main>
    </>
  );
}
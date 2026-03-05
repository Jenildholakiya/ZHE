"use client";
import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  // Redefined coordinates with better spacing to ensure visibility
  { id: 1, src: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072", size: "w-72 h-[26rem]", top: "10%", left: "5%", speed: 50, tilt: 5, label: "STRIKE_FLOW" },
  { id: 2, src: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=2127", size: "w-80 h-96", top: "5%", left: "30%", speed: 80, tilt: -8, label: "MASTER_INTENT" },
  { id: 3, src: "https://images.unsplash.com/photo-1511883040705-6011fad9ed39?q=80&w=2070", size: "w-[28rem] h-80", top: "45%", left: "2%", speed: 35, tilt: 3, label: "STEEL_DISCIPLINE" },
  { id: 4, src: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=2070", size: "w-[30rem] h-[20rem]", top: "2%", left: "60%", speed: 100, tilt: -4, label: "VOID_SPACE" },
  { id: 5, src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976", size: "w-72 h-[28rem]", top: "40%", left: "70%", speed: 65, tilt: 6, label: "FORM_SILK" },
  { id: 6, src: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070", size: "w-80 h-80", top: "50%", left: "35%", speed: 45, tilt: -2, label: "LINEAGE_GOLD" },
  { id: 7, src: "https://images.unsplash.com/photo-1552072092-2f9b791a993b?q=80&w=2074", size: "w-64 h-72", top: "30%", left: "18%", speed: 75, tilt: 4, label: "ROOTED_EARTH" },
  { id: 8, src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2052", size: "w-80 h-[22rem]", top: "25%", left: "80%", speed: 40, tilt: -5, label: "STILL_WATER" },
];

export default function MagneticDojo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [ -0.5, 0.5 ], [ 30, -30 ]);
  const bgY = useTransform(smoothY, [ -0.5, 0.5 ], [ 30, -30 ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set((clientX - left) / width - 0.5);
      mouseY.set((clientY - top) / height - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-[#F9F8F3] overflow-hidden flex flex-col items-center pt-56"
    >
      {/* KINETIC HEADER */}
      <div className="sticky top-48 z-40 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] font-black tracking-[1.2em] uppercase text-[#BC2F32] mb-10 block ml-[1.2em]">
            Visual Archive // Dojo
          </span>
          <h2 className="text-8xl md:text-[10vw] font-black uppercase leading-[0.75] tracking-tighter text-black">
            Magnetic <br /> <span className="text-[#BC2F32]">Dojo.</span>
          </h2>
        </motion.div>
      </div>

      {/* INTERACTIVE MESH CONTAINER */}
      <div className="relative w-full h-full max-w-[130rem] mt-48 z-20">
        {galleryImages.map((img) => (
          <GalleryItem
            key={img.id}
            img={img}
            smoothX={smoothX}
            smoothY={smoothY}
          />
        ))}
      </div>

      {/* DYNAMIC BACKGROUND CALLIGRAPHY */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] z-0"
      >
        <span className="text-[90vw] font-calligraphy select-none leading-none">
          場
        </span>
      </motion.div>
    </section>
  );
}

function GalleryItem({ img, smoothX, smoothY }: any) {
  const x = useTransform(smoothX, (v: number) => v * img.speed * 4);
  const y = useTransform(smoothY, (v: number) => v * img.speed * 4);
  const rotate = useTransform(smoothX, (v: number) => v * img.tilt);

  return (
    <motion.div
      className={`absolute group ${img.size} will-change-transform`}
      style={{
        top: img.top,
        left: img.left,
        x,
        y,
        rotate,
        zIndex: Math.round(img.speed / 2), // Higher speed items stay on top
      }}
    >
      <div className="relative w-full h-full overflow-hidden border border-black/[0.06] bg-white transition-all duration-1000 group-hover:border-[#BC2F32]/60 group-hover:shadow-[0_40px_80px_-20px_rgba(188,47,50,0.2)]">

        {/* IMAGE ZOOM & COLOR REVEAL */}
        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out scale-125 group-hover:scale-100 blur-[6px] group-hover:blur-0">
          <Image
            src={img.src}
            alt={img.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* INK OVERLAY */}
        <div className="absolute inset-0 bg-[#BC2F32]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply pointer-events-none" />

        {/* HUD INTERFACE */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                <div className="text-[9px] font-black tracking-widest text-white bg-[#BC2F32] px-3 py-1">
                    CHAMBER_SECURE
                </div>
                <div className="h-6 w-6 border-t-2 border-r-2 border-[#BC2F32]" />
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-[12px] font-black tracking-[0.4em] text-white mix-blend-difference uppercase">
                      {img.label}
                  </span>
                  <span className="text-[8px] font-mono text-white/40 uppercase">
                    ID_{img.id.toString().padStart(3, '0')}
                  </span>
                </div>
                <div className="h-[2px] w-0 group-hover:w-full bg-[#BC2F32] transition-all duration-1000 ease-in-out" />
            </div>
        </div>
      </div>
    </motion.div>
  );
}
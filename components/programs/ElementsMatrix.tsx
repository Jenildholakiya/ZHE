"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const programs = [
  { id: "01", title: "Wood", kanji: "木", desc: "Flexibility & Growth", color: "#2D4B32", image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop" },
  { id: "02", title: "Fire", kanji: "火", desc: "Explosive Power", color: "#BC2F32", image: "https://images.unsplash.com/photo-1583248352195-d3a8e766edf2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEZpcmV8ZW58MHx8MHx8fDA%3D" },
  { id: "03", title: "Earth", kanji: "土", desc: "Rooted Stability", color: "#8B6F47", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" },
  { id: "04", title: "Metal", kanji: "金", desc: "Precision & Cutting", color: "#717171", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" },
  { id: "05", title: "Water", kanji: "水", desc: "Fluid Adaptability", color: "#2D3E4B", image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2052&auto=format&fit=crop" },
];

export default function ElementsMatrix() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. PINNING TIMELINE: We separate the pin from the movement for maximum stability
      gsap.to(sectionRef.current, {
        xPercent: -80, // Using percentage-based movement is much smoother for GSAP
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=5000", // Massive scroll distance to allow the scrub to "breathe"
          pin: true,
          scrub: 2, // High scrub value (2 seconds) creates the "weighty" liquid feel
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      // 2. PARALLAX DRIFT: Subtle depth for the background kanji
      gsap.to(".matrix-kanji", {
        x: -200,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=5500",
          scrub: true
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden bg-[#F9F8F3]">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="h-screen w-[500vw] flex flex-row relative will-change-transform">
          {programs.map((program) => (
            <div key={program.id} className="h-screen w-screen flex items-center justify-center px-10 md:px-24 relative group overflow-hidden">
              {/* WATERMARK KANJI WITH PARALLAX CLASS */}
              <span className="matrix-kanji absolute text-[70vh] font-calligraphy opacity-[0.03] select-none pointer-events-none transition-all duration-1000 group-hover:opacity-[0.06] group-hover:scale-105">
                {program.kanji}
              </span>

              <div className="relative z-10 flex flex-col items-start max-w-6xl w-full">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-black tracking-[0.6em] uppercase text-[#BC2F32]">CHAMBER_{program.id}</span>
                    <div className="w-12 h-[1px] bg-[#BC2F32]/30" />
                </div>

                <h2 className="text-[12vw] font-black uppercase leading-[0.75] tracking-tighter mb-12">
                  {program.title}<span className="text-[#BC2F32]">.</span>
                </h2>

                <div className="kinetic-card cursor-pointer relative w-full h-[45vh] bg-neutral-900 border border-black/5 overflow-hidden group-hover:border-[#BC2F32]/40 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="absolute inset-0 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out scale-110 group-hover:scale-100 z-0">
                    <Image src={program.image} alt={program.title} fill className="object-cover" sizes="100vw" />
                    <div className="absolute inset-0 mix-blend-overlay opacity-40 transition-opacity duration-700 group-hover:opacity-0" style={{ backgroundColor: program.color }} />
                  </div>

                  <div className="absolute inset-0 p-12 flex flex-col justify-between items-start z-10 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                      {program.desc}
                    </p>
                    <div className="flex items-end justify-between w-full">
                        <span className="text-8xl font-calligraphy text-white/20 group-hover:text-[#BC2F32]/60 transition-colors duration-700">
                            {program.kanji}
                        </span>
                        <button className="px-12 py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.5em] hover:bg-[#BC2F32] hover:text-white transition-all duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            Enter Chamber
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
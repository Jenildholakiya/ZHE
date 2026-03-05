"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const philosophyPoints = [
  {
    tag: "Origin // 01",
    title: "The Silent Lineage",
    text: "Founded in 1984 under the shadow of the Wudang Mountains, our discipline was forged in the intersection of traditional kinetic mastery and the harsh reality of the urban void. We do not inherit techniques; we inherit a state of being.",
  },
  {
    tag: "Core // 02",
    title: "Kinetic Architecture",
    text: "We view the human body as a structure of tension and release. To master the strike, one must first master the space between the strikes. Our movement is not a reaction—it is a conversation with gravity and the architecture of the arena.",
  },
  {
    tag: "Vision // 03",
    title: "Become the Void",
    text: "The ultimate mastery is found when the self is removed from the equation. Like water filling a vessel, the practitioner takes the shape of the obstacle. We teach the ability to remain calm in the center of the storm.",
  }
];

export default function MastersPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. PINNED PORTRAIT
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
      });

      // 2. SVG PATH REVEAL: Precision Drawing
      // We calculate the total path length for accurate dash mapping
      const pathLength = pathRef.current?.getTotalLength() || 4000;

      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Tighter scrub for more "inking" feel
        },
      });

      // 3. STAGGERED REVEALS FOR CONTENT
      gsap.utils.toArray(".philosophy-content").forEach((section: any) => {
        gsap.from(section.querySelectorAll(".reveal-item"), {
          y: 60,
          opacity: 0,
          rotateX: -15,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[400vh] bg-[#F9F8F3] flex flex-col md:flex-row overflow-hidden">

      {/* LEFT SIDE: THE PINNED MASTER */}
      <div ref={leftRef} className="hidden md:flex h-screen w-1/2 items-center justify-center p-12 lg:p-24 z-10">
        <div className="relative w-full h-[85vh] grayscale border border-black/10 overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop"
            alt="The Founder"
            fill
            className="object-cover master-portrait"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-12 left-12">
            <span className="text-[10px] font-black tracking-[0.6em] text-white/40 uppercase mb-2 block">Grandmaster</span>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Sifu Li Zhe.</h3>
          </div>
          <div className="absolute top-10 right-10 w-16 h-16 border-2 border-[#BC2F32] flex items-center justify-center text-3xl font-calligraphy text-[#BC2F32] bg-white/5 backdrop-blur-sm">
            哲
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: NARRATIVE FLOW */}
      <div className="w-full md:w-1/2 relative px-8 md:px-20 py-40 flex flex-col gap-[60vh]">

        {/* FIXED DYNAMIC PATH LINE: Scaled to section height */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-[0.2]">
          <path
            ref={pathRef}
            className="path-line"
            // The 'd' path is curved to weave between content blocks
            d="M 50 0 C 150 1000 -100 2000 150 3000 S 50 4000 50 4500"
            fill="none"
            stroke="#BC2F32"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <div className="philosophy-content relative z-20">
          <span className="reveal-item text-[10px] font-black tracking-[0.5em] uppercase text-[#BC2F32] mb-8 block">Legacy // 1984</span>
          <h2 className="reveal-item text-7xl lg:text-[7vw] font-black uppercase tracking-tighter mb-10 leading-[0.85] text-black">
            A Journey <br /> <span className="text-[#BC2F32]">Written</span> <br /> in Silk.
          </h2>
          <p className="reveal-item max-w-sm text-sm font-bold uppercase tracking-[0.2em] leading-relaxed text-black/60 italic">
            "We do not teach the strike. We teach the architecture of the void where the strike finds its home."
          </p>
        </div>

        {philosophyPoints.map((point, i) => (
          <div key={i} className="philosophy-content relative z-20 flex flex-col items-start">
             <div className="reveal-item flex items-center gap-4 mb-8">
                <span className="text-[#BC2F32] font-calligraphy text-2xl">哲</span>
                <span className="text-[10px] font-black tracking-widest text-black/30">{point.tag}</span>
             </div>
             <h4 className="reveal-item text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
               {point.title}
             </h4>
             <p className="reveal-item max-w-md text-sm font-bold uppercase tracking-[0.15em] leading-[1.8] text-black/50">
               {point.text}
             </p>
          </div>
        ))}

        <div className="philosophy-content relative z-20 pb-40">
           <h3 className="reveal-item text-5xl font-black uppercase tracking-tighter mb-10">Walk the Path.</h3>
           <button className="kinetic-card group relative px-16 py-6 border border-black/10 overflow-hidden cursor-pointer">
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.6em] group-hover:text-white transition-colors duration-500">Book Evaluation</span>
              <motion.div className="absolute inset-0 bg-[#BC2F32] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
           </button>
        </div>
      </div>
    </section>
  );
}
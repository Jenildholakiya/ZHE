"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TheVoid() {
  // 1. Added proper TypeScript types to refs
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-bg-media", {
        scale: 1.5,
        filter: "blur(20px)",
        duration: 2,
        ease: "expo.out",
      })
      .from(charRefs.current, {
        y: 200,
        skewY: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
      }, "-=1.5")
      .from(".hero-tag", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=1");

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".hero-bg-media", {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1,
          ease: "power2.out"
        });

        gsap.to(titleRef.current, {
          x: -xPos,
          y: -yPos,
          rotateX: -yPos * 0.2,
          rotateY: xPos * 0.2,
          duration: 0.8,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-start bg-[#F9F8F3] overflow-hidden px-10 md:px-24"
    >
      <div className="hero-bg-media absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110 brightness-[0.9] contrast-[1.1] grayscale opacity-30"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-man-performing-a-martial-arts-routine-4431-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F8F3] via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-5xl pt-15">
        <div className="hero-tag flex items-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-[#BC2F32]" />
          <span className="text-[#BC2F32] font-calligraphy text-xl tracking-[0.4em] uppercase">Est. 1984 // 哲</span>
        </div>

        <h1
          ref={titleRef}
          className="text-[8vw] font-black leading-[0.85] uppercase tracking-tighter perspective-1000"
        >
          <div className="overflow-hidden block">
            {"MASTERY".split("").map((char, i) => (
              <span
                key={i}
                // 2. FIXED: Wrapped in curly braces to avoid implicit return
                ref={(el) => { charRefs.current[i] = el!; }}
                className="inline-block"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="overflow-hidden block text-[#BC2F32] italic">
            {"THROUGH".split("").map((char, i) => (
              <span
                key={i + 7}
                // 2. FIXED: Wrapped in curly braces to avoid implicit return
                ref={(el) => { charRefs.current[i + 7] = el!; }}
                className="inline-block"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="overflow-hidden block">
            {"FLOW".split("").map((char, i) => (
              <span
                key={i + 14}
                // 2. FIXED: Wrapped in curly braces to avoid implicit return
                ref={(el) => { charRefs.current[i + 14] = el!; }}
                className="inline-block"
              >
                {char}
              </span>
            ))}
            <span className="text-[#BC2F32] not-italic leading-none">.</span>
          </div>
        </h1>

        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-10">
          <p className="max-w-xs text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed opacity-60">
            Harnessing the ancient philosophy of the elements to forge modern physical dominance.
          </p>
          <button className="group relative px-12 py-5 border border-black/10 overflow-hidden cursor-pointer">
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em] group-hover:text-white transition-colors duration-500">Begin Training</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      <div className="absolute right-[-5%] bottom-[-5%] opacity-[0.05] pointer-events-none select-none">
        <span className="text-[50vw] font-calligraphy leading-none">流</span>
      </div>
    </section>
  );
}
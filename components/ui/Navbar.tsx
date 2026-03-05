"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Philosophy", href: "#philosophy", id: "一" },
  { name: "Elements", href: "#elements", id: "二" },
  { name: "Lineage", href: "#lineage", id: "三" },
  { name: "Dojo", href: "#dojo", id: "四" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for background state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 4 }}
      className={`fixed top-0 left-0 w-full z-[80] transition-all duration-700 ease-in-out px-8 py-6 md:px-16 flex justify-between items-center pointer-events-none ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-black/5 py-4" : "bg-transparent"
      }`}
    >
      {/* 1. BRANDING: Reacts to Hover */}
      <Link href="/" className="pointer-events-auto flex items-center gap-6 group">
        <div className="relative">
          <span className="text-4xl font-calligraphy text-[#BC2F32] block transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[15deg]">
            哲
          </span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-[#BC2F32]/10 rounded-full border-dashed"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-black">ZHE // FLOW</span>
          <motion.span
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            className="text-[8px] font-serif italic text-[#BC2F32] tracking-[0.2em]"
          >
            BECOME WATER
          </motion.span>
        </div>
      </Link>

      {/* 2. KINETIC MENU: Staggered Interaction */}
      <div className="hidden md:flex gap-12 pointer-events-auto items-center">
        {navLinks.map((link, i) => (
          <Link
            key={link.name}
            href={link.href}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative py-2 group"
          >
            <div className="flex flex-col items-center">
              {/* Floating ID Character */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="absolute -top-4 font-calligraphy text-[#BC2F32] text-xs"
                  >
                    {link.id}
                  </motion.span>
                )}
              </AnimatePresence>

              <span className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                hoveredIndex === i ? "text-[#BC2F32]" : "text-black/50"
              }`}>
                {link.name}
              </span>
            </div>

            {/* ORGANIC UNDERLINE */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#BC2F32] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            />
          </Link>
        ))}
      </div>

      {/* 3. CALL TO ACTION: Liquid Fill Effect */}
      <div className="pointer-events-auto">
        <button className="group relative px-8 py-3 overflow-hidden border border-black/10 cursor-pointer">
          <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.4em] transition-colors duration-500 group-hover:text-white">
            Access Dojo
          </span>
          <motion.div
            className="absolute inset-0 bg-[#BC2F32] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]"
          />
        </button>
      </div>
    </motion.nav>
  );
}
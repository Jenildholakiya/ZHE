"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const formFields = [
  { id: "name", label: "Practitioner Name", placeholder: "ENTER YOUR NAME", type: "text" },
  { id: "email", label: "Digital Echo", placeholder: "EMAIL@DOMAIN.COM", type: "email" },
  { id: "intent", label: "The Path of Intent", placeholder: "WHY DO YOU SEEK THE VOID?", type: "textarea" },
];

export default function Connection() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen bg-[#F9F8F3] flex flex-col md:flex-row overflow-hidden border-t border-black/5">

      {/* LEFT SIDE: VISUAL ANCHOR */}
      <div className="relative w-full md:w-5/12 bg-black flex flex-col justify-between p-12 md:p-20 overflow-hidden">
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black tracking-[0.8em] uppercase text-[#BC2F32] mb-10 block"
          >
            Terminal // Enrollment
          </motion.span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
            Seal Your <br /> <span className="text-[#BC2F32]">Intent.</span>
          </h2>
        </div>

        {/* HUD STATS */}
        <div className="relative z-10 flex flex-col gap-6 border-l border-white/10 pl-6">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-white/30 tracking-[0.4em] uppercase">Current Status</span>
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Gate_Open // Accepting_Disciples</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-white/30 tracking-[0.4em] uppercase">Coordinates</span>
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">32.784° N // 104.062° E</span>
          </div>
        </div>

        {/* BACKGROUND DECOR */}
        <span className="absolute -right-20 bottom-10 text-[40vw] font-calligraphy text-white/[0.03] select-none pointer-events-none">
          武
        </span>
      </div>

      {/* RIGHT SIDE: THE CALLIGRAPHY FORM */}
      <div className="w-full md:w-7/12 py-32 px-10 md:px-24 flex flex-col justify-center bg-[#F9F8F3]">
        <div className="w-full max-w-2xl mx-auto">
          <form className="flex flex-col gap-16">
            {formFields.map((field) => (
              <div key={field.id} className="relative group">
                <label className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 block mb-2 ${focused === field.id ? 'text-[#BC2F32] translate-x-2' : 'text-black/40'}`}>
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    rows={4}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b border-black/10 py-4 outline-none text-xl font-medium tracking-tight placeholder:text-black/15 focus:border-black/0 transition-all duration-700 resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b border-black/10 py-4 outline-none text-xl font-medium tracking-tight placeholder:text-black/15 focus:border-black/0 transition-all duration-700"
                  />
                )}

                {/* INK BLEED LINE */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: focused === field.id ? '100%' : '0%' }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute bottom-0 left-0 h-[3px] bg-[#BC2F32]"
                />
              </div>
            ))}

            {/* THE RED SEAL SUBMIT */}
            <div className="flex items-center gap-12 mt-10 ">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="kinetic-card group relative px-16 py-8 border-2 border-black overflow-hidden flex items-center justify-center"
              >
                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.6em] group-hover:text-white transition-colors duration-500 cursor-pointer">
                  Begin Initiation
                </span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 cursor-pointer" />

                {/* SEAL STAMP REVEAL */}
                <div className="absolute right-2 -bottom-2 opacity-5 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                  <span className="text-7xl font-calligraphy text-[#BC2F32] cursor-pointer">哲</span>
                </div>
              </motion.button>

              <div className="hidden lg:flex flex-col opacity-20">
                <span className="text-[8px] font-black uppercase tracking-widest">Awaiting Verification</span>
                <div className="flex gap-1 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      className="w-2 h-2 bg-black"
                    />
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* BACKGROUND FLOATING KANJI */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none z-0">
        <span className="text-[60vw] font-calligraphy select-none leading-none">
          結
        </span>
      </div>
    </section>
  );
}
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ZHE Primary Palette
        background: "#F9F8F3", // Antique Eggshell / Silk Parchment
        foreground: "#1A1A1A", // Deep Carbon Ink
        zhe: {
          red: "#BC2F32",      // Imperial Vermillion (For Seals & Accents)
          gold: "#D4AF37",     // Subtle Metallic (For Secondary Accents)
          slate: "#2F2F2F",    // Secondary Ink Wash
        }
      },
      fontFamily: {
        // Integrating the STKaiti Chinese Calligraphy Font
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
        calligraphy: ["STKaiti", "Kaiti SC", "serif"], // For the "Ink" aesthetic
      },
      backgroundImage: {
        // Subtle parchment grain texture to sit behind all sections
        'parchment-grain': "url('/textures/parchment-grain.png')",
        'ink-gradient': "radial-gradient(circle, rgba(26,26,26,0.05) 0%, transparent 70%)",
      },
      animation: {
        // Custom physics for the "Sword Slash" and "Ink Ripple" effects
        'ink-ripple': 'ripple 3s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      transitionTimingFunction: {
        // Custom easing for martial arts fluidity (The "Flow" state)
        'martial-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'strike-in': 'cubic-bezier(0.76, 0, 0.24, 1)',
      }
    },
  },
  plugins: [
    // Standard utility for mask-images (required for the Ink Drop reveal)
    require('tailwind-scrollbar-hide'),
  ],
};

export default config;
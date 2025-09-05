// ⬇️ REPLACE the entire content of this file ⬇️

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Defines the font variables from layout.tsx
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        nunito: ['var(--font-nunito)'],
      },
      // color palette for the entire application
      colors: {
        'text-primary':   '#f3f3f8ff',
        'text-secondary': '#9DB4C7',
        'accent-primary': '#60A5FA',
        'accent-secondary': '#8B5CF6',
        'glass-bg': 'rgba(255,255,255,0.06)',
        'glass-border': 'rgba(255,255,255,0.14)',
        'background-start': '#0B1220',
        'background-mid':   '#14335F',
        'background-end':   '#0B1220',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        },
        animation: {
          fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
};
export default config;
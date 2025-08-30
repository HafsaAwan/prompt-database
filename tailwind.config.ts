import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark-blue": "#03045E",
        "brand-medium-blue": "#023E8A",
        "brand-blue": "#0077B6",
        "brand-light-blue": "#90E0EF",
        "brand-background": "#CAF0F8",
      },
    },
  },
  plugins: [],
};
export default config;

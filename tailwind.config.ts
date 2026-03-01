import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        // تعريف اسم الحركة والمدة الزمنية
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // تتحرك للنصف لأننا سنكرر القائمة مرتين
        },
      },
      fontFamily: {
        // اجعل الخط الافتراضي هو المتغير الذي عرفناه في layout
        sans: ["var(--font-cairo)", "sans-serif"],
        display: ["var(--font-cairo)", "sans-serif"], // للعناوين الكبيرة
      },
    },
  },
  plugins: [],
};

export default config;

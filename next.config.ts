import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-tajawal)", "sans-serif"],
      },
      colors: {
        brand: {
          primary: "#102a43", // Navy: الأساسي (الهيدر، النصوص)
          dark: "#0a1c2e", // Navy Dark: (الفوتر، الخلفيات الداكنة)
          accent: "#c5a059", // Gold: (الزر الرئيسي، الشعار)
          light: "#dfb870", // Gold Light: (للتدرج اللوني في الأزرار)
          secondary: "#f8f9fa", // خلفية فاتحة جداً (Off-white) لراحة العين
        },
        // ... (بقية إعدادات shadcn الافتراضية نتركها لتعمل المكتبة)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#c5a059", // جعلنا حلقة التركيز ذهبية
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#102a43",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f8f9fa",
          foreground: "#102a43",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#c5a059",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // ... (الأنيميشن يبقى كما هو)
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

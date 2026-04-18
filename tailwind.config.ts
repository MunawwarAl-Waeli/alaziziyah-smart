import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"], // اختصرت المسارات
  theme: {
    extend: {
       animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      // ... إعداداتك الحالية (animation, fontFamily, keyframes) ...
      fontFamily: {
        sans: ["var(--font-cairo)", "sans-serif"],
        display: ["var(--font-cairo)", "sans-serif"],
      },
      // ========== إضافة تخصيص الـ typography ==========
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // اتجاه النص
            direction: "rtl",
            // استخدام متغيرات الخط
            fontFamily: theme("fontFamily.sans").join(","),
            // الألوان من متغيرات CSS
            color: "var(--foreground)",
            backgroundColor: "transparent",
            // الروابط
            a: {
              color: "var(--primary)",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                textDecoration: "underline",
                color: "var(--primary-dark)",
              },
            },
            // الفقرات
            p: {
              textAlign: "justify",
              lineHeight: "1.8",
              marginBottom: "1.5rem",
            },
            // العناوين
            h2: {
              fontWeight: "800",
              fontSize: "1.75rem",
              marginTop: "2.5rem",
              marginBottom: "1rem",
              borderRight: `4px solid var(--primary)`,
              paddingRight: "1rem",
              color: "var(--foreground)",
            },
            h3: {
              fontWeight: "700",
              fontSize: "1.5rem",
              marginTop: "2rem",
              marginBottom: "0.75rem",
              borderRight: `2px solid var(--primary-light)`,
              paddingRight: "1rem",
              color: "var(--foreground)",
            },
            h4: {
              fontWeight: "600",
              fontSize: "1.25rem",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
              color: "var(--foreground)",
            },
            // قوائم
            ul: {
              listStyleType: "none",
              paddingRight: "1.5rem",
              "& > li": {
                position: "relative",
                "&::before": {
                  content: '"•"',
                  position: "absolute",
                  right: "-1rem",
                  color: "var(--primary)",
                },
              },
            },
            ol: {
              paddingRight: "1.5rem",
              "& > li": {
                marginBottom: "0.5rem",
              },
            },
            // اقتباسات
            blockquote: {
              borderRight: `4px solid var(--primary)`,
              paddingRight: "1rem",
              fontStyle: "italic",
              backgroundColor: "var(--muted)",
              padding: "1rem",
              borderRadius: "0.5rem",
              color: "var(--muted-foreground)",
            },
            // جداول
            table: {
              width: "100%",
              textAlign: "right",
              borderCollapse: "collapse",
              display: "block",
              overflowX: "auto",
            },
            th: {
              backgroundColor: "var(--muted)",
              padding: "0.5rem",
              border: `1px solid var(--border)`,
              fontWeight: "600",
            },
            td: {
              padding: "0.5rem",
              border: `1px solid var(--border)`,
            },
            // صور
            img: {
              maxWidth: "100%",
              height: "auto",
              borderRadius: "0.75rem",
              margin: "1.5rem auto",
              display: "block",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            },
          },
        },
        // تخصيص الوضع المظلم (يُفعّل تلقائياً مع dark:prose-invert)
        dark: {
          css: {
            color: "var(--foreground)",
            a: { color: "var(--primary-light)" },
            blockquote: {
              backgroundColor: "var(--muted)",
              color: "var(--muted-foreground)",
            },
            th: { backgroundColor: "var(--muted)" },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;

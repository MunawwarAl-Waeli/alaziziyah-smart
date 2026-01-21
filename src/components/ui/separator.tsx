"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function ArchitecturalSeparator({
  position = "bottom",
}: {
  position?: "top" | "bottom";
}) {
  return (
    <div
      className={`absolute left-0 right-0 w-full overflow-hidden leading-[0] z-20 ${
        position === "top" ? "top-[-50px] md:top-[-100px]" : "bottom-0"
      }`}
    >
      <svg
        className="relative block w-[calc(100%+10px)] h-[60px] sm:h-[100px] md:h-[160px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          {/* التدرج اللوني الذهبي الأساسي */}
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>

          {/* تدرج لوني للخط الخلفي (أخف) */}
          <linearGradient
            id="secondaryGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0" />
            <stop
              offset="50%"
              stopColor="var(--foreground)"
              stopOpacity="0.3"
            />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
          </linearGradient>

          {/* تأثير توهج (Glow) */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- الخلفية الشفافة (تعبئة المنطقة السفلية) --- */}
        <path
          d="M0,0V120H1200V0C1100,50,950,90,800,90C550,90,350,10,0,0Z"
          className="fill-background/80 dark:fill-background/30 backdrop-blur-[2px]"
          transform="scale(1, -1) translate(0, -120)" // قلبنا التعبئة لتتناسب مع التصميم
        />

        {/* --- الخط الخلفي (الثانوي) - يتقاطع مع الخط الأساسي --- */}
        <motion.path
          d="M0,60 C300,100 600,20 1200,60"
          fill="none"
          stroke="url(#secondaryGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
        />

        {/* --- الخط الأمامي (الأساسي) - الذهبي --- */}
        <motion.path
          d="M0,60 C300,20 600,100 1200,60"
          fill="none"
          stroke="url(#mainGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* --- حركة "البيانات" أو النبضة (The Pulse) --- */}
        {/* هذه النقطة تتحرك فوق المسار الأساسي لتعطي إيحاء التدفق */}
        <motion.circle
          r="3"
          fill="var(--primary)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
          style={{
            offsetPath: "path('M0,60 C300,20 600,100 1200,60')",
          }}
        />

        {/* نبضة ثانية تتأخر قليلاً وبحجم أصغر */}
        <motion.circle
          r="1.5"
          fill="white"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 2, // تتأخر ثانيتين
          }}
          style={{
            offsetPath: "path('M0,60 C300,20 600,100 1200,60')",
          }}
        />
      </svg>
    </div>
  );
}

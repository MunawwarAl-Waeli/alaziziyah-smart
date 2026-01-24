
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MousePointer2,
  ArrowDown,
  Wind,
  ShieldCheck,
  Thermometer,
  Sun,
  Moon,
  type LucideIcon, // استيراد النوع للأيقونات
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArchitecturalSeparator } from "@/components/ui/separator";

export function Hero() {
  const [isNight, setIsNight] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
      {/* 1. طبقة الصور الخلفية (The Visual Layer) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          {isNight ? (
            // === صورة الوضع الليلي ===
            <motion.div
              key="night-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/images/7.jpg" // تأكد أن هذا المسار صحيح
                alt="مظلة مودرن مع إضاءة ليلية"
                fill
                priority
                className="object-cover object-center brightness-[0.7]"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
            </motion.div>
          ) : (
            // === صورة الوضع النهاري ===
            <motion.div
              key="day-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/images/hero-day2.jpg" // تأكد أن هذا المسار صحيح
                alt="مظلة مودرن تحت ضوء الشمس"
                fill
                priority
                className="object-cover object-center"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* الشبكة الهندسية */}
        <div className="absolute inset-0 bg-grid-white opacity-[0.1] z-10 pointer-events-none" />
      </div>

      {/* 2. المحتوى الرئيسي */}
      <div className="container relative z-20 px-4 pt-20 text-center">
        {/* شارة الحالة */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-white/10 backdrop-blur-xl mb-8"
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]",
              isNight
                ? "bg-indigo-400 text-indigo-400"
                : "bg-orange-400 text-orange-400"
            )}
          />
          <span className="text-xs font-mono tracking-widest text-white/90 uppercase text-shadow-sm">
            {isNight
              ? "Night Mode: Ambient Lighting"
              : "Day Mode: Solar Protection"}
          </span>
        </motion.div>

        {/* العنوان الرئيسي */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-6 drop-shadow-2xl"
        >
          <span className="block text-white mb-2">لا تشتري مظلة..</span>
          <span
            className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r transition-all duration-1000",
              isNight
                ? "from-indigo-200 via-white to-indigo-200 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                : "from-[#FFD700] via-[#FFF8DC] to-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]"
            )}
          >
            استثمر في الجو
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light drop-shadow-md"
        >
          نحول منزلك من مجرد صور إلى{" "}
          <span className="text-white font-bold border-b border-primary/50">
            معمل هندسي
          </span>
          . اكتشف الظلال قبل البناء، وتحكم بالطقس بلمسة زر.
        </motion.p>

        {/* أزرار التحكم */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link href="/simulate" className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-yellow-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500" />
            <button className="relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 transition-transform active:scale-95 hover:bg-gray-50 shadow-xl">
              <MousePointer2 className="w-5 h-5" />
              <span>جرب المحاكاة في بيتك</span>
            </button>
          </Link>

          {/* مفتاح التحويل */}
          <button
            onClick={() => setIsNight(!isNight)}
            aria-label="تبديل وضع الليل والنهار"
            className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl hover:bg-black/60 hover:border-white/40 transition-all active:scale-95 shadow-2xl"
          >
            <div className="relative w-12 h-6 bg-black/50 rounded-full border border-white/10 p-1 transition-colors">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={cn(
                  "w-4 h-4 rounded-full shadow-lg relative z-10",
                  isNight ? "bg-indigo-400 ml-auto" : "bg-orange-400"
                )}
              />
            </div>
            <span className="text-white font-medium drop-shadow-md flex items-center gap-2">
              {isNight ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span>{isNight ? "الوضع الليلي" : "الوضع النهاري"}</span>
            </span>
          </button>
        </motion.div>
      </div>

      {/* 3. البيانات العائمة */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <FloatingSpec
          icon={Thermometer}
          label="خفض الحرارة"
          value="-8°C"
          x={15}
          y={30}
          delay={1.5}
          isNight={isNight}
        />
        <FloatingSpec
          icon={ShieldCheck}
          label="عزل UV"
          value="99%"
          x={80}
          y={25}
          delay={1.7}
          isNight={isNight}
        />
        <FloatingSpec
          icon={Wind}
          label="مقاومة الرياح"
          value="120 km/h"
          x={75}
          y={70}
          delay={1.9}
          isNight={isNight}
        />
      </div>

      {/* مؤشر التمرير */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-5 h-5 drop-shadow-md" />
      </motion.div>

    </section>
  );
}

// === تعريف أنواع الخصائص (Props Types) ===
interface FloatingSpecProps {
  icon: LucideIcon;
  label: string;
  value: string;
  x: number;
  y: number;
  delay: number;
  isNight: boolean;
}

// المكون الفرعي المحدث
function FloatingSpec({
  icon: Icon,
  label,
  value,
  x,
  y,
  delay,
  isNight,
}: FloatingSpecProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1 }}
      className="absolute hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div
        className={cn(
          "p-2 rounded-lg",
          isNight
            ? "bg-indigo-500/30 text-indigo-200"
            : "bg-orange-500/30 text-orange-200"
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-left">
        <div className="text-[10px] text-white/70 uppercase tracking-wider font-bold">
          {label}
        </div>
        <div className="text-sm font-bold text-white font-mono">{value}</div>
      </div>
    </motion.div>
  );
}

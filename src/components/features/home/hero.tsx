"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Umbrella,
  Shield,
  Sun,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle,
  Award,
  Users,
  Clock,
  ChevronDown,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface HeroProps {
  title: string;
  description: string;
}

// قيم ثابتة للعناصر المتحركة لتجنب Hydration mismatch
const generateParticles = () => {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    // استخدام قيم محسوبة بناءً على index بدلاً من Math.random()
    x: (i * 73) % 1000,
    y: (i * 37) % 1000,
    moveX: ((i * 13) % 80) - 40,
    moveY: ((i * 17) % 80) - 40,
    duration: 8 + (i % 12),
  }));
};

export function MainHero({ title, description }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [particles] = useState(generateParticles);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    // layoutEffect: false,
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // عرض شاشة تحميل بسيطة حتى يكتمل التحميل على العميل
  if (!mounted) {
    return (
      <section
      ref={containerRef}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white overflow-hidden min-h-screen flex items-center"
    >
      {/* ===== 1. حاوية الخلفية ===== */}
      <motion.div
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-[5%] text-amber-500/30 hidden lg:block"
        >
          <Umbrella className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0], rotate: [0, -20, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-32 right-[5%] text-amber-600/20 hidden lg:block"
        >
          <Shield className="w-40 h-40" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 right-[15%]"
        >
          <Sun className="w-20 h-20 text-yellow-500/20" />
        </motion.div>

        {/* النقاط المتحركة - تم إصلاحها */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [0, particle.moveY, 0],
              x: [0, particle.moveX, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
          />
        ))}

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              fill="#ffffff"
              fillOpacity="0.1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </motion.div>

      {/* ===== 2. المحتوى الرئيسي ===== */}
      <div className="container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  {title}
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-lg lg:text-xl text-amber-100/90 mb-4 leading-relaxed">
                {description}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: "ضمان 10 سنوات",
                  },
                  { icon: <Award className="w-5 h-5" />, text: "مواد أوروبية" },
                  { icon: <Users className="w-5 h-5" />, text: "فريق محترف" },
                  { icon: <Clock className="w-5 h-5" />, text: "تنفيذ سريع" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2 bg-white/5 backdrop-blur p-2 rounded-xl border border-white/10"
                  >
                    <span className="text-amber-400">{item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 mb-8"
            >
              {[
                { number: "500+", label: "مشروع", icon: "🏗️" },
                { number: "15+", label: "سنوات", icon: "⏳" },
                { number: "100%", label: "رضا العملاء", icon: "⭐" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur rounded-xl p-3 text-center border border-white/10"
                >
                  <span className="text-xl sm:text-2xl font-bold text-amber-400">
                    {stat.number}
                  </span>
                  <p className="text-xs text-amber-200">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all flex-1 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  احصل على عرض سعر
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              <a
                href="https://wa.me/966 5309 89 975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-xl flex-1"
              >
                <MessageCircle className="w-5 h-5" />
                واتساب
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              <span className="text-sm text-amber-300 ml-2">خدماتنا:</span>
              {["مظلات سيارات", "برجولات", "سواتر", "مظلات مدارس"].map(
                (service) => (
                  <Link
                    key={service}
                    href={`/services#${service}`}
                    className="px-3 py-1.5 bg-white/5 backdrop-blur rounded-full text-xs text-amber-200 hover:bg-white/10 transition-colors border border-white/10"
                  >
                    {service}
                  </Link>
                ),
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-2 mt-6 text-sm text-amber-300/70"
            >
              <MapPin className="w-4 h-4" />
              <span>
                نغطي جميع مدن المملكة - جدة
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 hidden lg:block relative"
          >
            <div className="relative h-[600px] w-full">
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-[450px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-20"
              >
                <Image
                  src="/images/4.jpg"
                  alt="مظلة سيارات فاخرة"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 text-white">
                  <p className="text-2xl font-bold">مظلات سيارات</p>
                  <p className="text-amber-300">عزل حراري - ضمان 10 سنوات</p>
                </div>
                <div className="absolute top-6 left-6 bg-amber-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                  خصم 20%
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -3, 3, 0] }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-0 left-0 w-[350px] h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-10"
              >
                <Image
                  src="/images/0.jpg"
                  alt="برجولات خشبية"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 text-white">
                  <p className="text-xl font-bold">برجولات</p>
                  <p className="text-sm text-amber-300">تصاميم عصرية</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-40 left-20 w-[200px] h-[200px] rounded-2xl overflow-hidden shadow-xl border-4 border-white/10 z-30"
              >
                <Image
                  src="/images/2.jpg"
                  alt="سواتر حديد"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 cursor-pointer hidden lg:block z-20"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">اكتشف المزيد</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
}

// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion, useTransform, useMotionValue } from "framer-motion";
// import Image from "next/image";
// import {
//   ArrowLeft,
//   Sun,
//   Moon,
//   MoveHorizontal,
//   Sparkles,
//   Eye,
//   Maximize2,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface HeroProps {
//   title: string;
//   description: string;
//   buttonText?: string;
//   dayImage?: string;
//   nightImage?: string;
// }

// export function Hero({
//   title,
//   description,
//   buttonText = "اطلب عرض سعر",
//   dayImage = "/images/2.jpg", // تأكد من جودة الصور
//   nightImage = "/images/0.jpg",
// }: HeroProps) {
//   const [sliderPosition, setSliderPosition] = useState(50);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeView, setActiveView] = useState<"day" | "night" | "split">(
//     "split",
//   );

//   const x = useMotionValue(50);
//   const glowIntensity = useTransform(x, [0, 50, 100], [0.2, 0.8, 0.2]);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     x.set(sliderPosition);
//   }, [sliderPosition, x]);

//   // دالة تحريك السلايدر مع الماوس (تم ربطها الآن بالـ section)
//   const handleMouseMove = useCallback(
//     (e: React.MouseEvent<HTMLElement>) => {
//       if (!containerRef.current || isMobile || activeView !== "split") return;
//       const rect = containerRef.current.getBoundingClientRect();
//       // حساب الموضع بناءً على اتجاه اليمين لليسار RTL
//       const position = ((rect.right - e.clientX) / rect.width) * 100;
//       setSliderPosition(Math.min(Math.max(position, 0), 100));
//     },
//     [isMobile, activeView],
//   );

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) element.scrollIntoView({ behavior: "smooth" });
//   };

//   const getSmartBadgeText = () => {
//     if (isMobile) {
//       switch (activeView) {
//         case "day":
//           return "حماية نهارية فائقة";
//         case "night":
//           return "إضاءة ليلية فخمة";
//         case "split":
//           return "مقارنة ذكية";
//       }
//     } else {
//       if (sliderPosition > 70) return "إشراقة النهار";
//       if (sliderPosition < 30) return "فخامة الإضاءة الليلية";
//       return "حرك الماوس للمقارنة";
//     }
//   };

//   return (
//     <section
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-slate-950 cursor-ew-resize rounded-b-[2rem] md:rounded-b-[4rem]"
//       dir="rtl"
//     >
//       {/* طبقات الصور */}
//       <div className="absolute inset-0 pointer-events-none">

//         {/* صورة الليل (الخلفية الثابتة) */}
//         <div
//           className={cn(
//             "absolute inset-0 transition-opacity duration-1000",
//             isMobile && activeView === "day" ? "opacity-0" : "opacity-100",
//           )}
//         >
//           <Image
//             src={nightImage}
//             alt="مظلات ليلية"
//             fill
//             priority
//             className="object-cover object-center scale-105" // scale لمنع الحواف البيضاء
//             sizes="100vw"
//           />
//           {/* تدرجات لحماية النص من الانعدام اللوني */}
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
//           <div className="absolute inset-y-0 right-0 w-full md:w-3/4 bg-gradient-to-l from-slate-950/90 via-slate-950/60 to-transparent" />
//         </div>

//         {/* صورة النهار (تتحرك بالقص Clip-path) */}
//         <div
//           className={cn(
//             "absolute inset-0 transition-all duration-700",
//             isMobile && activeView === "night" ? "opacity-0" : "opacity-100",
//           )}
//           style={
//             !isMobile && activeView === "split"
//               ? { clipPath: `inset(0 0 0 ${100 - sliderPosition}%)` }
//               : !isMobile && activeView === "night"
//                 ? { clipPath: `inset(0 0 0 100%)` }
//                 : { clipPath: `inset(0 0 0 0)` }
//           }
//         >
//           <Image
//             src={dayImage}
//             alt="مظلات نهارية"
//             fill
//             priority
//             className="object-cover object-center scale-105"
//             sizes="100vw"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
//           <div className="absolute inset-y-0 right-0 w-full md:w-3/4 bg-gradient-to-l from-slate-950/80 via-slate-950/50 to-transparent" />
//         </div>
//       </div>

//       {/* خط الفاصل المضيء (للويب فقط) */}
//       {!isMobile && activeView === "split" && (
//         <motion.div
//           className="absolute top-0 bottom-0 w-0.5 z-30 pointer-events-none bg-gradient-to-b from-transparent via-primary to-transparent"
//           style={{
//             right: `${sliderPosition}%`,
//             boxShadow: "0 0 20px 2px rgba(245, 158, 11, 0.6)",
//           }}
//         >
//           {/* دائرة الفاصل */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-primary flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
//             <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
//             <MoveHorizontal className="w-5 h-5 text-primary relative z-10" />
//           </div>
//         </motion.div>
//       )}

//       {/* تحكم الجوال (أزرار مبدلة) */}
//       {isMobile && (
//         <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-xl">
//           <button
//             onClick={() => setActiveView("day")}
//             className={cn(
//               "p-3 rounded-xl transition-all duration-300",
//               activeView === "day"
//                 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
//                 : "text-white/60 hover:text-white hover:bg-white/5",
//             )}
//           >
//             <Sun className="w-5 h-5" />
//           </button>

//           <button
//             onClick={() => setActiveView("night")}
//             className={cn(
//               "p-3 rounded-xl transition-all duration-300",
//               activeView === "night"
//                 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
//                 : "text-white/60 hover:text-white hover:bg-white/5",
//             )}
//           >
//             <Moon className="w-5 h-5" />
//           </button>
//         </div>
//       )}

//       {/* المحتوى النصي (فوق الصور) */}
//       <div className="absolute inset-0 z-40 flex items-center justify-center md:justify-start pointer-events-none pt-20">
//         <div className="container mx-auto px-4 md:px-12 pointer-events-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="max-w-3xl text-center md:text-right"
//           >
//             {/* شارة ذكية */}
//             <div className="inline-flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-5 py-2 rounded-full border border-primary/30 mb-6 text-white text-sm shadow-[0_0_20px_rgba(245,158,11,0.15)]">
//               <Sparkles className="w-4 h-4 text-primary" />
//               <span className="font-medium tracking-wide">{getSmartBadgeText()}</span>
//             </div>

//             {/* العنوان */}
//             <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black text-white mb-6 drop-shadow-2xl leading-[1.15]">
//               {/* تقسيم العنوان لجعله أجمل */}
//               {title.split(' ').map((word, i, arr) => (
//                 i === arr.length - 1
//                 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-l from-primary-dark to-primary">{word}</span>
//                 : <span key={i}>{word} </span>
//               ))}
//             </h1>

//             {/* الوصف */}
//             <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed drop-shadow-md max-w-2xl mx-auto md:mx-0">
//               {description}
//             </p>

//             {/* الأزرار متوافقة مع الهوية الجديدة */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//               <button
//                 onClick={() => scrollToSection("contact")}
//                 className="group px-8 py-4 bg-gradient-to-l from-primary-dark to-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 border border-primary-light/30"
//               >
//                 {buttonText}
//                 <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("projects")}
//                 className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
//               >
//                 <Eye className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
//                 استكشف أعمالنا
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* مؤشر التمرير */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-40 pointer-events-auto cursor-pointer"
//         onClick={() => scrollToSection("services")}
//       >
//         <span className="text-white/60 text-xs tracking-widest uppercase font-medium">
//           اكتشف المزيد
//         </span>
//         <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 hover:border-primary/50 transition-colors">
//           <motion.div
//             animate={{ y: [0, 15, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="w-1 h-2 bg-primary rounded-full"
//           />
//         </div>
//       </motion.div>
//     </section>
//   );
// }
// // "use client";

// // import React, { useState, useRef, useEffect, useCallback } from "react";
// // import { motion, useTransform, useMotionValue } from "framer-motion";
// // import Image from "next/image";
// // import {
// //   ArrowLeft,
// //   Sun,
// //   Moon,
// //   ChevronDown,
// //   MoveHorizontal,
// //   Sparkles,
// //   Eye,
// //   Maximize2,
// //   Link,
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // interface HeroProps {
// //   title: string;
// //   description: string;
// //   buttonText?: string;
// //   dayImage?: string;
// //   nightImage?: string;
// // }

// // export function Hero({
// //   title,
// //   description,
// //   buttonText = "اطلب عرض سعر",
// //   dayImage = "/images/2.jpg", // تأكد من جودة الصور
// //   nightImage = "/images/0.jpg",
// // }: HeroProps) {
// //   const [sliderPosition, setSliderPosition] = useState(50);
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [activeView, setActiveView] = useState<"day" | "night" | "split">(
// //     "split",
// //   );

// //   const x = useMotionValue(50);
// //   const glowIntensity = useTransform(x, [0, 50, 100], [0.2, 0.8, 0.2]);

// //   useEffect(() => {
// //     const checkMobile = () => setIsMobile(window.innerWidth < 768);
// //     checkMobile();
// //     window.addEventListener("resize", checkMobile);
// //     return () => window.removeEventListener("resize", checkMobile);
// //   }, []);

// //   useEffect(() => {
// //     x.set(sliderPosition);
// //   }, [sliderPosition, x]);

// //   // دالة تحريك السلايدر مع الماوس (تم ربطها الآن بالـ section)
// //   const handleMouseMove = useCallback(
// //     (e: React.MouseEvent<HTMLElement>) => {
// //       if (!containerRef.current || isMobile || activeView !== "split") return;
// //       const rect = containerRef.current.getBoundingClientRect();
// //       // حساب الموضع بناءً على اتجاه اليمين لليسار RTL
// //       const position = ((rect.right - e.clientX) / rect.width) * 100;
// //       setSliderPosition(Math.min(Math.max(position, 0), 100));
// //     },
// //     [isMobile, activeView],
// //   );

// //   const scrollToSection = (id: string) => {
// //     const element = document.getElementById(id);
// //     if (element) element.scrollIntoView({ behavior: "smooth" });
// //   };

// //   const getSmartBadgeText = () => {
// //     if (isMobile) {
// //       switch (activeView) {
// //         case "day":
// //           return "التصميم النهاري";
// //         case "night":
// //           return "الإضاءة الليلية";
// //         case "split":
// //           return "مقارنة ذكية";
// //       }
// //     } else {
// //       if (sliderPosition > 70) return "إشراقة النهار";
// //       if (sliderPosition < 30) return "فخامة الإضاءة الليلية";
// //       return "حرك الماوس للمقارنة";
// //     }
// //   };

// //   return (
// //     <section
// //       ref={containerRef}
// //       onMouseMove={handleMouseMove} // تم إضافة الربط هنا ليعمل التأثير السحري!
// //       className="relative w-full h-[100svh] overflow-hidden bg-[#020617] cursor-ew-resize"
// //       dir="rtl"
// //     >
// //       {/* طبقات الصور */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {/* صورة الليل (الخلفية الثابتة) */}
// //         <div
// //           className={cn(
// //             "absolute inset-0 transition-opacity duration-1000",
// //             isMobile && activeView === "day" ? "opacity-0" : "opacity-100",
// //           )}
// //         >
// //           <Image
// //             src={nightImage}
// //             alt="مظلات ليلية"
// //             fill
// //             priority
// //             className="object-cover object-center"
// //             sizes="100vw"
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
// //         </div>

// //         {/* صورة النهار (تتحرك بالقص Clip-path) */}
// //         <div
// //           className={cn(
// //             "absolute inset-0 transition-all duration-700",
// //             isMobile && activeView === "night" ? "opacity-0" : "opacity-100",
// //           )}
// //           style={
// //             !isMobile && activeView === "split"
// //               ? { clipPath: `inset(0 0 0 ${100 - sliderPosition}%)` } // معدل ليدعم RTL
// //               : !isMobile && activeView === "night"
// //                 ? { clipPath: `inset(0 0 0 100%)` }
// //                 : { clipPath: `inset(0 0 0 0)` }
// //           }
// //         >
// //           <Image
// //             src={dayImage}
// //             alt="مظلات نهارية"
// //             fill
// //             priority
// //             className="object-cover object-center"
// //             sizes="100vw"
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
// //         </div>
// //       </div>

// //       {/* خط الفاصل المضيء (للويب فقط) */}
// //       {!isMobile && activeView === "split" && (
// //         <motion.div
// //           className="absolute top-0 bottom-0 w-0.5 z-30 pointer-events-none bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"
// //           style={{
// //             right: `${sliderPosition}%`, // استخدام right بدلاً من left بسبب RTL
// //             boxShadow: "0 0 20px 2px rgba(212,175,55,0.8)",
// //           }}
// //         >
// //           {/* دائرة الفاصل */}
// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-[#d4af37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
// //             <MoveHorizontal className="w-5 h-5 text-[#d4af37]" />
// //           </div>
// //         </motion.div>
// //       )}

// //       {/* تحكم الجوال */}
// //       {isMobile && (
// //         <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-[#0f172a]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10">
// //           <button
// //             onClick={() => setActiveView("day")}
// //             className={cn(
// //               "p-3 rounded-full transition-all",
// //               activeView === "day"
// //                 ? "bg-[#d4af37] text-slate-900"
// //                 : "text-white/60 hover:text-white",
// //             )}
// //           >
// //             <Sun className="w-5 h-5" />
// //           </button>
// //           <button
// //             onClick={() => setActiveView("split")}
// //             className={cn(
// //               "p-3 rounded-full transition-all",
// //               activeView === "split"
// //                 ? "bg-[#d4af37] text-slate-900"
// //                 : "text-white/60 hover:text-white",
// //             )}
// //           >
// //             <Maximize2 className="w-5 h-5" />
// //           </button>
// //           <button
// //             onClick={() => setActiveView("night")}
// //             className={cn(
// //               "p-3 rounded-full transition-all",
// //               activeView === "night"
// //                 ? "bg-[#d4af37] text-slate-900"
// //                 : "text-white/60 hover:text-white",
// //             )}
// //           >
// //             <Moon className="w-5 h-5" />
// //           </button>
// //         </div>
// //       )}

// //       {/* المحتوى النصي (فوق الصور) */}
// //       <div className="absolute inset-0 z-40 flex items-center justify-center md:justify-start pointer-events-none">
// //         <div className="container mx-auto px-4 md:px-12 pointer-events-auto">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //             className="max-w-3xl text-center md:text-right"
// //           >
// //             {/* شارة ذكية */}
// //             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6 text-white text-sm shadow-lg">
// //               <Sparkles className="w-4 h-4 text-[#d4af37]" />
// //               {getSmartBadgeText()}
// //             </div>

// //             {/* العنوان */}
// //             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg leading-tight">
// //               {title}
// //             </h1>

// //             {/* الوصف */}
// //             <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed drop-shadow-md">
// //               {description}
// //             </p>

// //             {/* الأزرار متوافقة مع الهوية */}
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
// //               <button
// //                 onClick={() => scrollToSection("contact")}
// //                 className="group px-8 py-4 bg-[#d4af37] text-slate-900 rounded-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
// //               >
// //                 {buttonText}
// //                 <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
// //               </button>

// //               <button
// //                 onClick={() => scrollToSection("products")}
// //                 className="px-8 py-4 bg-white/5 backdrop-blur-md text-white rounded-lg font-medium border border-white/20 hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
// //               >
// //                 <Eye className="w-5 h-5 text-[#d4af37]" />
// //                 استكشف التصاميم
// //               </button>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>

// //       {/* مؤشر التمرير */}
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 1.5 }}
// //         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-40 pointer-events-auto"
// //       >
// //         <span className="text-white/60 text-xs tracking-widest uppercase">
// //           التمرير للأسفل
// //         </span>
// //         <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
// //           <motion.div
// //             animate={{ y: [0, 15, 0] }}
// //             transition={{ duration: 1.5, repeat: Infinity }}
// //             className="w-1 h-2 bg-[#d4af37] rounded-full"
// //           />
// //         </div>
// //       </motion.div>
// //     </section>
// //   );
// // }

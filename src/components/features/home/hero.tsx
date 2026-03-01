"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  Sun,
  Moon,
  ChevronDown,
  MoveHorizontal,
  Sparkles,
  Eye,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  description: string;
  buttonText?: string;
  dayImage?: string;
  nightImage?: string;
}

export function Hero({
  title,
  description,
  buttonText = "اطلب عرض سعر",
  dayImage = "/images/2.jpg", // تأكد من جودة الصور
  nightImage = "/images/0.jpg",
}: HeroProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeView, setActiveView] = useState<"day" | "night" | "split">(
    "split",
  );

  const x = useMotionValue(50);
  const glowIntensity = useTransform(x, [0, 50, 100], [0.2, 0.8, 0.2]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    x.set(sliderPosition);
  }, [sliderPosition, x]);

  // دالة تحريك السلايدر مع الماوس (تم ربطها الآن بالـ section)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!containerRef.current || isMobile || activeView !== "split") return;
      const rect = containerRef.current.getBoundingClientRect();
      // حساب الموضع بناءً على اتجاه اليمين لليسار RTL
      const position = ((rect.right - e.clientX) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(position, 0), 100));
    },
    [isMobile, activeView],
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const getSmartBadgeText = () => {
    if (isMobile) {
      switch (activeView) {
        case "day":
          return "التصميم النهاري";
        case "night":
          return "الإضاءة الليلية";
        case "split":
          return "مقارنة ذكية";
      }
    } else {
      if (sliderPosition > 70) return "إشراقة النهار";
      if (sliderPosition < 30) return "فخامة الإضاءة الليلية";
      return "حرك الماوس للمقارنة";
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove} // تم إضافة الربط هنا ليعمل التأثير السحري!
      className="relative w-full h-[100svh] overflow-hidden bg-[#020617] cursor-ew-resize"
      dir="rtl"
    >
      {/* طبقات الصور */}
      <div className="absolute inset-0 pointer-events-none">
        {/* صورة الليل (الخلفية الثابتة) */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            isMobile && activeView === "day" ? "opacity-0" : "opacity-100",
          )}
        >
          <Image
            src={nightImage}
            alt="مظلات ليلية"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
        </div>

        {/* صورة النهار (تتحرك بالقص Clip-path) */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-700",
            isMobile && activeView === "night" ? "opacity-0" : "opacity-100",
          )}
          style={
            !isMobile && activeView === "split"
              ? { clipPath: `inset(0 0 0 ${100 - sliderPosition}%)` } // معدل ليدعم RTL
              : !isMobile && activeView === "night"
                ? { clipPath: `inset(0 0 0 100%)` }
                : { clipPath: `inset(0 0 0 0)` }
          }
        >
          <Image
            src={dayImage}
            alt="مظلات نهارية"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        </div>
      </div>

      {/* خط الفاصل المضيء (للويب فقط) */}
      {!isMobile && activeView === "split" && (
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 z-30 pointer-events-none bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"
          style={{
            right: `${sliderPosition}%`, // استخدام right بدلاً من left بسبب RTL
            boxShadow: "0 0 20px 2px rgba(212,175,55,0.8)",
          }}
        >
          {/* دائرة الفاصل */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-[#d4af37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            <MoveHorizontal className="w-5 h-5 text-[#d4af37]" />
          </div>
        </motion.div>
      )}

      {/* تحكم الجوال */}
      {isMobile && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-[#0f172a]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10">
          <button
            onClick={() => setActiveView("day")}
            className={cn(
              "p-3 rounded-full transition-all",
              activeView === "day"
                ? "bg-[#d4af37] text-slate-900"
                : "text-white/60 hover:text-white",
            )}
          >
            <Sun className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveView("split")}
            className={cn(
              "p-3 rounded-full transition-all",
              activeView === "split"
                ? "bg-[#d4af37] text-slate-900"
                : "text-white/60 hover:text-white",
            )}
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveView("night")}
            className={cn(
              "p-3 rounded-full transition-all",
              activeView === "night"
                ? "bg-[#d4af37] text-slate-900"
                : "text-white/60 hover:text-white",
            )}
          >
            <Moon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* المحتوى النصي (فوق الصور) */}
      <div className="absolute inset-0 z-40 flex items-center justify-center md:justify-start pointer-events-none">
        <div className="container mx-auto px-4 md:px-12 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center md:text-right"
          >
            {/* شارة ذكية */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6 text-white text-sm shadow-lg">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              {getSmartBadgeText()}
            </div>

            {/* العنوان */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg leading-tight">
              {title}
            </h1>

            {/* الوصف */}
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed drop-shadow-md">
              {description}
            </p>

            {/* الأزرار متوافقة مع الهوية */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection("contact")}
                className="group px-8 py-4 bg-[#d4af37] text-slate-900 rounded-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                {buttonText}
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("products")}
                className="px-8 py-4 bg-white/5 backdrop-blur-md text-white rounded-lg font-medium border border-white/20 hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5 text-[#d4af37]" />
                استكشف التصاميم
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-40 pointer-events-auto"
      >
        <span className="text-white/60 text-xs tracking-widest uppercase">
          التمرير للأسفل
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-[#d4af37] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
// import Image from "next/image";
// import {
//   ArrowRight,
//   Sun,
//   Moon,
//   ChevronDown,
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
//   buttonText = "احجز استشارة",
//   dayImage = "/images/2.jpg",
//   nightImage = "/images/0.jpg",
// }: HeroProps) {
//   const [sliderPosition, setSliderPosition] = useState(50);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeView, setActiveView] = useState<"day" | "night" | "split">(
//     "split",
//   );

//   // ✅ كل Hooks في الأعلى وبشكل غير شرطي
//   const x = useMotionValue(50);
//   const glowIntensity = useTransform(x, [0, 50, 100], [0.3, 1, 0.3]);

//   // التحقق من حجم الشاشة
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // تحديث motion value عند تغيير position
//   useEffect(() => {
//     x.set(sliderPosition);
//   }, [sliderPosition, x]);

//   const handleMove = useCallback(
//     (clientX: number) => {
//       if (!containerRef.current || isMobile) return;
//       const rect = containerRef.current.getBoundingClientRect();
//       const position = ((clientX - rect.left) / rect.width) * 100;
//       const clampedPosition = Math.min(Math.max(position, 0), 100);
//       setSliderPosition(clampedPosition);
//     },
//     [isMobile],
//   );

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) element.scrollIntoView({ behavior: "smooth" });
//   };

//   // ✅ دالة مساعدة للحصول على النص حسب الحالة
//   const getSmartBadgeText = () => {
//     if (isMobile) {
//       switch (activeView) {
//         case "day":
//           return "🌞 العرض النهاري";
//         case "night":
//           return "🌙 العرض الليلي";
//         case "split":
//           return "✨ المقارنة الذكية";
//       }
//     } else {
//       if (sliderPosition > 66) return "🌞 أجواء نهارية مشمسة";
//       if (sliderPosition < 33) return "🌙 أجواء ليلية هادئة";
//       return "✨ مقارنة ذكية بين الوضعين";
//     }
//   };

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full min-h-screen overflow-hidden bg-black"
//     >
//       {/* خلفية متحركة سينمائية */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-gradient" />

//       {/* طبقات الصور - تصميم محسن للجوال */}
//       <div className="absolute inset-0">
//         {/* صورة الليل */}
//         <div
//           className={cn(
//             "absolute inset-0 transition-opacity duration-700",
//             isMobile
//               ? activeView === "night"
//                 ? "opacity-100"
//                 : "opacity-0"
//               : "opacity-100",
//           )}
//         >
//           <Image
//             src={nightImage}
//             alt="مظلات ليلية"
//             fill
//             priority
//             className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
//             sizes="100vw"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
//         </div>

//         {/* صورة النهار */}
//         <div
//           className={cn(
//             "absolute inset-0 transition-all duration-700",
//             isMobile
//               ? activeView === "day"
//                 ? "opacity-100"
//                 : "opacity-0"
//               : "",
//           )}
//           style={
//             !isMobile && activeView === "split"
//               ? { clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }
//               : !isMobile && activeView === "day"
//                 ? { clipPath: `inset(0 0 0 0)` }
//                 : !isMobile && activeView === "night"
//                   ? { clipPath: `inset(0 0 0 0)`, opacity: 0 }
//                   : undefined
//           }
//         >
//           <Image
//             src={dayImage}
//             alt="مظلات نهارية"
//             fill
//             priority
//             className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
//             sizes="100vw"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//         </div>
//       </div>

//       {/* تأثير التوهج على حافة المقارنة - للويب فقط */}
//       {!isMobile && activeView === "split" && (
//         <motion.div
//           className="absolute top-0 bottom-0 w-1 z-30 pointer-events-none"
//           style={{
//             left: `${sliderPosition}%`,
//             boxShadow:
//               glowIntensity.get() > 0.5
//                 ? "0 0 50px 10px rgba(255,215,0,0.6)"
//                 : "none",
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary to-transparent w-0.5" />
//         </motion.div>
//       )}

//       {/* مقبض السحب - للويب فقط */}
//       {!isMobile && activeView === "split" && (
//         <div
//           className="absolute z-40 cursor-ew-resize"
//           style={{
//             left: `${sliderPosition}%`,
//             top: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           <motion.div
//             drag="x"
//             dragMomentum={false}
//             onDrag={(_, info) => {
//               const newPos =
//                 sliderPosition +
//                 (info.delta.x / (containerRef.current?.offsetWidth || 1)) * 100;
//               setSliderPosition(Math.min(Math.max(newPos, 0), 100));
//             }}
//             dragConstraints={{ left: 0, right: 0 }}
//             dragElastic={0}
//             className="relative group"
//           >
//             <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full border-2 border-secondary/50 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
//               <MoveHorizontal className="w-8 h-8 text-white" />
//             </div>
//             <div className="absolute inset-0 rounded-full bg-secondary/20 animate-ping" />
//           </motion.div>
//         </div>
//       )}

//       {/* تحكم الجوال - أيقونات التبديل بين الوضعين */}
//       {isMobile && (
//         <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-black/50 backdrop-blur-xl p-2 rounded-full border border-white/10">
//           <button
//             onClick={() => setActiveView("night")}
//             className={cn(
//               "p-3 rounded-full transition-all",
//               activeView === "night"
//                 ? "bg-secondary text-white scale-110 shadow-lg shadow-secondary/50"
//                 : "bg-white/10 text-white/60 hover:bg-white/20",
//             )}
//           >
//             <Moon className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => setActiveView("split")}
//             className={cn(
//               "p-3 rounded-full transition-all",
//               activeView === "split"
//                 ? "bg-secondary text-white scale-110 shadow-lg shadow-secondary/50"
//                 : "bg-white/10 text-white/60 hover:bg-white/20",
//             )}
//           >
//             <Maximize2 className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => setActiveView("day")}
//             className={cn(
//               "p-3 rounded-full transition-all",
//               activeView === "day"
//                 ? "bg-secondary text-white scale-110 shadow-lg shadow-secondary/50"
//                 : "bg-white/10 text-white/60 hover:bg-white/20",
//             )}
//           >
//             <Sun className="w-5 h-5" />
//           </button>
//         </div>
//       )}

//       {/* المحتوى النصي */}
//       <div className="absolute inset-0 z-20 flex items-center">
//         <div className="container mx-auto px-4 md:px-12">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-4xl mx-auto md:mx-0 text-center md:text-right"
//             dir="rtl"
//           >
//             {/* شارة ذكية متغيرة حسب الوقت */}
//             <motion.div
//               animate={{
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 mb-6"
//             >
//               <Sparkles className="w-4 h-4 text-secondary" />
//               <span className="text-sm text-white">{getSmartBadgeText()}</span>
//             </motion.div>

//             {/* عنوان رئيسي */}
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl">
//               {title.split(" ").map((word, i) => (
//                 <motion.span
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   className="inline-block ml-2"
//                 >
//                   {word}
//                 </motion.span>
//               ))}
//             </h1>

//             {/* وصف */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0"
//             >
//               {description}
//             </motion.p>

//             {/* أزرار */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
//             >
//               <button
//                 onClick={() => scrollToSection("contact")}
//                 className="group relative px-8 py-4 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-full font-bold overflow-hidden shadow-2xl hover:shadow-secondary/30"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   {buttonText}
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("products")}
//                 className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
//               >
//                 <Eye className="w-4 h-4" />
//                 <span>استكشف التصاميم</span>
//               </button>
//             </motion.div>

//             {/* مؤشر التمرير لأسفل */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.2 }}
//               className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
//             >
//               <div
//                 onClick={() => scrollToSection("products")}
//                 className="flex flex-col items-center gap-2 cursor-pointer group"
//               >
//                 <span className="text-white/60 text-sm">اكتشف المزيد</span>
//                 <ChevronDown className="w-5 h-5 text-white/60 group-hover:translate-y-1 transition-transform animate-bounce" />
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* تأثيرات زخرفية خلفية */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
//       </div>
//     </section>
//   );
// }

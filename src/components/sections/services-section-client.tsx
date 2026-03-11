/* eslint-disable react-hooks/static-components */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Shield,
  Award,
  Star,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import { ServiceItem } from "@/lib/api";
import { ServiceCard } from "../services/services-card";

// ==========================================
// دالة مساعدة لإنشاء نقاط بقيم ثابتة
// ==========================================
const generateParticles = (count: number = 20) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    // استخدام قيم محسوبة من الـ index لتجنب Math.random()
    x: ((i * 73) % 2000) - 1000,
    y: ((i * 37) % 2000) - 1000,
    moveX: ((i * 13) % 100) - 50,
    moveY: ((i * 17) % 100) - 50,
    duration: 15 + (i % 15),
  }));
};

// ==========================================
// المكون الرئيسي (Client Component)
// ==========================================
export function ServicesGridClient({
  services = [],
  title = "خدماتنا المتكاملة",
  subtitle = "حلول هندسية مبتكرة",
  limit = 10,
}: {
  services: ServiceItem[];
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [mounted, setMounted] = useState(false);
  const [particles] = useState(() => generateParticles(20));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // تحديد عدد الخدمات المعروضة
  const displayServices = limit ? services.slice(0, limit) : services;

  // عرض شاشة تحميل بسيطة حتى يكتمل التحميل
  if (!mounted) {
    return (
      <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950 overflow-hidden"
      dir="rtl"
    >
      {/* ===== خلفية القسم البصرية ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-amber-600/10 rounded-full blur-3xl"
        />

        {/* النقاط المتحركة - تم إصلاحها بالكامل */}
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
            className="absolute w-1 h-1 bg-amber-500/20 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* ===== عنوان القسم ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">
              {title}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground drop-shadow-sm">
            {subtitle.split(" ").map((word, i) =>
              i === 1 ? (
                <span
                  key={i}
                  className="text-transparent bg-clip-text bg-gradient-to-l from-amber-600 to-amber-400"
                >
                  {" " + word + " "}
                </span>
              ) : (
                <span key={i}>{word + " "}</span>
              ),
            )}
          </h2>
        </motion.div>

        {/* ===== شبكة الخدمات ===== */}
        {displayServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {displayServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">جاري تحميل الخدمات...</p>
          </div>
        )}

        {/* ===== زر عرض الكل ===== */}
        {limit && services.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 md:mt-20 text-center"
          >
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-l from-amber-600 to-amber-500 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all"
            >
              <span className="relative z-10 flex items-center gap-3">
                <LayoutGrid className="w-5 h-5" />
                <span>استكشف جميع خدماتنا</span>
                <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        )}

        {/* ===== شارة الجودة ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mt-16"
        >
          {[
            { icon: <Award className="w-5 h-5" />, text: "ضمان حتى 15 سنة" },
            { icon: <Star className="w-5 h-5" />, text: "مواد أوروبية" },
            { icon: <Shield className="w-5 h-5" />, text: "تنفيذ معتمد" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur rounded-full border border-amber-500/20"
            >
              <span className="text-amber-500">{item.icon}</span>
              <span className="text-sm font-medium text-muted-foreground">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ===== موجة زخرفية سفلية ===== */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1 }}
            fill="currentColor"
            className="text-slate-100 dark:text-slate-950"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   LayoutGrid,
//   Sparkles,
//   ArrowLeft,
//   Umbrella,
//   Fence,
//   TreePine,
//   Warehouse,
//   Tent,
//   Palmtree,
//   Settings,
//   LucideIcon,
//   ChevronLeft,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ServiceItem } from "@/lib/api"; // استيراد الواجهة من الـ API

// export type ServiceSize = "small" | "medium" | "large" | "wide";

// // --- 1. خريطة الأيقونات (تعمل بناءً على رابط التصنيف أو الكلمة) ---
// const ICON_MAP: Record<string, LucideIcon> = {
//   cars: Umbrella,
//   shades: Umbrella,
//   sawater: Fence,
//   pergolas: TreePine,
//   projects: Warehouse,
//   pools: Palmtree,
//   tents: Tent,
//   default: Settings,
// };

// const getIconKey = (categorySlug: string): LucideIcon => {
//   const slug = categorySlug?.toLowerCase() || "";
//   if (slug.includes("car")) return ICON_MAP.cars;
//   if (slug.includes("sawater") || slug.includes("ساتر"))
//     return ICON_MAP.sawater;
//   if (
//     slug.includes("pergola") ||
//     slug.includes("برجول") ||
//     slug.includes("جلسات")
//   )
//     return ICON_MAP.pergolas;
//   if (
//     slug.includes("project") ||
//     slug.includes("هناجر") ||
//     slug.includes("حديد")
//   )
//     return ICON_MAP.projects;
//   if (slug.includes("pool") || slug.includes("مسبح") || slug.includes("لكسان"))
//     return ICON_MAP.pools;
//   if (slug.includes("tent") || slug.includes("خيم") || slug.includes("قماش"))
//     return ICON_MAP.tents;
//   return ICON_MAP.default;
// };

// // --- 2. المكون الرئيسي للشبكة ---
// export function ServicesGridClient({ services }: { services: ServiceItem[] }) {
//   // نعرض أول 8 خدمات في الصفحة الرئيسية
//   const [visibleCount] = useState(8);
//   const displayServices = services.slice(0, visibleCount);

//   return (
//     <section
//       className="pt-16 md:pt-24 pb-32 md:pb-48 bg-background relative overflow-hidden text-right z-10"
//       dir="rtl"
//     >
//       {/* إضاءة خلفية ناعمة */}
//       <div className="absolute top-20 left-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

//       <div className="container mx-auto px-4 relative z-10">
//         {/* العنوان */}
//         <div className="text-center mb-16 md:mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5 shadow-sm shadow-primary/5"
//           >
//             <Sparkles className="w-3.5 h-3.5 text-primary" />
//             <span className="text-primary text-[11px] md:text-xs font-bold tracking-widest uppercase">
//               خدماتنا المتكاملة
//             </span>
//           </motion.div>
//           <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground drop-shadow-sm">
//             حلول{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-dark to-primary">
//               هندسية
//             </span>{" "}
//             مبتكرة
//           </h2>
//         </div>

//         {/* شبكة الأعمال - عدلنا الارتفاعات لتناسب البطاقة الجديدة */}
//         <motion.div
//           layout
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-fr"
//         >
//           <AnimatePresence mode="popLayout">
//             {displayServices.map((service, index) => (
//               <ServiceCard key={service.id} service={service} index={index} />
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* زر عرض المزيد */}
//         {services.length > visibleCount && (
//           <div className="mt-16 md:mt-24 text-center relative z-20">
//             <Link
//               href="/services"
//               className="inline-flex items-center justify-center gap-3 bg-gradient-to-l from-primary-dark to-primary text-primary-foreground px-10 py-4 md:py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 group border border-primary-light/30"
//             >
//               <LayoutGrid className="w-5 h-5 transition-transform group-hover:scale-110" />
//               <span>استكشف كافة الخدمات</span>
//               <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform" />
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* الفاصل المتموج في أسفل القسم */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 transform translate-y-[1px]">
//         <svg
//           className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[150px]"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,116.1,188.75,105.3,242.89,95.21,283.47,65.85,321.39,56.44Z"
//             className="fill-slate-950 dark:fill-[#020617]"
//           ></path>
//         </svg>
//       </div>
//     </section>
//   );
// }

// // --- 3. مكون بطاقة الخدمة "المدلع" ---
// function ServiceCard({
//   service,
//   index,
// }: {
//   service: ServiceItem;
//   index: number;
// }) {
//   // استخراج البيانات بأمان من واجهة الووردبريس
//   const category = service.serviceCategories?.nodes?.[0];
//   const imageUrl = service.featuredImage?.node?.sourceUrl || "/images/0.jpg";
//   const serviceHref = `/services/${service.slug}`;
//   const SelectedIcon = getIconKey(category?.slug || service.slug || "");

//   // نستخدم الـ SEO Desc إذا كان موجوداً، أو نستخرج جزء من الـ content
//   const description =
//     service.seo?.metaDesc ||
//     "نقدم أفضل حلول التصميم والتركيب بأعلى معايير الجودة والضمان، مع إشراف هندسي متكامل لضمان راحة بالك.";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{
//         delay: (index % 4) * 0.1,
//         duration: 0.6,
//         type: "spring",
//         stiffness: 100,
//       }}
//       className="group h-full col-span-1" // جعلناها تأخذ عموداً واحداً لتبدو كبطاقات خدمات مرتبة
//     >
//       <Link href={serviceHref} className="block h-full">
//         <div className="relative h-full bg-card rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] transition-all duration-500 border border-border/40 hover:border-primary/30 flex flex-col group-hover:-translate-y-2">
//           {/* جزء الصورة العلوية */}
//           <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
//             <Image
//               src={imageUrl}
//               alt={service.title}
//               fill
//               unoptimized
//               className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
//             />
//             {/* تدرج لوني ناعم من الأسفل لدمج الصورة مع الكرت */}
//             <div className="absolute inset-0 bg-gradient-to-t from-card via-black/20 to-transparent opacity-90 transition-opacity" />

//             {/* تصنيف الخدمة كشريط فخم */}
//             {category && (
//               <div className="absolute top-4 right-4 md:top-5 md:right-5">
//                 <span className="px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-primary text-[10px] md:text-xs font-bold shadow-lg border border-primary/20">
//                   {category.name}
//                 </span>
//               </div>
//             )}

//             {/* الأيقونة العائمة (Floating Icon) */}
//             <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-card border border-border/50 shadow-lg flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/20 z-10 rotate-3 group-hover:rotate-0">
//               <SelectedIcon className="w-6 h-6" strokeWidth={2} />
//             </div>
//           </div>

//           {/* جزء المحتوى السفلي */}
//           <div className="flex flex-col flex-grow p-6 md:p-8 pt-8 bg-card relative z-0">
//             <h3 className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2 mb-3">
//               {service.title}
//             </h3>

//             <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-8">
//               {description}
//             </p>

//             {/* الفوتر الخاص بالكرت */}
//             <div className="mt-auto pt-5 border-t border-border/50 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="relative flex h-2.5 w-2.5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
//                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
//                 </span>
//                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
//                   اكتشف التفاصيل
//                 </span>
//               </div>

//               {/* السهم المتفاعل */}
//               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border border-border group-hover:bg-gradient-to-l group-hover:from-primary-dark group-hover:to-primary group-hover:border-transparent group-hover:shadow-lg transition-all duration-500 group-hover:scale-110">
//                 <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors transform group-hover:-translate-x-0.5" />
//               </div>
//             </div>
//           </div>

//           {/* خط نحاسي يظهر أسفل البطاقة عند التمرير */}
//           <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-dark to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

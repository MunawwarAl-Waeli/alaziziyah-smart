"use client";

import { useEffect, useState } from "react";
import {
  Umbrella,
  Shield,
  Sun,
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
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  description: string;
}

const ALL_SERVICES = [
  { name: "مظلات سيارات", slug: "projects/مظلات-سيارات" },
  { name: "برجولات", slug: "projects/معرض_برجولات_حديد" },
  { name: "سواتر ليزر وحديد", slug: "projects/سواتر-حديد" },
  { name: "سواتر خشبية", slug: "projects/سواتر-خشبية" },
  { name: "مظلات مسابح", slug: "projects/مظلات-مسابح" },
  { name: "مظلات مدارس", slug: "projects/مظلات-مدارس" },
  { name: "قرميد", slug: "services/قرميد" },
  { name: "بيوت شعر ملكية", slug: "services/بيوت-شعر" },
  { name: "مظلات شد إنشائي", slug: "projects/مظلات-الشد-الانشائي" },
  { name: "مظلات حدائق", slug: "projects/مظلات-حدائق" },
];

export function MainHero({ title, description }: HeroProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // تشغيل تأثيرات الدخول بعد تحميل المكون لتجنب مشاكل الـ Hydration
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // دالة مساعدة لتطبيق تأثير الظهور التدريجي (Fade In Up)
  const fadeUpClass = (delayMs: number) =>
    cn(
      "transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
      isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
    );

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white overflow-hidden min-h-screen flex items-center">
      {/* ===== 1. حاوية الخلفية (Pure CSS) ===== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* إضاءات الخلفية (Glowing Orbs) - ثابتة أو بنبض خفيف جداً للأداء */}
        {/* <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" /> */}

        {/* شبكة الخلفية */}
        <div className="absolute inset-0 opacity-[0.03]">
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
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* أيقونات الخلفية الثابتة للمسة جمالية غير مزعجة */}
        <div className="absolute top-24 left-[8%] text-amber-500/10 hidden lg:block -rotate-12">
          <Umbrella className="w-40 h-40" />
        </div>
        <div className="absolute bottom-40 right-[8%] text-white/5 hidden lg:block rotate-12">
          <Shield className="w-48 h-48" />
        </div>
        <div className="absolute top-40 right-[15%] text-yellow-500/10">
          <Sun className="w-24 h-24 animate-[pulse_6s_ease-in-out_infinite]" />
        </div>

        {/* شكل الموجة السفلي */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="0.05"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* ===== 2. المحتوى الرئيسي ===== */}
      <div className="container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* العمود الأول (النصوص) */}
          <div className="order-2 lg:order-1 text-center lg:text-right">
            <div
              className={fadeUpClass(100)}
              style={{ transitionDelay: "100ms" }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200">
                  {title}
                </span>
              </h1>
            </div>

            <div
              className={fadeUpClass(200)}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                {description}
              </p>
    
              <div className="grid grid-cols-2 gap-3 mb-10 max-w-lg mx-auto lg:mx-0">
                {[
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: "ضمان 10 سنوات",
                  },
                  { icon: <Award className="w-5 h-5" />, text: "مواد أوروبية" },
                  { icon: <Users className="w-5 h-5" />, text: "فريق محترف" },
                  { icon: <Clock className="w-5 h-5" />, text: "تنفيذ سريع" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 transition-colors"
                  >
                    <span className="text-amber-400 shrink-0">{item.icon}</span>
                    <span className="text-sm font-bold text-slate-200">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{ transitionDelay: "300ms" }}
            
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
              </Link>           
                <a
                href="https://wa.me/966530989975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-xl flex-1"
              >
              <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                 <span>واتساب</span>
              </a>
            </div>

            <div
              className={cn(
                "flex flex-wrap items-center justify-center lg:justify-start gap-2",
                fadeUpClass(400),
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <span className="text-xs font-bold text-slate-400 ml-2">
                أبرز خدماتنا:
              </span>
              {ALL_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className="px-3.5 py-1.5 bg-slate-800/50 hover:bg-amber-500 rounded-full text-[11px] font-bold text-slate-300 hover:text-white transition-colors border border-slate-700/50"
                >
                  {service.name}
                </Link>
              ))}
            </div>

            <div
              className={cn(
                "flex items-center justify-center lg:justify-start gap-2 mt-8 text-sm text-slate-400",
                fadeUpClass(500),
              )}
              style={{ transitionDelay: "500ms" }}
            >
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>نغطي كافة أحياء ومناطق مدينة جدة والمملكة</span>
            </div>
          </div>

          {/* العمود الثاني (الصور الجمالية) - تم استخدام Hover Effects بدلاً من الحركة المستمرة */}
          <div
            className={cn(
              "order-1 lg:order-2 hidden lg:block relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isMounted
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-95 -translate-x-12",
            )}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative h-[620px] w-full">
              {/* الصورة الرئيسية */}
              <div className="absolute top-0 right-0 w-[450px] h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/50 z-20 group hover:-translate-y-4 hover:shadow-amber-500/20 hover:border-amber-500/30 transition-all duration-500">
                <Image
                  src="/images/مظلات-السيارات.jpg"
                  alt="مظلات سيارات بي في سي وجي دي اف في جدة"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-8 right-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-2xl font-black mb-1">
                    مظلات سيارات مبتكرة
                  </p>
                  <p className="text-amber-300 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    عزل حراري 100% وحماية من الشمس
                  </p>
                </div>
                <div className="absolute top-6 left-6 bg-amber-500 text-white px-4 py-1.5 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20">
                  خصم 20%
                </div>
              </div>

              {/* الصورة الثانية */}
              <div className="absolute bottom-0 left-0 w-[320px] h-[380px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/50 z-10 group hover:-translate-y-4 hover:shadow-blue-500/20 transition-all duration-500">
                <Image
                  src="/images/1.jpg"
                  alt="تركيب برجولات خشبية وحديدية في جدة"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-lg font-bold mb-1">برجولات حدائق مودرن</p>
                  <p className="text-xs text-amber-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    تصاميم عصرية للجلسات
                  </p>
                </div>
              </div>

              {/* الصورة الثالثة */}
              <div className="absolute top-32 left-10 w-[200px] h-[200px] rounded-2xl overflow-hidden shadow-xl border-4 border-slate-700/50 z-30 group hover:-translate-y-2 hover:shadow-emerald-500/20 transition-all duration-500">
                <Image
                  src="/images/السواتر.jpg"
                  alt="سواتر حديد ليزر وسواتر قماشية بجدة"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر التمرير (CSS Animation) */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white cursor-pointer hidden lg:flex flex-col items-center z-20 transition-colors",
          fadeUpClass(600),
        )}
        style={{ transitionDelay: "600ms" }}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-xs font-bold mb-2 tracking-wider">
          اكتشف المزيد
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   Umbrella,
//   Shield,
//   Sun,
//   Phone,
//   MessageCircle,
//   Calendar,
//   CheckCircle,
//   Award,
//   Users,
//   Clock,
//   ChevronDown,
//   MapPin,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRef, useState } from "react";

// interface HeroProps {
//   title: string;
//   description: string;
// }

// // قيم ثابتة للعناصر المتحركة لتجنب Hydration mismatch
// const generateParticles = () => {
//   return Array.from({ length: 20 }).map((_, i) => ({
//     id: i,
//     x: (i * 73) % 1000,
//     y: (i * 37) % 1000,
//     moveX: ((i * 13) % 80) - 40,
//     moveY: ((i * 17) % 80) - 40,
//     duration: 8 + (i % 12),
//   }));
// };
// const ALL_SERVICES = [
//   { name: "مظلات سيارات", slug: "projects/مظلات-سيارات" },
//   { name: "برجولات", slug: "projects/معرض_برجولات_حديد" },
//   { name: "سواتر ليزر وحديد", slug: "projects/سواتر-حديد" },
//   { name: "سواتر خشبية", slug: "projects/سواتر-خشبية" },
//   { name: "مظلات مسابح", slug: "projects/مظلات-مسابح" },
//   { name: "مظلات مدارس", slug: "projects/مظلات-مدارس" },
//   // { name: "هناجر ومستودعات", slug: "projects/هناجر" },
//   { name: "قرميد", slug: "services/قرميد" },
//   { name: "بيوت شعر ملكية", slug: "services/بيوت-شعر" },
//   { name: "مظلات شد إنشائي", slug: "projects/مظلات-الشد-الانشائي" },
//   { name: "مظلات حدائق", slug: "projects/مظلات-حدائق" },
// ];

// export function MainHero({ title, description }: HeroProps) {
//   const containerRef = useRef<HTMLElement>(null);
//   const [particles] = useState(generateParticles); // آمن تماماً للـ SSR

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
//   const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white overflow-hidden min-h-screen flex items-center"
//     >
//       {/* ===== 1. حاوية الخلفية ===== */}
//       <motion.div
//         style={{ y: backgroundY, opacity: backgroundOpacity }}
//         className="absolute inset-0 w-full h-full pointer-events-none"
//       >
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             rotate: [0, 90, 0],
//             opacity: [0.2, 0.3, 0.2],
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.5, 1],
//             rotate: [0, -90, 0],
//             opacity: [0.1, 0.2, 0.1],
//           }}
//           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"
//         />
//         <div className="absolute inset-0 opacity-10">
//           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern
//                 id="grid"
//                 width="50"
//                 height="50"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M 50 0 L 0 0 0 50"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="0.5"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>
//         <motion.div
//           animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 15, -15, 0] }}
//           transition={{ duration: 8, repeat: Infinity }}
//           className="absolute top-20 left-[5%] text-amber-500/30 hidden lg:block"
//         >
//           <Umbrella className="w-32 h-32" />
//         </motion.div>
//         <motion.div
//           animate={{ y: [0, 40, 0], x: [0, -30, 0], rotate: [0, -20, 20, 0] }}
//           transition={{ duration: 10, repeat: Infinity }}
//           className="absolute bottom-32 right-[5%] text-amber-600/20 hidden lg:block"
//         >
//           <Shield className="w-40 h-40" />
//         </motion.div>
//         <motion.div
//           animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
//           transition={{ duration: 5, repeat: Infinity }}
//           className="absolute top-40 right-[15%]"
//         >
//           <Sun className="w-20 h-20 text-yellow-500/20" />
//         </motion.div>

//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 1440 320"
//             className="w-full h-auto"
//           >
//             <motion.path
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={{ pathLength: 1, opacity: 1 }}
//               transition={{ duration: 2, delay: 1 }}
//               fill="#ffffff"
//               fillOpacity="0.1"
//               d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//             />
//           </svg>
//         </div>
//       </motion.div>

//       {/* ===== 2. المحتوى الرئيسي ===== */}
//       <div className="container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-20 relative z-10 w-full">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           <div className="order-2 lg:order-1 text-center lg:text-right">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="mb-6"
//             >
//               <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
//                   {title}
//                 </span>
//               </h2>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="mb-8"
//             >
//               <p className="text-lg lg:text-xl text-amber-100/90 mb-4 leading-relaxed">
//                 {description}
//               </p>
//               <div className="grid grid-cols-2 gap-3 mt-6">
//                 {[
//                   {
//                     icon: <CheckCircle className="w-5 h-5" />,
//                     text: "ضمان 10 سنوات",
//                   },
//                   { icon: <Award className="w-5 h-5" />, text: "مواد أوروبية" },
//                   { icon: <Users className="w-5 h-5" />, text: "فريق محترف" },
//                   { icon: <Clock className="w-5 h-5" />, text: "تنفيذ سريع" },
//                 ].map((item, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5 + i * 0.1 }}
//                     className="flex items-center gap-2 bg-white/5 backdrop-blur p-2 rounded-xl border border-white/10"
//                   >
//                     <span className="text-amber-400">{item.icon}</span>
//                     <span className="text-sm font-medium">{item.text}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="flex flex-col sm:flex-row gap-3 mb-6"
//             >
//               <Link
//                 href="/contact"
//                 className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all flex-1 text-center"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   <Calendar className="w-5 h-5" />
//                   احصل على عرض سعر
//                 </span>
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700"
//                   initial={{ x: "100%" }}
//                   whileHover={{ x: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </Link>

//               <a
//                 href="https://wa.me/966530989975"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-xl flex-1"
//               >
//                 <MessageCircle className="w-5 h-5" />
//                 واتساب
//               </a>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8 }}
//               className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
//             >
//               <span className="text-sm text-amber-300 ml-2">اعمالنا:</span>
//               {ALL_SERVICES.map((service) => (
//                 <Link
//                   key={service.slug}
//                   href={`/${service.slug}`}
//                   className="px-3 py-1.5 bg-white/5 backdrop-blur rounded-full text-xs text-amber-200 hover:bg-amber-500 hover:text-white transition-all border border-white/10"
//                 >
//                   {service.name}
//                 </Link>
//               ))}
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.9 }}
//               className="flex items-center gap-2 mt-6 text-sm text-amber-300/70"
//             >
//               <MapPin className="w-4 h-4" />
//               <span>نغطي كافة أحياء ومناطق مدينة جدة</span>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.3 }}
//             className="order-1 lg:order-2 hidden lg:block relative"
//           >
//             <div className="relative h-[600px] w-full">
//               <motion.div
//                 animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
//                 transition={{
//                   duration: 8,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//                 className="absolute top-0 right-0 w-[450px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-20"
//               >
//                 <Image
//                   src="/images/مظلات-السيارات.jpg"
//                   alt="مظلات سيارات بي في سي وجي دي اف في جدة"
//                   fill
//                   className="object-cover"
//                   priority
//                   sizes="(max-width: 768px) 100vw, 450px"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
//                 <div className="absolute bottom-6 right-6 text-white">
//                   <p className="text-2xl font-bold">مظلات سيارات مبتكرة</p>
//                   <p className="text-amber-300">
//                     عزل حراري 100% وحماية من شمس جدة الحارقة
//                   </p>
//                 </div>
//                 <div className="absolute top-6 left-6 bg-amber-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
//                   خصم 20%
//                 </div>
//               </motion.div>

//               <motion.div
//                 animate={{ y: [0, 30, 0], rotate: [0, -3, 3, 0] }}
//                 transition={{
//                   duration: 9,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 1,
//                 }}
//                 className="absolute bottom-0 left-0 w-[350px] h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-10"
//               >
//                 <Image
//                   src="/images/1.jpg"
//                   alt="تركيب برجولات خشبية وحديدية في جدة"
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, 350px"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
//                 <div className="absolute bottom-6 right-6 text-white">
//                   <p className="text-xl font-bold">برجولات حدائق مودرن</p>
//                   <p className="text-sm text-amber-300">
//                     تصاميم عصرية للجلسات الخارجية والأسطح
//                   </p>
//                 </div>
//               </motion.div>

//               <motion.div
//                 animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
//                 transition={{
//                   duration: 7,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 2,
//                 }}
//                 className="absolute top-40 left-20 w-[200px] h-[200px] rounded-2xl overflow-hidden shadow-xl border-4 border-white/10 z-30"
//               >
//                 <Image
//                   src="/images/السواتر.jpg"
//                   alt="سواتر حديد ليزر وسواتر قماشية بجدة"
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, 200px"
//                 />
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* مؤشر التمرير */}
//       <motion.div
//         animate={{ y: [0, 10, 0] }}
//         transition={{ duration: 2, repeat: Infinity }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 cursor-pointer hidden lg:block z-20"
//         onClick={() =>
//           window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
//         }
//       >
//         <div className="flex flex-col items-center">
//           <span className="text-sm mb-2">اكتشف المزيد</span>
//           <ChevronDown className="w-6 h-6" />
//         </div>
//       </motion.div>
//     </section>
//   );
// }

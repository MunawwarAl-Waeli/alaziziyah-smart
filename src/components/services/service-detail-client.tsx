"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  PenTool,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  Layers,
  HelpCircle,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { ServiceItem } from "@/lib/api";
import WordPressContent from "@/lib/WordPressContent";

interface Props {
  service: ServiceItem;
  relatedServices: ServiceItem[];
}

export default function ServiceDetailClient({
  service,
  relatedServices,
}: Props) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  // === خطافات التمرير الناعم للـ Parallax ===
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);

  // دالة المشاركة
  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareText = `${service.title}\n${service.serviceDetails?.heroSubtitle || ""}\n\nرابط الخدمة: ${currentUrl}`;
    const coverImageUrl =
      service.featuredImage?.node.sourceUrl || "/icons/icon-512x512.png";

    if (navigator.share && navigator.canShare) {
      try {
        const response = await fetch(coverImageUrl);
        const blob = await response.blob();
        const file = new File([blob], "/icons/icon-512x512.png", {
          type: blob.type,
        });
        const shareData = {
          title: service.title,
          text: shareText,
          url: currentUrl,
          files: [file],
        };
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      } catch (err) {
        console.log("Web Share API failed", err);
      }
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setShowShareTooltip(true);
      setTimeout(() => {
        setCopySuccess(false);
        setShowShareTooltip(false);
      }, 3000);
    } catch (err) {
      alert("تعذر نسخ الرابط. الرجاء نسخه يدوياً: " + currentUrl);
    }
  };

  return (
    <main
      className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-primary/30 relative font-sans"
      dir="rtl"
    >
      {/* 1. قسم الهيرو 
        استخدمنا relative بدلاً من sticky لكي لا يتداخل مع الـ Header الخاص بالموقع في الحاسوب 
      */}
      <div className="relative h-[60vh] md:h-[75vh] min-h-[450px] md:min-h-[550px] w-full flex flex-col justify-end overflow-hidden z-0 pb-20 md:pb-28">
        {/* الصورة مع حركة Parallax */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
          <Image
            src={
              service.featuredImage?.node.sourceUrl || "/images/placeholder.jpg"
            }
            alt={service.title}
            fill
            className="object-cover scale-105"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/30 opacity-95" />
        </motion.div>

        {/* محتوى الهيرو */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="container mx-auto relative z-10 px-4 md:px-8 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-3xl lg:max-w-4xl text-right"
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center flex-wrap gap-2 text-slate-300 text-xs md:text-sm font-medium mb-4 bg-white/10 backdrop-blur-md w-fit px-3 py-1.5 md:px-4 rounded-full border border-white/10 shadow-lg">
              <Link href="/" className="hover:text-primary transition-colors">
                الرئيسية
              </Link>
              <span className="text-white/30">/</span>
              <Link
                href="/services"
                className="hover:text-primary transition-colors"
              >
                الخدمات
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-primary font-bold truncate max-w-[120px] sm:max-w-[150px] md:max-w-none">
                {service.title}
              </span>
            </nav>

            {/* العنوان */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight md:leading-[1.2] drop-shadow-2xl">
              {service.title}
            </h1>

            {/* الوصف */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200/90 w-full md:w-5/6 leading-relaxed md:leading-loose drop-shadow-md line-clamp-3 md:line-clamp-4">
              {service.serviceDetails?.heroSubtitle}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. المحتوى الرئيسي */}
      <div className="relative z-40 bg-background rounded-t-[2rem] md:rounded-t-[3.5rem] -mt-12 md:-mt-16 pt-10 md:pt-16 pb-24 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] border-t border-border/50">
        {/* مؤشر السحب الجمالي */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 md:w-20 h-1.5 bg-muted-foreground/20 rounded-full" />

        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8 md:gap-10 items-start">
          {/* القسم الأيمن: تفاصيل الخدمة */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8 md:gap-12">
            <section className="bg-card rounded-2xl md:rounded-[2rem] p-5 md:p-8 lg:p-10 shadow-sm border border-border/60">
              <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-border/60 pb-4">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <PenTool className="text-primary w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-3xl font-black text-foreground">
                  عن الخدمة
                </h2>
              </div>

              {/* تنسيق محتوى الووردبريس الاحترافي:
                تم استخدام فئات Tailwind للتحكم الدقيق في المسافات، المحاذاة (text-justify)، والقوائم
              */}
              <WordPressContent
                content={service.content}
                className="w-full max-w-none text-right
                prose prose-slate dark:prose-invert 
                prose-sm md:prose-base lg:prose-lg
                
                prose-p:text-justify prose-p:leading-[1.9] prose-p:mb-6 prose-p:text-slate-700 dark:prose-p:text-slate-300
                
                prose-headings:font-black prose-headings:text-foreground prose-headings:mb-4
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:border-r-4 prose-h2:border-primary prose-h2:pr-4 prose-h2:mt-10
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-primary prose-h3:mt-8
                
                prose-strong:font-bold prose-strong:text-slate-900 dark:prose-strong:text-slate-100
                
                prose-ul:list-disc prose-ul:pr-5 prose-ul:mb-6 prose-li:mb-2 prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:marker:text-primary
                prose-ol:list-decimal prose-ol:pr-5 prose-ol:mb-6
                
                prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:object-cover prose-img:my-8
                prose-a:text-primary hover:prose-a:text-primary-dark prose-a:transition-colors
                break-words"
              />

              {/* كروت المميزات */}
              {service.serviceDetails?.features &&
                service.serviceDetails.features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-border/60">
                    {service.serviceDetails.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 dark:bg-slate-900/50 p-5 md:p-6 rounded-2xl border border-border/50 flex flex-col items-center text-center gap-4 hover:border-primary/40 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {idx === 0 ? (
                            <ShieldCheck className="w-6 h-6" />
                          ) : (
                            <CheckCircle2 className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-base md:text-lg text-foreground mb-1.5">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </section>

            {/* الأنواع والخيارات */}
            {service.serviceDetails?.types &&
              service.serviceDetails.types.length > 0 && (
                <section className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                      <Layers className="text-primary w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-xl md:text-3xl font-black text-foreground">
                      الأنواع والخيارات
                    </h3>
                  </div>

                  <div className="grid gap-5">
                    {service.serviceDetails.types.map((type, idx) => (
                      <div
                        key={idx}
                        className="bg-card rounded-2xl md:rounded-[2rem] border border-border/60 shadow-sm flex flex-col md:flex-row overflow-hidden hover:shadow-md hover:border-primary/40 transition-all duration-300 group"
                      >
                        <div className="relative w-full md:w-64 lg:w-72 h-52 md:h-auto bg-muted shrink-0 overflow-hidden">
                          <Image
                            src={type.image?.sourceUrl || "/images/0.jpg"}
                            alt={type.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-center">
                          <h4 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {type.title}
                          </h4>
                          <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed text-justify">
                            {type.description}
                          </p>
                          <div className="mt-auto flex items-center gap-2 text-xs md:text-sm font-bold text-primary bg-primary/5 w-fit px-3 py-1.5 rounded-lg border border-primary/10">
                            <ShieldCheck className="w-4 h-4" /> ضمان وتصميم
                            معتمد
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* الأسئلة الشائعة (تم حل مشكلة المحاذاة في الجوال) */}
            {service.serviceDetails?.faqs &&
              service.serviceDetails.faqs.length > 0 && (
                <section className="bg-card rounded-2xl md:rounded-[2rem] p-5 md:p-8 lg:p-10 border border-border/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                      <HelpCircle className="text-primary w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-xl md:text-3xl font-black text-foreground">
                      الأسئلة الشائعة
                    </h3>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {service.serviceDetails.faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group border border-border/60 bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-4 md:p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
                      >
                        {/* محاذاة دقيقة للسؤال والأيقونة */}
                        <summary className="flex items-start justify-between gap-4 font-bold text-foreground hover:text-primary transition-colors outline-none">
                          <span className="flex-1 text-sm md:text-base leading-[1.7] pt-0.5">
                            {faq.question}
                          </span>
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-border/50 flex items-center justify-center shrink-0 group-open:bg-primary/10 group-open:text-primary transition-colors mt-0.5">
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-open:rotate-180" />
                          </div>
                        </summary>
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-justify">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}
          </div>

          {/* القسم الأيسر: الشريط الجانبي 
            تم تعديل top-32 لكي لا يتداخل مع الهيدر العلوي للموقع
          */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6 md:gap-8 sticky top-24 lg:top-32 pb-10">
            {/* كرت التواصل */}
            <div className="bg-slate-900 rounded-[2rem] p-7 md:p-8 text-center shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-5 md:mb-6 relative z-10">
                <Phone className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>

              <h3 className="text-xl md:text-2xl font-black text-white mb-3 relative z-10 leading-tight">
                مهتم بتنفيذ {service.title}؟
              </h3>
              <p className="text-slate-400 mb-6 relative z-10 text-xs md:text-sm leading-relaxed">
                تواصل معنا الآن للحصول على استشارة هندسية مجانية، مقاييس دقيقة،
                وعرض سعر مخصص لمشروعك.
              </p>

              <div className="flex flex-col gap-3 relative z-10">
                <a
                  href="tel:530989975"
                  className="w-full bg-gradient-to-l from-primary-dark to-primary hover:from-primary hover:to-primary-light text-primary-foreground font-black py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 hover:-translate-y-1 text-sm md:text-base"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" /> اتصل بنا الآن
                </a>
                <a
                  href="https://wa.me/966530989975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 text-sm md:text-base"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  راسلنا واتساب
                </a>
              </div>

              {/* زر المشاركة */}
              <div className="relative mt-5 z-10">
                <button
                  ref={shareButtonRef}
                  onClick={handleShare}
                  onMouseEnter={() => setShowShareTooltip(true)}
                  onMouseLeave={() =>
                    setTimeout(() => setShowShareTooltip(false), 500)
                  }
                  className="flex items-center justify-center gap-2 text-slate-400 hover:text-white text-xs md:text-sm font-medium w-full transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> شارك هذه
                  الخدمة
                </button>

                {showShareTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-0 right-0 mb-2 p-2.5 bg-slate-800 rounded-xl shadow-xl border border-slate-700 z-30 text-right"
                  >
                    <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1.5 border border-slate-700">
                      <input
                        type="text"
                        readOnly
                        value={window.location.href}
                        className="flex-1 bg-transparent text-white text-xs p-1 outline-none truncate"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setCopySuccess(true);
                          setTimeout(() => setCopySuccess(false), 2000);
                        }}
                        className="p-1.5 bg-primary/20 hover:bg-primary/40 rounded-md transition-colors"
                      >
                        {copySuccess ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-white" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* خدمات ذات صلة */}
            {relatedServices.length > 0 && (
              <div className="bg-card rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-sm border border-border/60">
                <h3 className="text-base md:text-lg font-black text-foreground mb-4 border-b border-border/60 pb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 md:w-5 md:h-5 text-primary" />{" "}
                  خدمات ذات صلة
                </h3>
                <ul className="space-y-2">
                  {relatedServices.map((s, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between p-3 md:p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 border border-transparent hover:border-border/50 transition-all group"
                      >
                        <span className="flex items-center gap-3 font-bold text-xs md:text-sm text-foreground group-hover:text-primary transition-colors">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-background flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0 border border-border/50 group-hover:border-transparent">
                            <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground group-hover:text-primary" />
                          </div>
                          {s.title}
                        </span>
                        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
// "use client";

// import React, { useState, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// // إضافة useScroll و useTransform هنا
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   Phone,
//   MessageCircle,
//   MapPin,
//   ShieldCheck,
//   PenTool,
//   CheckCircle2,
//   ChevronDown,
//   ArrowLeft,
//   Layers,
//   HelpCircle,
//   Camera,
//   Share2,
//   Copy,
//   Check,
// } from "lucide-react";
// import { ServiceItem } from "@/lib/api";
// import WordPressContent from "@/lib/WordPressContent";

// interface Props {
//   service: ServiceItem;
//   relatedServices: ServiceItem[];
// }

// export default function ServiceDetailClient({
//   service,
//   relatedServices,
// }: Props) {
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [showShareTooltip, setShowShareTooltip] = useState(false);
//   const shareButtonRef = useRef<HTMLButtonElement>(null);

//   // === إضافة خطافات التمرير الناعم (Smooth Scroll Hooks) ===
//   const { scrollY } = useScroll();
//   const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]); // إخفاء النص عند النزول
//   const imageY = useTransform(scrollY, [0, 500], [0, 100]); // تحريك الصورة للأسفل ببطء (Parallax)

//   // دالة المشاركة المحسنة
//   const handleShare = async () => {
//     const currentUrl = window.location.href;
//     const shareText = `${service.title}\n${service.serviceDetails?.heroSubtitle || ""}\n\nرابط الخدمة: ${currentUrl}`;
//     const coverImageUrl =
//       service.featuredImage?.node.sourceUrl || "/icons/icon-512x512.png";

//     if (navigator.share && navigator.canShare) {
//       try {
//         const response = await fetch(coverImageUrl);
//         const blob = await response.blob();
//         const file = new File([blob], "/icons/icon-512x512.png", {
//           type: blob.type,
//         });
//         const shareData = {
//           title: service.title,
//           text: shareText,
//           url: currentUrl,
//           files: [file],
//         };
//         if (navigator.canShare(shareData)) {
//           await navigator.share(shareData);
//           return;
//         }
//       } catch (err) {
//         console.log("Web Share API failed", err);
//       }
//     }

//     try {
//       await navigator.clipboard.writeText(currentUrl);
//       setCopySuccess(true);
//       setShowShareTooltip(true);
//       setTimeout(() => {
//         setCopySuccess(false);
//         setShowShareTooltip(false);
//       }, 3000);
//     } catch (err) {
//       alert("تعذر نسخ الرابط. الرجاء نسخه يدوياً: " + currentUrl);
//     }
//   };

//   return (
//     <main
//       className="min-h-screen bg-slate-950 selection:bg-primary/30 relative font-sans"
//       dir="rtl"
//     >
//       {/* 1. قسم الهيرو (Sticky + Parallax) */}
//       <div className="sticky top-0 h-[65vh] md:h-[75vh] min-h-[450px] w-full flex flex-col justify-end overflow-hidden z-0 pb-20 md:pb-28">
//         {/* الصورة مع حركة Parallax الناعمة */}
//         <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
//           <Image
//             src={
//               service.featuredImage?.node.sourceUrl || "/images/placeholder.jpg"
//             }
//             alt={service.title}
//             fill
//             className="object-cover scale-105"
//             priority
//             unoptimized
//           />
//           {/* تدرج داكن لحماية النص */}
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent opacity-95 md:opacity-90" />
//         </motion.div>

//         {/* محتوى الهيرو (يختفي تدريجياً مع النزول) */}
//         <motion.div
//           style={{ opacity: heroOpacity }}
//           className="container relative z-10 px-4 md:px-8 w-full"
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="max-w-4xl"
//           >
//             {/* Breadcrumbs */}
//             <nav className="flex items-center flex-wrap gap-2 text-slate-300 text-xs md:text-sm font-medium mb-4 bg-white/5 backdrop-blur-md w-fit px-3 py-1.5 md:px-4 rounded-full border border-white/10 shadow-lg">
//               <Link href="/" className="hover:text-primary transition-colors">
//                 الرئيسية
//               </Link>
//               <span className="text-white/30">/</span>
//               <Link
//                 href="/services"
//                 className="hover:text-primary transition-colors"
//               >
//                 الخدمات
//               </Link>
//               <span className="text-white/30">/</span>
//               <span className="text-primary font-bold truncate max-w-[150px] md:max-w-none">
//                 {service.title}
//               </span>
//             </nav>

//             <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
//               {service.title}
//             </h1>
//             <p className="text-sm md:text-lg lg:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
//               {service.serviceDetails?.heroSubtitle}
//             </p>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* 2. الستارة المتحركة (المحتوى الرئيسي) يصعد فوق الهيرو */}
//       <div className="relative z-40 bg-background rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-16 pt-16 md:pt-24 pb-24 shadow-[0_-30px_60px_rgba(0,0,0,0.6)] border-t border-border/50">

//         {/* مؤشر السحب (لمسة بصرية جمالية) */}
//         <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-16 md:w-24 h-1.5 bg-border rounded-full" />

//         <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8 md:gap-12 items-start">

//           {/* القسم الأيمن: المحتوى الرئيسي */}
//           <div className="w-full lg:w-2/3 flex flex-col gap-10 md:gap-14">

//             {/* تفاصيل الخدمة والمميزات */}
//             <section className="bg-card rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-sm border border-border">
//               <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-border pb-4 md:pb-6">
//                 <div className="p-2 bg-primary/10 rounded-xl">
//                   <PenTool className="text-primary w-6 h-6" />
//                 </div>
//                 <h2 className="text-2xl md:text-3xl font-black text-foreground">
//                   عن الخدمة
//                 </h2>
//               </div>

//               {/* محتوى ووردبريس المدعوم بالوضع الليلي */}
//               <WordPressContent
//                 content={service.content}
//                 className="w-full prose prose-sm md:prose-lg max-w-none text-right
//                 text-slate-700 dark:text-slate-300
//                 prose-strong:font-medium prose-strong:text-slate-900 dark:prose-strong:text-slate-100
//                 prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white
//                 prose-h2:border-r-4 prose-h2:border-amber-500 prose-h2:pr-4 prose-h2:mt-12
//                 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-justify"
//               />

//               {/* كروت المميزات */}
//               {service.serviceDetails?.features && service.serviceDetails.features.length > 0 && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12 pt-8 border-t border-border">
//                   {service.serviceDetails.features.map((feature, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-background p-5 md:p-6 rounded-xl md:rounded-2xl border border-border/50 flex flex-col items-center text-center gap-4 hover:border-primary/50 transition-colors group shadow-sm"
//                     >
//                       <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
//                         {idx === 0 ? <ShieldCheck className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-lg text-foreground mb-2">
//                           {feature.title}
//                         </h3>
//                         <p className="text-sm text-muted-foreground leading-relaxed">
//                           {feature.description}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* الأنواع والخيارات */}
//             {service.serviceDetails?.types && service.serviceDetails.types.length > 0 && (
//               <section className="space-y-6">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-primary/10 rounded-xl">
//                     <Layers className="text-primary w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-black text-foreground">
//                     الأنواع والخيارات
//                   </h3>
//                 </div>

//                 <div className="grid gap-6">
//                   {service.serviceDetails.types.map((type, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-card rounded-2xl md:rounded-[2rem] border border-border shadow-sm flex flex-col md:flex-row overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
//                     >
//                       <div className="relative w-full md:w-72 h-56 md:h-auto bg-muted shrink-0 overflow-hidden">
//                         <Image
//                           src={type.image?.sourceUrl || "/images/placeholder.jpg"}
//                           alt={type.title}
//                           fill
//                           className="object-cover transition-transform duration-700 group-hover:scale-105"
//                           unoptimized
//                         />
//                       </div>
//                       <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
//                         <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
//                           {type.title}
//                         </h4>
//                         <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
//                           {type.description}
//                         </p>
//                         <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary bg-primary/5 w-fit px-4 py-2 rounded-lg border border-primary/10">
//                           <ShieldCheck className="w-4 h-4" /> ضمان وتصميم معتمد
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* الأسئلة الشائعة */}
//             {service.serviceDetails?.faqs && service.serviceDetails.faqs.length > 0 && (
//               <section className="bg-card rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-border shadow-sm">
//                 <div className="flex items-center gap-3 mb-8">
//                   <div className="p-2 bg-primary/10 rounded-xl">
//                     <HelpCircle className="text-primary w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-black text-foreground">
//                     الأسئلة الشائعة
//                   </h3>
//                 </div>

//                 <div className="space-y-4">
//                   {service.serviceDetails.faqs.map((faq, idx) => (
//                     <details
//                       key={idx}
//                       className="group border border-border bg-background rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
//                     >
//                       <summary className="flex items-center justify-between font-bold text-foreground hover:text-primary transition-colors">
//                         <span className="pr-2">{faq.question}</span>
//                         <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 group-open:bg-primary/10 group-open:text-primary transition-colors">
//                           <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
//                         </div>
//                       </summary>
//                       <div className="mt-4 pt-4 border-t border-border pr-2">
//                         <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
//                           {faq.answer}
//                         </p>
//                       </div>
//                     </details>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* القسم الأيسر: الشريط الجانبي - متجاوب ويظل ملتصقاً */}
//           <aside className="w-full lg:w-1/3 flex flex-col gap-6 md:gap-8 sticky top-28">

//             {/* كرت التواصل الفخم */}
//             <div className="bg-slate-900 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden border border-slate-800">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
//               <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

//               <div className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                 <Phone className="w-8 h-8 text-primary" />
//               </div>

//               <h3 className="text-2xl font-black text-white mb-4 relative z-10 leading-tight">
//                 مهتم بتنفيذ {service.title}؟
//               </h3>
//               <p className="text-slate-400 mb-8 relative z-10 text-sm leading-relaxed">
//                 تواصل معنا الآن للحصول على استشارة هندسية مجانية، مقاييس دقيقة،
//                 وعرض سعر مخصص لمشروعك.
//               </p>

//               <div className="flex flex-col gap-3 relative z-10">
//                 <a
//                   href="tel:530989975"
//                   className="w-full bg-gradient-to-l from-primary-dark to-primary hover:from-primary hover:to-primary-light text-primary-foreground font-black py-4 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 hover:-translate-y-1"
//                 >
//                   <Phone className="w-5 h-5" /> اتصل بنا الآن
//                 </a>
//                 <a
//                   href="https://wa.me/966530989975"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-5 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
//                 >
//                   <MessageCircle className="w-5 h-5 text-emerald-400" />
//                   راسلنا واتساب
//                 </a>
//               </div>

//               {/* زر المشاركة المحسن */}
//               <div className="relative mt-6">
//                 <button
//                   ref={shareButtonRef}
//                   onClick={handleShare}
//                   onMouseEnter={() => setShowShareTooltip(true)}
//                   onMouseLeave={() => setTimeout(() => setShowShareTooltip(false), 500)}
//                   className="flex items-center justify-center gap-2 text-slate-400 hover:text-white text-sm font-medium w-full transition-colors"
//                 >
//                   <Share2 className="w-4 h-4" /> شارك هذه الخدمة
//                 </button>

//                 {showShareTooltip && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-slate-800 rounded-xl shadow-xl border border-slate-700 z-30 text-right"
//                   >
//                     <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-2 border border-slate-700">
//                       <input
//                         type="text"
//                         readOnly
//                         value={window.location.href}
//                         className="flex-1 bg-transparent text-white text-xs p-1 outline-none truncate"
//                       />
//                       <button
//                         onClick={() => {
//                           navigator.clipboard.writeText(window.location.href);
//                           setCopySuccess(true);
//                           setTimeout(() => setCopySuccess(false), 2000);
//                         }}
//                         className="p-1.5 bg-primary/20 hover:bg-primary/40 rounded-md transition-colors"
//                       >
//                         {copySuccess ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-white" />}
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </div>

//             {/* خدمات ذات صلة */}
//             {relatedServices.length > 0 && (
//               <div className="bg-card rounded-2xl md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-border">
//                 <h3 className="text-lg md:text-xl font-black text-foreground mb-5 border-b border-border pb-4 flex items-center gap-2">
//                   <Layers className="w-5 h-5 text-primary" /> خدمات ذات صلة
//                 </h3>
//                 <ul className="space-y-3">
//                   {relatedServices.map((s, idx) => (
//                     <li key={idx}>
//                       <Link
//                         href={`/services/${s.slug}`}
//                         className="flex items-center justify-between p-4 rounded-xl hover:bg-accent border border-transparent hover:border-border transition-all group"
//                       >
//                         <span className="flex items-center gap-3 font-bold text-sm text-foreground group-hover:text-primary transition-colors">
//                           <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
//                             <ShieldCheck className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
//                           </div>
//                           {s.title}
//                         </span>
//                         <ArrowLeft className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// }

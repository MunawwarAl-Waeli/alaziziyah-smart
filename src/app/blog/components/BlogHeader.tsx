"use client";

import { motion } from "framer-motion";
import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/config";
import {
  Umbrella,
  ArrowLeft,
  MessageCircle,
  BookOpen,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BlogHero() {
  return (
    <section
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white overflow-hidden min-h-[70vh] lg:min-h-[80vh] flex items-center"
      dir="rtl"
      aria-label="مقدمة مدونة المظلات والسواتر"
    >
      {/* ===== خلفية مبسطة وخفيفة على الأداء (تم استخدام CSS للأنيميشن بدلاً من JS) ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* استخدمنا animate-pulse الخاص بـ Tailwind لأنه أخف بـ 10 مرات على معالج الجوال من Framer Motion للخلفيات */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      {/* تقليل الـ Padding في الجوال وزيادته في الكمبيوتر */}
      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* ===== الجانب الأيمن: النصوص والإحصائيات ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} // تقليل مسافة الحركة لتكون أسرع
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }} // إضافة easeOut لنعومة الحركة
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-white/10 border border-white/10 mb-4 lg:mb-6 backdrop-blur-md">
              <Umbrella className="w-3 h-3 lg:w-4 lg:h-4 text-amber-400" />
              <span className="text-amber-100 text-xs lg:text-sm font-medium">
                مدونة مؤسسة العزيزية للمظلات والسواتر
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
              دليلك الشامل لتركيب <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                المظلات والسواتر والبرجولات
              </span>
            </h1>

            <p className="text-base lg:text-lg text-slate-300 mb-6 lg:mb-8 leading-relaxed max-w-xl">
              اكتشف أحدث تصاميم مظلات السيارات والحدائق، وتعرف على أفضل أنواع
              السواتر للحماية والخصوصية. نصائح حصرية من خبراء التظليل لاختيار
              الأنسب لمنزلك.
            </p>

         

            {/* أزرار الإجراءات */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Link
                href="#articles"
                aria-label="استكشف مقالات المظلات والسواتر"
                className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl lg:rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
              >
                <BookOpen className="w-5 h-5" />
                استكشف المقالات
                <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href={SOCIAL_LINKS.consultationWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل مع مؤسسة العزيزية عبر الواتساب"
                className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-white/10 text-white rounded-xl lg:rounded-2xl font-bold hover:bg-white/20 backdrop-blur-md transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                تواصل معنا
              </Link>
            </div>
          </motion.div>

          {/* ===== الجانب الأيسر: الصورة الرئيسية والبطاقة العائمة ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl">
                <Image
                  src="/images/2.jpg"
                  alt="تنفيذ وتركيب أحدث تصاميم المظلات والسواتر للسيارات والحدائق من مؤسسة العزيزية"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px" // 🚀 هذا السطر يسرع تحميل الصورة بشكل هائل
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              </div>

              {/* استخدام CSS للأنيميشن لتخفيف الحمل على المتصفح */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 dark:border-slate-700 animate-[bounce_3s_ease-in-out_infinite]">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold">
                    محتوى موثوق
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    من خبراء التنفيذ
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== الموجة السفلية ===== */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          {/* 🚀 تم تغيير اللون ليتجاوب مع الوضع الفاتح والداكن للموقع تلقائياً */}
          <path
            className="fill-slate-50 dark:fill-slate-950"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}

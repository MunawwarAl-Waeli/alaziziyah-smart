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
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white overflow-hidden min-h-[80vh] flex items-center"
      dir="rtl"
      aria-label="مقدمة مدونة المظلات والسواتر"
    >
      {/* ===== خلفية مبسطة وخفيفة على الأداء ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ===== الجانب الأيمن: النصوص والإحصائيات ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* شارة علوية - تمت إضافة الكلمة المفتاحية للعلامة التجارية */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6 backdrop-blur-md">
              <Umbrella className="w-4 h-4 text-amber-400" />
              <span className="text-amber-100 text-sm font-medium">
                مدونة مؤسسة العزيزية للمظلات والسواتر
              </span>
            </div>

            {/* العنوان الرئيسي H1 - تم تطعيمه بكلمات بحثية قوية */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              دليلك الشامل لتركيب <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                المظلات والسواتر والبرجولات
              </span>
            </h1>

            {/* وصف احترافي يحتوي على كلمات مفتاحية طبيعية طويلة الذيل (Long-tail Keywords) */}
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              اكتشف أحدث تصاميم مظلات السيارات والحدائق، وتعرف على أفضل أنواع
              السواتر للحماية والخصوصية. نصائح حصرية من خبراء التظليل لاختيار
              الأنسب لمنزلك.
            </p>

            {/* إحصائيات سريعة */}
            <div className="flex flex-wrap gap-8 mb-10 border-y border-white/10 py-6">
              <div>
                <p className="text-3xl font-bold text-amber-400 mb-1">15+</p>
                <p className="text-sm text-slate-400">سنوات خبرة</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400 mb-1">500+</p>
                <p className="text-sm text-slate-400">مشروع منفذ</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400 mb-1">20+</p>
                <p className="text-sm text-slate-400">مقال حصري</p>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#articles"
                aria-label="استكشف مقالات المظلات والسواتر"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 backdrop-blur-md transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                تواصل معنا
              </Link>
            </div>
          </motion.div>

          {/* ===== الجانب الأيسر: الصورة الرئيسية والبطاقة العائمة ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* الصورة الرئيسية */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl">
                <Image
                  src="/images/2.jpg"
                  // تم تحسين النص البديل ليكون وصفياً لمحركات البحث بدلاً من كلمة عامة
                  alt="تنفيذ وتركيب أحدث تصاميم المظلات والسواتر للسيارات والحدائق من مؤسسة العزيزية"
                  fill
                  priority // إضافة priority مهمة لصور الـ Hero section لتحسين LCP
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              </div>

              {/* بطاقة عائمة للموثوقية */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold">
                    محتوى موثوق
                  </p>
                  <p className="text-slate-500 text-sm">من خبراء التنفيذ</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== الموجة السفلية (للدمج مع القسم التالي) ===== */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#f8fafc"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}

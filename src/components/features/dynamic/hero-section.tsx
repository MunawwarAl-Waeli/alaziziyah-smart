"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 1. الخلفية المحسنة */}
      <div className="absolute inset-0 z-0">
        <img
          src="../../../../public/7.jpg"
          alt="مظلات وسواتر جدة"
          className="w-full h-full object-cover scale-105 animate-slow-zoom" // حركة زووم بطيئة جداً
        />
        {/* تدرج لوني مزدوج (غامق من فوق عشان الهيدر، وغامق من تحت عشان النص) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-brand-secondary" />
      </div>

      {/* 2. المحتوى */}
      <div className="relative z-10 container mx-auto px-4 text-center mt-10">
        {/* شارة صغيرة فوق العنوان */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 text-sm font-medium"
        >
          ✨ الخيار الأول في المنطقة الغربية
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight"
        >
          مظلات{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            ذكية
          </span>{" "}
          <br />
          تحميك وتجمل مكانك
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light"
        >
          نحول المساحات الخارجية إلى واحات باردة باستخدام أجود خامات الـ PVC
          والحديد المعالج.
        </motion.p>

        {/* الأزرار الجديدة (Modern Pill Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* الزر الرئيسي: تدرج لوني + ظل ملون */}
          <Button
            size="lg"
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-bold text-lg h-14 px-10 shadow-lg shadow-orange-500/30 transition-all hover:scale-105 border-0"
          >
            <Calculator className="ml-2 w-5 h-5" />
            احسب تكلفة مشروعك
          </Button>

          {/* الزر الثانوي: تأثير الزجاج (Glass Effect) */}
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-brand-primary font-bold text-lg h-14 px-10 transition-all"
          >
            شاهد الكتالوج
            <ArrowLeft className="mr-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* مؤشر للنزول للأسفل (اختياري لجمالية التصميم) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, LayoutGrid, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden"
      dir="rtl"
    >
      {/* عناصر زخرفية في الخلفية */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* رقم الخطأ بتصميم فخم */}
          <div className="relative inline-block">
            <h1 className="text-[120px] md:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/20 to-transparent">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-4xl font-black text-foreground">
                عذراً!
              </span>
            </div>
          </div>

          {/* نصوص توضيحية */}
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              هذه الصفحة طارت مع الهواء..
            </h2>
            <p className="text-muted-foreground">
              يبدو أن الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله. لا
              تقلق، يمكنك العودة والبحث عما تحتاجه بسهولة.
            </p>
          </div>

          {/* أزرار المساعدة لضمان بقاء العميل */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all"
            >
              <Home className="w-5 h-5" />
              العودة للرئيسية
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary/10 text-foreground border border-border px-8 py-4 rounded-2xl font-bold hover:bg-secondary/20 transition-all"
            >
              <LayoutGrid className="w-5 h-5 text-primary" />
              تصفح كافة الخدمات
            </Link>
          </div>

          {/* التواصل السريع */}
          <div className="pt-12 border-t border-border mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              هل واجهت مشكلة تقنية؟
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-bold group"
            >
              <span>تواصل مع الدعم الفني</span>
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

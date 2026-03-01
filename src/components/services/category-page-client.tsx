"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceGrid } from "./services-grid"; // تأكد من المسار الصحيح
import { CategoryItem, ServiceItem } from "@/lib/api";
import { ChevronRight, Package, Info } from "lucide-react";

interface Props {
  category: CategoryItem;
  services: ServiceItem[];
}

export default function CategoryPageClient({ category, services }: Props) {
  // بما أن البيانات تأتي من السيرفر، نجعل التحميل false مباشرة بعد أول رندر
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(false);
  }, []);

  // حساب الإحصائيات بناءً على البيانات المتوفرة من ووردبريس
  const stats = {
    serviceCount: services.length,
    // بما أننا لا نملك عدد مشاريع لكل خدمة في ووردبريس حالياً، سنعرض إحصائية عامة أو نلغيها
    isAvailable: services.length > 0,
  };

  return (
    <main
      className="min-h-screen py-24 bg-background relative overflow-hidden"
      dir="rtl"
    >
      {/* خلفية جمالية */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--secondary)_0%,_transparent_20%)] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* رابط العودة - تم تعديل الأيقونة والاتجاه للغة العربية */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 group text-sm font-bold"
        >
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>العودة لكافة الأقسام</span>
        </Link>

        {/* ترويسة الفئة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 bg-card border-2 border-primary/20 rounded-3xl flex items-center justify-center shadow-inner">
                <Package className="w-10 h-10 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                قسم متخصص
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">
                {category.name}
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                اكتشف تشكيلتنا الواسعة من خدمات{" "}
                <span className="text-foreground font-bold">
                  {category.name}
                </span>{" "}
                المنفذة بأجود الخامات العالمية.
              </p>
            </div>
          </div>

          {/* بطاقات إحصائية سريعة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-2xl">
              <div className="text-3xl font-black text-primary mb-1">
                {stats.serviceCount}
              </div>
              <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                خدمة متوفرة
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-2xl">
              <div className="text-3xl font-black text-primary mb-1">100%</div>
              <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                ضمان الجودة
              </div>
            </div>
          </div>
        </motion.div>

        {/* شبكة الخدمات - تم تفعيلها وربطها بالنوع الجديد */}
        <ServiceGrid services={services} loading={loading} columns={4} />

        {/* رسالة في حال عدم وجود خدمات في هذا القسم */}
        {!loading && services.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Info className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              قريباً في هذا القسم
            </h3>
            <p className="text-muted-foreground max-w-sm">
              نحن نعمل حالياً على إضافة مشاريعنا الجديدة في قسم {category.name}.
              تابعنا قريباً!
            </p>
            <Link
              href="/services"
              className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              تصفح أقسام أخرى
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}

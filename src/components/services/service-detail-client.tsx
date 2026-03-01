"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Share2,
  Maximize2,
  ChevronLeft,
} from "lucide-react";
import { ServiceItem } from "@/lib/api";
import { ServiceCard } from "./services-card";
import { cn } from "@/lib/utils";

interface Props {
  service: ServiceItem;
  relatedServices: ServiceItem[];
}

export default function ServiceDetailClient({
  service,
  relatedServices,
}: Props) {
  // افترضنا أن البيانات قد تحتوي على معرض صور، إذا لم توجد نستخدم الصورة الرئيسية مكررة كمثال
  const gallery = [
    service.image,
    service.image,
    service.image,
    service.image,
    service.image,
    service.image,
    service.image,
    service.image,
    service.image,
    service.image,
  ].slice(0, 9);
  const [activeImage, setActiveImage] = useState(0);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: service.title, url: window.location.href });
    }
  };

  return (
    <main
      className="min-h-screen pb-24 px-6 bg-background text-right"
      dir="rtl"
    >
      {/* 1. Breadcrumbs - مسار التنقل هادئ */}
      <nav className="container pt-28 pb-8">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3 h-3 rotate-180" />
          <Link
            href="/services"
            className="hover:text-primary transition-colors"
          >
            الخدمات
          </Link>
          <ChevronLeft className="w-3 h-3 rotate-180" />
          <span className="text-foreground truncate">{service.title}</span>
        </div>
      </nav>

      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* العمود الأيمن: معرض الصور والمحتوى */}
          <div className="lg:col-span-8 space-y-10">
            {/* معرض الصور الحديث */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-muted border border-border/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={gallery[activeImage]}
                      alt={service.title}
                      fill
                      unoptimized
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/10">
                  {activeImage + 1} / {gallery.length}
                </div>
              </div>

              {/* الصور المصغرة */}
              {/* شريط الصور المصغرة (Scroll Strip) */}
              <div
                className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 px-1 select-none"
                // هذا السطر لإخفاء شريط التمرير وجعل الشكل أنظف
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      // shrink-0: هي الأهم، تمنع الصورة من الصغر وتجبر الشريط على التمرير
                      "relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 border-2",
                      // أحجام ثابتة لضمان التناسق
                      "w-24 h-16 md:w-28 md:h-20",
                      activeImage === idx
                        ? "border-primary ring-2 ring-primary/20 scale-105 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100 hover:scale-105",
                    )}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* العنوان والمحتوى */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-primary font-bold text-sm tracking-widest uppercase">
                  {service.categoryName}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-foreground">
                  {service.title}
                </h1>
              </div>

              <div
                className="prose prose-lg dark:prose-invert max-w-none 
    text-foreground/80 leading-loose
    /* تنسيق العناوين */
    prose-headings:font-black prose-headings:text-foreground prose-headings:mb-4
    /* تنسيق الفقرات */
    prose-p:text-base md:prose-p:text-lg prose-p:leading-8 prose-p:mb-6
    /* 🔥 تنسيق الروابط (الحل لمشكلتك) */
    prose-a:text-primary prose-a:font-bold prose-a:no-underline 
    hover:prose-a:underline hover:prose-a:text-primary/80 transition-colors
    /* تنسيق القوائم */
    prose-li:text-foreground/80 prose-li:marker:text-primary
    /* تنسيق الصور داخل الوصف */
    prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-border"
                dangerouslySetInnerHTML={{ __html: service.fullContent }}
              />
            </div>

            {/* المميزات - تصميم متزن وغير متهور */}
            <div className="pt-10 border-t border-border/50">
              <h3 className="text-xl font-black mb-6">
                لماذا تختار هذه الخدمة؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  "تنفيذ دقيق تحت إشراف هندسي",
                  "خامات مختارة بعناية لمقاومة المناخ",
                  "حلول مخصصة تناسب مساحة منزلك",
                  "تركيز عالي على التفاصيل واللمسات النهائية",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0 md:border-b"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* العمود الأيسر: الأكشن (Sidebar) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* بطاقة التواصل المباشر - تركيز على الواتساب والاتصال فقط */}
              <div className="bg-card border border-border/60 rounded-[2.5rem] p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b border-border/50">
                    <p className="text-muted-foreground text-sm mb-2">
                      مهتم بهذا المشروع؟
                    </p>
                    <h3 className="text-xl font-black">
                      احصل على استشارة فنية
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <a
                      href="https://wa.me/966500000000" // ضع رقمك هنا
                      className="w-full bg-[#25D366] text-white font-black h-14 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-green-500/10"
                    >
                      <MessageSquare className="w-5 h-5" />
                      طلب السعر عبر الواتساب
                    </a>

                    <a
                      href="tel:0500000000" // ضع رقمك هنا
                      className="w-full bg-primary text-white font-black h-14 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/10"
                    >
                      <PhoneCall className="w-5 h-5" />
                      اتصال هاتفي مباشر
                    </a>
                  </div>

                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm font-bold pt-2 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    مشاركة رابط المشروع
                  </button>
                </div>
              </div>

              {/* بطاقة الثقة البسيطة */}
              <div className="p-8 bg-muted/30 rounded-[2.5rem] border border-border/40">
                <p className="text-xs leading-relaxed text-muted-foreground text-center italic">
                  نحن في العزيزية نلتزم بتحويل رؤيتكم إلى واقع ملموس، بجودة
                  تتحدث عن نفسها في كل مشروع.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. مشاريع مشابهة - عرض شبكي منتظم */}
      {relatedServices.length > 0 && (
        <section className="container mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black">
              مشاريع <span className="text-primary">مشابهة</span>
            </h2>
            <div className="h-px flex-grow mx-8 bg-border hidden md:block" />
            <Link
              href="/services"
              className="text-sm font-bold text-primary hover:underline"
            >
              مشاهدة الكل
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((item, idx) => (
              <ServiceCard key={item.id} service={item} index={idx} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

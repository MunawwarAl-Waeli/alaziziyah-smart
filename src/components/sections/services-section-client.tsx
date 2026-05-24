/* eslint-disable react-hooks/static-components */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Sparkles, LayoutGrid, ArrowUpRight } from "lucide-react";
import { ServiceItem } from "@/lib/api";
import { ServiceCard } from "../services/services-card";
import { SoftWavesDivider } from "../ui/SoftWavesDivider";

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
        className="relative py-24 md:py-32 bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950 overflow-hidden"
      >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xI:grid-cols-3 gap-6 md:gap-8">
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
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, LayoutGrid, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ServiceSize = "small" | "medium" | "large" | "wide";

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  description: string;
  href: string;
  image: string;
}

interface ServicesGridClientProps {
  services: ServiceItem[];
}

export function ServicesGridClient({ services }: ServicesGridClientProps) {
  // نعرض أول 8 مشاريع فقط في الصفحة الرئيسية
  const [visibleCount] = useState(16);
  const displayServices = services.slice(0, visibleCount);

  return (
    <section
      className="py-16 md:py-24 bg-background relative overflow-hidden text-right"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        {/* العنوان فقط (بدون تصنيفات) */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase">
              معرض المشاريع المختارة
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-black text-foreground">
            لمساتنا <span className="text-primary">الإبداعية</span>
          </h2>
        </div>

        {/* شبكة الأعمال */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[160px] md:auto-rows-[280px]"
        >
          <AnimatePresence mode="popLayout">
            {displayServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* زر عرض المزيد (ينقلك لصفحة الأرشيف الكامل) */}
        {services.length > visibleCount && (
          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all group"
            >
              <LayoutGrid className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>عرض كافة المشاريع والخدمات</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const pattern: ServiceSize[] = [
    "large",
    "medium",
    "medium",
    "wide",
    "small",
    "small",
    "wide",
    "medium",
  ];
  const size = pattern[index % pattern.length];

  const gridClasses: Record<ServiceSize, string> = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-1 md:row-span-2",
    large: "col-span-2 row-span-2",
    wide: "col-span-2 row-span-1",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-border/50 bg-card shadow-sm hover:shadow-2xl transition-all duration-700",
        gridClasses[size],
      )}
    >
      <Link href={service.href} className="block w-full h-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* تظليل متكيف: داكن أكثر على الجوال ليبرز النص دائماً */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 md:opacity-70 md:group-hover:opacity-90 transition-opacity" />
        </div>

        <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end items-start text-right z-10">
          <span className="px-2 py-0.5 mb-2 text-[8px] md:text-[10px] font-bold bg-primary text-white rounded-full">
            {service.categoryName}
          </span>

          <h3
            className={cn(
              "font-black text-white mb-2 leading-tight transition-colors group-hover:text-primary",
              size === "large" ? "text-lg md:text-3xl" : "text-sm md:text-xl",
            )}
          >
            {service.title}
          </h3>

          {/* 🔥 حل الجوال: يظهر دائماً على الجوال (block) ويختفي على الكمبيوتر ليظهر بالهوفير (md:opacity-0) */}
          <p
            className={cn(
              "text-gray-300 text-[10px] md:text-sm max-w-md line-clamp-2 transition-all duration-500 transform",
              "block opacity-100 translate-y-0", // الوضع الافتراضي (جوال)
              "md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0", // وضع الحاسوب
              size === "small" && "hidden md:hidden", // المربعات الصغيرة جداً نخفي نصها لجمالية الشكل
            )}
          >
            {service.description}
          </p>

          <div className="absolute top-3 left-3 md:top-6 md:left-6 w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
            <ArrowUpLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

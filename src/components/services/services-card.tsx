"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Umbrella,
  Fence,
  TreePine,
  Warehouse,
  Home,
  Tent,
  Palmtree,
} from "lucide-react";
import { ServiceItem } from "@/lib/api";

// دالة ذكية لاختيار الأيقونة بناءً على الـ slug لضمان شكل احترافي
const getServiceIcon = (slug: string) => {
  if (slug.includes("cars") || slug.includes("سيار")) return Umbrella;
  if (slug.includes("sawater") || slug.includes("ساتر")) return Fence;
  if (slug.includes("pergolas") || slug.includes("برجول")) return TreePine;
  if (
    slug.includes("projects") ||
    slug.includes("مشروع") ||
    slug.includes("هناجر")
  )
    return Warehouse;
  if (slug.includes("pools") || slug.includes("مسبح")) return Palmtree;
  if (slug.includes("tents") || slug.includes("خيم")) return Tent;
  return Home;
};

interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = getServiceIcon(service.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group h-full"
    >
      <Link href={service.href} className="block h-full">
        <div className="relative h-full bg-card rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-border/50 flex flex-col">
          {/* 1. قسم الصورة (بنسبة عرض 4:3 احترافية) */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <Image
              src={service.image}
              alt={service.title}
              fill
              unoptimized={true}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* تظليل سينمائي */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* تصنيف الخدمة فوق الصورة */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-md text-primary text-[10px] font-bold shadow-xl border border-white/20">
                {service.categoryName}
              </span>
            </div>
          </div>

          {/* 2. المحتوى */}
          <div className="flex flex-col flex-grow p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-1">
                {service.title}
              </h3>
              <div className="shrink-0 p-2.5 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {/* <Icon className="w-5 h-5" strokeWidth={2} /> */}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6">
              {service.description}
            </p>

            {/* 3. التذييل (Footer) */}
            <div className="mt-auto pt-5 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <div className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider">
                  شاهد التفاصيل
                </span>
              </div>

              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

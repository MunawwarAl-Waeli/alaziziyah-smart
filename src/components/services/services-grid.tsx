"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "./services-card";
import { ServiceItem } from "@/lib/api"; // استيراد النوع الجديد
import { cn } from "@/lib/utils";

interface ServiceGridProps {
  services: ServiceItem[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
}

export function ServiceGrid({
  services,
  loading,
  columns = 4,
}: ServiceGridProps) {
  const gridClasses = cn(
    "grid gap-6 md:gap-8",
    "grid-cols-1 sm:grid-cols-2",
    columns >= 3 && "lg:grid-cols-3",
    columns === 4 && "xl:grid-cols-4",
  );

  // حالة التحميل - Skeleton متطابق مع التصميم الجديد
  if (loading) {
    return (
      <div className={gridClasses}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-border bg-card overflow-hidden"
          >
            <div className="aspect-[4/3] bg-muted animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 w-1/2 bg-muted animate-pulse rounded-lg" />
                <div className="h-10 w-10 bg-muted animate-pulse rounded-xl" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/60 animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-muted/60 animate-pulse rounded" />
              </div>
              <div className="pt-4 border-t border-border/50 flex justify-between">
                <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                <div className="h-3 w-12 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/50 rounded-[2rem] bg-card/30">
        <p className="text-xl font-bold text-foreground mb-2">
          لا توجد نتائج حالياً
        </p>
        <p className="text-muted-foreground">جرب اختيار تصنيف آخر</p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getServicesByCategory, getCategoryStats } from "@/data";
import type { Category, Service } from "@/data/types";
import { iconMap } from "@/data/constants/icons";

interface CategoryShowcaseProps {
  category: Category;
  limit?: number;
}

export function CategoryShowcase({
  category,
  limit = 3,
}: CategoryShowcaseProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const services = getServicesByCategory(category.id).slice(0, limit);
  const stats = getCategoryStats(category.id);
  const CategoryIcon = iconMap[category.icon] || iconMap.umbrella;

  if (services.length === 0) return null;

  return (
    <section className="py-12 border-b border-primary/10 last:border-0">
      <div className="container mx-auto px-4">
        {/* رأس الفئة */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg" />
              <div className="relative w-12 h-12 border border-primary/30 flex items-center justify-center">
                <CategoryIcon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-light text-foreground">
                {category.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {stats.serviceCount} خدمة | {stats.totalProjects}+ مشروع
              </p>
            </div>
          </div>

          <Link
            href={`/services?category=${category.id}`}
            className="flex items-center gap-1 text-primary hover:gap-2 transition-all"
          >
            <span className="text-sm">عرض الكل</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* وصف الفئة */}
        <p className="text-muted-foreground mb-8 max-w-3xl">
          {category.description}
        </p>

        {/* صورة الفئة (للفئات المهمة) */}
        {category.image && (
          <div className="relative w-full h-48 md:h-64 mb-8 overflow-hidden rounded-none border border-primary/20">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-card to-transparent" />
          </div>
        )}

        {/* شبكة الخدمات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onClick={() => setSelectedService(service)}
            />
          ))} */}
        </div>
      </div>
    </section>
  );
}

/* eslint-disable react-hooks/static-components */
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Umbrella,
  Fence,
  TreePine,
  Warehouse,
  Tent,
  Palmtree,
  Settings,
  LucideIcon,
  Shield,
  School,
  Award,
  Star,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
export interface ServiceCategory {
  name: string;
  slug: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  } | null;
  serviceCategories?: {
    nodes: ServiceCategory[];
  } | null;
}
const ICON_MAP: Record<string, LucideIcon> = {
  cars: Umbrella,
  shades: Umbrella,
  sawater: Fence,
  pergolas: TreePine,
  fences: Fence,
  schools: School,
  pools: Palmtree,
  tents: Tent,
  warehouses: Warehouse,
  default: Settings,
};
const getIconKey = (categorySlug: string = ""): LucideIcon => {
  const slug = categorySlug?.toLowerCase() || "";
  if (slug.includes("car") || slug.includes("مظلات")) return ICON_MAP.cars;
  if (slug.includes("sawater") || slug.includes("ساتر"))
    return ICON_MAP.sawater;
  if (slug.includes("pergola") || slug.includes("برجول"))
    return ICON_MAP.pergolas;
  if (slug.includes("school") || slug.includes("مدارس"))
    return ICON_MAP.schools;
  if (slug.includes("pool") || slug.includes("مسبح")) return ICON_MAP.pools;
  if (slug.includes("warehouse") || slug.includes("هناجر"))
    return ICON_MAP.warehouses;
  return ICON_MAP.default;
};
// ==========================================
export function ServiceCard({ service }: { service: ServiceItem }) {
  // استخراج البيانات الحقيقية من كائن الخدمة
  const imageUrl =
    service.featuredImage?.node?.sourceUrl || "/images/0.jpg";
  const category = service.serviceCategories?.nodes?.[0];
  const Icon = getIconKey(category?.slug);

  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="relative h-full bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-amber-500/30 shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col"
      >
        {/* الحاوية العلوية للصورة */}
        <div className="relative h-48 overflow-hidden w-full">
          <Image
            src={imageUrl}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* الأيقونة العائمة */}
        <div className="absolute top-[10.5rem] right-4 w-12 h-12 rounded-xl bg-card border border-amber-500/30 shadow-lg flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300 z-10">
          <Icon className="w-6 h-6 text-amber-500 group-hover:text-white transition-colors" />
        </div>

        {/* المحتوى السفلي */}
        <div className="p-5 pt-8 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-foreground group-hover:text-amber-600 transition-colors mb-2">
            {service.title}
          </h3>

          {/* استخدام اسم التصنيف بدلاً من excerpt لأن الاستعلام لا يجلبه */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            تصميم وتنفيذ {category?.name || "مظلات وسواتر"} بأعلى معايير الجودة
            والإتقان.
          </p>

          <div className="flex items-center justify-between mt-auto">
            {category && (
              <span className="text-xs bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full font-medium">
                {category.name}
              </span>
            )}
            <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground group-hover:text-amber-600 transition-colors mr-auto">
              <span>اكتشف التفاصيل</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </motion.div>
    </Link>
  );
}


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
    service.featuredImage?.node?.sourceUrl || "/images/default-service.jpg";
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
// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Umbrella,
//   Fence,
//   TreePine,
//   Warehouse,
//   Tent,
//   Palmtree,
//   Settings,
//   LucideIcon,
//   ChevronLeft,
// } from "lucide-react";
// import { ServiceItem } from "@/lib/api";
// import { cn } from "@/lib/utils";

// // 1. تعريف خريطة الأيقونات
// const ICON_MAP: Record<string, LucideIcon> = {
//   cars: Umbrella,
//   shades: Umbrella,
//   sawater: Fence,
//   pergolas: TreePine,
//   projects: Warehouse,
//   pools: Palmtree,
//   tents: Tent,
//   default: Settings,
// };

// const getIconKey = (categorySlug: string): LucideIcon => {
//   const slug = categorySlug?.toLowerCase() || "";
//   if (slug.includes("car")) return ICON_MAP.cars;
//   if (slug.includes("sawater") || slug.includes("ساتر"))
//     return ICON_MAP.sawater;
//   if (
//     slug.includes("pergola") ||
//     slug.includes("برجول") ||
//     slug.includes("جلسات")
//   )
//     return ICON_MAP.pergolas;
//   if (
//     slug.includes("project") ||
//     slug.includes("هناجر") ||
//     slug.includes("حديد")
//   )
//     return ICON_MAP.projects;
//   if (slug.includes("pool") || slug.includes("مسبح") || slug.includes("لكسان"))
//     return ICON_MAP.pools;
//   if (slug.includes("tent") || slug.includes("خيم") || slug.includes("قماش"))
//     return ICON_MAP.tents;
//   return ICON_MAP.default;
// };

// interface ServiceCardProps {
//   service: ServiceItem;
//   index?: number;
// }

// export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
//   const category = service.serviceCategories?.nodes[0];
//   const imageUrl = service.featuredImage?.node?.sourceUrl || "/0.jpg";
//   const serviceHref = `/services/${service.slug}`;
//   const SelectedIcon = getIconKey(category?.slug || "");

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{
//         delay: index * 0.1,
//         duration: 0.6,
//         type: "spring",
//         stiffness: 100,
//       }}
//       className="group h-full"
//     >
//       <Link href={serviceHref} className="block h-full">
//         <div className="relative h-full bg-card rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] transition-all duration-500 border border-border/40 hover:border-primary/30 flex flex-col group-hover:-translate-y-2">
//           {/* جزء الصورة العلوية */}
//           <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
//             <Image
//               src={imageUrl}
//               alt={service.title}
//               fill
//               unoptimized
//               className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
//             />
//             {/* تدرج لوني ناعم من الأسفل لدمج الصورة مع الكرت */}
//             <div className="absolute inset-0 bg-gradient-to-t from-card via-black/20 to-transparent opacity-90 transition-opacity" />

//             {/* تصنيف الخدمة كشريط فخم */}
//             {category && (
//               <div className="absolute top-4 right-4 md:top-5 md:right-5">
//                 <span className="px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-primary text-[10px] md:text-xs font-bold shadow-lg border border-primary/20">
//                   {category.name}
//                 </span>
//               </div>
//             )}

//             {/* الأيقونة العائمة (تصميم جديد) */}
//             <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-card border border-border/50 shadow-lg flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/20 z-10 rotate-3 group-hover:rotate-0">
//               <SelectedIcon className="w-6 h-6" strokeWidth={2} />
//             </div>
//           </div>

//           {/* جزء المحتوى السفلي */}
//           <div className="flex flex-col flex-grow p-6 md:p-8 pt-8 bg-card relative z-0">
//             <h3 className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2 mb-3">
//               {service.title}
//             </h3>

//             <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-8">
//               {service.seo?.metaDesc ||
//                 "توريد وتركيب بأعلى معايير الجودة والضمان المعتمد، مع إشراف هندسي متكامل لضمان أفضل النتائج."}
//             </p>

//             {/* الفوتر الخاص بالكرت */}
//             <div className="mt-auto pt-5 border-t border-border/50 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="relative flex h-2.5 w-2.5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
//                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
//                 </span>
//                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
//                   اكتشف التفاصيل
//                 </span>
//               </div>

//               {/* السهم المتفاعل */}
//               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border border-border group-hover:bg-gradient-to-l group-hover:from-primary-dark group-hover:to-primary group-hover:border-transparent group-hover:shadow-lg transition-all duration-500 group-hover:scale-110">
//                 <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors transform group-hover:-translate-x-0.5" />
//               </div>
//             </div>
//           </div>

//           {/* خط نحاسي يظهر أسفل البطاقة عند التمرير */}
//           <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-dark to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

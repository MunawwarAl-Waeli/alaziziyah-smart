"use client";
import { ArchitecturalSeparator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpLeft,
  Cpu,
  Shield,
  Zap,
  Maximize,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. تعريف واجهة بيانات المنتج (Type Safety)
// هذا يضمن أننا لن نخطئ في كتابة اسم خاصية مستقبلاً
interface ProductItem {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  className: string; // للتحكم بحجم الخلية (كبير/صغير)
  image: string;
  icon: LucideIcon;
}

// 2. البيانات منظمة بناءً على الواجهة
const products: ProductItem[] = [
  {
    id: 1,
    title: "البرجولات البيومناخية",
    subtitle: "Bioclimatic Pergolas",
    desc: "نظام شفرات ذكي يتحكم بدخول الشمس والتهوية آلياً.",
    href: "/products/pergolas",
    className: "md:col-span-2 md:row-span-2", // المربع الكبير (البطل)
    image: "/images/0.jpg",
    icon: Maximize,
  },
  {
    id: 2,
    title: "مظلات الكابولي",
    subtitle: "Cantilever Shades",
    desc: "هياكل معلقة بدون أعمدة أمامية لحرية الحركة.",
    href: "/products/cars",
    className: "md:col-span-1 md:row-span-2", // المربع الطويل
    image: "/images/1.jpg",
    icon: Shield,
  },
  {
    id: 3,
    title: "الأنظمة الذكية",
    subtitle: "Smart Automation",
    desc: "تحكم بالمناخ والإضاءة عبر الجوال.",
    href: "/products/smart",
    className: "md:col-span-1 md:row-span-1", // مربع صغير
    image: "/images/2.jpg",
    icon: Cpu,
  },
  {
    id: 4,
    title: "السواتر المعمارية",
    subtitle: "Architectural Screens",
    desc: "قص ليزر بتصاميم هندسية مودرن.",
    href: "/products/screens",
    className: "md:col-span-1 md:row-span-1", // مربع صغير
    image: "/images/7.jpg",
    icon: Zap,
  },
  {
    id: 5,
    title: "السواتر المعمارية",
    subtitle: "Architectural Screens",
    desc: "قص ليزر بتصاميم هندسية مودرن.",
    href: "/products/screens",
    className: "md:col-span-1 md:row-span-1", // مربع صغير
    image: "/images/0.jpg",
    icon: Zap,
  },
];

export function ProductsGrid() {
  return (
    <section className="relative py-24 px-4 container mx-auto ">
      <ArchitecturalSeparator position="top" />
      {/* عنوان القسم */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            Our Systems
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            كتالوج <span className="text-gradient-gold">الأنظمة المعمارية</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/products"
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            <span>استعرض جميع المنتجات (12)</span>
            <ArrowUpLeft className="w-5 h-5 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* الشبكة (Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {products.map((item, i) => (
          <BentoCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// 3. المكون الفرعي يستخدم الواجهة أيضاً
function BentoCard({ item, index }: { item: ProductItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500",
        item.className
      )}
    >
      {/* 1. الصورة الخلفية (محسنة للأداء) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // تحسين الأداء للجوال
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          quality={85} // جودة ممتازة وحجم أقل
        />
        {/* طبقة تظليل متدرجة لضمان قراءة النص */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-50 transition-opacity" />
      </div>

      {/* 2. تأثير المخطط الهندسي (CAD Grid) يظهر عند الهوفر */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* زوايا هندسية تظهر عند التفاعل */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary/50 rounded-tr-xl" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary/50 rounded-bl-xl" />
      </div>

      {/* 3. المحتوى النصي */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
        {/* الأيقونة العائمة */}
        <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <ArrowUpLeft className="w-5 h-5 text-white" />
        </div>

        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-1.5 rounded-lg bg-primary/20 text-primary backdrop-blur-sm border border-primary/10">
              <item.icon className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono text-primary/90 uppercase tracking-widest font-bold">
              {item.subtitle}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md">
            {item.title}
          </h3>

          <p className="text-white/80 text-sm md:text-base max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
            {item.desc}
          </p>
        </div>
      </div>

      {/* رابط لكامل البطاقة */}
      <Link
        href={item.href}
        className="absolute inset-0 z-30"
        aria-label={`تصفح ${item.title}`}
      />
    </motion.div>
  );
}

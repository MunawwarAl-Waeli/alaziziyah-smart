"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, LayoutGrid } from "lucide-react";
import { ServiceItem, ServiceCategory } from "@/lib/api";
import { ServiceCard } from "@/components/services/services-card";
import { cn } from "@/lib/utils";

interface Props {
  initialServices: ServiceItem[];
  categories: ServiceCategory[]; // ✅ استخدام النوع الصحيح
}

export default function ServicesPageClient({
  initialServices,
  categories,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = useMemo(() => {
    return initialServices.filter((service) => {
      // البحث في العنوان والوصف (Content)
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.content?.toLowerCase().includes(searchQuery.toLowerCase());

      // الفلترة بناءً على الـ slug الموجود داخل مصفوفة التصنيفات
      const matchesFilter =
        activeFilter === "all" ||
        service.serviceCategories?.nodes.some(
          (cat) => cat.slug === activeFilter,
        );

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, initialServices]);

  return (
    <>
      <div className="min-h-screen  pt-32 pb-16" dir="rtl">
        {/* رأس الصفحة مع تأثير بصري خفيف */}
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-widest uppercase text-sm"
            >
              مؤسسة العزيزية
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black text-foreground"
            >
              كافة <span className="text-primary text-stroke">خدماتنا</span>
            </motion.h1>

            <div className="relative max-w-2xl mx-auto pt-8">
              <Search className="absolute right-5 top-[70%] -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن مظلات، سواتر، برجولات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pr-14 pl-6 rounded-2xl border border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-lg shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-5 top-[70%] -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* شريط الفلترة اللزج (Sticky) */}
        <nav className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-xl border-y border-border mb-12">
          <div className="container mx-auto px-6 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0 text-primary font-bold ml-4">
              <Filter className="w-4 h-4" />
              <span className="text-sm">تصفية:</span>
            </div>
            <div className="flex gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveFilter(cat.slug)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                    activeFilter === cat.slug
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary",
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* شبكة عرض الخدمات */}
        <main className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8 text-muted-foreground">
            <p className="text-sm font-medium">
              عرض {filteredServices.length} نتيجة
            </p>
          </div>

          {filteredServices.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border"
            >
              <LayoutGrid className="w-20 h-20 mx-auto mb-6 opacity-10" />
              <h3 className="text-2xl font-bold">عذراً، لم نجد نتائج!</h3>
              <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                لم نجد أي خدمة تطابق {searchQuery} في هذا التصنيف.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold hover:scale-105 transition-transform"
              >
                عرض كافة الخدمات
              </button>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
}

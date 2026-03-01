"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, LayoutGrid } from "lucide-react";
import { ServiceItem, CategoryItem } from "@/lib/api"; // تأكد من المسارات
import { ServiceCard } from "@/components/services/services-card"; // الكرت الذي صممناه
import { cn } from "@/lib/utils";

interface Props {
  initialServices: ServiceItem[];
  categories: CategoryItem[];
}

export default function ServicesPageClient({
  initialServices,
  categories,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // المحرك الرئيسي للبحث والفلترة
  const filteredServices = useMemo(() => {
    return initialServices.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "all" || service.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, initialServices]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16" dir="rtl">
      {/* رأس الصفحة */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-foreground">
            كافة <span className="text-primary">خدماتنا</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            ابحث عن الخدمة التي تحتاجها من بين أكثر من {initialServices.length}{" "}
            خدمة هندسية
          </p>

          {/* شريط البحث */}
          <div className="relative max-w-2xl mx-auto mt-8">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن مظلة، سواتر، هناجر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pr-12 pl-4 rounded-2xl border border-border bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* الفلترة */}
      <nav className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border mb-12">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0 text-primary font-bold ml-4">
            <Filter className="w-4 h-4" />
            <span>تصنيف:</span>
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.slug)}
                className={cn(
                  "px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                  activeFilter === cat.slug
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* النتائج */}
      <main className="container mx-auto px-4">
        {filteredServices.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  // هنا نلغي نمط الـ Bento ونجعلها شبكة منتظمة لسهولة التصفح
                  // layoutMode="standard"
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-32 bg-card rounded-3xl border-2 border-dashed border-border">
            <LayoutGrid className="w-16 h-16 mx-auto mb-4 opacity-10" />
            <h3 className="text-xl font-bold">لا توجد نتائج تطابق بحثك</h3>
            <p className="text-muted-foreground mt-2">
              جرب البحث بكلمات أخرى أو تغيير التصنيف
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-6 text-primary font-bold hover:underline"
            >
              عرض كل الخدمات
            </button>
          </div>
        )}
      </main>
    </div>
  );
}


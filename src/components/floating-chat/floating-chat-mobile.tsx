// components/floating-chat/floating-chat-mobile.tsx
"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import { SOCIAL_LINKS } from "@/lib/config";
import {
  MessageCircle,
  Phone,
  Calculator,
  Grid3x3,
  X,
  Search,
  ChevronUp,
  Briefcase,
  CarFront,
  Waves,
  Building2,
  Leaf,
  Trees,
  Tent,
  Settings,
  Shield,
  Warehouse,
  Umbrella,
  PenTool,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {  getAllServices } from "@/lib/api";
import ServiceCard, { type CombinedItem } from "./mobile-service-card";

export const getServiceIcon = (text: string): LucideIcon => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes("سيارات")) return CarFront;
  if (lowerText.includes("مسابح")) return Waves;
  if (lowerText.includes("مدارس") || lowerText.includes("محلات"))
    return Building2;
  if (lowerText.includes("حدائق") || lowerText.includes("برجولات")) return Leaf;
  if (lowerText.includes("خشب")) return Trees;
  if (lowerText.includes("قماش") || lowerText.includes("pvc")) return Tent;
  if (lowerText.includes("متحركة")) return Settings;
  if (lowerText.includes("لكسان")) return Sparkles;
  if (lowerText.includes("سواتر")) return Shield;
  if (lowerText.includes("حديد") || lowerText.includes("ساندوتش"))
    return Warehouse;
  if (lowerText.includes("مظلات")) return Umbrella;
  return PenTool;
};

const ITEMS_PER_PAGE = 8;

const FloatingChatMobile = memo(() => {
  const [showCombinedMenu, setShowCombinedMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [combinedList, setCombinedList] = useState<CombinedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    let isSubscribed = true;
    async function fetchAllData() {
      try {
        setIsLoading(true);
        const [services] = await Promise.all([
          getAllServices(),
        //   getAllProjects(),
        ]);
        if (!isSubscribed) return;

        const formattedServices: CombinedItem[] = services.map((s) => ({
          id: `service-${s.id || s.slug}`,
          name: s.title,
          href: `/services/${s.slug}`,
          type: "service",
          IconComponent: getServiceIcon(s.title),
        }));
        // const formattedProjects: CombinedItem[] = projects.map((p) => ({
        //   id: `project-${p.slug}`,
        //   name: p.title,
        //   href: `/projects/${p.slug}`,
        //   type: "project",
        //   IconComponent: Briefcase,
        // }));

        setCombinedList([...formattedServices]);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    }
    fetchAllData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const filteredList = useMemo(() => {
    if (!searchTerm) return combinedList;
    return combinedList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [combinedList, searchTerm]);

  const displayedList = useMemo(
    () => filteredList.slice(0, visibleCount),
    [filteredList, visibleCount],
  );

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm, showCombinedMenu]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-24 right-4 z-[100] w-10 h-10 bg-amber-600 text-white rounded-full shadow-lg flex items-center justify-center transition-[opacity,transform] duration-300",
          showScrollTop
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-4 invisible",
        )}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-slate-900 border-t border-border/50 shadow-lg rounded-t-2xl pb-safe">
        <div className="flex items-center justify-around py-2 px-3">
          <button
            onClick={() => setShowCombinedMenu(true)}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
          >
            <Grid3x3 className="w-6 h-6" />
            <span className="text-[10px] font-medium">خدماتنا</span>
          </button>
          <a
            href={SOCIAL_LINKS.phone}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span className="text-[10px] font-medium">اتصال</span>
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-green-600 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-emerald-500" />
            <span className="text-[10px] font-medium">واتساب</span>
          </a>
          <a
            href="/contact"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
          >
            <Calculator className="w-6 h-6" />
            <span className="text-[10px] font-medium">عرض سعر</span>
          </a>
        </div>
      </div>

      {/* القائمة المنبثقة – تم فصل الحركة عن المحتوى */}
      <div
        className={cn(
          "fixed inset-0 z-[110] bg-black/60 transition-opacity duration-200",
          showCombinedMenu ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={() => setShowCombinedMenu(false)}
      />
      <div
        dir="rtl"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[120] bg-white dark:bg-slate-900 rounded-t-3xl max-h-[85vh] h-[80vh] flex flex-col shadow-lg transition-transform duration-300 ease-in-out",
          showCombinedMenu ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mt-4 shrink-0" />
        <div className="flex justify-between items-center p-5 border-b border-border/50 shrink-0">
          <h3 className="text-xl font-black text-foreground">
            الخدمات والمشاريع
          </h3>
          <button
            onClick={() => setShowCombinedMenu(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 pb-2 shrink-0">
          <div className="relative">
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث هنا..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3.5 pr-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-amber-500 outline-none transition-colors font-medium"
            />
          </div>
        </div>

        {/* منطقة المحتوى بدون أي تأثيرات متحركة */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-4 pt-2 no-scrollbar"
          style={{ contain: "paint layout" }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              جاري التحميل...
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-2 gap-4"
                style={{
                  // ضمان عدم تغير عرض الشبكة مهما حدث
                  width: "100%",
                  contain: "layout style",
                }}
              >
                {displayedList.map((item) => (
                  <ServiceCard key={item.id} item={item} />
                ))}
              </div>
              {visibleCount < filteredList.length && (
                <div className="flex justify-center mt-4 pb-2">
                  <button
                    onClick={() =>
                      setVisibleCount((prev) =>
                        Math.min(prev + ITEMS_PER_PAGE, filteredList.length),
                      )
                    }
                    className="px-6 py-2 bg-amber-500 text-white text-sm font-medium rounded-full hover:bg-amber-600 transition-colors"
                  >
                    عرض المزيد ({filteredList.length - visibleCount} المتبقي)
                  </button>
                </div>
              )}
            </>
          )}
          {!isLoading && filteredList.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              لا توجد نتائج مطابقة لبحثك
            </div>
          )}
        </div>
      </div>
    </>
  );
});
FloatingChatMobile.displayName = "FloatingChatMobile";

export default FloatingChatMobile;

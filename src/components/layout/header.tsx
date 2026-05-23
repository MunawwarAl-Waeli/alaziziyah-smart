"use client";

import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Umbrella,
  Tent,
  Search,
  Loader2,
  Home,
  Package,
  Briefcase,
  CalendarCheck,
  Shield,
  Warehouse,
  Leaf,
  Sparkles,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { _ServiceItem } from "@/lib/api";

// ==================== الأنواع ====================
type WPMenuItem = {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
  childItems?: { nodes: WPMenuItem[] };
};

interface HeaderProps {
  wpMenuData: WPMenuItem[];
  fetchedServices?: _ServiceItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedProjects?: any[];
}

type Product = {
  id: string;
  title: string;
  href: string;
  category: string;
  price: string;
};

// ==================== الدوال المساعدة ====================
const getIconAndDesc = (label: string) => {
  if (label.includes("سيارات"))
    return { icon: Umbrella, desc: "حماية فائقة وعزل حراري" };
  if (label.includes("حدائق") || label.includes("جلسات"))
    return { icon: Leaf, desc: "تصاميم خشبية ومعدنية مودرن" };
  if (label.includes("انشائي"))
    return { icon: Tent, desc: "تصاميم معمارية للمساحات الكبيرة" };
  if (label.includes("مسابح"))
    return { icon: Sparkles, desc: "خصوصية وحماية من الشمس" };
  if (label.includes("حديد"))
    return { icon: Shield, desc: "أمان وخصوصية بمتانة عالية" };
  if (label.includes("خشب")) return { icon: Package, desc: "مظهر طبيعي وجذاب" };
  if (label.includes("قماش") || label.includes("بي في سي"))
    return { icon: Umbrella, desc: "حلول اقتصادية وعملية" };
  if (label.includes("برجول") || label.includes("هناجر"))
    return { icon: Warehouse, desc: "إنشاءات معدنية ضخمة وجلسات" };
  if (label.includes("مشاريع") || label.includes("أعمال"))
    return { icon: Briefcase, desc: "تصفح سابقة أعمالنا" };
  if (label.includes("تواصل") || label.includes("اتصل"))
    return { icon: Phone, desc: "نحن في خدمتك" };
  if (label.includes("رئيسية")) return { icon: Home, desc: "الصفحة الرئيسية" };
  return { icon: Package, desc: "خدمات العزيزية المتكاملة" };
};

const getRelativePath = (fullUrl: string) => {
  if (!fullUrl) return "/";
  try {
    return decodeURI(new URL(fullUrl).pathname);
  } catch {
    return fullUrl.startsWith("/") ? fullUrl : `/${fullUrl}`;
  }
};

// ==================== المكونات الفرعية (Memoized) ====================
const SearchResultItem = memo(
  ({ result, onClick }: { result: Product; onClick: () => void }) => (
    <Link
      href={result.href}
      onClick={onClick}
      className="flex items-center gap-3 md:gap-4 p-3 md:p-5 hover:bg-muted transition-colors border-b border-border last:border-0 group"
    >
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-background border border-border flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
        {result.category === "خدمات" ? (
          <Package className="w-5 h-5 md:w-7 md:h-7 text-muted-foreground group-hover:text-primary" />
        ) : (
          <Briefcase className="w-5 h-5 md:w-7 md:h-7 text-muted-foreground group-hover:text-primary" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm md:text-lg font-bold text-foreground group-hover:text-primary truncate transition-colors">
          {result.title}
        </h4>
        <div className="flex items-center justify-between md:justify-start md:gap-2 mt-0.5 md:mt-1">
          <span className="text-[10px] md:text-xs text-muted-foreground bg-background px-2 py-1 rounded-md border border-border inline-block truncate">
            {result.category}
          </span>
        </div>
      </div>
    </Link>
  ),
);
SearchResultItem.displayName = "SearchResultItem";

// ==================== المكون الرئيسي ====================
export function Header({
  wpMenuData = [],
  fetchedServices = [],
  fetchedProjects = [],
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 💡 1. تصفية التكرار مسبقاً من الـ API لضمان عدم وجود مشاريع أو خدمات مكررة
  const uniqueServices = useMemo(
    () =>
      Array.from(
        new Map(fetchedServices.map((s) => [s.slug || s.id, s])).values(),
      ),
    [fetchedServices],
  );
  const uniqueProjects = useMemo(
    () =>
      Array.from(
        new Map(fetchedProjects.map((p) => [p.slug || p.id, p])).values(),
      ),
    [fetchedProjects],
  );

  // 💡 2. حساب الروابط مرة واحدة مع حماية الـ Keys
  const dynamicNavLinks = useMemo(() => {
    const rootMenuNodes = wpMenuData.filter((item) => item.parentId === null);

    return rootMenuNodes.map((item, menuIndex) => {
      const { icon } = getIconAndDesc(item.label);
      const isServicesMenu = item.label.includes("خدمات");
      const isProjectsMenu =
        item.label.includes("مشاريع") || item.label.includes("أعمال");
      const hasChildren = item.childItems && item.childItems.nodes.length > 0;

      return {
        id: item.id || `menu-${menuIndex}`,
        name: item.label,
        href: getRelativePath(item.url),
        icon: icon,
        isMega: isServicesMenu || isProjectsMenu || hasChildren,
        subItems: isServicesMenu
          ? uniqueServices.map((s, idx) => ({
              id: s.id || s.slug || `service-${idx}`,
              title: s.title,
              href: s.href || `/services/${s.slug}`,
              icon: getIconAndDesc(s.title).icon,
              desc: s.categoryName,
            }))
          : isProjectsMenu
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? uniqueProjects.slice(0, 12).map((p: any, idx) => ({
                id: p.id || p.slug || `project-${idx}`,
                title: p.title,
                href: `/projects/${p.slug}`,
                icon: getIconAndDesc(p.title).icon,
                desc: p.projectCategorys?.nodes?.[0]?.name || "معرض الأعمال",
              }))
            : hasChildren
              ? item.childItems!.nodes.map((subItem, idx) => {
                  const subData = getIconAndDesc(subItem.label);
                  return {
                    id: subItem.id || `sub-${idx}`,
                    title: subItem.label,
                    href: getRelativePath(subItem.url),
                    icon: subData.icon,
                    desc: subData.desc,
                  };
                })
              : undefined,
      };
    });
  }, [wpMenuData, uniqueServices, uniqueProjects]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 💡 3. حل مشكلة Duplicate Keys في البحث عن طريق الاعتماد على uniqueServices و إضافة index fallback
  useEffect(() => {
    const searchTerm = query.trim().toLowerCase();
    if (searchTerm.length > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSearching(true);
      const timer = setTimeout(() => {
        const foundServices = uniqueServices
          .filter(
            (s) =>
              s.title.toLowerCase().includes(searchTerm) ||
              (s.description &&
                s.description.toLowerCase().includes(searchTerm)),
          )
          .slice(0, 5)
          .map((item, idx) => ({
            id: `service-${item.id || item.slug || idx}`,
            title: item.title,
            category: "خدمات",
            price: "عرض الخدمة",
            slug: item.slug,
            href: item.href || `/services/${item.slug}`,
          }));

        const foundProjects = uniqueProjects
          .filter((p) => p.title.toLowerCase().includes(searchTerm))
          .slice(0, 5)
          .map((item, idx) => ({
            id: `project-${item.id || item.slug || idx}`,
            title: item.title,
            category: "معرض الأعمال",
            price: "عرض المشروع",
            slug: item.slug,
            href: `/projects/${item.slug}`,
          }));

        setResults([...foundServices, ...foundProjects]);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query, uniqueServices, uniqueProjects]);

  const handleSearchEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && query.trim()) {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, router],
  );

  const closeAllMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setHoveredIndex(null);
  }, []);

  // التحقق من وجود قائمة Mega مفتوحة لتفعيل الـ Focus Overlay
  const isAnyMegaMenuOpen =
    hoveredIndex !== null && dynamicNavLinks[hoveredIndex]?.isMega;

  if (!mounted) return null;

  return (
    <>
      {/* 💡 4. Focus Overlay - تعتيم الخلفية للتركيز على القائمة باحترافية عالية */}
      <div
        className={cn(
          "fixed inset-0 bg-background/40 backdrop-blur-[2px] z-40 transition-all duration-500 ease-in-out pointer-events-none hidden md:block",
          isAnyMegaMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        aria-hidden="true"
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || isAnyMegaMenuOpen
            ? "bg-background/90 backdrop-blur-2xl border-b border-border shadow-sm py-3"
            : "bg-transparent py-5 border-b border-transparent",
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 flex items-center h-12 md:h-14 group"
            aria-label="الرئيسية"
          >
            <div className="relative h-full w-36 md:w-40 lg:w-44">
              <Image
                src="/images/logo.png"
                alt="العزيزية للمظلات والسواتر"
                fill
                sizes="(max-width: 768px) 144px, (max-width: 1200px) 160px, 176px"
                className="object-contain object-right group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {dynamicNavLinks.map((link, index) => (
              <div
                key={`nav-link-${link.id}`}
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <Link
                  href={link.href}
                  className="relative px-3 py-2 lg:px-4 z-10 text-base font-bold transition-colors duration-300 flex items-center gap-1.5"
                  aria-label={link.name}
                >
                  <span
                    className={cn(
                      "relative z-10",
                      pathname === link.href
                        ? "text-primary"
                        : "text-foreground/80 group-hover:text-primary",
                    )}
                  >
                    {link.name}
                  </span>

                  {link.isMega && (
                    <ChevronDown
                      className={cn(
                        "relative z-10 w-4 h-4 transition-transform duration-300",
                        hoveredIndex === index
                          ? "rotate-180 text-primary"
                          : "text-foreground/80",
                      )}
                    />
                  )}

                  {/* Hover Indicator */}
                  <span
                    className={cn(
                      "absolute -bottom-4 left-0 right-0 h-1 rounded-t-full bg-primary shadow-[0_-2px_10px_rgba(245,158,11,0.5)] transition-all duration-300 origin-center",
                      pathname === link.href
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0",
                    )}
                  />
                </Link>

                {/* 💡 5. Mega Menu Dropdown - حركة ظهور احترافية (Cubic Bezier) ومركزة تماماً */}
                {link.isMega && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[calc(100vw-2rem)] max-w-[1050px] z-50",
                      "transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top",
                      hoveredIndex === index
                        ? "opacity-100 visible translate-y-0 scale-100"
                        : "opacity-0 invisible -translate-y-3 scale-[0.98] pointer-events-none",
                    )}
                  >
                    <div
                      className="bg-background/95 backdrop-blur-3xl border border-border shadow-2xl rounded-[2rem] overflow-hidden flex text-foreground w-full ring-1 ring-primary/5"
                      dir="rtl"
                    >
                      <div className="p-4 lg:p-6 flex w-full h-full gap-4 lg:gap-6">
                        {/* Sidebar Project Feature */}
                        <div className="relative hidden lg:flex w-[260px] rounded-2xl overflow-hidden shrink-0 group/img flex-col justify-end p-5 bg-slate-900">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/img:scale-110 opacity-70"
                            style={{
                              backgroundImage: `url('${fetchedProjects?.[0]?.featuredImage?.node?.sourceUrl || "/images/0.jpg"}')`,
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                          <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full z-10 shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> مميز
                          </div>
                          <div className="relative z-10 text-right mt-auto">
                            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                              أحدث مشاريعنا
                            </h3>
                            <p className="text-slate-300 text-[11px] leading-relaxed mb-4 line-clamp-2">
                              اكتشف كيف قمنا بتحويل المساحات باستخدام أحدث
                              تصاميم المظلات والبرجولات.
                            </p>
                            <Link
                              href="/projects"
                              onClick={closeAllMenus}
                              className="flex items-center justify-between text-xs text-white font-bold bg-white/10 hover:bg-primary px-4 py-3 rounded-xl backdrop-blur-md border border-white/20 w-full group/btn transition-all duration-300"
                            >
                              <span>عرض كل المشاريع</span>
                              <ArrowLeft className="w-4 h-4 transform group-hover/btn:-translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>

                        {/* Mega Menu Links - Expanded & Centered content */}
                        <div className="flex-1 flex flex-col justify-between pl-2">
                          <div
                            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4"
                            dir="rtl"
                          >
                            {link.subItems?.slice(0, 12).map((subItem) => (
                              <Link
                                key={`mega-item-${subItem.id}`}
                                href={subItem.href}
                                onClick={closeAllMenus}
                                className="group/item flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-muted border border-transparent hover:border-primary/20 transition-all duration-300"
                              >
                                <div className="w-12 h-12 rounded-xl bg-background shadow-sm border border-border flex items-center justify-center group-hover/item:-translate-y-1 group-hover/item:bg-primary/10 group-hover/item:border-primary/30 transition-all duration-300 shrink-0">
                                  <subItem.icon className="w-6 h-6 text-muted-foreground group-hover/item:text-primary transition-colors" />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                  <h4 className="text-foreground font-bold text-[13px] mb-1 group-hover/item:text-primary transition-colors line-clamp-1">
                                    {subItem.title}
                                  </h4>
                                  <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed px-1">
                                    {subItem.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          {link.subItems && link.subItems.length > 12 && (
                            <div className="mt-5 pt-4 border-t border-border flex justify-end">
                              <Link
                                href={link.href}
                                onClick={closeAllMenus}
                                className="group/all text-primary font-bold text-xs flex items-center gap-2 hover:opacity-80 transition-opacity bg-primary/5 px-4 py-2 rounded-lg"
                              >
                                <span>
                                  عرض كافة النتائج ({link.subItems.length})
                                </span>
                                <ArrowLeft className="w-4 h-4 transform group-hover/all:-translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-primary transition-colors p-2.5 rounded-full hover:bg-primary/10"
              aria-label="بحث"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full text-muted-foreground border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="تبديل الثيم"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                ))}
            </button>

            <Link href="/contact" className="mr-2">
              <div className="bg-gradient-to-l from-primary-dark to-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-primary-light/30 group/cta">
                <span>اطلب عرض سعر</span>
                <span className="w-2 h-2 rounded-full bg-white/70 group-hover/cta:bg-white transition-colors" />
              </div>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 text-foreground bg-accent/50 rounded-full transition-colors"
              aria-label="تبديل ثيم الموقع"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5" />
                ))}
            </button>
            <button
              className="p-2 text-primary-foreground bg-primary rounded-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu (CSS Transitions) */}
      <div
        className={cn(
          "fixed inset-0 bottom-[50px] z-[70] bg-background/95 backdrop-blur-3xl md:hidden flex flex-col overflow-hidden text-foreground transition-transform duration-300 ease-out origin-right",
          isMobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-md shrink-0">
          <Link
            href="/"
            onClick={closeAllMenus}
            className="relative h-10 w-28"
            aria-label="الرئيسية"
          >
            <Image
              src="/images/logo.png"
              alt="الشعار"
              fill
              className="object-contain object-right"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-4 relative z-20 shrink-0">
          <div className="relative group/search">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchEnter}
              placeholder="ابحث عن الخدمات والمشاريع..."
              className="w-full bg-card border border-border rounded-xl py-3.5 pr-11 pl-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm shadow-sm"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/search:text-primary transition-colors">
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>

            {/* Mobile Search Dropdown */}
            <div
              className={cn(
                "absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl overflow-hidden shadow-xl z-50 max-h-60 overflow-y-auto transition-all duration-300 ease-out origin-top",
                results.length > 0 || (query.length > 1 && !isSearching)
                  ? "opacity-100 scale-y-100 visible"
                  : "opacity-0 scale-y-95 invisible pointer-events-none",
              )}
            >
              {results.length > 0 ? (
                <div className="divide-y divide-border">
                  {results.map((product) => (
                    <SearchResultItem
                      key={`mob-search-${product.id}`}
                      result={product}
                      onClick={closeAllMenus}
                    />
                  ))}
                </div>
              ) : query.length > 1 && !isSearching ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  لا توجد نتائج تطابق بحثك
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 relative z-10 no-scrollbar">
          <div className="flex flex-col space-y-2">
            {dynamicNavLinks.map((link) => (
              <div key={`mobile-link-${link.id}`}>
                {link.isMega ? (
                  <div
                    className={cn(
                      "border rounded-xl transition-all duration-300 overflow-hidden",
                      mobileSubmenu === link.name
                        ? "bg-primary/5 border-primary/30"
                        : "bg-transparent border-transparent",
                    )}
                  >
                    <button
                      onClick={() =>
                        setMobileSubmenu(
                          mobileSubmenu === link.name ? null : link.name,
                        )
                      }
                      className="w-full flex items-center justify-between p-4 text-foreground active:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {link.icon && (
                          <link.icon
                            className={cn(
                              "w-5 h-5 transition-colors",
                              mobileSubmenu === link.name
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                        )}
                        <span
                          className={cn(
                            "text-lg font-bold flex items-center gap-2",
                            mobileSubmenu === link.name ? "text-primary" : "",
                          )}
                        >
                          {link.name}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform duration-300",
                          mobileSubmenu === link.name
                            ? "rotate-180 text-primary"
                            : "text-muted-foreground",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        mobileSubmenu === link.name
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 pb-4 pt-1 space-y-1">
                          {link.subItems?.map((sub) => (
                            <Link
                              key={`mob-sub-${sub.id}`}
                              href={sub.href}
                              onClick={closeAllMenus}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-background border border-transparent hover:border-border transition-all group shadow-sm"
                            >
                              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors shrink-0">
                                <sub.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                              </div>
                              <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                {sub.title}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeAllMenus}
                    className="flex items-center gap-4 p-4 rounded-xl text-lg font-bold text-foreground/80 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all"
                  >
                    {link.icon && (
                      <link.icon className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-border bg-background/90 backdrop-blur-md relative z-10 shrink-0">
          <Link href="/contact" onClick={closeAllMenus}>
            <button className="w-full bg-gradient-to-l from-primary-dark to-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-transform flex items-center justify-center gap-3 border border-primary-light/30">
              <CalendarCheck className="w-5 h-5" />
              <span>احجز موعد المعاينة</span>
            </button>
          </Link>
        </div>
      </div>

      {/* 💡 6. Desktop Search Overlay - حركة نعومة عالية عند البحث */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background/85 backdrop-blur-2xl flex items-start justify-center pt-24 md:pt-32 px-4 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isSearchOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        )}
      >
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-6 left-6 md:top-8 md:left-8 text-muted-foreground hover:text-foreground transition-all p-3 bg-muted border border-border rounded-full hover:bg-background hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>

        <div
          className={cn(
            "w-full max-w-3xl relative transition-all duration-500 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isSearchOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-8 scale-95 opacity-0",
          )}
        >
          <div className="relative group/searchDesk">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchEnter}
              placeholder="ابحث عن مظلة، برجولة، ساتر..."
              className="w-full bg-card border-2 border-border hover:border-primary/50 rounded-2xl py-5 md:py-6 pr-14 pl-14 md:pr-16 md:pl-6 text-lg md:text-2xl font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all shadow-2xl shadow-primary/5 text-right"
              autoFocus={isSearchOpen}
            />
            <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/searchDesk:text-primary transition-colors">
              {isSearching ? (
                <Loader2 className="w-7 h-7 animate-spin text-primary" />
              ) : (
                <Search className="w-7 h-7" />
              )}
            </div>
          </div>

          {results.length > 0 && (
            <div className="mt-6 bg-card border border-border rounded-2xl overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto">
              {results.map((result) => (
                <SearchResultItem
                  key={`desk-search-${result.id}`}
                  result={result}
                  onClick={closeAllMenus}
                />
              ))}
            </div>
          )}

          {query.length > 2 && results.length === 0 && !isSearching && (
            <div className="mt-6 p-8 text-center bg-card border border-border rounded-2xl shadow-sm">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <div className="text-foreground font-bold text-lg mb-1">
                لا توجد نتائج
              </div>
              <div className="text-muted-foreground text-sm">
                حاول البحث باستخدام كلمات مختلفة مثل مظلات حدائق أو سواتر
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  Hexagon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { _ServiceItem } from "@/lib/api";

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
    const urlObj = new URL(fullUrl);
    return decodeURI(urlObj.pathname);
  } catch (error) {
    return fullUrl.startsWith("/") ? fullUrl : `/${fullUrl}`;
  }
};

export function Header({
  wpMenuData = [],
  fetchedServices = [],
  fetchedProjects = [],
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const rootMenuNodes = wpMenuData.filter((item) => item.parentId === null);

  const dynamicNavLinks = rootMenuNodes.map((item) => {
    const { icon } = getIconAndDesc(item.label);
    const isServicesMenu = item.label.includes("خدمات");
    const isProjectsMenu =
      item.label.includes("مشاريع") || item.label.includes("أعمال");
    const hasChildren = item.childItems && item.childItems.nodes.length > 0;

    return {
      id: item.id,
      name: item.label,
      href: getRelativePath(item.url),
      icon: icon,
      isMega: isServicesMenu || isProjectsMenu || hasChildren,
      subItems: isServicesMenu
        ? fetchedServices.map((s) => ({
            id: s.id,
            title: s.title,
            href: s.href,
            icon: getIconAndDesc(s.title).icon,
            desc: s.categoryName,
          }))
        : isProjectsMenu
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fetchedProjects.slice(0, 12).map((p: any) => ({
              id: p.id,
              title: p.title,
              href: `/projects/${p.slug}`,
              icon: Briefcase,
              desc: p.projectCategorys?.nodes?.[0]?.name || "معرض الأعمال",
            }))
          : hasChildren
            ? item.childItems!.nodes.map((subItem) => {
                const subData = getIconAndDesc(subItem.label);
                return {
                  id: subItem.id,
                  title: subItem.label,
                  href: getRelativePath(subItem.url),
                  icon: subData.icon,
                  desc: subData.desc,
                };
              })
            : undefined,
    };
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchTerm = query.trim().toLowerCase();
      if (searchTerm.length > 1) {
        setIsSearching(true);
        const foundServices = fetchedServices
          .filter(
            (service) =>
              service.title.toLowerCase().includes(searchTerm) ||
              (service.description &&
                service.description.toLowerCase().includes(searchTerm)),
          )
          .slice(0, 5)
          .map((item) => ({
            id: `service-${item.id}`,
            title: item.title,
            category: "خدمات",
            price: "عرض الخدمة",
            slug: item.slug,
            href: item.href || `/services/${item.slug}`,
          }));

        const foundProjects = fetchedProjects
          .filter((project) => project.title.toLowerCase().includes(searchTerm))
          .slice(0, 5)
          .map((item) => ({
            id: `project-${item.id}`,
            title: item.title,
            category: "معرض الأعمال",
            price: "عرض المشروع",
            slug: item.slug,
            href: `/projects/${item.slug}`,
          }));
        setResults([...foundServices, ...foundProjects]);
        setIsSearching(false);
      } else {
        setResults([]);
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, fetchedServices, fetchedProjects]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const term = (e.target as HTMLInputElement).value;
      if (term.trim()) {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        router.push(`/search?q=${encodeURIComponent(term)}`);
      }
    }
  };

  const menuVariants: Variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { y: 20, opacity: 0, transition: { duration: 0.2 } },
  };

  if (!mounted) return null;

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/85 backdrop-blur-2xl border-b border-primary/20 shadow-luxury py-3"
            : "bg-transparent py-5 border-b border-transparent",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
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

          <nav
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => {
              setHoveredIndex(null);
              setActiveMegaMenu(false);
            }}
          >
            {dynamicNavLinks.map((link, index) => (
              <div
                key={`nav-link-${link.id}`}
                className="relative px-3 py-2 lg:px-4"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  if (link.isMega) {
                    setActiveMegaMenu(true);
                  } else {
                    setActiveMegaMenu(false);
                  }
                }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative z-10 text-base font-bold transition-colors duration-300 flex items-center gap-1.5",
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary",
                  )}
                >
                  {link.name}
                  {link.isMega && (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        activeMegaMenu && hoveredIndex === index
                          ? "rotate-180 text-primary"
                          : "",
                      )}
                    />
                  )}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-3 left-0 right-0 h-1 rounded-t-full bg-primary shadow-[0_-2px_10px_rgba(245,158,11,0.5)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>

                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            ))}

            <AnimatePresence mode="wait">
              {/* إضافة mode="wait" تمنع التداخل أيضاً */}
              {activeMegaMenu &&
                hoveredIndex !== null &&
                dynamicNavLinks[hoveredIndex]?.isMega && (
                  <motion.div
                    key={`mega-menu-${hoveredIndex}`} // 👈 هذا السطر السحري يحل مشكلة التكدس تماماً
                    initial={{ opacity: 0, y: 15, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 15, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 w-[950px] bg-background/95 backdrop-blur-2xl border border-border shadow-luxury rounded-2xl overflow-hidden mt-4 p-5 flex gap-5 text-foreground z-50"
                    dir="rtl"
                  >
                    <div className="relative w-[300px] rounded-2xl overflow-hidden shrink-0 group flex flex-col justify-end p-6 border border-primary/20 bg-slate-900">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80"
                        style={{
                          backgroundImage: `url('${fetchedProjects?.[0]?.featuredImage?.node?.sourceUrl || "/images/0.jpg"}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full z-10 shadow-lg shadow-primary/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> جديد
                      </div>
                      <div className="relative z-10 text-right mt-auto">
                        <div className="w-8 h-1 bg-primary mb-3 rounded-full" />
                        <h3 className="text-white font-bold text-xl mb-2">
                          أحدث مشاريعنا المبتكرة
                        </h3>
                        <p className="text-slate-300 text-xs leading-relaxed mb-5">
                          اكتشف كيف قمنا بتحويل المساحات باستخدام أحدث تصاميم
                          المظلات والبرجولات الفاخرة.
                        </p>
                        <Link
                          href="/projects"
                          onClick={() => setActiveMegaMenu(false)}
                          className="flex items-center justify-between text-sm text-white font-bold bg-white/10 hover:bg-primary px-4 py-3 rounded-xl backdrop-blur-md border border-white/20 w-full group/btn transition-all duration-300"
                        >
                          <span>عرض كل المشاريع</span>
                          <ArrowLeft className="w-4 h-4 transform group-hover/btn:-translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between pl-2">
                      <div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                        dir="rtl"
                      >
                        {dynamicNavLinks[hoveredIndex].subItems
                          ?.slice(0, 12)
                          .map((item) => (
                            <Link
                              key={`mega-item-${item.id}`}
                              href={item.href}
                              onClick={() => setActiveMegaMenu(false)}
                              className="group flex flex-col items-start gap-3 p-3.5 rounded-2xl bg-muted/50 hover:bg-card border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                            >
                              <div className="w-10 h-10 rounded-xl bg-background shadow-sm border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shrink-0">
                                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <div>
                                <h4 className="text-foreground font-bold text-[13px] mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                  {item.title}
                                </h4>
                                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                      </div>
                      {dynamicNavLinks[hoveredIndex].subItems &&
                        dynamicNavLinks[hoveredIndex].subItems!.length > 12 && (
                          <div className="mt-5 pt-4 border-t border-border flex justify-end">
                            <Link
                              href={dynamicNavLinks[hoveredIndex].href}
                              onClick={() => setActiveMegaMenu(false)}
                              className="group/all text-primary font-bold text-sm flex items-center gap-2 hover:opacity-80 transition-opacity bg-primary/10 px-4 py-2 rounded-lg"
                            >
                              <span>
                                عرض كافة الخدمات (
                                {dynamicNavLinks[hoveredIndex].subItems!.length}
                                )
                              </span>
                              <ArrowLeft className="w-4 h-4 transform group-hover/all:-translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        )}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </nav>

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
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>

            <Link href="/contact" className="mr-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-l from-primary-dark to-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-2 cursor-pointer border border-primary-light/30"
              >
                <span>اطلب عرض سعر</span>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" />
              </motion.div>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 text-foreground bg-accent/50 rounded-full transition-colors"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5" />
                )
              ) : (
                <div className="w-5 h-5" /> // مساحة فارغة تحافظ على التصميم حتى يحمل المتصفح
              )}
            </button>
            <button
              className="p-2 text-primary-foreground bg-primary rounded-lg shadow-lg shadow-primary/20"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 right-0 bottom-[50px] z-70 bg-background/95 backdrop-blur-3xl border-r border-border md:hidden flex flex-col overflow-hidden text-foreground"
          >
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-md">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
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
                className="p-2 rounded-full bg-muted text-muted-foreground"
                aria-label="إغلاق القائمة"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <motion.div
              variants={itemVariants}
              className="px-6 py-4 relative z-20"
            >
              <div className="relative group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن الخدمات والمشاريع..."
                  className="w-full bg-card border border-border rounded-xl py-3.5 pr-11 pl-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm shadow-sm"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  ) : (
                    <Search className="w-5 h-5 group-focus-within:text-primary transition-colors" />
                  )}
                </div>
                <AnimatePresence>
                  {(results.length > 0 ||
                    (query.length > 1 &&
                      results.length === 0 &&
                      !isSearching)) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl overflow-hidden shadow-xl z-50 max-h-60 overflow-y-auto"
                    >
                      {results.length > 0 ? (
                        <div className="divide-y divide-border">
                          {results.map((product) => (
                            <Link
                              key={`search-result-${product.id}`}
                              href={product.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 p-3 hover:bg-muted transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border shrink-0">
                                <Package className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-foreground group-hover:text-primary truncate transition-colors">
                                  {product.title}
                                </h4>
                                <div className="flex items-center justify-between mt-0.5">
                                  <span className="text-[10px] text-muted-foreground truncate">
                                    {product.category}
                                  </span>
                                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                    {product.price}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                          لا توجد نتائج تطابق بحثك
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="flex-1 overflow-y-auto px-4 pb-6 relative z-10 no-scrollbar">
              <div className="flex flex-col space-y-2">
                {dynamicNavLinks.map((link) => (
                  <motion.div
                    key={`mobile-link-${link.id}`}
                    variants={itemVariants}
                    layout
                  >
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
                                mobileSubmenu === link.name
                                  ? "text-primary"
                                  : "",
                              )}
                            >
                              {link.name}
                            </span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 transition-transform",
                              mobileSubmenu === link.name
                                ? "rotate-180 text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenu === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              <div className="px-3 pb-4 pt-1 space-y-1">
                                {link.subItems?.map((sub) => (
                                  <Link
                                    key={`mob-sub-${sub.id}`}
                                    href={sub.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-background border border-transparent hover:border-border transition-all group shadow-sm"
                                  >
                                    <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                                      <sub.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                    </div>
                                    <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                      {sub.title}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-xl text-lg font-bold text-foreground/80 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all"
                      >
                        {link.icon && (
                          <link.icon className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span>{link.name}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="p-6 border-t border-border bg-background/90 backdrop-blur-md relative z-10"
            >
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-gradient-to-l from-primary-dark to-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-transform flex items-center justify-center gap-3 border border-primary-light/30">
                  <CalendarCheck className="w-5 h-5" />
                  <span>احجز موعد المعاينة</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-2xl flex items-start justify-center pt-24 md:pt-32 px-4"
          >
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 left-6 md:top-8 md:left-8 text-muted-foreground hover:text-foreground transition-all p-3 bg-muted border border-border rounded-full hover:bg-background hover:scale-110"
              aria-label="إغلاق البحث"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-3xl relative"
            >
              <div className="relative group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="ابحث عن مظلة، برجولة، ساتر..."
                  className="w-full bg-card border-2 border-border hover:border-primary/50 rounded-2xl py-5 md:py-6 pr-14 pl-14 md:pr-16 md:pl-6 text-lg md:text-2xl font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all shadow-2xl shadow-primary/5 text-right"
                  autoFocus
                />
                <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  {isSearching ? (
                    <Loader2 className="w-7 h-7 animate-spin text-primary" />
                  ) : (
                    <Search className="w-7 h-7" />
                  )}
                </div>
              </div>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-card border border-border rounded-2xl overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto"
                >
                  {results.map((result) => (
                    <Link
                      key={`search-overlay-${result.id}`}
                      href={result.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-5 hover:bg-muted transition-colors border-b border-border last:border-0 group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                        {result.category === "خدمات" ? (
                          <Package className="w-7 h-7 text-muted-foreground group-hover:text-primary" />
                        ) : (
                          <Umbrella className="w-7 h-7 text-muted-foreground group-hover:text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {result.title}
                        </h4>
                        <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-md border border-border mt-1 inline-block">
                          {result.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
              {query.length > 2 && results.length === 0 && !isSearching && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-8 text-center bg-card border border-border rounded-2xl shadow-sm"
                >
                  <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <div className="text-foreground font-bold text-lg mb-1">
                    لا توجد نتائج
                  </div>
                  <div className="text-muted-foreground text-sm">
                    حاول البحث باستخدام كلمات مختلفة مثل مظلات حدائق أو سواتر
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

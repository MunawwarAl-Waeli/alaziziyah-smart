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
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. تعريف الأنواع الجديدة للبيانات القادمة من الووردبريس ---
type WPMenuItem = {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
  childItems?: { nodes: WPMenuItem[] };
};

interface HeaderProps {
  wpMenuData: WPMenuItem[]; // البيانات الخام من الووردبريس
}

type Product = {
  id: string;
  title: string;
  category: string;
  price: string;
};

// --- 2. دالة ذكية لربط الأيقونات والوصف بناءً على اسم الخدمة ---
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

  return { icon: Package, desc: "خدمات العزيزية المتكاملة" }; // افتراضي
};

// --- 3. مكون الهيدر ---
export function Header({ wpMenuData = [] }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // --- 4. تحويل بيانات الووردبريس إلى تنسيق التصميم الخاص بك ---
  const dynamicNavLinks = wpMenuData.map((item) => {
    const { icon } = getIconAndDesc(item.label);
    const hasChildren = item.childItems && item.childItems.nodes.length > 0;

    return {
      id: item.id,
      name: item.label,
      // تنظيف الرابط القادم من الووردبريس (إزالة الدومين)
      href:
        item.url.replace(
          process.env.NEXT_PUBLIC_WORDPRESS_URL ||
            "http://localhost:8080/public_html",
          "",
        ) || "/",
      icon: icon,
      isMega: hasChildren,
      subItems: hasChildren
        ? item.childItems!.nodes.map((subItem) => {
            const subData = getIconAndDesc(subItem.label);
            return {
              id: subItem.id,
              title: subItem.label,
              href: subItem.url.replace(
                process.env.NEXT_PUBLIC_WORDPRESS_URL ||
                  "http://localhost:8080/public_html",
                "",
              ),
              icon: subData.icon,
              desc: subData.desc,
            };
          })
        : undefined,
    };
  });

  // States
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  // Search States
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

  // دالة البحث (بقيّت كما برمجتها أنت تماماً)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: `
                query SearchContent($search: String!) {
                  posts(where: { search: $search }, first: 5) { nodes { id title slug } }
                  pages(where: { search: $search }, first: 5) { nodes { id title slug } }
                }
              `,
                variables: { search: query },
              }),
            },
          );
          const json = await res.json();
          const foundPosts = json.data.posts.nodes.map((item:Product) => ({
            id: item.id,
            title: item.title,
            category: "مقالات/أخبار",
            price: "تصفح للمزيد",
          }));
          const foundPages = json.data.pages.nodes.map((item: Product) => ({
            id: item.id,
            title: item.title,
            category: "خدمات",
            price: "خدمة",
          }));
          setResults([...foundPosts, ...foundPages]);
        } catch (error) {
          console.error("خطأ في البحث:", error);
          setResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setIsSearching(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

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
    /* ... (نفس حركاتك السابقة) ... */
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
    /* ... (نفس حركاتك السابقة) ... */
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-border/50 py-3 shadow-sm"
            : "bg-transparent py-5",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-105 transition-transform">
              ع
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground tracking-tighter">
                العزيزية
              </span>
              <span className="text-[10px] text-primary font-bold opacity-90">
                للمظلات والسواتر
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => {
              setHoveredIndex(null);
              setActiveMegaMenu(false);
            }}
          >
            {/* استخدام المصفوفة الديناميكية هنا */}
            {dynamicNavLinks.map((link, index) => (
              <div
                key={link.id}
                className="relative px-4 py-2"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  if (link.isMega) setActiveMegaMenu(true);
                  else setActiveMegaMenu(false);
                }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative z-10 text-base font-bold transition-colors duration-300 flex items-center gap-1",
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary",
                  )}
                >
                  {link.name}
                  {link.isMega && (
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-transform duration-300",
                        activeMegaMenu ? "rotate-180" : "",
                      )}
                    />
                  )}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_currentColor]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>

                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-accent/50 rounded-lg -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            ))}
            {/* Visual Mega Menu Dropdown - التصميم الجديد */}
            <AnimatePresence>
              {activeMegaMenu &&
                hoveredIndex !== null &&
                dynamicNavLinks[hoveredIndex]?.isMega && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 15, height: 0 }}
                    transition={{ duration: 0.2 }}
                    // تم التغيير إلى عرض أكبر واستخدام Flex
                    className="absolute top-full right-0 w-[950px] bg-popover/95 backdrop-blur-2xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl mt-2 p-5 flex gap-5 text-popover-foreground"
                    dir="rtl"
                  >
                    {/* 1. القسم الأيمن: البطاقة المميزة (المشروع الجديد) */}
                    <div className="relative w-[300px] rounded-2xl overflow-hidden shrink-0 group flex flex-col justify-end p-6 border border-border/50">
                      {/* صورة الخلفية (يمكنك تغيير الرابط لاحقاً) */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: "url('images/0.jpg')",
                        }}
                      />
                      {/* طبقة التعتيم لضمان وضوح النص */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                      {/* شارة "جديد" */}
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
                        جديد
                      </div>

                      {/* المحتوى النصي للبطاقة */}
                      <div className="relative z-10 text-right mt-auto">
                        <div className="w-8 h-1 bg-emerald-500 mb-3 rounded-full" />
                        <h3 className="text-white font-bold text-xl mb-2">
                          مشروع البرج الزجاجي
                        </h3>
                        <p className="text-white/80 text-xs leading-relaxed mb-5">
                          اكتشف كيف قمنا بتحويل واجهة المبنى باستخدام أحدث
                          تقنيات الزجاج والألمنيوم.
                        </p>
                        <Link
                          href="/projects"
                          onClick={() => setActiveMegaMenu(false)}
                          className="flex items-center justify-between text-sm text-white hover:text-emerald-400 transition-colors font-medium bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 w-full group/btn"
                        >
                          <span>عرض كل المشاريع</span>
                          <ArrowLeft className="w-4 h-4 transform group-hover/btn:-translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* 2. القسم الأيسر: شبكة الخدمات (3 أعمدة) */}
                    <div className="flex-1 flex flex-col">
                      <div className="grid grid-cols-3 gap-3">
                        {/* عرض أول 9 عناصر فقط ليتناسب مع الشبكة المربعة */}
                        {dynamicNavLinks[hoveredIndex].subItems
                          ?.slice(0, 9)
                          .map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setActiveMegaMenu(false)}
                              className="group flex flex-col items-start gap-3 p-4 rounded-2xl bg-accent/20 hover:bg-accent border border-transparent hover:border-border/60 transition-all duration-300"
                            >
                              <div className="w-10 h-10 rounded-lg bg-background shadow-sm border border-border/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                                <item.icon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
                              </div>
                              <div>
                                <h4 className="text-foreground font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </nav>

          {/* Right Actions - الازرار الجانبية */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/50"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-accent/50 border border-border/50 hover:bg-accent transition-colors"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-500" />
                )
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-bold hover:bg-foreground/90 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>اطلب عرض سعر</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </motion.div>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu - تم تطبيق dynamicNavLinks هنا أيضاً */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-white/90 dark:bg-[#020617]/70 backdrop-blur-xl border-r border-border/50 md:hidden flex flex-col overflow-hidden text-foreground"
          >
            {/* إضاءة خلفية جمالية */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between p-6 relative z-10"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
                  ع
                </div>
                <span className="text-lg font-bold text-foreground">
                  القائمة الرئيسية
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-accent border border-border text-foreground hover:bg-accent/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
            {/* Mobile Search Input */}
            <motion.div
              variants={itemVariants}
              className="px-6 mb-6 relative z-20"
            >
              <div className="relative group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث في الخدمات..."
                  className="relative w-full bg-accent/50 border border-border rounded-xl py-3.5 pr-11 pl-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-accent transition-all text-base shadow-sm"
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
                              key={product.id}
                              href={`/products/${product.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 p-3 hover:bg-accent transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center border border-border shrink-0">
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
                                  <span className="text-xs font-bold text-primary">
                                    {product.price} ر.س
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
            {/* Mobile Links */}
            <div className="flex-1 overflow-y-auto px-4 pb-6 relative z-10 no-scrollbar">
              <div className="flex flex-col space-y-3">
                {dynamicNavLinks.map((link) => (
                  <motion.div key={link.id} variants={itemVariants} layout>
                    {link.isMega ? (
                      <div
                        className={cn(
                          "border rounded-xl transition-all duration-300 overflow-hidden",
                          mobileSubmenu === link.name
                            ? "bg-accent/30 border-primary/30"
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
                              <link.icon className="w-5 h-5 text-muted-foreground" />
                            )}
                            <span className="text-xl font-bold flex items-center gap-3">
                              {link.name}
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
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
                              <div className="px-4 pb-4 pt-1 space-y-1">
                                {link.subItems?.map((sub) => (
                                  <Link
                                    key={sub.title}
                                    href={sub.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all group"
                                  >
                                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                      <sub.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                    </div>
                                    <div>
                                      <div className="text-base font-medium text-foreground group-hover:text-primary">
                                        {sub.title}
                                      </div>
                                      <div className="text-[10px] text-muted-foreground">
                                        {sub.desc}
                                      </div>
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
                        className="flex items-center gap-4 p-4 rounded-xl text-lg font-bold text-foreground/80 hover:text-primary hover:bg-accent/50 transition-all"
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

            {/* Mobile Footer CTA */}
            <motion.div
              variants={itemVariants}
              className="p-6 border-t border-border bg-background/80 backdrop-blur-md relative z-10"
            >
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 active:scale-95">
                  <CalendarCheck className="w-5 h-5" />
                  <span>احجز موعد المعاينة</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* /* Full Screen Search Overlay - هذا الجزء هو المسؤول عن عرض البحث والنتائج */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex items-start justify-center pt-24 md:pt-32 px-4"
          >
            {/* زر إغلاق البحث */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 left-6 md:top-8 md:right-8 text-muted-foreground hover:text-foreground transition-colors p-2 bg-accent rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-3xl relative"
            >
              {/* حقل الإدخال - هنا يحدث الربط */}
              <div className="relative group">
                <input
                  type="text"
                  value={query} // 1. ربط القيمة بالمتغير
                  onChange={(e) => setQuery(e.target.value)} // 2. عند الكتابة يتم تفعيل الـ useEffect
                  onKeyDown={handleSearch}
                  placeholder="ابحث عن مظلة، برجولة، ساتر..."
                  className="w-full bg-accent border border-border rounded-2xl py-4 md:py-6 pr-12 pl-14 md:pr-16 md:pl-6 text-lg md:text-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all shadow-2xl text-right"
                  autoFocus
                />

                {/* أيقونة التحميل أو البحث */}
                <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {isSearching ? (
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  ) : (
                    <Search className="w-6 h-6 group-focus-within:text-primary transition-colors" />
                  )}
                </div>
              </div>

              {/* عرض النتائج القادمة من الووردبريس */}
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-popover border border-border rounded-xl overflow-hidden shadow-xl max-h-[60vh] overflow-y-auto"
                >
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/services/${result.id}`} // رابط الخدمة
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-4 hover:bg-accent transition-colors border-b border-border last:border-0"
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        {result.category === "خدمات" ? (
                          <Package className="w-6 h-6 text-primary" />
                        ) : (
                          <Umbrella className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">
                          {result.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {result.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}

              {/* رسالة عند عدم وجود نتائج */}
              {query.length > 2 && results.length === 0 && !isSearching && (
                <div className="mt-4 text-center text-muted-foreground">
                  لا توجد نتائج مطابقة لبحثك
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

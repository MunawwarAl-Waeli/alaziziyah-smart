"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { searchProducts, type Product } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion"; // تمت إضافة Variants هنا
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Umbrella,
  Tent,
  Cpu,
  Search,
  Loader2,
  Home,
  Package,
  Briefcase,
  Users,
  Factory,
  BookOpen,
  CalendarCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// بيانات القائمة
const navLinks = [
  { name: "الرئيسية", href: "/", icon: Home },
  {
    name: "المنتجات",
    href: "/products",
    isMega: true,
    icon: Package,
    subItems: [
      {
        title: "مظلات السيارات",
        href: "/products/cars",
        icon: Umbrella,
        desc: "حماية فائقة وعزل حراري",
      },
      {
        title: "البرجولات والحدائق",
        href: "/products/pergolas",
        icon: Tent,
        desc: "تصاميم خشبية ومعدنية مودرن",
      },
      {
        title: "الأنظمة الذكية",
        href: "/products/smart",
        icon: Cpu,
        desc: "تحكم عن بعد ومستشعرات طقس",
      },
      {
        title: "السواتر والخصوصية",
        href: "/products/screens",
        icon: Sun,
        desc: "حلول خصوصية بلمسة جمالية",
      },
    ],
  },
  { name: "بوابة العملاء", href: "/portal", icon: Users },
  { name: "المشاريع", href: "/projects", icon: Briefcase },
  { name: "عن المصنع", href: "/about", icon: Factory },
  { name: "الأكاديمية", href: "/academy", icon: BookOpen },
];

// حركات الأنيميشن (تم تصحيح النوع هنا)
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
  closed: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // setMounted(true);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Search States
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 1) {
        setIsSearching(true);
        const data = await searchProducts(query);
        setResults(data);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const router = useRouter();
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <span className="text-xl font-bold text-foreground tracking-tighter">
              العزيزية{" "}
              <span className="text-primary font-normal text-sm opacity-90">
                للحلول الذكية
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => {
              setHoveredIndex(null);
              setActiveMegaMenu(false);
            }}
          >
            {navLinks.map((link, index) => (
              <div
                key={link.name}
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

                {/* Hover Background Effect */}
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

            {/* Visual Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMegaMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 15, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 15, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 w-[600px] bg-popover/95 backdrop-blur-2xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl mt-2 p-6 grid grid-cols-2 gap-4 text-popover-foreground"
                >
                  {navLinks
                    .find((l) => l.isMega)
                    ?.subItems?.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-start gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-6 h-6 text-foreground group-hover:text-primary" />
                        </div>
                        <div>
                          <h4 className="text-foreground font-medium mb-1 group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}

                  <div className="col-span-2 mt-2 pt-4 border-t border-border/50 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      هل تبحث عن تصميم خاص؟
                    </span>
                    <Link
                      href="/custom"
                      className="text-xs text-primary hover:underline font-bold"
                    >
                      تواصل مع قسم التصميم الهندسي &larr;
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/50"
              aria-label="بحث"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-accent/50 border border-border/50 hover:bg-accent transition-colors"
              aria-label="تبديل الثيم"
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
              aria-label="بحث"
            >
              <Search className="w-6 h-6" />
            </button>

            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="القائمة"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
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
                  placeholder="ابحث في 100+ منتج..."
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
                          لا توجد منتجات تطابق بحثك
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
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants} layout>
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
                                {link.subItems?.map((sub, i) => (
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

      {/* Full Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex items-start justify-center pt-24 md:pt-32 px-4"
          >
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
              <div className="relative group">
                <input
                  type="text"
                  onKeyDown={handleSearch}
                  placeholder="ابحث عن مظلة، برجولة..."
                  className="w-full bg-accent border border-border rounded-2xl py-4 md:py-6 pr-12 pl-14 md:pr-16 md:pl-6 text-lg md:text-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all shadow-2xl text-right"
                  autoFocus
                />
                <Search className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import { searchProducts, type Product } from "@/lib/api";
// import { useRouter, usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu,
//   X,
//   ChevronDown,
//   Sun,
//   Moon,
//   Umbrella,
//   Tent,
//   Cpu,
//   Search,
//   Loader2,
//   ArrowLeft,
//   Home,
//   Package,
//   Briefcase,
//   Users,
//   Factory,
//   BookOpen,
//   CalendarCheck,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // بيانات القائمة
// const navLinks = [
//   { name: "الرئيسية", href: "/", icon: Home },
//   {
//     name: "المنتجات",
//     href: "/products",
//     isMega: true,
//     icon: Package,
//     subItems: [
//       {
//         title: "مظلات السيارات",
//         href: "/products/cars",
//         icon: Umbrella,
//         desc: "حماية فائقة وعزل حراري",
//       },
//       {
//         title: "البرجولات والحدائق",
//         href: "/products/pergolas",
//         icon: Tent,
//         desc: "تصاميم خشبية ومعدنية مودرن",
//       },
//       {
//         title: "الأنظمة الذكية",
//         href: "/products/smart",
//         icon: Cpu,
//         desc: "تحكم عن بعد ومستشعرات طقس",
//       },
//       {
//         title: "السواتر والخصوصية",
//         href: "/products/screens",
//         icon: Sun,
//         desc: "حلول خصوصية بلمسة جمالية",
//       },
//     ],
//   },
//   { name: "بوابة العملاء", href: "/portal", icon: Users },
//   { name: "المشاريع", href: "/projects", icon: Briefcase },
//   { name: "عن المصنع", href: "/about", icon: Factory },
//   { name: "الأكاديمية", href: "/academy", icon: BookOpen },
// ];

// // حركات الأنيميشن
// const menuVariants = {
//   open: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 30,
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
//   closed: {
//     x: "100%",
//     opacity: 0,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 30,
//       staggerChildren: 0.05,
//       staggerDirection: -1,
//     },
//   },
// };

// const itemVariants = {
//   open: {
//     y: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 300, damping: 24 },
//   },
//   closed: {
//     y: 20,
//     opacity: 0,
//     transition: { duration: 0.2 },
//   },
// };

// export function Header() {
//   // 1. حل مشكلة الـ Hydration (تأكد من التحميل)
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeMegaMenu, setActiveMegaMenu] = useState<boolean>(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
//   const pathname = usePathname();

//   // Search States
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<Product[]>([]);
//   const [isSearching, setIsSearching] = useState(false);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(async () => {
//       if (query.trim().length > 1) {
//         setIsSearching(true);
//         const data = await searchProducts(query);
//         setResults(data);
//         setIsSearching(false);
//       } else {
//         setResults([]);
//       }
//     }, 300);
//     return () => clearTimeout(delayDebounceFn);
//   }, [query]);

//   const router = useRouter();
//   const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       const term = (e.target as HTMLInputElement).value;
//       if (term.trim()) {
//         setIsSearchOpen(false);
//         setIsMobileMenuOpen(false);
//         router.push(`/search?q=${encodeURIComponent(term)}`);
//       }
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <motion.header
//         className={cn(
//           "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
//           isScrolled
//             ? "bg-background/80 backdrop-blur-xl border-border/50 py-3 "
//             : "bg-transparent py-5"
//         )}
//         // className={cn(
//         //           "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
//         //           isScrolled
//         //             ? "bg-black/60 backdrop-blur-xl border-white/10 py-3"
//         //             : "bg-transparent py-5"
//         //         )}
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="container mx-auto px-4 flex items-center justify-between">
//           {/* Logo Section */}
//           <Link
//             href="/"
//             className="relative z-50 flex items-center gap-2 group"
//           >
//             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-105 transition-transform">
//               ع
//             </div>
//             <span className="text-xl font-bold text-foreground tracking-tighter">
//               العزيزية{" "}
//               <span className="text-primary font-normal text-sm opacity-90">
//                 للحلول الذكية
//               </span>
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav
//             className="hidden md:flex items-center gap-1 relative"
//             onMouseLeave={() => {
//               setHoveredIndex(null);
//               setActiveMegaMenu(false);
//             }}
//           >
//             {navLinks.map((link, index) => (
//               <div
//                 key={link.name}
//                 className="relative px-4 py-2"
//                 onMouseEnter={() => {
//                   setHoveredIndex(index);
//                   if (link.isMega) setActiveMegaMenu(true);
//                   else setActiveMegaMenu(false);
//                 }}
//               >
//                 <Link
//                   href={link.href}
//                   className={cn(
//                     "relative z-10 text-base font-bold transition-colors duration-300 flex items-center gap-1",
//                     pathname === link.href
//                       ? "text-primary"
//                       : "text-foreground/80 hover:text-primary"
//                   )}
//                 >
//                   {link.name}
//                   {link.isMega && (
//                     <ChevronDown
//                       className={cn(
//                         "w-3 h-3 transition-transform duration-300",
//                         activeMegaMenu ? "rotate-180" : ""
//                       )}
//                     />
//                   )}
//                   {pathname === link.href && (
//                     <motion.span
//                       layoutId="activeNav"
//                       className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_currentColor]"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   )}
//                 </Link>

//                 {/* Hover Background Effect */}
//                 {hoveredIndex === index && (
//                   <motion.div
//                     layoutId="nav-hover"
//                     className="absolute inset-0 bg-accent/50 rounded-lg -z-0"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   />
//                 )}
//               </div>
//             ))}

//             {/* Visual Mega Menu Dropdown */}
//             <AnimatePresence>
//               {activeMegaMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 15, height: 0 }}
//                   animate={{ opacity: 1, y: 0, height: "auto" }}
//                   exit={{ opacity: 0, y: 15, height: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute top-full right-0 w-[600px] bg-popover/95 backdrop-blur-2xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl mt-2 p-6 grid grid-cols-2 gap-4 text-popover-foreground"
//                 >
//                   {navLinks
//                     .find((l) => l.isMega)
//                     ?.subItems?.map((item) => (
//                       <Link
//                         key={item.title}
//                         href={item.href}
//                         className="group flex items-start gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors"
//                       >
//                         <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                           <item.icon className="w-6 h-6 text-foreground group-hover:text-primary" />
//                         </div>
//                         <div>
//                           <h4 className="text-foreground font-medium mb-1 group-hover:text-primary transition-colors">
//                             {item.title}
//                           </h4>
//                           <p className="text-xs text-muted-foreground">
//                             {item.desc}
//                           </p>
//                         </div>
//                       </Link>
//                     ))}

//                   <div className="col-span-2 mt-2 pt-4 border-t border-border/50 flex justify-between items-center">
//                     <span className="text-xs text-muted-foreground">
//                       هل تبحث عن تصميم خاص؟
//                     </span>
//                     <Link
//                       href="/custom"
//                       className="text-xs text-primary hover:underline font-bold"
//                     >
//                       تواصل مع قسم التصميم الهندسي &larr;
//                     </Link>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </nav>

//           {/* Right Actions */}
//           <div className="hidden md:flex items-center gap-4">
//             <button
//               onClick={() => setIsSearchOpen(true)}
//               className="text-foreground/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/50"
//               aria-label="بحث"
//             >
//               <Search className="w-5 h-5" />
//             </button>

//             {/* Theme Toggle Button - Fix Hydration */}
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 rounded-full bg-accent/50 border border-border/50 hover:bg-accent transition-colors"
//               aria-label="تبديل الثيم"
//             >
//               {/* لا ترسم الأيقونة إلا بعد التأكد من تحميل الصفحة */}
//               {mounted ? (
//                 theme === "dark" ? (
//                   <Sun className="h-5 w-5 text-yellow-400" />
//                 ) : (
//                   <Moon className="h-5 w-5 text-indigo-500" />
//                 )
//               ) : (
//                 <div className="w-5 h-5" /> // مكان فارغ مؤقت لمنع القفزة
//               )}
//             </button>

//             {/* 2. إصلاح مشكلة الزر داخل الرابط (Button inside Link) */}
//             <Link href="/contact">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-bold hover:bg-foreground/90 transition-colors flex items-center gap-2 cursor-pointer"
//               >
//                 <span>اطلب عرض سعر</span>
//                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               </motion.div>
//             </Link>
//           </div>

//           {/* Mobile Actions */}
//           <div className="flex md:hidden items-center gap-3">
//             <button
//               onClick={() => setIsSearchOpen(true)}
//               className="p-2 text-foreground hover:text-primary transition-colors"
//               aria-label="بحث"
//             >
//               <Search className="w-6 h-6" />
//             </button>

//             <button
//               className="p-2 text-foreground"
//               onClick={() => setIsMobileMenuOpen(true)}
//               aria-label="القائمة"
//             >
//               <Menu className="w-7 h-7" />
//             </button>
//           </div>
//         </div>
//       </motion.header>

//       {/* Mobile Navigation Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial="closed"
//             animate="open"
//             exit="closed"
//             variants={menuVariants}
//             className="fixed inset-0 z-50 bg-white/90 dark:bg-[#020617]/70 backdrop-blur-xl border-r border-border/50 md:hidden flex flex-col overflow-hidden text-foreground"
//           >
//             <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

//             <motion.div
//               variants={itemVariants}
//               className="flex items-center justify-between p-6 relative z-10"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
//                   ع
//                 </div>
//                 <span className="text-lg font-bold text-foreground">
//                   القائمة الرئيسية
//                 </span>
//               </div>
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="p-2 rounded-full bg-accent border border-border text-foreground hover:bg-accent/80 transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </motion.div>

//             {/* Mobile Search Input */}
//             <motion.div
//               variants={itemVariants}
//               className="px-6 mb-6 relative z-20"
//             >
//               <div className="relative group">
//                 <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="ابحث في 100+ منتج..."
//                   className="relative w-full bg-accent/50 border border-border rounded-xl py-3.5 pr-11 pl-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-accent transition-all text-base shadow-sm"
//                 />
//                 <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
//                   {isSearching ? (
//                     <Loader2 className="w-5 h-5 animate-spin text-primary" />
//                   ) : (
//                     <Search className="w-5 h-5 group-focus-within:text-primary transition-colors" />
//                   )}
//                 </div>

//                 <AnimatePresence>
//                   {(results.length > 0 ||
//                     (query.length > 1 &&
//                       results.length === 0 &&
//                       !isSearching)) && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl overflow-hidden shadow-xl z-50 max-h-60 overflow-y-auto"
//                     >
//                       {results.length > 0 ? (
//                         <div className="divide-y divide-border">
//                           {results.map((product) => (
//                             <Link
//                               key={product.id}
//                               href={`/products/${product.id}`}
//                               onClick={() => setIsMobileMenuOpen(false)}
//                               className="flex items-center gap-3 p-3 hover:bg-accent transition-colors group"
//                             >
//                               <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center border border-border shrink-0">
//                                 <Package className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <h4 className="text-sm font-bold text-foreground group-hover:text-primary truncate transition-colors">
//                                   {product.title}
//                                 </h4>
//                                 <div className="flex items-center justify-between mt-0.5">
//                                   <span className="text-[10px] text-muted-foreground truncate">
//                                     {product.category}
//                                   </span>
//                                   <span className="text-xs font-bold text-primary">
//                                     {product.price} ر.س
//                                   </span>
//                                 </div>
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="p-4 text-center text-muted-foreground text-sm">
//                           لا توجد منتجات تطابق بحثك
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>

//             {/* Mobile Links */}
//             <div className="flex-1 overflow-y-auto px-4 pb-6 relative z-10 no-scrollbar">
//               <div className="flex flex-col space-y-3">
//                 {navLinks.map((link) => (
//                   <motion.div key={link.name} variants={itemVariants} layout>
//                     {link.isMega ? (
//                       <div
//                         className={cn(
//                           "border rounded-xl transition-all duration-300 overflow-hidden",
//                           mobileSubmenu === link.name
//                             ? "bg-accent/30 border-primary/30"
//                             : "bg-transparent border-transparent"
//                         )}
//                       >
//                         <button
//                           onClick={() =>
//                             setMobileSubmenu(
//                               mobileSubmenu === link.name ? null : link.name
//                             )
//                           }
//                           className="w-full flex items-center justify-between p-4 text-foreground active:bg-accent/50 transition-colors"
//                         >
//                           <div className="flex items-center gap-4">
//                             {link.icon && (
//                               <link.icon className="w-5 h-5 text-muted-foreground" />
//                             )}
//                             <span className="text-xl font-bold flex items-center gap-3">
//                               {link.name}
//                               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
//                             </span>
//                           </div>
//                           <ChevronDown
//                             className={cn(
//                               "w-5 h-5 transition-transform",
//                               mobileSubmenu === link.name
//                                 ? "rotate-180 text-primary"
//                                 : "text-muted-foreground"
//                             )}
//                           />
//                         </button>

//                         <AnimatePresence>
//                           {mobileSubmenu === link.name && (
//                             <motion.div
//                               initial={{ height: 0, opacity: 0 }}
//                               animate={{ height: "auto", opacity: 1 }}
//                               exit={{ height: 0, opacity: 0 }}
//                             >
//                               <div className="px-4 pb-4 pt-1 space-y-1">
//                                 {link.subItems?.map((sub, i) => (
//                                   <Link
//                                     key={sub.title}
//                                     href={sub.href}
//                                     onClick={() => setIsMobileMenuOpen(false)}
//                                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all group"
//                                   >
//                                     <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
//                                       <sub.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
//                                     </div>
//                                     <div>
//                                       <div className="text-base font-medium text-foreground group-hover:text-primary">
//                                         {sub.title}
//                                       </div>
//                                       <div className="text-[10px] text-muted-foreground">
//                                         {sub.desc}
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 ))}
//                               </div>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </div>
//                     ) : (
//                       <Link
//                         href={link.href}
//                         onClick={() => setIsMobileMenuOpen(false)}
//                         className="flex items-center gap-4 p-4 rounded-xl text-lg font-bold text-foreground/80 hover:text-primary hover:bg-accent/50 transition-all"
//                       >
//                         {link.icon && (
//                           <link.icon className="w-5 h-5 text-muted-foreground" />
//                         )}
//                         <span>{link.name}</span>
//                       </Link>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Footer CTA */}
//             <motion.div
//               variants={itemVariants}
//               className="p-6 border-t border-border bg-background/80 backdrop-blur-md relative z-10"
//             >
//               <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
//                 <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 active:scale-95">
//                   <CalendarCheck className="w-5 h-5" />
//                   <span>احجز موعد المعاينة</span>
//                 </button>
//               </Link>

//               {/* روابط سريعة في الأسفل */}
//               <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-white/40">
//                 <Link
//                   href="/privacy"
//                   className="hover:text-white transition-colors"
//                 >
//                   سياسة الخصوصية
//                 </Link>
//                 <span>•</span>
//                 <Link
//                   href="/terms"
//                   className="hover:text-white transition-colors"
//                 >
//                   الشروط والأحكام
//                 </Link>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Full Screen Search Overlay */}
//       {/* Search Overlay - نافذة البحث المحسنة للجوال */}
//       <AnimatePresence>
//         {isSearchOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             // تم تعديل pt-32 إلى pt-24 للجوال لتظهر في مكان مناسب
//             className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex items-start justify-center pt-24 md:pt-32 px-4"
//           >
//             {/* زر الإغلاق */}
//             <button
//               onClick={() => setIsSearchOpen(false)}
//               className="absolute top-6 left-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
//             >
//               <X className="w-6 h-6 md:w-8 md:h-8" />
//             </button>

//             <motion.div
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="w-full max-w-3xl relative"
//             >
//               {/* عنوان توجيهي يظهر فقط في الجوال */}
//               <p className="md:hidden text-white/40 text-sm mb-4 text-center">
//                 اضغط للبحث الصوتي أو اكتب ما تريد
//               </p>

//               {/* حقل البحث */}
//               <div className="relative group">
//                 <input
//                   type="text"
//                   onKeyDown={handleSearch}
//                   placeholder="ابحث عن مظلة، برجولة..."
//                   className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 md:py-6 pr-12 pl-14 md:pr-16 md:pl-6 text-lg md:text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/15 transition-all shadow-2xl text-right"
//                   autoFocus
//                 />
//                 {/* أيقونة البحث (يمين) */}
//                 <Search className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 md:w-6 md:h-6 group-focus-within:text-primary transition-colors" />

//                 {/* أدوات البحث الذكي (يسار) - تم تحسين حجمها للجوال */}
//                 <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
//                   <button className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-primary transition-colors">
//                     {/* أيقونة الكاميرا */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
//                       <circle cx="9" cy="9" r="2" />
//                       <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
//                     </svg>
//                   </button>
//                   <button className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-primary transition-colors">
//                     {/* أيقونة الميكروفون */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
//                       <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//                       <line x1="12" x2="12" y1="19" y2="22" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {/* الاقتراحات السريعة - متجاوبة مع الجوال */}
//               <div className="mt-6 md:mt-8 px-1">
//                 <h3 className="text-white/40 text-xs md:text-sm font-medium mb-3 md:mb-4">
//                   الأكثر طلباً:
//                 </h3>
//                 <div className="flex flex-wrap gap-2 md:gap-3">
//                   {[
//                     "مظلات سيارات",
//                     "سواتر مودرن",
//                     "برجولات خشبية",
//                     "عروض اليوم",
//                   ].map((tag) => (
//                     <button
//                       key={tag}
//                       className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/5 hover:border-primary/50 text-white/70 hover:text-white text-xs md:text-sm transition-all active:scale-95"
//                     >
//                       {tag}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { useTheme } from "next-themes";
// // import { searchProducts, type Product } from "@/lib/api"; // تأكد أن المسار صحيح

// // import { useRouter, usePathname } from "next/navigation";
// // import { motion, AnimatePresence, type Variants } from "framer-motion";
// // import {
// //   Menu,
// //   X,
// //   ChevronDown,
// //   Sun,
// //   Moon,
// //   Umbrella,
// //   Tent,
// //   Cpu,
// //   Search,
// //   Loader2,
// //   ArrowLeft,
// //   Home,
// //   Package,
// //   Briefcase,
// //   Users,
// //   Factory,
// //   BookOpen,
// //   CalendarCheck,
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // // 1. تعريف بيانات القائمة (Navigation Data)
// // const navLinks = [
// //   { name: "الرئيسية", href: "/", icon: Home },
// //   {
// //     name: "المنتجات",
// //     href: "/products",
// //     isMega: true, // مؤشر لتفعيل القائمة الكبيرة
// //     icon: Package,
// //     subItems: [
// //       {
// //         title: "مظلات السيارات",
// //         href: "/products/cars",
// //         icon: Umbrella,
// //         desc: "حماية فائقة وعزل حراري",
// //       },
// //       {
// //         title: "البرجولات والحدائق",
// //         href: "/products/pergolas",
// //         icon: Tent,
// //         desc: "تصاميم خشبية ومعدنية مودرن",
// //       },
// //       {
// //         title: "الأنظمة الذكية",
// //         href: "/products/smart",
// //         icon: Cpu,
// //         desc: "تحكم عن بعد ومستشعرات طقس",
// //       },
// //       {
// //         title: "السواتر والخصوصية",
// //         href: "/products/screens",
// //         icon: Sun,
// //         desc: "حلول خصوصية بلمسة جمالية",
// //       },
// //     ],
// //   },
// //   { name: "بوابة العملاء", href: "/portal", icon: Users },
// //   { name: "المشاريع", href: "/projects", icon: Briefcase },
// //   { name: "عن المصنع", href: "/about", icon: Factory },
// //   { name: "الأكاديمية", href: "/academy", icon: BookOpen }, // المدونة سابقاً
// // ];
// // // تعريف حركات القائمة (خارج المكون الرئيسي أو داخله)
// // const menuVariants = {
// //   open: {
// //     x: 0,
// //     opacity: 1,
// //     transition: {
// //       type: "spring",
// //       stiffness: 300,
// //       damping: 30,
// //       staggerChildren: 0.1, // كل عنصر يتأخر 0.1 ثانية عن الذي قبله
// //       delayChildren: 0.2,
// //     },
// //   },
// //   closed: {
// //     x: "100%",
// //     opacity: 0,
// //     transition: {
// //       type: "spring",
// //       stiffness: 300,
// //       damping: 30,
// //       staggerChildren: 0.05,
// //       staggerDirection: -1,
// //     },
// //   },
// // };

// // const itemVariants = {
// //   open: {
// //     y: 0,
// //     opacity: 1,
// //     transition: { type: "spring", stiffness: 300, damping: 24 },
// //   },
// //   closed: {
// //     y: 20,
// //     opacity: 0,
// //     transition: { duration: 0.2 },
// //   },
// // };

// // export function Header() {
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [activeMegaMenu, setActiveMegaMenu] = useState<boolean>(false);
// //   const [isSearchOpen, setIsSearchOpen] = useState(false); // حالة البحث
// //   const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
// //   const pathname = usePathname();

// //   // داخل مكون Header:
// //   const { theme, setTheme } = useTheme();

// //   // States جديدة للبحث اللحظي
// //   const [query, setQuery] = useState("");
// //   const [results, setResults] = useState<Product[]>([]);
// //   const [isSearching, setIsSearching] = useState(false);

// //   // دالة البحث اللحظي (Debounced Search)
// //   useEffect(() => {
// //     const delayDebounceFn = setTimeout(async () => {
// //       if (query.trim().length > 1) {
// //         // ابدأ البحث بعد حرفين
// //         setIsSearching(true);
// //         // هنا نستدعي دالة البحث (سواء وهمية أو حقيقية)
// //         const data = await searchProducts(query);
// //         setResults(data);
// //         setIsSearching(false);
// //       } else {
// //         setResults([]);
// //       }
// //     }, 300); // انتظار 300ms بعد توقف الكتابة لتقليل الطلبات

// //     return () => clearTimeout(delayDebounceFn);
// //   }, [query]);

// //   const router = useRouter();
// //   // دالة لتنفيذ البحث
// //   const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === "Enter") {
// //       const term = (e.target as HTMLInputElement).value;
// //       if (term.trim()) {
// //         setIsSearchOpen(false); // إغلاق نافذة البحث
// //         setIsMobileMenuOpen(false); // إغلاق قائمة الجوال إذا كانت مفتوحة
// //         router.push(`/search?q=${encodeURIComponent(term)}`);
// //       }
// //     }
// //   };

// //   // تأثير تغيير الخلفية عند التمرير
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 20);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   return (
// //     <>
// //       <motion.header
// //         className={cn(
// //           "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
// //           isScrolled
// //             ? "bg-black/60 backdrop-blur-xl border-white/10 py-3"
// //             : "bg-transparent py-5"
// //         )}
// //         initial={{ y: -100 }}
// //         animate={{ y: 0 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         <div className="container mx-auto px-4 flex items-center justify-between">
// //           {/* Logo Section */}
// //           <Link
// //             href="/"
// //             className="relative z-50 flex items-center gap-2 group"
// //           >
// //             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xl group-hover:scale-105 transition-transform">
// //               ع
// //             </div>
// //             <span className="text-xl font-bold text-white tracking-tighter">
// //               العزيزية{" "}
// //               <span className="text-primary font-normal text-sm opacity-80">
// //                 للحلول الذكية
// //               </span>
// //             </span>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <nav
// //             className="hidden md:flex items-center gap-1 relative"
// //             onMouseLeave={() => {
// //               setHoveredIndex(null);
// //               setActiveMegaMenu(false);
// //             }}
// //           >
// //             {navLinks.map((link, index) => (
// //               <div
// //                 key={link.name}
// //                 className="relative px-4 py-2"
// //                 onMouseEnter={() => {
// //                   setHoveredIndex(index);
// //                   if (link.isMega) setActiveMegaMenu(true);
// //                   else setActiveMegaMenu(false);
// //                 }}
// //               >
// //                 <Link
// //                   href={link.href}
// //                   className={cn(
// //                     // 1. غيرنا text-sm إلى text-base (ليصبح 16px)
// //                     // 2. غيرنا font-medium إلى font-bold (ليكون الخط عريضاً وواضحاً)
// //                     "relative z-10 text-base font-bold transition-colors duration-300 flex items-center gap-1",

// //                     pathname === link.href
// //                       ? "text-primary" // إذا نشط: لونه ذهبي
// //                       : "text-foreground/80 hover:text-primary" // إذا غير نشط: لون النص العادي (بدل الأبيض الثابت)
// //                   )}
// //                 >
// //                   {link.name}
// //                   {link.isMega && (
// //                     <ChevronDown
// //                       className={cn(
// //                         "w-3 h-3 transition-transform duration-300",
// //                         activeMegaMenu ? "rotate-180" : ""
// //                       )}
// //                     />
// //                   )}
// //                   {pathname === link.href && (
// //                     <motion.span
// //                       layoutId="activeNav"
// //                       className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#D4AF37]"
// //                       initial={{ opacity: 0 }}
// //                       animate={{ opacity: 1 }}
// //                       transition={{ duration: 0.3 }}
// //                     />
// //                   )}
// //                 </Link>

// //                 {/* Hover Background Effect */}
// //                 {hoveredIndex === index && (
// //                   <motion.div
// //                     layoutId="nav-hover"
// //                     className="absolute inset-0 bg-white/10 rounded-lg -z-0"
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     exit={{ opacity: 0 }}
// //                   />
// //                 )}
// //               </div>
// //             ))}

// //             {/* Visual Mega Menu Dropdown */}
// //             <AnimatePresence>
// //               {activeMegaMenu && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 15, height: 0 }}
// //                   animate={{ opacity: 1, y: 0, height: "auto" }}
// //                   exit={{ opacity: 0, y: 15, height: 0 }}
// //                   transition={{ duration: 0.2 }}
// //                   className="absolute top-full right-0 w-[600px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl mt-2 p-6 grid grid-cols-2 gap-4"
// //                 >
// //                   {navLinks
// //                     .find((l) => l.isMega)
// //                     ?.subItems?.map((item) => (
// //                       <Link
// //                         key={item.title}
// //                         href={item.href}
// //                         className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
// //                       >
// //                         <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
// //                           <item.icon className="w-6 h-6 text-white group-hover:text-primary" />
// //                         </div>
// //                         <div>
// //                           <h4 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">
// //                             {item.title}
// //                           </h4>
// //                           <p className="text-xs text-gray-400">{item.desc}</p>
// //                         </div>
// //                       </Link>
// //                     ))}

// //                   {/* Call to Action inside Menu */}
// //                   <div className="col-span-2 mt-2 pt-4 border-t border-white/10 flex justify-between items-center">
// //                     <span className="text-xs text-gray-400">
// //                       هل تبحث عن تصميم خاص؟
// //                     </span>
// //                     <Link
// //                       href="/custom"
// //                       className="text-xs text-primary hover:underline"
// //                     >
// //                       تواصل مع قسم التصميم الهندسي &larr;
// //                     </Link>
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </nav>

// //           {/* Right Actions */}
// //           <div className="hidden md:flex items-center gap-4">
// //             <button
// //               onClick={() => setIsSearchOpen(true)}
// //               className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
// //             >
// //               <Search className="w-5 h-5" />
// //             </button>

// //             <button
// //               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
// //               className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
// //             >
// //               <span className="sr-only">تبديل الثيم</span>
// //               {/* عرض أيقونة الشمس إذا كان ليلي، والقمر إذا كان نهاري */}
// //               {theme === "dark" ? (
// //                 <Sun className="h-5 w-5 text-yellow-400" />
// //               ) : (
// //                 <Moon className="h-5 w-5 text-indigo-500" />
// //               )}
// //             </button>
// //             <Link href="/contact">
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
// //               >
// //                 <span>اطلب عرض سعر</span>
// //                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
// //               </motion.button>
// //             </Link>
// //           </div>

// //           {/* Mobile Menu Toggle */}
// //           {/* Mobile Actions - أزرار الجوال (بحث + قائمة) */}
// //           <div className="flex md:hidden items-center gap-3">
// //             {/* زر البحث للجوال */}
// //             <button
// //               onClick={() => setIsSearchOpen(true)}
// //               className="p-2 text-white/90 hover:text-white transition-colors"
// //               aria-label="بحث"
// //             >
// //               <Search className="w-6 h-6" />
// //             </button>

// //             {/* زر القائمة */}
// //             <button
// //               className="p-2 text-white"
// //               onClick={() => setIsMobileMenuOpen(true)}
// //               aria-label="القائمة"
// //             >
// //               <Menu className="w-7 h-7" />
// //             </button>
// //           </div>
// //         </div>
// //       </motion.header>

// //       {/* Mobile Navigation Menu - واجهة الجوال الاحترافية */}

// //       <AnimatePresence>
// //         {isMobileMenuOpen && (
// //           <motion.div
// //             initial="closed"
// //             animate="open"
// //             exit="closed"
// //             variants={menuVariants}
// //             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl border-r border-white/10 md:hidden flex flex-col overflow-hidden"
// //           >
// //             {/* 0. خلفية جمالية (إضاءات خافتة لعمق بصري) */}
// //             <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none opacity-50" />
// //             <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none opacity-50" />

// //             {/* 1. رأس القائمة */}
// //             <motion.div
// //               variants={itemVariants}
// //               className="flex items-center justify-between p-6 relative z-10"
// //             >
// //               <div className="flex items-center gap-2">
// //                 <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-black font-bold">
// //                   ع
// //                 </div>
// //                 <span className="text-lg font-bold text-white">
// //                   القائمة الرئيسية
// //                 </span>
// //               </div>
// //               <button
// //                 onClick={() => setIsMobileMenuOpen(false)}
// //                 className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-colors active:scale-90"
// //               >
// //                 <X className="w-6 h-6" />
// //               </button>
// //             </motion.div>

// //             {/* 2. حقل البحث (بتصميم بارز) */}
// //             {/* 2. حقل البحث الذكي (مع النتائج اللحظية) */}
// //             <motion.div
// //               variants={itemVariants}
// //               className="px-6 mb-6 relative z-20"
// //             >
// //               {" "}
// //               {/* زدنا z-index ليكون فوق الروابط */}
// //               <div className="relative group">
// //                 {/* تأثير التوهج الخلفي */}
// //                 <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

// //                 <input
// //                   type="text"
// //                   value={query}
// //                   onChange={(e) => setQuery(e.target.value)}
// //                   placeholder="ابحث في 100+ منتج..."
// //                   className="relative w-full bg-white/10 border border-white/10 rounded-xl py-3.5 pr-11 pl-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all text-base shadow-lg"
// //                 />

// //                 {/* أيقونة التحميل أو البحث */}
// //                 <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50">
// //                   {isSearching ? (
// //                     <Loader2 className="w-5 h-5 animate-spin text-primary" />
// //                   ) : (
// //                     <Search className="w-5 h-5 group-focus-within:text-primary transition-colors" />
// //                   )}
// //                 </div>

// //                 {/* === قائمة النتائج المنسدلة (Overlay) === */}
// //                 <AnimatePresence>
// //                   {(results.length > 0 ||
// //                     (query.length > 1 &&
// //                       results.length === 0 &&
// //                       !isSearching)) && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0, y: -10 }}
// //                       className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto"
// //                     >
// //                       {results.length > 0 ? (
// //                         <div className="divide-y divide-white/5">
// //                           {results.map((product) => (
// //                             <Link
// //                               key={product.id}
// //                               href={`/products/${product.id}`}
// //                               onClick={() => setIsMobileMenuOpen(false)} // إغلاق القائمة عند الاختيار
// //                               className="flex items-center gap-3 p-3 hover:bg-white/10 transition-colors group"
// //                             >
// //                               {/* الأيقونة (أو صورة مصغرة) */}
// //                               <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors shrink-0">
// //                                 {/* هنا نستخدم أيقونة عامة، أو يمكنك وضع صورة المنتج */}
// //                                 <Package className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
// //                               </div>

// //                               {/* تفاصيل المنتج */}
// //                               <div className="flex-1 min-w-0">
// //                                 <h4 className="text-sm font-bold text-white group-hover:text-primary truncate transition-colors">
// //                                   {product.title}
// //                                 </h4>
// //                                 <div className="flex items-center justify-between mt-0.5">
// //                                   <span className="text-[10px] text-white/40 truncate">
// //                                     {product.category}
// //                                   </span>
// //                                   <span className="text-xs font-bold text-primary">
// //                                     {product.price} ر.س
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                             </Link>
// //                           ))}

// //                           {/* زر مشاهدة كل النتائج */}
// //                           <Link
// //                             href={`/search?q=${query}`}
// //                             onClick={() => setIsMobileMenuOpen(false)}
// //                             className="block text-center py-3 text-xs text-white/50 hover:text-white hover:bg-white/5 transition-colors"
// //                           >
// //                             مشاهدة جميع النتائج ({results.length})
// //                           </Link>
// //                         </div>
// //                       ) : (
// //                         // حالة عدم العثور على نتائج
// //                         <div className="p-4 text-center text-white/40 text-sm">
// //                           لا توجد منتجات تطابق بحثك
// //                         </div>
// //                       )}
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </div>
// //             </motion.div>

// //             {/* 3. الروابط (مع حركة التتابع) */}
// //             <div className="flex-1 overflow-y-auto px-4 pb-6 relative z-10 no-scrollbar">
// //               <div className="flex flex-col space-y-3">
// //                 {navLinks.map((link, index) => (
// //                   <motion.div key={link.name} variants={itemVariants} layout>
// //                     {link.isMega ? (
// //                       // Accordion بتصميم عصري
// //                       <div
// //                         className={cn(
// //                           "border rounded-xl transition-all duration-300 overflow-hidden",
// //                           mobileSubmenu === link.name
// //                             ? "bg-white/[0.03] border-primary/30 shadow-[0_0_15px_-5px_rgba(212,175,55,0.1)]"
// //                             : "bg-transparent border-transparent"
// //                         )}
// //                       >
// //                         <button
// //                           onClick={() =>
// //                             setMobileSubmenu(
// //                               mobileSubmenu === link.name ? null : link.name
// //                             )
// //                           }
// //                           className="w-full flex items-center justify-between p-4 text-white active:bg-white/5 transition-colors"
// //                         >
// //                           {/* التعديل هنا: وضعنا الأيقونة والنص داخل حاوية div */}
// //                           <div className="flex items-center gap-4">
// //                             {/* كود عرض الأيقونة للمنتجات */}
// //                             {link.icon && (
// //                               <link.icon className="w-5 h-5 text-white/50" />
// //                             )}

// //                             <span className="text-xl font-bold flex items-center gap-3">
// //                               {link.name}
// //                               {/* نقطة التنبيه الذهبية */}
// //                               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
// //                             </span>
// //                           </div>

// //                           <div
// //                             className={cn(
// //                               "p-1 rounded-full bg-white/5 transition-all duration-300",
// //                               mobileSubmenu === link.name
// //                                 ? "bg-primary text-black rotate-180"
// //                                 : "text-white/50"
// //                             )}
// //                           >
// //                             <ChevronDown className="w-5 h-5" />
// //                           </div>
// //                         </button>

// //                         {/* القائمة الفرعية */}
// //                         <AnimatePresence>
// //                           {mobileSubmenu === link.name && (
// //                             <motion.div
// //                               initial={{ height: 0, opacity: 0 }}
// //                               animate={{ height: "auto", opacity: 1 }}
// //                               exit={{ height: 0, opacity: 0 }}
// //                             >
// //                               <div className="px-4 pb-4 pt-1 space-y-1">
// //                                 {link.subItems?.map((sub, i) => (
// //                                   <motion.div
// //                                     key={sub.title}
// //                                     initial={{ x: -10, opacity: 0 }}
// //                                     animate={{ x: 0, opacity: 1 }}
// //                                     transition={{ delay: i * 0.05 }}
// //                                   >
// //                                     <Link
// //                                       href={sub.href}
// //                                       onClick={() => setIsMobileMenuOpen(false)}
// //                                       className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 active:bg-white/10 transition-all border border-transparent hover:border-white/5 group"
// //                                     >
// //                                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
// //                                         <sub.icon className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
// //                                       </div>
// //                                       <div className="flex-1">
// //                                         <div className="text-base font-medium text-white group-hover:text-primary transition-colors">
// //                                           {sub.title}
// //                                         </div>
// //                                         <div className="text-[10px] text-white/40 line-clamp-1">
// //                                           {sub.desc}
// //                                         </div>
// //                                       </div>
// //                                       <ArrowLeft className="w-4 h-4 text-white/20 group-hover:-translate-x-1 group-hover:text-primary transition-all" />
// //                                     </Link>
// //                                   </motion.div>
// //                                 ))}
// //                               </div>
// //                             </motion.div>
// //                           )}
// //                         </AnimatePresence>
// //                       </div>
// //                     ) : (
// //                       // رابط عادي بتصميم نظيف
// //                       <Link
// //                         href={link.href}
// //                         onClick={() => setIsMobileMenuOpen(false)}
// //                         className="flex items-center gap-4 p-4 rounded-xl text-lg font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all border border-transparent"
// //                       >
// //                         {/* عرض الأيقونة */}
// //                         {link.icon && (
// //                           <link.icon className="w-5 h-5 text-white/50" />
// //                         )}
// //                         <span>{link.name}</span>
// //                       </Link>
// //                     )}
// //                   </motion.div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* 4. تذييل القائمة (CTA) */}
// //             <motion.div
// //               variants={itemVariants}
// //               className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md relative z-10"
// //             >
// //               <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
// //                 <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-black font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-3 active:scale-95">
// //                   <CalendarCheck className="w-5 h-5" />
// //                   <span>احجز موعد المعاينة</span>
// //                 </button>
// //               </Link>

// //               {/* روابط سريعة في الأسفل */}
// //               <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-white/40">
// //                 <Link
// //                   href="/privacy"
// //                   className="hover:text-white transition-colors"
// //                 >
// //                   سياسة الخصوصية
// //                 </Link>
// //                 <span>•</span>
// //                 <Link
// //                   href="/terms"
// //                   className="hover:text-white transition-colors"
// //                 >
// //                   الشروط والأحكام
// //                 </Link>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Search Overlay - نافذة البحث المحسنة للجوال */}
// //       <AnimatePresence>
// //         {isSearchOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             // تم تعديل pt-32 إلى pt-24 للجوال لتظهر في مكان مناسب
// //             className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex items-start justify-center pt-24 md:pt-32 px-4"
// //           >
// //             {/* زر الإغلاق */}
// //             <button
// //               onClick={() => setIsSearchOpen(false)}
// //               className="absolute top-6 left-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
// //             >
// //               <X className="w-6 h-6 md:w-8 md:h-8" />
// //             </button>

// //             <motion.div
// //               initial={{ y: -20, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               className="w-full max-w-3xl relative"
// //             >
// //               {/* عنوان توجيهي يظهر فقط في الجوال */}
// //               <p className="md:hidden text-white/40 text-sm mb-4 text-center">
// //                 اضغط للبحث الصوتي أو اكتب ما تريد
// //               </p>

// //               {/* حقل البحث */}
// //               <div className="relative group">
// //                 <input
// //                   type="text"
// //                   onKeyDown={handleSearch}
// //                   placeholder="ابحث عن مظلة، برجولة..."
// //                   className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 md:py-6 pr-12 pl-14 md:pr-16 md:pl-6 text-lg md:text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/15 transition-all shadow-2xl text-right"
// //                   autoFocus
// //                 />

// //                 {/* أيقونة البحث (يمين) */}
// //                 <Search className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 md:w-6 md:h-6 group-focus-within:text-primary transition-colors" />

// //                 {/* أدوات البحث الذكي (يسار) - تم تحسين حجمها للجوال */}
// //                 <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
// //                   <button className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-primary transition-colors">
// //                     {/* أيقونة الكاميرا */}
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="20"
// //                       height="20"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
// //                       <circle cx="9" cy="9" r="2" />
// //                       <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
// //                     </svg>
// //                   </button>
// //                   <button className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-primary transition-colors">
// //                     {/* أيقونة الميكروفون */}
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="20"
// //                       height="20"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
// //                       <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
// //                       <line x1="12" x2="12" y1="19" y2="22" />
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* الاقتراحات السريعة - متجاوبة مع الجوال */}
// //               <div className="mt-6 md:mt-8 px-1">
// //                 <h3 className="text-white/40 text-xs md:text-sm font-medium mb-3 md:mb-4">
// //                   الأكثر طلباً:
// //                 </h3>
// //                 <div className="flex flex-wrap gap-2 md:gap-3">
// //                   {[
// //                     "مظلات سيارات",
// //                     "سواتر مودرن",
// //                     "برجولات خشبية",
// //                     "عروض اليوم",
// //                   ].map((tag) => (
// //                     <button
// //                       key={tag}
// //                       className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/5 hover:border-primary/50 text-white/70 hover:text-white text-xs md:text-sm transition-all active:scale-95"
// //                     >
// //                       {tag}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // }

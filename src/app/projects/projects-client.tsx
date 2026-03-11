/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  Image as ImageIcon,
  Sparkles,
  Grid3x3,
  Calendar,
  ChevronLeft,
  Search,
  X,
  Filter,
  LayoutGrid,
  List,
  TrendingUp,
  MapPin,
  CheckCircle,
  Award,
  Star,
  Eye,
  Clock,
  Phone,
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  ChevronDown,
  Sun,
  Moon,
  Umbrella,
  Shield,
  Wind,
  Camera,
  Users,
  ThumbsUp,
  Rocket,
  Headphones,
  Wrench,
  PenTool,
  Layers,
  Zap,
  Heart,
  Globe,
  Briefcase,
  Coffee,
} from "lucide-react";
import { ProjectData } from "@/lib/api";

interface Props {
  initialProjects: ProjectData[];
}

export function ProjectsClient({ initialProjects }: Props) {
  const [projects] = useState<ProjectData[]>(initialProjects || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // تأثيرات التمرير للهيدر
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);

  // استخراج جميع التصنيفات الفريدة
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((project) => {
      project.projectCategorys?.nodes?.forEach((cat) => {
        if (cat.name) cats.add(cat.name);
      });
    });
    return Array.from(cats);
  }, [projects]);

  // فلترة المشاريع حسب البحث والتصنيف
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.content?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        project.projectCategorys?.nodes?.some(
          (cat) => cat.name === selectedCategory,
        );

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  // إحصائيات المشاريع
  const stats = {
    total: projects.length,
    categories: categories.length,
    latest: projects[0]?.date || new Date().toISOString(),
  };

  // بيانات منظمة للسيو
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "معرض مشاريع العزيزية",
    description: "مجموعة متكاملة من مشاريع المظلات والسواتر والبرجولات",
    url: "https://alaziziah.com/projects",
    numberOfItems: stats.total,
    itemListElement: filteredProjects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      url: `https://alaziziah.com/projects/${project.slug}`,
      name: project.title,
      dateCreated: project.date,
    })),
  };

  return (
    <>
      {/* إضافة بيانات منظمة للسيو */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-background via-background/98 to-background">
        {/* ===== هيدر متطور وجذاب ===== */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden"
        >
          {/* خلفية متحركة متطورة */}
          <div className="absolute inset-0">
            {/* طبقات خلفية متحركة */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-[120px]"
            />

            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -45, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-60 -left-40 w-[900px] h-[900px] bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-[120px]"
            />

            {/* أيقونات متحركة في الخلفية */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute top-32 left-[10%] text-primary/10 hidden lg:block"
            >
              <Umbrella className="w-32 h-32" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 40, 0],
                x: [0, -30, 0],
                rotate: [0, -15, 15, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, delay: 1 }}
              className="absolute bottom-32 right-[15%] text-primary/10 hidden lg:block"
            >
              <Shield className="w-40 h-40" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/2 left-1/4 text-yellow-500/10"
            >
              <Sun className="w-24 h-24" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-40 right-1/3 text-blue-500/10"
            >
              <Wind className="w-28 h-28" />
            </motion.div>

            {/* جزيئات متحركة (Particles) */}
            {/* جزيئات بحركة خفيفة جداً */}
            {/* {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  // eslint-disable-next-line react-hooks/purity
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: 0.5,
                }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 5 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 bg-primary/10 rounded-full"
                style={{
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
              />
            ))} */}

            {/* شبكة هندسية متحركة */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="hero-grid"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <motion.circle
                      animate={{
                        r: [2, 4, 2],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                      cx="30"
                      cy="30"
                      r="2"
                      fill="currentColor"
                      className="text-primary"
                    />
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.3"
                      className="text-primary/30"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
              </svg>
            </div>
          </div>

          {/* المحتوى الرئيسي للهيدر */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="relative z-10 container mx-auto px-4 max-w-6xl text-center"
          >
            {/* شعار متحرك */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 1,
              }}
              className="w-28 h-28 bg-gradient-to-br from-primary to-primary-dark rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-primary/30 relative"
            >
              <span className="text-white font-black text-5xl">ع</span>

              {/* حلقة متحركة حول الشعار */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-primary/30 rounded-3xl"
              />
            </motion.div>

            {/* شارات التصنيف */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 backdrop-blur border border-primary/20 px-6 py-2.5 rounded-full">
                <Sparkles className="w-4 h-4" />
                معرض أعمالنا
              </span>

              <span className="inline-flex items-center gap-2 text-foreground text-sm bg-card/50 backdrop-blur border border-border px-6 py-2.5 rounded-full">
                <Grid3x3 className="w-4 h-4" />
                {stats.total} مشروع
              </span>

              <span className="inline-flex items-center gap-2 text-foreground text-sm bg-card/50 backdrop-blur border border-border px-6 py-2.5 rounded-full">
                <Camera className="w-4 h-4" />
                {stats.categories} تصنيف
              </span>
            </motion.div>

            {/* العنوان الرئيسي بتأثير كتابة */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-foreground mb-8"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="block"
              >
                مشاريعنا
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-primary/80 to-primary-dark block relative"
              >
                المنفذة
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-l from-primary to-transparent rounded-full mx-auto max-w-[300px]"
                />
              </motion.span>
            </motion.h1>

            {/* وصف متحرك */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12"
            >
              نفتخر بتقديم مجموعة متكاملة من المشاريع المميزة في مجال المظلات
              والسواتر والبرجولات، والتي تم تنفيذها بأعلى معايير الجودة
              والاحترافية
            </motion.p>

            {/* أزرار CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#projects"
                className="group relative px-10 py-5 bg-primary text-white rounded-2xl font-bold text-lg overflow-hidden shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  استعرض المشاريع
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              <Link
                href="#contact"
                className="px-10 py-5 bg-card/50 backdrop-blur border-2 border-primary/30 text-foreground rounded-2xl font-bold text-lg hover:bg-primary/10 transition-all hover:border-primary/50 shadow-xl"
              >
                تواصل معنا
              </Link>
            </motion.div>

            {/* إحصائيات سريعة في الهيدر */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16"
            >
              {[
                { value: "500+", label: "مشروع", icon: Briefcase },
                { value: "15+", label: "سنوات", icon: Clock },
                { value: "100%", label: "رضا", icon: ThumbsUp },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* مؤشر التمرير */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground cursor-pointer"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </section>

        {/* ===== شريط البحث والفلترة ===== */}
        <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-border py-4">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* شريط البحث */}
              <div className="relative flex-1 w-full">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث عن مشروع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 pr-12 pl-4 bg-card border border-border rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground placeholder:text-muted-foreground"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* أزرار التحكم */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* زر الفلترة للموبايل */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-6 h-14 bg-card border border-border rounded-2xl hover:border-primary/50 transition-colors flex-1"
                >
                  <Filter className="w-5 h-5" />
                  <span>تصفية</span>
                </button>

                {/* تصنيفات سطح المكتب */}
                <div className="hidden lg:flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-6 h-14 rounded-2xl font-medium transition-all ${
                      selectedCategory === "all"
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-card border border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    الكل
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 h-14 rounded-2xl font-medium transition-all whitespace-nowrap ${
                        selectedCategory === category
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "bg-card border border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* تبديل طريقة العرض */}
                <div className="flex items-center gap-2 bg-card border border-border rounded-2xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-xl transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-xl transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* قائمة التصنيفات للموبايل */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden overflow-hidden mt-4"
                >
                  <div className="flex flex-wrap gap-2 p-4 bg-card rounded-2xl border border-border">
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setIsFilterOpen(false);
                      }}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        selectedCategory === "all"
                          ? "bg-primary text-white"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      الكل
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                          selectedCategory === category
                            ? "bg-primary text-white"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ===== عرض المشاريع ===== */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatePresence mode="wait">
              {filteredProjects.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="text-center py-32 bg-card/50 backdrop-blur rounded-[3rem] border border-border"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <Search className="w-12 h-12 text-primary/40" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    لا توجد نتائج
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                    لم نتمكن من العثور على مشاريع تطابق بحثك
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    عرض الكل
                  </button>
                </motion.div>
              ) : viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectListItem
                      key={project.slug}
                      project={project}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ===== إحصائيات موسعة ===== */}
        <section className="py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-black text-foreground mb-4">
                إحصائياتنا
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                أرقام تعكس خبرتنا وجودة أعمالنا
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Briefcase,
                  value: stats.total,
                  label: "مشروع منجز",
                  color: "from-amber-500 to-amber-600",
                  description: "مشروع في مختلف المجالات",
                },
                {
                  icon: Layers,
                  value: stats.categories,
                  label: "تصنيف مختلف",
                  color: "from-blue-500 to-blue-600",
                  description: "من المظلات والسواتر",
                },
                {
                  icon: Clock,
                  value: "15+",
                  label: "سنوات خبرة",
                  color: "from-emerald-500 to-emerald-600",
                  description: "في المجال الهندسي",
                },
                {
                  icon: Users,
                  value: "500+",
                  label: "عملاء سعداء",
                  color: "from-purple-500 to-purple-600",
                  description: "يثقون في خدماتنا",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-card border border-border rounded-3xl p-6 text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-lg font-bold text-primary mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== قسم التواصل المتطور ===== */}
        {/* ===== قسم التواصل المبسط ===== */}
        <section id="contact" className="py-20 relative overflow-hidden">
          {/* خلفية متحركة بسيطة */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 20, repeat: Infinity, delay: 2 }}
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"
            />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary/90 rounded-[3rem] p-12 lg:p-16 text-white relative overflow-hidden"
            >
              {/* خلفية بسيطة مع أيقونات ثابتة */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 text-white/5">
                  <MessageCircle className="w-32 h-32" />
                </div>
                <div className="absolute bottom-10 left-10 text-white/5">
                  <Phone className="w-32 h-32" />
                </div>
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* الجانب الأيمن - النصوص والصور */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center lg:text-right"
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-6 py-3 rounded-full mb-8">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">تواصل مع فريقنا</span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
                    لديك فكرة{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-amber-100">
                      مشروع
                    </span>{" "}
                    وتبحث عن أفضل من ينفذها؟
                  </h2>

                  <p className="text-xl text-white/80 mb-8 leading-relaxed">
                    فريقنا المتخصص جاهز لتحويل أفكارك إلى واقع ملموس. تواصل معنا
                    الآن واحصل على استشارة مجانية وعرض سعر مناسب لمشروعك.
                  </p>

                  {/* أزرار التواصل */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="https://wa.me/966558181955"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-all overflow-hidden shadow-2xl flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="w-5 h-5" />
                      واتساب
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </a>

                    <a
                      href="tel:966558181955"
                      className="group relative px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-bold text-lg transition-all backdrop-blur border border-white/30 flex items-center justify-center gap-3"
                    >
                      <Phone className="w-5 h-5" />
                      اتصل الآن
                    </a>

                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white/50 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3"
                    >
                      صفحة التواصل
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* مميزات سريعة */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8 text-white/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">استشارة مجانية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">ضمان 10 سنوات</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">تنفيذ احترافي</span>
                    </div>
                  </div>
                </motion.div>

                {/* الجانب الأيسر - صورة جذابة */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative hidden lg:block"
                >
                  <div className="relative h-[500px] w-full">
                    {/* الصورة الرئيسية */}
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-0 right-0 w-[400px] h-[450px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-20"
                    >
                      <Image
                        src="/images/0.jpg"
                        alt="مظلة سيارات فاخرة"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-6 right-6 text-white">
                        <p className="text-2xl font-bold">مظلات سيارات</p>
                        <p className="text-amber-300 text-sm">
                          عزل حراري - ضمان 10 سنوات
                        </p>
                      </div>
                    </motion.div>

                    {/* صورة ثانوية صغيرة */}
                    <motion.div
                      animate={{
                        y: [0, 30, 0],
                        rotate: [0, -3, 3, 0],
                      }}
                      transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute bottom-0 left-0 w-[280px] h-[320px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-10"
                    >
                      <Image
                        src="/images/contact-pergola.jpg"
                        alt="برجولات خشبية"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 right-4 text-white">
                        <p className="text-xl font-bold">برجولات</p>
                        <p className="text-amber-300 text-xs">تصاميم عصرية</p>
                      </div>
                    </motion.div>

                    {/* بطاقة معلومات عائمة */}
                    <motion.div
                      animate={{
                        x: [0, 15, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-5 left-20 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 z-30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-amber-200">تواصل واتساب</p>
                          <p className="font-bold text-white">0558 181 955</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* شارة الثقة */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                      className="absolute bottom-40 -right-5 bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg z-40"
                    >
                      <p className="text-white font-bold text-sm flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        خبرة 15+ سنة
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* شريط المدن في الأسفل */}
              <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-4 text-white/60">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-sm">نغطي جميع مدن المملكة:</span>
                  {[
                    "الرياض",
                    "جدة",
                    "الدمام",
                    "الأحساء",
                    "المدينة",
                    "مكة",
                    "القصيم",
                  ].map((city, i) => (
                    <span
                      key={city}
                      className="text-sm bg-white/5 px-3 py-1 rounded-full"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

// إضافة أيقونة Send إذا لم تكن موجودة
const Send = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// ===== مكون بطاقة المشروع (عرض الشبكة) =====
function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const coverImage =
    project.featuredImage?.node?.sourceUrl ||
    project.galleryImages?.[0]?.sourceUrl ||
    "";
  const coverAlt =
    project.featuredImage?.node?.altText ||
    project.galleryImages?.[0]?.altText ||
    project.title;
  const category = project.projectCategorys?.nodes?.[0]?.name;
  const projectDate = project.date ? new Date(project.date) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-card border border-border shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
      >
        {/* الصورة */}
        {coverImage ? (
          <Image
            src={encodeURI(coverImage)}
            alt={coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}

        {/* تراكب */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent opacity-90" />

        {/* شارة التصنيف */}
        {category && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-4 py-2 text-xs font-bold text-white bg-primary/90 backdrop-blur rounded-full border border-white/20">
              {category}
            </span>
          </div>
        )}

        {/* المحتوى */}
        <div className="absolute inset-x-0 bottom-0 p-8">
          <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 drop-shadow-lg">
            {project.title}
          </h3>

          {projectDate && (
            <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
              <Calendar className="w-4 h-4" />
              <span>
                {projectDate.toLocaleDateString("ar-SA", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
            <span className="text-sm font-bold">عرض التفاصيل</span>
            <ArrowLeft className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ===== مكون بطاقة المشروع (عرض القائمة) =====
function ProjectListItem({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const coverImage =
    project.featuredImage?.node?.sourceUrl ||
    project.galleryImages?.[0]?.sourceUrl ||
    "";
  const coverAlt =
    project.featuredImage?.node?.altText ||
    project.galleryImages?.[0]?.altText ||
    project.title;
  const category = project.projectCategorys?.nodes?.[0]?.name;
  const projectDate = project.date ? new Date(project.date) : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
      >
        {/* الصورة */}
        <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
          {coverImage ? (
            <Image
              src={encodeURI(coverImage)}
              alt={coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* المحتوى */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {category && (
              <span className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-full">
                {category}
              </span>
            )}
            {projectDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {projectDate.toLocaleDateString("ar-SA", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {project.content && (
            <p className="text-muted-foreground line-clamp-2 mb-4">
              {project.content.replace(/<[^>]*>/g, "")}
            </p>
          )}

          <div className="flex items-center gap-2 text-primary font-bold">
            <span>عرض التفاصيل</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

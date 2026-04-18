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
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-background via-background/98 to-background">
        {/* ===== هيدر متطور وجذاب ===== */}
        <section
          ref={heroRef}
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20"
        >
          {/* خلفية متحركة متطورة (بدون اهتزاز) */}
          <div className="absolute inset-0">
            {/* طبقات خلفية متحركة ببطء شديد */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-40 -right-40 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-[100px] md:blur-[120px]"
            />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-60 -left-40 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-[100px] md:blur-[120px]"
            />

            {/* أيقونات تطفو بنعومة (بدون دوران مزعج) */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-32 left-[10%] text-primary/10 hidden lg:block"
            >
              <Umbrella className="w-24 h-24 md:w-32 md:h-32" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                delay: 1,
                ease: "easeInOut",
              }}
              className="absolute bottom-32 right-[15%] text-primary/10 hidden lg:block"
            >
              <Shield className="w-28 h-28 md:w-40 md:h-40" />
            </motion.div>
          </div>

          {/* المحتوى الرئيسي للهيدر */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="relative z-10 container mx-auto px-4 max-w-6xl text-center"
          >
            {/* شارات التصنيف */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-1.5 md:gap-2 text-primary font-bold text-xs md:text-sm bg-primary/10 backdrop-blur border border-primary/20 px-4 md:px-6 py-2 md:py-2.5 rounded-full">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                معرض أعمالنا
              </span>

              <span className="inline-flex items-center gap-1.5 md:gap-2 text-foreground text-xs md:text-sm bg-card/50 backdrop-blur border border-border px-4 md:px-6 py-2 md:py-2.5 rounded-full">
                <Grid3x3 className="w-3 h-3 md:w-4 md:h-4" />
                {stats.total} مشروع
              </span>

              <span className="inline-flex items-center gap-1.5 md:gap-2 text-foreground text-xs md:text-sm bg-card/50 backdrop-blur border border-border px-4 md:px-6 py-2 md:py-2.5 rounded-full">
                <Camera className="w-3 h-3 md:w-4 md:h-4" />
                {stats.categories} تصنيف
              </span>
            </motion.div>

            {/* العنوان الرئيسي */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6 md:mb-8 leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="block mb-2"
              >
                مشاريعنا
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-primary/80 to-primary-dark block relative inline-block"
              >
                المنفذة
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-1 bg-gradient-to-l from-primary to-transparent rounded-full mx-auto"
                />
              </motion.span>
            </motion.h1>

            {/* وصف */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10 px-2"
            >
              نفتخر بتقديم مجموعة متكاملة من المشاريع المميزة في مجال المظلات
              والسواتر والبرجولات، والتي تم تنفيذها بأعلى معايير الجودة
              والاحترافية
            </motion.p>

            {/* أزرار CTA محادثة للموبايل */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
            >
              <Link
                href="#projects"
                className="w-full sm:w-auto group relative px-8 md:px-10 py-4 md:py-5 bg-primary text-white rounded-2xl font-bold text-base md:text-lg overflow-hidden shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center gap-2">
                  استعرض المشاريع
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
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
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-card/50 backdrop-blur border-2 border-primary/30 text-foreground rounded-2xl font-bold text-base md:text-lg hover:bg-primary/10 transition-all hover:border-primary/50 shadow-xl flex items-center justify-center"
              >
                تواصل معنا
              </Link>
            </motion.div>

          </motion.div>

          {/* مؤشر التمرير */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground cursor-pointer hidden md:block"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 opacity-50" />
          </motion.div>
        </section>

        {/* ===== شريط البحث والفلترة ===== */}
        <section
          id="projects"
          className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-xl border-y border-border py-4 shadow-sm"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-3 md:gap-4">
              {/* شريط البحث */}
              <div className="relative flex-1 w-full">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث عن مشروع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 md:h-14 pr-12 pl-4 bg-card border border-border rounded-xl md:rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-base"
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
              <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
                {/* زر الفلترة للموبايل */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center justify-center gap-2 px-4 h-12 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors flex-1 text-sm font-medium"
                >
                  <Filter className="w-4 h-4 md:w-5 md:h-5" />
                  <span>تصفية الأقسام</span>
                </button>

                {/* تصنيفات سطح المكتب */}
                <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-6 h-14 rounded-2xl font-medium transition-all whitespace-nowrap ${
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
                <div className="flex items-center gap-1 md:gap-2 bg-card border border-border rounded-xl md:rounded-2xl p-1 shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="w-4 h-4 md:w-5 md:h-5" />
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
                  className="lg:hidden overflow-hidden mt-3"
                >
                  <div className="flex flex-wrap gap-2 p-3 md:p-4 bg-card rounded-xl border border-border">
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setIsFilterOpen(false);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === "all"
                          ? "bg-primary text-white"
                          : "bg-muted hover:bg-muted/80 text-foreground"
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
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? "bg-primary text-white"
                            : "bg-muted hover:bg-muted/80 text-foreground"
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
        <section className="py-8 md:py-12 lg:py-16 min-h-[50vh]">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatePresence mode="wait">
              {filteredProjects.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20 md:py-32 bg-card/50 backdrop-blur rounded-[2rem] md:rounded-[3rem] border border-border px-4"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 md:w-12 md:h-12 text-primary/40" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                    لا توجد نتائج
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto mb-6 md:mb-8">
                    لم نتمكن من العثور على مشاريع تطابق بحثك
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-xl md:rounded-2xl font-bold hover:bg-primary/90 transition-colors text-sm md:text-base"
                  >
                    عرض جميع المشاريع
                  </button>
                </motion.div>
              ) : viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
                  className="flex flex-col gap-4 md:gap-6"
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
        <section className="py-12 md:py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 md:mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3 md:mb-4">
                إحصائياتنا
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                أرقام تعكس خبرتنا وجودة أعمالنا
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  icon: Briefcase,
                  value: stats.total,
                  label: "مشروع منجز",
                  color: "from-amber-500 to-amber-600",
                  description: "في مختلف المجالات",
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group bg-card border border-border rounded-2xl md:rounded-3xl p-6 text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-base md:text-lg font-bold text-primary mb-1 md:mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== قسم التواصل ===== */}
        <section
          id="contact"
          className="py-12 md:py-20 relative overflow-hidden"
        >
          {/* خلفية ناعمة */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary/90 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 text-white relative overflow-hidden"
            >
              {/* خلفية بسيطة مع أيقونات ثابتة */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 text-white/5">
                  <MessageCircle className="w-24 h-24 md:w-32 md:h-32" />
                </div>
                <div className="absolute bottom-10 left-10 text-white/5">
                  <Phone className="w-24 h-24 md:w-32 md:h-32" />
                </div>
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                {/* الجانب الأيمن - النصوص والصور */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-center lg:text-right"
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-bold">
                      تواصل مع فريقنا
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 leading-tight">
                    لديك فكرة{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-amber-100">
                      مشروع
                    </span>{" "}
                    <br className="hidden sm:block" />
                    وتبحث عن أفضل من ينفذها؟
                  </h2>

                  <p className="text-base md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    فريقنا المتخصص جاهز لتحويل أفكارك إلى واقع ملموس. تواصل معنا
                    الآن واحصل على استشارة مجانية وعرض سعر مناسب لمشروعك.
                  </p>

                  {/* أزرار التواصل للموبايل - مرنة وواضحة */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                    <a
                      href="https://wa.me/966 5309 89 975"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto group relative px-6 md:px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all overflow-hidden shadow-2xl flex items-center justify-center gap-2 md:gap-3"
                    >
                      <MessageCircle className="w-5 h-5" />
                      واتساب
                    </a>

                    <a
                      href="tel:966 5309 89 975"
                      className="w-full sm:w-auto px-6 md:px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all backdrop-blur border border-white/30 flex items-center justify-center gap-2 md:gap-3"
                    >
                      <Phone className="w-5 h-5" />
                      اتصل الآن
                    </a>
                  </div>

                  {/* مميزات سريعة */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 mt-8 text-white/70">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-xs md:text-sm">استشارة مجانية</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-xs md:text-sm">ضمان 10 سنوات</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-xs md:text-sm">تنفيذ احترافي</span>
                    </div>
                  </div>
                </motion.div>

                {/* الجانب الأيسر - صورة تطفو بنعومة (بدون اهتزاز) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative hidden lg:block"
                >
                  <div className="relative h-[400px] xl:h-[500px] w-full">
                    {/* الصورة الرئيسية (حركة طفو هادئة فقط) */}
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-0 right-0 w-[80%] h-[90%] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-20"
                    >
                      <Image
                        src="/images/0.jpg"
                        alt="مظلة سيارات فاخرة"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 right-6 text-white">
                        <p className="text-2xl font-bold">مظلات سيارات</p>
                        <p className="text-amber-300 text-sm">
                          عزل حراري - ضمان 10 سنوات
                        </p>
                      </div>
                    </motion.div>

                    {/* بطاقة معلومات عائمة */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute -top-4 left-10 bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-2xl border border-white/20 z-30 shadow-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-amber-200">تواصل واتساب</p>
                          <p className="font-bold text-white text-sm">
                           +966 53 098 9975
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* شارة الثقة */}
                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                      className="absolute bottom-10 -right-4 bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg z-40"
                    >
                      <p className="text-white font-bold text-sm flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        خبرة 15+ سنة
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* شريط المدن في الأسفل */}
              {/* <div className="relative z-10 mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-white/60">
                  <div className="flex items-center gap-1 w-full justify-center sm:w-auto mb-2 sm:mb-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                    <span className="text-xs md:text-sm font-medium">
                      نغطي  مدن :
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                    
                      "جدة",
                     
                    ].map((city, i) => (
                      <span
                        key={city}
                        className="text-xs md:text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block relative overflow-hidden rounded-2xl md:rounded-[2rem] aspect-[4/5] bg-card border border-border shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
      >
        {/* الصورة */}
        {coverImage ? (
          <Image
            src={encodeURI(coverImage)}
            alt={coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <ImageIcon className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground/30" />
          </div>
        )}

        {/* تراكب */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

        {/* شارة التصنيف */}
        {category && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
            <span className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold text-white bg-primary/90 backdrop-blur rounded-full border border-white/20 shadow-sm">
              {category}
            </span>
          </div>
        )}

        {/* المحتوى */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">
            {project.title}
          </h3>

          {projectDate && (
            <div className="flex items-center gap-1.5 md:gap-2 text-white/70 text-xs md:text-sm mb-3 md:mb-4">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <span>
                {projectDate.toLocaleDateString("ar-SA", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
            <span className="text-xs md:text-sm font-bold">عرض التفاصيل</span>
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 transform group-hover:-translate-x-1 transition-transform" />
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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 bg-card border border-border rounded-2xl md:rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-md"
      >
        {/* الصورة */}
        <div className="relative w-full md:w-48 h-48 md:h-auto md:aspect-square rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0">
          {coverImage ? (
            <Image
              src={encodeURI(coverImage)}
              alt={coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* المحتوى */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
            {category && (
              <span className="px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-bold text-primary bg-primary/10 rounded-full">
                {category}
              </span>
            )}
            {projectDate && (
              <span className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {projectDate.toLocaleDateString("ar-SA", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {project.content && (
            <p className="text-sm md:text-base text-muted-foreground line-clamp-2 md:line-clamp-3 mb-3 md:mb-4">
              {project.content.replace(/<[^>]*>/g, "")}
            </p>
          )}

          <div className="mt-auto flex items-center gap-2 text-primary text-sm font-bold">
            <span>عرض التفاصيل</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

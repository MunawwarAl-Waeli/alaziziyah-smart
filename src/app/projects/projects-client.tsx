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
    url: "https://al-azizia.com/projects",
    numberOfItems: stats.total,
    itemListElement: filteredProjects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      url: `https://al-azizia.com/projects/${project.slug}`,
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

      {/* إزالة أي هوامش علوية ليلتحم القسم بالهيدر تماماً بدون أي فراغ */}
      <main className="relative bg-background font-sans selection:bg-primary/30">
        {/* ===== هيدر معرض الأعمال (تصميم بسيط واحترافي) ===== */}
        <section
          ref={heroRef}
          // القسم يغطي 80% من ارتفاع الشاشة ليكون متناسباً، مع h-screen في الشاشات الأكبر
          className="relative h-[80vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900"
        >
          {/* 1. صورة الخلفية (صورة المشروع الأول) */}
          <div className="absolute inset-0 z-0">
            <Image
              src={
                projects[0]?.featuredImage?.node?.sourceUrl || "/images/0.jpg"
              } // يستخدم صورة المشروع الأول أو صورة احتياطية
              alt={projects[0]?.title || "معرض أعمال العزيزية"}
              fill
              priority // تحميل الصورة بأولوية قصوى لأنها في المقدمة
              className="object-cover"
            />
            {/* طبقة تراكب داكنة (Overlay) لضمان وضوح النص فوق الصورة */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
          </div>

          {/* 2. المحتوى النصي فوق الصورة */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl text-center"
          >
            {/* شارة بسيطة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white/10  border border-white/20 px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 font-medium text-xs md:text-sm tracking-wide">
                إبداع في كل زاوية
              </span>
            </motion.div>

            {/* العنوان الرئيسي الكبير والواضح */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight text-white drop-shadow-lg"
            >
              معـرض <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-amber-400 to-primary-dark">
                الأعـمـال
              </span>
            </motion.h1>

            {/* الوصف البسيط والمباشر */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md"
            >
              استكشف سجل إنجازاتنا المتميزة في تصميم وتنفيذ المظلات، السواتر،
              والبرجولات بأعلى معايير الجودة والفخامة في المملكة.
            </motion.p>

            {/* زر التصفح العائم */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-4 bg-primary text-white rounded-full font-black text-base md:text-lg transition-all flex items-center gap-3 overflow-hidden shadow-2xl shadow-black/30 hover:bg-primary/90"
              >
                <span>تصفح المشاريع</span>
                <ChevronDown className="w-5 h-5 animate-bounce text-amber-300" />
              </button>
            </motion.div>
          </motion.div>

          {/* خط متدرج ناعم في الأسفل لدمج القسم مع ما بعده */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
{/* ===== شريط البحث والفلترة المطور (انسيابي للجوال والحاسوب) ===== */}
<section
  id="projects"
  className="sticky top-6 md:top-0 z-40 bg-background/90 backdrop-blur-xl border-y border-border py-3 md:py-4 shadow-sm"
>
  <div className="container mx-auto px-4 max-w-7xl">
    <div className="flex flex-col gap-3 md:gap-4">
     
      {/* 2. السطر الثاني: الفلاتر + تبديل العرض (في نفس الصف للجوال) */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* شريط الأقسام: تمرير أفقي انسيابي */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 md:px-6 h-9 md:h-11 rounded-lg md:rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all border ${
              selectedCategory === "all"
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                : "bg-card border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            الكل
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 md:px-6 h-9 md:h-11 rounded-lg md:rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all border ${
                selectedCategory === category
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* أزرار تبديل العرض: ثابتة في الطرف الأيسر */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg md:rounded-xl p-1 shrink-0">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 md:p-2 rounded-md md:rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="عرض شبكي"
          >
            <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 md:p-2 rounded-md md:rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="عرض قائمة"
          >
            <List className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

      </div>
    </div>
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

        {/* ===== إحصائيات موسعة (ثيم موحد ومرن) ===== */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent border-y border-border/50">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                إحصائياتنا
              </h2>
              <div className="w-20 h-1.5 bg-primary/30 mx-auto rounded-full mb-4" />
              <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto font-medium">
                أرقام تعكس مسيرة النجاح وجودة التنفيذ في كل مشروع
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                {
                  icon: Briefcase,
                  value: stats.total,
                  label: "مشروع منجز",
                  description: "دقة في التنفيذ",
                },
                {
                  icon: Layers,
                  value: stats.categories,
                  label: "تصنيف مختلف",
                  description: "حلول متكاملة",
                },
                {
                  icon: Clock,
                  value: "15+",
                  label: "سنوات خبرة",
                  description: "ريادة معتمدة",
                },
                {
                  icon: Users,
                  value: "500+",
                  label: "عميل سعيد",
                  description: "شراكة نجاح",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-card border border-border/60 rounded-[2rem] p-6 md:p-8 text-center hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-500"
                >
                  {/* خلفية خفيفة تظهر عند الهوفير */}
                  <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity" />

                  {/* حاوية الأيقونة - تتبع الثيم تماماً */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:rotate-[10deg] transition-all duration-500 shadow-sm">
                    <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>

                  <div className="relative">
                    <div className="text-3xl md:text-5xl font-black text-foreground mb-2 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-base md:text-xl font-bold text-primary mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== قسم التواصل المدمج مع الفوتر (بدون حواف) ===== */}
        <section
          id="contact"
          className="pt-16 md:pt-24 pb-12 md:pb-20 relative overflow-hidden border-none"
          aria-label="تواصل معنا"
        >
          {/* إضاءة خلفية خفيفة جداً تندمج مع لون الصفحة والفوتر */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 flex flex-col items-center text-center gap-8"
            >
              {/* النص بدون أي صناديق أو خلفيات صلبة */}
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full mb-6 font-bold text-sm">
                  <Wrench className="w-4 h-4" />
                  <span>هل أعجبتك أعمالنا؟</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-foreground tracking-tight leading-tight">
                  لديك فكرة مشروع <br className="hidden sm:block" />
                  وتبحث عن أفضل من ينفذها؟
                </h2>

                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                  فريقنا الهندسي المتخصص جاهز لتحويل أفكارك إلى واقع ملموس.
                  تواصل معنا الآن واحصل على استشارة مجانية وعرض سعر مخصص
                  لمشروعك.
                </p>
              </div>

              {/* الأزرار */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                <a
                  href="https://wa.me/966530989975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 hover:-translate-y-1 shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>تواصل عبر الواتساب</span>
                </a>
                <a
                  href="tel:966530989975"
                  className="px-8 py-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5" />
                  <span>الاتصال المباشر</span>
                </a>
              </div>
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

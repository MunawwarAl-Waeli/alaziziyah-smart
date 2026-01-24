"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Ruler,
  Calendar,
  ArrowUpRight,
  Plus,
  Grid3x3,
  Eye,
  Sparkles,
  Layers,
  Zap,
  Clock,
  Users,
  Target,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  location: string;
  area: string;
  year: string;
  tags: string[];
  difficulty: number;
  client: string;
}

const featuredProjects: ProjectItem[] = [
  {
    id: 1,
    title: "مظلة سماوية بيومناخية",
    category: "هندسة معمارية ذكية",
    desc: "هيكل معدني ذكي يتفاعل مع الظروف الجوية، يفتح ويغلق تلقائياً بناءً على شدة الشمس والمطر",
    image: "/images/1.jpg",
    location: "مدينة نيوم",
    area: "2,800 م²",
    year: "2024",
    tags: ["ذكاء اصطناعي", "طاقة شمسية", "تحكم آلي"],
    difficulty: 4,
    client: "NEOM",
  },
  {
    id: 2,
    title: "واجهة ضوئية تفاعلية",
    category: "فن رقمي معماري",
    desc: "شاشة LED ضخمة تتفاعل مع حركة المشاة وتغير أنماطها وفقاً لتدفق الزوار والطقس",
    image: "/images/2.jpg",
    location: "ميدان المملكة",
    area: "1,500 م²",
    year: "2024",
    tags: ["LED تفاعلي", "مستشعرات حركة", "عرض ديناميكي"],
    difficulty: 5,
    client: "الرياض آرت",
  },
  {
    id: 3,
    title: "جسر معلق خفيف",
    category: "هندسة إنشائية متقدمة",
    desc: "تصميم جسر باستخدام ألياف الكربون بتقنية الشد الإنشائي، يحمل 50 طن بأقل كتلة ممكنة",
    image: "/images/3.jpg",
    location: "وادي حنيفة",
    area: "320 م",
    year: "2023",
    tags: ["ألياف كربون", "هندسة دقيقة", "تصميم خفيف"],
    difficulty: 3,
    client: "أمانة الرياض",
  },
  {
    id: 4,
    title: "جسر معلق خفيف",
    category: "هندسة إنشائية متقدمة",
    desc: "تصميم جسر باستخدام ألياف الكربون بتقنية الشد الإنشائي، يحمل 50 طن بأقل كتلة ممكنة",
    image: "/images/3.jpg",
    location: "وادي حنيفة",
    area: "320 م",
    year: "2023",
    tags: ["ألياف كربون", "هندسة دقيقة", "تصميم خفيف"],
    difficulty: 3,
    client: "أمانة الرياض",
  },
];

export function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "immersive">("immersive");
  const containerRef = useRef<HTMLDivElement>(null);
  // في حالة State أضف:
  const [previewMode, setPreviewMode] = useState<
    "3d" | "blueprint" | "wireframe"
  >("3d");
  const [showHighlights, setShowHighlights] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const generateAIInsights = async (projectId: number) => {
    // في الواقع، هنا ستكون API call
    const insights = [
      "هذا المشروع يستخدم 40% طاقة أقل من التصاميم التقليدية",
      "تكلفة الصيانة السنوية تقدر بـ 15,000 ريال",
      "العمر الافتراضي المتوقع: 25 سنة",
      "نسبة الكفاءة الإنشائية: 94%",
    ];
    return insights;
  };
  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-background via-background to-black">
      {/* خلفية جزيئات ديناميكية */}
      <ParticlesBackground />

      {/* شريط التحكم العائم */}
      <div className="fixed top-1/2 right-4 z-50 transform -translate-y-1/2">
        <div className="flex flex-col gap-4 p-3 bg-background/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          <button
            onClick={() =>
              setViewMode(viewMode === "grid" ? "immersive" : "grid")
            }
            className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all group"
            aria-label="تبديل طريقة العرض"
          >
            <Grid3x3
              className={cn(
                "w-5 h-5 transition-transform",
                viewMode === "immersive" ? "rotate-0" : "rotate-90",
              )}
            />
          </button>

          <button
            onClick={() =>
              setPreviewMode(
                previewMode === "3d"
                  ? "blueprint"
                  : previewMode === "blueprint"
                    ? "wireframe"
                    : "3d",
              )
            }
            className={cn(
              "p-3 rounded-xl transition-all group",
              previewMode !== "3d"
                ? "bg-primary/20 text-primary"
                : "bg-white/5 hover:bg-white/10",
            )}
            aria-label="تبديل وضع المعاينة"
          >
            <Eye className="w-5 h-5" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-background text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {previewMode === "3d"
                ? "مخطط تقني"
                : previewMode === "blueprint"
                  ? "هيكل سلكي"
                  : "عرض ثلاثي"}
            </span>
          </button>

          <button
            onClick={async () => {
              setShowHighlights(!showHighlights);
              if (!showHighlights && aiInsights.length === 0) {
                // محاكاة تحليل ذكاء اصطناعي
                const insights = await generateAIInsights(1);
                setAiInsights(insights);
              }
            }}
            className={cn(
              "p-3 rounded-xl transition-all group",
              showHighlights
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-white/5 hover:bg-white/10",
            )}
            aria-label="تفعيل الرؤى الذكية"
          >
            <Sparkles className="w-5 h-5" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-background text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {showHighlights ? "إخفاء الرؤى" : "الرؤى الذكية"}
            </span>
          </button>
        </div>
      </div>

      {/* العنوان الرئيسي مع تأثير الكتابة */}
      <div className="container mx-auto px-4 mb-32">
        <div className="text-center relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent absolute top-0 left-0"
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mt-20 mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-white to-cyan-400 bg-clip-text text-transparent">
              معماريون
            </span>
            <br />
            <span className="text-foreground">خارج الإطار</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            نحن لا نبني هياكل، نصنع تجارب. كل مشروع هو قصة تحدي وإبداع
          </motion.p>

          {/* مؤشر التمرير الديناميكي */}
          <ScrollIndicator />
        </div>
      </div>

      {/* العرض الغامر للمشاريع */}
      {viewMode === "immersive" ? (
        <ImmersiveView
          projects={featuredProjects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          containerRef={containerRef}
        />
      ) : (
        <GridView projects={featuredProjects} />
      )}

      {/* لوحة التحكم التفاعلية */}
      <ControlPanel />

      {/* شاشة التفاصيل المميكنة */}
      <AnimatePresence>
        {activeProject !== null && (
          <ProjectDetails
            project={featuredProjects.find((p) => p.id === activeProject)!}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ImmersiveView({
  projects,
  activeProject,
  setActiveProject,
  containerRef,
}: any) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const projectPositions = useMemo(
    () =>
      projects.map((_: any, i: number) => ({
        start: i / projects.length,
        mid: (i + 0.5) / projects.length,
        end: (i + 1) / projects.length,
      })),
    [projects.length],
  );
  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {projects.map((project: ProjectItem, index: number) => {
        const positions = projectPositions[index];

        const y = useTransform(
          scrollYProgress,
          [positions.start, positions.end],
          ["0%", "-80%"],
        );
        const scale = useTransform(
          scrollYProgress,
          [positions.start, positions.mid, positions.end],
          [0.8, 1, 0.8],
        );
        // const opacity = useTransform(
        //   scrollYProgress,
        //   [
        //     positions.start,
        //     positions.start + 0.3,
        //     positions.start + 0.7,
        //     positions.end,
        //   ],
        //   [0, 1, 1, 0],
        // );

        return (
          <motion.div
            key={project.id}
            style={{ y, scale }}
            className="sticky top-0 h-screen flex items-center justify-center"
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
            transition={{
              duration: 1.5,
              ease: "backInOut",
            }}
          >
            <div className="relative w-full max-w-6xl mx-auto">
              {/* البطاقة ثلاثية الأبعاد */}
              <motion.div
                whileHover={{ rotateY: 10, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative perspective-1000"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 blur-3xl rounded-3xl" />

                <div className="relative rounded-3xl overflow-hidden border border-white/20 backdrop-blur-sm bg-gradient-to-br from-background/80 to-black/80">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* جانب الصورة مع تأثير Parallax */}
                    <div className="relative h-[500px] lg:h-auto overflow-hidden">
                      <ParallaxImage src={project.image} alt={project.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                      {/* شارات التكنولوجيا */}
                      <div className="absolute top-6 left-6 flex gap-2">
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs border border-white/10"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* المحتوى التفاعلي */}
                    <div className="p-12 relative">
                      <motion.div
                        animate={
                          activeProject === project.id
                            ? {
                                x: [0, -5, 5, 0],
                                transition: { duration: 0.5 },
                              }
                            : {}
                        }
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
                          <Zap className="w-4 h-4" />
                          {project.category}
                        </span>

                        <h3 className="text-4xl font-bold mb-6 leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-muted-foreground mb-8 leading-relaxed">
                          {project.desc}
                        </p>

                        {/* مؤشر صعوبة المشروع */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">صعوبة المشروع</span>
                            <span className="text-sm">
                              {project.difficulty}/5
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.difficulty * 20}%` }}
                              transition={{ delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-primary to-cyan-400"
                            />
                          </div>
                        </div>

                        {/* إحصائيات سريعة */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs">المدة</span>
                            </div>
                            <div className="text-2xl font-bold">6 أشهر</div>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="w-4 h-4" />
                              <span className="text-xs">الفريق</span>
                            </div>
                            <div className="text-2xl font-bold">24 شخص</div>
                          </div>
                        </div>

                        {/* زر الاستكشاف */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="group relative w-full py-4 rounded-xl bg-gradient-to-r from-primary to-cyan-500 text-white font-bold overflow-hidden"
                        >
                          <span className="relative z-10">
                            استكشاف المشروع بالتفصيل
                          </span>
                          <ArrowUpRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function GridView({ projects }: { projects: ProjectItem[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* بطاقة ثلاثية الأبعاد */}
            <div className="relative h-96 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* طبقة تأثير */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* المحتوى العائم */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  animate={
                    hoveredId === project.id
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: 20,
                          opacity: 0,
                        }
                  }
                  className="mb-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-black/50 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-white/70 line-clamp-2">
                  {project.desc}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs opacity-70">{project.location}</span>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetails({ project, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        layoutId={`project-${project.id}`}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-background to-black border border-white/20"
      >
        {/* محتوى مفصّل للمشروع */}
        <div className="p-12">{/* يمكن إضافة المزيد من التفاصيل هنا */}</div>
      </motion.div>
    </motion.div>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="relative h-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

function ControlPanel() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "الكل", icon: Layers },
    { id: "smart", label: "ذكية", icon: Zap },
    { id: "art", label: "فنية", icon: Sparkles },
    { id: "structural", label: "إنشائية", icon: Target },
    { id: "awarded", label: "حائزة", icon: Award },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-4 py-3 rounded-full flex items-center gap-2 transition-all",
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-primary to-cyan-500 text-white"
                  : "text-muted-foreground hover:text-white",
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{filter.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ParticlesBackground() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>(
    [],
  );

  useEffect(() => {
    // توليد الجزيئات مرة واحدة فقط عند التحميل
    const generatedParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(generatedParticles);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-[1px] bg-white/20 rounded-full"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
          }}
          animate={{
            x: [
              `${particle.x}vw`,
              `${particle.x + Math.sin(i) * 20}vw`,
              `${particle.x}vw`,
            ],
            y: [
              `${particle.y}vh`,
              `${particle.y + Math.cos(i) * 20}vh`,
              `${particle.y}vh`,
            ],
          }}
          transition={{
            duration: 10 + (i % 5),
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div className="mt-12">
      <div className="w-24 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
        <motion.div
          style={{ scaleX }}
          className="w-full h-full bg-gradient-to-r from-primary to-cyan-400 origin-left"
        />
      </div>
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-sm text-muted-foreground mt-2"
      >
        مرر لاكتشاف
      </motion.div>
    </motion.div>
  );
}

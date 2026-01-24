"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  Layers,
  Zap,
  Cpu,
  Palette,
  Building2,
  Shield,
  Globe,
  Target,
  Clock,
  Users,
  Award,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Eye,
  Grid3x3,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  features: string[];
  projects: number;
  duration: string;
  technologies: string[];
  caseStudy?: {
    title: string;
    result: string;
    image: string;
  };
  video?: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 1,
    name: "التصميم والهندسة",
    services: [
      {
        id: 1,
        title: "تصميم معماري ذكي",
        description:
          "تصميمات معمارية مبتكرة تستخدم الذكاء الاصطناعي لتحسين الكفاءة والاستدامة",
        icon: Building2,
        color: "text-blue-600",
        gradient: "from-blue-500 to-cyan-500",
        features: [
          "نمذجة معلومات البناء",
          "تصميم بيئي مستدام",
          "تحليل الإنشاءات",
          "تصور ثلاثي الأبعاد",
        ],
        projects: 45,
        duration: "2-6 أشهر",
        technologies: ["Revit", "Rhino", "3D Max", "AI Analysis"],
        caseStudy: {
          title: "برج الإبداع - دبي",
          result: "توفير 40% في الطاقة",
          image: "/images/1.jpg",
        //   image: "/cases/design-1.jpg",
        },
      },
      {
        id: 2,
        title: "هندسة الإنشاءات",
        description:
          "حلول إنشائية متقدمة باستخدام أحدث التقنيات والمواد الذكية",
        icon: Layers,
        color: "text-emerald-600",
        gradient: "from-emerald-500 to-teal-500",
        features: [
          "تحليل إنشائي متقدم",
          "هندسة الزلازل",
          "مراقبة السلامة",
          "نمذجة BIM",
        ],
        projects: 78,
        duration: "3-12 شهر",
        technologies: ["ETABS", "SAP2000", "Robot", "Staad Pro"],
        video: "/videos/test.mp4",
      },
    ],
  },
  {
    id: 2,
    name: "التقنيات المتقدمة",
    services: [
      {
        id: 3,
        title: "الواجهات الذكية",
        description: "تصميم وتنفيذ واجهات تفاعلية ذكية تستجيب للبيئة المحيطة",
        icon: Cpu,
        color: "text-purple-600",
        gradient: "from-purple-500 to-pink-500",
        features: [
          "شاشات LED تفاعلية",
          "تحكم بالذكاء الاصطناعي",
          "إدارة الطاقة",
          "تكامل مع IoT",
        ],
        projects: 32,
        duration: "1-3 أشهر",
        technologies: [
          "IoT Sensors",
          "AI Control",
          "LED Systems",
          "Cloud Integration",
        ],
      },
      {
        id: 4,
        title: "المظلات البيومناخية",
        description: "تصميم مظلات ذكية تتكيف مع الظروف الجوية لتحقيق أقصى راحة",
        icon: Shield,
        color: "text-amber-600",
        gradient: "from-amber-500 to-orange-500",
        features: ["تحكم تلقائي", "تكيف مع الطقس", "طاقة شمسية", "تحليل رياح"],
        projects: 56,
        duration: "2-4 أشهر",
        technologies: [
          "Solar Panels",
          "Wind Sensors",
          "Auto-Control",
          "Weather API",
        ],
        caseStudy: {
          title: "مشروع نيوم السكني",
          result: "توفير 60% في التبريد",
            image: "/images/1.jpg",
        },
      },
    ],
  },
  {
    id: 3,
    name: "التنفيذ والإدارة",
    services: [
      {
        id: 5,
        title: "إدارة المشاريع المتكاملة",
        description:
          "إدارة شاملة للمشاريع من التخطيط حتى التسليم مع ضمان الجودة",
        icon: Target,
        color: "text-red-600",
        gradient: "from-red-500 to-rose-500",
        features: [
          "تخطيط متكامل",
          "مراقبة الجودة",
          "إدارة المخاطر",
          "تتبع التقدم",
        ],
        projects: 120,
        duration: "مستمر",
        technologies: ["Primavera", "MS Project", "BIM 360", "Quality Tools"],
      },
      {
        id: 6,
        title: "التصميم الداخلي الرقمي",
        description:
          "تصميم داخلي باستخدام الواقع الافتراضي والمعزز لتجربة تفاعلية",
        icon: Palette,
        color: "text-indigo-600",
        gradient: "from-indigo-500 to-violet-500",
        features: [
          "واقع افتراضي",
          "واقع معزز",
          "تصميم تفاعلي",
          "اختيار المواد",
        ],
        projects: 67,
        duration: "1-2 شهر",
        technologies: [
          "VR/AR",
          "3D Rendering",
          "Material Library",
          "Interactive Design",
        ],
        video: "/videos/test.mp4",
      },
    ],
  },
  {
    id: 4,
    name: "حلول الاستدامة",
    services: [
      {
        id: 7,
        title: "أنظمة الطاقة المتجددة",
        description: "تصميم وتركيب أنظمة طاقة شمسية ورياح متكاملة مع المباني",
        icon: Zap,
        color: "text-green-600",
        gradient: "from-green-500 to-emerald-500",
        features: [
          "طاقة شمسية",
          "طاقة الرياح",
          "تخزين الطاقة",
          "مراقبة الاستهلاك",
        ],
        projects: 42,
        duration: "3-6 أشهر",
        technologies: [
          "Solar Tech",
          "Wind Turbines",
          "Energy Storage",
          "Monitoring",
        ],
      },
      {
        id: 8,
        title: "التصميم العالمي",
        description: "تصميم مشاريع عالمية متوافقة مع المعايير الدولية",
        icon: Globe,
        color: "text-cyan-600",
        gradient: "from-cyan-500 to-blue-500",
        features: ["معايير عالمية", "تكيف ثقافي", "بحث سوقي", "تصميم شامل"],
        projects: 89,
        duration: "6-18 شهر",
        technologies: [
          "International Standards",
          "Market Research",
          "Cultural Analysis",
          "Global Design",
        ],
      },
    ],
  },
];

export function OurServices() {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "cards" | "3d">("3d");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // تأثيرات parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);

  const activeServices =
    serviceCategories.find((cat) => cat.id === activeCategory)?.services || [];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100"
    >
      {/* خلفية ديناميكية */}
      <ServicesBackground />

      {/* شريط التحكم */}
      <div className="fixed top-1/2 right-4 z-50 transform -translate-y-1/2">
        <div className="flex flex-col gap-3 p-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl">
          <button
            onClick={() => setViewMode("3d")}
            className={cn(
              "p-2.5 rounded-xl transition-all relative",
              viewMode === "3d"
                ? "bg-primary/20 text-primary"
                : "bg-gray-100 hover:bg-gray-200",
            )}
            aria-label="عرض ثلاثي الأبعاد"
          >
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 border-2 border-current rounded transform rotate-45" />
              <div className="absolute inset-1 border border-current rounded transform rotate-45" />
            </div>
            <span className="absolute right-full mr-2 px-2 py-1 bg-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-gray-200">
              ثلاثي الأبعاد
            </span>
          </button>

          <button
            onClick={() => setViewMode("cards")}
            className={cn(
              "p-2.5 rounded-xl transition-all relative",
              viewMode === "cards"
                ? "bg-primary/20 text-primary"
                : "bg-gray-100 hover:bg-gray-200",
            )}
            aria-label="عرض البطاقات"
          >
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
            </div>
            <span className="absolute right-full mr-2 px-2 py-1 bg-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-gray-200">
              البطاقات
            </span>
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2.5 rounded-xl transition-all relative",
              viewMode === "grid"
                ? "bg-primary/20 text-primary"
                : "bg-gray-100 hover:bg-gray-200",
            )}
            aria-label="عرض شبكي"
          >
            <Grid3x3 className="w-4 h-4" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-gray-200">
              شبكي
            </span>
          </button>
        </div>
      </div>

      {/* العنوان الرئيسي */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            خدماتنا المتكاملة
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              حلول هندسية
            </span>
            <br />
            <span className="text-gray-900">تتجاوز التوقعات</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            نقدم مجموعة شاملة من الخدمات الهندسية المتطورة التي تجمع بين الإبداع
            والتقنية لتحقيق رؤيتك
          </p>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "300+", label: "مشروع منفذ", icon: Award },
              { value: "98%", label: "رضا العملاء", icon: Users },
              { value: "99.5%", label: "التزام بالمواعيد", icon: Clock },
              { value: "50+", label: "جائزة عالمية", icon: Target },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* فئات الخدمات */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-3 rounded-full border transition-all font-medium",
                activeCategory === category.id
                  ? "bg-primary text-white border-primary shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary",
              )}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* عرض الخدمات حسب النمط المختار */}
      <AnimatePresence mode="wait">
        {viewMode === "3d" ? (
          <ThreeDView
            services={activeServices}
            activeService={activeService}
            setActiveService={setActiveService}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ) : viewMode === "cards" ? (
          <CardsView
            services={activeServices}
            activeService={activeService}
            setActiveService={setActiveService}
          />
        ) : (
          <GridView services={activeServices} />
        )}
      </AnimatePresence>

      {/* عرض تفاصيل الخدمة */}
      <AnimatePresence>
        {activeService !== null && (
          <ServiceDetails
            service={activeServices.find((s) => s.id === activeService)!}
            onClose={() => setActiveService(null)}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </AnimatePresence>

      {/* دعوة للعمل */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mt-32"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-cyan-500 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">مستعد لبدء مشروعك القادم؟</h3>
          <p className="text-lg mb-8 opacity-90">
            دعنا نتحول أفكارك إلى واقع ملموس مع حلول هندسية مبتكرة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              احجز استشارة مجانية
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
              عرض محفظة المشاريع
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ThreeDView({
  services,
  activeService,
  setActiveService,
  isPlaying,
  setIsPlaying,
}: any) {
  return (
    <div className="relative h-[600px] max-w-6xl mx-auto px-4">
      {/* محور الدوران */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-64 border-2 border-primary/20 rounded-full" />
      </div>

      {services.map((service: Service, index: number) => {
        const angle = (index * 2 * Math.PI) / services.length;
        const radius = 280;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = service.id === activeService;

        return (
          <motion.div
            key={service.id}
            initial={{ x: 0, y: 0, scale: 0.8, opacity: 0 }}
            animate={{
              x,
              y,
              scale: isActive ? 1.1 : 0.9,
              rotateY: isActive ? 5 : 0,
              rotateX: isActive ? 5 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="absolute top-1/2 left-1/2 cursor-pointer"
            style={{ x: x - 150, y: y - 150 }}
            onClick={() => setActiveService(service.id)}
          >
            <div
              className={cn(
                "w-64 h-80 bg-white rounded-2xl p-6 border-2 shadow-xl transition-all duration-300 perspective-1000",
                isActive
                  ? "border-primary scale-105 z-10"
                  : "border-gray-200 hover:border-primary/50",
              )}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-3 mb-4`}
              >
                <service.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <div className="text-gray-500">المشاريع</div>
                  <div className="font-bold text-gray-900">
                    {service.projects}+
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">المدة</div>
                  <div className="font-bold text-gray-900">
                    {service.duration}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.features.slice(0, 2).map((feature, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function CardsView({ services, activeService, setActiveService }: any) {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {services.map((service: Service, index: number) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setActiveService(service.id)}
          >
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-10`}
                >
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">المشاريع</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {service.projects}+
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">المدة</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {service.duration}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GridView({ services }: any) {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: Service, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-2.5 mb-4`}
              >
                <service.icon className="w-full h-full text-white" />
              </div>

              <h4 className="font-bold text-gray-900 mb-2">{service.title}</h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="text-sm">
                  <div className="text-gray-500">المشاريع</div>
                  <div className="font-bold text-gray-900">
                    {service.projects}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">المدة</div>
                  <div className="font-bold text-gray-900">
                    {service.duration}
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceDetails({ service, onClose, isPlaying, setIsPlaying }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all z-10"
        >
          ✕
        </button>

        <div className="p-8 md:p-12">
          {/* رأس التفاصيل */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-4`}
                >
                  <service.icon className="w-full h-full text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="text-sm">
                      <div className="text-gray-500">المشاريع المنفذة</div>
                      <div className="font-bold text-gray-900 text-xl">
                        {service.projects}+
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">المدة النموذجية</div>
                      <div className="font-bold text-gray-900 text-xl">
                        {service.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              {/* المميزات الرئيسية */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  المميزات الرئيسية
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* الجانب الأيمن */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">
                  التقنيات المستخدمة
                </h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {service.caseStudy && (
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">دراسة حالة</h4>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">المشروع</div>
                      <div className="font-bold text-gray-900 mb-2">
                        {service.caseStudy.title}
                      </div>
                      <div className="text-sm text-primary">
                        {service.caseStudy.result}
                      </div>
                    </div>
                  </div>
                )}

                <button className="w-full py-4 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  طلب خدمة مخصصة
                </button>
              </div>
            </div>
          </div>

          {/* محتوى وسائط */}
          {(service.video || service.caseStudy?.image) && (
            <div className="mb-12">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                عرض توضيحي
              </h4>
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-900">
                {service.video ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <div className="text-white">عرض توضيحي للخدمة</div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={service.caseStudy!.image}
                    alt={service.caseStudy!.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServicesBackground() {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number }>
  >([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/5"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, Math.sin(i) * 20, 0],
            x: [0, Math.cos(i) * 10, 0],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

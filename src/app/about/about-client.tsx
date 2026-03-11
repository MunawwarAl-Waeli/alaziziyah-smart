// app/about/about-client.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Award,
  Users,
  Clock,
  Target,
  Eye,
  Heart,
  Shield,
  Star,
  Trophy,
  TrendingUp,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle,
  Sparkles,
  Rocket,
  Leaf,
  Wrench,
  PenTool,
  Layers,
  Briefcase,
  ThumbsUp,
  Calendar,
  Building,
  TreePine,
  Home,
  Crown,
  Gem,
  Medal,
  Flame,
  Zap,
  Coffee,
  Headphones,
  Handshake,
  Globe,
  Compass,
  Flag,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ===== مكون متخصص للصور المحسنة =====
const OptimizedImage = ({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden bg-muted/20", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className={cn(
          "object-cover transition-all duration-700",
          isLoading ? "scale-110 blur-xl" : "scale-100 blur-0",
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// ===== مكون متخصص للبطاقات =====
const Card = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export function AboutClient() {
  const heroRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // تحسين استخدام scroll مع التحقق من mounted
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    // layoutEffect: false,
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // بيانات الفريق مع صور محسنة
  const teamMembers = [
    {
      name: "م. أحمد العزيز",
      position: "المؤسس والرئيس التنفيذي",
      experience: "20+ سنة خبرة",
      image: "/images/4.jpg",
      bio: "مهندس معماري بخبرة واسعة في تصميم وتنفيذ المشاريع الكبرى",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "م. خالد الحربي",
      position: "مدير الهندسة والتصميم",
      experience: "15+ سنة خبرة",
      image: "/images/3.jpg",
      bio: "متخصص في التصميمات الحديثة والمبتكرة للمظلات والبرجولات",
      social: { linkedin: "#" },
    },
    {
      name: "م. فهد المطيري",
      position: "مدير المشاريع",
      experience: "12+ سنة خبرة",
      image: "/images/1.jpg",
      bio: "خبير في إدارة المشاريع الكبرى وتنفيذها بأعلى المعايير",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "م. نورة القحطاني",
      position: "مديرة قسم التصميم الداخلي",
      experience: "10+ سنة خبرة",
      image: "/images/0.jpg",
      bio: "متخصصة في دمج العناصر الجمالية مع الوظائف العملية",
      social: { linkedin: "#" },
    },
  ];

  // قيم الشركة - محسنة للألوان
  const values = [
    {
      icon: Gem,
      title: "الجودة",
      description:
        "نلتزم بأعلى معايير الجودة في جميع مشاريعنا باستخدام أفضل المواد",
      gradient: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Handshake,
      title: "النزاهة",
      description: "نعمل بشفافية ونفي بوعودنا لعملائنا وشركائنا",
      gradient: "from-green-500/20 to-green-600/20",
      iconColor: "text-green-500",
    },
    {
      icon: Flame,
      title: "الابتكار",
      description: "نسعى دائماً للتجديد والابتكار في تصاميمنا وحلولنا",
      gradient: "from-amber-500/20 to-amber-600/20",
      iconColor: "text-amber-500",
    },
    {
      icon: Heart,
      title: "العملاء أولاً",
      description: "نضع احتياجات عملائنا في مقدمة أولوياتنا",
      gradient: "from-red-500/20 to-red-600/20",
      iconColor: "text-red-500",
    },
  ];

  // الإنجازات
  const achievements = [
    { icon: Trophy, label: "جوائز التميز", value: "12+" },
    { icon: Users, label: "عميل سعيد", value: "500+" },
    { icon: Building, label: "مشروع منجز", value: "1000+" },
    { icon: Clock, label: "سنوات خبرة", value: "15+" },
    { icon: MapPin, label: "مدن نغطيها", value: "20+" },
    { icon: Medal, label: "شهادات جودة", value: "8" },
  ];

  // الجدول الزمني
  const timeline = [
    {
      year: "2008",
      title: "تأسيس الشركة",
      description: "انطلقت العزيزية كمؤسسة فردية في الرياض",
    },
    {
      year: "2012",
      title: "أول مشروع كبير",
      description: "تنفيذ مشروع مظلات لجامعة الملك سعود",
    },
    {
      year: "2015",
      title: "التوسع في المنطقة الشرقية",
      description: "افتتاح فرع الدمام",
    },
    {
      year: "2018",
      title: "شهادة ISO",
      description: "الحصول على شهادة الجودة العالمية",
    },
    {
      year: "2020",
      title: "جائزة التميز",
      description: "أفضل شركة مظلات في المملكة",
    },
    {
      year: "2024",
      title: "اليوم",
      description: "أكثر من 1000 مشروع وألف عميل سعيد",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* تحسين SEO - بيانات منظمة */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "شركة العزيزية للمظلات والسواتر",
            url: "https://alaziziah.com",
            logo: "https://alaziziah.com/logo.png",
            description:
              "رواد صناعة المظلات والسواتر في المملكة العربية السعودية",
            address: {
              "@type": "PostalAddress",
              addressLocality: "الرياض",
              addressRegion: "الرياض",
              addressCountry: "SA",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+966-55-818-1955",
              contactType: "customer service",
            },
            sameAs: [
              "https://facebook.com/alaziziah",
              "https://twitter.com/alaziziah",
              "https://instagram.com/alaziziah",
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-background via-background/98 to-background overflow-hidden">
        {/* ===== هيدر الصفحة مع تحسين SEO ===== */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
          aria-label="قسم التعريف بالشركة"
        >
          {/* خلفية متحركة محسنة للأداء */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute -top-40 -right-40 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -45, 0],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 25, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-60 -left-40 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-blue-500/10 rounded-full blur-[100px]"
            />
          </div>

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 container mx-auto px-4 max-w-6xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-primary to-primary-dark rounded-2xl md:rounded-3xl mx-auto mb-6 md:mb-8 flex items-center justify-center shadow-2xl"
            >
              <Crown className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-8"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-primary text-sm md:text-base font-bold">
                منذ 2008
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-4 md:mb-8 px-2">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">
                شركة
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-primary/80 to-primary-dark text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
                العزيزية
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              رواد صناعة المظلات والسواتر في المملكة العربية السعودية، نصنع الظل
              والجمال منذ 15 عاماً
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8 md:mt-12 px-4"
            >
              <Link
                href="#story"
                className="group px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                <span>تعرف على قصتنا</span>
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="px-6 md:px-8 py-3 md:py-4 bg-card border border-border rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:border-primary/50 transition-all"
              >
                شاهد أعمالنا
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== قصة الشركة مع تحسين SEO ===== */}
        <section
          id="story"
          className="py-16 md:py-20 lg:py-32 scroll-mt-20"
          aria-label="قصة الشركة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 md:px-5 py-2 rounded-full mb-4 md:mb-6">
                  <Flag className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  <span className="text-primary text-sm md:text-base font-bold">
                    قصتنا
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 md:mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
                    15 عاماً
                  </span>{" "}
                  من التميز والابتكار
                </h2>

                <div className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    بدأت قصة شركة العزيزية في عام 2008، عندما قرر المهندس أحمد
                    العزيز تحويل شغفه بالهندسة المعمارية إلى مشروع يقدم حلولاً
                    مبتكرة للمساحات الخارجية في المملكة.
                  </p>
                  <p>
                    انطلقنا من ورشة صغيرة في الرياض، ومع التزامنا بالجودة والدقة
                    في التنفيذ، سرعان ما أصبحنا الخيار الأول للأفراد والشركات
                    والمؤسسات الحكومية في مجال المظلات والسواتر والبرجولات.
                  </p>
                  <p>
                    اليوم، بعد 15 عاماً من العمل الدؤوب، نفخر بفريقنا المحترف
                    الذي يضم أكثر من 50 مهندساً وفنياً، وآلاف المشاريع المنفذة
                    في جميع مدن المملكة، وآلاف العملاء الذين يثقون في خدماتنا.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
                  <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-card border border-border/50 rounded-xl">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-black">
                        1000+
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        مشروع
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-card border border-border/50 rounded-xl">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-black">500+</div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        عميل
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src="/images/0.jpg"
                    alt="قصة شركة العزيزية - بداية الرحلة عام 2008"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-white">
                    <p className="text-2xl md:text-3xl font-bold">2008</p>
                    <p className="text-amber-300 text-sm md:text-base">
                      بداية الرحلة
                    </p>
                  </div>
                </div>

                {/* بطاقة إضافية عائمة - تظهر فقط على الشاشات الكبيرة */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-6 md:-bottom-10 -left-4 md:-left-10 bg-card border border-border rounded-xl md:rounded-2xl p-3 md:p-6 shadow-xl hidden md:block"
                >
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-primary rounded-lg md:rounded-xl flex items-center justify-center">
                      <Medal className="w-5 h-5 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        معتمدين من
                      </p>
                      <p className="text-sm md:text-base font-black text-foreground">
                        الهيئة السعودية
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== الرؤية والرسالة ===== */}
        <section
          className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-transparent"
          aria-label="رؤية ورسالة الشركة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-10 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 md:px-5 py-2 rounded-full mb-4">
                <Compass className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-primary text-sm md:text-base font-bold">
                  وجهتنا
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 md:mb-4">
                رؤيتنا ورسالتنا
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                ما نؤمن به ونسعى لتحقيقه في كل مشروع
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8 px-4">
              <Card delay={0.1} className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                  <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                  رؤيتنا
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  أن نكون الخيار الأول في مجال المظلات والسواتر على مستوى
                  المملكة، ونحقق الريادة من خلال الابتكار والجودة والتميز في
                  خدمة العملاء.
                </p>
              </Card>

              <Card delay={0.2} className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                  رسالتنا
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  تقديم حلول متكاملة وعالية الجودة للمساحات الخارجية، مع
                  الالتزام بأعلى معايير السلامة والدقة في التنفيذ، وبناء علاقات
                  طويلة الأمد مع عملائنا.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ===== قيمنا ===== */}
        <section className="py-16 md:py-20" aria-label="قيم الشركة">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-10 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 md:px-5 py-2 rounded-full mb-4">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-primary text-sm md:text-base font-bold">
                  قيمنا
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 md:mb-4">
                المبادئ التي نؤمن بها
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                القيم الأساسية التي توجه عملنا وتحدد هويتنا
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
              {values.map((value, index) => (
                <Card
                  key={index}
                  delay={index * 0.1}
                  className="text-center p-6"
                >
                  <div
                    className={cn(
                      "w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4",
                      value.gradient,
                    )}
                  >
                    <value.icon
                      className={cn("w-6 h-6 md:w-8 md:h-8", value.iconColor)}
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== الجدول الزمني ===== */}
        <section
          className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-transparent"
          aria-label="مسيرة الشركة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-10 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 md:px-5 py-2 rounded-full mb-4">
                <Clock className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-primary text-sm md:text-base font-bold">
                  مسيرتنا
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 md:mb-4">
                رحلة 15 عاماً من النجاح
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                محطات مهمة في تاريخ الشركة
              </p>
            </motion.div>

            <div className="relative px-4">
              {/* الخط الزمني للشاشات الكبيرة */}
              <div className="absolute right-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

              <div className="space-y-6 md:space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-1 w-full md:w-auto">
                      <Card className="p-4 md:p-6 w-full">
                        <span className="text-primary font-black text-xl md:text-2xl block mb-1 md:mb-2">
                          {item.year}
                        </span>
                        <h3 className="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </Card>
                    </div>

                    <div className="relative z-10 w-8 h-8 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shadow-xl">
                      {index + 1}
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== فريق العمل ===== */}
        <section className="py-16 md:py-20" aria-label="فريق العمل">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-10 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 md:px-5 py-2 rounded-full mb-4">
                <Users className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-primary text-sm md:text-base font-bold">
                  فريق العمل
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 md:mb-4">
                نخبة من أفضل الكفاءات
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                فريقنا الهندسي والفني على أعلى مستوى من الكفاءة والاحترافية
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-64 sm:h-72 md:h-80 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden mb-3 md:mb-4">
                    <OptimizedImage
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* روابط التواصل الاجتماعي */}
                    <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 md:w-8 md:h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                          aria-label={`LinkedIn - ${member.name}`}
                        >
                          <Linkedin className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 md:w-8 md:h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                          aria-label={`Twitter - ${member.name}`}
                        >
                          <Twitter className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm md:text-base font-medium mb-1">
                    {member.position}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {member.experience}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== الإنجازات ===== */}
        <section
          className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-transparent"
          aria-label="إنجازات الشركة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-10 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 md:px-5 py-2 rounded-full mb-4">
                <Trophy className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-primary text-sm md:text-base font-bold">
                  إنجازاتنا
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 md:mb-4">
                أرقام تتحدث عنا
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                إحصائيات تعكس حجم خبرتنا وجودة أعمالنا
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 px-4">
              {achievements.map((item, index) => (
                <Card
                  key={index}
                  delay={index * 0.05}
                  className="text-center p-4 md:p-6 lg:p-8"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="text-xl md:text-2xl lg:text-4xl font-black text-foreground mb-1 md:mb-2">
                    {item.value}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base text-muted-foreground">
                    {item.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== قسم التواصل المحسن ===== */}
        <section className="py-16 md:py-20" aria-label="تواصل معنا">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary/90 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 lg:p-12 xl:p-16 text-white relative overflow-hidden"
            >
              {/* خلفية متحركة محسنة */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                  transition={{ duration: 40, repeat: Infinity }}
                  className="absolute -top-40 -right-40 w-[300px] md:w-96 h-[300px] md:h-96 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 35, repeat: Infinity }}
                  className="absolute -bottom-40 -left-40 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-white/10 rounded-full blur-3xl"
                />
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <div className="text-center lg:text-right">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-4 md:mb-6">
                    هل لديك مشروع وتبحث عن أفضل من ينفذه؟
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
                    تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مناسب
                    لمشروعك
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                    <a
                      href="https://wa.me/966558181955"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-6 md:px-8 py-3 md:py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl md:rounded-2xl font-bold text-sm md:text-base lg:text-lg transition-all overflow-hidden flex items-center justify-center gap-2 md:gap-3"
                      aria-label="تواصل عبر واتساب"
                    >
                      <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span>واتساب</span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </a>
                    <a
                      href="tel:966558181955"
                      className="px-6 md:px-8 py-3 md:py-4 bg-white/20 hover:bg-white/30 rounded-xl md:rounded-2xl font-bold text-sm md:text-base lg:text-lg backdrop-blur border border-white/30 flex items-center justify-center gap-2 md:gap-3"
                      aria-label="اتصال هاتفي"
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                      <span>اتصل الآن</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
                  {[
                    { icon: MapPin, text: "الرياض - جدة - الدمام" },
                    { icon: Clock, text: "الدوام 24/7" },
                    { icon: Mail, text: "info@alaziziah.com" },
                    { icon: Users, text: "فريق محترف" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 md:gap-3 bg-white/5 p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl"
                    >
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-amber-400 shrink-0" />
                      <span className="text-xs md:text-sm truncate">
                        {item.text}
                      </span>
                    </div>
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
// // app/about/about-client.tsx
// "use client";

// import React, { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   Award,
//   Users,
//   Clock,
//   Target,
//   Eye,
//   Heart,
//   Shield,
//   Star,
//   Trophy,
//   TrendingUp,
//   MapPin,
//   Phone,
//   MessageCircle,
//   Mail,
//   CheckCircle,
//   Sparkles,
//   Rocket,
//   Leaf,
//   Wrench,
//   PenTool,
//   Layers,
//   Briefcase,
//   ThumbsUp,
//   Calendar,
//   Building,
//   TreePine,
//   Home,
//   Crown,
//   Gem,
//   Medal,
//   Flame,
//   Zap,
//   Coffee,
//   Headphones,
//   Handshake,
//   Globe,
//   Compass,
//   Flag,
//   ArrowLeft,
//   ChevronDown,
// } from "lucide-react";

// export function AboutClient() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });

//   const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
//   const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

//   // بيانات الفريق
//   const teamMembers = [
//     {
//       name: "م. أحمد العزيز",
//       position: "المؤسس والرئيس التنفيذي",
//       experience: "20+ سنة خبرة",
//       image: "/images/4.jpg",
//       bio: "مهندس معماري بخبرة واسعة في تصميم وتنفيذ المشاريع الكبرى",
//     },
//     {
//       name: "م. خالد الحربي",
//       position: "مدير الهندسة والتصميم",
//       experience: "15+ سنة خبرة",
//       image: "/images/3.jpg",
//       bio: "متخصص في التصميمات الحديثة والمبتكرة للمظلات والبرجولات",
//     },
//     {
//       name: "م. فهد المطيري",
//       position: "مدير المشاريع",
//       experience: "12+ سنة خبرة",
//       image: "/images/1.jpg",
//       bio: "خبير في إدارة المشاريع الكبرى وتنفيذها بأعلى المعايير",
//     },
//     {
//       name: "م. نورة القحطاني",
//       position: "مديرة قسم التصميم الداخلي",
//       experience: "10+ سنة خبرة",
//       image: "/images/0.jpg",
//       bio: "متخصصة في دمج العناصر الجمالية مع الوظائف العملية",
//     },
//   ];

//   // قيم الشركة
//   const values = [
//     {
//       icon: Gem,
//       title: "الجودة",
//       description:
//         "نلتزم بأعلى معايير الجودة في جميع مشاريعنا باستخدام أفضل المواد",
//     },
//     {
//       icon: Handshake,
//       title: "النزاهة",
//       description: "نعمل بشفافية ونفي بوعودنا لعملائنا وشركائنا",
//     },
//     {
//       icon: Flame,
//       title: "الابتكار",
//       description: "نسعى دائماً للتجديد والابتكار في تصاميمنا وحلولنا",
//     },
//     {
//       icon: Heart,
//       title: "العملاء أولاً",
//       description: "نضع احتياجات عملائنا في مقدمة أولوياتنا",
//     },
//   ];

//   // الإنجازات
//   const achievements = [
//     { icon: Trophy, label: "جوائز التميز", value: "12+" },
//     { icon: Users, label: "عميل سعيد", value: "500+" },
//     { icon: Building, label: "مشروع منجز", value: "1000+" },
//     { icon: Clock, label: "سنوات خبرة", value: "15+" },
//     { icon: MapPin, label: "مدن نغطيها", value: "20+" },
//     { icon: Medal, label: "شهادات جودة", value: "8" },
//   ];

//   // الجدول الزمني
//   const timeline = [
//     {
//       year: "2008",
//       title: "تأسيس الشركة",
//       description: "انطلقت العزيزية كمؤسسة فردية في الرياض",
//     },
//     {
//       year: "2012",
//       title: "أول مشروع كبير",
//       description: "تنفيذ مشروع مظلات لجامعة الملك سعود",
//     },
//     {
//       year: "2015",
//       title: "التوسع في المنطقة الشرقية",
//       description: "افتتاح فرع الدمام",
//     },
//     {
//       year: "2018",
//       title: "شهادة ISO",
//       description: "الحصول على شهادة الجودة العالمية",
//     },
//     {
//       year: "2020",
//       title: "جائزة التميز",
//       description: "أفضل شركة مظلات في المملكة",
//     },
//     {
//       year: "2024",
//       title: "اليوم",
//       description: "أكثر من 1000 مشروع وألف عميل سعيد",
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-background via-background/98 to-background">
//       {/* ===== هيدر الصفحة ===== */}
//       <section
//         ref={heroRef}
//         className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
//       >
//         {/* خلفية متحركة */}
//         <div className="absolute inset-0">
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               rotate: [0, 45, 0],
//               opacity: [0.2, 0.4, 0.2],
//             }}
//             transition={{ duration: 20, repeat: Infinity }}
//             className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
//           />
//           <motion.div
//             animate={{
//               scale: [1, 1.3, 1],
//               rotate: [0, -45, 0],
//               opacity: [0.2, 0.3, 0.2],
//             }}
//             transition={{ duration: 25, repeat: Infinity, delay: 2 }}
//             className="absolute -bottom-60 -left-40 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[100px]"
//           />

//           {/* أيقونات خلفية */}
//           <motion.div
//             animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
//             transition={{ duration: 12, repeat: Infinity }}
//             className="absolute top-32 left-[10%] text-primary/5 hidden lg:block"
//           >
//             <Building className="w-32 h-32" />
//           </motion.div>
//           <motion.div
//             animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
//             transition={{ duration: 15, repeat: Infinity, delay: 1 }}
//             className="absolute bottom-32 right-[15%] text-primary/5 hidden lg:block"
//           >
//             <Trophy className="w-40 h-40" />
//           </motion.div>
//         </div>

//         <motion.div
//           style={{ opacity: heroOpacity, scale: heroScale }}
//           className="relative z-10 container mx-auto px-4 max-w-6xl text-center"
//         >
//           {/* <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className="w-28 h-28 bg-gradient-to-br from-primary to-primary-dark rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl"
//           >
//             <Crown className="w-14 h-14 text-white" />
//           </motion.div> */}

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-6 py-3 rounded-full mb-8"
//           >
//             <Sparkles className="w-4 h-4 text-primary" />
//             <span className="text-primary font-bold">منذ 2008</span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-8"
//           >
//             <span className="block">شركة</span>
//             <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-primary/80 to-primary-dark">
//               العزيزية
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
//           >
//             رواد صناعة المظلات والسواتر في المملكة العربية السعودية، نصنع الظل
//             والجمال منذ 15 عاماً
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="flex flex-wrap gap-4 justify-center mt-12"
//           >
//             <Link
//               href="#story"
//               className="group px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center gap-2"
//             >
//               <span>تعرف على قصتنا</span>
//               <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
//             </Link>
//             <Link
//               href="/projects"
//               className="px-8 py-4 bg-card border border-border rounded-2xl font-bold text-lg hover:border-primary/50 transition-all"
//             >
//               شاهد أعمالنا
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* ===== قصة الشركة ===== */}
//       <section id="story" className="py-20 lg:py-32">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-6">
//                 <Flag className="w-4 h-4 text-primary" />
//                 <span className="text-primary font-bold">قصتنا</span>
//               </div>

//               <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
//                   15 عاماً
//                 </span>{" "}
//                 من التميز والابتكار
//               </h2>

//               <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
//                 <p>
//                   بدأت قصة شركة العزيزية في عام 2008، عندما قرر المهندس أحمد
//                   العزيز تحويل شغفه بالهندسة المعمارية إلى مشروع يقدم حلولاً
//                   مبتكرة للمساحات الخارجية في المملكة.
//                 </p>
//                 <p>
//                   انطلقنا من ورشة صغيرة في الرياض، ومع التزامنا بالجودة والدقة
//                   في التنفيذ، سرعان ما أصبحنا الخيار الأول للأفراد والشركات
//                   والمؤسسات الحكومية في مجال المظلات والسواتر والبرجولات.
//                 </p>
//                 <p>
//                   اليوم، بعد 15 عاماً من العمل الدؤوب، نفخر بفريقنا المحترف الذي
//                   يضم أكثر من 50 مهندساً وفنياً، وآلاف المشاريع المنفذة في جميع
//                   مدن المملكة، وآلاف العملاء الذين يثقون في خدماتنا.
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-4 mt-8">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
//                     <CheckCircle className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-black">1000+</div>
//                     <div className="text-sm text-muted-foreground">مشروع</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
//                     <Users className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-black">500+</div>
//                     <div className="text-sm text-muted-foreground">عميل</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="relative"
//             >
//               <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
//                 <Image
//                   src="/images/0.jpg"
//                   alt="قصة شركة العزيزية"
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
//                 <div className="absolute bottom-8 right-8 text-white">
//                   <p className="text-3xl font-bold">2008</p>
//                   <p className="text-amber-300">بداية الرحلة</p>
//                 </div>
//               </div>

//               {/* بطاقة إضافية عائمة */}
//               <motion.div
//                 animate={{ y: [0, -20, 0] }}
//                 transition={{ duration: 6, repeat: Infinity }}
//                 className="absolute -bottom-10 -left-10 bg-card border border-border rounded-2xl p-6 shadow-xl"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
//                     <Medal className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-foreground">معتمدين من</p>
//                     <p className="text-primary font-black">الهيئة السعودية</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ===== الرؤية والرسالة ===== */}
//       <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-4">
//               <Compass className="w-4 h-4 text-primary" />
//               <span className="text-primary font-bold">وجهتنا</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
//               رؤيتنا ورسالتنا
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               ما نؤمن به ونسعى لتحقيقه في كل مشروع
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-8">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-all group"
//             >
//               <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                 <Eye className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-foreground mb-4">
//                 رؤيتنا
//               </h3>
//               <p className="text-muted-foreground text-lg leading-relaxed">
//                 أن نكون الخيار الأول في مجال المظلات والسواتر على مستوى المملكة،
//                 ونحقق الريادة من خلال الابتكار والجودة والتميز في خدمة العملاء.
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//               className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-all group"
//             >
//               <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                 <Target className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-foreground mb-4">
//                 رسالتنا
//               </h3>
//               <p className="text-muted-foreground text-lg leading-relaxed">
//                 تقديم حلول متكاملة وعالية الجودة للمساحات الخارجية، مع الالتزام
//                 بأعلى معايير السلامة والدقة في التنفيذ، وبناء علاقات طويلة الأمد
//                 مع عملائنا.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ===== قيمنا ===== */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-4">
//               <Heart className="w-4 h-4 text-primary" />
//               <span className="text-primary font-bold">قيمنا</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
//               المبادئ التي نؤمن بها
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               القيم الأساسية التي توجه عملنا وتحدد هويتنا
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="group text-center p-6 bg-card border border-border rounded-3xl hover:border-primary/30 hover:shadow-xl transition-all"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/30 transition-all">
//                   <value.icon className="w-8 h-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-bold text-foreground mb-2">
//                   {value.title}
//                 </h3>
//                 <p className="text-muted-foreground text-sm">
//                   {value.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== الجدول الزمني ===== */}
//       <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-4">
//               <Clock className="w-4 h-4 text-primary" />
//               <span className="text-primary font-bold">مسيرتنا</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
//               رحلة 15 عاماً من النجاح
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               محطات مهمة في تاريخ الشركة
//             </p>
//           </motion.div>

//           <div className="relative">
//             {/* الخط الزمني */}
//             <div className="absolute right-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

//             <div className="space-y-12">
//               {timeline.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`relative flex flex-col md:flex-row items-center gap-8 ${
//                     index % 2 === 0 ? "md:flex-row-reverse" : ""
//                   }`}
//                 >
//                   <div className="flex-1 text-center md:text-right">
//                     <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all">
//                       <span className="text-primary font-black text-2xl block mb-2">
//                         {item.year}
//                       </span>
//                       <h3 className="text-xl font-bold text-foreground mb-2">
//                         {item.title}
//                       </h3>
//                       <p className="text-muted-foreground">
//                         {item.description}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-xl">
//                     {index + 1}
//                   </div>

//                   <div className="flex-1 md:block hidden" />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== فريق العمل ===== */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-4">
//               <Users className="w-4 h-4 text-primary" />
//               <span className="text-primary font-bold">فريق العمل</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
//               نخبة من أفضل الكفاءات
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               فريقنا الهندسي والفني على أعلى مستوى من الكفاءة والاحترافية
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="group"
//               >
//                 <div className="relative h-80 rounded-3xl overflow-hidden mb-4">
//                   <Image
//                     src={member.image}
//                     alt={member.name}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                   <div className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
//                     <p className="text-sm">{member.experience}</p>
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold text-foreground mb-1">
//                   {member.name}
//                 </h3>
//                 <p className="text-primary font-medium mb-2">
//                   {member.position}
//                 </p>
//                 <p className="text-sm text-muted-foreground">{member.bio}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== الإنجازات ===== */}
//       <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-4">
//               <Trophy className="w-4 h-4 text-primary" />
//               <span className="text-primary font-bold">إنجازاتنا</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
//               أرقام تتحدث عنا
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               إحصائيات تعكس حجم خبرتنا وجودة أعمالنا
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
//             {achievements.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="group bg-card border border-border rounded-3xl p-8 text-center hover:border-primary/30 hover:shadow-xl transition-all"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                   <item.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="text-4xl font-black text-foreground mb-2">
//                   {item.value}
//                 </div>
//                 <div className="text-muted-foreground">{item.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== قسم التواصل ===== */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary/90 rounded-[3rem] p-12 lg:p-16 text-white relative overflow-hidden"
//           >
//             {/* خلفية متحركة */}
//             <div className="absolute inset-0 overflow-hidden">
//               <motion.div
//                 animate={{ rotate: [0, 360], scale: [1, 1.5, 1] }}
//                 transition={{ duration: 30, repeat: Infinity }}
//                 className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
//               />
//               <motion.div
//                 animate={{ rotate: [0, -360], scale: [1, 1.3, 1] }}
//                 transition={{ duration: 25, repeat: Infinity }}
//                 className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
//               />
//             </div>

//             <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h2 className="text-4xl lg:text-5xl font-black mb-6">
//                   هل لديك مشروع وتبحث عن أفضل من ينفذه؟
//                 </h2>
//                 <p className="text-xl text-white/80 mb-8 leading-relaxed">
//                   تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مناسب
//                   لمشروعك
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <a
//                     href="https://wa.me/966558181955"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-bold text-lg transition-all overflow-hidden flex items-center justify-center gap-3"
//                   >
//                     <MessageCircle className="w-5 h-5" />
//                     واتساب
//                     <motion.div
//                       className="absolute inset-0 bg-white/20"
//                       initial={{ x: "-100%" }}
//                       whileHover={{ x: "100%" }}
//                       transition={{ duration: 0.5 }}
//                     />
//                   </a>
//                   <a
//                     href="tel:966558181955"
//                     className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-2xl font-bold text-lg backdrop-blur border border-white/30 flex items-center justify-center gap-3"
//                   >
//                     <Phone className="w-5 h-5" />
//                     اتصل الآن
//                   </a>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   { icon: MapPin, text: "الرياض - جدة - الدمام" },
//                   { icon: Clock, text: "الدوام 24/7" },
//                   { icon: Mail, text: "info@alaziziah.com" },
//                   { icon: Users, text: "فريق محترف" },
//                 ].map((item, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 bg-white/5 p-4 rounded-xl"
//                   >
//                     <item.icon className="w-5 h-5 text-amber-400" />
//                     <span className="text-sm">{item.text}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   );
// }

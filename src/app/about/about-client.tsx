"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Users,
  Clock,
  Target,
  Eye,
  Heart,
  Trophy,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle,
  Sparkles,
  Crown,
  Gem,
  Medal,
  Flame,
  Handshake,
  Compass,
  Flag,
  ChevronDown,
  Twitter,
  Linkedin,
  Building,
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
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-muted/20",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className={cn(
          "object-cover transition-all duration-700",
          isLoading ? "scale-110 blur-xl" : "scale-100 blur-0",
        )}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-card border border-border/50 rounded-xl p-4 md:p-6 hover:border-primary/30 hover:shadow-lg transition-all",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export default function AboutClient() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

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

  const achievements = [
    { icon: Trophy, label: "جوائز التميز", value: "12+" },
    { icon: Users, label: "عميل سعيد", value: "500+" },
    { icon: Building, label: "مشروع منجز", value: "1000+" },
    { icon: Clock, label: "سنوات خبرة", value: "15+" },
    { icon: MapPin, label: "مدن نغطيها", value: "20+" },
    { icon: Medal, label: "شهادات جودة", value: "8" },
  ];

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "شركة العزيزية للمظلات والسواتر",
            url: "https://al-azizia.com",
            logo: "https://al-azizia.com/logo.png",
            description:
              "رواد صناعة المظلات والسواتر في المملكة العربية السعودية",
            address: {
              "@type": "PostalAddress",
              addressLocality: "جدة",
              addressRegion: "جدة",
              addressCountry: "SA",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+966 53 098 9975",
              contactType: "customer service",
            },
            sameAs: [
              "https://facebook.com/alazizia",
              "https://twitter.com/alazizia",
              "https://instagram.com/alazizia",
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-background via-background/98 to-background overflow-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
          aria-label="قسم التعريف بالشركة"
        >
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
              className="w-16 h-16 md:w-28 md:h-28 bg-gradient-to-br from-primary to-primary-dark rounded-2xl md:rounded-3xl mx-auto mb-4 md:mb-8 flex items-center justify-center shadow-2xl"
            >
              <Crown className="w-8 h-8 md:w-14 md:h-14 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 md:px-5 md:py-2 rounded-full mb-4 md:mb-6"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-primary text-xs md:text-base font-bold">
                منذ 2008
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-3 md:mb-6 px-2">
              <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 md:mb-2">
                شركة
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-primary/80 to-primary-dark text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                العزيزية
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              رواد صناعة المظلات والسواتر في المملكة العربية السعودية، نصنع الظل
              والجمال منذ 15 عاماً
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mt-6 md:mt-10 px-4"
            >
              <Link
                href="#story"
                className="group px-5 py-2.5 md:px-7 md:py-3 bg-primary text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                <span>تعرف على قصتنا</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="px-5 py-2.5 md:px-7 md:py-3 bg-card border border-border rounded-xl md:rounded-2xl font-bold text-sm md:text-base hover:border-primary/50 transition-all"
              >
                شاهد أعمالنا
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* قصة الشركة */}
        <section
          id="story"
          className="py-12 md:py-20 lg:py-28 scroll-mt-20"
          aria-label="قصة الشركة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4">
                  <Flag className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  <span className="text-primary text-xs md:text-sm font-bold">
                    قصتنا
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
                    15 عاماً
                  </span>{" "}
                  من التميز والابتكار
                </h2>

                <div className="space-y-3 text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
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

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-black">1000+</div>
                      <div className="text-xs text-muted-foreground">مشروع</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-black">500+</div>
                      <div className="text-xs text-muted-foreground">عميل</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src="/images/0.jpg"
                    alt="قصة شركة العزيزية - بداية الرحلة عام 2008"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 text-white">
                    <p className="text-xl md:text-3xl font-bold">2008</p>
                    <p className="text-amber-300 text-xs md:text-sm">
                      بداية الرحلة
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-5 -left-3 bg-card border border-border rounded-xl p-3 shadow-xl hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Medal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        معتمدين من
                      </p>
                      <p className="text-sm font-black text-foreground">
                        الهيئة السعودية
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* الرؤية والرسالة */}
        <section
          className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent"
          aria-label="رؤية ورسالة الشركة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-3">
                <Compass className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs font-bold">وجهتنا</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-2">
                رؤيتنا ورسالتنا
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                ما نؤمن به ونسعى لتحقيقه في كل مشروع
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              <Card delay={0.1} className="p-5 md:p-7">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  رؤيتنا
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  أن نكون الخيار الأول في مجال المظلات والسواتر على مستوى
                  المملكة، ونحقق الريادة من خلال الابتكار والجودة والتميز في
                  خدمة العملاء.
                </p>
              </Card>

              <Card delay={0.2} className="p-5 md:p-7">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  رسالتنا
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  تقديم حلول متكاملة وعالية الجودة للمساحات الخارجية، مع
                  الالتزام بأعلى معايير السلامة والدقة في التنفيذ، وبناء علاقات
                  طويلة الأمد مع عملائنا.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* قيمنا */}
        <section className="py-12 md:py-20" aria-label="قيم الشركة">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-3">
                <Heart className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs font-bold">قيمنا</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-2">
                المبادئ التي نؤمن بها
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                القيم الأساسية التي توجه عملنا وتحدد هويتنا
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {values.map((value, index) => (
                <Card
                  key={index}
                  delay={index * 0.1}
                  className="text-center p-5"
                >
                  <div
                    className={cn(
                      "w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-3",
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

        {/* الجدول الزمني - محسن للجوال */}
        <section
          className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent"
          aria-label="مسيرة الشركة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-3">
                <Clock className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs font-bold">مسيرتنا</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-2">
                رحلة 15 عاماً من النجاح
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                محطات مهمة في تاريخ الشركة
              </p>
            </motion.div>

            <div className="relative">
              {/* الخط العمودي للشاشات الكبيرة فقط */}
              <div className="absolute right-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.05 }}
                    className="relative flex flex-col md:flex-row items-center gap-3 md:gap-6"
                  >
                    {/* المحتوى */}
                    <div
                      className={`flex-1 w-full ${index % 2 === 0 ? "md:order-2" : ""}`}
                    >
                      <Card className="p-4 md:p-5 w-full">
                        <span className="text-primary font-black text-lg md:text-2xl block mb-1">
                          {item.year}
                        </span>
                        <h3 className="text-base md:text-xl font-bold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </Card>
                    </div>

                    {/* النقطة الزمنية */}
                    <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg shrink-0">
                      {index + 1}
                    </div>

                    {/* مساحة فارغة للتوازن */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* فريق العمل */}
        <section className="py-12 md:py-20" aria-label="فريق العمل">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-3">
                <Users className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs font-bold">
                  فريق العمل
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-2">
                نخبة من أفضل الكفاءات
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                فريقنا الهندسي والفني على أعلى مستوى من الكفاءة والاحترافية
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-64 w-full rounded-xl overflow-hidden mb-3">
                    <OptimizedImage
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                          aria-label={`LinkedIn - ${member.name}`}
                        >
                          <Linkedin className="w-3 h-3 text-white" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                          aria-label={`Twitter - ${member.name}`}
                        >
                          <Twitter className="w-3 h-3 text-white" />
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

        {/* الإنجازات */}
        <section
          className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent"
          aria-label="إنجازات الشركة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-3">
                <Trophy className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs font-bold">
                  إنجازاتنا
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-2">
                أرقام تتحدث عنا
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                إحصائيات تعكس حجم خبرتنا وجودة أعمالنا
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {achievements.map((item, index) => (
                <Card
                  key={index}
                  delay={index * 0.05}
                  className="text-center p-4 md:p-6"
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <item.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="text-xl md:text-3xl font-black text-foreground mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* قسم التواصل */}
        <section className="py-12 md:py-20" aria-label="تواصل معنا">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary/90 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-14 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 40, repeat: Infinity }}
                  className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }}
                  transition={{ duration: 35, repeat: Infinity }}
                  className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                />
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="text-center lg:text-right">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4">
                    هل لديك مشروع وتبحث عن أفضل من ينفذه؟
                  </h2>
                  <p className="text-sm md:text-lg text-white/80 mb-5 md:mb-6 leading-relaxed">
                    تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مناسب
                    لمشروعك
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <a
                      href="https://wa.me/966558181955"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-5 py-2.5 md:px-7 md:py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-sm md:text-base transition-all overflow-hidden flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
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
                      className="px-5 py-2.5 md:px-7 md:py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-sm md:text-base backdrop-blur border border-white/30 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>اتصل الآن</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: MapPin, text: "الرياض - جدة - الدمام" },
                    { icon: Clock, text: "الدوام 24/7" },
                    { icon: Mail, text: "info@alaziziah.com" },
                    { icon: Users, text: "فريق محترف" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/5 p-2 md:p-3 rounded-lg"
                    >
                      <item.icon className="w-4 h-4 text-amber-400 shrink-0" />
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

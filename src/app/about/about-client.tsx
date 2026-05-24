"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/config";
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
  Linkedin,
  Building,
  ShieldCheck,
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
          "object-cover transition-all duration-1000 ease-out",
          isLoading ? "scale-110 blur-xl" : "scale-100 blur-0",
        )}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// ===== مكون متخصص للبطاقات الفخمة =====
const PremiumCard = ({
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={cn(
        "bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-6 md:p-8 hover:bg-card hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 group",
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

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // يمكنك تعديل الأسماء هنا إذا كانت غير صحيحة، أو تركها كأقسام هندسية
  const teamMembers = [
    {
      name: "الإدارة التنفيذية",
      position: "قيادة برؤية طموحة",
      experience: "خبرة استراتيجية واسعة",
      image: "/images/4.jpg",
      bio: "إدارة متمرسة تضع الجودة والابتكار في قمة أولوياتها لضمان ريادة المؤسسة.",
    },
    {
      name: "القسم الهندسي",
      position: "تصميم وإشراف",
      experience: "نخبة من المهندسين",
      image: "/images/3.jpg",
      bio: "فريق هندسي متخصص في تحويل الأفكار إلى واقع ملموس بأعلى المعايير الإنشائية.",
    },
    {
      name: "إدارة المشاريع",
      position: "تنفيذ ومتابعة",
      experience: "إدارة احترافية",
      image: "/images/1.jpg",
      bio: "نضمن تسليم المشاريع في وقتها المحدد مع الالتزام التام بالمواصفات الفنية.",
    },
    {
      name: "إدارة الجودة",
      position: "فحص وضمان",
      experience: "دقة متناهية",
      image: "/images/0.jpg",
      bio: "رقابة صارمة على جميع مراحل العمل لضمان استدامة ومتانة مخرجاتنا.",
    },
  ];

  const values = [
    {
      icon: Gem,
      title: "الجودة الفائقة",
      description:
        "ننتقي أجود الخامات العالمية لضمان عمر افتراضي يمتد لسنوات طويلة.",
      gradient: "from-amber-500/10 to-amber-600/10",
      iconColor: "text-amber-500",
    },
    {
      icon: ShieldCheck,
      title: "الضمان والموثوقية",
      description:
        "نقدم ضمانات حقيقية وموثقة تعكس ثقتنا التامة في جودة أعمالنا.",
      gradient: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Crown,
      title: "التصميم المبتكر",
      description:
        "نصمم حلولاً تدمج بين الوظيفة العملية واللمسة الجمالية الفاخرة.",
      gradient: "from-emerald-500/10 to-emerald-600/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Handshake,
      title: "الشراكة مع العميل",
      description:
        "نستمع لاحتياجاتك ونشاركك خطوة بخطوة لنحقق النتيجة التي تفوق تطلعاتك.",
      gradient: "from-purple-500/10 to-purple-600/10",
      iconColor: "text-purple-500",
    },
  ];

  const achievements = [
    { icon: Trophy, label: "معايير التميز", value: "الريادة" },
    { icon: Users, label: "ثقة العملاء", value: "100%" },
    { icon: Building, label: "مشاريع منجزة", value: "1000+" },
    { icon: ShieldCheck, label: "سنوات الضمان", value: "15" },
    { icon: MapPin, label: "تغطية جغرافية", value: "شاملة" },
    { icon: Medal, label: "جودة معتمدة", value: "ISO" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "مؤسسة العزيزية للمظلات والسواتر",
            url: "https://al-azizia.com",
            logo: "https://al-azizia.com/logo.png",
            description:
              "المؤسسة السعودية الرائدة في تصميم وتركيب المظلات والسواتر والبرجولات بأعلى معايير الجودة والفخامة.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "جدة",
              addressRegion: "مكة المكرمة",
              addressCountry: "SA",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+966 53 098 9975",
              contactType: "customer service",
            },
          }),
        }}
      />

      <main className="min-h-screen bg-background pt-24 md:pt-28 overflow-hidden font-sans selection:bg-primary/30">
        {/* ================= Hero Section الفخم (الستايل الهندسي الجديد) ================= */}
        <section
          ref={heroRef}
          // تم إزالة pt-24 الزائدة من هنا، واكتفينا بـ min-h-[85vh] ليكون ملتصقاً بالهيدر
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pb-12"
          aria-label="الواجهة التعريفية"
        >
          {/* 1. الخطوط الهندسية في الخلفية */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[120%] h-[100%] bg-gradient-to-b from-transparent via-amber-500/5 dark:via-amber-500/10 to-transparent rotate-[-35deg] transform origin-top-right" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[120%] h-[100%] bg-gradient-to-t from-transparent via-slate-500/5 dark:via-slate-500/10 to-transparent rotate-[-35deg] transform origin-bottom-left" />
          </div>

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            // تم إزالة mt-20 الزائدة من هنا لرفع المحتوى للأعلى
            className="relative z-10 container mx-auto px-4 max-w-5xl text-center"
          >
            {/* 2. الشكل الهندسي الفاخر - تم حل مشكلة الدوران */}
            <div
              className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-10 flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {/* الحلقة الذهبية */}
              <div
                className="absolute inset-0"
                style={{
                  transform: "rotateX(70deg) rotateY(20deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  // إضافة border-t-transparent لنتمكن من رؤية الدوران (يعطي شكل المدار)
                  className="w-full h-full border-[3px] md:border-[4px] border-amber-500 border-t-transparent rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                />
              </div>

              {/* الحلقة الفضية/الداكنة */}
              <div
                className="absolute inset-0"
                style={{
                  transform: "rotateX(70deg) rotateY(-40deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  // إضافة border-b-transparent هنا
                  className="w-full h-full border-[3px] md:border-[4px] border-slate-400 dark:border-slate-500 border-b-transparent rounded-full shadow-[0_0_15px_rgba(148,163,184,0.1)]"
                />
              </div>

              {/* الحلقة الثالثة (لون الهوية) */}
              <div
                className="absolute inset-0"
                style={{
                  transform: "rotateX(70deg) rotateY(80deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  // إضافة border-r-transparent هنا
                  className="w-full h-full border-[3px] md:border-[4px] border-primary/80 border-r-transparent rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
                />
              </div>
            </div>

            {/* 3. النصوص المكتوبة بفخامة */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-black tracking-tight mb-6"
            >
              <span className="block text-xl md:text-3xl text-amber-600 dark:text-amber-500 mb-2 font-bold tracking-widest">
                شـــركـــة
              </span>
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-slate-900 dark:text-white drop-shadow-xl leading-none">
                العزيزية
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-base sm:text-lg md:text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed px-4 font-medium"
            >
              نصنع الفخامة ونبتكر حلولاً هندسية متطورة للمظلات والسواتر، لنمنح
              مساحاتك لمسة من الرقي، الحماية، والجمال المستدام.
            </motion.p>

            {/* 4. الأزرار الرسمية المتناسقة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12 px-4"
            >
              <Link
                href="/projects"
                className="px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform flex items-center justify-center"
              >
                شاهد أعمالنا
              </Link>
              <Link
                href="#profile"
                className="px-8 py-3.5 bg-transparent border-2 border-slate-900/20 dark:border-white/20 text-slate-900 dark:text-white rounded-lg font-bold text-lg hover:border-slate-900 dark:hover:border-white transition-all flex items-center justify-center"
              >
                تواصل معنا
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ================= الملف التعريفي (القصة بدون تواريخ) ================= */}
        <section
          id="profile"
          className="py-16 md:py-28 relative z-20 scroll-mt-20"
          aria-label="هوية المؤسسة"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                  <Flag className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-bold tracking-wider">
                    من نحن
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-8 leading-tight">
                  هندسة الإتقان.. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
                    وبصمة الفخامة
                  </span>
                </h2>

                <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-[1.8] font-medium">
                  <p>
                    تعتبر <strong>مؤسسة العزيزية</strong> صرحاً هندسياً رائداً
                    في المملكة العربية السعودية، متخصصاً في ابتكار وتصميم وتنفيذ
                    أرقى أنظمة المظلات، السواتر، والبرجولات التي تواكب التطور
                    العمراني وتلبي أصحاب الذوق الرفيع.
                  </p>
                  <p>
                    نحن لا نقدم مجرد غطاء للظل، بل نصنع تحفاً معمارية خارجية
                    تندمج بسلاسة مع هويتك وبيئتك. نعتمد في عملنا على أحدث
                    التقنيات العالمية، ونتعاون مع نخبة من المهندسين لضمان خروج
                    كل مشروع كلوحة فنية متكاملة تتسم بالمتانة العالية والجماليات
                    الاستثنائية.
                  </p>
                  <p>
                    التزامنا المطلق بالجودة الصارمة، واستخدامنا لأفضل الخامات
                    المقاومة للعوامل الجوية، جعلنا الخيار الموثوق والمفضل للجهات
                    الحكومية، المشاريع التجارية الكبرى، والقصور والفلل الخاصة في
                    كافة أنحاء المملكة.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10">
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-border rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-foreground">
                        ضمان شامل
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        على كافة الأعمال
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-border rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Gem className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-foreground">
                        خامات أصلية
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        مطابقة للمواصفات
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/10">
                  <OptimizedImage
                    src="/images/0.jpg"
                    alt="فخامة وإتقان أعمال مؤسسة العزيزية"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* شارة التميز */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-6 right-6 left-6 bg-white/10 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center gap-4"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-amber-300 font-medium mb-1">
                        معيار الذهب في التنفيذ
                      </p>
                      <p className="text-lg md:text-xl font-black text-white">
                        الخيار الأول بالمملكة
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= الرؤية والرسالة ================= */}
        <section
          className="py-16 md:py-28 bg-white dark:bg-slate-900 border-y border-border/50 relative"
          aria-label="رؤية ورسالة المؤسسة"
        >
          <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                تطلعات تعانق السماء
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-amber-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              {/* بطاقة الرؤية - تمت إضافة text-center */}
              <PremiumCard
                delay={0.1}
                className="relative overflow-hidden group text-center"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />

                {/* الأيقونة - تمت إضافة mx-auto هنا للتوسيط */}
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  <Eye className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                  الرؤية
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-[1.8] font-medium">
                  أن نكون العلامة التجارية الأرقى والأكثر ابتكاراً في مجال
                  التظليل المعماري، وأن نرسي معايير جديدة للفخامة والجودة
                  الاستثنائية التي تلهم قطاع المقاولات في الشرق الأوسط.
                </p>
              </PremiumCard>

              {/* بطاقة الرسالة - تمت إضافة text-center */}
              <PremiumCard
                delay={0.2}
                className="relative overflow-hidden group text-center"
              >
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors" />

                {/* الأيقونة - تمت إضافة mx-auto هنا للتوسيط */}
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                  <Target className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                  الرسالة
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-[1.8] font-medium">
                  تسخير أحدث التقنيات الهندسية لتقديم منتجات تفوق التوقعات،
                  ترتقي بجمالية المساحات، وتوفر حماية مستدامة لعملائنا، مع
                  الالتزام المطلق بالنزاهة والتميز في كل التفاصيل.
                </p>
              </PremiumCard>
            </div>
          </div>
        </section>

        {/* ================= القيم ================= */}
        <section className="py-16 md:py-28" aria-label="القيم الجوهرية">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                <Diamond className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-bold tracking-wider">
                  الركائز الأساسية
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                مبادئ نصنع بها الفارق
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <PremiumCard
                  key={index}
                  delay={index * 0.1}
                  className="text-center group hover:-translate-y-2"
                >
                  <div
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                      value.gradient,
                    )}
                  >
                    <value.icon className={cn("w-10 h-10", value.iconColor)} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                    {value.description}
                  </p>
                </PremiumCard>
              ))}
            </div>
          </div>
        </section>

        {/* ================= الإحصائيات الفخمة (مرنة للثيمين الفاتح والداكن) ================= */}
        <section
          className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/20 relative overflow-hidden border-y border-border/50"
          aria-label="أرقام وإحصائيات"
        >
      
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group text-center p-6 md:p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    <item.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-3xl md:text-5xl font-black text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {item.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= فريق العمل / الأقسام ================= */}
        <section className="py-16 md:py-28" aria-label="فريق العمل">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                هيكل تنظيمي احترافي
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                تدار مشاريعنا بواسطة منظومة متكاملة من الأقسام الهندسية والفنية
                لضمان خروج العمل بأبهى حلة.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="group"
                >
                  <div className="relative h-80 w-full rounded-[2rem] overflow-hidden mb-5 border border-border/50 shadow-sm">
                    <OptimizedImage src={member.image} alt={member.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-amber-400 text-sm font-bold mb-1">
                        {member.experience}
                      </p>
                      <h3 className="text-xl md:text-2xl font-black text-white">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                  <div className="px-2">
                    <p className="text-primary font-bold text-lg mb-2">
                      {member.position}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= قسم التواصل (مدمج بسلاسة مع الفوتر المنحني) ================= */}
        <section
          className="pt-16 md:pt-24 pb-12 md:pb-20 relative overflow-hidden border-none"
          aria-label="تواصل معنا"
        >
          {/* إضاءة خلفية خفيفة جداً تندمج مع لون الصفحة والفوتر */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 flex flex-col items-center text-center gap-8"
            >
              {/* النص (بدون أي خلفيات أو حدود) */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-foreground tracking-tight">
                  فخامة تستحقها مساحاتك
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                  نحن هنا لنحول رؤيتك إلى واقع هندسي مذهل. تواصل مع خبرائنا الآن
                  للحصول على استشارة هندسية وعرض سعر مخصص لمشروعك.
                </p>
              </div>

              {/* الأزرار */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href={SOCIAL_LINKS?.whatsapp || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 hover:-translate-y-1 shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>تواصل عبر الواتساب</span>
                </a>
                <a
                  href={SOCIAL_LINKS?.phone || "#"}
                  className="px-8 py-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
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

// أيقونة إضافية (ألماسة)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Diamond(props: any) {
  return (
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
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
      <path d="m2 12 10-10" />
      <path d="m22 12-10-10" />
    </svg>
  );
}

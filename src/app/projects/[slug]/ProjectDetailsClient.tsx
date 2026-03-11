"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Ruler,
  User,
  ArrowRight,
  CheckCircle2,
  Layers,
  Maximize2,
  X,
  Award,
  Camera,
  ChevronRight,
  ChevronLeft,
  Share2,
  ShieldCheck,
  PhoneCall,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectData } from "@/lib/api";

// إعدادات أحجام شبكة الصور الفنية
type ImageSize = "small" | "medium" | "large" | "wide";

const imagePattern: ImageSize[] = [
  "large",
  "medium",
  "medium",
  "wide",
  "small",
  "small",
  "wide",
  "medium",
];

const gridClasses: Record<ImageSize, string> = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 row-span-1 md:row-span-2",
  large: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1 md:col-span-2",
};

// الحركات
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function ProjectDetailsClient({
  project,
}: {
  project: ProjectData;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [cleanContent, setCleanContent] = useState<string>("");

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const imageY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    if (project?.content) {
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const images: string[] = [];
      let match: RegExpExecArray | null;

      while ((match = imgRegex.exec(project.content)) !== null) {
        if (match[1]) images.push(match[1]);
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGalleryImages(images);

      const cleaned = project.content
        .replace(/<figure\b[^>]*>(.*?)<\/figure>/gi, "")
        .replace(/<img\b[^>]*>/gi, "");

      setCleanContent(cleaned);
    }
  }, [project?.content]);

  const coverImage = project.featuredImage?.node.sourceUrl
    ? encodeURI(project.featuredImage.node.sourceUrl)
    : "/images/0.jpg";

  const categoryName = project.projectCategorys?.nodes[0]?.name || "مشاريعنا";
  const projectYear = project.date
    ? new Date(project.date).getFullYear().toString()
    : "٢٠٢٤";

  const projectMeta = [
    { icon: User, label: "العميل", value: "عميل خاص" },
    { icon: Ruler, label: "المساحة", value: "٤٥٠ م²" },
    { icon: Calendar, label: "التنفيذ", value: projectYear },
    { icon: MapPin, label: "الموقع", value: "الرياض" },
  ];

  return (
    <main
      className="bg-slate-950 selection:bg-primary/30 relative font-sans"
      dir="rtl"
    >
      {/* 1. قسم الـ Hero (Sticky) */}
      <div className="sticky top-0 h-[85vh] min-h-[600px] w-full flex flex-col justify-end overflow-hidden z-0">
        <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
          <Image
            src={coverImage}
            alt={project.title}
            fill
            className="object-cover scale-105"
            priority
          />
          {/* تدرج حديدي فخم */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-900/30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-24 right-4 md:top-28 md:right-12 z-40"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-white/90 hover:text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg hover:shadow-primary/20"
          >
            <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden md:inline font-medium">
              العودة للمشاريع
            </span>
          </Link>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container mx-auto px-4 lg:px-12 pb-32 md:pb-40 z-30"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center justify-center px-5 py-2 bg-primary/90 backdrop-blur-md text-primary-foreground text-sm font-bold rounded-full border border-primary-light/50 shadow-lg shadow-primary/30">
                {categoryName}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-tight md:leading-[1.15] drop-shadow-2xl"
            >
              {project.title}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 md:gap-4"
            >
              {projectMeta.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="p-2 bg-primary/20 rounded-xl">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-xs text-slate-300 font-medium">
                        {item.label}
                      </span>
                      <span className="text-sm md:text-base text-white font-bold">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. الستارة المتحركة (المحتوى) */}
      <div className="relative z-40 bg-background rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-20 pt-16 md:pt-24 pb-20 shadow-[0_-30px_60px_rgba(0,0,0,0.6)] border-t border-border/50">
        <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-16 md:w-24 h-1.5 bg-border rounded-full" />

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* الجانب الأيمن - المحتوى والمعرض */}
            <div className="lg:col-span-8 space-y-12 md:space-y-16">
              {/* تفاصيل المشروع */}
              {cleanContent && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="bg-card rounded-[2rem] p-6 md:p-10 shadow-sm border border-border"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-foreground border-b border-border pb-6">
                    <Layers className="w-8 h-8 text-primary" />
                    <span>نبذة عن المشروع</span>
                  </h2>

                  <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:text-foreground prose-a:text-primary prose-img:rounded-2xl"
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                  />
                </motion.section>
              )}

              {/* 🌟 معرض الصور (الشبكة الفنية المدلعة) 🌟 */}
              {galleryImages.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                      <Maximize2 className="w-7 h-7 text-primary" />
                      <span>معرض الصور</span>
                    </h2>

                    <span className="text-sm font-medium text-muted-foreground bg-muted px-5 py-2.5 rounded-full flex items-center gap-2 border border-border shadow-sm">
                      <Camera className="w-4 h-4" />
                      {galleryImages.length} صور
                    </span>
                  </div>

                  {/* الشبكة الذكية: عمودين في الجوال، 4 في الكمبيوتر، بارتفاعات تلقائية */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[180px]">
                    {galleryImages.map((img, index) => {
                      const size = imagePattern[index % imagePattern.length];

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index % 4) * 0.05 }}
                          whileHover={{ scale: 1.02, zIndex: 10 }}
                          className={cn(
                            "relative rounded-2xl md:rounded-[2rem] overflow-hidden cursor-zoom-in group shadow-md border border-border/50",
                            gridClasses[size],
                          )}
                          onClick={() => setLightboxIndex(index)}
                        >
                          <Image
                            src={encodeURI(img)}
                            alt={`صورة المشروع ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* أيقونة التكبير تظهر عند التمرير */}
                          <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-background/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-primary">
                            <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* معلومات السيو الإضافية */}
              {project.projectFields?.seoaftergallery && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-muted/50 p-6 md:p-10 rounded-[2rem] border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-primary" />
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      معلومات إضافية
                    </h2>
                  </div>

                  <div
                    className="prose prose-md dark:prose-invert max-w-none text-muted-foreground leading-loose"
                    dangerouslySetInnerHTML={{
                      __html: project.projectFields.seoaftergallery,
                    }}
                  />
                </motion.section>
              )}
            </div>

            {/* الجانب الأيسر - الشريط الجانبي */}
            <aside className="lg:col-span-4 relative">
              <div className="sticky top-32 space-y-6">
                {/* كرت التقييم والتواصل (فخم) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-[2rem] p-6 md:p-8 border border-border shadow-xl text-center relative overflow-hidden"
                >
                  {/* إضاءات نحاسية */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                  <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary border border-primary/20">
                    <PhoneCall className="w-8 h-8" />
                  </div>

                  <h3 className="font-bold text-xl mb-3 text-foreground relative">
                    هل أعجبك مستوى التنفيذ؟
                  </h3>

                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed relative">
                    نحن هنا لتحويل أفكارك إلى واقع. تواصل معنا للحصول على
                    استشارة هندسية وعرض سعر مخصص لمشروعك.
                  </p>

                  <Link
                    href="/contact"
                    className="relative flex justify-center w-full py-4 bg-gradient-to-l from-primary-dark to-primary text-primary-foreground font-bold rounded-xl hover:shadow-[0_10px_20px_rgba(245,158,11,0.3)] transition-all hover:-translate-y-1 mb-3"
                  >
                    اطلب عرض سعر
                  </Link>

                  <button className="relative w-full flex items-center justify-center gap-2 py-3.5 bg-muted text-foreground font-bold rounded-xl hover:bg-accent transition-colors border border-border">
                    <Share2 className="w-5 h-5" />
                    مشاركة المشروع
                  </button>
                </motion.div>

                {/* كرت الضمانات */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-900 rounded-[2rem] p-6 md:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden"
                >
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-lg">لماذا تختارنا؟</h3>
                  </div>

                  <ul className="space-y-5 relative z-10">
                    {[
                      { text: "ضمان شامل يصل إلى 10 سنوات", icon: Award },
                      {
                        text: "أفضل الخامات المقاومة لعوامل الطقس",
                        icon: ShieldCheck,
                      },
                      {
                        text: "تنفيذ دقيق وإشراف هندسي متكامل",
                        icon: CheckCircle2,
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <li
                          key={index}
                          className="flex items-start gap-4 group"
                        >
                          <div className="mt-1 flex-shrink-0 p-1.5 rounded-lg bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Lightbox عارض الصور */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-2 md:p-4 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white p-3 z-50 bg-white/10 rounded-full hover:bg-primary transition-all hover:scale-110 border border-white/20"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div
              className="relative w-full max-w-6xl h-[70vh] md:h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={encodeURI(galleryImages[lightboxIndex])}
                alt="صورة مكبرة"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="100vw"
                priority
              />
            </div>

            {/* أزرار التنقل */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev! > 0 ? prev! - 1 : galleryImages.length - 1,
                    );
                  }}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 rounded-full hover:bg-primary text-white transition-all backdrop-blur-md border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev! < galleryImages.length - 1 ? prev! + 1 : 0,
                    );
                  }}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 rounded-full hover:bg-primary text-white transition-all backdrop-blur-md border border-white/20"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            {/* العداد */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 border border-white/20 px-6 py-2.5 rounded-full backdrop-blur-md text-white text-sm tracking-widest font-bold shadow-xl">
              {lightboxIndex + 1} <span className="text-primary mx-1">/</span>{" "}
              {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence,
//   Variants, // 💡 تم استدعاء Variants لحل مشكلة التايب سكريبت
// } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   MapPin,
//   Calendar,
//   Ruler,
//   User,
//   ArrowRight,
//   CheckCircle2,
//   Layers,
//   Maximize2,
//   X,
//   Award,
//   Camera,
//   ChevronRight,
//   ChevronLeft,
//   Share2,
//   ShieldCheck,
//   PhoneCall,
//   FileText,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ProjectData } from "@/lib/api";

// // 💡 تعريف الحركات كـ Variants بشكل صحيح لحل خطأ TypeScript
// const staggerContainer: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
//   },
// };

// export default function ProjectDetailsClient({
//   project,
// }: {
//   project: ProjectData;
// }) {
//   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
//   const [galleryImages, setGalleryImages] = useState<string[]>([]);
//   const [cleanContent, setCleanContent] = useState<string>("");

//   // استخدام scrollY (بالبيكسل) للتحكم الدقيق في تلاشي الـ Hero وحركته
//   const { scrollY } = useScroll();

//   // النص يختفي تدريجياً عند النزول أول 300 بيكسل
//   const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
//   // الصورة تتحرك ببطء شديد للأسفل (Parallax) أثناء النزول
//   const imageY = useTransform(scrollY, [0, 500], [0, 100]);

//   useEffect(() => {
//     if (project.content) {
//       const imgRegex = /<img[^>]+src="([^">]+)"/g;
//       const images: string[] = [];
//       let match: RegExpExecArray | null;

//       while ((match = imgRegex.exec(project.content)) !== null) {
//         if (match[1]) images.push(match[1]);
//       }
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setGalleryImages(images);

//       const cleaned = project.content
//         .replace(/<figure\b[^>]*>(.*?)<\/figure>/gi, "")
//         .replace(/<img\b[^>]*>/gi, "");

//       setCleanContent(cleaned);
//     }
//   }, [project.content]);

//   const coverImage = project.featuredImage?.node.sourceUrl
//     ? encodeURI(project.featuredImage.node.sourceUrl)
//     : "/images/0.jpg";

//   const categoryName = project.ProjectCategory?.nodes[0]?.name || "مشاريعنا";
//   const projectYear = project.date
//     ? new Date(project.date).getFullYear().toString()
//     : "٢٠٢٤";

//   const projectMeta = [
//     { icon: User, label: "العميل", value: "عميل خاص" },
//     { icon: Ruler, label: "المساحة", value: "٤٥٠ م²" },
//     { icon: Calendar, label: "التنفيذ", value: projectYear },
//     { icon: MapPin, label: "الموقع", value: "الرياض" },
//   ];

//   return (
//     <main className="bg-gray-900 selection:bg-primary/30 relative" dir="rtl">
//       {/* 💡 1. قسم الـ Hero (Sticky)
//         هذا القسم سيلتصق بالشاشة ولن يتحرك، مما يسمح للقسم الذي تحته بالصعود فوقه
//       */}
//       <div className="sticky top-0 h-[85vh] min-h-[600px] w-full flex flex-col justify-end overflow-hidden z-0">
//         {/* الصورة الخلفية مع تأثير بارالاكس خفيف */}
//         <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
//           <Image
//             src={coverImage}
//             alt={project.title}
//             fill
//             className="object-cover scale-105" // تكبير طفيف لمنع ظهور حواف بيضاء أثناء البارالاكس
//             priority
//           />
//           {/* تدرج لوني داكن جداً من الأسفل لدمجه مع حواف الستارة */}
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/50 to-black/30" />
//         </motion.div>

//         {/* زر العودة (ثابت في الأعلى) */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="absolute top-24 right-4 md:top-28 md:right-12 z-40"
//         >
//           <Link
//             href="/projects"
//             className="group flex items-center gap-2 text-white/90 hover:text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg"
//           >
//             <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
//             <span className="hidden md:inline font-medium">
//               العودة للمشاريع
//             </span>
//           </Link>
//         </motion.div>

//         {/* محتوى الـ Hero (العنوان والتفاصيل) */}
//         <motion.div
//           style={{ opacity: heroOpacity }} // يختفي تدريجياً عند النزول
//           className="container mx-auto px-4 lg:px-12 pb-32 md:pb-40 z-30"
//         >
//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             animate="show"
//             className="max-w-5xl"
//           >
//             <motion.div variants={fadeUp} className="mb-6">
//               <span className="inline-flex items-center justify-center px-5 py-2 bg-primary/90 backdrop-blur-md text-white text-sm font-bold rounded-full border border-primary/50 shadow-lg shadow-primary/30">
//                 {categoryName}
//               </span>
//             </motion.div>

//             <motion.h1
//               variants={fadeUp}
//               className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-tight md:leading-[1.15] drop-shadow-2xl"
//             >
//               {project.title}
//             </motion.h1>

//             <motion.div
//               variants={fadeUp}
//               className="flex flex-wrap items-center gap-3 md:gap-4"
//             >
//               {projectMeta.map((item, index) => {
//                 const Icon = item.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
//                   >
//                     <div className="p-2 bg-primary/20 rounded-xl">
//                       <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="text-[10px] md:text-xs text-white/60 font-medium">
//                         {item.label}
//                       </span>
//                       <span className="text-sm md:text-base text-white font-bold">
//                         {item.value}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* 💡 2. قسم المحتوى (الستارة المتحركة - The Curtain)
//         هذا القسم يمتلك z-index عالي وهو الذي ينسحب ويغطي الـ Hero
//       */}
//       <div className="relative z-40 bg-gray-50 dark:bg-slate-950 rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-20 pt-16 md:pt-24 pb-20 shadow-[0_-30px_60px_rgba(0,0,0,0.6)] border-t border-white/5 dark:border-white/10">
//         {/* مؤشر السحب الجمالي (Drag Handle) لتعزيز إحساس البطاقة */}
//         <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-16 md:w-24 h-1.5 bg-gray-300/80 dark:bg-gray-700/80 rounded-full" />

//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
//             {/* الجانب الأيمن - المحتوى الرئيسي */}
//             <div className="lg:col-span-8 space-y-12 md:space-y-16">
//               {cleanContent && (
//                 <motion.section
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-100px" }}
//                   transition={{ duration: 0.6 }}
//                   className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-sm border border-gray-100 dark:border-gray-800"
//                 >
//                   <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-6">
//                     <Layers className="w-8 h-8 text-primary" />
//                     <span>نبذة عن المشروع</span>
//                   </h2>

//                   <div
//                     className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-primary prose-img:rounded-2xl"
//                     dangerouslySetInnerHTML={{ __html: cleanContent }}
//                   />
//                 </motion.section>
//               )}

//               {galleryImages.length > 0 && (
//                 <section>
//                   <div className="flex items-center justify-between mb-8">
//                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
//                       <Maximize2 className="w-7 h-7 text-primary" />
//                       <span>معرض الصور</span>
//                     </h2>

//                     <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-5 py-2.5 rounded-full flex items-center gap-2 border border-gray-200 dark:border-gray-700">
//                       <Camera className="w-4 h-4" />
//                       {galleryImages.length} صور
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
//                     {galleryImages.map((img, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.05 }}
//                         whileHover={{ scale: 1.02, zIndex: 10 }}
//                         className={cn(
//                           "relative rounded-2xl overflow-hidden cursor-zoom-in group shadow-md",
//                           index === 0
//                             ? "col-span-2 md:col-span-2 row-span-2 aspect-square md:aspect-auto"
//                             : "aspect-square",
//                         )}
//                         onClick={() => setLightboxIndex(index)}
//                       >
//                         <Image
//                           src={encodeURI(img)}
//                           alt={`صورة المشروع ${index + 1}`}
//                           fill
//                           className="object-cover transition-transform duration-700 group-hover:scale-110"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       </motion.div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {project.projectFields?.seoaftergallery && (
//                 <motion.section
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6 }}
//                   className="bg-gray-100/50 dark:bg-slate-800/30 p-6 md:p-10 rounded-[2rem] border border-gray-200/50 dark:border-gray-700/50"
//                 >
//                   <div className="flex items-center gap-3 mb-6">
//                     <FileText className="w-6 h-6 text-primary" />
//                     <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
//                       معلومات إضافية
//                     </h2>
//                   </div>

//                   <div
//                     className="prose prose-md dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-loose"
//                     dangerouslySetInnerHTML={{
//                       __html: project.projectFields.seoaftergallery,
//                     }}
//                   />
//                 </motion.section>
//               )}
//             </div>

//             {/* الجانب الأيسر - الشريط الجانبي (Sidebar) */}
//             <aside className="lg:col-span-4 relative">
//               <div className="sticky top-32 space-y-6">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-xl text-center relative overflow-hidden"
//                 >
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

//                   <div className="relative w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary">
//                     <PhoneCall className="w-8 h-8" />
//                   </div>

//                   <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white relative">
//                     هل أعجبك مستوى التنفيذ؟
//                   </h3>

//                   <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed relative">
//                     نحن هنا لتحويل أفكارك إلى واقع. تواصل معنا للحصول على
//                     استشارة هندسية وعرض سعر مخصص لمشروعك.
//                   </p>

//                   <Link
//                     href="/contact"
//                     className="relative block w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 mb-3"
//                   >
//                     اطلب عرض سعر
//                   </Link>

//                   <button className="relative w-full flex items-center justify-center gap-2 py-3.5 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
//                     <Share2 className="w-5 h-5" />
//                     مشاركة المشروع
//                   </button>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.1 }}
//                   className="bg-slate-900 dark:bg-slate-950 rounded-[2rem] p-6 md:p-8 text-white shadow-xl"
//                 >
//                   <div className="flex items-center gap-3 mb-6">
//                     <ShieldCheck className="w-6 h-6 text-primary" />
//                     <h3 className="font-bold text-lg">لماذا تختارنا؟</h3>
//                   </div>

//                   <ul className="space-y-5">
//                     {[
//                       { text: "ضمان شامل يصل إلى 10 سنوات", icon: Award },
//                       {
//                         text: "أفضل الخامات المقاومة لعوامل الطقس",
//                         icon: ShieldCheck,
//                       },
//                       {
//                         text: "تنفيذ دقيق وإشراف هندسي متكامل",
//                         icon: CheckCircle2,
//                       },
//                     ].map((item, index) => {
//                       const Icon = item.icon;
//                       return (
//                         <li key={index} className="flex items-start gap-4">
//                           <div className="mt-1 flex-shrink-0 p-1.5 rounded-full bg-white/10 text-primary">
//                             <Icon className="w-4 h-4" />
//                           </div>
//                           <span className="text-gray-300 text-sm leading-relaxed">
//                             {item.text}
//                           </span>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </motion.div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>

//       {/* Lightbox عارض الصور */}
//       <AnimatePresence>
//         {lightboxIndex !== null && galleryImages.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm"
//             onClick={() => setLightboxIndex(null)}
//           >
//             <button
//               onClick={() => setLightboxIndex(null)}
//               className="absolute top-4 right-4 md:top-6 md:right-6 text-white p-3 z-50 bg-white/10 rounded-full hover:bg-white/20 transition-all hover:scale-110"
//             >
//               <X className="w-6 h-6 md:w-8 md:h-8" />
//             </button>

//             <div
//               className="relative w-full max-w-6xl h-[70vh] md:h-[85vh]"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Image
//                 src={encodeURI(galleryImages[lightboxIndex])}
//                 alt="صورة مكبرة"
//                 fill
//                 className="object-contain"
//                 sizes="100vw"
//                 priority
//               />
//             </div>

//             {galleryImages.length > 1 && (
//               <>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setLightboxIndex((prev) =>
//                       prev! > 0 ? prev! - 1 : galleryImages.length - 1,
//                     );
//                   }}
//                   className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all backdrop-blur-md"
//                 >
//                   <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
//                 </button>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setLightboxIndex((prev) =>
//                       prev! < galleryImages.length - 1 ? prev! + 1 : 0,
//                     );
//                   }}
//                   className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all backdrop-blur-md"
//                 >
//                   <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
//                 </button>
//               </>
//             )}

//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 px-5 py-2 rounded-full backdrop-blur-md text-white text-sm tracking-widest font-medium">
//               {lightboxIndex + 1} / {galleryImages.length}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// }

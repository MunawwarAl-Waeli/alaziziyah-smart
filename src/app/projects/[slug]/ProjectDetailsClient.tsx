"use client";

import { useState, useRef, useEffect } from "react";
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
  Calendar,
  Ruler,
  User,
  ArrowRight,
  CheckCircle2,
  Layers,
  Wind,
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. تعريف واجهة البيانات القادمة من الووردبريس
interface WPProject {
  id: string;
  title: string;
  date: string;
  content: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
  categories?: { nodes: { name: string }[] };
}

export default function ProjectDetailsClient({
  project,
}: {
  project: WPProject;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // 2. معالجة البيانات: استخراج الصور من محتوى الووردبريس لصنع المعرض
  useEffect(() => {
    if (project.content) {
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const images: string[] = [];
      let match;
      while ((match = imgRegex.exec(project.content)) !== null) {
        images.push(match[1]);
      }
      setGalleryImages(images);
    }
  }, [project.content]);

  // تجهيز المتغيرات الآمنة
  const coverImage = project.featuredImage?.node.sourceUrl
    ? encodeURI(project.featuredImage.node.sourceUrl)
    : "/images/0.jpg"; // صورة افتراضية

  const categoryName = project.categories?.nodes[0]?.name || "مشاريعنا";
  const projectYear = new Date(project.date).getFullYear().toString();

  // بيانات افتراضية إذا لم تكن تستخدم ACF في الووردبريس للحقول المخصصة
  const mockData = {
    client: "عميل خاص",
    area: "مساحة مخصصة",
    duration: "تم التنفيذ بالوقت المحدد",
    location: "المملكة العربية السعودية",
  };

  return (
    <main
      className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 pt-24"
      dir="rtl"
    >
      {/* Hero Section */}
      <div
        ref={containerRef}
        className="relative h-[60vh] md:h-[80vh] max-h-[900px] w-full overflow-hidden bg-gray-900"
      >
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        </motion.div>

        <div className="absolute top-24 right-4 md:right-8 z-40 hidden md:block">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-black/60 font-medium"
          >
            <ArrowRight className="w-5 h-5" />
            <span>العودة للمعرض</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pb-20 pt-10 px-4 md:px-16 z-30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-primary/30">
                  {categoryName}
                </span>
                <span className="flex items-center gap-1 text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm border border-white/10">
                  <Calendar className="w-4 h-4" /> {projectYear}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 md:-mt-20 relative z-40">
        {/* البطاقة العائمة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 p-6 md:p-8 rounded-3xl shadow-2xl mb-16 relative">
          <InfoItem label="العميل" value={mockData.client} icon={User} />
          <InfoItem label="المساحة" value={mockData.area} icon={Ruler} />
          <InfoItem
            label="حالة التنفيذ"
            value={mockData.duration}
            icon={CheckCircle2}
          />
          <InfoItem label="الموقع" value={mockData.location} icon={MapPin} />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* الجانب الأيمن (المحتوى الرئيسي) */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <Layers className="w-8 h-8 text-primary" />
                تفاصيل المشروع
              </h2>
              {/* عرض محتوى الووردبريس بأمان */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-loose"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            </section>

            {/* معرض الصور المستخرج من المحتوى */}
            {galleryImages.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  معرض الصور
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {galleryImages.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={cn(
                        "relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all",
                        index === 0
                          ? "md:col-span-2 aspect-video"
                          : "aspect-[4/3]",
                      )}
                      onClick={() => setLightboxIndex(index)}
                    >
                      <Image
                        src={encodeURI(img)}
                        alt={`صورة ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                          <Maximize2 className="w-6 h-6" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* الشريط الجانبي الثابت */}
          <div className="lg:col-span-4 h-full relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 md:p-8 text-center border border-blue-100 dark:border-blue-900/30">
                <p className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  هل أعجبك مستوى التنفيذ؟
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-1 mt-4"
                >
                  اطلب عرض سعر لمشروعك
                </Link>
                <button className="w-full flex items-center justify-center gap-2 mt-4 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <Share2 className="w-5 h-5" />
                  مشاركة المشروع
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white p-2 z-50 bg-white/10 rounded-full hover:bg-white/20"
            >
              <X className="w-8 h-8" />
            </button>
            <div
              className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={encodeURI(galleryImages[lightboxIndex])}
                alt="Full screen"
                fill
                className="object-contain"
              />
            </div>
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev! > 0 ? prev! - 1 : galleryImages.length - 1,
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 text-white backdrop-blur-md"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev! < galleryImages.length - 1 ? prev! + 1 : 0,
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 text-white backdrop-blur-md"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function InfoItem({ label, value, icon: Icon }: any) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-2 group hover:-translate-y-1 transition-transform duration-300">
      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
        {label}
      </div>
      <div className="font-bold text-gray-900 dark:text-white text-lg">
        {value}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Sparkles, ArrowLeft, ImageIcon, Folders } from "lucide-react";
import { ProjectData } from "@/lib/api"; // تأكد من مسار الواجهة
import { cn } from "@/lib/utils";
import { ElegantCurveDivider } from "../ui/ElegantCurveDivider";

export default function ProjectsGridClient({
  projects,
}: {
  projects: ProjectData[];
}) {
  // نعرض أول 6 مشاريع فقط في الصفحة الرئيسية لعدم إطالة الصفحة
  const displayProjects = projects.slice(0, 6);

  return (
    <section
      className="py-20 md:py-32 bg-background relative overflow-hidden"
      dir="rtl"
    >
      <ElegantCurveDivider />

      {/* إضاءة خلفية فخمة لكسر جمود اللون الداكن */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم (العنوان) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5 shadow-sm"
            >
              <Folders className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary text-[11px] md:text-xs font-bold tracking-widest uppercase">
                سجل إنجازاتنا
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground drop-shadow-sm mb-4">
              معرض{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-dark to-primary">
                أعمالنا
              </span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              تصفح ألبومات مشاريعنا السابقة. كل بطاقة تحتوي على معرض صور متكامل
              يوثق مراحل العمل ودقة التنفيذ.
            </p>
          </div>

          {/* زر عرض الكل (يظهر في الكمبيوتر بجانب العنوان) */}
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-foreground font-bold hover:text-primary transition-all group px-6 py-3 rounded-xl border border-border hover:border-primary/30 bg-card hover:shadow-lg shadow-sm"
          >
            <span>استعرض كافة المشاريع</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
          </Link>
        </div>

        {/* شبكة المشاريع (مُحسنة للجوال والكمبيوتر) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProjects.map((project, index) => {
            // 1. المعالجة الذكية للبيانات
            const coverImage =
              project.featuredImage?.node?.sourceUrl ||
              (project.galleryImages && project.galleryImages[0]?.sourceUrl) ||
              "/images/placeholder.jpg"; // صورة افتراضية

            const imageCount = project.galleryImages?.length || 0;

            // التعامل مع اختلاف المسميات في الـ GraphQL (ProjectCategory vs projectCategorys)
            //   // @ts-ignore - نتجاهل خطأ التايب سكريبت المؤقت لأننا نتحقق من الكلمتين
            const categories =
              project.projectCategorys?.nodes ||
              //   project.projectCategorys?.nodes ||
              [];
            const categoryName = categories[0]?.name || "مشاريعنا";

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-card border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 transition-all duration-500"
                >
                  {/* الصورة الخلفية */}
                  <Image
                    src={coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    unoptimized
                  />

                  {/* تدرج لوني لحماية النص (فخم جداً) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

                  {/* محتوى البطاقة */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    {/* الجزء العلوي: عدد الصور (مؤشر الألبوم) */}
                    <div className="flex justify-end">
                      {imageCount > 0 && (
                        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white shadow-lg">
                          <Camera className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[11px] font-bold tracking-wider">
                            {imageCount} صور
                          </span>
                        </div>
                      )}
                    </div>

                    {/* الجزء السفلي: التصنيف والعنوان */}
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary-foreground bg-primary rounded-full shadow-lg">
                        {categoryName}
                      </span>

                      <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-snug line-clamp-2 drop-shadow-md group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* السهم المتفاعل */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="text-xs font-bold text-slate-300">
                          تصفح ألبوم المشروع
                        </span>
                        <ArrowLeft className="w-4 h-4 text-primary transform group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* زر عرض الكل للجوال (يظهر فقط في الشاشات الصغيرة) */}
        <div className="mt-12 md:hidden flex justify-center">
          <Link
            href="/projects"
            className="w-full flex justify-center items-center gap-3 py-4 bg-card border border-border text-foreground font-bold rounded-xl shadow-sm hover:border-primary transition-all active:scale-95"
          >
            <span>استعرض كافة المشاريع</span>
            <ArrowLeft className="w-5 h-5 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}

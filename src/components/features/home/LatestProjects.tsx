"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

// تعريف نوع بيانات المشروع القادمة من الووردبريس
type Project = {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: { name: string }[];
  };
};

export function LatestProjects({ projects }: { projects: Project[] }) {
  // إعدادات حركة الظهور المتسلسل
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="py-20 bg-accent/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* عنوان القسم */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-primary font-bold text-sm bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-4">
              سابقة أعمالنا
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              مشاريع نفخر <span className="text-primary">بإنجازها</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              تصفح مجموعة من أحدث المشاريع التي قمنا بتنفيذها لعملائنا بأعلى
              معايير الجودة والاحترافية.
            </p>
          </div>

          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors group"
          >
            <span>عرض كل المشاريع</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
          </Link>
        </div>

        {/* التحقق من وجود مشاريع */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-background rounded-3xl border border-border/50">
            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">
              جاري تحديث معرض الأعمال...
            </p>
          </div>
        ) : (
          /* شبكة المشاريع */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block relative overflow-hidden rounded-3xl aspect-[4/3] bg-background border border-border/50 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* الصورة البارزة */}
                  {project.featuredImage?.node?.sourceUrl ? (
                    <Image
                      src={project.featuredImage.node.sourceUrl}
                      alt={project.featuredImage.node.altText || project.title}
                      fill
                      sizes="(max-w-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-accent">
                      <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}

                  {/* تراكب لوني (Overlay) لحماية النص */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

                  {/* تفاصيل المشروع فوق الصورة */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                    {/* التصنيف */}
                    {project.categories?.nodes &&
                      project.categories.nodes.length > 0 && (
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm rounded-lg">
                          {project.categories.nodes[0].name}
                        </span>
                      )}

                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                      {project.title}
                    </h3>

                    {/* السهم الذي يظهر عند التمرير */}
                    <div className="flex items-center gap-2 text-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-sm font-bold text-white">
                        تفاصيل المشروع
                      </span>
                      <ArrowLeft className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* زر عرض الكل للجوال فقط */}
        <div className="mt-10 md:hidden flex justify-center">
          <Link
            href="/projects"
            className="bg-foreground text-background px-8 py-4 rounded-full font-bold flex items-center gap-2 active:scale-95 transition-transform"
          >
            <span>تصفح معرض الأعمال</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

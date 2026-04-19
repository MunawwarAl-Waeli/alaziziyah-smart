"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Sparkles,
  BookOpen,
  TrendingUp,
  Eye,
  MapPin,
} from "lucide-react";
import { authors, blogPosts, cities } from "@/app/blog/data/posts"; // ✅ استيراد البيانات الموجودة
import { ElegantCurveDivider } from "@/components/ui/ElegantCurveDivider";

export function BlogSection() {
  // أخذ أحدث 3 مقالات (مرتبة حسب التاريخ)
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background to-slate-50 dark:to-slate-950"
      dir="rtl"
    >
      <ElegantCurveDivider />

      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            x: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold">
              مدونة العزيزية
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            أحدث{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
              المقالات
            </span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            نصائح وإرشادات احترافية لاختيار وتصميم وصيانة المظلات والسواتر
          </p>
        </motion.div>

        {/* شبكة المقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                {/* صورة المقالة */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* تصنيف المقالة والمدينة */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg">
                      {post.category.name}
                    </span>
                    {post.city && (
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.city.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* محتوى المقالة */}
                <div className="p-6">
                  {/* معلومات النشر */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} دقائق
                    </span>
                    {post.views && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* الكاتب وزر القراءة */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {post.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* زر عرض جميع المقالات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-l from-primary to-primary-dark text-white rounded-2xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all"
          >
            <span className="relative z-10 flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              <span>جميع المقالات</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>

        {/* إحصائيات سريعة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            {
              icon: BookOpen,
              value: blogPosts.length.toString() + "+",
              label: "مقال",
            },
            { icon: TrendingUp, value: "100K+", label: "مشاهدة" },
            {
              icon: User,
              value: authors.length.toString() + "+",
              label: "كاتب",
            },
            { icon: MapPin, value: cities.length.toString(), label: "مدن" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="text-center p-4 bg-card/50 backdrop-blur rounded-xl border border-border/50"
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

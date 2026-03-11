"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, Eye, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "../types/bolg.types";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showReadTime?: boolean;
  showViews?: boolean;
  showTags?: boolean;
  showCategory?: boolean;
  className?: string;
  priority?: boolean;
}

export function BlogCard({
  post,
  variant = "default",
  showExcerpt = true,
  showAuthor = true,
  showDate = true,
  showReadTime = true,
  showViews = false,
  showTags = false,
  showCategory = true,
  className = "",
  priority = false,
}: BlogCardProps) {
  // تنسيق التاريخ
  const formattedDate = new Date(post.date).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // ألوان التصنيفات المختلفة
  const categoryColors: Record<
    string,
    { bg: string; text: string; darkBg: string }
  > = {
    carports: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      darkBg: "dark:bg-blue-950/30 dark:text-blue-400",
    },
    pergolas: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      darkBg: "dark:bg-emerald-950/30 dark:text-emerald-400",
    },
    fences: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      darkBg: "dark:bg-amber-950/30 dark:text-amber-400",
    },
    schools: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      darkBg: "dark:bg-purple-950/30 dark:text-purple-400",
    },
    maintenance: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      darkBg: "dark:bg-rose-950/30 dark:text-rose-400",
    },
    materials: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      darkBg: "dark:bg-indigo-950/30 dark:text-indigo-400",
    },
  };

  const categoryColor = categoryColors[post.category.slug] || {
    bg: "bg-slate-50",
    text: "text-slate-700",
    darkBg: "dark:bg-slate-800 dark:text-slate-300",
  };

  // تصميم البطاقة المميزة (أكبر حجماً)
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden",
          "border-2 border-amber-100 dark:border-amber-900/30",
          "shadow-lg hover:shadow-2xl transition-all duration-300",
          className,
        )}
      >
        <Link href={`/blog/${post.slug}`} className="block">
          {/* صورة المقال */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority={priority}
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* التصنيف */}
            {showCategory && (
              <div className="absolute top-4 right-4">
                <span
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold",
                    categoryColor.bg,
                    categoryColor.text,
                    categoryColor.darkBg,
                  )}
                >
                  {post.category.icon} {post.category.name}
                </span>
              </div>
            )}

            {/* العنوان */}
            <div className="absolute bottom-4 right-4 left-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-white/80 text-sm line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="p-4 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                {showDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                )}
                {showReadTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime} دقائق</span>
                  </div>
                )}
              </div>

              {showAuthor && (
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{post.author.name}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // تصميم البطاقة الأفقية (للمقالات المقترحة)
  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "group bg-white dark:bg-slate-900 rounded-xl overflow-hidden",
          "border border-amber-100 dark:border-amber-900/30",
          "hover:shadow-lg transition-all duration-300",
          className,
        )}
      >
        <Link href={`/blog/${post.slug}`} className="flex gap-4 p-3">
          {/* صورة مصغرة */}
          <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* المحتوى */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
              {post.title}
            </h4>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
              <span>•</span>
              <Clock className="w-3 h-3" />
              <span>{post.readTime} د</span>
            </div>

            {showCategory && (
              <span
                className={cn(
                  "inline-block mt-2 px-2 py-0.5 rounded text-xs",
                  categoryColor.bg,
                  categoryColor.text,
                  categoryColor.darkBg,
                )}
              >
                {post.category.name}
              </span>
            )}
          </div>
        </Link>
      </motion.div>
    );
  }

  // تصميم البطاقة المدمجة (صغيرة)
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group bg-white dark:bg-slate-900 rounded-lg overflow-hidden",
          "border border-amber-100 dark:border-amber-900/30",
          "hover:shadow-md transition-all duration-300",
          className,
        )}
      >
        <Link href={`/blog/${post.slug}`} className="block p-3">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {post.title}
          </h4>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{post.views}</span>
            </div>
          </div>

          {showCategory && (
            <span
              className={cn(
                "inline-block mt-2 px-2 py-0.5 rounded text-xs",
                categoryColor.bg,
                categoryColor.text,
                categoryColor.darkBg,
              )}
            >
              {post.category.name}
            </span>
          )}
        </Link>
      </motion.div>
    );
  }

  // التصميم الافتراضي (بطاقة شبكية)
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden",
        "border border-amber-100 dark:border-amber-900/30",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "flex flex-col h-full",
        className,
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block flex-1">
        {/* صورة المقال */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority={priority}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* شريط التصنيف المتحرك */}
          {showCategory && (
            <div className="absolute top-3 right-3">
              <span
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold shadow-lg",
                  "backdrop-blur-sm bg-white/90 dark:bg-slate-900/90",
                  "border border-amber-200 dark:border-amber-800",
                  "group-hover:bg-amber-600 group-hover:text-white transition-colors",
                  "flex items-center gap-1",
                )}
              >
                {post.category.icon}
                {post.category.name}
              </span>
            </div>
          )}

          {/* علامة "مميز" */}
          {post.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-amber-600 text-white text-xs rounded-lg shadow-lg">
                ⭐ مميز
              </span>
            </div>
          )}
        </div>

        {/* محتوى المقال */}
        <div className="p-5 flex-1 flex flex-col">
          {/* العنوان */}
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {post.title}
          </h3>

          {/* المقتطف */}
          {showExcerpt && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* شريط المعلومات */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500 mb-3 flex-wrap">
            {showDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            )}

            {showReadTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime} د</span>
              </div>
            )}

            {showViews && (
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{post.views}</span>
              </div>
            )}
          </div>

          {/* الكاتب والمزيد */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
            {showAuthor && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  {post.author.name}
                </span>
              </div>
            )}

            <span className="text-amber-600 text-sm group-hover:translate-x-2 transition-transform duration-300">
              ←
            </span>
          </div>

          {/* الوسوم (اختياري) */}
          {showTags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* رابط سريع للمدينة إن وجدت */}
      {post.city && (
        <Link
          href={`/blog?city=${post.city.slug}`}
          className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-lg">
            📍 {post.city.name}
          </span>
        </Link>
      )}
    </motion.article>
  );
}

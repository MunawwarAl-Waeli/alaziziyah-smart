"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { BlogPost } from "../types/bolg.types";
import { motion } from "framer-motion";

interface RelatedPostsProps {
  currentPostId: string;
  categoryId: string;
  tags: string[];
  posts: BlogPost[];
}

export function RelatedPosts({
  currentPostId,
  categoryId,
  tags,
  posts,
}: RelatedPostsProps) {
  // فلترة المقالات ذات الصلة
  let relatedPosts = posts
    .filter(
      (post) =>
        post.id !== currentPostId &&
        (post.category.id === categoryId ||
          post.tags.some((tag) => tags.includes(tag))),
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    // إذا لم نجد مقالات ذات صلة، نعرض أحدث المقالات
    relatedPosts = posts
      .filter((post) => post.id !== currentPostId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-amber-600 rounded-full" />
        مقالات ذات صلة
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-amber-100 dark:border-amber-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* صورة المقال */}
              {post.coverImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* تصنيف المقال */}
                  <span className="absolute top-3 right-3 px-3 py-1 bg-amber-600 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {post.category.name}
                  </span>
                </div>
              )}

              {/* محتوى المقال */}
              <div className="p-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* معلومات إضافية */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime} دقائق</span>
                  </div>
                  <span>
                    {new Date(post.date).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* زر عرض المزيد */}
      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors font-bold"
        >
          عرض جميع المقالات
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { BlogPost } from "../types/bolg.types";

interface PostNavigationProps {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="mt-8 sm:mt-10 border-t border-amber-100 dark:border-amber-800 pt-6 sm:pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* المقالة السابقة */}
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group relative bg-gradient-to-l from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-900 p-4 sm:p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <span className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-bold mb-2 flex items-center gap-1">
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              المقالة السابقة
            </span>
            <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-amber-600 transition-colors">
              {prevPost.title}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
              <span>{prevPost.readTime} دقائق</span>
              <span>•</span>
              <span>{new Date(prevPost.date).toLocaleDateString("ar-SA")}</span>
            </div>
          </Link>
        ) : (
          <div className="opacity-50 p-4 sm:p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-gray-50 dark:bg-gray-800/20">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-bold mb-2 flex items-center gap-1">
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              المقالة السابقة
            </span>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              لا توجد مقالة سابقة
            </p>
          </div>
        )}

        {/* المقالة التالية */}
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group relative bg-gradient-to-r from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-900 p-4 sm:p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <span className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-bold mb-2 flex items-center gap-1 justify-end">
              المقالة التالية
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
            <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-amber-600 transition-colors">
              {nextPost.title}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 justify-end">
              <span>{nextPost.readTime} دقائق</span>
              <span>•</span>
              <span>{new Date(nextPost.date).toLocaleDateString("ar-SA")}</span>
            </div>
          </Link>
        ) : (
          <div className="opacity-50 p-4 sm:p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-gray-50 dark:bg-gray-800/20">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-bold mb-2 flex items-center gap-1 justify-end">
              المقالة التالية
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
            <p className="text-sm text-gray-400 dark:text-gray-500 text-left">
              لا توجد مقالة تالية
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

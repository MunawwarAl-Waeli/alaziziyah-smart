"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Category } from "../types/bolg.types";

// ✅ 1. أضفنا totalPosts كخاصية اختيارية
interface CategoriesProps {
  categories: Category[];
  selectedCategory?: string;
  showCount?: boolean;
  variant?: "sidebar" | "horizontal";
  totalPosts?: number;
}

export function Categories({
  categories,
  selectedCategory,
  showCount = true,
  variant = "sidebar",
  totalPosts, // ✅ 2. استقبلناها هنا
}: CategoriesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryClick = (categorySlug: string) => {
    if (pathname === "/blog") {
      // إذا كنا في صفحة المدونة، نضيف التصنيف كـ query param
      const params = new URLSearchParams(searchParams);
      params.set("category", categorySlug);
      params.set("page", "1");
      router.push(`/blog?${params.toString()}`);
    } else {
      // إذا كنا في صفحة أخرى، ننتقل لصفحة المدونة مع التصنيف
      router.push(`/blog?category=${categorySlug}`);
    }
  };

  if (variant === "horizontal") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("category");
            params.set("page", "1");
            router.push(`/blog?${params.toString()}`);
          }}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            !selectedCategory
              ? "bg-amber-600 text-white shadow-md"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-amber-200 dark:border-amber-800",
          )}
        >
          الكل
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedCategory === category.slug
                ? "bg-amber-600 text-white shadow-md"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-amber-200 dark:border-amber-800",
            )}
          >
            <span>
              {category.icon} {category.name}
            </span>
            {showCount && (
              <span className="mr-2 text-xs opacity-75">
                ({category.count})
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // تصميم الشريط الجانبي
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-amber-600 rounded-full" />
        التصنيفات
      </h3>

      <div className="space-y-2">
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("category");
            params.set("page", "1");
            router.push(`/blog?${params.toString()}`);
          }}
          className={cn(
            "w-full text-right px-4 py-3 rounded-xl transition-all flex items-center justify-between",
            !selectedCategory
              ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-bold"
              : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
          )}
        >
          <span>جميع المقالات</span>
          {/* ✅ 3. استخدمنا المتغير الجديد المرر من الصفحة الأب */}
          {totalPosts !== undefined && (
            <span className="text-sm text-slate-500">{totalPosts}</span>
          )}
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ x: -4 }}
            onClick={() => handleCategoryClick(category.slug)}
            className={cn(
              "w-full text-right px-4 py-3 rounded-xl transition-all flex items-center justify-between group",
              selectedCategory === category.slug
                ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-bold"
                : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
            )}
          >
            <span className="flex items-center gap-2">
              <span>{category.icon}</span>
              {category.name}
            </span>
            <span
              className={cn(
                "text-sm",
                selectedCategory === category.slug
                  ? "text-amber-600"
                  : "text-slate-400 group-hover:text-amber-500",
              )}
            >
              ({category.count})
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

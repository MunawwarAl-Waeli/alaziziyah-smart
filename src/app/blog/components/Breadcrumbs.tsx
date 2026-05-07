"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronLeft } from "lucide-react";
import { cities } from "../data/posts"; // ✅ تم حذف blogPosts من هنا
import { Category } from "../types/bolg.types";

// ✅ جعلنا المكون يقبل عنوان المقال كـ prop اختياري
interface BreadcrumbsProps {
  postTitle?: string;
  categories: Category[]; // ✅ استقبلنا قائمة التصنيفات
}

export function Breadcrumbs({ postTitle, categories }: BreadcrumbsProps) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
      <Link
        href="/"
        className="flex items-center gap-1.5 hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">الرئيسية</span>
      </Link>

      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        // ترجمة الكلمات الإنجليزية للعربية في المسار
        let label = path;
        if (path === "blog") label = "المدونة";
        else {
          const category = categories.find((c) => c.slug === path);
          const city = cities.find((c) => c.slug === path);

          if (category) label = category.name;
          else if (city) label = city.name;
          // ✅ إذا كان هذا هو الرابط الأخير (وتم تمرير عنوان المقال)، استخدم العنوان!
          else if (isLast && postTitle) label = postTitle;
          else label = decodeURIComponent(path).replace(/-/g, " ");
        }

        return (
          <div key={path} className="flex items-center gap-1.5 sm:gap-2">
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground/50" />
            {isLast ? (
              <span className="text-foreground font-medium truncate max-w-[150px] sm:max-w-[300px]">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-primary transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

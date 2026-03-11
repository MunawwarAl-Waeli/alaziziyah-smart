"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronLeft } from "lucide-react";
import { categories, cities, blogPosts } from "../data/posts";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getSegmentLabel = (segment: string, index: number) => {
    if (segment === "blog") return "المدونة";
    if (segment === "search") return "البحث";
    if (segment === "category") {
      const categorySlug = segments[index + 1];
      const category = categories.find((c) => c.slug === categorySlug);
      return category?.name || categorySlug;
    }
    if (segment === "city") {
      const citySlug = segments[index + 1];
      const city = cities.find((c) => c.slug === citySlug);
      return `مظلات ${city?.name}` || citySlug;
    }

    // إذا كان هذا هو عنوان المقالة (slug)
    const post = blogPosts.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) => p.slug === segment,
    );
    if (post) return post.title;

    return decodeURIComponent(segment);
  };

  const buildHref = (index: number) => {
    return "/" + segments.slice(0, index + 1).join("/");
  };

  if (pathname === "/blog") return null;

  return (
    <nav className="flex items-center gap-2 text-sm mb-6 bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30">
      <Link
        href="/"
        className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-amber-600 transition-colors"
      >
        <Home className="w-4 h-4" />
        الرئيسية
      </Link>

      {segments.map((segment, index) => {
        const label = getSegmentLabel(segment, index);
        const isLast = index === segments.length - 1;
        const href = buildHref(index);

        return (
          <div key={segment + index} className="flex items-center gap-2">
            <ChevronLeft className="w-3 h-3 text-slate-400" />
            {isLast ? (
              <span className="text-amber-600 dark:text-amber-400 font-medium line-clamp-1 max-w-[200px]">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="text-slate-600 dark:text-slate-400 hover:text-amber-600 transition-colors line-clamp-1"
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

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}

export function Pagination({
  currentPage,
  totalPages,
  totalPosts,
  postsPerPage,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  // حساب نطاق المقالات المعروضة
  const startPost = (currentPage - 1) * postsPerPage + 1;
  const endPost = Math.min(currentPage * postsPerPage, totalPosts);

  // إنشاء أرقام الصفحات
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // أقصى عدد من الأرقام المرئية

    if (totalPages <= maxVisible) {
      // عرض كل الصفحات
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // عرض جزء من الصفحات مع النقاط
      if (currentPage <= 3) {
        // قريب من البداية
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(-1); // للنقاط
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // قريب من النهاية
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // في المنتصف
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      {/* معلومات عدد المقالات */}
      <p className="text-sm text-slate-600 dark:text-slate-400">
        عرض {startPost} - {endPost} من {totalPosts} مقال
      </p>

      {/* أزرار التنقل */}
      <div className="flex items-center gap-2">
        {/* زر السابق */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "px-4 py-2 rounded-lg border flex items-center gap-2 transition-all",
            currentPage === 1
              ? "border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed"
              : "border-amber-200 dark:border-amber-800 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30",
          )}
        >
          <ChevronRight className="w-4 h-4" />
          السابق
        </button>

        {/* أرقام الصفحات */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === -1 ? (
              <span key={`dots-${index}`} className="px-3 py-2 text-slate-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "w-10 h-10 rounded-lg text-sm font-medium transition-all",
                  currentPage === page
                    ? "bg-amber-600 text-white shadow-md"
                    : "hover:bg-amber-50 dark:hover:bg-amber-950/30 text-slate-700 dark:text-slate-300 border border-amber-200 dark:border-amber-800",
                )}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* زر التالي */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "px-4 py-2 rounded-lg border flex items-center gap-2 transition-all",
            currentPage === totalPages
              ? "border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed"
              : "border-amber-200 dark:border-amber-800 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30",
          )}
        >
          التالي
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

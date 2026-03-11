"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="text-center p-8 max-w-md">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          عذراً، حدث خطأ غير متوقع
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-8">
          نواجه بعض المشاكل في تحميل المدونة. يرجى المحاولة مرة أخرى أو العودة
          للصفحة الرئيسية.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            إعادة المحاولة
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-amber-200 dark:border-amber-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-amber-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

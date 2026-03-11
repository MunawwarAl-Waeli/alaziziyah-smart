import Link from "next/link";
import { FileQuestion, Home, Search } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="text-center p-8 max-w-md">
        <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-amber-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          المقالة غير موجودة
        </h1>
        
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          عذراً، لم نتمكن من العثور على المقالة التي تبحث عنها. قد تكون تمت إزالتها أو الرابط غير صحيح.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/blog"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
          >
            <Search className="w-4 h-4" />
            تصفح المقالات
          </Link>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-amber-200 dark:border-amber-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-amber-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>

        {/* اقتراحات */}
        <div className="mt-12 pt-8 border-t border-amber-100 dark:border-amber-800">
          <h2 className="font-bold text-slate-800 dark:text-slate-200 mb-4">
            قد تهمك هذه المقالات
          </h2>
          <div className="space-y-2">
            <Link href="/blog/best-carport-types-iron-vs-polycarbonate" className="block text-amber-600 hover:text-amber-700 text-sm">
              أفضل أنواع مظلات السيارات
            </Link>
            <Link href="/blog/wooden-pergola-installation-guide" className="block text-amber-600 hover:text-amber-700 text-sm">
              دليل تركيب البرجولات الخشبية
            </Link>
            <Link href="/blog/carport-cost-saudi-arabia-2024" className="block text-amber-600 hover:text-amber-700 text-sm">
              أسعار تركيب المظلات في السعودية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
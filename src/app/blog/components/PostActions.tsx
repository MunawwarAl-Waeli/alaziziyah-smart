"use client"; // ✅ هذا هو المفتاح!

import { Share2, Printer } from "lucide-react";

interface PostActionsProps {
  title: string;
  excerpt: string;
}

export function PostActions({ title, excerpt }: PostActionsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.href,
      });
    } else {
      // نسخ الرابط للحالات التي لا يدعم فيها المتصفح المشاركة
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ الرابط");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-amber-100 dark:border-amber-800">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        مشاركة
      </button>
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 border border-amber-200 dark:border-amber-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-amber-50 transition-colors"
      >
        <Printer className="w-4 h-4" />
        طباعة
      </button>
    </div>
  );
}

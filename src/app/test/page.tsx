import WordPressContent from "@/lib/WordPressContent";
export default function TestPage() {
  // 1. إنشاء نص HTML يحاكي محتوى ووردبريس ويحتوي على كل حالات الروابط
  const mockWordPressHTML = `
    <h2>تجربة الروابط في المقال</h2>
    <p>هذا النص يحتوي على عدة أنواع من الروابط لاختبار الكود:</p>
    <ul>
      <li>
        <strong>رابط يحمل دومين الفرونت اند:</strong> 
        <a href="https://smart.al-azizia.com/services">الذهاب إلى صفحة الخدمات</a>
      </li>
      <li>
        <strong>رابط يحمل دومين الباك اند (ووردبريس):</strong> 
        <a href="https://wp.al-azizia.com/contact-us">تواصل معنا الان</a>
      </li>
      <li>
        <strong>رابط داخلي نسبي (Relative):</strong> 
        <a href="/about">من نحن</a>
      </li>
      <li>
        <strong>رابط خارجي:</strong> 
        <a href="https://ar.wikipedia.org/wiki/صلب_مجلفن">اقرأ عن الصلب المجلفن في ويكيبيديا</a>
      </li>
    </ul>
    <p>نحن في <strong>مؤسسة العزيزية</strong> نضمن لك أفضل جودة.</p>
  `;

  return (
    <div className="min-h-screen p-8 bg-background flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">صفحة اختبار محتوى ووردبريس</h1>

      <div className="w-full max-w-3xl border border-border p-6 rounded-2xl shadow-sm bg-card">
        {/* 2. استدعاء المكون وتمرير البيانات الوهمية له */}
        <WordPressContent
          content={mockWordPressHTML}
          className="prose prose-sm md:prose-lg max-w-none text-muted-foreground leading-relaxed prose-headings:text-foreground prose-headings:font-bold prose-a:text-primary prose-strong:text-foreground prose-img:rounded-xl md:prose-img:rounded-2xl"
        />
      </div>
    </div>
  );
}

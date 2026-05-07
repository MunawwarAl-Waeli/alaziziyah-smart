import { Metadata } from "next";
import { siteConfig } from "@/lib/seo-config";

// 🚀 1. إضافة الميتا داتا لضمان أرشفة قانونية سليمة
export const metadata: Metadata = {
  title: "سياسة الخصوصية | مؤسسة العزيزية للمظلات والسواتر",
  description:
    "تعرف على كيفية جمع وحماية بياناتك عند استخدام موقع مؤسسة العزيزية لتركيب المظلات والسواتر في السعودية.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicy() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-stone-50 dark:bg-slate-950 pt-24 pb-16"
    >
      <section className="max-w-4xl mx-auto px-6 py-12 bg-white dark:bg-slate-900 shadow-sm rounded-3xl border border-stone-200 dark:border-slate-800 leading-relaxed text-right">
        {/* العناوين الرئيسية */}
        <header className="border-b border-stone-100 dark:border-slate-800 pb-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            سياسة الخصوصية
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            <strong>تاريخ آخر تحديث:</strong> 2024-07-03
          </p>
        </header>

        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          {/* 1. المقدمة */}
          <article>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
              1. المقدمة
            </h2>
            <p>
              مرحباً بكم في{" "}
              <strong>مؤسسة العزيزية لتركيب المظلات والسواتر</strong>. نحن نثمن
              ثقتكم بنا ونلتزم بحماية خصوصية بياناتكم الشخصية.
            </p>
            <p className="mt-4">
              تحكم هذه السياسة زيارتكم لموقعنا
              <a
                href="https://al-azizia.com/"
                className="text-amber-600 hover:underline mx-1 font-bold"
              >
                al-azizia.com
              </a>
              وتوضح إجراءاتنا في جمع البيانات وحمايتها.
            </p>
          </article>

          {/* 2. التعاريف */}
          <article>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
              2. التعاريف الأساسية
            </h2>
            <ul className="space-y-3 pr-4 border-r-2 border-stone-100 dark:border-slate-800">
              <li>
                <strong>الخدمة:</strong> تعني الموقع الإلكتروني التابع للمؤسسة.
              </li>
              <li>
                <strong>البيانات الشخصية:</strong> أي معلومات تسمح بالتعرف على
                هوية الفرد.
              </li>
              <li>
                <strong>بيانات الاستخدام:</strong> معلومات تُجمع تلقائياً عند
                تصفح الموقع (مثل مدة الزيارة).
              </li>
            </ul>
          </article>

          {/* 3. البيانات التي نجمعها */}
          <article>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
              3. أنواع البيانات المجمعة
            </h2>
            <p className="mb-4">
              قد نطلب منكم تزويدنا بالبيانات التالية عند طلب عرض سعر:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "الاسم الكامل",
                "رقم الجوال",
                "عنوان البريد الإلكتروني",
                "الموقع الجغرافي (المدينة)",
                "ملفات تعريف الارتباط (Cookies)",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-stone-50 dark:bg-slate-800/50 rounded-xl border border-stone-100 dark:border-slate-800 text-sm"
                >
                  <span className="text-amber-500 font-bold">✓</span> {item}
                </div>
              ))}
            </div>
          </article>

          {/* خط فاصل جمالي */}
          <hr className="border-stone-100 dark:border-slate-800" />

          {/* 4. التواصل */}
          <article>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              4. اتصل بنا
            </h2>
            <p className="mb-4">
              لأي استفسارات تتعلق بسياسة الخصوصية، يمكنكم التواصل معنا مباشرة:
            </p>
            <a
              href="mailto:info@al-azizia.com"
              className="inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-amber-600 text-white rounded-2xl hover:bg-slate-800 transition-colors shadow-md"
            >
              info@al-azizia.com
            </a>
          </article>

          {/* الركن التقني (تم تحسين المظهر ليكون احترافياً) */}
          <footer className="mt-12 pt-8 border-t border-stone-100 dark:border-slate-800">
            <div className="bg-stone-50 dark:bg-slate-800/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                في حال وجود مشاكل تقنية، يمكنك التواصل مع مطور الموقع:
                <span className="block font-bold text-slate-900 dark:text-white mt-1">
                  م. منور الوائلي
                </span>
              </p>
              <a
                href="https://wa.me/966530989975"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-amber-600 font-bold rounded-full hover:shadow-md transition-all"
              >
                الدعم التقني
              </a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

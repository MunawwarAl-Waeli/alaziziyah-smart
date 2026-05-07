import { Metadata } from "next";
import { siteConfig } from "@/lib/seo-config"; // 💡 نستخدم إعداداتنا الموحدة

export const metadata: Metadata = {
  title: {
    default: "المدونة | العزيزية للمظلات والسواتر",
    template: "%s | مدونة العزيزية",
  },
  description:
    "اكتشف أحدث النصائح، الأفكار، والتصاميم في عالم تركيب المظلات والسواتر. دليلك الشامل لمعرفة الأسعار، الأنواع، وطرق الصيانة في جدة.",
  keywords: [
    // فئة الأسعار
    "اسعار المظلات بجدة",
    "سعر متر اللكسان",
    "تكلفة تركيب ساتر",
    "ارخص انواع السواتر",
    "اسعار البرجولات",

    // فئة الخامات والمقارنات
    "الفرق بين pvc والبولي ايثيلين",
    "افضل قماش لمظلات السيارات",
    "سواتر حديد مشغول",
    "خشب بلاستيكي للسواتر",
    "مواصفات مظلات اللكسان",

    // فئة المشاكل والحلول
    "حماية السيارة من الشمس",
    "حجب الرؤية عن الجيران",
    "مظلات ضد المطر",
    "شروط البلدية لتركيب المظلات",
    "تصريح مظلة خارجية",

    // فئة التصاميم والأفكار
    "تصاميم برجولات حدائق",
    "افكار تغطية المسابح",
    "اشكال سواتر احواش",
    "ديكورات جلسات خارجية",
    "تغطية ارتداد الفلة",

    // 🚀 فئة الصيانة والتجديد (الجديدة)
    "تغيير قماش المظلات",
    "صيانة مظلات السيارات",
    "علاج صدأ السواتر",
    "تجديد ودهان المظلات",
    "شد قماش المظلة",
    "عزل الهناجر من المطر",
    "نقل وفك المظلات",
  ],

  alternates: {
    canonical: `${siteConfig.url}/blog`, // ⚠️ افترضت أن مسار المجلد هو /blog، عدله إذا كان /posts
  },
  openGraph: {
    title: "مدونة العزيزية للمظلات والسواتر",
    description:
      "دليلك الشامل لاختيار وتصميم وصيانة المظلات والسواتر بخبرة تزيد عن 15 عاماً.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    type: "website",
    locale: "ar_SA",
    // يفضل وضع صورة مصممة خصيصاً كغلاف للمدونة
    images: [`${siteConfig.url}/7.jpg`],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🚀 السلاح السري: إضافة سكيما Blog الخاصة بجوجل
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "مدونة مؤسسة العزيزية",
    description:
      "مدونة متخصصة في نشر ثقافة البناء والتظليل، ونصائح اختيار المظلات والسواتر في السعودية.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {/* تم إضافة container لتنظيم عرض المقالات لاحقاً */}
      <div className="min-h-screen pt-20 pb-12 bg-slate-50 dark:bg-slate-950">
        {children}
      </div>
    </>
  );
}

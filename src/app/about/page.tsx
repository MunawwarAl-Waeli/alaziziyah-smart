import { Metadata } from "next";
// تنبيه تقني: الاستدعاء الديناميكي (dynamic) هنا قد يضر الـ SEO
// إذا كان محتوى الصفحة يظهر أعلى الشاشة (Above the fold).
// جوجل يفضل المحتوى المصير على الخادم (SSR) فوراً.
import AboutClient from "./about-client";

export const metadata: Metadata = {
  // 1. العنوان: دمج اسم البراند + الكلمات المفتاحية الشرائية + الموقع الجغرافي (جدة)
  title: "عن شركة العزيزية | أفضل مظلات وسواتر وبرجولات في جدة",
  // 2. الوصف: رسالة تسويقية قوية + تنوع الخدمات + ضمان الثقة
  description:
    "مؤسسة العزيزية (خبرة 15 عاماً): مقاول معتمد في جدة لتركيب المظلات، السواتر، البرجولات، والهناجر. نوفر خامات (لكسان، قماش، حديد) بضمان ذهبي وتنفيذ سريع.",
  alternates: {
    canonical: "/about",
  },
  // 3. الكلمات المفتاحية: نية بحث حقيقية لمناطق جدة بدلاً من الكلمات العامة
  keywords:
    "شركة مظلات بجدة, مقاول مظلات جدة, تركيب سواتر جدة, برجولات حدائق بجدة, العزيزية للمظلات والسواتر, مظلات سيارات بجدة",
  openGraph: {
    title: "شركة العزيزية للمظلات والسواتر | رواد تظليل المساحات بجدة",
    description:
      "أكثر من 15 عاماً من الابتكار في تركيب المظلات والسواتر بجدة. تعرف على قدراتنا وتنوع خدماتنا.",
    url: "https://al-azizia.com/about",
    siteName: "العزيزية للمظلات والسواتر",
    locale: "ar_SA",
    type: "profile",
    images: [
      {
        url: "/images/0.jpg",
        width: 1200,
        height: 630,
        alt: "طاقم عمل شركة العزيزية أثناء تركيب مشاريع المظلات في جدة",
      },
    ],
  },
};

export default function AboutPage() {
  // 4. السلاح السري: بيانات السكيما (JSON-LD) المخصصة للنشاط التجاري المحلي
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "مؤسسة العزيزية للمظلات والسواتر",
      image: "https://al-azizia.com/images/0.jpg",
      description:
        "شركة مقاولات متخصصة في تركيب المظلات، السواتر، البرجولات، والخيام في جدة والمملكة العربية السعودية.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "جدة",
        addressRegion: "منطقة مكة المكرمة",
        addressCountry: "SA",
      },
      priceRange: "$$",
      telephone: "+966530989975", // ⚠️ ضع رقم جوال المؤسسة هنا
      areaServed: ["جدة", "مكة", "الطائف"], // تحديد نطاق العمل مهم جداً للمنافسة
    },
  };

  return (
    <>
      {/* حقن السكيما بداخل الصفحة لتلتهمها عناكب جوجل فوراً */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}

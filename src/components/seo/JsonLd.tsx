"use client";
import { usePathname } from "next/navigation";

export function JsonLd() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // 1. كود النشاط التجاري (تم إصلاح التحذيرات والبيانات الجغرافية)
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "العزيزية للمظلات والسواتر",
    url: "https://al-azizia.com",
    logo: "https://al-azizia.com/icon.png",
    image: "https://al-azizia.com/main-project-image.jpg", // إضافة الحقل المفقود (image) لحل التحذير الأصفر
    description:
      "شركة رائدة في تركيب المظلات والسواتر والبرجولات في المملكة العربية السعودية",
    telephone: "+966530989975", // إضافة الهاتف في المستوى الرئيسي لحل التحذير الثاني
    address: {
      "@type": "PostalAddress",
      streetAddress: "حي النخيل",
      addressLocality: "جدة",
      addressRegion: "منطقة مكة المكرمة", // تصحيح المنطقة (جدة تتبع مكة وليس الشرقية)
      postalCode: "32415",
      addressCountry: "SA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966530989975",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [
      "https://facebook.com/alazizia",
      "https://twitter.com/alazizia",
      "https://instagram.com/alazizia",
      "https://youtube.com/alazizia",
    ],
    openingHours: "Sa-Th 08:00-20:00",
    priceRange: "SAR",
    // تفعيل التقييمات في الصفحة الرئيسية فقط لضمان دقة البيانات لدى جوجل
    ...(isHomePage && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "500",
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };

  // 2. كود مسارات التنقل (BreadcrumbList) - لحل مشكلة "المسارات صفر"
  const pathNodes = pathname.split("/").filter((node) => node);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://al-azizia.com",
      },
      ...pathNodes.map((node, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: decodeURIComponent(node).replace(/-/g, " "),
        item: `https://al-azizia.com/${pathNodes.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  return (
    <>
      {/* حقن كود النشاط التجاري */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      {/* حقن كود مسارات التنقل فقط في الصفحات الداخلية */}
      {!isHomePage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
}

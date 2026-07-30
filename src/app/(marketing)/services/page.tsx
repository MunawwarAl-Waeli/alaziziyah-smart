import { Metadata } from "next";
import { getAllServices, getAllServiceCategories } from "@/lib/api";
import ServicesPageClient from "@/components/services/services-page-client";

export const metadata: Metadata = {
  // 1. العنوان: أقوى، ويحتوي على الكلمات المفتاحية الرئيسية والمدينة (جدة)
  title: "خدمات تركيب المظلات والسواتر بجدة | العزيزية للمقاولات",
  // 2. الوصف: نية تجارية واضحة، ذكر الخامات، والتأكيد على الضمان
  description:
    "اكتشف خدمات مؤسسة العزيزية الرائدة في جدة. متخصصون في تفصيل وتركيب المظلات (سيارات، حدائق)، السواتر بكافة أنواعها، البرجولات، والهناجر بأفضل الخامات وضمان ذهبي.",
  // 3. الكلمات المفتاحية: مركزة على ما يبحث عنه العميل الفعلي
  keywords:
    "خدمات مظلات جدة, تركيب سواتر, تفصيل برجولات, مقاول هناجر, مظلات سيارات بجدة, اسعار المظلات, سواتر خشبية, مظلات لكسان",
  // 4. الرابط المعتمد لمنع تكرار المحتوى
  alternates: {
    canonical: "/services",
  },
  // 5. تخصيص الظهور في منصات التواصل
  openGraph: {
    title: "خدمات مؤسسة العزيزية | أفضل حلول التظليل بجدة",
    description:
      "تصفح كتالوج خدماتنا المتكامل في تركيب المظلات والسواتر والبرجولات بأعلى جودة.",
    url: "https://support.al-azizia.com/services",
    siteName: "العزيزية للمظلات والسواتر",
    locale: "ar_SA",
    type: "website",
    // يفضل وضع رابط لصورة مجمعة تبرز أفضل خدماتكم هنا
    images: ["/images/1.jpg"],
  },
};

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([
    getAllServices(),
    getAllServiceCategories(),
  ]);

  const allCategories = [{ name: "الكل", slug: "all" }, ...categories];

  // 6. السلاح السري: سكيما قائمة الخدمات (ItemList)
  // هذا يخبر جوجل بشكل رسمي أن هذه الصفحة تحتوي على "قائمة" من الخدمات
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services
      .slice(0, 10)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((service: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://support.al-azizia.com/services/${service.slug}`,
        name: service.title, // تأكد من أن المتغير title يطابق اسم الخاصية في بياناتك
      })),
  };

  return (
    <>
      {/* حقن السكيما بداخل الصفحة */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageClient
        initialServices={services}
        categories={allCategories}
      />
    </>
  );
}

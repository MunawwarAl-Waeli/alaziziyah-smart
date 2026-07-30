import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getServiceBySlug, getAllServices } from "@/lib/api";
import ServiceDetailClient from "@/components/services/service-detail-client";
import { fixDoubleEncoding } from "@/lib/utils";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo-config";

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({ slug: service.slug }));
}

// 🚀 تحديث فوري وسريع (دقيقة واحدة)
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return { title: "خدمة غير موجودة" };

  const service = await getServiceBySlug(cleanSlug);
  if (!service) return { title: "خدمة غير موجودة" };

  const canonicalUrl = `https://support.al-azizia.com/services/${cleanSlug}`;

  // 🚀 عنوان طوارئ "بيعي" في حال نسيان تعبئة Yoast/RankMath
  const defaultTitle = `تركيب ${service.title} بجدة | مؤسسة العزيزية للمقاولات`;
  const defaultDesc = `نقدم أفضل خدمات تفصيل وتركيب ${service.title} بأعلى جودة وخامات مضمونة. تواصل معنا الآن للحصول على عرض سعر في جدة والمملكة.`;

  return {
    title: service.seo?.title || defaultTitle,
    description: service.seo?.metaDesc || defaultDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    // إضافة الـ OpenGraph مهمة لصفحة الخدمة لزيادة النقر عند المشاركة في واتساب
    openGraph: {
      title: service.seo?.title || defaultTitle,
      description: service.seo?.metaDesc || defaultDesc,
      url: canonicalUrl,
      images: [
        {
          url:
            service.featuredImage?.node?.sourceUrl ||
            "https://al-azizia.com/1.jpg",
          width: 1200,
          height: 630,
        },
      ],
      type: "article", // يفضل article للخدمات المفصلة
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const { cleanSlug, needsRedirect } = fixDoubleEncoding(slug);
  console.log("cleanSlug:", cleanSlug, "needsRedirect:", needsRedirect);
  if (!cleanSlug) notFound();

  if (needsRedirect) {
    redirect(`/services/${encodeURIComponent(cleanSlug)}`);
  }

  const service = await getServiceBySlug(cleanSlug);
  if (!service) notFound();

  const path = `/services/${cleanSlug}`;
  const bSchema = breadcrumbSchema(path);

  // 🚀 السكيما النظيفة (بدون نجوم وهمية + بدون WWW + صورة صحيحة)
  const sSchema = serviceSchema({
    name: service.title,
    description:
      service.seo?.metaDesc ||
      service.content?.replace(/<[^>]*>?/gm, "").slice(0, 160) ||
      `خدمة تركيب ${service.title} من مؤسسة العزيزية`,
    image:
      service.featuredImage?.node?.sourceUrl ||
      "https://support.al-azizia.com/1.jpg",
    category: service.serviceCategories?.nodes[0]?.name || "مقاولات عامة",
    // ⚠️ تم الحذف النهائي لـ ratingValue و reviewCount لحماية الموقع من عقوبات جوجل
  });

  const allServices = await getAllServices();
  const currentCategorySlugs =
    service.serviceCategories?.nodes.map((n:{ slug: string }) => n.slug) || [];

  let relatedServices = allServices.filter((s) => {
    const isDifferentService = s.slug !== service.slug;
    const shareCategory = s.serviceCategories?.nodes.some((cat:{ slug: string }) =>
      currentCategorySlugs.includes(cat.slug),
    );
    return isDifferentService && shareCategory;
  });

  if (relatedServices.length === 0) {
    relatedServices = allServices
      .filter((s) => s.slug !== service.slug)
      .slice(0, 4);
  } else {
    relatedServices = relatedServices.slice(0, 4);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sSchema) }}
      />

      <ServiceDetailClient
        service={service}
        relatedServices={relatedServices}
      />
    </>
  );
}

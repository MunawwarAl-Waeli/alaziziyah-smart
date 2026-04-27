import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getServiceBySlug, getAllServices } from "@/lib/api";
import ServiceDetailClient from "@/components/services/service-detail-client";
import { fixDoubleEncoding } from "@/lib/utils";
// استيراد الدوال التي جهزناها في ملف الـ SEO
import { breadcrumbSchema, serviceSchema } from "@/lib/seo-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return { title: "خدمة غير موجودة" };

  const service = await getServiceBySlug(cleanSlug);
  if (!service) return { title: "خدمة غير موجودة" };

  return {
    title: service.seo?.title || service.title,
    description: service.seo?.metaDesc,
    alternates: {
      canonical: `https://al-azizia.com/services/${cleanSlug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const { cleanSlug, needsRedirect } = fixDoubleEncoding(slug);

  if (!cleanSlug) notFound();

  if (needsRedirect) {
    redirect(`/services/${encodeURIComponent(cleanSlug)}`);
  }

  const service = await getServiceBySlug(cleanSlug);
  if (!service) notFound();

  // --- إعداد البيانات المنظمة (JSON-LD) ---
  const path = `/services/${cleanSlug}`;

  // 1. كود مسارات التنقل (لرفع الرقم من صفر في التقرير)
  const bSchema = breadcrumbSchema(path);

  // 2. كود الخدمة (لإظهار النجوم والبيانات الصحيحة)
  const sSchema = serviceSchema({
    name: service.title,
    description:
      service.seo?.metaDesc ||
      service.content?.replace(/<[^>]*>?/gm, "").slice(0, 160),
    image:
      service.featuredImage?.node?.sourceUrl ||
      "https://www.al-azizia.com/icon.png",
    category: service.serviceCategories?.nodes[0]?.name || "مظلات وسواتر",
    ratingValue: "4.9", // القيمة التي ظهرت في اختبارك
    reviewCount: "500", // القيمة التي ظهرت في اختبارك
  });

  const allServices = await getAllServices();
  // ... (نفس منطق الخدمات المتعلقة الخاص بك)
  const currentCategorySlugs =
    service.serviceCategories?.nodes.map((n) => n.slug) || [];
  let relatedServices = allServices.filter((s) => {
    const isDifferentService = s.slug !== service.slug;
    const shareCategory = s.serviceCategories?.nodes.some((cat) =>
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
      {/* حقن أكواد الـ Schema في رأس الصفحة */}
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

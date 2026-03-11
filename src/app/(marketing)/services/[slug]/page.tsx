import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getServiceBySlug, getAllServices } from "@/lib/api";
import ServiceDetailClient from "@/components/services/service-detail-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const service = await getServiceBySlug(decodedSlug);

  if (!service) return { title: "الخدمة غير موجودة" };

  return {
    title: service.seo?.title || service.title,
    description: service.seo?.metaDesc,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // جلب بيانات الخدمة الحالية
  const service = await getServiceBySlug(decodedSlug);
  if (!service) notFound();

  const allServices = await getAllServices();
  // 1. استخراج الـ ID الخاص بتصنيفات الخدمة الحالية
  const currentCategorySlugs =
    service.serviceCategories?.nodes.map((n) => n.slug) || [];
  // 2. الفلترة: ابحث عن خدمات تشترك في أي تصنيف مع الخدمة الحالية
  let relatedServices = allServices.filter((s) => {
    const isDifferentService = s.slug !== service.slug;
    const shareCategory = s.serviceCategories?.nodes.some((cat) =>
      currentCategorySlugs.includes(cat.slug),
    );
    return isDifferentService && shareCategory;
  });

  // 3. 💡 الخطة البديلة: إذا كانت القائمة لا تزال فارغة، اجلب أي 4 خدمات أخرى
  if (relatedServices.length === 0) {
    relatedServices = allServices
      .filter((s) => s.slug !== service.slug)
      .slice(0, 4);
  } else {
    relatedServices = relatedServices.slice(0, 4);
  }

  return (
    <ServiceDetailClient service={service} relatedServices={relatedServices} />
  );
}

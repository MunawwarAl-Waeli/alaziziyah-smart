import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getServiceBySlug, getAllServices } from "@/lib/api";
import ServiceDetailClient from "@/components/services/service-detail-client";
import { fixDoubleEncoding } from "@/lib/utils";
interface Props {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return { title: "خدمة غير موجودة" };

  const service = await getServiceBySlug(cleanSlug);
  if (!service) return { title: "خدمة غير موجودة" };

  return {
    title: service.seo?.title || service.title,
    description: service.seo?.metaDesc,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const { cleanSlug, needsRedirect } = fixDoubleEncoding(slug);
  
  if (!cleanSlug) notFound();

  // 🚀 ضربة الـ SEO القاضية: إذا كان الرابط مشوهاً، وجه جوجل للرابط النظيف!
  if (needsRedirect) {
    // توجيه دائم (301) لتصحيح أرشفة جوجل
    redirect(`/services/${encodeURIComponent(cleanSlug)}`);
  }

  // جلب بيانات الخدمة باستخدام الاسم العربي النظيف
  const service = await getServiceBySlug(cleanSlug);
  if (!service) notFound();

  const allServices = await getAllServices();
  
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
    <ServiceDetailClient service={service} relatedServices={relatedServices} />
  );
}
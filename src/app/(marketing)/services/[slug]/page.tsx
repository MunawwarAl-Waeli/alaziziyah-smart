import { getWPData } from "@/lib/api";
import  ServiceDetailClient from "@/components/services/service-detail-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. تحديث الواجهة (Interface) ليكون params عبارة عن Promise
interface Props {
  params: Promise<{ slug: string }>;
}

// 2. تحديث Metadata لدعم الـ Promise
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // فك محتوى params باستخدام await
  const { slug } = await params;
  const { services } = await getWPData();

  // فك ترميز الرابط العربي
  const decodedSlug = decodeURIComponent(slug);
  const service = services.find((s) => s.slug === decodedSlug);

  if (!service) return { title: "الخدمة غير موجودة" };

  return {
    title: `${service.title} | العزيزية للمظلات والسواتر`,
    description: service.description,
  };
}

// 3. تحديث الصفحة الرئيسية للدراسة
export default async function ServiceDetailPage({ params }: Props) {
  // 🔥 الخطوة الأهم: فك محتوى params قبل استخدامه
  const { slug } = await params;

  const { services } = await getWPData();

  // فك ترميز الرابط العربي
  const decodedSlug = decodeURIComponent(slug);

  // البحث عن الخدمة
  const service = services.find((s) => s.slug === decodedSlug);

  // للتحقق في التيرمينال (اختياري)
  console.log("Decoded Slug:", decodedSlug);

  if (!service) return notFound();

  const relatedServices = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 4);
  // 👇 أضف هذا السطر هنا
  console.log("---------------------------------------------------");
  console.log("WHAT IS THE CLIENT COMPONENT?", ServiceDetailClient);
  console.log("TYPE:", typeof ServiceDetailClient);
  console.log("---------------------------------------------------");

  return (
    <ServiceDetailClient service={service} relatedServices={relatedServices} />
  );
}

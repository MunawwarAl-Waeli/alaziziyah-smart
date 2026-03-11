import { getAllServices, getAllServiceCategories } from "@/lib/api";
import ServicesPageClient from "@/components/services/services-page-client";

export const metadata = {
  title: "خدماتنا | العزيزية للمظلات والسواتر",
  description:
    "تصفح كافة خدماتنا في تركيب المظلات والسواتر والبرجولات بأعلى جودة وضمان ممتد.",
};

export default async function ServicesPage() {
  // جلب البيانات بشكل متوازي لسرعة الأداء
  const [services, categories] = await Promise.all([
    getAllServices(),
    getAllServiceCategories(),
  ]);
  // إضافة تصنيف "الكل" في بداية القائمة
  const allCategories = [{ name: "الكل", slug: "all" }, ...categories];
  return (
    <ServicesPageClient initialServices={services} categories={allCategories} />
  );
}

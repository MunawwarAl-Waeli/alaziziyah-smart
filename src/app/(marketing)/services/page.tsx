import { getWPData } from "@/lib/api"; // افترضنا أننا نقلنا دالة الجلب لملف api منفصل
import ServicesPageClient from "@/components/services/services-page-client";

export const metadata = {
  title: "خدماتنا | العزيزية للمظلات والسواتر",
  description: "تصفح كافة خدماتنا في تركيب المظلات والسواتر والبرجولات بأعلى جودة.",
};

export default async function ServicesPage() {
  // نجلب كل البيانات (نفس الدالة التي استخدمناها سابقاً)
  const { categories, services } = await getWPData();

  return (
    <ServicesPageClient 
      initialServices={services} 
      categories={categories} 
    />
  );
}


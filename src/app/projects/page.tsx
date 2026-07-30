// src/app/projects/page.tsx
import { getAllProjects } from "@/lib/api";
import { Metadata } from "next";
import { ProjectsClient } from "./projects-client";

export const metadata: Metadata = {
  // 1. العنوان: التركيز على الكلمات البصرية (معرض، صور) + المدينة
  title: "معرض الأعمال | صور مشاريع مظلات وسواتر بجدة | العزيزية",
  // 2. الوصف: نصوص تحفيزية لزيادة نسبة النقر (CTR)
  description:
    "شاهد سابقة أعمال مؤسسة العزيزية في جدة ومكة. تصفح أحدث صور مشاريع تركيب مظلات السيارات، السواتر، والبرجولات بتصاميم عصرية وتنفيذ هندسي دقيق.",
  // 3. الكلمات المفتاحية: استهداف نية البحث عن الصور والنماذج
  keywords:
    "معرض اعمال مظلات, صور مظلات سيارات, مشاريع سواتر جدة, اشكال برجولات حديثة, صور تركيب هناجر, العزيزية للمظلات, نماذج سواتر احواش",
  // 4. حماية الرابط المعتمد
  alternates: {
    canonical: "/projects",
  },
  // 5. بطاقة المشاركة الجذابة
  openGraph: {
    title: "معرض أعمال العزيزية | أفضل مشاريع التظليل بجدة",
    description:
      "تصفح بالصور أحدث المشاريع التي نفذناها لعملائنا بنجاح. دقة في التنفيذ وضمان على الجودة.",
    url: "https://support.al-azizia.com/projects",
    siteName: "العزيزية للمظلات والسواتر",
    locale: "ar_SA",
    type: "website",
    // ⚠️ ضع هنا رابط لأفضل وأجمل صورة مشروع قمتم بتنفيذه
    images: ["/images/7.jpg"],
  },
};

export default async function ProjectsPage() {
  const recentProjects = await getAllProjects();

  // 6. السلاح السري: سكيما القوائم لمعرض الأعمال
  // هذا يخبر جوجل أن يستعرض مشاريعك كقائمة منسقة في نتائج البحث
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: recentProjects
      .slice(0, 15)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((project: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://support.al-azizia.com/projects/${project.slug}`,
        name: project.title,
      })),
  };

  return (
    <main
      className="min-h-screen pt-24 pb-12 bg-background font-sans"
      dir="rtl"
    >
      {/* حقن بيانات السكيما ليقرأها جوجل فوراً */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProjectsClient initialProjects={recentProjects} />
    </main>
  );
}

// src/app/projects/page.tsx
import { getAllProjects } from "@/lib/api"; // 💡 تم التحديث هنا
import { Metadata } from "next";
import { ProjectsClient } from "./projects-client";

export const metadata: Metadata = {
  title: "سابقة أعمالنا | العزيزية للمظلات والسواتر",
  description:
    "تصفح أحدث مشاريعنا المنفذة في تركيب المظلات والسواتر والبرجولات بأعلى معايير الجودة.",
};

export default async function ProjectsPage() {
  // جلب المشاريع من الووردبريس باستخدام الدالة التي أنشأناها
  const recentProjects = await getAllProjects();

  return (
    <main
      className="min-h-screen pt-24 pb-12 bg-background font-sans"
      dir="rtl"
    >
      {/* استدعاء المكون الجاهز وتمرير البيانات */}
      <ProjectsClient initialProjects={recentProjects} />
    </main>
  );
}

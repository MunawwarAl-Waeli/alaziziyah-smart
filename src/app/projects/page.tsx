// src/app/projects/page.tsx
import { LatestProjects } from "@/components/features/home/LatestProjects";
import { getLatestProjects } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سابقة أعمالنا | العزيزية للمظلات والسواتر",
  description:
    "تصفح أحدث مشاريعنا المنفذة في تركيب المظلات والسواتر والبرجولات بأعلى معايير الجودة.",
};

export default async function ProjectsPage() {
  // جلب المشاريع من الووردبريس
  const recentProjects = await getLatestProjects();

  return (
    <main
      className="min-h-screen pt-24 pb-12 bg-background font-sans"
      dir="rtl"
    >
      {/* استدعاء المكون الجاهز */}
      <LatestProjects projects={recentProjects} />
    </main>
  );
}

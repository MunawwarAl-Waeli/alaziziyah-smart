import { getProjectBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "./ProjectDetailsClient"; // سننشئ هذا الملف تالياً
import { Metadata } from "next";

// توليد SEO ديناميكي لكل مشروع
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "المشروع غير موجود" };
  return {
    title: `${project.title} | العزيزية للمظلات`,
    description: "تفاصيل أحد مشاريعنا المنفذة بأعلى معايير الجودة.",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>; // تعريفه كـ Promise في النسخ الحديثة
}) {
  // فك التغليف عن params
  const { slug } = await params;

  // جلب البيانات (الدالة ستقوم بعمل decodeURIComponent داخلياً)
  const project = await getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return <ProjectDetailsClient project={project} />;
}

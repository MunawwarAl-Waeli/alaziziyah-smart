import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectGallery } from "@/lib/api";
import ProjectDetailsClient from "./ProjectDetailsClient"; // تأكد من المسار حسب هيكلة ملفاتك
import { fixDoubleEncoding } from "@/lib/utils";

// 1. تعريف الواجهة الموحدة لتطابق إصدارات Next.js 15+ الحديثة
interface Props {
  params: Promise<{ slug: string }>;
}

// 2. توليد SEO ديناميكي لكل مشروع باحترافية (دلع السيو)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // 1. استخدام الدرع
  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return { title: "مشروع غير موجود" };

  // 2. جلب البيانات بالرابط النظيف
  const project = await getProjectGallery(cleanSlug);

  // إذا لم يجد المشروع
  if (!project) {
    return {
      title: "المشروع غير موجود | العزيزية للمظلات",
      description: "عذراً، لم يتم العثور على المشروع المطلوب.",
    };
  }

  // إضافة OpenGraph لظهور كرت فخم عند مشاركة الرابط بالواتساب
  return {
    title: `${project.title} | شركة العزيزية`,
    description:
      project.seo?.metaDesc ||
      `تفاصيل وصور مشروع ${project.title} المنفذ بأعلى معايير الجودة.`,
    openGraph: {
      title: project.title,
      description:
        project.seo?.metaDesc || `تصفح صور وتفاصيل مشروع ${project.title}`,
      images: project.featuredImage?.node?.sourceUrl
        ? [{ url: project.featuredImage.node.sourceUrl }]
        : [],
    },
  };
}




// 3. المكون الرئيسي لجلب البيانات وتمريرها للعميل
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  // 1. استخدام الدرع
  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return notFound();

  // 2. جلب البيانات بالرابط النظيف
  const project = await getProjectGallery(cleanSlug);
  if (!project) {
    notFound();
  }

  // تمرير البيانات لمكون العرض (الذي قمنا بتدليعه بستايل الستارة المتحركة)
  return <ProjectDetailsClient project={project} />;
}

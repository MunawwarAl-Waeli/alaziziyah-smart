import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectGallery } from "@/lib/api";
import ProjectDetailsClient from "./ProjectDetailsClient"; // تأكد من المسار حسب هيكلة ملفاتك

// 1. تعريف الواجهة الموحدة لتطابق إصدارات Next.js 15+ الحديثة
interface Props {
  params: Promise<{ slug: string }>;
}

// 2. توليد SEO ديناميكي لكل مشروع باحترافية (دلع السيو)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectGallery(slug);

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
  // فك التغليف عن params
  const { slug } = await params;

  // جلب البيانات (الدالة الخاصة بك تعالج decodeURIComponent داخلياً)
  const project = await getProjectGallery(slug);

  // إذا لم يرجع أي بيانات، وجهه لصفحة 404 الأنيقة
  if (!project) {
    notFound();
  }

  // تمرير البيانات لمكون العرض (الذي قمنا بتدليعه بستايل الستارة المتحركة)
  return <ProjectDetailsClient project={project} />;
}

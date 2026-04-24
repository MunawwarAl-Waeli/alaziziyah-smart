import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectGallery, getAllProjects } from "@/lib/api"; // 🚀 استيراد getAllProjects
import ProjectDetailsClient from "./ProjectDetailsClient";
import { fixDoubleEncoding } from "@/lib/utils";

// 1. تحويل جميع روابط المشاريع إلى صفحات ثابتة عند البناء (SSG)
// هذه الخطوة هي التي تحول الـ ƒ إلى ● في التقرير
export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// 2. تحديث البيانات تلقائياً كل ساعة (Incremental Static Regeneration)
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // استخدام الدرع لإصلاح التشفير المزدوج للروابط العربية
  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return { title: "مشروع غير موجود" };

  const project = await getProjectGallery(cleanSlug);

  if (!project) {
    return {
      title: "المشروع غير موجود | العزيزية للمظلات",
      description: "عذراً، لم يتم العثور على المشروع المطلوب.",
    };
  }

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return notFound();

  const project = await getProjectGallery(cleanSlug);
  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { getProjectGallery } from "@/lib/api";
// import ProjectDetailsClient from "./ProjectDetailsClient"; // تأكد من المسار حسب هيكلة ملفاتك
// import { fixDoubleEncoding } from "@/lib/utils";

// // 1. تعريف الواجهة الموحدة لتطابق إصدارات Next.js 15+ الحديثة
// interface Props {
//   params: Promise<{ slug: string }>;
// }

// // 2. توليد SEO ديناميكي لكل مشروع باحترافية (دلع السيو)
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params;

//   // 1. استخدام الدرع
//   const { cleanSlug } = fixDoubleEncoding(slug);
//   if (!cleanSlug) return { title: "مشروع غير موجود" };

//   // 2. جلب البيانات بالرابط النظيف
//   const project = await getProjectGallery(cleanSlug);

//   // إذا لم يجد المشروع
//   if (!project) {
//     return {
//       title: "المشروع غير موجود | العزيزية للمظلات",
//       description: "عذراً، لم يتم العثور على المشروع المطلوب.",
//     };
//   }

//   // إضافة OpenGraph لظهور كرت فخم عند مشاركة الرابط بالواتساب
//   return {
//     title: `${project.title} | شركة العزيزية`,
//     description:
//       project.seo?.metaDesc ||
//       `تفاصيل وصور مشروع ${project.title} المنفذ بأعلى معايير الجودة.`,
//     openGraph: {
//       title: project.title,
//       description:
//         project.seo?.metaDesc || `تصفح صور وتفاصيل مشروع ${project.title}`,
//       images: project.featuredImage?.node?.sourceUrl
//         ? [{ url: project.featuredImage.node.sourceUrl }]
//         : [],
//     },
//   };
// }

// // 3. المكون الرئيسي لجلب البيانات وتمريرها للعميل
// export default async function ProjectPage({ params }: Props) {
//   const { slug } = await params;

//   // 1. استخدام الدرع
//   const { cleanSlug } = fixDoubleEncoding(slug);
//   if (!cleanSlug) return notFound();

//   // 2. جلب البيانات بالرابط النظيف
//   const project = await getProjectGallery(cleanSlug);
//   if (!project) {
//     notFound();
//   }

//   // تمرير البيانات لمكون العرض (الذي قمنا بتدليعه بستايل الستارة المتحركة)
//   return <ProjectDetailsClient project={project} />;
// }

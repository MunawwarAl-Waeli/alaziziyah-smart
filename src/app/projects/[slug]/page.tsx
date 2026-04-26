import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectGallery, getAllProjects } from "@/lib/api";
import ProjectDetailsClient from "./ProjectDetailsClient";
import { fixDoubleEncoding } from "@/lib/utils";
// استيراد دوال الـ SEO
import { breadcrumbSchema, articleSchema } from "@/lib/seo-config";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    alternates: {
      canonical: `https://al-azizia.com/projects/${cleanSlug}`,
    },
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
  if (!project) notFound();

  // --- إعداد البيانات المنظمة (JSON-LD) للمشاريع ---
  const path = `/projects/${cleanSlug}`;

  // 1. مسارات التنقل (لحل مشكلة الصفر في Search Console)
  const bSchema = breadcrumbSchema(path);

  // 2. كود المشروع (نستخدم Article أو CreativeWork ليظهر جوجل الصور بشكل أفضل)
  const pSchema = articleSchema({
    title: project.title,
    description:
      project.seo?.metaDesc || `مشروع تنفيذ ${project.title} من شركة العزيزية`,
    image:
      project.featuredImage?.node?.sourceUrl ||
      "https://al-azizia.com/icon.png",
    publishedTime: project.date || new Date().toISOString(),
    authors: ["شركة العزيزية"],
    category: "مشاريع المظلات والسواتر",
  });

  return (
    <>
      {/* حقن الـ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pSchema) }}
      />

      <ProjectDetailsClient project={project} />
    </>
  );
}

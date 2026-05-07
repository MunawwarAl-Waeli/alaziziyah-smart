// src/app/projects/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectGallery, getAllProjects } from "@/lib/api";
import ProjectDetailsClient from "./ProjectDetailsClient";
import { fixDoubleEncoding } from "@/lib/utils";
import { breadcrumbSchema } from "@/lib/seo-config";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export const revalidate = 36000;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return { title: "معرض غير موجود" };

  const project = await getProjectGallery(cleanSlug);
  if (!project) return { title: "غير موجود" };

  const projectUrl = `https://al-azizia.com/projects/${cleanSlug}`;
  const ogImage =
    project.featuredImage?.node?.sourceUrl ||
    "https://al-azizia.com/0.jpg";

  return {
    // 🚀 العنوان البيعي لكتالوج الصور
    title: `صور وأشكال ${project.title} حديثة بجدة | كتالوج العزيزية`,
    // 🚀 الوصف المبني على نية البحث البصرية
    description:
      project.seo?.metaDesc ||
      `تصفح أحدث كتالوج صور وتصميمات ${project.title}. أشكال عصرية، خامات متنوعة (حديد، خشب، قماش) تناسب كافة المساحات في جدة والمملكة.`,
    alternates: {
      canonical: projectUrl,
    },
    keywords: `صور ${project.title}, اشكال ${project.title}, تصميمات ${project.title}, كتالوج ${project.title}, ${project.title} جدة`,
    openGraph: {
      title: `كتالوج صور: ${project.title}`,
      description: `استلهم فكرتك القادمة من معرض صور ${project.title} الخاص بمؤسسة العزيزية.`,
      url: projectUrl,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const { cleanSlug } = fixDoubleEncoding(slug);
  if (!cleanSlug) return notFound();

  const project = await getProjectGallery(cleanSlug);
  if (!project) return notFound();

  const path = `/projects/${cleanSlug}`;
  const bSchema = breadcrumbSchema(path);

  // 🚀 السلاح المدمر: CollectionPage + ImageGallery
  // هذا يخبر جوجل حرفياً: "هذه صفحة كتالوج تحتوي على معرض صور"
  const galleryImages = project.galleryImages || [];

  const catalogSchema = {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "ImageGallery"],
    name: `معرض صور ${project.title}`,
    description: `كتالوج شامل يعرض أحدث تصميمات وأشكال ${project.title}`,
    url: `https://al-azizia.com${path}`,
    publisher: {
      "@type": "HomeAndConstructionBusiness",
      name: "العزيزية للمظلات والسواتر",
    },
    // ربط الصور مباشرة بالكتالوج مع استخدام النص البديل (altText) من ووردبريس
    mainEntity: galleryImages.map((img, index) => ({
      "@type": "ImageObject",
      contentUrl: img.sourceUrl,
      // ⚠️ هذه النقطة هي التي ستجعلك تتصدر بحث الصور
      name: img.altText || `${project.title} - تصميم رقم ${index + 1}`,
      caption: img.altText || `صورة توضح شكل من أشكال ${project.title}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />
      {galleryImages.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
        />
      )}

      <ProjectDetailsClient project={project} />
    </>
  );
}

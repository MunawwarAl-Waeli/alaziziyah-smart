// export const dynamic = 'force-static';
import { MetadataRoute } from "next";
// قم بتعديل مسار الاستيراد بناءً على مكان ملف api.ts لديك
import { getAllServices, getAllProjects } from "@/lib/api";
import { blogPosts } from "./blog/data/posts";
// import { getAllPosts } from '@/lib/api'; // إذا قمت بإنشاء دالة للمقالات لاحقاً

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://al-azizia.com";

  // 1. جلب البيانات من الووردبريس (باستخدام دوالك الجاهزة)
  // نستخدم Promise.all لنجلب الخدمات والمشاريع في نفس اللحظة لتسريع بناء الموقع
  const [services, projects] = await Promise.all([
    getAllServices(),
    getAllProjects(),
    // getAllPosts(), // أضفها هنا عند برمجتها
  ]);

  // 2. الصفحات الثابتة
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/services",
    "/projects",
    "/blog",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 3. تحويل بيانات الخدمات إلى صيغة Sitemap
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    // نستخدم تاريخ اليوم كقيمة افتراضية (انظر الملاحظة بالأسفل لتحسينها)
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 4. تحويل بيانات المشاريع إلى صيغة Sitemap
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

// 5. تحويل بيانات مقالات المدونة الثابتة إلى صيغة Sitemap
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // نستخدم تاريخ المقالة الفعلي لتخبر جوجل بآخر تحديث لها
    lastModified: new Date(post.date), 
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // دمج كل الصفحات في خريطة واحدة وإرجاعها لجوجل
  return [...staticPages, ...servicePages, ...projectPages, ...blogPages];
}

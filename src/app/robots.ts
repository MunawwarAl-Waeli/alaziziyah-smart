// export const dynamic = 'force-static';
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/services",
        "/services/*",
        "/blog",
        "/blog/*",
        "/projects",
        "/projects/*",
        "/about",
        "/contact",
      ],
      disallow: [
        "/admin",
        "/dashboard",
        "/api/*",
        "/login",
        "/register",
        "/checkout",
        "/cart",
        "/profile/*",
        "/orders/*",
        "/payment/*",
        "/thank-you",
        "/404",
        "/500",
        "/search?*", // منع صفحات البحث المؤقتة
        "/blog/tag/*", // منع صفحات الوسوم المكررة
        "/blog/category/*/page/*", // منع الصفحات المكررة
      ],
    },
    sitemap: "https://al-azizia.com/sitemap.xml",
    host: "https://al-azizia.com",
  };
}

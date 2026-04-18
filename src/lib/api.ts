// 1. تعريف الواجهات (Interfaces) لضمان دقة البيانات
export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

export interface _ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string; // الـ slug (مثال: 'cars')
  categoryName: string; // الاسم (مثال: 'مظلات سيارات')
  description: string; // وصف مختصر للكرت
  href: string; // الرابط
  image: string; // الصورة
  fullContent: string; // المحتوى الكامل لصفحة التفاصيل
}

// واجهات استجابة GraphQL من ووردبريس
interface WPPageNode {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  } | null;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

interface WPGraphQLResponse {
  data: {
    pages: {
      nodes: WPPageNode[];
    };
    categories: {
      nodes: {
        id: string;
        name: string;
        slug: string;
      }[];
    };
  };
}
// 1. قائمة الصفحات التي نريد إخفاءها من المعرض (بالروابط والعناوين)
const EXCLUDED_SLUGS = [
  "sitemap",
  "privacy-policy",
  "terms-and-conditions",
  "contact-us",
  "about-us",
  "سياسة-الخصوصية",
  "شروط-استخدام-الموقع",
  "اتصل-بنا",
  "من-نحن",
];

const EXCLUDED_TITLES = [
  "sitemap",
  "سياسة الخصوصية",
  "شروط استخدام الموقع",
  "اتصل بنا",
  "من نحن",
  "Home",
];

// // 2. الدالة المساعدة لتنظيف النص (Helper)
function cleanText(html: string, limit: number = 120): string {
  if (!html) return "خدمات هندسية متميزة بأعلى معايير الجودة والضمان الفني...";
  const plainText = html.replace(/<[^>]*>?/gm, "").trim();
  return plainText.length > limit
    ? plainText.slice(0, limit) + "..."
    : plainText;
}

// 2. الدالة المحدثة لجلب الخدمات بدلاً من الصفحات
export async function getWPData(): Promise<{
  categories: CategoryItem[];
  services: _ServiceItem[];
}> {
  // الاستعلام يستهدف الآن 'services' كـ CPT
  const query = `
    query GetServicesData {
      serviceCategories { # جلب تصنيفات الخدمات
        nodes {
          id
          name
          slug
        }
      }
      services(first: 100) { # جلب منشورات الخدمات
        nodes {
          id
          title
          slug
          content(format: RENDERED)
          featuredImage {
            node {
              sourceUrl
            }
          }
          serviceCategories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 },
      },
    );

    const json = await res.json();
    if (!json.data) return { categories: [], services: [] };

    // أ) تجهيز التصنيفات
    const categories: CategoryItem[] = [
      { id: "all", name: "الكل", slug: "all" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(json.data.serviceCategories?.nodes || []).map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })),
    ];

    // ب) تجهيز الخدمات مع منطق (العنوان vs الـ Slug)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const services: _ServiceItem[] = json.data.services.nodes.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service: any) => {
        // منطق اختيار العنوان: إذا كان العنوان أطول من 25 حرف، استخدم الـ Slug
        // نقوم باستبدال الشرطات في الـ slug بمسافات ليظهر كعنوان نظيف
        const displayTitle =
          service.title.length > 25
            ? service.slug.replace(/-/g, " ")
            : service.title;

        return {
          id: service.id,
          title: displayTitle, // العنوان الذكي
          slug: service.slug,
          href: `/services/${service.slug}`,
          image: service.featuredImage?.node.sourceUrl || "/images/0.jpg",
          category: service.serviceCategories.nodes[0]?.slug || "general",
          categoryName: service.serviceCategories.nodes[0]?.name || "خدماتنا",
          description: cleanText(service.content),
          fullContent: service.content,
        };
      },
    );

    return { categories, services };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { categories: [], services: [] };
  }
}
// دالة لجلب البيانات العامة (هيدر وفوتر)
export async function getGlobalData() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

  const response = await fetch(WP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // revalidate: 60 يعني تحديث البيانات كل دقيقة (مفيد للأداء)
    next: { revalidate: 60 },
    body: JSON.stringify({
      query: `
        query GetGlobalData {
          generalSettings { 
            title 
            description 
          }
          menu(id: "Main Menu", idType: SLUG) { 
            menuItems(first: 100) { 
              nodes { 
                id 
                label 
                url 
                path
                parentId
                childItems(first: 100) {
                  nodes {
                    id
                    label
                    url
                    path
                  }
                }
              } 
            } 
          }
        }
      `,
    }),
  });

  const json = await response.json();

  // حماية إضافية: إذا كان هناك خطأ من السيرفر، نعيد مصفوفة فارغة كي لا يتعطل الموقع
  if (json.errors || !json.data) {
    console.error("GraphQL Error:", json.errors);
    return { menu: { menuItems: { nodes: [] } } };
  }

  return json.data;
}

// دالة لجلب أحدث المشاريع من الووردبريس
export async function getLatestProjects() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

  const response = await fetch(WP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 }, // تحديث البيانات كل 60 ثانية
    body: JSON.stringify({
      // ملاحظة: إذا كنت تستخدم Custom Post Type للمشاريع، استبدل كلمة posts بـ projects
      query: `
        query GetLatestProjects {
          posts(first: 6, where: { categoryName: "projects-2" }) { 
            nodes {
              id
              title
              slug
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              categories {
                nodes {
                  name
                }
              }
            }
          }
        }
      `,
    }),
  });

  const json = await response.json();

  if (json.errors || !json.data) {
    console.error("GraphQL Error fetching projects:", json.errors);
    return [];
  }

  return json.data.posts.nodes;
}
// دالة جلب تفاصيل مشروع واحد بناءً على الرابط (Slug)
export async function getProjectBySlug(slug: string) {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

  // فك تشفير الرابط العربي لتحويله من %D8 إلى حروف عربية
  const decodedSlug = decodeURIComponent(slug);

  try {
    const response = await fetch(WP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetProjectDetails($slug: String!) {
            posts(where: { name: $slug }, first: 1) {
              nodes {
                id
                title
                date
                content(format: RENDERED)
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                categories {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        `,
        variables: { slug: decodedSlug },
      }),
    });

    const json = await response.json();
    return json?.data?.posts?.nodes[0] || null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// ==========================================
// 1. تعريف الأنواع (Interfaces) للخدمات
// ==========================================
export interface ServiceCategory {
  name: string;
  slug: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  serviceCategories: {
    nodes: ServiceCategory[];
  };
  seo: {
    title: string;
    metaDesc: string;
  };
  serviceDetails: {
    heroSubtitle: string;
    features: Array<{ title: string; description: string }>;
    types: Array<{
      title: string;
      description: string;
      image: { sourceUrl: string };
    }>;
    faqs: Array<{ question: string; answer: string }>;
    gallery: string[];
  };
}

// ==========================================
// 2. تعريف الأنواع (Interfaces) للمشاريع
// ==========================================

export interface GalleryImage {
  sourceUrl: string;
  altText: string | null;
}

export interface ProjectFields {
  seoaftergallery: string | null;
}

export interface ProjectCategory {
  name: string;
  slug: string;
}

export interface ProjectData {
  title: string;
  slug: string;
  content: string | null;
  featuredImage: FeaturedImage | null;
  galleryImages: GalleryImage[] | null;
  projectFields: ProjectFields | null;
  date: string;
  projectCategorys: {
    nodes: ProjectCategory[];
  };
  seo: {
    title: string;
    metaDesc: string;
  } | null;
}

export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string | null;
  };
}

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  featuredImage: FeaturedImage | null;
  galleryImages: GalleryImage[] | null;
  ProjectCategory: {
    nodes: ProjectCategory[];
  };
  date?: string;
}

// ==========================================
// 3. دالة الجلب الأساسية الموحدة (Base Fetch)
// ==========================================
async function wpFetch(query: string, variables = {}) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(
      "GraphQL Error Details:",
      JSON.stringify(json.errors, null, 2),
    );
  }
  return json.data;
}

// ==========================================
// 4. دوال جلب الخدمات (Services Functions)
// ==========================================
export async function getAllServices(): Promise<ServiceItem[]> {
  const query = `
    query GetAllServices {
      services(first: 100) {
        nodes {
          id
          title
          slug
          featuredImage { node { sourceUrl } }
          serviceCategories { nodes { name slug } }
        }
      }
    }
  `;
  const data = await wpFetch(query);
  return data.services.nodes;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem> {
  const query = `
    query GetServiceBySlug($slug: ID!) {
      service(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        featuredImage { node { sourceUrl } }
        seo { title metaDesc }
        serviceDetails {
          heroSubtitle
          feature1Title feature1Desc
          feature2Title feature2Desc
          type1Title type1Desc type1Image { node { sourceUrl } }
          type2Title type2Desc type2Image { node { sourceUrl } }
          type3Title type3Desc type3Image { node { sourceUrl } }
          faq1Q faq1A
          faq2Q faq2A
          faq3Q faq3A
          galleryImg1 { node { sourceUrl } }
          galleryImg2 { node { sourceUrl } }
          galleryImg3 { node { sourceUrl } }
          galleryImg4 { node { sourceUrl } }
          galleryImg5 { node { sourceUrl } }
        }
      }
    }
  `;

  const data = await wpFetch(query, { slug });
  const s = data.service;

  type WpAcfImage = { node?: { sourceUrl?: string } } | null | undefined;
  const getImgUrl = (imgField: WpAcfImage): string | null =>
    imgField?.node?.sourceUrl || null;

  return {
    ...s,
    serviceDetails: {
      heroSubtitle: s.serviceDetails.heroSubtitle,
      features: [
        {
          title: s.serviceDetails.feature1Title,
          description: s.serviceDetails.feature1Desc,
        },
        {
          title: s.serviceDetails.feature2Title,
          description: s.serviceDetails.feature2Desc,
        },
      ].filter((f) => f.title),
      types: [
        {
          title: s.serviceDetails.type1Title,
          description: s.serviceDetails.type1Desc,
          image: {
            sourceUrl: getImgUrl(s.serviceDetails.type1Image) as string,
          },
        },
        {
          title: s.serviceDetails.type2Title,
          description: s.serviceDetails.type2Desc,
          image: {
            sourceUrl: getImgUrl(s.serviceDetails.type2Image) as string,
          },
        },
        {
          title: s.serviceDetails.type3Title,
          description: s.serviceDetails.type3Desc,
          image: {
            sourceUrl: getImgUrl(s.serviceDetails.type3Image) as string,
          },
        },
      ].filter((t) => t.title),
      faqs: [
        { question: s.serviceDetails.faq1Q, answer: s.serviceDetails.faq1A },
        { question: s.serviceDetails.faq2Q, answer: s.serviceDetails.faq2A },
        { question: s.serviceDetails.faq3Q, answer: s.serviceDetails.faq3A },
      ].filter((f) => f.question),
      gallery: [
        getImgUrl(s.serviceDetails.galleryImg1),
        getImgUrl(s.serviceDetails.galleryImg2),
        getImgUrl(s.serviceDetails.galleryImg3),
        getImgUrl(s.serviceDetails.galleryImg4),
        getImgUrl(s.serviceDetails.galleryImg5),
      ].filter(Boolean) as string[],
    },
  };
}

export async function getAllServiceCategories(): Promise<ServiceCategory[]> {
  const query = `
    query GetServiceCategories {
      serviceCategories { nodes { name slug } }
    }
  `;
  const data = await wpFetch(query);
  return data.serviceCategories.nodes;
}

// ==========================================
// 5. دوال جلب المشاريع (Projects Functions)
// ==========================================
export async function getProjectGallery(
  slug: string,
): Promise<ProjectData | null> {
  const query = `
    query getProjectGallery($slug: ID!) {
      project(id: $slug, idType: URI) {
        title
        slug
        content
        date
        featuredImage { 
          node { 
            sourceUrl 
          } 
        }
        galleryImages {
          sourceUrl
          altText
        }
        projectFields { 
          seoaftergallery 
        }
         projectCategorys{
        nodes{
          name
          slug
        }
      }
        seo { 
          title 
          metaDesc 
        }
      }
    }
  `;
  const rawslug = decodeURIComponent(slug);
  try {
    // 🔑 نجرب URI مباشر
    const data = await wpFetch(query, {
      slug: `/projects/${rawslug}`,
    });

    return data?.project ?? null;
  } catch (err) {
    console.warn("فشل استدعاء URI، نجرب SLUG مباشرة (إذا كان متاحاً مستقبلاً)");

    // محاولة SLUG كخطة بديلة (في حال دعم مستقبلي)
    try {
      const dataSlug = await wpFetch(query, {
        rawslug,
      });
      return dataSlug?.project ?? null;
    } catch (_) {
      return null;
    }
  }
}

export async function getAllProjects(): Promise<ProjectData[]> {
  const query = `
    query GetAllProjects {
  projects(first: 10) {
    nodes {
      title
      content
      slug
     featuredImage { node { sourceUrl } }
      galleryImages {
        sourceUrl
        altText
      }
      
      projectFields {
        seoaftergallery # 💡 تم التعديل هنا لتطابق اسم الحقل تماماً
      }
      projectCategorys{
        nodes{
          name
          slug
        }
      }

    }
  }
}
  `;
  // استخدام دالة wpFetch الموحدة
  const data = await wpFetch(query);
  return data?.projects?.nodes || [];
}

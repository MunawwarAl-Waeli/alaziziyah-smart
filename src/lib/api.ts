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
  category: string;
  categoryName: string;
  description: string;
  href: string;
  image: string;
  fullContent: string;
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

function cleanText(html: string, limit: number = 120): string {
  if (!html) return "خدمات هندسية متميزة بأعلى معايير الجودة والضمان الفني...";
  const plainText = html.replace(/<[^>]*>?/gm, "").trim();
  return plainText.length > limit
    ? plainText.slice(0, limit) + "..."
    : plainText;
}

export async function getWPData(): Promise<{
  categories: CategoryItem[];
  services: _ServiceItem[];
}> {
  const query = `
    query GetServicesData {
      serviceCategories {
        nodes { id name slug }
      }
      services(first: 100) {
        nodes {
          id title slug content(format: RENDERED)
          featuredImage { node { sourceUrl } }
          serviceCategories { nodes { name slug } }
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
        next: { revalidate: 3600 }, // 🚀 تحديث كل ساعة بدلاً من دقيقة لتسريع الخادم
      },
    );

    const json = await res.json();
    if (!json.data) return { categories: [], services: [] };

    const categories: CategoryItem[] = [
      { id: "all", name: "الكل", slug: "all" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(json.data.serviceCategories?.nodes || []).map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })),
    ];

    const services: _ServiceItem[] = json.data.services.nodes.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service: any) => {
        const displayTitle =
          service.title.length > 25
            ? service.slug.replace(/-/g, " ")
            : service.title;

        return {
          id: service.id,
          title: displayTitle,
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

export async function getGlobalData() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

  try {
    const response = await fetch(WP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 }, // 🚀 تحديث الهيدر والفوتر كل ساعة
      body: JSON.stringify({
        query: `
          query GetGlobalData {
            generalSettings { title description }
            menu(id: "Main Menu", idType: SLUG) { 
              menuItems(first: 100) { 
                nodes { id label url path parentId childItems(first: 100) { nodes { id label url path } } } 
              } 
            }
          }
        `,
      }),
    });

    if (!response.ok) return { menu: { menuItems: { nodes: [] } } };
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json"))
      return { menu: { menuItems: { nodes: [] } } };

    const json = await response.json();
    if (json.errors || !json.data)
      return { menu: { menuItems: { nodes: [] } } };
    return json.data;
  } catch (error) {
    return { menu: { menuItems: { nodes: [] } } };
  }
}

export async function getLatestProjects() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;
  const response = await fetch(WP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 3600 }, // 🚀 تحديث المشاريع كل ساعة
    body: JSON.stringify({
      query: `
        query GetLatestProjects {
          posts(first: 6, where: { categoryName: "projects-2" }) { 
            nodes {
              id title slug
              featuredImage { node { sourceUrl altText } }
              categories { nodes { name } }
            }
          }
        }
      `,
    }),
  });
  const json = await response.json();
  if (json.errors || !json.data) return [];
  return json.data.posts.nodes;
}

export async function getProjectBySlug(slug: string) {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const response = await fetch(WP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 }, // 🚀 تمت إضافة الكاش هنا
      body: JSON.stringify({
        query: `
          query GetProjectDetails($slug: String!) {
            posts(where: { name: $slug }, first: 1) {
              nodes {
                id title date content(format: RENDERED)
                featuredImage { node { sourceUrl } }
                categories { nodes { name } }
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
    return null;
  }
}

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

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
  featuredImage: { node: { sourceUrl: string } };
  serviceCategories: { nodes: ServiceCategory[] };
  seo: { title: string; metaDesc: string };
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
  projectCategorys: { nodes: ProjectCategory[] };
  seo: { title: string; metaDesc: string } | null;
}
export interface FeaturedImage {
  node: { sourceUrl: string; altText: string | null };
}
export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  featuredImage: FeaturedImage | null;
  galleryImages: GalleryImage[] | null;
  ProjectCategory: { nodes: ProjectCategory[] };
  date?: string;
}

// 🚀 الدالة المحدثة مع إضافة نظام الكاش
async function wpFetch(query: string, variables = {}) {
  try {
    const res = await fetch(API_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 }, // 🚀 السر هنا: حفظ الرد لمدة ساعة
    });

    if (!res.ok) return null;
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

export async function getAllServices(): Promise<ServiceItem[]> {
  const query = `
    query GetAllServices {
      services(first: 100) {
        nodes {
          id title slug
          featuredImage { node { sourceUrl } }
          serviceCategories { nodes { name slug } }
        }
      }
    }
  `;
  const data = await wpFetch(query);
  if (!data || !data.services) return [];
  return data.services.nodes;
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServiceItem | null> {
  const query = `
    query GetServiceBySlug($slug: ID!) {
      service(id: $slug, idType: SLUG) {
        id title slug content
        featuredImage { node { sourceUrl } }
        seo { title metaDesc }
        serviceDetails {
          heroSubtitle
          feature1Title feature1Desc
          feature2Title feature2Desc
          type1Title type1Desc type1Image { node { sourceUrl } }
          type2Title type2Desc type2Image { node { sourceUrl } }
          type3Title type3Desc type3Image { node { sourceUrl } }
          faq1Q faq1A faq2Q faq2A faq3Q faq3A
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
  const s = data?.service;
  if (!s) return null;

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

export async function getProjectGallery(
  slug: string,
): Promise<ProjectData | null> {
  const query = `
    query getProjectGallery($slug: ID!) {
      project(id: $slug, idType: URI) {
        title slug content date
        featuredImage { node { sourceUrl } }
        galleryImages { sourceUrl altText }
        projectFields { seoaftergallery }
        projectCategorys{ nodes{ name slug } }
        seo { title metaDesc }
      }
    }
  `;
  const rawslug = decodeURIComponent(slug);
  try {
    const data = await wpFetch(query, { slug: `/projects/${rawslug}` });
    return data?.project ?? null;
  } catch (err) {
    try {
      const dataSlug = await wpFetch(query, { rawslug });
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
          title content slug
          featuredImage { node { sourceUrl } }
          galleryImages { sourceUrl altText }
          projectFields { seoaftergallery }
          projectCategorys{ nodes{ name slug } }
        }
      }
    }
  `;
  const data = await wpFetch(query);
  return data?.projects?.nodes || [];
}

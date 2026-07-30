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
  const query = `
    query GetGlobalData {
      generalSettings { title description }
      menu(id: "Main Menu", idType: SLUG) { 
        menuItems(first: 100) { 
          nodes { id label url path parentId childItems(first: 100) { nodes { id label url path } } } 
        } 
      }
    }
  `;
  
  const data = await wpFetch(query);
  return data || { menu: { menuItems: { nodes: [] } } };
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

// export async function getProjectBySlug(slug: string) {
//   const cleanSlug = decodeURIComponent(slug).trim();
  
//   // استعلام يجلب كل المشاريع ثم يبحث عن المشروع المطابق بغض النظر عن مشاكل الترميز أو الـ Slugs المعقدة
//   const query = `
//     query GetAllProjectsForMatching {
//       projects(first: 100) {
//         nodes {
//           id
//           title
//           slug
//           uri
//           content
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//         }
//       }
//     }
//   `;

//   try {
//     const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://support.al-azizia.com/graphql";
    
//     const res = await fetch(endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query }),
//       cache: "no-store",
//     });

//     const json = await res.json();
//     const projects = json.data?.projects?.nodes || [];

//     // مطابقة مرنة جداً تتجاوز مشاكل الترميز والشرطات السفلية
//     const matchedProject = projects.find(
//       (p: any) => 
//         p.slug === cleanSlug || 
//         decodeURIComponent(p.slug) === cleanSlug ||
//         encodeURIComponent(p.slug) === slug
//     );

//     if (!matchedProject) {
//       console.warn("⚠️ Project not found for slug:", cleanSlug);
//       return null;
//     }

//     return {
//       ...matchedProject,
//       seo: {
//         title: matchedProject.title,
//         metaDesc: matchedProject.content?.replace(/<[^>]*>?/gm, "").slice(0, 160) || "",
//       },
//     };
//   } catch (error) {
//     console.error("🔥 Error fetching project:", error);
//     return null;
//   }
// }





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
    console.error("Error in wpFetch:", error);
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

export async function getServiceBySlug(slug: string) {
  const cleanSlug = decodeURIComponent(slug).trim();
  
  const query = `
    query GetServiceBySlug($id: ID!) {
      service(id: $id, idType: SLUG) {
        id
        title
        slug
        uri
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          title
          metaDesc
        }
        serviceDetails {
          heroSubtitle
          feature1Title
          feature1Desc
          feature2Title
          feature2Desc
          type1Title
          type1Desc
          type1Image { node { sourceUrl } }
          type2Title
          type2Desc
          type2Image { node { sourceUrl } }
          type3Title
          type3Desc
          type3Image { node { sourceUrl } }
          faq1Q
          faq1A
          faq2Q
          faq2A
          faq3Q
          faq3A
          galleryImg1 { node { sourceUrl } }
          galleryImg2 { node { sourceUrl } }
          galleryImg3 { node { sourceUrl } }
          galleryImg4 { node { sourceUrl } }
          galleryImg5 { node { sourceUrl } }
        }
        serviceCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

  try {
    const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://support.al-azizia.com/graphql";
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { id: cleanSlug },
      }),
      // منع التخزين المؤقت للخادم لمنع تعليق البيانات القديمة أو الـ 404
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error("❌ WPGraphQL Error for slug:", cleanSlug, json.errors);
      return null;
    }

    if (!json.data?.service) {
      console.warn("⚠️ Service not found in WordPress for slug:", cleanSlug);
      return null;
    }

    const s = json.data.service;
    type WpAcfImage = { node?: { sourceUrl?: string } } | null | undefined;
    const getImgUrl = (imgField: WpAcfImage): string | null =>
      imgField?.node?.sourceUrl || null;

    return {
      ...s,
      serviceDetails: {
        heroSubtitle: s.serviceDetails?.heroSubtitle || "",
        features: [
          { title: s.serviceDetails?.feature1Title, description: s.serviceDetails?.feature1Desc },
          { title: s.serviceDetails?.feature2Title, description: s.serviceDetails?.feature2Desc },
        ].filter((f) => f.title),
        types: [
          {
            title: s.serviceDetails?.type1Title,
            description: s.serviceDetails?.type1Desc,
            image: { sourceUrl: getImgUrl(s.serviceDetails?.type1Image) || "" },
          },
          {
            title: s.serviceDetails?.type2Title,
            description: s.serviceDetails?.type2Desc,
            image: { sourceUrl: getImgUrl(s.serviceDetails?.type2Image) || "" },
          },
          {
            title: s.serviceDetails?.type3Title,
            description: s.serviceDetails?.type3Desc,
            image: { sourceUrl: getImgUrl(s.serviceDetails?.type3Image) || "" },
          },
        ].filter((t) => t.title),
        faqs: [
          { question: s.serviceDetails?.faq1Q, answer: s.serviceDetails?.faq1A },
          { question: s.serviceDetails?.faq2Q, answer: s.serviceDetails?.faq2A },
          { question: s.serviceDetails?.faq3Q, answer: s.serviceDetails?.faq3A },
        ].filter((f) => f.question),
        gallery: [
          getImgUrl(s.serviceDetails?.galleryImg1),
          getImgUrl(s.serviceDetails?.galleryImg2),
          getImgUrl(s.serviceDetails?.galleryImg3),
          getImgUrl(s.serviceDetails?.galleryImg4),
          getImgUrl(s.serviceDetails?.galleryImg5),
        ].filter(Boolean) as string[],
      },
    };
  } catch (error) {
    console.error("🔥 Network or Fetch Exception for slug:", cleanSlug, error);
    return null;
  }
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  const rawslug = decodeURIComponent(slug).trim();

  // استعلام أساسي آمن ومختصر يتجنب الأخطاء
  const query = `
    query getProjectGallery($slug: ID!) {
      project(id: $slug, idType: SLUG) {
        title 
        slug 
        content 
        date
        featuredImage { node { sourceUrl } }
        galleryImages { sourceUrl altText }
        projectFields { seoaftergallery }
        projectCategorys { nodes { name slug } }
        seo { title metaDesc }
      }
    }
  `;

  try {
    // المحاولة الأولى بالـ SLUG المباشر
    const data = await wpFetch(query, { slug: rawslug });
    if (data?.project) return data.project;

    // المحاولة الثانية بالـ URI الكامل
    const uriQuery = `
      query getProjectByUri($slug: ID!) {
        project(id: $slug, idType: URI) {
          title 
          slug 
          content 
          date
          featuredImage { node { sourceUrl } }
          galleryImages { sourceUrl altText }
          projectFields { seoaftergallery }
          projectCategorys { nodes { name slug } }
          seo { title metaDesc }
        }
      }
    `;
    
    // تجربة الـ URI بأكثر من صيغة لضمان المطابقة
    let uriData = await wpFetch(uriQuery, { slug: `/projects/${rawslug}` });
    if (uriData?.project) return uriData.project;

    uriData = await wpFetch(uriQuery, { slug: `/${rawslug}` });
    if (uriData?.project) return uriData.project;

    // 💡 المحاولة الأخيرة الاحتياطية (البحث عبر القائمة في حال فشل المطابقة المباشرة)
    const allProjectsQuery = `
      query GetAllProjectsFallback {
        projects(first: 100) {
          nodes {
            title 
            slug 
            uri 
            content 
            date
            featuredImage { node { sourceUrl } }
            galleryImages { sourceUrl altText }
            projectFields { seoaftergallery }
            projectCategorys { nodes { name slug } }
          }
        }
      }
    `;
    
    const allData = await wpFetch(allProjectsQuery);
    const projects = allData?.projects?.nodes || [];
    
    const matched = projects.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) => 
        p.slug === rawslug || 
        decodeURIComponent(p.slug) === rawslug ||
        p.uri?.includes(rawslug)
    );

    return matched ?? null;

  } catch (error) {
    console.error("🔥 Error in getProjectGallery:", error);
    return null;
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

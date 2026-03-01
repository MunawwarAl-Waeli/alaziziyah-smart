// 1. تعريف الواجهات (Interfaces) لضمان دقة البيانات
export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

export interface ServiceItem {
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

// 2. الدالة المساعدة لتنظيف النص (Helper)
function cleanText(html: string, limit: number = 120): string {
  if (!html) return "خدمات هندسية متميزة بأعلى معايير الجودة والضمان الفني...";
  const plainText = html.replace(/<[^>]*>?/gm, "").trim();
  return plainText.length > limit
    ? plainText.slice(0, limit) + "..."
    : plainText;
}

// 3. الدالة الرئيسية لجلب البيانات
export async function getWPData(): Promise<{
  categories: CategoryItem[];
  services: ServiceItem[];
}> {
  const query = `
    query GetWPData {
      categories(where: { hideEmpty: true }) {
        nodes {
          id
          name
          slug
        }
      }
      pages(first: 100) {
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
          categories {
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

    const json = (await res.json()) as WPGraphQLResponse;

    if (!json.data) return { categories: [], services: [] };

    // أ) تجهيز التصنيفات
    const categories: CategoryItem[] = [
      { id: "all", name: "الكل", slug: "all" },
      ...json.data.categories.nodes.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })),
    ];

    // ب) تجهيز الخدمات (مع فلترة الصفحات غير الخدمية)
    const services: ServiceItem[] = json.data.pages.nodes
      .filter((page) => {
        const slug = page.slug.toLowerCase();
        const title = page.title.toLowerCase();

        // 2. الفلتر الذكي:
        // - يجب أن تحتوي الصفحة على صورة بارزة
        // - يجب ألا يكون الرابط (Slug) ضمن القائمة المحظورة
        // - يجب ألا يكون العنوان ضمن القائمة المحظورة
        const isExcluded =
          EXCLUDED_SLUGS.some((s) => slug.includes(s)) ||
          EXCLUDED_TITLES.some((t) => title.includes(t.toLowerCase()));

        return page.featuredImage && !isExcluded;
      })
      .map((page) => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        href: `/services/${page.slug}`,
        image: page.featuredImage?.node.sourceUrl || "/images/0.jpg",
        category: page.categories.nodes[0]?.slug || "general",
        categoryName: page.categories.nodes[0]?.name || "أعمالنا",
        description: cleanText(page.content),
        fullContent: page.content,
      }));

    return { categories, services };
  } catch (error) {
    console.error("Critical Error fetching WP data:", error);
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
          menu(id: "primary", idType: SLUG) { 
            menuItems(first: 100) { 
              nodes { 
                id 
                label 
                url 
                path
                parentId
                childItems {
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

// دالة لجلب صفحة محددة
// export async function getPageBySlug(slug) {
//   const data = await fetch(
//     `query GetPageBySlug($id: ID!) { ... }`, // ضع الاستعلام رقم 2 هنا
//     { variables: { id: slug } }
//   );
//   return data?.page;
// }
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

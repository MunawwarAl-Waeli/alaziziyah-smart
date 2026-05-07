import { cache } from "react";
import {
  BlogPost,
  Category,
  Author,
  City,
  PostsResponse,
} from "../types/bolg.types";

export const authors: Author[] = [
  {
    id: "a1",
    name: "م.أنور محمد",
    title: "خبير الإنشاءات",
    bio: "مهندس متخصص.",
  },
];

export const cities: City[] = [
  { id: "ct1", name: "جدة", slug: "jeddah", region: "منطقة مكة" },
  { id: "ct2", name: "مكة المكرمة", slug: "makkah", region: "منطقة مكة" },
];

const API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://api.al-azizia.com/graphql";
const REVALIDATE_TIME = 3600; // 🚀 توحيد الوقت

async function fetchAPI(query: string, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE_TIME },
  });

  const json = await res.json();
  if (json.errors) throw new Error("فشل جلب البيانات من ووردبريس");
  return json.data;
}

// ==========================================
// 🚀 1. دالة جلب التصنيفات ديناميكياً من ووردبريس
// ==========================================
export const fetchAllCategories = cache(async (): Promise<Category[]> => {
  const query = `
    query GetAllCategories {
      categories(where: { hideEmpty: true }, first: 100) {
        nodes {
          databaseId
          name
          slug
          description
          count
        }
      }
    }
  `;
  try {
    const data = await fetchAPI(query);
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.categories?.nodes?.map((cat: any) => ({
        id: cat.databaseId.toString(),
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "",
        count: cat.count || 0,
        // ووردبريس لا يدعم الأيقونات افتراضياً، نضع أيقونة عامة أو نربطها بالاسم
        icon: getCategoryIcon(cat.slug),
      })) || []
    );
  } catch (error) {
    return [];
  }
});

// دالة مساعدة لإعطاء أيقونة بناءً على رابط التصنيف (Slug)
function getCategoryIcon(slug: string): string {
  const icons: Record<string, string> = {
    carports: "🚗",
    pergolas: "🏡",
    fences: "🛡️",
    schools: "🏫",
    maintenance: "🔧",
    materials: "🔬",
  };
  return icons[slug] || "📌"; // أيقونة افتراضية لباقي التصنيفات
}

// ==========================================
// 🚀 تحويل البيانات (خفيفة للقوائم، ثقيلة للمقال الفردي)
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPostData(wpPost: any): BlogPost {
  // 🚀 استخراج بيانات التصنيف مباشرة من الـ wpPost دون الحاجة لمصفوفة ثابتة
  const wpCategory = wpPost.categories?.nodes?.[0];
  const postCategory: Category = {
    id: wpCategory?.databaseId?.toString() || "uncategorized",
    name: wpCategory?.name || "عام",
    slug: wpCategory?.slug || "general",
    icon: getCategoryIcon(wpCategory?.slug || "general"),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tags = wpPost.tags?.nodes?.map((tag: any) => tag.name) || [];
  const matchedCity = cities.find((c) => tags.includes(c.name)) || cities[0];

  return {
    id: wpPost.databaseId?.toString(),
    title: wpPost.title,
    slug: wpPost.slug,
    content: wpPost.content || "",
    excerpt: wpPost.excerpt || "",
    coverImage:
      wpPost.featuredImage?.node?.sourceUrl || "/images/default-blog.jpg",
    category: postCategory, // 👈 تم التحديث هنا
    tags: tags,
    metaDescription: wpPost.seo?.metaDesc || "",
    metaTitle: wpPost.seo?.title || wpPost.title,
    author: authors[0],
    city: matchedCity,
    date: wpPost.date,
    readTime: Math.max(1, Math.ceil((wpPost.content?.length || 500) / 1000)),
    featured: wpPost.isSticky || false,
    views: Math.floor(Math.random() * 1000) + 100,
  };
}

// ==========================================
// 2. الدالة الصاروخية للقوائم (بدون حقل Content)
// ==========================================
export const fetchAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const query = `
    query GetAllPostsList {
      posts(first: 100) {
        nodes {
          databaseId title slug date excerpt isSticky
          featuredImage { node { sourceUrl } }
          categories { nodes { databaseId name slug } } # 👈 جلبنا databaseId للتصنيف
          tags { nodes { name } }
          seo { title metaDesc }
        }
      }
    }
  `;
  try {
    const data = await fetchAPI(query);
    return data?.posts?.nodes?.map(mapPostData) || [];
  } catch (error) {
    return [];
  }
});

// ==========================================
// 3. دالة جلب تفاصيل المقال (مع حقل Content الكامل)
// ==========================================
export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const decodedSlug = decodeURIComponent(slug);
  const query = `
    query GetSinglePost($slug: String!) {
      posts(where: { name: $slug }, first: 1) {
        nodes {
          databaseId title slug date excerpt isSticky
          content(format: RENDERED)
          featuredImage { node { sourceUrl } }
          categories { nodes { databaseId name slug } } # 👈 جلبنا databaseId للتصنيف
          tags { nodes { name } }
          seo { title metaDesc }
        }
      }
    }
  `;
  try {
    const data = await fetchAPI(query, { slug: decodedSlug });
    const postNode = data?.posts?.nodes?.[0];
    return postNode ? mapPostData(postNode) : undefined;
  } catch (error) {
    return undefined;
  }
}

// ==========================================
// دوال الفلترة
// ==========================================
function paginatePosts(
  posts: BlogPost[],
  page: number,
  limit: number,
): PostsResponse {
  const startIndex = (page - 1) * limit;
  const paginatedPosts = posts.slice(startIndex, startIndex + limit);
  return {
    posts: paginatedPosts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(posts.length / limit),
      totalPosts: posts.length,
      postsPerPage: limit,
    },
  };
}

export async function getPostsByCategory(
  categorySlug: string,
  page: number = 1,
  limit: number = 6,
) {
  const allPosts = await fetchAllBlogPosts();
  return paginatePosts(
    allPosts.filter((post) => post.category.slug === categorySlug),
    page,
    limit,
  );
}

export async function getPostsByCity(
  citySlug: string,
  page: number = 1,
  limit: number = 6,
) {
  const allPosts = await fetchAllBlogPosts();
  return paginatePosts(
    allPosts.filter((post) => post.city?.slug === citySlug),
    page,
    limit,
  );
}

export async function getPostsByTag(
  tag: string,
  page: number = 1,
  limit: number = 6,
) {
  const allPosts = await fetchAllBlogPosts();
  return paginatePosts(
    allPosts.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    ),
    page,
    limit,
  );
}

export async function searchPosts(
  query: string,
  page: number = 1,
  limit: number = 6,
) {
  const allPosts = await fetchAllBlogPosts();
  const searchTerm = query.toLowerCase();
  const filtered = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  );
  return paginatePosts(filtered, page, limit);
}

// ==========================================
// 🚀 دالة جلب المقالات ذات الصلة (ذكية وسريعة)
// ==========================================
export async function getRelatedPosts(
  postId: string,
  limit: number = 3,
): Promise<BlogPost[]> {
  const allPosts = await fetchAllBlogPosts();
  const currentPost = allPosts.find((p) => p.id === postId);
  if (!currentPost) return [];

  const related = allPosts.filter((post) => {
    if (post.id === postId) return false;
    const sameCategory = post.category.slug === currentPost.category.slug;
    const sharesTag = post.tags.some((tag) => currentPost.tags.includes(tag));
    return sameCategory || sharesTag;
  });

  return related.slice(0, limit);
}

// import { cache } from "react";
// import {
//   BlogPost,
//   Category,
//   Author,
//   City,
//   PostsResponse,
// } from "../types/bolg.types";

// export const authors: Author[] = [
//   {
//     id: "a1",
//     name: "م.أنور محمد",
//     title: "خبير الإنشاءات",
//     bio: "مهندس متخصص.",
//   },
// ];

// export const cities: City[] = [
//   { id: "ct1", name: "جدة", slug: "jeddah", region: "منطقة مكة" },
//   { id: "ct2", name: "مكة المكرمة", slug: "makkah", region: "منطقة مكة" },
// ];

// export const categories: Category[] = [
//   {
//     id: "carports",
//     name: "مظلات سيارات",
//     slug: "carports",
//     description: "كل ما يخص مظلات السيارات بأنواعها",
//     count: 5,
//     icon: "🚗",
//   },
//   {
//     id: "pergolas",
//     name: "برجولات",
//     slug: "pergolas",
//     description: "أفكار وتصاميم البرجولات للحدائق والجلسات الخارجية",
//     count: 4,
//     icon: "🏡",
//   },
//   {
//     id: "fences",
//     name: "سواتر",
//     slug: "fences",
//     description: "أنواع السواتر الحديد والخشبية والشرائح",
//     count: 4,
//     icon: "🛡️",
//   },
//   {
//     id: "schools",
//     name: "مظلات مدارس",
//     slug: "schools",
//     description: "مظلات المدارس والمؤسسات التعليمية",
//     count: 0,
//     icon: "🏫",
//   },
//   {
//     id: "maintenance",
//     name: "صيانة وإصلاح",
//     slug: "maintenance",
//     description: "نصائح الصيانة وإصلاح المظلات والسواتر",
//     count: 2,
//     icon: "🔧",
//   },
//   {
//     id: "materials",
//     name: "مواد وتقنيات",
//     slug: "materials",
//     description: "أنواع المواد المستخدمة في المظلات",
//     count: 2,
//     icon: "🔬",
//   },
// ];

// const API_URL =
//   process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
//   "https://api.al-azizia.com/graphql";
// const REVALIDATE_TIME = 3600; // 🚀 توحيد الوقت

// async function fetchAPI(query: string, variables = {}) {
//   const res = await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query, variables }),
//     next: { revalidate: REVALIDATE_TIME },
//   });

//   const json = await res.json();
//   if (json.errors) throw new Error("فشل جلب البيانات من ووردبريس");
//   return json.data;
// }

// // ==========================================
// // 🚀 تحويل البيانات (خفيفة للقوائم، ثقيلة للمقال الفردي)
// // ==========================================

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function mapPostData(wpPost: any): BlogPost {
//   const wpCategorySlug = wpPost.categories?.nodes?.[0]?.slug;
//   const matchedCategory = categories.find((c) => c.slug === wpCategorySlug) || {
//     id: "uncategorized",
//     name: wpPost.categories?.nodes?.[0]?.name || "عام",
//     slug: wpCategorySlug || "general",
//   };

//   // 🚀 محاولة استخراج المدينة من التاجات (Tags) لكي لا تكون ثابتة
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const tags = wpPost.tags?.nodes?.map((tag: any) => tag.name) || [];
//   const matchedCity = cities.find((c) => tags.includes(c.name)) || cities[0]; // جدة كافتراضي

//   return {
//     id: wpPost.databaseId?.toString(),
//     title: wpPost.title,
//     slug: wpPost.slug,
//     content: wpPost.content || "", // سيكون فارغاً في القوائم، وممتلئاً في المقال الفردي
//     excerpt: wpPost.excerpt || "",
//     coverImage:
//       wpPost.featuredImage?.node?.sourceUrl || "/images/default-blog.jpg",
//     category: matchedCategory,
//     tags: tags,
//     metaDescription: wpPost.seo?.metaDesc || "",
//     metaTitle: wpPost.seo?.title || wpPost.title,
//     author: authors[0], // يمكنك ربطها بـ wpPost.author لاحقاً
//     city: matchedCity, // 🚀 تم الإصلاح لتبحث في التاجات
//     date: wpPost.date,
//     readTime: Math.max(1, Math.ceil((wpPost.content?.length || 500) / 1000)),
//     featured: wpPost.isSticky || false,
//     views: Math.floor(Math.random() * 1000) + 100,
//   };
// }

// // ==========================================
// // 1. الدالة الصاروخية للقوائم (بدون حقل Content)
// // ==========================================
// export const fetchAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
//   const query = `
//     query GetAllPostsList {
//       posts(first: 100) {
//         nodes {
//           databaseId title slug date excerpt isSticky
//           featuredImage { node { sourceUrl } }
//           categories { nodes { name slug } }
//           tags { nodes { name } }
//           seo { title metaDesc }
//           # 🚨 تم إزالة حقل content من هنا لإنقاذ الذاكرة!
//         }
//       }
//     }
//   `;
//   try {
//     const data = await fetchAPI(query);
//     return data?.posts?.nodes?.map(mapPostData) || [];
//   } catch (error) {
//     return [];
//   }
// });

// // ==========================================
// // 2. دالة جلب تفاصيل المقال (مع حقل Content الكامل)
// // ==========================================
// export async function getPostBySlug(
//   slug: string,
// ): Promise<BlogPost | undefined> {
//   const decodedSlug = decodeURIComponent(slug);
//   const query = `
//     query GetSinglePost($slug: String!) {
//       posts(where: { name: $slug }, first: 1) {
//         nodes {
//           databaseId title slug date excerpt isSticky
//           content(format: RENDERED) # 🚀 نطلبه هنا فقط!
//           featuredImage { node { sourceUrl } }
//           categories { nodes { name slug } }
//           tags { nodes { name } }
//           seo { title metaDesc }
//         }
//       }
//     }
//   `;
//   try {
//     const data = await fetchAPI(query, { slug: decodedSlug });
//     const postNode = data?.posts?.nodes?.[0];
//     return postNode ? mapPostData(postNode) : undefined;
//   } catch (error) {
//     return undefined;
//   }
// }

// // ==========================================
// // دوال الفلترة (كما هي، وتعمل بكفاءة عالية جداً الآن)
// // ==========================================
// function paginatePosts(
//   posts: BlogPost[],
//   page: number,
//   limit: number,
// ): PostsResponse {
//   const startIndex = (page - 1) * limit;
//   const paginatedPosts = posts.slice(startIndex, startIndex + limit);
//   return {
//     posts: paginatedPosts,
//     pagination: {
//       currentPage: page,
//       totalPages: Math.ceil(posts.length / limit),
//       totalPosts: posts.length,
//       postsPerPage: limit,
//     },
//   };
// }

// export async function getPostsByCategory(
//   categorySlug: string,
//   page: number = 1,
//   limit: number = 6,
// ) {
//   const allPosts = await fetchAllBlogPosts();
//   return paginatePosts(
//     allPosts.filter((post) => post.category.slug === categorySlug),
//     page,
//     limit,
//   );
// }

// export async function getPostsByCity(
//   citySlug: string,
//   page: number = 1,
//   limit: number = 6,
// ) {
//   const allPosts = await fetchAllBlogPosts();
//   return paginatePosts(
//     allPosts.filter((post) => post.city?.slug === citySlug),
//     page,
//     limit,
//   );
// }

// export async function getPostsByTag(
//   tag: string,
//   page: number = 1,
//   limit: number = 6,
// ) {
//   const allPosts = await fetchAllBlogPosts();
//   return paginatePosts(
//     allPosts.filter((post) =>
//       post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
//     ),
//     page,
//     limit,
//   );
// }

// export async function searchPosts(
//   query: string,
//   page: number = 1,
//   limit: number = 6,
// ) {
//   const allPosts = await fetchAllBlogPosts();
//   const searchTerm = query.toLowerCase();
//   const filtered = allPosts.filter(
//     (post) =>
//       post.title.toLowerCase().includes(searchTerm) ||
//       post.excerpt.toLowerCase().includes(searchTerm) ||
//       post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
//   );
//   return paginatePosts(filtered, page, limit);
// }
// // ==========================================
// // 🚀 دالة جلب المقالات ذات الصلة (ذكية وسريعة)
// // ==========================================
// export async function getRelatedPosts(
//   postId: string,
//   limit: number = 3,
// ): Promise<BlogPost[]> {
//   // 1. جلب كل المقالات الخفيفة (من الكاش، لا يوجد ضغط على السيرفر)
//   const allPosts = await fetchAllBlogPosts();

//   // 2. البحث عن المقال الحالي لمعرفة تصنيفه ووسومه
//   const currentPost = allPosts.find((p) => p.id === postId);
//   if (!currentPost) return [];

//   // 3. فلترة المقالات المشابهة
//   const related = allPosts.filter((post) => {
//     // 🚨 استبعاد المقال الحالي لكي لا يظهر كـ "مقال ذو صلة" لنفسه!
//     if (post.id === postId) return false;

//     // شرط الارتباط الأول: يشاركه نفس التصنيف (مثلاً كلاهما "مظلات سيارات")
//     const sameCategory = post.category.slug === currentPost.category.slug;

//     // شرط الارتباط الثاني: يشاركه في وسم (Tag) واحد على الأقل
//     const sharesTag = post.tags.some((tag) => currentPost.tags.includes(tag));

//     return sameCategory || sharesTag;
//   });

//   // 4. إرجاع العدد المطلوب فقط (3 مقالات كافتراضي)
//   return related.slice(0, limit);
// }

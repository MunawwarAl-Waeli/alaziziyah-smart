import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogCard } from "./components/BlogCard";
import { Categories } from "./components/Catogories";
import { SearchBar } from "./components/SearchBar";
import { Pagination } from "./components/Pagination";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { FormattedDate } from "./components/FormattedDate";

import {
  fetchAllBlogPosts,
  getPostsByCategory,
  getPostsByCity,
  getPostsByTag,
  fetchAllCategories,
} from "./data/posts";
import { PostsResponse } from "./types/bolg.types";
import Link from "next/link";
import { BlogHero } from "./components/BlogHeader";

export const metadata: Metadata = {
  title: "المدونة | نصائح وأسعار تركيب المظلات والسواتر بجدة",
  description:
    "اكتشف أحدث النصائح، الأفكار، والتصاميم في عالم تركيب المظلات والسواتر. دليلك الشامل لمعرفة الأسعار، الأنواع، وطرق الصيانة الفعالة.",
  keywords: [
    "اسعار المظلات بجدة",
    "سعر متر اللكسان",
    "ارخص انواع السواتر",
    "الفرق بين pvc والبولي ايثيلين",
    "افضل قماش لمظلات السيارات",
    "تصاميم برجولات حدائق",
    "افكار تغطية المسابح",
    "اشكال سواتر احواش",
    "صيانة مظلات السيارات",
    "تجديد ودهان المظلات",
  ].join(", "),
  alternates: {
    canonical: "https://al-azizia.com/blog",
  },
  openGraph: {
    title: "مدونة العزيزية | نصائح وأفكار المظلات والسواتر",
    description: "دليلك الشامل لاختيار وتصميم وصيانة المظلات والسواتر.",
    type: "website",
    url: "https://al-azizia.com/blog",
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    city?: string;
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const param = await searchParams;
  const currentPage = Number(param.page) || 1;
  const postsPerPage = 6;

  // ✅ جلب كل المقالات من ووردبريس (نحتاجها لأحدث المقالات ولعرض الكل)
  const allPosts = await fetchAllBlogPosts();
  const allCategories = await fetchAllCategories(); // 👈 جلب التصنيفات من السيرفر

  let postsResponse: PostsResponse;

  // ✅ تطبيق الفلاتر (مع إضافة await لأن الدوال أصبحت تتصل بسيرفر خارجي)
  if (param.category) {
    const category = allCategories.find((c) => c.slug === param.category);
    if (!category) notFound();
    postsResponse = await getPostsByCategory(
      param.category,
      currentPage,
      postsPerPage,
    );
  } else if (param.city) {
    postsResponse = await getPostsByCity(param.city, currentPage, postsPerPage);
  } else if (param.tag) {
    // ✅ استخدام الدالة الجاهزة بدلاً من الفلترة اليدوية
    postsResponse = await getPostsByTag(param.tag, currentPage, postsPerPage);
  } else {
    // عرض كل المقالات (الاعتماد على allPosts المجلوبة من ووردبريس)
    postsResponse = {
      posts: allPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage,
      ),
      pagination: {
        currentPage,
        totalPages: Math.ceil(allPosts.length / postsPerPage),
        totalPosts: allPosts.length,
        postsPerPage,
      },
    };
  }

  const { posts, pagination } = postsResponse;
  const itemListSchema =
    posts.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://al-azizia.com/blog/${post.slug}`,
            name: post.title,
          })),
        }
      : null;
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* الهيدر */}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <BlogHero />

      {/* محتوى المدونة */}
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs categories={allCategories} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* الشريط الجانبي */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Suspense fallback={<div>جاري تحميل البحث...</div>}>
                <SearchBar posts={allPosts} />
              </Suspense>

              <Categories
                categories={allCategories}
                selectedCategory={param.category}
                totalPosts={allPosts.length}
              />

              {/* إعلان أو رابط مهم */}
              <div className="bg-gradient-to-l from-amber-600 to-orange-600 text-white p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">📞 استشارة مجانية</h3>
                <p className="text-sm text-amber-100 mb-4">
                  تحتاج مساعدة في اختيار المظلة المناسبة؟ مهندسونا المتخصصون
                  جاهزون للرد على استفساراتك
                </p>
                <Link
                  dir="ltr"
                  href="tel:+966530989975"
                  className="block w-full bg-white text-amber-600 text-center py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors shadow-lg"
                >
                  +966 53 098 9975
                </Link>
                <Link
                  href="https://wa.me/966530989975"
                  target="_blank"
                  className="block w-full bg-emerald-600 text-white text-center py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg mt-3"
                >
                  واتساب: محادثة فورية
                </Link>
              </div>

              {/* أحدث المقالات */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
                <h3 className="font-bold text-lg mb-4">📌 أحدث المقالات</h3>
                <div className="space-y-4">
                  {/* ✅ التعديل هنا: استخدام allPosts بدلاً من blogPosts الثابتة */}
                  {allPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>

                      <p className="text-xs text-slate-500 mt-1">
                        <FormattedDate date={post.date} />
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* قائمة المقالات */}
          <main className="lg:col-span-3">
            {/* الفلاتر النشطة */}
            {(param.category || param.city || param.tag) && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-slate-600">
                    نتائج فلترة حسب:
                  </span>
                  {param.category && (
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs rounded-full">
                      {
                        allCategories.find((c) => c.slug === param.category)
                          ?.name
                      }
                    </span>
                  )}
                  {param.city && (
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs rounded-full">
                      مدينة {param.city}
                    </span>
                  )}
                  {param.tag && (
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs rounded-full">
                      وسم: {param.tag}
                    </span>
                  )}
                </div>
                <Link
                  href="/blog"
                  className="text-sm text-amber-600 hover:text-amber-700 font-bold"
                >
                  إلغاء الفلتر
                </Link>
              </div>
            )}

            {/* عدد النتائج */}
            <p className="text-sm text-slate-500 mb-4">
              عرض {posts.length} من أصل {pagination.totalPosts} مقال
            </p>

            {/* شبكة المقالات */}
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* التنقل بين الصفحات */}
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalPosts={pagination.totalPosts}
                  postsPerPage={pagination.postsPerPage}
                />
              </>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl">
                <p className="text-xl text-slate-500 mb-4">
                  لا توجد مقالات تطابق بحثك
                </p>
                <Link
                  href="/blog"
                  className="inline-block px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
                >
                  عرض جميع المقالات
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

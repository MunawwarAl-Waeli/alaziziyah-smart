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
  blogPosts,
  getPostsByCategory,
  getPostsByCity,
  categories,
} from "./data/posts";
import { PostsResponse } from "./types/bolg.types";
import Link from "next/link"; // ✅ الرابط الصحيح
import { BlogHero } from "./components/BlogHeader";

export const metadata: Metadata = {
  title: "مدونة العزيزية للمظلات والسواتر | نصائح وإرشادات",
  description:
    "مدونة متخصصة في عالم المظلات والسواتر - نصائح لاختيار المظلة المناسبة - أحدث التصاميم - أسعار وصيانة المظلات",
  keywords: "مظلات, سواتر, برجولات, مظلات سيارات, تركيب مظلات, مظلات مدارس",
  openGraph: {
    title: "مدونة العزيزية للمظلات والسواتر",
    description: "دليلك الشامل لاختيار وتصميم المظلات والسواتر",
    type: "website",
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

  let postsResponse: PostsResponse;

  // تطبيق الفلاتر
  if (param.category) {
    const category = categories.find((c) => c.slug === param.category);
    if (!category) notFound();
    postsResponse = getPostsByCategory(
      param.category,
      currentPage,
      postsPerPage,
    );
  } else if (param.city) {
    postsResponse = getPostsByCity(param.city, currentPage, postsPerPage);
  } else if (param.tag) {
    // فلترة حسب الوسم
    const filtered = blogPosts.filter((post) =>
      post.tags.some((t) => t === param.tag),
    );
    postsResponse = {
      posts: filtered.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage,
      ),
      pagination: {
        currentPage,
        totalPages: Math.ceil(filtered.length / postsPerPage),
        totalPosts: filtered.length,
        postsPerPage,
      },
    };
  } else {
    // عرض كل المقالات
    postsResponse = {
      posts: blogPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage,
      ),
      pagination: {
        currentPage,
        totalPages: Math.ceil(blogPosts.length / postsPerPage),
        totalPosts: blogPosts.length,
        postsPerPage,
      },
    };
  }

  const { posts, pagination } = postsResponse;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* الهيدر */}
   
        <BlogHero />

      {/* محتوى المدونة */}
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* الشريط الجانبي */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Suspense fallback={<div>جاري تحميل البحث...</div>}>
                <SearchBar />
              </Suspense>

              <Categories selectedCategory={param.category} />

              {/* إعلان أو رابط مهم */}
              <div className="bg-gradient-to-l from-amber-600 to-orange-600 text-white p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">📞 استشارة مجانية</h3>
                <p className="text-sm text-amber-100 mb-4">
                  تحتاج مساعدة في اختيار المظلة المناسبة؟ مهندسونا المتخصصون
                  جاهزون للرد على استفساراتك
                </p>
                <Link
                  href="tel:+966558181955"
                  className="block w-full bg-white text-amber-600 text-center py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors shadow-lg"
                >
                  اتصل الآن: 0558181955
                </Link>
                <Link
                  href="https://wa.me/966558181955"
                  target="_blank"
                  // rel="noopener noreferrer"
                  className="block w-full bg-emerald-600 text-white text-center py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg mt-3"
                >
                  واتساب: محادثة فورية
                </Link>
              </div>

              {/* أحدث المقالات */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
                <h3 className="font-bold text-lg mb-4">📌 أحدث المقالات</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
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
                      {categories.find((c) => c.slug === param.category)?.name}
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


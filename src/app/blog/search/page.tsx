import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "../components/BlogCard";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { searchPosts } from "../data/posts";
import { Breadcrumbs } from "../components/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "البحث في المدونة - العزيزية للمظلات",
  robots: "noindex, follow", // منع فهرسة صفحات البحث
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 6;

  if (!query) {
    notFound();
  }

  const { posts, pagination } = searchPosts(query, currentPage, postsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <Breadcrumbs />

        <div className="max-w-4xl mx-auto">
          {/* رأس البحث */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              نتائج البحث عن: {query}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {pagination.totalPosts} نتيجة تم العثور عليها
            </p>
          </div>

          {/* شريط البحث */}
          <div className="mb-8">
            <SearchBar />
          </div>

          {/* نتائج البحث */}
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

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
                عذراً، لم نجد نتائج لبحثك
              </p>
              <p className="text-slate-400 mb-8">
                جرب كلمات بحث مختلفة أو تصفح جميع المقالات
              </p>
              <Link
                href="/blog"
                className="inline-block px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
              >
                تصفح جميع المقالات
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

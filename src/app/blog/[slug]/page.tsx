import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/config";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Eye,
  Phone,
  MessageCircle,
} from "lucide-react";
// ✅ 1. تحديث الاستيرادات لتشمل الدوال الجديدة
import {
  fetchAllBlogPosts,
  getPostBySlug,
  getRelatedPosts,
  fetchAllCategories,
} from "../data/posts";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PostActions } from "../components/PostActions";
import { PostNavigation } from "../components/PostNavigation";
import { FormattedDate } from "../components/FormattedDate";
import { articleSchema } from "@/lib/seo-config";
import WordPressContent from "@/lib/WordPressContent"; // تأكد من المسار الصحيح
// 🚀 1. توليد روابط المقالات مسبقاً (SSG) من ووردبريس
export async function generateStaticParams() {
  const allPosts = await fetchAllBlogPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 🚀 2. تحديث المحتوى كل ساعة تلقائياً (ISR)
export const revalidate = 3600;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "المقالة غير موجودة" };
  }

  // 🚀 3. توحيد الدومين لحماية الـ SEO
  const postUrl = `https://al-azizia.com/blog/${post.slug}`;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags.join(", "),
    alternates: {
      canonical: postUrl, // 🚨 تم إنقاذ المقال وإضافة الرابط المعتمد
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: post.date || new Date().toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  // ✅ 2. جلب المقال الحالي من السيرفر
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // ✅ 3. جلب كل المقالات لمعرفة (المقال السابق والتالي) و(أحدث المقالات بالشريط الجانبي)
  const allPosts = await fetchAllBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // ✅ 4. جلب المقالات ذات الصلة (نرسل مسار التصنيف، ومسار المقال الحالي لكي لا يظهر نفسه بالنتائج)
  const relatedPosts = await getRelatedPosts(post.id);

  // حماية للتاريخ في حال قررت تجاهله من الباك إند
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "غير محدد";

  // تجهيز بيانات السكيمة للمقال الحالي
  const jsonLd = articleSchema({
    title: post.title,
    description: post.excerpt,
    image: `https://al-azizia.com${post.coverImage}`,
    publishedTime: post.date || new Date().toISOString(),
    modifiedTime: post.date || new Date().toISOString(),
    category: post.category.name,
    authors: ["مؤسسة العزيزية للمقاولات"],
    url: `https://al-azizia.com/blog/${post.slug}`,
  });
  const allCategories = await fetchAllCategories(); // جلب جميع التصنيفات لتمريرها إلى Breadcrumbs
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
          <div className="mb-4 md:mb-6">
            <Breadcrumbs categories={allCategories} postTitle={post.title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8">
              <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-amber-100 dark:border-amber-900/30">
                {post.coverImage && (
                  <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                      <Link
                        href={`/blog?category=${post.category.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-600 text-white rounded-lg text-xs sm:text-sm font-bold hover:bg-amber-700 transition-colors shadow-lg"
                      >
                        <span>{post.category.icon}</span>
                        <span className="hidden sm:inline">
                          {post.category.name}
                        </span>
                      </Link>
                    </div>
                    <div className="absolute bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-6">
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                        {post.title}
                      </h1>
                      <p className="text-sm sm:text-base md:text-lg text-amber-100 line-clamp-2 sm:line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-amber-100 dark:border-amber-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">كاتب المقال</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                          {post.author.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      <div>
                        <p className="text-xs text-slate-500">تاريخ النشر</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      <div>
                        <p className="text-xs text-slate-500">وقت القراءة</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                          {post.readTime} دقائق
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <Eye className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-xs text-slate-500">عدد المشاهدات</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {post.views.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <WordPressContent
                    content={post.content}
                    className="w-full max-w-none text-right
                prose prose-slate dark:prose-invert 
                prose-sm md:prose-base lg:prose-lg
                
                prose-p:text-justify prose-p:leading-[1.9] prose-p:mb-6 prose-p:text-slate-700 dark:prose-p:text-slate-300
                
                prose-headings:font-black prose-headings:text-foreground prose-headings:mb-4
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:border-r-4 prose-h2:border-primary prose-h2:pr-4 prose-h2:mt-10
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-primary prose-h3:mt-8
                
                prose-strong:font-bold prose-strong:text-slate-900 dark:prose-strong:text-slate-100
                
                prose-ul:list-disc prose-ul:pr-5 prose-ul:mb-6 prose-li:mb-2 prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:marker:text-primary
                prose-ol:list-decimal prose-ol:pr-5 prose-ol:mb-6
                
                prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:object-cover prose-img:my-8
                prose-a:text-primary hover:prose-a:text-primary-dark prose-a:transition-colors
                break-words"
                  />

                  <div className="flex flex-wrap items-center gap-2 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-100 dark:border-amber-800">
                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-lg text-xs sm:text-sm hover:bg-amber-100 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                  <PostActions title={post.title} excerpt={post.excerpt} />
                </div>
              </article>
              <PostNavigation prevPost={prevPost} nextPost={nextPost} />
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shrink-0">
                    {post.author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-200">
                      {post.author.name}
                    </h3>
                    <p className="text-amber-600 text-sm mb-2">
                      {post.author.title}
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="mt-8 sm:mt-12">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 sm:h-8 bg-amber-600 rounded-full"></span>
                    مقالات ذات صلة
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-amber-100 dark:border-amber-900/30 hover:shadow-xl transition-all hover:-translate-y-1"
                      >
                        {relatedPost.coverImage && (
                          <div className="relative h-40 sm:h-48 overflow-hidden">
                            <Image
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-3 sm:p-4">
                          <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{relatedPost.readTime} دقائق</span>
                            <FormattedDate date={relatedPost.date} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="font-bold text-lg mb-4">📞 تواصل معنا</h3>
                  <p className="text-sm text-amber-100 mb-4">
                    مهندسونا المتخصصون جاهزون للرد على استفساراتك
                  </p>
                  <div className="space-y-3">
                    <a
                      href={SOCIAL_LINKS.consultationPhone}
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <div>
                        <p className="text-xs opacity-75">اتصال مباشر</p>
                        <p className="font-bold">966530989975</p>
                      </div>
                    </a>
                    <a
                      href={SOCIAL_LINKS.consultationWhatsapp}
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <div>
                        <p className="text-xs opacity-75">واتساب</p>
                        <p className="font-bold">محادثة فورية</p>
                      </div>
                    </a>
                    <Link
                      href="/contact"
                      className="block w-full bg-white text-amber-600 text-center py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors mt-2"
                    >
                      طلب عرض سعر
                    </Link>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-amber-600 rounded-full"></span>
                    تصنيفات سريعة
                  </h3>
                  <div className="space-y-2">
                    {allCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/blog?category=${cat.slug}`}
                        className="flex items-center justify-between p-2 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-lg transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          {cat.name}
                        </span>
                        <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 px-2 py-1 rounded-full">
                          {cat.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
                  <h3 className="font-bold text-lg mb-4">📌 أحدث المقالات</h3>
                  <div className="space-y-4">
                    {/* ✅ جلب أحدث المقالات من السيرفر (allPosts) بدلاً من الثابتة */}
                    {allPosts.slice(0, 4).map((p) => (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}`}
                        className="flex gap-3 group"
                      >
                        {p.coverImage && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={p.coverImage}
                              alt={p.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {p.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            <FormattedDate date={p.date} />
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { SOCIAL_LINKS } from "@/lib/config";
// import {
//   Calendar,
//   Clock,
//   User,
//   Tag,
//   Eye,
//   Phone,
//   MessageCircle,
// } from "lucide-react";
// import { blogPosts, categories, getRelatedPosts } from "../data/posts";
// import { Breadcrumbs } from "../components/Breadcrumbs";
// import { PostActions } from "../components/PostActions";
// import { PostNavigation } from "../components/PostNavigation";
// import { FormattedDate } from "../components/FormattedDate";
// import { articleSchema } from "@/lib/seo-config";

// // 🚀 1. توليد روابط المقالات مسبقاً لجعلها فائقة السرعة (SSG)
// export async function generateStaticParams() {
//   return blogPosts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// // 🚀 2. تحديث المحتوى كل ساعة تلقائياً (ISR)
// export const revalidate = 3600;

// interface PostPageProps {
//   params: Promise<{ slug: string }>;
// }

// export async function generateMetadata({
//   params,
// }: PostPageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const post = blogPosts.find((p) => p.slug === slug);

//   if (!post) {
//     return { title: "المقالة غير موجودة" };
//   }

//   return {
//     title: post.title,
//     description: post.excerpt,
//     keywords: post.tags.join(", "),
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       type: "article",
//       publishedTime: post.date,
//       authors: [post.author.name],
//       tags: post.tags,
//       images: post.coverImage ? [{ url: post.coverImage }] : [],
//     },
//   };
// }

// export default async function PostPage({ params }: PostPageProps) {
//   const { slug } = await params;
//   const post = blogPosts.find((p) => p.slug === slug);

//   if (!post) {
//     notFound();
//   }
//   const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
//   // 1. تجهيز بيانات السكيمة للمقال الحالي
//   const jsonLd = articleSchema({
//     title: post.title,
//     description: post.excerpt, // أو الوصف المختصر للمقال
//     image: `https://www.al-azizia.com${post.coverImage}`,
//     publishedTime: post.date,
//     modifiedTime: post.date, // أو تاريخ التعديل إن وجد
//     category: post.category.name,
//     authors: ["شركة العزيزية"],
//     url: `https://www.al-azizia.com/blog/${post.slug}`,
//   });
//   const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
//   const nextPost =
//     currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

//   const relatedPosts = getRelatedPosts(post.id);

//   const formattedDate = new Date(post.date).toLocaleDateString("ar-SA", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <section>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900">
//         <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
//           <div className="mb-4 md:mb-6">
//             <Breadcrumbs />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
//             <div className="lg:col-span-8">
//               <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-amber-100 dark:border-amber-900/30">
//                 {post.coverImage && (
//                   <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full">
//                     <Image
//                       src={post.coverImage}
//                       alt={post.title}
//                       fill
//                       className="object-cover"
//                       priority
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//                     <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
//                       <Link
//                         href={`/blog?category=${post.category.slug}`}
//                         className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-600 text-white rounded-lg text-xs sm:text-sm font-bold hover:bg-amber-700 transition-colors shadow-lg"
//                       >
//                         <span>{post.category.icon}</span>
//                         <span className="hidden sm:inline">
//                           {post.category.name}
//                         </span>
//                       </Link>
//                     </div>
//                     <div className="absolute bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-6">
//                       <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
//                         {post.title}
//                       </h1>
//                       <p className="text-sm sm:text-base md:text-lg text-amber-100 line-clamp-2 sm:line-clamp-3">
//                         {post.excerpt}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 <div className="p-4 sm:p-6 md:p-8">
//                   <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-amber-100 dark:border-amber-800">
//                     <div className="flex items-center gap-2">
//                       <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
//                         <User className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-500">كاتب المقال</p>
//                         <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
//                           {post.author.name}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
//                       <div>
//                         <p className="text-xs text-slate-500">تاريخ النشر</p>
//                         <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
//                           {formattedDate}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
//                       <div>
//                         <p className="text-xs text-slate-500">وقت القراءة</p>
//                         <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
//                           {post.readTime} دقائق
//                         </p>
//                       </div>
//                     </div>
//                     <div className="hidden sm:flex items-center gap-2">
//                       <Eye className="w-5 h-5 text-amber-600" />
//                       <div>
//                         <p className="text-xs text-slate-500">عدد المشاهدات</p>
//                         <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
//                           {post.views.toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert prose-headings:text-amber-700 prose-a:text-amber-600 prose-img:rounded-xl prose-img:shadow-lg"
//                     dangerouslySetInnerHTML={{ __html: post.content }}
//                   />

//                   <div className="flex flex-wrap items-center gap-2 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-100 dark:border-amber-800">
//                     <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
//                     {post.tags.map((tag) => (
//                       <Link
//                         key={tag}
//                         href={`/blog?tag=${encodeURIComponent(tag)}`}
//                         className="px-2 py-1 sm:px-3 sm:py-1.5 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-lg text-xs sm:text-sm hover:bg-amber-100 transition-colors"
//                       >
//                         #{tag}
//                       </Link>
//                     ))}
//                   </div>
//                   <PostActions title={post.title} excerpt={post.excerpt} />
//                 </div>
//               </article>
//               <PostNavigation prevPost={prevPost} nextPost={nextPost} />
//               <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-amber-100 dark:border-amber-900/30">
//                 <div className="flex flex-col sm:flex-row items-start gap-4">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shrink-0">
//                     {post.author.name.charAt(0)}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-200">
//                       {post.author.name}
//                     </h3>
//                     <p className="text-amber-600 text-sm mb-2">
//                       {post.author.title}
//                     </p>
//                     <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
//                       {post.author.bio}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {relatedPosts.length > 0 && (
//                 <div className="mt-8 sm:mt-12">
//                   <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6 flex items-center gap-2">
//                     <span className="w-1 h-6 sm:h-8 bg-amber-600 rounded-full"></span>
//                     مقالات ذات صلة
//                   </h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                     {relatedPosts.map((relatedPost) => (
//                       <Link
//                         key={relatedPost.id}
//                         href={`/blog/${relatedPost.slug}`}
//                         className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-amber-100 dark:border-amber-900/30 hover:shadow-xl transition-all hover:-translate-y-1"
//                       >
//                         {relatedPost.coverImage && (
//                           <div className="relative h-40 sm:h-48 overflow-hidden">
//                             <Image
//                               src={relatedPost.coverImage}
//                               alt={relatedPost.title}
//                               fill
//                               className="object-cover group-hover:scale-110 transition-transform duration-500"
//                             />
//                           </div>
//                         )}
//                         <div className="p-3 sm:p-4">
//                           <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
//                             {relatedPost.title}
//                           </h3>
//                           <div className="flex items-center justify-between text-xs text-slate-500">
//                             <span>{relatedPost.readTime} دقائق</span>
//                             <FormattedDate date={relatedPost.date} />
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <aside className="hidden lg:block lg:col-span-4">
//               <div className="sticky top-24 space-y-6">
//                 <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
//                   <h3 className="font-bold text-lg mb-4">📞 تواصل معنا</h3>
//                   <p className="text-sm text-amber-100 mb-4">
//                     مهندسونا المتخصصون جاهزون للرد على استفساراتك
//                   </p>
//                   <div className="space-y-3">
//                     <a
//                       href={SOCIAL_LINKS.consultationPhone}
//                       className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
//                     >
//                       <Phone className="w-5 h-5" />
//                       <div>
//                         <p className="text-xs opacity-75">اتصال مباشر</p>
//                         <p className="font-bold">966530989975</p>
//                       </div>
//                     </a>
//                     <a
//                       href={SOCIAL_LINKS.consultationWhatsapp}
//                       className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
//                     >
//                       <MessageCircle className="w-5 h-5" />
//                       <div>
//                         <p className="text-xs opacity-75">واتساب</p>
//                         <p className="font-bold">محادثة فورية</p>
//                       </div>
//                     </a>
//                     <Link
//                       href="/contact"
//                       className="block w-full bg-white text-amber-600 text-center py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors mt-2"
//                     >
//                       طلب عرض سعر
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
//                   <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
//                     <span className="w-1 h-5 bg-amber-600 rounded-full"></span>
//                     تصنيفات سريعة
//                   </h3>
//                   <div className="space-y-2">
//                     {categories.map((cat) => (
//                       <Link
//                         key={cat.id}
//                         href={`/blog?category=${cat.slug}`}
//                         className="flex items-center justify-between p-2 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-lg transition-colors"
//                       >
//                         <span className="flex items-center gap-2">
//                           <span>{cat.icon}</span>
//                           {cat.name}
//                         </span>
//                         <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 px-2 py-1 rounded-full">
//                           {cat.count}
//                         </span>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
//                   <h3 className="font-bold text-lg mb-4">📌 أحدث المقالات</h3>
//                   <div className="space-y-4">
//                     {blogPosts.slice(0, 4).map((p) => (
//                       <Link
//                         key={p.id}
//                         href={`/blog/${p.slug}`}
//                         className="flex gap-3 group"
//                       >
//                         {p.coverImage && (
//                           <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
//                             <Image
//                               src={p.coverImage}
//                               alt={p.title}
//                               fill
//                               className="object-cover group-hover:scale-110 transition-transform"
//                             />
//                           </div>
//                         )}
//                         <div>
//                           <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-amber-600 transition-colors">
//                             {p.title}
//                           </h4>
//                           <p className="text-xs text-slate-500 mt-1">
//                             <FormattedDate date={p.date} />
//                           </p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

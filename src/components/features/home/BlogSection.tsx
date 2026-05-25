"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  BookOpen,
  Eye,
  MapPin,
} from "lucide-react";
import { ElegantCurveDivider } from "@/components/ui/ElegantCurveDivider";
import { BlogPost } from "@/app/blog/types/bolg.types";

interface BlogSectionProps {
  posts?: BlogPost[]; // علامة الاستفهام ضرورية هنا
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogSection({ posts = [] }: BlogSectionProps) {
const safePosts = Array.isArray(posts) ? posts : [];
  const latestPosts = [...safePosts]
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3);

  // 3. التحقق من وجود بيانات للعرض
  if (latestPosts.length === 0) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "حديث";
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!posts || posts.length === 0) return null;

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background to-slate-50 dark:to-slate-950"
    >

    

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold">
              مدونة العزيزية
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            أحدث{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
              المقالات
            </span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            نصائح وإرشادات احترافية لاختيار وتصميم وصيانة المظلات والسواتر
          </p>
        </motion.div>

        {/* شبكة المقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg">
                      {post.category.name}
                    </span>
                    {post.city && (
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.city.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} دقائق
                    </span>
                    {post.views > 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {post.author?.name || "فريق العزيزية"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-l from-primary to-primary-dark text-white rounded-2xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all"
          >
            <span className="relative z-10 flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              <span>جميع المقالات</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


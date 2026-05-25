// src/components/HomeSections.tsx
"use client";

import { BlogPost } from "@/app/blog/types/bolg.types";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// استيراد واجهة الفيديو (تأكد من تصديرها في ملف video-section.tsx)
import { YouTubeVideo } from "@/components/features/home/video-section";

const VideoGallery = dynamic(
  () =>
    import("@/components/features/home/video-section").then(
      (mod) => mod.VideoGallery,
    ),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        جاري تحميل الفيديوهات...
      </div>
    ),
  },
);

const BlogSection = dynamic(
  () =>
    import("@/components/features/home/BlogSection").then(
      (mod) => mod.BlogSection,
    ),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        جاري التحميل...
      </div>
    ),
    ssr: false,
  },
);

const CTASection = dynamic(
  () =>
    import("@/components/features/home/cta-section").then(
      (mod) => mod.CTASection,
    ),
  {
    loading: () => (
      <div className="min-h-[200px] flex items-center justify-center">
        جاري التحميل...
      </div>
    ),
  },
);

// ✅ 1. تحديث الـ Props لاستقبال بيانات الفيديو
interface HomeSectionsProps {
  allPosts: BlogPost[];
  initialVideos: YouTubeVideo[];
  videoError: string | null;
}

export default function HomeSections({
  allPosts,
  initialVideos,
  videoError,
}: HomeSectionsProps) {
  return (
    <>
      <section id="videos">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          {/* ✅ 2. تمرير البيانات للمكون */}
          <VideoGallery initialVideos={initialVideos} error={videoError} />
        </motion.div>
      </section>

      <section id="blog">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <BlogSection posts={allPosts} />
        </motion.div>
      </section>

      <section id="contact">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
        >
          <CTASection />
        </motion.div>
      </section>
    </>
  );
}

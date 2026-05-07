// src/components/HomeSections.tsx
"use client";

import { BlogPost } from "@/app/blog/types/bolg.types";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// 🚀 تم تغيير الاستدعاءات العادية إلى استدعاءات ديناميكية (Lazy Load)
// هذا سيوقف تحميل هذه الأقسام حتى يقترب منها المستخدم!
const VideoGallery = dynamic(
  () =>
    import("@/components/features/home/video-section").then(
      (mod) => mod.VideoGallery,
    ),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        جاري التحميل...
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

const SmartCalculator = dynamic(
  () =>
    import("@/components/features/home/SmartCalculator").then(
      (mod) => mod.SmartCalculator,
    ),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        جاري التحميل...
      </div>
    ),
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

interface HomeSectionsProps {
  allPosts: BlogPost[];
}

export default function HomeSections({ allPosts }: HomeSectionsProps) {
  console.log("Received posts in BlogSection:", allPosts); // ✅ للتأكد من البيانات

  return (
    <>
      <section id="videos">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <VideoGallery />
        </motion.div>
      </section>

      <section id="blog">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          {/* 2. تمرير البيانات للمكون */}
          <BlogSection posts={allPosts} />
        </motion.div>
      </section>

      <section id="calculator">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          <SmartCalculator />
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

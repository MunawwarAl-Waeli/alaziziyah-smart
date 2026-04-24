// src/components/HomeSections.tsx
"use client";

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

export function HomeSections() {
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
          <BlogSection />
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
// "use client";

// import { motion } from "framer-motion";
// import { BlogSection } from "@/components/features/home/BlogSection";
// import { CTASection } from "@/components/features/home/cta-section";
// import { SmartCalculator } from "@/components/features/home/SmartCalculator";
// import { VideoGallery } from "@/components/features/home/video-section";

// export function HomeSections() {
//   return (
//     <>
//       <section id="videos">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
//         >
//           <VideoGallery />
//         </motion.div>
//       </section>

//       <section id="blog">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
//         >
//           <BlogSection />
//         </motion.div>
//       </section>

//       <section id="calculator">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
//         >
//           <SmartCalculator />
//         </motion.div>
//       </section>

//       <section id="contact">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
//         >
//           <CTASection />
//         </motion.div>
//       </section>
//     </>
//   );
// }

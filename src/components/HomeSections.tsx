"use client";

import { motion } from "framer-motion";
import { BlogSection } from "@/components/features/home/BlogSection";
import { CTASection } from "@/components/features/home/cta-section";
import { SmartCalculator } from "@/components/features/home/SmartCalculator";
import { VideoGallery } from "@/components/features/home/video-section";

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

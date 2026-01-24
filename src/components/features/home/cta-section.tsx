"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MessageCircle, PhoneCall } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* خلفية مع تدرج لوني جذاب */}
      <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      {/* دوائر خلفية جمالية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            جاهز لهندسة <br />
            <span className="text-gradient-gold">أجوائك الخاصة؟</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            لا تترك منزلك للشمس والغبار. دعنا نصمم لك نظام حماية ذكي يجمع بين
            الفخامة والوظيفة. استشارة هندسية مجانية بانتظارك.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* زر الواتساب (أساسي) */}
            <Link href="https://wa.me/966500000000" target="_blank">
              <button className="group relative px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-lg flex items-center gap-3 shadow-lg hover:shadow-[#25D366]/30 transition-all active:scale-95 w-full sm:w-auto justify-center">
                <MessageCircle className="w-5 h-5" />
                <span>محادثة واتساب</span>
              </button>
            </Link>

            {/* زر الاتصال (ثانوي) */}
            <Link href="/contact">
              <button className="group px-8 py-4 bg-background border border-border text-foreground hover:border-primary hover:text-primary rounded-full font-bold text-lg flex items-center gap-3 transition-all active:scale-95 w-full sm:w-auto justify-center">
                <PhoneCall className="w-5 h-5" />
                <span>حجز موعد معاينة</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground/60">
            * الرد عادة يكون خلال 15 دقيقة في أوقات العمل
          </p>
        </motion.div>
      </div>
    </section>
  );
}

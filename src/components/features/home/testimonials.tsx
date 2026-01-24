"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// بيانات المراجعات
const reviews = [
  {
    id: 1,
    name: "م. عبدالرحمن القحطاني",
    role: "مدير مشاريع - شركة الإنشاءات الحديثة",
    text: "تعاملنا مع مصانع كثيرة، لكن العزيزية تميزوا بالدقة الهندسية. المخططات التي قدموها للمظلات كانت مطابقة تماماً للتنفيذ. احترافية عالية.",
    rating: 5,
    image: "/images/avatar-1.jpg", // يمكن استخدام صور افتراضية
  },
  {
    id: 2,
    name: "د. خالد الزهراني",
    role: "مالك فيلا خاصة",
    text: "ركبت عندهم نظام البرجولة الذكية. التحكم بالجوال جداً مريح، والعزل الحراري فرق معي كثير في فاتورة الكهرباء. أنصح بهم.",
    rating: 5,
    image: "/images/avatar-2.jpg",
  },
  {
    id: 3,
    name: "أستاذة سارة الشمري",
    role: "مشرفة مشتريات - مدارس المناهج",
    text: "السرعة في التوريد والتركيب كانت مفاجأة. أنهوا مظلات الساحة المدرسية في إجازة نهاية الأسبوع بدون تعطيل الدراسة.",
    rating: 5,
    image: "/images/avatar-3.jpg",
  },
];

// شعارات الشركاء (أسماء ملفات افتراضية)
const partners = ["stc", "aramco", "neom", "vision2030", "ministry-edu"];

export function Testimonials() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* خلفية جمالية خفيفة */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* العنوان */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">
            شركاء <span className="text-gradient-gold">النجاح</span>
          </h2>
        </div>

        {/* شبكة المراجعات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        {/* فاصل بسيط */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

        {/* شعارات الشركات (Trust Badges) */}
        <div className="text-center">
          <p className="text-muted-foreground mb-8 text-sm">
            نفتخر بخدمة كبرى الجهات في المملكة
          </p>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* هنا يفترض وضع صور الشعارات، سأضع نصوصاً كبديل مؤقت */}
            {/* في حال توفر صور، استبدل الـ span بـ <Image /> */}
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-black text-foreground/20 hover:text-foreground/80 cursor-default transition-colors uppercase"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors group"
    >
      {/* علامة الاقتباس */}
      <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

      {/* النجوم */}
      <div className="flex gap-1 mb-6">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>

      {/* النص */}
      <p className="text-foreground/80 leading-relaxed mb-8 relative z-10">
        "{review.text}"
      </p>

      {/* العميل */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden relative border border-border">
          {/* في حال عدم توفر صورة، يظهر الحرف الأول */}
          <div className="absolute inset-0 flex items-center justify-center font-bold text-muted-foreground">
            {review.name.charAt(0)}
          </div>
          {/* <Image src={review.image} alt={review.name} fill className="object-cover" /> */}
        </div>
        <div>
          <h4 className="font-bold text-foreground text-sm">{review.name}</h4>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

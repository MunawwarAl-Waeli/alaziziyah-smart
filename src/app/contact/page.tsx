"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  Building2,
  Home,
  Briefcase,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Variants, Transition } from "framer-motion";
// --- Types & Interfaces ---
interface ProjectType {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
  href?: string;
}

// --- Data ---
const projectTypes: ProjectType[] = [
  { id: "residential", label: "سكني (فيلات/قصور)", icon: Home },
  { id: "commercial", label: "تجارية (مطاعم/فنادق)", icon: Briefcase },
  { id: "government", label: "مشاريع حكومية وكبرى", icon: Building2 },
];

// --- Animations ---
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as Transition["ease"], // 🟢 Type-safe
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال البيانات للسيرفر
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: "",
      phone: "",
      email: "",
      projectType: "",
      message: "",
    });
  };

  return (
    <main
      className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pt-32 pb-20 overflow-hidden relative"
      dir="rtl"
    >
      {/* خلفيات جمالية فخمة */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* رأس الصفحة */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm font-bold mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
            </span>
            تواصل معنا الآن
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tight"
          >
            لنبدأ بناء <span className="text-[#d4af37]">رؤيتك</span> الهندسية
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed"
          >
            فريقنا الهندسي جاهز لتحويل مساحتك إلى تحفة فنية. تواصل معنا اليوم
            لاستشارة مجانية وتصميم مبدئي لمشروعك.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* الجانب الأيمن: معلومات الاتصال */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* بطاقة المعلومات الرئيسية */}
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-bl-full transition-transform duration-700 group-hover:scale-110" />

              <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white relative z-10">
                بيانات التواصل
              </h3>

              <div className="space-y-6 relative z-10">
                <ContactItem
                  icon={Phone}
                  label="المبيعات والاستشارات"
                  value="+966 50 000 0000"
                  href="tel:+966500000000"
                />
                <ContactItem
                  icon={Mail}
                  label="البريد الإلكتروني"
                  value="info@alaziziyah.com"
                  href="mailto:info@alaziziyah.com"
                />
                <ContactItem
                  icon={MapPin}
                  label="المقر الرئيسي"
                  value="الرياض، المنطقة الصناعية الثانية"
                  subValue="مبنى رقم 45، شارع الإبداع"
                />
                <ContactItem
                  icon={Clock}
                  label="ساعات العمل"
                  value="السبت - الخميس"
                  subValue="8:00 صباحاً - 6:00 مساءً"
                />
              </div>
            </div>

            {/* بطاقة الدعم السريع */}
            <div className="bg-gradient-to-br from-slate-900 to-[#0f172a] dark:from-[#0b1120] dark:to-[#020617] border border-slate-800 dark:border-white/5 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#d4af37]/20 blur-3xl rounded-full group-hover:bg-[#d4af37]/30 transition-colors" />

              <h3 className="font-bold text-xl mb-3 relative z-10">
                هل لديك استفسار سريع؟
              </h3>
              <p className="text-gray-400 mb-8 text-sm relative z-10 leading-relaxed">
                وفر وقتك وتصفح قسم الأسئلة الشائعة، فقد قمنا بالإجابة على أكثر
                استفسارات عملائنا شيوعاً.
              </p>
              <Link
                href="/faq"
                className="inline-flex w-full justify-center items-center gap-2 bg-[#d4af37] text-slate-900 px-6 py-3.5 rounded-xl font-bold hover:bg-[#c4a027] transition-all relative z-10 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
              >
                تصفح الأسئلة الشائعة
              </Link>
            </div>
          </motion.div>

          {/* الجانب الأيسر: نموذج التواصل */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {/* الحقول النصية */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 dark:text-gray-300">
                          الاسم الكامل <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="مثلاً: محمد عبدالله"
                          className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 dark:text-gray-300">
                          رقم الجوال <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="05xxxxxxxx"
                          className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-right"
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* خيارات نوع المشروع */}
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-slate-700 dark:text-gray-300">
                        نوع المشروع المستهدف{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {projectTypes.map((type) => {
                          const Icon = type.icon;
                          const isSelected = formData.projectType === type.id;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  projectType: type.id,
                                })
                              }
                              className={cn(
                                "flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-300",
                                isSelected
                                  ? "border-[#d4af37] bg-[#d4af37]/5 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                                  : "border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#020617] text-slate-500 hover:border-[#d4af37]/40 hover:text-slate-700 dark:hover:text-gray-300",
                              )}
                            >
                              <Icon
                                className={cn(
                                  "w-6 h-6",
                                  isSelected
                                    ? "text-[#d4af37]"
                                    : "text-slate-400",
                                )}
                              />
                              <span className="text-xs font-bold text-center">
                                {type.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* الرسالة */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 dark:text-gray-300">
                        تفاصيل المشروع <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="أخبرنا المزيد عن مشروعك (المساحة التقريبية، الموقع، المتطلبات الخاصة)..."
                        className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all resize-none"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    {/* زر الإرسال */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.projectType}
                      className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl hover:bg-[#d4af37] dark:hover:bg-[#d4af37] hover:text-slate-900 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          جاري إرسال الطلب...
                        </>
                      ) : (
                        <>
                          إرسال طلب التسعير
                          <Send className="w-5 h-5 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
                      <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center relative z-10">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                      تم استلام طلبك بنجاح!
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 text-lg max-w-md mb-10 leading-relaxed">
                      شكراً لثقتك بـ{" "}
                      <span className="text-[#d4af37] font-bold">العزيزية</span>
                      . سيقوم أحد مستشارينا الهندسيين بمراجعة تفاصيل مشروعك
                      والتواصل معك في أقرب وقت.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-[#d4af37] font-bold hover:text-[#c4a027] border-b border-transparent hover:border-[#c4a027] transition-all pb-1"
                    >
                      &rarr; إرسال طلب جديد
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* قسم الخريطة */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/5 relative group"
        >
          {/* رابط حقيقي لخريطة الرياض للتجربة */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115934.34685023908!2d46.7214711!3d24.6394578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2z2KfZhNix2YrYp9i2INin2YTZhdmF2YTYg9ipINin2YTYudix2KjZitipINin2YTYs9i52YjYrdiv2YrYqQ!5e0!3m2!1sar!2s!4v1699999999999!5m2!1sar!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
          />

          {/* شارة فوق الخريطة */}
          <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-slate-200 dark:border-white/10 pointer-events-none">
            <p className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              موقعنا الحالي
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

interface ContentProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
  href?: string;
}

function Content({ Icon, label, value, subValue, href }: ContentProps) {
  return (
    <div className="flex items-start gap-4 group/item cursor-pointer p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-[#d4af37] group-hover/item:text-slate-900 text-[#d4af37] transition-colors duration-500 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-500 dark:text-gray-400 mb-1">
          {label}
        </p>
        <p
          className="font-bold text-slate-900 dark:text-white text-base md:text-lg"
          dir={href?.includes("tel:") ? "ltr" : "rtl"}
        >
          {value}
        </p>
        {subValue && (
          <p className="text-sm text-slate-500 dark:text-gray-500 mt-1">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
}
function ContactItem({
  icon: Icon,
  label,
  value,
  subValue,
  href,
}: ContactItemProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Content
          Icon={Icon}
          label={label}
          value={value}
          subValue={subValue}
          href={href}
        />
      </a>
    );
  }

  return (
    <Content Icon={Icon} label={label} value={value} subValue={subValue} />
  );
}
// الاستغناء عن any باستخدام ContactItemProps المحددة مسبقاً
// function ContactItem({
//   icon: Icon,
//   label,
//   value,
//   subValue,
//   href,
// }: ContactItemProps) {
//   const Content = () => (
//     <div className="flex items-start gap-4 group/item cursor-pointer p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
//       <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-[#d4af37] group-hover/item:text-slate-900 text-[#d4af37] transition-colors duration-500 shrink-0">
//         <Icon className="w-5 h-5" />
//       </div>
//       <div>
//         <p className="text-sm font-bold text-slate-500 dark:text-gray-400 mb-1">
//           {label}
//         </p>
//         <p
//           className="font-bold text-slate-900 dark:text-white text-base md:text-lg"
//           dir={href?.includes("tel:") ? "ltr" : "rtl"}
//         >
//           {value}
//         </p>
//         {subValue && (
//           <p className="text-sm text-slate-500 dark:text-gray-500 mt-1">
//             {subValue}
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   if (href) {
//     return (
//       <a
//         href={href}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block"
//       >
//         <Content />
//       </a>
//     );
//   }

//   return <Content />;
// }

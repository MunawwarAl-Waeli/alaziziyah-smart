"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Send,
  ShieldCheck,
  Hammer,
} from "lucide-react";
import { trackGAEvent } from "@/lib/analytics";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    details: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMessage("");

    const graphqlQuery = {
      query: `
        mutation SubmitForm($input: SubmitContactFormInput!) {
          submitContactForm(input: $input) {
            success
            message
          }
        }
      `,
      variables: {
        input: {
          clientMutationId: "contactFormSubmit",
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          details: formData.details,
        },
      },
    };

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(graphqlQuery),
        },
      );

      const responseData = await res.json();
      const result = responseData?.data?.submitContactForm;

      if (result?.success) {
        // 🚀 إرسال الحدث إلى جوجل تاج منجر مع بيانات ديناميكية
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "contact_form_success", // اسم الحدث المخصص
            form_location: "Contact Page",
            selected_service: formData.service, // الخدمة التي اختارها العميل فعلياً
            client_name: formData.name, // اسم العميل (اختياري)
          });
        }

        setStatus("success");
        setResponseMessage("تم إرسال طلبك بنجاح! سيتواصل معك فريقنا قريباً.");
        setFormData({ name: "", phone: "", service: "", details: "" });
      } else {
        setStatus("error");
        // 🚀 إخفاء الأخطاء التقنية عن العميل
        setResponseMessage(
          "عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل معنا عبر الواتساب.",
        );
      }
    } catch (error) {
      setStatus("error");
      setResponseMessage("تعذر الاتصال بالخادم. تأكد من اتصالك بالإنترنت.");
    }
  };

  return (
    <main
      className="min-h-screen bg-stone-50 dark:bg-slate-950 font-sans selection:bg-amber-500/30"
      dir="rtl"
    >
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 lg:pt-40 lg:pb-48 overflow-hidden bg-slate-900 rounded-b-3xl md:rounded-b-[4rem] shadow-2xl z-0">
        <div className="absolute top-0 right-0 w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-amber-500/10 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] bg-blue-500/10 rounded-full blur-[80px] md:blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs md:text-sm font-bold mb-4 md:mb-6">
              <Hammer className="w-3 h-3 md:w-4 md:h-4" /> نحن هنا لخدمتك
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">
              دعنا نبني{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                رؤيتك
              </span>{" "}
              معاً
            </h1>
            <p className="text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed px-2">
              فريقنا الهندسي مستعد لتحويل أفكارك إلى واقع بأعلى معايير الجودة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* المحتوى الرئيسي */}
      <section className="container mx-auto px-4 sm:px-6 relative z-10 -mt-16 md:-mt-24 lg:-mt-32 pb-12 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          {/* الجانب الأيمن: معلومات التواصل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10 shadow-xl border border-stone-200 dark:border-slate-800">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8">
                معلومات التواصل
              </h3>

              <div className="space-y-6 md:space-y-8">
                {/* 🚀 إصلاح الروابط لتصبح تفاعلية بالكامل */}
                <ContactInfoItem
                  icon={Phone}
                  title="اتصل بنا مباشرة"
                  details="966530989975+"
                  link="tel:+966530989975"
                />
                <ContactInfoItem
                  icon={Mail}
                  title="البريد الإلكتروني"
                  details="info@al-azizia.com"
                  link="mailto:info@al-azizia.com"
                />
                <ContactInfoItem
                  icon={MapPin}
                  title="موقعنا"
                  details="جدة، المملكة العربية السعودية"
                  link="https://maps.google.com/?q=جدة"
                  target="_blank"
                />
                <ContactInfoItem
                  icon={Clock}
                  title="ساعات العمل"
                  details="السبت - الخميس: 8 ص - 10 م"
                />
              </div>

              <div className="w-full h-px bg-stone-100 dark:bg-slate-800 my-6 md:my-8" />

              <div className="flex items-center gap-3 md:gap-4 bg-stone-50 dark:bg-slate-950 p-4 md:p-5 rounded-xl md:rounded-2xl border border-stone-100 dark:border-slate-800">
                <div className="p-2 md:p-3 bg-amber-500/10 rounded-lg md:rounded-xl text-amber-600 dark:text-amber-500">
                  <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                    ضمان الجودة
                  </h4>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    ضمان شامل على كافة أعمالنا لمدة تصل إلى 10 سنوات.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* الجانب الأيسر: نموذج التواصل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 shadow-xl border border-stone-200 dark:border-slate-800 h-full">
              <div className="mb-6 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">
                  اطلب عرض سعر مجاني
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                {/* ... (نفس حقول الفورم الخاصة بك كما هي تماماً لأنها ممتازة) ... */}
                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      الاسم الكريم
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="أدخل اسمك"
                      className="w-full px-4 py-3 md:px-5 md:py-4 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      رقم الجوال
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="05X XXX XXXX"
                      dir="ltr"
                      className="w-full px-4 py-3 md:px-5 md:py-4 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    الخدمة المطلوبة
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:px-5 md:py-4 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  >
                    <option value="">اختر نوع الخدمة...</option>
                    <option value="مظلات سيارات">مظلات سيارات</option>
                    <option value="برجولات">برجولات</option>
                    <option value="سواتر">سواتر</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    تفاصيل المشروع (اختياري)
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4}
                    placeholder="حدثنا عن الفكرة..."
                    className="w-full px-4 py-3 md:px-5 md:py-4 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm resize-none"
                  />
                </div>

                {status === "success" && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm font-bold">
                    {responseMessage}
                  </div>
                )}
                {status === "error" && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-bold">
                    {responseMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-3 md:py-4 bg-gradient-to-l from-amber-600 to-amber-500 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-600 transition-all text-sm md:text-base"
                >
                  {status === "loading" ? "جاري الإرسال..." : "إرسال الطلب"}
                  {!status && <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// 🚀 المكون الفرعي المصحح والمحمي من أخطاء الـ Render
function ContactInfoItem({
  icon: Icon,
  title,
  details,
  link,
  target,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  details: string;
  link?: string;
  target?: string;
}) {
  // وضعنا الكود في متغير JSX بدلاً من مكون داخلي
  const renderContent = (
    <>
      <div className="mt-1 p-2 md:p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg md:rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm md:text-base">
          {title}
        </h4>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs md:text-sm">
          {details}
        </p>
      </div>
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
        className="flex items-start gap-3 md:gap-4 group hover:opacity-80 transition-opacity"
      >
        {renderContent}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-3 md:gap-4 group">{renderContent}</div>
  );
}

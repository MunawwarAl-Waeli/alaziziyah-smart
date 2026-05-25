import { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة أسعار المظلات والسواتر في جدة | احسب التكلفة فوراً - العزيزية",
  description:
    "كم تكلفة مظلة سيارتك أو حوشك؟ استخدم حاسبة مؤسسة العزيزية للمظلات والسواتر بجدة لمعرفة الأسعار التقريبية فوراً لتركيب المظلات (لكسان، قماش، حديد). نغطي جميع أحياء جدة.",
  keywords: [
    "اسعار المظلات في جدة",
    "كم تكلفة مظلة سيارة",
    "اسعار تفصيل السواتر بجدة",
    "حاسبة اسعار المظلات",
    "مؤسسة العزيزية للمظلات والسواتر",
    "تركيب مظلات سيارات جدة",
    "اسعار مظلات وسواتر جدة",
    "مظلات لكسان بجدة",
    "حداد مظلات رخيص بجدة",
    "تكلفة برجولة خشبية",
  ],
  authors: [{ name: "مؤسسة العزيزية للمظلات والسواتر" }],
  openGraph: {
    title: "تعرف على أسعار المظلات والسواتر في جدة بـ 3 خطوات",
    description:
      "لا تنتظر التسعيرة! حدد نوع المظلة ومساحتها واعرف التكلفة التقديرية فوراً مع مؤسسة العزيزية بجدة.",
    url: "https://al-azizia.com/calculator", // استبدله برابط موقعك الفعلي
    siteName: "العزيزية للمظلات والسواتر",
    locale: "ar_SA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://al-azizia.com/calculator", // استبدله برابط موقعك الفعلي
  },
};

export default function CalculatorPage() {
  return (
    // نستخدم className بسيط لضمان التوافق مع الهيدر والفوتر الموجودين في layout.tsx
    // py-12 أو py-16 تعطي مساحة تنفس جيدة أعلى وأسفل الحاسبة دون تشويه تخطيط الموقع
    <div className="w-full py-12 md:py-16">
      <CalculatorClient />
    </div>
  );
}

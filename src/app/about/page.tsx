import { Metadata } from "next";
import dynamic from "next/dynamic"; // هذا هو السطر الذي يحل المشكلة!

// الاستدعاء الديناميكي يحل المشكلة من جذورها ويتوافق مع التوثيق
const AboutClient = dynamic(
  () => import("./about-client"),
);

export const metadata: Metadata = {
  title: "عن الشركة - العزيزية للمظلات والسواتر",
  description:
    "تعرف على شركة العزيزية الرائدة في مجال تركيب المظلات والسواتر والبرجولات في المملكة العربية السعودية. خبرة 15+ سنة وآلاف المشاريع المنفذة.",
  keywords:
    "عن العزيزية, شركة مظلات, تاريخ الشركة, رؤية ورسالة, فريق العمل, إنجازات",
  openGraph: {
    title: "عن شركة العزيزية للمظلات والسواتر",
    description: "نحو 15 عاماً من التميز والابتكار في عالم المظلات والسواتر",
    images: ["/images/0.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

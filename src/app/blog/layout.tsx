import { Metadata } from "next";
import "../globals.css";
export const metadata: Metadata = {
  title: {
    default: "مدونة العزيزية للمظلات والسواتر",
    template: "%s | مدونة العزيزية",
  },
  description:
    "مدونة متخصصة في عالم المظلات والسواتر - نصائح احترافية - أحدث التصاميم - أسعار وصيانة المظلات",
  keywords: [
    "مظلات",
    "سواتر",
    "برجولات",
    "مظلات سيارات",
    "تركيب مظلات",
    "مظلات مدارس",
  ],
  openGraph: {
    title: "مدونة العزيزية للمظلات والسواتر",
    description: "دليلك الشامل لاختيار وتصميم وصيانة المظلات والسواتر",
    type: "website",
    locale: "ar_SA",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen pt-20">{children}</div>;
}

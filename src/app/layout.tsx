import type { Metadata } from "next";
import { Tajawal } from "next/font/google"; // استيراد الخط
import "./globals.css";

// إعداد الخط بجميع الأوزان المطلوبة
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "400", "500", "700", "800"],
  variable: "--font-tajawal", // متغير CSS
});

export const metadata: Metadata = {
  title: "اسم  | للمظلات والسواتر",
  description: "أفضل حلول التظليل في جدة والمملكة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl"> {/* تفعيل الاتجاه من اليمين لليسار */}
      <body className={tajawal.className}>
        {children}
      </body>
    </html>
  );
}
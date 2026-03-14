import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google"; // 1. استيراد الخط
import "./globals.css";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/provider";
import { Footer } from "@/components/layout/footer";
import { FloatingChat } from "@/components/FloatingChat";
import { GoogleAnalytics } from "@next/third-parties/google";

import { getGlobalData } from "@/lib/api"; // الدالة التي كتبناها مسبقاً
import { JsonLd } from "@/components/seo/JsonLd";
// 2. تعريف الخط وإعداده
// const ibmPlex = IBM_Plex_Sans_Arabic({
//   subsets: ["arabic"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   variable: "--font-ibm", // اسم المتغير
//   display: "swap",
// });
export const metadata: Metadata = {
  title: "العزيزية للحلول الذكية",
  description: "المصنع السعودي الرائد للمظلات والأنظمة الذكية",
  manifest: "/manifest.json",
};
import type { Viewport } from "next"; // تأكد من استيراد Viewport

// ✅ أضف هذا البلوك الجديد تحته مباشرة
export const viewport: Viewport = {
  themeColor: "#f59e0b",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getGlobalData();
  // 1. استخراج المصفوفة بأمان (استخدام علامة ؟ يمنع الانهيار)
  const allMenuItems = data?.menu?.menuItems?.nodes || [];
  // 2. تصفية القائمة لاختيار العناصر الرئيسية فقط (التي لا تملك أب)
  const topLevelMenuItems = allMenuItems.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => !item.parentId, // أو item.parentId === null
  );
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      {/* 3. استخدام الخط هنا أصبح صحيحاً الآن */}
      <body
      // className={`${ibmPlex.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // الافتراضي ليلي
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          <Header wpMenuData={topLevelMenuItems} />

          <div className="relative flex flex-col min-h-screen">{children}</div>
          <Footer />
        </ThemeProvider>
        <FloatingChat />
      </body>
      {/* كود التتبع الخاص بموقعك */}
      <GoogleAnalytics gaId="G-RVTGES597T" />
    </html>
  );
}

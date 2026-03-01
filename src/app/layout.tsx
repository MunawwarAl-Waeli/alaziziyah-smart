import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google"; // 1. استيراد الخط
import "./globals.css";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/provider";
import { Footer } from "@/components/layout/footer";
import { getGlobalData } from "@/lib/api"; // الدالة التي كتبناها مسبقاً
// 2. تعريف الخط وإعداده
const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm", // اسم المتغير
  display: "swap",
});
export const metadata: Metadata = {
  title: "العزيزية للحلول الذكية",
  description: "المصنع السعودي الرائد للمظلات والأنظمة الذكية",
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
    (item: any) => !item.parentId // أو item.parentId === null
  );
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      {/* 3. استخدام الخط هنا أصبح صحيحاً الآن */}
      <body
        className={`${ibmPlex.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // الافتراضي ليلي
          enableSystem
          disableTransitionOnChange
        >
          <Header wpMenuData={topLevelMenuItems} />

          <div className="relative flex flex-col min-h-screen">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/provider";
import { Footer } from "@/components/layout/footer";
import { FloatingChat } from "@/components/FloatingChat";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  getAllProjects,
  getGlobalData,
  getLatestProjects,
  getWPData,
} from "@/lib/api";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Cairo } from "next/font/google";
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "العزيزية للمظلات والسواتر",
  description: "المصنع السعودي الرائد للمظلات والأنظمة الذكية",
  manifest: "/manifest.json",
  verification: {
    google: "bNOlDODG6YCLIKLCc8Ho2UBEmoI_z49zJUbs5rDM44c",
  },
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg", // مهم جداً لأجهزة آيفون
  },
};

export const viewport: Viewport = {
  themeColor: "#f59e0b",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getGlobalData();
  const allMenuItems = data?.menu?.menuItems?.nodes || [];
  const topLevelMenuItems = allMenuItems.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => !item.parentId,
  );
  const wpData = await getWPData(); // جلب الخدمات
  const globalData = await getGlobalData(); // جلب المنيو
  const latestProjects = await getAllProjects(); // يجلب أحدث المشاريع

  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.className}
      suppressHydrationWarning
    >
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-RVTGES597T`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RVTGES597T');
          `}
        </Script>
      </head>
      {/* ✅ تم تفعيل الخط هنا */}
      <body className={"font-sans antialiased bg-background text-foreground"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />

          <Header
            wpMenuData={globalData.menu.menuItems.nodes}
            fetchedServices={wpData.services}
            fetchedProjects={latestProjects} // تمرير المشاريع هنا
          />

          {/* ✅ الحاوية الرئيسية: دفعت الفوتر للأسفل وجعلت المحتوى يأخذ المساحة المتبقية */}
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <FloatingChat />
      </body>
      <GoogleAnalytics gaId="G-RVTGES597T" />
      <Analytics />
    </html>
  );
}

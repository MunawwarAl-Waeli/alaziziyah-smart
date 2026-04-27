import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/provider";
import { Footer } from "@/components/layout/footer";
import { FloatingChat } from "@/components/FloatingChat";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getAllProjects, getGlobalData, getWPData } from "@/lib/api";
import { JsonLd } from "@/components/seo/JsonLd";

import { Cairo } from "next/font/google";
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "العزيزية للمظلات والسواتر",
  description:
    "مؤسسة العزيزية: الخيار الأول لتركيب مظلات السيارات، السواتر، والبرجولات بالسعودية. نوفر مظلات حدائق، مسابح، لكسان وساندوتش بانل بأفضل الخامات وضمان معتمد.",
  manifest: "/manifest.json",
  verification: {
    google: "bNOlDODG6YCLIKLCc8Ho2UBEmoI_z49zJUbs5rDM44c",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png", // مهم جداً لأجهزة آيفون
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
  // بدلاً من السطور الأربعة الحالية، استخدم هذا:
  const [globalData, wpData, latestProjects] = await Promise.all([
    getGlobalData(),
    getWPData(),
    getAllProjects(),
  ]);

  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.className}
      suppressHydrationWarning
    >
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
    </html>
  );
}

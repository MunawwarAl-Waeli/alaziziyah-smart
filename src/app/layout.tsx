import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme/provider";
import { Footer } from "@/components/layout/footer";
import dynamic from 'next/dynamic';

import { GoogleTagManager } from "@next/third-parties/google";
import { getAllProjects, getGlobalData, getWPData } from "@/lib/api";
import { JsonLd } from "@/components/seo/JsonLd";

import { Cairo } from "next/font/google";

// ✅ 1. استدعاء طبيعي للـ Header لضمان ظهوره فوراً بدون تقطيع
import { Header } from "@/components/layout/header"; 

// ✅ 2. إبقاء الشات ديناميكي لعدم إبطاء الصفحة
const FloatingChat = dynamic(() => import('@/components/FloatingChat').then(mod => mod.FloatingChat));

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://al-azizia.com"),
  title: "العزيزية للمظلات والسواتر",
  description:
    "مؤسسة العزيزية: الخيار الأول لتركيب مظلات السيارات، السواتر، والبرجولات بالسعودية. نوفر مظلات حدائق، مسابح، لكسان وساندوتش بانل بأفضل الخامات وضمان معتمد.",
  manifest: "/manifest.json",
  verification: {
    google: "bNOlDODG6YCLIKLCc8Ho2UBEmoI_z49zJUbs5rDM44c",
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
  
  const [globalData, wpData, latestProjects] = await Promise.all([
    getGlobalData(),
    getWPData(),
    getAllProjects(),
  ]);

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
    >
      {/* ✅ 4. دمجنا خط Cairo مع كلاسات Tailwind في الـ body لضمان عمله 100% */}
      <body className={`${cairo.className} antialiased bg-background text-foreground`}>
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
            fetchedProjects={latestProjects} 
          />

          <div className="flex flex-col min-h-screen">
            <main className="flex-1 relative isolation-auto" style={{
              WebkitTransform:'translate3d(0,0,0)',
              WebkitBackfaceVisibility:'hidden'
            }}>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <FloatingChat />
      </body>
      <GoogleTagManager gtmId="GTM-N62SKLV6" />
    </html>
  );
}

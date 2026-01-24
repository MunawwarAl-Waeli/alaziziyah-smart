import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. استيراد الخط
import "./globals.css";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/provider";
import { GridBackground } from "@/components/ui/GridBackground";
import { Footer } from "@/components/layout/footer";

// 2. تعريف الخط وإعداده
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "العزيزية للحلول الذكية",
  description: "المصنع السعودي الرائد للمظلات والأنظمة الذكية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      {/* 3. استخدام الخط هنا أصبح صحيحاً الآن */}
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // الافتراضي ليلي
          enableSystem
          disableTransitionOnChange
        >
          <GridBackground />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

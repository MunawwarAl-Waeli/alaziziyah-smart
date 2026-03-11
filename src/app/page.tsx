/* eslint-disable react/jsx-no-undef */
import { BlogSection } from "@/components/features/home/BlogSection";
import { CTASection } from "@/components/features/home/cta-section";
import {  MainHero } from "@/components/features/home/hero";

import { SmartCalculator } from "@/components/features/home/SmartCalculator";
import { VideoGallery } from "@/components/features/home/video-section";
import { KeywordsMarquee } from "@/components/layout/KeywordsMarquee";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";



import { Metadata } from "next";

// 1. تحديث الواجهة (Interface) لتعريف الحقل الجديد
interface HomePageData {
  generalSettings: {
    title: string;
    description: string;
  };
  nodeByUri: {
    title: string;
    content: string;
    // إضافة الحقول المخصصة هنا
    homeCustomFields?: {
      heroMotivationText?: string;
    };
  } | null;
}

function cleanContent(html: string | null | undefined): string {
  if (!html) return "";
  let text = html.replace(/<[^>]*>?/gm, "");
  text = text.replace(/\s+/g, " ").trim();
  if (text.length > 250) {
    text = text.substr(0, 250);
    text =
      text.substr(0, Math.min(text.length, text.lastIndexOf(" "))) + " ...";
  }
  return text;
}

// 2. تحديث دالة جلب البيانات لإضافة الحقل للاستعلام
async function getData(): Promise<HomePageData> {
  const query = `
    query GetHomePageContent {
      generalSettings {
        title
        description
      }
      nodeByUri(uri: "/") {
        ... on Page {
          title
          content(format: RENDERED)
          
          # استدعاء مجموعة حقول ACF التي أنشأناها
          homeCustomFields {
            heroMotivationText
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        next: { revalidate: 10 }, // يمكنك جعلها 10 ثواني للتجربة الآن ثم رفعها لاحقاً
      },
    );

    const json = await res.json();

    // سطر لمساعدتك على رؤية البيانات القادمة في التيرمنال
    console.log("ACF Data:", json?.data?.nodeByUri?.homeCustomFields);

    return (
      json?.data || {
        generalSettings: { title: "العزيزية", description: "" },
        nodeByUri: null,
      }
    );
  } catch (e) {
    console.error("Error fetching data:", e);
    return {
      generalSettings: { title: "العزيزية", description: "" },
      nodeByUri: null,
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  const seoDescription =
    "شركة العزيزية للمظلات والسواتر: متخصصون في تركيب مظلات سيارات، سواتر حديد، برجولات حدائق، هناجر ومستودعات، وأعمال الشد الإنشائي في جدة والمملكة.";

  return {
    title: data?.generalSettings?.title || "العزيزية للمظلات والسواتر",
    description: seoDescription,
  };
}

export default async function Home() {
  const data = await getData();

  let heroDescription = cleanContent(data?.nodeByUri?.content);
  if (heroDescription.length < 10) {
    heroDescription =
      "نحول المساحات الخارجية إلى مناطق حيوية مستدامة بتقنيات هندسية متطورة وتصاميم عصرية تناسب ذوقك الرفيع.";
  }

  // سحب النص الذي كتبناه في الووردبريس (ACF)
  const acfHeroText = data?.nodeByUri?.homeCustomFields?.heroMotivationText;

  return (
    <main className="min-h-screen bg-background font-sans" dir="rtl">
  
      <MainHero
         title={data?.generalSettings?.title || "العزيزية للمظلات"}
        description={acfHeroText || heroDescription}/>

      <KeywordsMarquee />
      <ServicesSection />
      <ProjectsSection />
      <VideoGallery />
      <BlogSection/>
      <SmartCalculator />
      <CTASection />
    </main>
  );
}

// {
//   "data": {
//     "pages": {
//       "nodes": [
//         {
//           "slug": "sitemap",
//           "uri": "/sitemap/"
//         },
//         {
//           "slug": "سياسة-الخصوصية",
//           "uri": "/سياسة-الخصوصية/"
//         },
//         {
//           "slug": "شروط-استخدام-الموقع-2",
//           "uri": "/شروط-استخدام-الموقع-2/"
//         },
//         {
//           "slug": "مظلات-منازل",
//           "uri": "/مظلات-منازل/"
//         },
//         {
//           "slug": "سواتر-شرائح-حديد",
//           "uri": "/سواتر-شرائح-حديد/"
//         },
//         {
//           "slug": "سواتر-لكسان",
//           "uri": "/سواتر-لكسان/"
//         },
//         {
//           "slug": "مظلات-محلات",
//           "uri": "/مظلات-محلات/"
//         },
//         {
//           "slug": "مظلات-قرميد",
//           "uri": "/مظلات-قرميد/"
//         },
//         {
//           "slug": "مظلات-مسابح",
//           "uri": "/مظلات-مسابح/"
//         },
//         {
//           "slug": "مظلات-مدارس",
//           "uri": "/مظلات-مدارس/"
//         },
//         {
//           "slug": "سواتر-خشبية",
//           "uri": "/سواتر-خشبية/"
//         },
//         {
//           "slug": "مظلات-الشد-الانشائي",
//           "uri": "/مظلات-الشد-الانشائي/"
//         },
//         {
//           "slug": "برجولات-حدائق",
//           "uri": "/برجولات-حدائق/"
//         },
//         {
//           "slug": "مظلات-بي-في-سي",
//           "uri": "/مظلات-بي-في-سي/"
//         },
//         {
//           "slug": "مظلات-قماش",
//           "uri": "/مظلات-قماش/"
//         },
//         {
//           "slug": "مظلات-سيارات-حديد",
//           "uri": "/مظلات-سيارات-حديد/"
//         },
//         {
//           "slug": "مظلات-برجولات",
//           "uri": "/مظلات-برجولات/"
//         },
//         {
//           "slug": "مظلات-خارجية-للمنازل",
//           "uri": "/مظلات-خارجية-للمنازل/"
//         },
//         {
//           "slug": "مظلات-حدائق-منزلية",
//           "uri": "/مظلات-حدائق-منزلية/"
//         },
//         {
//           "slug": "قماش-مظلات",
//           "uri": "/قماش-مظلات/"
//         },
//         {
//           "slug": "مظلات-لكسان",
//           "uri": "/مظلات-لكسان/"
//         },
//         {
//           "slug": "سواتر-حديد",
//           "uri": "/سواتر-حديد/"
//         },
//         {
//           "slug": "برجولات-حديد",
//           "uri": "/برجولات-حديد/"
//         },
//         {
//           "slug": "مظلات-حديد",
//           "uri": "/مظلات-حديد/"
//         },
//         {
//           "slug": "مظلات-خشبية",
//           "uri": "/مظلات-خشبية/"
//         },
//         {
//           "slug": "مظلات-جلسات",
//           "uri": "/مظلات-جلسات/"
//         },
//         {
//           "slug": "سواتر-قماش",
//           "uri": "/سواتر-قماش/"
//         },
//         {
//           "slug": "مظلات-سيارات-متحركة",
//           "uri": "/مظلات-سيارات-متحركة/"
//         },
//         {
//           "slug": "مظلات-متحركة",
//           "uri": "/مظلات-متحركة/"
//         },
//         {
//           "slug": "مظلات-حدائق",
//           "uri": "/مظلات-حدائق/"
//         },
//         {
//           "slug": "مظلات-سيارات",
//           "uri": "/مظلات-سيارات/"
//         },
//         {
//           "slug": "تركيب-مظلات-جدة",
//           "uri": "/تركيب-مظلات-جدة/"
//         },
//         {
//           "slug": "تركيب-مظلات-الأحساء",
//           "uri": "/تركيب-مظلات-الأحساء/"
//         },
//         {
//           "slug": "تركيب-سواتر-حديد",
//           "uri": "/تركيب-سواتر-حديد/"
//         },
//         {
//           "slug": "تركيب-سندوش-بنل",
//           "uri": "/تركيب-سندوش-بنل/"
//         },
//         {
//           "slug": "تركيب-مظلات-خارجية",
//           "uri": "/تركيب-مظلات-خارجية/"
//         },
//         {
//           "slug": "تركيب-مظلات-متحركة",
//           "uri": "/تركيب-مظلات-متحركة/"
//         },
//         {
//           "slug": "تركيب-سواتر-ابواب",
//           "uri": "/تركيب-سواتر-ابواب/"
//         },
//         {
//           "slug": "تركيب-جلسات-خارجية",
//           "uri": "/تركيب-جلسات-خارجية/"
//         },
//         {
//           "slug": "تركيب-قماش-مظلات-2",
//           "uri": "/تركيب-قماش-مظلات-2/"
//         },
//         {
//           "slug": "تركيب-مظلات-حدائق",
//           "uri": "/تركيب-مظلات-حدائق/"
//         },
//         {
//           "slug": "تفصيل-مظلة-للسيارة",
//           "uri": "/تفصيل-مظلة-للسيارة/"
//         },
//         {
//           "slug": "تركيب-مظلات-مدارس",
//           "uri": "/تركيب-مظلات-مدارس/"
//         },
//         {
//           "slug": "تركيب-قماش-مظلات",
//           "uri": "/تركيب-قماش-مظلات/"
//         },
//         {
//           "slug": "تركيب-برجولات",
//           "uri": "/تركيب-برجولات/"
//         },
//         {
//           "slug": "تركيب-لكسان",
//           "uri": "/تركيب-لكسان/"
//         },
//         {
//           "slug": "تركيب-مظلات-سيارات",
//           "uri": "/تركيب-مظلات-سيارات/"
//         },
//         {
//           "slug": "تركيب-مظلات-وسواتر",
//           "uri": "/تركيب-مظلات-وسواتر/"
//         },
//         {
//           "slug": "تركيب-سواتر",
//           "uri": "/تركيب-سواتر/"
//         },
//         {
//           "slug": "تركيب-مظلات",
//           "uri": "/تركيب-مظلات/"
//         },
//         {
//           "slug": "تركيب-مظلات-الدمام",
//           "uri": "/تركيب-مظلات-الدمام/"
//         },
//         {
//           "slug": "شركة-عمل-سواتر-ومظلات",
//           "uri": "/شركة-عمل-سواتر-ومظلات/"
//         },
//         {
//           "slug": "شركة-تركيب-السواتر-والمظلات",
//           "uri": "/شركة-تركيب-السواتر-والمظلات/"
//         },
//         {
//           "slug": "العزيزية-للمظلات-والسواتر",
//           "uri": "/"
//         }
//       ]
//     }
//   },
//   "extensions": {
//     "debug": [
//       {
//         "type": "DEBUG_LOGS_INACTIVE",
//         "message": "GraphQL Debug logging is not active. To see debug logs, GRAPHQL_DEBUG must be enabled."
//       }
//     ]
//   }
// }

/* eslint-disable react/jsx-no-undef */

import { MainHero } from "@/components/features/home/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { KeywordsMarquee } from "@/components/layout/KeywordsMarquee";
import { HomeSections } from "@/components/HomeSections";
// 1. أزلنا استيراد framer-motion واستوردنا الغلاف الجديد
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Metadata } from "next";
import { SoftWavesDivider } from "@/components/ui/SoftWavesDivider";
import { ElegantCurveDivider } from "@/components/ui/ElegantCurveDivider";

interface HomePageData {
  generalSettings: {
    title: string;
    description: string;
  };
  nodeByUri: {
    title: string;
    content: string;
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
        next: { revalidate: 10 },
      },
    );

    const json = await res.json();
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

  const acfHeroText = data?.nodeByUri?.homeCustomFields?.heroMotivationText;

  return (
    <main className="min-h-screen bg-background font-sans" dir="rtl">
     
      <MainHero
        title={data?.generalSettings?.title || "العزيزية للمظلات"}
        description={acfHeroText || heroDescription}
      />
      <section
        id="services"
        className="relative bg-slate-50 dark:bg-slate-900/50 pt-20 pb-16"
      >
        {/* 1. الفاصل المموج (يجب أن يكون خارج الغلاف ليبقى ثابتاً في الأعلى) */}
        <SoftWavesDivider />

        {/* 2. محتوى القسم مع غلاف الحركة الخاص بك */}
        <div className="relative z-10">
          <SectionWrapper delay={0}>
            <KeywordsMarquee />
            <ServicesSection />
          </SectionWrapper>
        </div>
      </section>
      {/* قسم المشاريع */}
      <section id="projects" className="relative bg-background pt-20 pb-16">
        {/* 1. فاصل المنحنى الأنيق */}
        <div className="[&>svg>path]:fill-slate-50 dark:[&>svg>path]:fill-slate-900/50">
          <ElegantCurveDivider />
        </div>

        {/* 2. محتوى القسم مع غلاف الحركة الخاص بك */}
        <div className="relative z-10">
          <SectionWrapper delay={0.2}>
            <ProjectsSection />
          </SectionWrapper>
        </div>
      </section>
      <HomeSections />
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

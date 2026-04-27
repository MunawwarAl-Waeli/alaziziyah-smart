/* eslint-disable react/jsx-no-undef */
import { MainHero } from "@/components/features/home/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { KeywordsMarquee } from "@/components/layout/KeywordsMarquee";
import { HomeSections } from "@/components/HomeSections";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Metadata } from "next";
import { SoftWavesDivider } from "@/components/ui/SoftWavesDivider";
import { ElegantCurveDivider } from "@/components/ui/ElegantCurveDivider";

// استيراد الإعدادات الموحدة التي أنشأناها سابقاً
import { siteConfig } from "@/lib/seo-config";

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
        next: { revalidate: 3600 }, // 🚀 السرعة تكمن هنا
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
  const title = data?.generalSettings?.title || siteConfig.name;
  const description =
    "شركة العزيزية للمظلات والسواتر: متخصصون في تركيب مظلات سيارات، سواتر حديد، برجولات حدائق، هناجر ومستودعات، وأعمال الشد الإنشائي في جدة والمملكة.";

  // الرابط المباشر للصورة التي تريدها أن تظهر في جوجل (يفضل أن تكون صورة واجهة مميزة)
  const ogImage = "https://al-azizia.com/main-project-image.jpg";

  return {
    title: `${title} | الخيار الأول للمظلات والسواتر`,
    description: description,
    alternates: {
      canonical: "https://al-azizia.com", // ضروري جداً لمنع تكرار المحتوى
    },
    openGraph: {
      title: title,
      description: description,
      url: "https://al-azizia.com",
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage, // هذه الصورة هي التي يحاول جوجل سحبها لجانب النتيجة
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "ar_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
    },
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
      {/* ملاحظة: كود الـ JSON-LD الخاص بالتقييمات (5 نجوم) 
          يتم حقنه تلقائياً هنا لأنه موجود في layout.js الرئيسي */}

      <MainHero
        title={data?.generalSettings?.title || "العزيزية للمظلات"}
        description={acfHeroText || heroDescription}
      />

      <section
        id="services"
        className="relative bg-slate-50 dark:bg-slate-900/50 pt-20 pb-2"
      >
      
        <div className="relative z-10">
          <SectionWrapper delay={0}>
            <KeywordsMarquee />
            <ServicesSection />
          </SectionWrapper>
        </div>
      </section>

      <section id="projects" className="relative bg-background pt-20 pb-16">
        <div className="[&>svg>path]:fill-slate-50 dark:[&>svg>path]:fill-slate-900/50">
          <ElegantCurveDivider />
        </div>
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

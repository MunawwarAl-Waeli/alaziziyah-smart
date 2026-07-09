/* eslint-disable react/jsx-no-undef */
import { MainHero } from "@/components/features/home/hero";

import { KeywordsMarquee } from "@/components/layout/KeywordsMarquee";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Metadata } from "next";

// استيراد الإعدادات الموحدة التي أنشأناها سابقاً
import { siteConfig } from "@/lib/seo-config";
import { fetchAllBlogPosts } from "./blog/data/posts";
import dynamic from "next/dynamic";

const ServicesSection = dynamic(
  () => import("@/components/sections/services-section"),
  {
    ssr: true,
    loading: () => <div className="h-96 animate-pulse bg-slate-50" />, // هيكل مؤقت لتحسين الـ FCP
  },
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/projects-section"),
  { ssr: true },
);
const HomeSections = dynamic(() => import("@/components/HomeSections"), {
  ssr: true,
});

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
    text = text.substring(0, 250);
    text =
      text.substring(0, Math.min(text.length, text.lastIndexOf(" "))) + " ...";
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
  const ogImage = "https://support.al-azizia.com/main-project-image.jpg";

  return {
    title: `${title} | الخيار الأول للمظلات والسواتر`,
    description: description,
    alternates: {
      canonical: "/", // ضروري جداً لمنع تكرار المحتوى
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

// 💡 1. دالة جلب الفيديوهات الآمنة في السيرفر
async function getYouTubeVideos() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY; // لا تنسَ إزالة NEXT_PUBLIC من ملف .env
    const PLAYLIST_ID = "UUWYMhK-jwAHKgO94NtorJ9w";

    if (!API_KEY) throw new Error("مفتاح يوتيوب مفقود");

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=20`,
      { next: { revalidate: 3600 } },
    );
    const playlistData = await playlistRes.json();

    if (playlistData.error) throw new Error(playlistData.error.message);
    if (!playlistData.items?.length) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videoIds = playlistData.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(",");

    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet`,
      { next: { revalidate: 3600 } },
    );
    const detailsData = await detailsRes.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return detailsData.items.map((video: any) => {
      const duration = video.contentDetails.duration
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":")
        .map((p: string) => p.padStart(2, "0"))
        .join(":")
        .replace(/^00:/, "");

      return {
        id: video.id,
        title: video.snippet.title,
        duration: duration,
        thumbnail:
          video.snippet.thumbnails?.maxres?.url ||
          video.snippet.thumbnails?.high?.url ||
          video.snippet.thumbnails?.default?.url,
        videoId: video.id,
        type: "youtube",
      };
    });
  } catch (error) {
    console.error("YouTube Fetch Error:", error);
    return null;
  }
}

// 💡 2. تحديث الدالة الرئيسية لتمرير البيانات
export default async function Home() {
  // نضيف جلب الفيديوهات إلى Promise.all لكي يتم تحميل كل شيء في نفس الوقت وبسرعة فائقة
  const [data, allPosts, videos] = await Promise.all([
    getData(),
    fetchAllBlogPosts(),
    getYouTubeVideos(), // جلب الفيديوهات
  ]);

  const videoError = videos === null ? "حدث خطأ أثناء الاتصال " : null;

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
        className="relative bg-slate-50 dark:bg-slate-900/50 pt-2 pb-2"
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
       
        </div>
        <div className="relative z-10">
          <SectionWrapper delay={0.2}>
            <ProjectsSection />
          </SectionWrapper>
        </div>
      </section>

      {/* ✅ 3. تمرير البيانات هنا */}
      <HomeSections
        allPosts={allPosts}
        initialVideos={videos || []}
        videoError={videoError}
      />
    </main>
  );
}

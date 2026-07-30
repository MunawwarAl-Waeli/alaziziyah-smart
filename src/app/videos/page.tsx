import { Metadata } from "next";
import Image from "next/image";
import { Play, Clock, Video } from "lucide-react";

// 1. إعدادات الـ SEO (تحسين محركات البحث)
export const metadata: Metadata = {
  title: "معرض المرئيات والفيديوهات | مؤسسة العزيزية",
  description:
    "تصفح معرض الفيديوهات والأعمال الخاصة بمؤسسة العزيزية للمظلات والسواتر والبرجولات. شاهد دقة التصنيع واحترافية التركيب بالصوت والصورة.",
  keywords: [
    "مظلات وسواتر",
    "فيديوهات مظلات وسواتر",
    "تركيب برجولات",
    "معرض المرئيات العزيزية",
  ],
  openGraph: {
    title: "معرض المرئيات والفيديوهات | مؤسسة العزيزية",
    description: "شاهد أحدث أعمال ومشاريع مؤسسة العزيزية بالصوت والصورة.",
    type: "website",
    locale: "ar_SA",
  },
};

// 💡 1. دالة جلب الفيديوهات الآمنة في السيرفر
async function getYouTubeVideos() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
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

    if (!detailsData.items) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return detailsData.items.map((video: any) => {
      const duration = video.contentDetails.duration
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((p: any) => p.padStart(2, "0"))
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

export default async function VideosPage() {
  const videos = await getYouTubeVideos();

  return (
    <main
      className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 md:py-24"
      dir="rtl"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* رأس الصفحة وتحسين الـ SEO (Heading H1) */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold mb-4 border border-primary/20">
            <Video className="w-4 h-4" />
            معرض المرئيات
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
            شاهد أعمالنا ومشاريعنا{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
              بالصوت والصورة
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
            نستعرض معكم من خلال هذه الفيديوهات دقة التصنيع، جودة المواد
            المستخدمة، واحترافية فريق التركيب في مشاريع المظلات، السواتر،
            والبرجولات.
          </p>
        </div>

        {/* شبكة الفيديوهات: عمود واحد للجوال، 3 أعمدة للشاشات الكبيرة */}
        {!videos || videos.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-lg">
            لا توجد فيديوهات متاحة حالياً. يرجى التأكد من مفتاح يوتيوب أو
            المحاولة لاحقاً.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {videos.map((video: any, index: number) => (
              <a
                key={video.id || index}
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-3xl overflow-hidden border shadow-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-[400px] flex flex-col justify-end transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* صورة الغلاف */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* تدرج لوني لتحسين وضوح النص */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* رقم الترتيب */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-primary font-black text-sm border border-white/10">
                  0{index + 1}
                </div>

                {/* محتوى البطاقة */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      فيديو
                    </span>
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      {video.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-white text-lg md:text-xl font-bold leading-snug line-clamp-2">
                      {video.title}
                    </h2>
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

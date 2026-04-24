import { NextResponse } from "next/server";

// export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_HANDLE = "@al-azizia"; // المعرف الظاهر في رابط القناة

    // 1. التحقق من وجود API Key
    if (!YOUTUBE_API_KEY) {
      return NextResponse.json(
        { success: false, error: "YouTube API key is missing" },
        { status: 500 },
      );
    }

    // 2. الحصول على Channel ID من الـ handle
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&forHandle=${CHANNEL_HANDLE}&part=id`,
    );
    const channelData = await channelRes.json();

    if (!channelData.items?.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Channel not found. Check handle or API key.",
        },
        { status: 404 },
      );
    }

    const channelId = channelData.items[0].id;

    // 3. جلب أحدث الفيديوهات
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20&type=video`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.items?.length) {
      return NextResponse.json(
        { success: false, error: "No videos found on this channel" },
        { status: 404 },
      );
    }

    const videoIds = searchData.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => item.id.videoId)
      .join(",");

    // 4. جلب تفاصيل المدة
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,snippet`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    // 5. تنسيق البيانات
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videos = detailsData.items.map((video: any) => {
      const duration = video.contentDetails.duration;
      const formattedDuration = duration
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
        duration: formattedDuration,
        thumbnail:
          video.snippet.thumbnails.maxres?.url ||
          video.snippet.thumbnails.high?.url ||
          video.snippet.thumbnails.default?.url,
        videoId: video.id,
        type: "youtube",
      };
    });

    return NextResponse.json({ success: true, videos });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("YouTube API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

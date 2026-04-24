import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    
    // وضعنا الآي دي الخاص بقناتك هنا مباشرة
    const CHANNEL_ID = "UCWYMhK-jwAHKgO94NtorJ9w"; 

    // 1. التحقق من وجود مفتاح الـ API
    if (!YOUTUBE_API_KEY) {
      return NextResponse.json(
        { success: false, error: "YouTube API key is missing" },
        { status: 500 },
      );
    }

    // 2. جلب أحدث الفيديوهات مباشرة باستخدام الـ Channel ID (أسرع وأضمن)
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video`;
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

    // 3. جلب تفاصيل المدة
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,snippet`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    // 4. تنسيق البيانات
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
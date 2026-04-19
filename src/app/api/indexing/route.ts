import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    // 1. استلام الرابط الجديد من الطلب
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "الرابط مطلوب" }, { status: 400 });
    }

    // 2. إعداد الاتصال الآمن مع جوجل
    const jwtClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL, null,process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // إصلاح الفواصل["https://www.googleapis.com/auth/indexing"], null,
    );

    // 3. تأكيد الاتصال
    await jwtClient.authorize();

    // 4. إرسال أمر الفهرسة لجوجل (URL_UPDATED تعني رابط جديد أو تم تعديله)
    const indexing = google.indexing({ version: "v3", auth: jwtClient });
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_UPDATED",
      },
    });

    return NextResponse.json({
      success: true,
      message: "تم إرسال الرابط لجوجل بنجاح صاروخي!",
      data: response.data,
    });
  } catch (error) {
    console.error("Indexing Error:", error);
    return NextResponse.json({ error: "فشل إرسال الرابط" }, { status: 500 });
  }
}

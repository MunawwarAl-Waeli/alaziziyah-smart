import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    // 1. استلام الرابط الجديد من الطلب (بشكل آمن برمجياً)
    const body = await request.json();
    const url = body.url as string; // إخبار تايب سكريبت أن هذا المتغير نصي

    if (!url) {
      return NextResponse.json({ error: "الرابط مطلوب" }, { status: 400 });
    }

    // 2. التحقق الصارم من المتغيرات البيئية (لإرضاء تايب سكريبت)
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      console.error("Missing Google API Credentials");
      return NextResponse.json(
        { error: "إعدادات الربط مع جوجل مفقودة في السيرفر" },
        { status: 500 },
      );
    }

    // 3. إعداد الاتصال الآمن مع جوجل
    // لاحظ استخدام undefined بدلاً من null
    const jwtClient = new google.auth.JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    // 4. تأكيد الاتصال
    await jwtClient.authorize();

    // 5. إرسال أمر الفهرسة لجوجل
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

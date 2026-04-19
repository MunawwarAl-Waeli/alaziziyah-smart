import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function middleware(request:any) {
  const url = request.nextUrl;
  try {
    // محاولة فك تشفير الرابط
    const decodedPath = decodeURIComponent(url.pathname);

    // إذا وجدنا أن الرابط يحتوي على رموز تشفير مزدوج (مثل %C3)
    // نقوم بإعادة توجيهه للرابط الصحيح
    if (url.pathname.includes("%C3")) {
      return NextResponse.redirect(new URL(decodedPath, request.url));
    }
  } catch (e) {
    console.error("Encoding error", e);
  }
  return NextResponse.next();
}

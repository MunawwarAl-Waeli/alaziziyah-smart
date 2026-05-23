import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  try {
    const decodedPath = decodeURIComponent(url.pathname);

    // إذا وجدنا أن الرابط يحتوي على رموز تشفير (مثل الروابط العربية)
    if (url.pathname.includes("%C3")) {
      return NextResponse.redirect(new URL(decodedPath, request.url));
    }
  } catch (e) {
    console.error("Encoding error", e);
  }

  return NextResponse.next();
}

// 💡 هذا هو الجزء الذي يحل المشكلة:
// نستثني الأيقونة والصور وملفات النظام من المرور عبر هذا الـ Middleware
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-touch-icon.png|images|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)",
  ],
};

"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface WordPressContentProps {
  content: string;
  className?: string;
}

const WordPressContent = ({
  content,
  className = "",
}: WordPressContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. معالجة احترافية لجميع الروابط (الداخلية والخارجية)
    const links = containerRef.current.querySelectorAll("a");

    const handleInternalClick = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (href) router.push(href);
    };

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      // إذا كان رابطاً داخلياً (يبدأ بـ / أو يحتوي على رابط موقعك)
      if (href.startsWith("/") || href.includes("al-azizia.com")) {
        // تنظيف الرابط إذا كان يحتوي على الدومين كاملاً
        const path =
          href.replace(/^(?:https?:\/\/)?(?:www\.)?al-azizia\.com/, "") || "/";
        link.setAttribute("href", path); // تحديث الـ DOM للرابط النظيف
        link.addEventListener("click", handleInternalClick);
      }
      // إذا كان رابطاً خارجياً
      else if (href.startsWith("http")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer"); // حماية أمنية ضرورية
      }
    });

    // 2. معالجة الصور صديقة لـ SEO (Core Web Vitals)
    const images = containerRef.current.querySelectorAll("img");
    images.forEach((img) => {
      // 🚀 إزالة srcset مفيد جداً إذا كان ووردبريس يرسل مسارات خاطئة
      img.removeAttribute("srcset");

      if (!img.getAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }

      // 🚀 الحفاظ على الـ width والـ height لحجز المساحة ومنع الـ CLS
      // ولكن نجبرها على أن تكون متجاوبة عبر الستايل المباشر
      img.style.height = "auto";
      img.style.maxWidth = "100%";

      img.classList.remove("wp-image", "alignnone", "size-full");
    });

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleInternalClick),
      );
    };
  }, [router, content]);

  if (!content) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      // تنبيه تقني: تأكد أن من يكتب المحتوى في ووردبريس هو شخص موثوق فقط لتجنب ثغرات XSS
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default WordPressContent;

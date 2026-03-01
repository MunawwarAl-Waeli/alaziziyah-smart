// hooks/use-media-query.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // التحقق من وجود window (للتأكد أننا في المتصفح)
    if (typeof window === "undefined") return;

    // إنشاء media query list
    const media = window.matchMedia(query);

    // تعيين القيمة الأولية
    // setMatches(media.matches);

    // إنشاء handler للتحديثات
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // إضافة المستمع
    media.addEventListener("change", listener);

    // تنظيف المستمع
    return () => media.removeEventListener("change", listener);
  }, [query]); // فقط query يتغير

  return matches;
}

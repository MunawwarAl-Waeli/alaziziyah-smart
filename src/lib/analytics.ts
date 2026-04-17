export const GA_TRACKING_ID = "G-RVTGES597T"; // معرف القياس الخاص بك من الصورة السابقة

// وظيفة لإرسال الأحداث العامة إلى Google Analytics
export const trackGAEvent = (
  eventName: string,
  params: Record<string, any> = {},
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
};

// وظيفة مخصصة لتحويلات Google Ads (إذا كان لديك كود تحويل محدد)
export const trackConversion = (url?: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-123456789/AbCdEfGhIjKlMnOpQrSt", // استبدل هذا بكود التحويل من جوجل أدز
      event_callback: () => {
        if (url) window.location.href = url;
      },
    });
  }
  return false;
};

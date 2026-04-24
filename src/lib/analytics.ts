export const GA_TRACKING_ID = "G-RVTGES597T"; // معرف القياس الخاص بك من الصورة السابقة

// وظيفة لإرسال الأحداث العامة إلى Google Analytics
export const trackGAEvent = (
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any> = {},
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== "undefined" && (window as any).gtag) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", eventName, params);
  }
};

// وظيفة مخصصة لتحويلات Google Ads (إذا كان لديك كود تحويل محدد)
export const trackConversion = (url?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", "conversion", {
      send_to: "AW-123456789/AbCdEfGhIjKlMnOpQrSt", // استبدل هذا بكود التحويل من جوجل أدز
      event_callback: () => {
        if (url) window.location.href = url;
      },
    });
  }
  return false;
};
// <IfModule mod_rewrite.c>
// RewriteEngine On
// RewriteBase /
// DirectoryIndex index.php
// RewriteRule ^index.php$ - [L]
// RewriteCond %{REQUEST_FILENAME} !-f
// RewriteCond %{REQUEST_FILENAME} !-d
// RewriteRule . /index.php [L]
// </IfModule>

// # BEGIN WordPress
// # The directives (lines) between "BEGIN WordPress" and "END WordPress" are
// # dynamically generated, and should only be modified via WordPress filters.
// # Any changes to the directives between these markers will be overwritten.
// <IfModule mod_rewrite.c>
// RewriteEngine On
// RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
// RewriteBase /
// RewriteRule ^index\.php$ - [L]
// RewriteCond %{REQUEST_FILENAME} !-f
// RewriteCond %{REQUEST_FILENAME} !-d
// RewriteRule . /index.php [L]
// </IfModule>

// # END WordPress
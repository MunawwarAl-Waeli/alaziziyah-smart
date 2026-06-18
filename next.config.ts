/** @type {import('next').NextConfig} */
// إعدادات الـ PWA

import { hostname } from "os";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  // نعطل الـ PWA في بيئة التطوير المحلية حتى لا يزعجك الكاش أثناء البرمجة
  disable: true,
  // process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});
const nextConfig = {
  // output: "export",
  images: {
    // 💡 السر هنا: إيقاف التحسين فقط في بيئة التطوير لتجاوز حظر Localhost
    unoptimized: process.env.NODE_ENV === "development",
    // نستخدم remotePatterns بدلاً من domains لأنها تدعم تحديد البورت (8080) بشكل صحيح
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/VI/**", // يسمح بكل المسارات تحت /VI/
      },
      {
        protocol: "https",
        hostname: "api.al-azizia.com",
        pathname: "/**", // يسمح بكل المسارات
      },
      {
        // النطاق المحلي (للعمل على جهازك)
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // تفعيل ضغط الملفات لتسريع الموقع
  compress: true,

  // ترويسات الأمان المطلوبة من Lighthouse
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // ==========================================
      // 1. قسم الخدمات (الروابط التي تبدأ بـ "تركيب")
      // ==========================================
      {
        source: encodeURI("/تركيب-مظلات-جدة"),
        destination: "/",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات-الأحساء"),
        destination: "/",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات-الدمام"),
        destination: "/",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات-خارجية"),
        destination: "/services",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات-متحركة"),
        destination: "/services/تركيب-مظلات-سيارات",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات-حدائق"),
        destination: "/services",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات-مدارس"),
        destination: "/projects/مظلات-مدارس",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات-سيارات"),
        destination: "/services/تركيب-مظلات-سيارات",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-قماش-مظلات"),
        destination: "/services/تركيب-مظلات-سيارات",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات"),
        destination: "/services/تركيب-مظلات-سيارات",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-مظلات-وسواتر"),
        destination: "/services/تركيب-مظلات-سيارات",
        permanent: true,
      },

      // خدمات السواتر
      {
        source: encodeURI("/تركيب-سواتر-حديد"),
        destination: "/services/تركيب-سواتر",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-سواتر-ابواب"),
        destination: "/services/تركيب-سواتر",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-سواتر"),
        destination: "/services/تركيب-سواتر",
        permanent: true,
      },

      // خدمات البرجولات والجلسات الشد_الانشائي
      {
        source: encodeURI("/تركيب-برجولات"),
        destination: "/services/تركيب-برجولات",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-جلسات-خارجية"),
        destination: "/services/تصميم-وتركيب-مظلات-حدائق",
        permanent: true,
      },

      // خدمات أخرى
      {
        source: encodeURI("/تركيب-لكسان"),
        destination: "/services/تركيب-مظلات-مسابح-لكسان-ضد-الكسر",
        permanent: true,
      },
      {
        source: encodeURI("/تركيب-سندوش-بنل"),
        destination: "/services/ساندوتش-بانل",
        permanent: true,
      },

      // ==========================================
      // 2. قسم معارض الأعمال (المشاريع)
      // ==========================================
      {
        source: encodeURI("/مظلات-منازل"),
        destination: "/projects/مظلات-حدائق",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-محلات"),
        destination: "/projects",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-قرميد"),
        destination: "/services/قرميد",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-مسابح"),
        destination: "/projects/مظلات-مسابح",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-مدارس"),
        destination: "/projects/مظلات-مدارس",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-الشد-الانشائي"),
        destination: "/projects/مظلات-الشد-الانشائي",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-بي-في-سي"),
        destination: "/projects",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-قماش"),
        destination: "/services/قماش-مظلات",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-سيارات-حديد"),
        destination: "/projects/مظلات-سيارات",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-برجولات"),
        destination: "/projects/معرض_برجولات_حديد",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-خارجية-للمنازل"),
        destination: "/projects/مظلات-حدائق",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-حدائق-منزلية"),
        destination: "/projects/مظلات-حدائق",
        permanent: true,
      },
      {
        source: encodeURI("/قماش-مظلات"),
        destination: "/services/قماش-مظلات",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-لكسان"),
        destination: "/projects/مظلات-لكسان",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-حديد"),
        destination: "/projects/معرض_برجولات_حديد",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-خشبية"),
        destination: "/projects/معرض_برجولات_حديد",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-جلسات"),
        destination: "/projects/مظلات-حدائق",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-سيارات-متحركة"),
        destination: "/projects/مظلات-سيارات",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-متحركة"),
        destination: "/projects",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-حدائق"),
        destination: "/projects/مظلات-حدائق",
        permanent: true,
      },
      {
        source: encodeURI("/مظلات-سيارات"),
        destination: "/projects/مظلات-سيارات",
        permanent: true,
      },
      {
        source: encodeURI("/تفصيل-مظلة-للسيارة"),
        destination: "/projects/مظلات-سيارات",
        permanent: true,
      },

      // مشاريع السواتر
      {
        source: encodeURI("/سواتر-شرائح-حديد"),
        destination: "/projects/سواتر-حديد",
        permanent: true,
      },
      {
        source: encodeURI("/سواتر-لكسان"),
        destination: "/projects/مظلات-لكسان",
        permanent: true,
      },
      {
        source: encodeURI("/سواتر-خشبية"),
        destination: "/projects/سواتر-حديد",
        permanent: true,
      },
      {
        source: encodeURI("/سواتر-حديد"),
        destination: "/projects/سواتر-حديد",
        permanent: true,
      },
      {
        source: encodeURI("/سواتر-قماش"),
        destination: "/projects/سواتر-حديد",
        permanent: true,
      },
      {
        source: encodeURI("/برجولات-حديد"),
        destination: "/projects/معرض_برجولات_حديد",
        permanent: true,
      },

      // روابط عامة
      {
        source: encodeURI("/شركة-عمل-سواتر-ومظلات"),
        destination: "/contact",
        permanent: true,
      },
      {
        source: encodeURI("/شركة-تركيب-السواتر-والمظلات"),
        destination: "/",
        permanent: true,
      },

      // ==========================================
      // 3. الصفحات الثابتة (السياسات والشروط)
      // ==========================================
      {
        source: encodeURI("/العزيزية-للمظلات-والسواتر"),
        destination: "/",
        permanent: true,
      },
      {
        // الرابط "الناقص" الذي يظهر في جوجل
        source: encodeURI("/projects/معرض_برجولات"),
        // الرابط "الصحيح" الموجود فعلياً في موقعك
        destination: "/projects/معرض_برجولات_حديد",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

// export default withPWA(nextConfig);
module.exports = nextConfig;

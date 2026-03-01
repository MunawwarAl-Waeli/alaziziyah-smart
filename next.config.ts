/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 💡 السر هنا: إيقاف التحسين فقط في بيئة التطوير لتجاوز حظر Localhost
    unoptimized: process.env.NODE_ENV === 'development',
    // نستخدم remotePatterns بدلاً من domains لأنها تدعم تحديد البورت (8080) بشكل صحيح
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080", // 👈 ضروري جداً لأن الووردبريس عندك يعمل على هذا المنفذ
        pathname: "/**", // يسمح بكل المسارات
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;

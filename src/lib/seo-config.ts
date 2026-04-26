import { Metadata } from "next";

// بيانات عامة للموقع
export const siteConfig = {
  name: "العزيزية للمظلات والسواتر",
  url: "https://al-azizia.com",
  ogImage: "https://al-azizia.com/icon.png",
  description:
    "شركة رائدة في تركيب المظلات والسواتر والبرجولات في المملكة العربية السعودية",
  keywords: [
    "مظلات",
    "سواتر",
    "برجولات",
    "مظلات سيارات",
    "تركيب مظلات",
    "تركيب سواتر",
    "تركيب برجولات",
    "سواتر حديد",
    "برجولات خشبية",
    "مظلات مدارس",
    "مظلات مسابح",
    "هناجر",
    "جدة",
  ],
  twitterHandle: "@alazizia",
  locale: "ar_SA",
};

// دالة لإنشاء Metadata موحد
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  path,
  publishedTime,
  authors,
}: {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;
  const finalDescription = description || siteConfig.description;
  const finalKeywords = keywords
    ? [...siteConfig.keywords, ...keywords]
    : siteConfig.keywords;
  const finalImage = image || siteConfig.ogImage;

  return {
    title: `${title} | ${siteConfig.name}`,
    description: finalDescription,
    keywords: finalKeywords.join(", "),

    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: finalDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
      type: publishedTime ? "article" : "website",
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description: finalDescription,
      images: [finalImage],
      creator: siteConfig.twitterHandle,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: url,
      languages: {
        "ar-SA": url,
      },
    },

    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization", // أو HomeAndConstructionBusiness كما في الكود السابق
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "حي النخيل",
      addressLocality: "جدة",
      addressRegion: "منطقة مكة المكرمة", // تم التعديل هنا بدلاً من الشرقية
      postalCode: "32415",
      addressCountry: "SA",
    },
    // يفضل إضافة الهاتف هنا أيضاً مباشرة لحل تحذير جوجل
    telephone: "+966530989975",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+966530989975",
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
      },
    ],
    sameAs: [
      "https://facebook.com/alazizia",
      "https://twitter.com/alazizia",
      "https://instagram.com/alazizia",
      "https://youtube.com/alazizia",
    ],
  };
}

// دالة لإنشاء JSON-LD للصفحة
export function webpageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: `${siteConfig.url}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

// دالة لإنشاء JSON-LD للمقالة
export function articleSchema({
  title,
  description,
  image,
  publishedTime,
  authors,
  category,
}: {
  title: string;
  description: string;
  image: string;
  publishedTime: string;
  authors: string[];
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: authors.map((author) => ({
      "@type": "Person",
      name: author,
    })),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteConfig.url,
    },
    articleSection: category,
  };
}
export function breadcrumbSchema(path: string) {
  const segments = path.split("/").filter((s) => s);
  const items = segments.map((segment, index) => ({
    "@type": "ListItem",
    position: index + 2, // 1 محجوز للرئيسية
    name: decodeURIComponent(segment).replace(/-/g, " "),
    item: `${siteConfig.url}/${segments.slice(0, index + 1).join("/")}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: siteConfig.url,
      },
      ...items,
    ],
  };
}

// أضف ratingValue و reviewCount للمتغيرات
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serviceSchema({ name, description, image, category, ratingValue, reviewCount }: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    image,
    provider: {
      "@type": "LocalBusiness", // تغيير النوع هنا يعطي قوة أكبر للخدمات المحلية
      name: siteConfig.name,
      image: image, // يحل التحذير الأصفر الخاص بالصورة
      telephone: "+966530989975"
    },
    // إذا مررت تقييمات، ستظهر النجوم في جوجل لهذه الخدمة
    ...(ratingValue && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingValue,
        reviewCount: reviewCount,
      }
    })
  };
}


import { Metadata } from "next";

// بيانات عامة للموقع
export const siteConfig = {
  name: "العزيزية للمظلات والسواتر",
  url: "https://al-azizia.com",
  ogImage: "https://al-azizia.com/og-image.jpg",
  description:
    "شركة رائدة في تركيب المظلات والسواتر والبرجولات في المملكة العربية السعودية",
  keywords: [
    "مظلات",
    "سواتر",
    "برجولات",
    "مظلات سيارات",
    "تركيب مظلات",
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

// دالة لإنشاء JSON-LD للمنظمة
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "حي النخيل",
      addressLocality: "الدمام",
      addressRegion: "المنطقة الشرقية",
      postalCode: "32415",
      addressCountry: "SA",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+966-55-818-1955",
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
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteConfig.url,
    },
    articleSection: category,
  };
}

// دالة لإنشاء JSON-LD للخدمة
export function serviceSchema({
  name,
  description,
  image,
  category,
  offers,
}: {
  name: string;
  description: string;
  image: string;
  category: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    image: image,
    serviceType: category,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price,
        priceCurrency: offers.priceCurrency,
      },
    }),
  };
}

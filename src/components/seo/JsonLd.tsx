
"use client";
import { usePathname } from "next/navigation";
export function JsonLd() {
  const pathname = usePathname();
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "العزيزية للمظلات والسواتر",
    url: "https://al-azizia.com",
    logo: "https://al-azizia.com/icon.png",
    description:
      "شركة رائدة في تركيب المظلات والسواتر والبرجولات في المملكة العربية السعودية",
    address: {
      "@type": "PostalAddress",
      streetAddress: "حي النخيل",
      addressLocality: "جدة",
      addressRegion: "المنطقة الشرقية",
      postalCode: "32415",
      addressCountry: "SA",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+966 53 098 9975",
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
    openingHours: "Sa-Th 08:00-20:00",
    priceRange: "SAR",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

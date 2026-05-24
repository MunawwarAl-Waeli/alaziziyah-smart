"use client";

import {
  Star,
  Shield,
  Sun,
  Warehouse,
  Trees,
  Wind,
  LucideIcon,
  Hexagon, // أضفنا هذا الشكل الهندسي كفاصل فخم
} from "lucide-react";

interface ServiceItem {
  text: string;
  icon: LucideIcon;
  keywords: string;
}

const services: ServiceItem[] = [
  {
    text: "مظلات سيارات حديد لكسان",
    icon: Sun,
    keywords:
      "مظلات سيارات, مظلة سيارة, تظليل سيارات, مواقف سيارات, كراج سيارة",
  },
  {
    text: "سواتر حديد شرائح خشب",
    icon: Shield,
    keywords: "سواتر حديد, سواتر خشبية, أسوار فلل, خصوصية حدائق, سواتر شرائح",
  },
  {
    text: "برجولات خشب حديد حدائق",
    icon: Trees,
    keywords: "برجولات, برجولات خشبية, جلسات خارجية, مظلات حدائق, برجولات حديد",
  },
  {
    text: "هناجر مستودعات حديد صناعية",
    icon: Warehouse,
    keywords: "هناجر حديد, مستودعات, صالات صناعية, مخازن, مباني حديدية",
  },
  {
    text: "مظلات مدارس مسابح لكسان",
    icon: Wind,
    keywords:
      "مظلات مدارس, مظلات مسابح, مظلات لكسان, تغطيات مسابح, ساحات مدرسية",
  },
  {
    text: "ضمان 10 سنوات جودة أوروبية",
    icon: Star,
    keywords:
      "ضمان مظلات, جودة أوروبية, تركيب معتمد, صيانة مظلات, مواد عالية الجودة",
  },
];

export function KeywordsMarquee() {
  // تكرار المصفوفة 4 مرات لضمان تغطية الشاشات العريضة جداً بدون تقطيع
  const marqueeItems = [...services, ...services, ...services, ...services];

  return (
    <section
      className="relative w-full overflow-hidden bg-card border-y border-border/50 py-8 md:py-12 shadow-sm"
      dir="ltr"
    >
      {/* إضاءة خلفية خفيفة جداً تتماشى مع الثيم */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 pointer-events-none" />

      {/* الظلال الجانبية (التلاشي) بخلفية الـ Card لتندمج بسلاسة */}
      {/* <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" /> */}

      <div className="flex min-w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {marqueeItems.map((item, index) => (
          <MarqueeItem key={`${index}-${item.text}`} item={item} />
        ))}
      </div>
    </section>
  );
}

function MarqueeItem({ item }: { item: ServiceItem }) {
  const Icon = item.icon;
  return (
    <div
      className="flex items-center mx-3 md:mx-5 group cursor-default select-none flex-shrink-0"
      dir="rtl"
    >
      {/* تصميم الكبسولة (Pill) للخدمة */}
      <div className="flex items-center gap-3 px-5 py-2.5 md:px-7 md:py-3.5 rounded-full bg-background border border-border/80 shadow-sm transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:-translate-y-1">
        {/* الأيقونة بحركتها الجديدة */}
        <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:rotate-12">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>

        {/* النص */}
        <span className="text-sm md:text-lg font-bold text-foreground/80 group-hover:text-primary transition-colors whitespace-nowrap">
          {item.text}
        </span>
      </div>

      {/* الفاصل الهندسي (Hexagon) بدلاً من النقطة العادية */}
      <div className="ml-3 md:ml-5 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-500">
        <Hexagon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
      </div>
    </div>
  );
}

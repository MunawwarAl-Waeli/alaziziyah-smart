"use client";

import {
  Star,
  Shield,
  Sun,
  Warehouse,
  Trees,
  Wind,
  LucideIcon,
} from "lucide-react";

interface ServiceItem {
  text: string;
  icon: LucideIcon;
}

const services: ServiceItem[] = [
  { text: "تركيب مظلات سيارات", icon: Sun },
  { text: "سواتر حديد ومجدول", icon: Shield },
  { text: "برجولات حدائق فاخرة", icon: Trees },
  { text: "أعمال الشد الإنشائي", icon: Wind },
  { text: "هناجر ومستودعات", icon: Warehouse },
  { text: "ضمان شامل للجودة", icon: Star },
];

export function KeywordsMarquee() {
  // نكرر القائمة مرة واحدة (أو أكثر) لضمان استمرارية الحركة
  // تكرار المصفوفة 4 مرات لضمان تغطية الشاشات العريضة جداً
  const marqueeItems = [...services, ...services, ...services, ...services];

  return (
    <section
      className="relative w-full overflow-hidden bg-background border-b border-secondary/10 py-6 md:py-8"
      dir="ltr" // اتجاه القسم يسار لضمان عمل الـ Transform بشكل صحيح
    >
      {/* الظلال الجانبية لتلاشي العناصر */}
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

      {/* animate-marquee: تأتي من إعدادات التايلويند التي أضفناها
         hover:[animation-play-state:paused]: كود سحري لإيقاف الحركة عند التمرير
         min-w-max: يمنع انكماش العناصر
      */}
      <div className="flex min-w-max animate-marquee hover:[animation-play-state:paused]">
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
    // نعيد الاتجاه RTL هنا ليظهر النص العربي بشكل سليم
    <div
      className="flex items-center mx-6 md:mx-12 group cursor-default select-none flex-shrink-0"
      dir="rtl"
    >
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-secondary group-hover:text-white transition-colors" />
      </div>

      <span className="mr-3 md:mr-4 text-base md:text-xl font-bold text-foreground/80 group-hover:text-secondary transition-colors whitespace-nowrap">
        {item.text}
      </span>

      <div className="mr-6 md:mr-12 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-secondary/50 transition-colors flex-shrink-0" />
    </div>
  );
}

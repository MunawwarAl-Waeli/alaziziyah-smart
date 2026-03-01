// data/services/roofing.ts
import { Service } from "../types";

export const roofingServices: Service[] = [
  {
    id: 501,
    title: "قرميد بلاستيك",
    shortDescription: "قرميد بلاستيك خفيف الوزن وعازل للحرارة",
    fullDescription: "قرميد بلاستيك عالي الجودة، يجمع بين خفة الوزن والمتانة، مع عزل حراري ممتاز. متوفر بألوان متعددة وتصاميم تحاكي القرميد الطبيعي.",
    icon: "roofPlastic",
    categoryId: 5,
    subcategoryId: 501,
    popular: true,
    stats: {
      projects: 156
    },
    pricing: {
      min: "85 ريال",
      max: "150 ريال",
      unit: "للمتر المربع"
    },
    keywords: ["قرميد بلاستيك", "سقف بلاستيك", "عازل حراري", "قرميد", "أسقف"],
    features: [
      "خفيف الوزن",
      "عازل حراري ممتاز",
      "مقاوم للكسر",
      "لا يصدأ",
      "ألوان متعددة",
      "سهل التركيب"
    ],
    specifications: {
      materials: ["بولي كربونيت", "PVC", "مواد مضادة للأشعة فوق البنفسجية"],
      sizes: ["ألواح بطول 6 متر", "عرض 1 متر", "سمك 1-3 مم"],
      warranty: "5 سنوات",
      installationTime: "3-7 أيام"
    },
    images: {
      main: "/images/6.jpg"
    }
  },
  {
    id: 502,
    title: "قرميد إسباني",
    shortDescription: "قرميد إسباني كلاسيكي فاخر",
    fullDescription: "قرميد إسباني تقليدي يضفي لمسة من الفخامة والأصالة على المباني. بتصميماته المنحنية وألوانه الترابية الدافئة، يمنح المبنى طابعاً معمارياً فريداً.",
    icon: "roofSpanish",
    categoryId: 5,
    subcategoryId: 502,
    stats: {
      projects: 78
    },
    pricing: {
      min: "120 ريال",
      max: "220 ريال",
      unit: "للمتر المربع"
    },
    keywords: ["قرميد اسباني", "قرميد كلاسيكي", "أسقف اسبانية", "قرميد فخم"],
    features: [
      "تصميم إسباني كلاسيكي",
      "مقاوم للعوامل الجوية",
      "عازل حراري",
      "يدوم لسنوات طويلة",
      "ألوان ترابية دافئة",
      "يضيف قيمة جمالية للمبنى"
    ],
    specifications: {
      materials: ["طين محروق", "سيراميك", "دهانات خاصة"],
      sizes: ["قطعة 30×40 سم", "قطعة 35×45 سم"],
      warranty: "10 سنوات",
      installationTime: "7-15 يوم"
    },
    images: {
      main: "/images/2.jpg"
    }
  },
  {
    id: 503,
    title: "قرميد وطني",
    shortDescription: "قرميد مصنع محلياً بجودة عالية",
    fullDescription: "قرميد وطني مصنع بأيدي سعودية وبأعلى معايير الجودة، يجمع بين الاقتصاد في التكلفة والجودة العالية. متوفر بتصاميم وألوان متعددة تناسب جميع الأذواق.",
    icon: "roof",
    categoryId: 5,
    subcategoryId: 503,
    stats: {
      projects: 134
    },
    pricing: {
      min: "70 ريال",
      max: "120 ريال",
      unit: "للمتر المربع"
    },
    keywords: ["قرميد وطني", "قرميد سعودي", "صنع في السعودية", "قرميد محلي"],
    features: [
      "صناعة وطنية",
      "جودة عالية",
      "سعر اقتصادي",
      "متوفر بألوان متعددة",
      "مقاوم للعوامل الجوية",
      "سهل التركيب"
    ],
    specifications: {
      materials: ["بلاستيك معالج", "فايبر جلاس", "مواد محلية"],
      sizes: ["ألواح متنوعة", "قطاعات مختلفة"],
      warranty: "5 سنوات",
      installationTime: "3-7 أيام"
    },
    images: {
      main: "/images/1.jpg"
    }
  }
];
// data/services/traditional.ts
import { Service } from "../types";

export const traditionalServices: Service[] = [
  {
    id: 601,
    title: "بيوت شعر",
    shortDescription: "بيوت شعر مفروشة للاستراحات والمناسبات",
    fullDescription: "بيوت شعر تراثية بنكهة أصيلة، تجمع بين الأصالة والحداثة. مثالية للاستراحات والمجالس الخارجية والمناسبات، بتصاميم فاخرة وخامات عالية الجودة.",
    icon: "tent",
    categoryId: 6,
    subcategoryId: 601,
    popular: true,
    stats: {
      projects: 92
    },
    pricing: {
      min: "8,000 ريال",
      max: "35,000 ريال",
      unit: "حسب الحجم"
    },
    keywords: ["بيوت شعر", "شعر مفروش", "مجالس خارجية", "خيام", "استراحات"],
    subServices: [
      { id: "601-1", name: "بيوت شعر ملكي", description: "فاخرة بتفاصيل راقية", popular: true },
      { id: "601-2", name: "بيوت شعر صيفي", description: "خفيفة وجيدة التهوية" },
      { id: "601-3", name: "بيوت شعر شتوي", description: "معزولة ودافئة" }
    ],
    features: [
      "قماش شعر عالي الجودة",
      "هيكل حديدي متين",
      "مقاومة للعوامل الجوية",
      "تصاميم تراثية أصيلة",
      "مفروشات داخلية اختيارية",
      "تكييف وإضاءة اختياري"
    ],
    specifications: {
      materials: ["قماش شعر", "حديد مجلفن", "حبال متينة", "أوتاد تثبيت"],
      sizes: ["4×4 متر", "5×6 متر", "6×8 متر", "8×10 متر", "حسب الطلب"],
      warranty: "3 سنوات",
      installationTime: "3-7 أيام"
    },
    images: {
      main: "/images/3.jpg"
    }
  },
  {
    id: 602,
    title: "مشبات",
    shortDescription: "مشبات تراثية حجرية للدفء والأجواء الأصيلة",
    fullDescription: "مشبات تراثية تصنع بدقة وإتقان من الحجر الطبيعي، تضفي دفء وأجواء أصيلة على المجالس والاستراحات. تصميمات متعددة تناسب جميع الأذواق.",
    icon: "fireplace",
    categoryId: 6,
    subcategoryId: 602,
    popular: true,
    stats: {
      projects: 67
    },
    pricing: {
      min: "3,500 ريال",
      max: "15,000 ريال",
      unit: "حسب التصميم"
    },
    keywords: ["مشبات", "مدافئ تراثية", "مشبات حجر", "مشبات تراثية", "مجالس"],
    subServices: [
      { id: "602-1", name: "مشبات حجر طبيعي", description: "من الحجر الطبيعي", popular: true },
      { id: "602-2", name: "مشبات تراثية", description: "بتصاميم تراثية أصيلة" },
      { id: "602-3", name: "مشبات عصرية", description: "تصاميم حديثة" }
    ],
    features: [
      "حجر طبيعي عالي الجودة",
      "تصاميم تراثية أصيلة",
      "مدخنة فعالة",
      "مكان لإشعال الحطب",
      "تخزين للحطب",
      "تشطيبات راقية"
    ],
    specifications: {
      materials: ["حجر طبيعي", "حجر صناعي", "طين", "حديد مشغول"],
      sizes: ["مشبات صغيرة", "مشبات متوسطة", "مشبات كبيرة", "حسب الطلب"],
      warranty: "5 سنوات",
      installationTime: "5-10 أيام"
    },
    images: {
      main: "/images/4.jpg"
    }
  }
];
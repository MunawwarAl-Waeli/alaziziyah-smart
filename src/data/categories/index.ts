// data/categories/index.ts
import { Category } from "../types";

export const categories: Category[] = [
  {
    id: 1,
    name: "المظلات",
    slug: "umbrellas",
    shortDescription: "مظلات عصرية بجميع الأنواع",
    description: "نقدم تشكيلة واسعة من المظلات العصرية التي تجمع بين الجمال والوظيفة، مصممة لتوفر ظل طبيعي وأناقة راقية لجميع المساحات الخارجية.",
    icon: "Sun",
    image: "/images/1.jpg",
    serviceCount: 8
  },
  {
    id: 2,
    name: "السواتر",
    slug: "fences",
    shortDescription: "سواتر خصوصية بأعلى جودة",
    description: "سواتر أنيقة توفر الخصوصية الكاملة وتضفي لمسة جمالية على المساحات الخارجية، مصنوعة من أجود الخامات وبأحدث التصاميم.",
    icon: "Shield",
    image: "/images/2.jpg",
    serviceCount: 3
  },
  {
    id: 3,
    name: "البرجولات",
    slug: "pergolas",
    shortDescription: "برجولات عصرية للجلسات الخارجية",
    description: "برجولات تجمع بين الحداثة والطبيعة، توفر مساحات مظللة بأناقة مع تصاميم عصرية تناسب جميع الأذواق.",
    icon: "TreePine",
    image: "/images/3.jpg",
    serviceCount: 3
  },
  {
    id: 4,
    name: "الهناجر",
    slug: "warehouses",
    shortDescription: "هناجر ومستودعات متينة",
    description: "هناجر حديدية متكاملة للمستودعات والسيارات، بتصاميم هندسية متقنة وقوة تحمل عالية.",
    icon: "Warehouse",
    image: "/images/4.jpg",
    serviceCount: 3
  },
  {
    id: 5,
    name: "القرميد",
    slug: "roofing",
    shortDescription: "قرميد فاخر للأسطح",
    description: "قرميد عالي الجودة بأنواعه البلاستيك والإسباني والوطني، يضفي لمسة جمالية على الأسطح مع عزل حراري ممتاز.",
    icon: "Home",
    image: "/images/5.jpg",
    serviceCount: 3
  },
  {
    id: 6,
    name: "أعمال تراثية",
    slug: "traditional",
    shortDescription: "بيوت شعر ومشبات تراثية",
    description: "لمسة تراثية أصيلة مع بيوت الشعر الفاخرة والمشبات الحجرية التي تضفي الدفء والأصالة على المجالس والاستراحات.",
    icon: "Tent",
    image: "/images/6.jpg",
    serviceCount: 2
  },
  {
    id: 7,
    name: "إضافات جمالية",
    slug: "accessories",
    shortDescription: "نوافير وشلالات وأسوار حجر",
    description: "إضافات جمالية تحول حديقتك إلى لوحة فنية، من نوافير وشلالات متدفقة وأسوار حجرية أنيقة.",
    icon: "Sparkles",
    image: "/images/7.jpg",
    serviceCount: 5
  }
];
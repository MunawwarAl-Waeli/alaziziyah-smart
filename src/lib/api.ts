// 1. تعريف شكل البيانات (يسهل عليك لاحقاً مطابقتها مع قاعدة البيانات)
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

// 2. البيانات الوهمية (Mock Data)
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "مظلة سيارات معلقة (مودرن)",
    description:
      "مظلة بتصميم عصري بدون أعمدة أمامية، قماش PVC ألماني عالي الكثافة.",
    price: 1200,
    category: "مظلات سيارات",
    image: "/images/car-shade-1.jpg", // سنستخدم صورة مؤقتة
    rating: 4.8,
  },
  {
    id: "2",
    title: "برجولة خشبية ذكية",
    description: "برجولة حدائق مع نظام رذاذ وإضاءة مخفية، تحكم عن طريق الجوال.",
    price: 4500,
    category: "برجولات",
    image: "/images/pergola-1.jpg",
    rating: 5.0,
  },
  {
    id: "3",
    title: "ساتر حديد ليزر (شجر)",
    description: "ساتر للحوش بتصميم قص ليزر، يوفر خصوصية تامة مع تهوية ممتازة.",
    price: 350,
    category: "سواتر",
    image: "/images/screen-1.jpg",
    rating: 4.6,
  },
  // ... يمكنك إضافة المزيد للتجربة
];

// 3. دالة البحث (هذه الدالة هي التي ستتغير لاحقاً لتربط مع Backend)
export async function searchProducts(query: string): Promise<Product[]> {
  // محاكاة تأخير الشبكة (لترى كيف يظهر التحميل)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: مستقبلاً، استبدل هذا الكود بـ:
  // const res = await fetch(`https://api.yoursite.com/products?search=${query}`)
  // return res.json()

  if (!query) return [];

  // فلترة البيانات الوهمية
  return MOCK_PRODUCTS.filter(
    (product) =>
      product.title.includes(query) ||
      product.category.includes(query) ||
      product.description.includes(query)
  );
}

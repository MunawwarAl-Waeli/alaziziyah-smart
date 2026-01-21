import { searchProducts } from "@/lib/api";
import { ProductCard } from "@/components/features/prodects/product-card";
import { SearchX } from "lucide-react";
import { Suspense } from "react";

// مكون لعرض الهيكل العظمي أثناء التحميل (Skeleton)
function SearchLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-[350px] bg-white/5 rounded-2xl animate-pulse"
        />
      ))}
    </div>
  );
}

// الصفحة الرئيسية
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const params = await searchParams; // Next.js 15 requires awaiting searchParams
  const query = params.q || "";

  // جلب البيانات (يتم على السيرفر = سرعة عالية)
  const products = await searchProducts(query);

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          نتائج البحث عن: <span className="text-primary">{query}</span>
        </h1>
        <p className="text-white/50">تم العثور على {products.length} نتيجة</p>
      </div>

      <Suspense fallback={<SearchLoading />}>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // حالة عدم وجود نتائج
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <SearchX className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              لم نعثر على نتائج
            </h3>
            <p className="text-white/50 max-w-md mx-auto">
              حاول البحث بكلمات مختلفة مثل مظلة، خشب، حديد...
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}

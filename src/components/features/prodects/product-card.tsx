import { Product } from "@/lib/api";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";


export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300">
        {/* منطقة الصورة */}
        <div className="relative h-48 w-full bg-gray-800 overflow-hidden">
          {/* نستخدم div ملون مؤقتاً بدل الصورة الحقيقية إذا لم تتوفر */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:scale-105 transition-transform duration-500" />

          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-white font-bold">
              {product.rating}
            </span>
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="p-4">
          <div className="text-xs text-primary mb-1">{product.category}</div>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-white/50 text-sm line-clamp-2 mb-4 h-10">
            {product.description}
          </p>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-xl font-bold text-white">
              {product.price}{" "}
              <span className="text-xs font-normal text-white/50">ر.س</span>
            </span>
            <button className="p-2 rounded-full bg-white text-black hover:bg-primary transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

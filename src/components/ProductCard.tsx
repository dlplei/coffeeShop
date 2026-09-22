import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail, onAddToCart }: ProductCardProps) {
  const roastColors: Record<string, string> = {
    '浅烘': 'bg-yellow-100 text-yellow-800',
    '中烘': 'bg-orange-100 text-orange-800',
    '中深烘': 'bg-amber-100 text-amber-900',
    '深烘': 'bg-amber-900 text-amber-100',
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-amber-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roastColors[product.roastLevel]}`}>
            {product.roastLevel}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-amber-800 backdrop-blur-sm">
            {product.category}
          </span>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
          <button
            onClick={() => onViewDetail(product)}
            className="px-4 py-2 bg-white/90 backdrop-blur-sm text-amber-900 rounded-full text-sm font-medium hover:bg-white transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            详情
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-amber-800/90 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-amber-800 transition-colors flex items-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            加入
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-amber-950 text-sm sm:text-base leading-tight">{product.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs text-amber-700 font-medium">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-xs text-amber-600 mb-3">{product.origin} · {product.weight}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.flavor.slice(0, 3).map((f) => (
            <span key={f} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[11px]">
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg sm:text-xl font-bold text-amber-900">¥{product.price}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="sm:hidden px-3 py-1.5 bg-amber-800 text-white rounded-full text-xs font-medium hover:bg-amber-700 transition-colors active:scale-95"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
}

import { X, Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const roastColors: Record<string, string> = {
    '浅烘': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    '中烘': 'bg-orange-100 text-orange-800 border-orange-200',
    '中深烘': 'bg-amber-100 text-amber-900 border-amber-200',
    '深烘': 'bg-amber-900 text-amber-100 border-amber-700',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <X className="w-4 h-4 text-amber-900" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Image */}
          <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roastColors[product.roastLevel]}`}>
                {product.roastLevel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-amber-800 backdrop-blur-sm">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-950 mb-1">{product.name}</h2>
                <p className="text-sm text-amber-600">{product.origin} · {product.weight}</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-amber-800">{product.rating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-amber-800 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Flavor Tags */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">风味描述</h4>
              <div className="flex flex-wrap gap-2">
                {product.flavor.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-800 rounded-full text-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Roast Level Indicator */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">烘焙程度</h4>
              <div className="flex gap-1">
                {['浅烘', '中烘', '中深烘', '深烘'].map((level, i) => {
                  const levels = ['浅烘', '中烘', '中深烘', '深烘'];
                  const currentIdx = levels.indexOf(product.roastLevel);
                  const isActive = i <= currentIdx;
                  return (
                    <div
                      key={level}
                      className={`flex-1 h-2 rounded-full transition-colors ${
                        isActive ? 'bg-amber-800' : 'bg-amber-100'
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-amber-600 mt-1">{product.roastLevel}</p>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center justify-between pt-4 border-t border-amber-100">
              <div>
                <p className="text-xs text-amber-500">单价</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-900">¥{product.price}</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-2 bg-amber-50 rounded-full px-2 py-1 border border-amber-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-white border border-amber-200 flex items-center justify-center hover:bg-amber-50 transition-colors"
                  >
                    <Minus className="w-3 h-3 text-amber-800" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-amber-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white border border-amber-200 flex items-center justify-center hover:bg-amber-50 transition-colors"
                  >
                    <Plus className="w-3 h-3 text-amber-800" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="px-5 py-3 bg-gradient-to-r from-amber-800 to-amber-900 text-white rounded-full font-medium text-sm hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg shadow-amber-900/20 active:scale-95 flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  加入购物车
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

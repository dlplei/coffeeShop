import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-amber-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <h2 className="text-lg font-bold text-amber-950">购物车</h2>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                {totalItems} 件
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-amber-800" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-amber-300" />
                </div>
                <p className="text-amber-600 font-medium mb-1">购物车是空的</p>
                <p className="text-sm text-amber-400">去挑选一款心仪的咖啡吧</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-amber-950 truncate">{item.product.name}</h4>
                      <p className="text-xs text-amber-500 mt-0.5">{item.product.weight}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors"
                          >
                            <Minus className="w-3 h-3 text-amber-700" />
                          </button>
                          <span className="w-5 text-center text-xs font-semibold text-amber-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors"
                          >
                            <Plus className="w-3 h-3 text-amber-700" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-amber-900">
                            ¥{item.product.price * item.quantity}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors group"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-amber-400 group-hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-amber-100 bg-amber-50/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-amber-600">合计</span>
                <span className="text-2xl font-bold text-amber-900">¥{totalPrice}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-amber-800 to-amber-900 text-white rounded-full font-semibold text-sm hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg shadow-amber-900/20 active:scale-[0.98]"
              >
                去结算
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

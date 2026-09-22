import { X, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { useState } from 'react';

interface CheckoutProps {
  items: CartItem[];
  onClose: () => void;
  onComplete: () => void;
}

export default function Checkout({ items, onClose, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = totalPrice >= 200 ? 0 : 15;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-amber-950 mb-2">下单成功！</h2>
          <p className="text-amber-600 mb-2">感谢您的购买</p>
          <p className="text-sm text-amber-500">您的精品咖啡正在路上，预计3-5个工作日送达</p>
          <div className="mt-6 p-4 bg-amber-50 rounded-xl">
            <p className="text-xs text-amber-500 mb-1">订单编号</p>
            <p className="text-lg font-mono font-bold text-amber-900">
              CX{Date.now().toString().slice(-8)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-100">
          <h2 className="text-lg font-bold text-amber-950">确认订单</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-amber-800" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-5">
          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-amber-800 mb-3">商品清单</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 p-2 bg-amber-50/50 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-amber-900 truncate">{item.product.name}</p>
                    <p className="text-xs text-amber-500">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-900">¥{item.product.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Delivery Info */}
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-semibold text-amber-800">配送信息</h3>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="收货人姓名"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <input
                  type="tel"
                  placeholder="手机号码"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <input
                  type="text"
                  placeholder="配送地址"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
            </div>

            {/* Payment Info */}
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-semibold text-amber-800">支付方式</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['微信支付', '支付宝', '银行卡'].map((method) => (
                  <label key={method} className="flex items-center justify-center p-2.5 bg-white border border-amber-200 rounded-xl cursor-pointer hover:border-amber-400 transition-colors has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                    <input type="radio" name="payment" className="sr-only" defaultChecked={method === '微信支付'} />
                    <span className="text-xs font-medium text-amber-800">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">商品小计</span>
                  <span className="text-amber-900 font-medium">¥{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">运费</span>
                  <span className="text-amber-900 font-medium">
                    {shipping === 0 ? '免运费' : `¥${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-500">满¥200免运费，还差¥{200 - totalPrice}</p>
                )}
                <div className="flex justify-between pt-2 border-t border-amber-200">
                  <span className="font-semibold text-amber-800">应付总额</span>
                  <span className="text-xl font-bold text-amber-900">¥{totalPrice + shipping}</span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-800 to-amber-900 text-white rounded-full font-semibold text-sm hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg shadow-amber-900/20 active:scale-[0.98]"
            >
              确认支付 ¥{totalPrice + shipping}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Coffee, Filter } from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { products, categories } from './data/products';
import { Product, CartItem } from './types';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavor.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-amber-50/50">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-800 rounded-full text-xs font-medium mb-4">
              <Coffee className="w-3.5 h-3.5" />
              精品烘焙 · 产地直供
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-950 mb-4 leading-tight">
              每一杯，都是
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900"> 风味的旅程</span>
            </h2>
            <p className="text-amber-700/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              我们精选全球优质产区的精品咖啡豆，以匠心烘焙呈现每一颗豆子独特的风味故事。从产地到杯中，只为给您最纯粹的咖啡体验。
            </p>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl" />
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-amber-600 shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-amber-800 text-white shadow-md shadow-amber-900/20'
                  : 'bg-white text-amber-700 border border-amber-200 hover:border-amber-400 hover:bg-amber-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-amber-600 font-medium mb-1">没有找到相关咖啡</p>
            <p className="text-sm text-amber-400">试试其他关键词或分类</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={setSelectedProduct}
                onAddToCart={(p) => addToCart(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-amber-900/5 border-t border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-700" />
              <span className="text-sm font-semibold text-amber-800">醇香咖啡</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-amber-600">
              <span>精品烘焙</span>
              <span className="w-1 h-1 bg-amber-300 rounded-full" />
              <span>产地直供</span>
              <span className="w-1 h-1 bg-amber-300 rounded-full" />
              <span>新鲜直达</span>
            </div>
            <p className="text-xs text-amber-500">© 2026 醇香咖啡 All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <Checkout
          items={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={handleCheckoutComplete}
        />
      )}

      {/* Added to Cart Toast */}
      {showAddedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-amber-900 text-white rounded-full shadow-xl text-sm font-medium animate-bounce">
          ✓ 已加入购物车
        </div>
      )}
    </div>
  );
}

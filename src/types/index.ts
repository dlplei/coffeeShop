export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  description: string;
  flavor: string[];
  roastLevel: '浅烘' | '中烘' | '中深烘' | '深烘';
  weight: string;
  image: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

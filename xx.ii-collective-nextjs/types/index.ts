export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  color: string;
  description?: string;
  isBestSeller?: boolean;
  videoOverlay?: boolean;
  materials?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
  items: CartItem[];
}

export interface Address {
  id: number;
  name: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: number;
  type: "Visa" | "Mastercard";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  readTime: string;
  tags: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}

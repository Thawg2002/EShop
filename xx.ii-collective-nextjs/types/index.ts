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

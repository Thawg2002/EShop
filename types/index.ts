// Basic MongoDB Document interface
export interface BaseDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// User & Auth
export interface User extends BaseDocument {
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  role: string | Role;
  addresses: Address[];
  totalSpent: number;
  orderCount: number;
  membershipTier: "bronze" | "silver" | "gold" | "platinum";
  isActive: boolean;
  lastLoginAt?: string;
}

export interface Role extends BaseDocument {
  name: string;
  code: string;
  description?: string;
  permissions: string[];
}

export interface Address {
  _id?: string;
  label: string;
  fullName: string;
  phone: string;
  province?: string;
  provinceCode?: string;
  district?: string;
  districtCode?: string;
  ward?: string;
  wardCode?: string;
  street?: string;
  isDefault: boolean;
}

// Product & Catalog
export interface Category extends BaseDocument {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string | Category;
  ancestors: Array<{ _id: string; name: string; slug: string }>;
  order: number;
  productCount: number;
  isActive: boolean;
  isFeatured: boolean;
}

export interface Brand extends BaseDocument {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  country?: string;
  productCount: number;
  isActive: boolean;
  isFeatured: boolean;
}

export interface Product extends BaseDocument {
  name: string;
  slug: string;
  sku?: string;
  description?: string;
  shortDescription?: string;
  category: string | Category;
  brand?: string | Brand;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  thumbnail?: string;
  images: string[];
  stock: number;
  hasVariants: boolean;
  specifications?: {
    material?: string;
    weight?: string;
    origin?: string;
    careInstructions?: string;
  };
  status: "draft" | "active" | "inactive" | "out_of_stock" | "archived";
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  rating: {
    average: number;
    count: number;
  };
}

// Cart & Order
export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Array<{ name: string; value: string }>;
}

export interface Order extends BaseDocument {
  orderNumber: string;
  user?: string | User;
  guestEmail?: string;
  guestPhone?: string;
  items: Array<{
    product: string | Product;
    snapshot: {
      name: string;
      sku?: string;
      image?: string;
      options: Array<{ name: string; value: string }>;
    };
    unitPrice: number;
    quantity: number;
    subtotal: number;
  }>;
  shippingAddress: {
    fullName: string;
    phone: string;
    email?: string;
    street: string;
    province?: string;
    district?: string;
    ward?: string;
  };
  payment: {
    method: "cod" | "bank_transfer" | "vnpay" | "momo" | "zalopay";
    status: "pending" | "processing" | "paid" | "failed" | "refunded";
  };
  pricing: {
    subtotal: number;
    shippingFee: number;
    discount: number;
    tax: number;
    total: number;
  };
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  statusHistory: Array<{
    status: string;
    note?: string;
    changedAt: string;
  }>;
}

// Blog
export interface BlogPost extends BaseDocument {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image?: string;
  category: string | BlogCategory;
  author: string | User;
  status: "draft" | "published";
  tags: string[];
  views: number;
}

export interface BlogCategory extends BaseDocument {
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface Banner extends BaseDocument {
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  type: string;
  isActive: boolean;
  order: number;
}

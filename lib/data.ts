import { Product, Order, Address, BlogPost, BlogCategory } from "@/types";

export const PRODUCTS: Product[] = [
  {
    _id: "prod-1",
    name: "Váy Lụa Trơn",
    slug: "vay-lua-tron",
    price: 2400000,
    category: "Váy",
    thumbnail:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 10,
    hasVariants: false,
    status: "active",
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: { average: 4.8, count: 12 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // ... other products updated similarly if needed, but I'll focus on keeping it minimal for now
];

export const ORDERS: Order[] = [
  {
    _id: "ord-1",
    orderNumber: "204-99812-XX",
    createdAt: "2024-02-12T10:00:00Z",
    pricing: {
      total: 5900000.0,
      subtotal: 5800000,
      shippingFee: 100000,
      discount: 0,
      tax: 0,
    },
    status: "processing",
    items: [],
    updatedAt: "2024-02-12T10:00:00Z",
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0987654321",
      street: "123 Đường Láng",
      email: "a@example.com",
    },
    payment: { method: "cod", status: "pending" },
    statusHistory: [],
  },
  {
    _id: "ord-2",
    orderNumber: "204-88123-XX",
    createdAt: "2024-01-24T10:00:00Z",
    pricing: {
      total: 2100000.0,
      subtotal: 2000000,
      shippingFee: 100000,
      discount: 0,
      tax: 0,
    },
    status: "delivered",
    items: [],
    updatedAt: "2024-01-24T10:00:00Z",
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0987654321",
      street: "123 Đường Láng",
      email: "a@example.com",
    },
    payment: { method: "vnpay", status: "paid" },
    statusHistory: [],
  },
];

export const ADDRESSES: Address[] = [
  {
    _id: "addr-1",
    label: "Nhà Riêng",
    fullName: "Nguyễn Văn A",
    phone: "+84 98 765 4321",
    street: "123 Đường Láng",
    district: "Đống Đa",
    province: "Hà Nội",
    isDefault: true,
  },
  {
    _id: "addr-2",
    label: "Văn Phòng",
    fullName: "Nguyễn Văn A (Văn Phòng)",
    phone: "+84 97 654 3210",
    street: "456 Phố Huế",
    district: "Hai Bà Trưng",
    province: "Hà Nội",
    isDefault: false,
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    _id: "all",
    name: "Tất Cả",
    slug: "all",
    count: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "xu-huong",
    name: "Xu Hướng",
    slug: "xu-huong",
    count: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "phong-cach",
    name: "Phong Cách",
    slug: "phong-cach",
    count: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "chat-lieu",
    name: "Chất Liệu",
    slug: "chat-lieu",
    count: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "su-kien",
    name: "Sự Kiện",
    slug: "su-kien",
    count: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    _id: "post-1",
    slug: "nghe-thuat-phoi-do-minimalism",
    title: "Nghệ Thuật Phối Đồ Minimalism: Ít Nhưng Chất",
    excerpt:
      "Khám phá cách xây dựng tủ đồ tối giản nhưng vẫn mang đậm dấu ấn cá nhân và sự sang trọng vượt thời gian.",
    content: "...",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop",
    createdAt: "2024-02-08T10:00:00Z",
    updatedAt: "2024-02-08T10:00:00Z",
    author: "Minh Anh", // Simplified to string for now to match interface or I should use User object
    category: "Phong Cách",
    tags: ["Minimalism", "Fashion", "Style"],
    views: 120,
    status: "published",
  },
  {
    _id: "post-2",
    slug: "chat-lieu-ben-vung-trong-thoi-trang-cao-cap",
    title: "Chất Liệu Bền Vững Trong Thời Trang Cao Cấp",
    excerpt:
      "Sự kết hợp giữa đẳng cấp và trách nhiệm với môi trường thông qua những chất liệu vải sinh học mới nhất.",
    content: "...",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop",
    createdAt: "2024-02-05T10:00:00Z",
    updatedAt: "2024-02-05T10:00:00Z",
    author: "Hoàng Long",
    category: "Chất Liệu",
    tags: ["Eco-friendly", "Premium", "Materials"],
    views: 85,
    status: "published",
  },
];

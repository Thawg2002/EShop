import { Product, Order, Address } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Váy Lụa Trơn",
    price: 240,
    category: "Váy",
    color: "Ngà",
    description:
      "Được thiết kế thủ công từ lụa Ý cao cấp, chiếc váy này mang lại sự thoải mái và sang trọng.",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Áo Vest Linen",
    price: 350,
    category: "Áo Khoác",
    color: "Cát",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Quần Ống Rộng",
    price: 180,
    category: "Quần",
    color: "Trắng",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Giày Da Cao Gót",
    price: 210,
    category: "Giày",
    color: "Da Bò",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Áo Khoác Dáng Dài",
    price: 420,
    category: "Áo Khoác",
    color: "Kem",
    image:
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Váy Dạ Hội",
    price: 260,
    category: "Váy",
    color: "Champagne",
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Túi Xách Da Thật",
    price: 850,
    category: "Phụ Kiện",
    color: "Đen",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Khăn Choàng Cashmere",
    price: 320,
    category: "Phụ Kiện",
    color: "Xám",
    image:
      "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Váy Lụa Họa Tiết",
    price: 480,
    category: "Váy",
    color: "Đa Sắc",
    image:
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=1000&auto=format&fit=crop",
  },
];

export const ORDERS: Order[] = [
  {
    id: "204-99812-XX",
    date: "12 Tháng 2, 2024",
    total: 590.0,
    status: "Processing",
    items: [],
  },
  {
    id: "204-88123-XX",
    date: "24 Tháng 1, 2024",
    total: 210.0,
    status: "Delivered",
    items: [],
  },
  {
    id: "204-77210-XX",
    date: "10 Tháng 1, 2024",
    total: 180.0,
    status: "Shipped",
    items: [],
  },
];

export const ADDRESSES: Address[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    type: "Nhà Riêng",
    street: "123 Đường Láng",
    city: "Hà Nội",
    state: "Đống Đa",
    zip: "100000",
    phone: "+84 98 765 4321",
    isDefault: true,
  },
  {
    id: 2,
    name: "Nguyễn Văn A (Văn Phòng)",
    type: "Văn Phòng",
    street: "456 Phố Huế",
    city: "Hà Nội",
    state: "Hai Bà Trưng",
    zip: "100000",
    phone: "+84 97 654 3210",
    isDefault: false,
  },
];

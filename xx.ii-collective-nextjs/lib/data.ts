import { Product, Order, Address, BlogPost, BlogCategory } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Váy Lụa Trơn",
    price: 2400000,
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
    price: 3500000,
    category: "Áo Khoác",
    color: "Cát",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Quần Ống Rộng",
    price: 1800000,
    category: "Quần",
    color: "Trắng",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Giày Da Cao Gót",
    price: 2100000,
    category: "Giày",
    color: "Da Bò",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Áo Khoác Dáng Dài",
    price: 4200000,
    category: "Áo Khoác",
    color: "Kem",
    image:
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Váy Dạ Hội",
    price: 2600000,
    category: "Váy",
    color: "Champagne",
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Túi Xách Da Thật",
    price: 8500000,
    category: "Phụ Kiện",
    color: "Đen",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Khăn Choàng Cashmere",
    price: 3200000,
    category: "Phụ Kiện",
    color: "Xám",
    image:
      "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Váy Lụa Họa Tiết",
    price: 4800000,
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
    total: 5900000.0,
    status: "Processing",
    items: [],
  },
  {
    id: "204-88123-XX",
    date: "24 Tháng 1, 2024",
    total: 2100000.0,
    status: "Delivered",
    items: [],
  },
  {
    id: "204-77210-XX",
    date: "10 Tháng 1, 2024",
    total: 1800000.0,
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

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "all", name: "Tất Cả", count: 6 },
  { id: "xu-huong", name: "Xu Hướng", count: 2 },
  { id: "phong-cach", name: "Phong Cách", count: 2 },
  { id: "chat-lieu", name: "Chất Liệu", count: 1 },
  { id: "su-kien", name: "Sự Kiện", count: 1 },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "nghe-thuat-phoi-do-minimalism",
    title: "Nghệ Thuật Phối Đồ Minimalism: Ít Nhưng Chất",
    excerpt:
      "Khám phá cách xây dựng tủ đồ tối giản nhưng vẫn mang đậm dấu ấn cá nhân và sự sang trọng vượt thời gian.",
    content: `
      <h2>Tại sao nên chọn phong cách Minimalism?</h2>
      <p>Phong cách tối giản không chỉ là một xu hướng thời trang, mà còn là một triết lý sống. Trong thời đại của thời trang nhanh, minimalism mang đến một hơi thở mới với sự chú trọng vào chất lượng hơn số lượng.</p>
      
      <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop" alt="Minimalism Fashion" />

      <h3>1. Chất liệu là chìa khóa</h3>
      <p>Khi bạn cắt giảm các chi tiết rườm rà, chất liệu vải sẽ trở thành tâm điểm. Cotton Ý, Lụa tơ tằm hay Linen cao cấp không chỉ mang lại cảm giác dễ chịu mà còn tạo nên phom dáng chuẩn xác cho trang phục.</p>

      <h3>2. Bảng màu trung tính</h3>
      <p>Trắng, đen, be và xám là những gam màu kinh điển. Chúng cho phép bạn dễ dàng kết hợp mọi món đồ trong tủ quần áo với nhau mà không sợ lỗi mốt.</p>

      <blockquote>"Simplicity is the ultimate sophistication." - Leonardo da Vinci</blockquote>

      <p>Hãy bắt đầu hành trình tối giản của bạn từ những món đồ cơ bản nhất tại XX.II Collective.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop",
    date: "8 Tháng 2, 2026",
    author: {
      name: "Minh Anh",
      role: "Fashion Editor",
      avatar: "https://i.pravatar.cc/150?u=minhanh",
    },
    category: "Phong Cách",
    readTime: "5 phút",
    tags: ["Minimalism", "Fashion", "Style"],
  },
  {
    id: 2,
    slug: "chat-lieu-ben-vung-trong-thoi-trang-cao-cap",
    title: "Chất Liệu Bền Vững Trong Thời Trang Cao Cấp",
    excerpt:
      "Sự kết hợp giữa đẳng cấp và trách nhiệm với môi trường thông qua những chất liệu vải sinh học mới nhất.",
    content: "<p>Nội dung đang được cập nhật...</p>",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop",
    date: "5 Tháng 2, 2026",
    author: {
      name: "Hoàng Long",
      role: "Sustainability Expert",
      avatar: "https://i.pravatar.cc/150?u=hoanglong",
    },
    category: "Chất Liệu",
    readTime: "7 phút",
    tags: ["Eco-friendly", "Premium", "Materials"],
  },
  {
    id: 3,
    slug: "bo-suu-tap-moi-xuan-he-2026",
    title: "Cận Cảnh Bộ Sưu Tập Mới Xuân Hè 2026",
    excerpt:
      "Đánh dấu sự trở lại của những gam màu pastel và phom dáng bay bổng trong bộ sưu tập 'Aura of Spring'.",
    content: "<p>Nội dung đang được cập nhật...</p>",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    date: "1 Tháng 2, 2026",
    author: {
      name: "Thảo Vy",
      role: "Creative Director",
      avatar: "https://i.pravatar.cc/150?u=thaovy",
    },
    category: "Sự Kiện",
    readTime: "4 phút",
    tags: ["New Collection", "Spring Summer", "2026"],
  },
  {
    id: 4,
    slug: "cach-bao-quan-do-lua-luon-nhu-moi",
    title: "Bí Quyết Bảo Quản Đồ Lụa Luôn Như Mới",
    excerpt:
      "Lụa là chất liệu đỏng đảnh, nhưng với 5 bước đơn giản này, trang phục của bạn sẽ luôn giữ được độ bóng mượt.",
    content: "<p>Nội dung đang được cập nhật...</p>",
    image:
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=1000&auto=format&fit=crop",
    date: "28 Tháng 1, 2026",
    author: {
      name: "Minh Anh",
      role: "Fashion Editor",
      avatar: "https://i.pravatar.cc/150?u=minhanh",
    },
    category: "Phong Cách",
    readTime: "6 phút",
    tags: ["Silk Care", "Luxury", "Tips"],
  },
];

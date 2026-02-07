import { Product, Order, Address, Article } from "@/types";

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

// Blog Articles
export const ARTICLE_CATEGORIES = [
  "Xu Hướng",
  "Phong Cách",
  "Kiến Thức",
  "Gợi Ý",
  "Behind The Scenes",
];

const DEFAULT_AUTHOR = {
  name: "Minh Anh",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  role: "Fashion Editor",
};

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: "xu-huong-thoi-trang-ben-vung-2024",
    title: "Xu Hướng Thời Trang Bền Vững 2024",
    excerpt:
      "Khám phá những xu hướng thời trang thân thiện với môi trường đang định hình ngành công nghiệp. Từ chất liệu tái chế đến quy trình sản xuất xanh.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    date: "15 Tháng 1, 2024",
    category: "Xu Hướng",
    author: DEFAULT_AUTHOR,
    readTime: "5 phút đọc",
    tableOfContents: [
      { id: "gioi-thieu", title: "Giới Thiệu" },
      { id: "chat-lieu-xanh", title: "Chất Liệu Xanh" },
      { id: "thuong-hieu-tien-phong", title: "Thương Hiệu Tiên Phong" },
      { id: "ket-luan", title: "Kết Luận" },
    ],
    content: `
## Giới Thiệu

Thời trang bền vững không còn là xu hướng nhất thời mà đã trở thành tất yếu. Năm 2024 đánh dấu bước chuyển mình quan trọng của ngành thời trang toàn cầu.

## Chất Liệu Xanh

Các chất liệu thân thiện môi trường đang chiếm ưu thế:
- **Organic Cotton**: Bông hữu cơ không sử dụng thuốc trừ sâu
- **Recycled Polyester**: Polyester tái chế từ chai nhựa
- **Tencel**: Sợi từ gỗ bạch đàn bền vững

## Thương Hiệu Tiên Phong

Nhiều thương hiệu Việt Nam đang dẫn đầu phong trào này với cam kết mạnh mẽ về phát triển bền vững.

## Kết Luận

Lựa chọn thời trang bền vững là cách chúng ta góp phần bảo vệ hành tinh cho thế hệ mai sau.
        `,
  },
  {
    id: 2,
    slug: "bi-quyet-phoi-do-toi-gian",
    title: "Bí Quyết Phối Đồ Tối Giản Nhưng Sang Trọng",
    excerpt:
      'Học cách tạo phong cách tinh tế với ít đồ nhưng chất lượng cao. Triết lý "less is more" trong thời trang hiện đại.',
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    date: "10 Tháng 1, 2024",
    category: "Phong Cách",
    author: DEFAULT_AUTHOR,
    readTime: "4 phút đọc",
    tableOfContents: [
      { id: "nguyen-tac", title: "Nguyên Tắc Cơ Bản" },
      { id: "mau-trung-tinh", title: "Màu Trung Tính" },
      { id: "items-co-ban", title: "Items Cơ Bản" },
    ],
    content: `
## Nguyên Tắc Cơ Bản

Phong cách tối giản dựa trên nguyên tắc chọn lọc kỹ càng và đầu tư vào chất lượng thay vì số lượng.

## Màu Trung Tính

Palette màu trung tính là nền tảng: đen, trắng, be, xám, navy. Dễ phối hợp và luôn thanh lịch.

## Items Cơ Bản

5 items không thể thiếu:
1. Áo sơ mi trắng chất lượng cao
2. Quần âu đen vừa vặn
3. Áo khoác blazer
4. Giày da tốt
5. Túi xách da mềm
        `,
  },
  {
    id: 3,
    slug: "chat-lieu-cao-cap-nhan-biet",
    title: "Chất Liệu Cao Cấp: Làm Sao Để Nhận Biết?",
    excerpt:
      "Hướng dẫn chi tiết cách phân biệt chất liệu vải cao cấp từ những loại thông thường. Kiến thức cần thiết cho người yêu thời trang.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800",
    date: "5 Tháng 1, 2024",
    category: "Kiến Thức",
    author: {
      name: "Hoàng Long",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      role: "Material Expert",
    },
    readTime: "7 phút đọc",
  },
  {
    id: 4,
    slug: "tu-do-capsule",
    title: "Tủ Đồ Capsule: Đầu Tư Thông Minh",
    excerpt:
      "Xây dựng tủ đồ capsule với những item cơ bản nhưng linh hoạt. Tiết kiệm thời gian và tiền bạc mà vẫn luôn phong cách.",
    image: "https://images.unsplash.com/photo-1558191053-b187090acede?w=800",
    date: "1 Tháng 1, 2024",
    category: "Gợi Ý",
    author: DEFAULT_AUTHOR,
    readTime: "6 phút đọc",
  },
  {
    id: 5,
    slug: "behind-the-scenes-ss24",
    title: "Behind The Scenes: Bộ Sưu Tập SS24",
    excerpt:
      "Khám phá hậu trường sản xuất bộ sưu tập Xuân Hè 2024 của XX.II Collective. Từ ý tưởng đến thành phẩm.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    date: "28 Tháng 12, 2023",
    category: "Behind The Scenes",
    author: DEFAULT_AUTHOR,
    readTime: "8 phút đọc",
  },
  {
    id: 6,
    slug: "mau-sac-thong-linh-2024",
    title: "Màu Sắc Thống Lĩnh Năm 2024",
    excerpt:
      "Pantone đã công bố màu của năm, nhưng thời trang Việt đang ưa chuộng những tone màu nào? Cùng tìm hiểu.",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800",
    date: "20 Tháng 12, 2023",
    category: "Xu Hướng",
    author: DEFAULT_AUTHOR,
    readTime: "4 phút đọc",
  },
];

import { create } from "zustand";
import { Product, Category, Order, Brand, Banner, User } from "@/types";
import apiClient from "@/lib/api-client";
import { toast } from "react-hot-toast";

interface AdminState {
  // Products
  products: Product[];
  productsLoading: boolean;
  fetchProducts: (params?: any) => Promise<void>;
  createProduct: (data: any) => Promise<void>;
  updateProduct: (id: string, data: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Categories
  categories: Category[];
  categoriesLoading: boolean;
  fetchCategories: (params?: any) => Promise<void>;
  createCategory: (data: any) => Promise<void>;
  updateCategory: (id: string, data: any) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Orders
  orders: Order[];
  ordersLoading: boolean;
  fetchOrders: (params?: any) => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;

  // Brands
  brands: Brand[];
  brandsLoading: boolean;
  fetchBrands: (params?: any) => Promise<void>;
  createBrand: (data: any) => Promise<void>;
  updateBrand: (id: string, data: any) => Promise<void>;
  deleteBrand: (id: string) => Promise<void>;

  // Banners
  banners: Banner[];
  bannersLoading: boolean;
  fetchBanners: (params?: any) => Promise<void>;
  createBanner: (data: any) => Promise<void>;
  updateBanner: (id: string, data: any) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;

  // Users
  users: User[];
  usersLoading: boolean;
  fetchUsers: (params?: any) => Promise<void>;

  // Utils
  uploadImage: (file: File, folder?: string) => Promise<string>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  // Products
  products: [],
  productsLoading: false,
  fetchProducts: async (params) => {
    set({ productsLoading: true });
    try {
      const res = await apiClient.get("/products", { params });
      set({ products: res.data.products || res.data });
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast.error("Không thể tải danh sách sản phẩm");
    } finally {
      set({ productsLoading: false });
    }
  },
  createProduct: async (data) => {
    set({ productsLoading: true });
    try {
      await apiClient.post("/products", data);
      toast.success("Thêm sản phẩm thành công");
      get().fetchProducts();
    } catch (error) {
      console.error("Failed to create product", error);
      toast.error("Thêm sản phẩm thất bại");
      throw error;
    } finally {
      set({ productsLoading: false });
    }
  },
  updateProduct: async (id, data) => {
    set({ productsLoading: true });
    try {
      await apiClient.put(`/products/${id}`, data);
      toast.success("Cập nhật sản phẩm thành công");
      get().fetchProducts();
    } catch (error) {
      console.error("Failed to update product", error);
      toast.error("Cập nhật sản phẩm thất bại");
      throw error;
    } finally {
      set({ productsLoading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ productsLoading: true });
    try {
      await apiClient.delete(`/products/${id}`);
      toast.success("Xóa sản phẩm thành công");
      get().fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Xóa sản phẩm thất bại");
    } finally {
      set({ productsLoading: false });
    }
  },

  // Categories
  categories: [],
  categoriesLoading: false,
  fetchCategories: async () => {
    set({ categoriesLoading: true });
    try {
      const res = await apiClient.get("/categories");
      set({ categories: res.data });
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      set({ categoriesLoading: false });
    }
  },
  createCategory: async (data) => {
    set({ categoriesLoading: true });
    try {
      await apiClient.post("/categories", data);
      toast.success("Thêm danh mục thành công");
      get().fetchCategories();
    } catch (error) {
      console.error("Failed to create category", error);
      toast.error("Thêm danh mục thất bại");
      throw error;
    } finally {
      set({ categoriesLoading: false });
    }
  },
  updateCategory: async (id, data) => {
    set({ categoriesLoading: true });
    try {
      await apiClient.put(`/categories/${id}`, data);
      toast.success("Cập nhật danh mục thành công");
      get().fetchCategories();
    } catch (error) {
      console.error("Failed to update category", error);
      toast.error("Cập nhật danh mục thất bại");
      throw error;
    } finally {
      set({ categoriesLoading: false });
    }
  },
  deleteCategory: async (id) => {
    set({ categoriesLoading: true });
    try {
      await apiClient.delete(`/categories/${id}`);
      toast.success("Xóa danh mục thành công");
      get().fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Xóa danh mục thất bại");
    } finally {
      set({ categoriesLoading: false });
    }
  },

  // Orders
  orders: [],
  ordersLoading: false,
  fetchOrders: async (params) => {
    set({ ordersLoading: true });
    try {
      const res = await apiClient.get("/orders", { params });
      set({ orders: res.data.orders || res.data });
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      set({ ordersLoading: false });
    }
  },
  updateOrderStatus: async (id, status) => {
    set({ ordersLoading: true });
    try {
      await apiClient.put(`/orders/${id}/status`, { status });
      toast.success("Cập nhật trạng thái đơn hàng thành công");
      get().fetchOrders();
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Cập nhật trạng thái thất bại");
    } finally {
      set({ ordersLoading: false });
    }
  },

  // Brands
  brands: [],
  brandsLoading: false,
  fetchBrands: async () => {
    set({ brandsLoading: true });
    try {
      const res = await apiClient.get("/brands");
      set({ brands: res.data });
    } catch (error) {
      console.error("Failed to fetch brands", error);
    } finally {
      set({ brandsLoading: false });
    }
  },
  createBrand: async (data) => {
    set({ brandsLoading: true });
    try {
      await apiClient.post("/brands", data);
      toast.success("Thêm thương hiệu thành công");
      get().fetchBrands();
    } catch (error) {
      console.error("Failed to create brand", error);
      toast.error("Thêm thương hiệu thất bại");
      throw error;
    } finally {
      set({ brandsLoading: false });
    }
  },
  updateBrand: async (id, data) => {
    set({ brandsLoading: true });
    try {
      await apiClient.put(`/brands/${id}`, data);
      toast.success("Cập nhật thương hiệu thành công");
      get().fetchBrands();
    } catch (error) {
      console.error("Failed to update brand", error);
      toast.error("Cập nhật thương hiệu thất bại");
      throw error;
    } finally {
      set({ brandsLoading: false });
    }
  },
  deleteBrand: async (id) => {
    set({ brandsLoading: true });
    try {
      await apiClient.delete(`/brands/${id}`);
      toast.success("Xóa thương hiệu thành công");
      get().fetchBrands();
    } catch (error) {
      console.error("Failed to delete brand", error);
      toast.error("Xóa thương hiệu thất bại");
    } finally {
      set({ brandsLoading: false });
    }
  },

  // Banners
  banners: [],
  bannersLoading: false,
  fetchBanners: async (params?: any) => {
    set({ bannersLoading: true });
    try {
      const res = await apiClient.get("/banners", { params });
      set({ banners: res.data });
    } catch (error) {
      console.error("Failed to fetch banners", error);
      toast.error("Không thể tải banners");
    } finally {
      set({ bannersLoading: false });
    }
  },
  createBanner: async (data) => {
    set({ bannersLoading: true });
    try {
      await apiClient.post("/banners", data);
      toast.success("Thêm banner thành công");
      get().fetchBanners();
    } catch (error) {
      console.error("Failed to create banner", error);
      toast.error("Thêm banner thất bại");
      throw error;
    } finally {
      set({ bannersLoading: false });
    }
  },
  updateBanner: async (id, data) => {
    set({ bannersLoading: true });
    try {
      await apiClient.put(`/banners/${id}`, data);
      toast.success("Cập nhật banner thành công");
      get().fetchBanners();
    } catch (error) {
      console.error("Failed to update banner", error);
      toast.error("Cập nhật banner thất bại");
      throw error;
    } finally {
      set({ bannersLoading: false });
    }
  },
  deleteBanner: async (id) => {
    set({ bannersLoading: true });
    try {
      await apiClient.delete(`/banners/${id}`);
      toast.success("Xóa banner thành công");
      get().fetchBanners();
    } catch (error) {
      console.error("Failed to delete banner", error);
      toast.error("Xóa banner thất bại");
    } finally {
      set({ bannersLoading: false });
    }
  },

  // Users - Fetch only for now (Admin Management)
  users: [],
  usersLoading: false,
  fetchUsers: async () => {
    set({ usersLoading: true });
    try {
      // Assuming endpoint is /users or /admin/users
      const res = await apiClient.get("/users");
      set({ users: res.data });
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      set({ usersLoading: false });
    }
  },

  // Utils
  uploadImage: async (file, folder = "other") => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    try {
      const res: any = await apiClient.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // The BE returns Media object, we want the URL
      return res.data.url;
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Tải ảnh thất bại");
      throw error;
    }
  },
}));

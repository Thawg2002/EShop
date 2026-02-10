// src/hooks/use-cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "@/lib/api-client";

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    featuredImage: string;
    slug: string;
  };
  variant?: {
    _id: string;
    size: string;
    color: string;
    price: number;
  };
  quantity: number;
  price: number;
  subtotal: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (
    productId: string,
    variantId?: string,
    quantity?: number,
  ) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isLoading: false,
      fetchCart: async () => {
        set({ isLoading: true });
        try {
          const res: any = await apiClient.get("/cart");
          set({
            items: res.data.items,
            totalItems: res.data.items.length,
            totalPrice: res.data.pricing.total,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
        }
      },
      addItem: async (productId, variantId, quantity = 1) => {
        set({ isLoading: true });
        try {
          await apiClient.post("/cart/add", { productId, variantId, quantity });
          await get().fetchCart();
        } finally {
          set({ isLoading: false });
        }
      },
      removeItem: async (itemId) => {
        set({ isLoading: true });
        try {
          await apiClient.delete(`/cart/items/${itemId}`);
          await get().fetchCart();
        } finally {
          set({ isLoading: false });
        }
      },
      updateQuantity: async (itemId, quantity) => {
        try {
          await apiClient.put("/cart/update", { itemId, quantity });
          await get().fetchCart();
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);

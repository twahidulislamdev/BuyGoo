import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => ({
          cart: [...state.cart, { ...product, quantity: product.quantity || 1 }],
        })),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
        })),
      updateQuantity: (product, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity } : item,
          ),
        })),
      clearCart: () =>
        set((state) => ({
          cart: [],
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

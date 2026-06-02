import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // Add Product In To Cart
      addToCart: (product) =>
        set((state) => ({
          cart: [
            ...state.cart,
            { ...product, quantity: product.quantity || 1 },
          ],
        })),

      // Update Quantity
      updateQuantity: (product, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity } : item,
          ),
        })),

      // Remove Product From Cart
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
        })),

      // Clear Cart
      clearCart: () =>
        set(() => ({
          cart: [],
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Delivery Method
export const DELIVERY_PRICES = {
  store: 0,
  home: 120,
};

export const getDeliveryShipping = (method = "store") =>
  DELIVERY_PRICES[method] ?? 0;

export const useDeliveryStore = create((set) => ({
  deliveryMethod: "store",
  setDeliveryMethod: (method) => set({ deliveryMethod: method }),
}));


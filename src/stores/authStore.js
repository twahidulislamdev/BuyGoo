import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { customerAuthApi } from "../config/api";

const persistUserKeys = (user) => {
  if (!user?.email) return;
  sessionStorage.setItem("buygoo_customer_logged_in", "true");
  sessionStorage.setItem("buygoo_customer_email", user.email);
  if (user.firstName) {
    sessionStorage.setItem("buygoo_customer_first_name", user.firstName);
  }
  if (user.lastName) {
    sessionStorage.setItem("buygoo_customer_last_name", user.lastName);
  }
};

const clearUserKeys = () => {
  sessionStorage.removeItem("buygoo_customer_logged_in");
  sessionStorage.removeItem("buygoo_customer_email");
  sessionStorage.removeItem("buygoo_customer_first_name");
  sessionStorage.removeItem("buygoo_customer_last_name");
  localStorage.removeItem("buygoo_customer_email");
};

export const getFullName = (user, email) => {
  if (user?.firstName || user?.lastName) {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  }
  const storedFirst = sessionStorage.getItem("buygoo_customer_first_name");
  const storedLast = sessionStorage.getItem("buygoo_customer_last_name");
  if (storedFirst || storedLast) {
    return `${storedFirst || ""} ${storedLast || ""}`.trim();
  }
  if (email) return email.split("@")[0];
  return "Customer";
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      email: null,

      setUser: (userData) => {
        if (userData?.email) {
          persistUserKeys(userData);
        }
        set({
          user: userData,
          isLoggedIn: true,
          email: userData?.email || null,
        });
      },

      logout: () => {
        clearUserKeys();
        customerAuthApi.logout().catch(() => {});
        set({
          user: null,
          isLoggedIn: false,
          email: null,
        });
      },

      checkLogin: async () => {
        const loggedIn =
          sessionStorage.getItem("buygoo_customer_logged_in") === "true";
        const email = sessionStorage.getItem("buygoo_customer_email");

        if (!loggedIn || !email) {
          set({ isLoggedIn: false, email: null, user: null });
          return false;
        }

        try {
          const response = await customerAuthApi.getCurrentUser();
          const user = response?.data?.user;
          if (user?.email) {
            persistUserKeys(user);
            set({
              isLoggedIn: true,
              email: user.email,
              user,
            });
            return true;
          }
        } catch {
          // Session may have expired; keep local fallback below.
        }

        const user = {
          email,
          firstName: sessionStorage.getItem("buygoo_customer_first_name") || "",
          lastName: sessionStorage.getItem("buygoo_customer_last_name") || "",
        };
        set({
          isLoggedIn: true,
          email,
          user,
        });
        return true;
      },

      getDisplayName: () => {
        const { user, email } = get();
        return getFullName(user, email);
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        email: state.email,
      }),
    },
  ),
);

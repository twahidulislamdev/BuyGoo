import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "/api/v1"
    : "https://buygoo-backend.onrender.com/api/v1");

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Customer Authentication API
export const customerAuthApi = {
  signup: (payload) => apiClient.post("/customer/signup", payload),
  login: (payload) => apiClient.post("/customer/login", payload),
  logout: () => apiClient.post("/customer/logout"),
  getCurrentUser: () => apiClient.get("/customer/currentuser"),
  verifyOtp: (payload) => apiClient.post("/customer/otpverify", payload),
  resendOtp: (payload) => apiClient.post("/customer/resendotp", payload),
};

// Orders API
export const orderApi = {
  createOrder: (payload) => apiClient.post("/order", payload),
  getMyOrders: () => apiClient.get("/order/myorders"),
  getAllOrders: () => apiClient.get("/order"),
  updateOrder: (id, payload) => apiClient.put(`/order/${id}`, payload),
};

export default apiClient;

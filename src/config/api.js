import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const customerAuthApi = {
  signup: (payload) => apiClient.post("/customer/signup", payload),
  login: (payload) => apiClient.post("/customer/login", payload),
  verifyOtp: (payload) => apiClient.post("/customer/otpverify", payload),
  resendOtp: (payload) => apiClient.post("/customer/resendotp", payload),
};

export default apiClient;

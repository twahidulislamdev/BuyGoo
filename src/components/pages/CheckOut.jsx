import React, { useState, useEffect } from "react";
import Container from "../Container";
import { CreditCard, Landmark, Banknote, Wallet, AlertCircle, Loader } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartStore, useDeliveryStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";
import { orderApi } from "../../config/api";


// Payment Options Data
const paymentOptions = [
  {
    id: "onlinePayment",
    label: "Online Payment",
    desc: "You will be redirected to online payment gateway to complete your payment securely.",
    icon: CreditCard,
  },
  {
    id: "cod",
    label: "Cash on delivery",
    desc: "Pay with cash when your order arrives at your door.",
    icon: Banknote,
  },
  {
    id: "bank",
    label: "Direct bank transfer",
    desc: "Use your Order ID as payment reference. Order ships after funds clear.",
    icon: Landmark,
  },
  {
    id: "check",
    label: "Check payments",
    desc: "Send a check to our mailing address. Allow 5–7 days for processing.",
    icon: Wallet,
  },
];

const isValidObjectId = (value) =>
  typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value);

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const { deliveryMethod } = useDeliveryStore();
  const { isLoggedIn, email: storedEmail, checkLogin } = useAuthStore();

  // Passed Data from Add to Cart Page
  const passedState = location.state || {};
  const products = passedState.items || cart || [];

  // Payment Method State
  const [payment, setPayment] = useState("onlinePayment");
  const [saveInfo, setSaveInfo] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: storedEmail || "",
    address: "",
    specialNote: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // Check login on mount
  useEffect(() => {
    const loggedIn = checkLogin();
    if (!loggedIn) {
      setShowLoginModal(true);
    }
  }, [checkLogin]);

  // Calculate Subtotal Price
  const subtotal =
    passedState.subtotal ??
    products.reduce((s, p) => s + p.price * (p.quantity || 1), 0);

  // Add Shipping Price
  const shipping = passedState.shipping ?? (deliveryMethod === "home" ? 5 : 0);
  
  // Calculate Total Price
  const total = (subtotal + shipping).toFixed(2);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  // Validate form
  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.address
    ) {
      setError("All required fields must be filled");
      return false;
    }

    if (products.length === 0) {
      setError("Your cart is empty");
      return false;
    }

    return true;
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderPayload = {
        items: products.map((item) => ({
          id: item.id || item.productId,
          productId: isValidObjectId(item.productId)
            ? item.productId
            : isValidObjectId(item.id)
            ? item.id
            : undefined,
          title: item.name || item.title,
          thumbnail: item.image || item.imgSrcFirst || "",
          price: item.price,
          quantity: item.quantity || 1,
        })),
        shipping: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          address: formData.address,
          city: formData.email.split("@")[0], // Placeholder, ideally should have city field
        },
        couponCode: couponCode || undefined,
        paymentMethod: payment,
        specialNote: formData.specialNote,
      };

      const response = await orderApi.createOrder(orderPayload);

      if (response.data.success) {
        // Clear cart after successful order
        clearCart();
        
        // Show success message
        alert(`Order placed successfully! Order ID: ${response.data.data._id}`);
        
        // Redirect to home or orders page
        navigate("/account");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Failed to place order. Please try again.";
      setError(errorMessage);
      console.error("Order error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3">
      <Container>
        {/* Page Header */}
        <h1
          className="text-center font-serif text-[32px] font-semibold tracking-tight mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Checkout
        </h1>
        <p className="text-center text-[13px] text-gray-400 mb-9">
          Review your order and complete your purchase
        </p>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-red-500" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Login Required</h2>
              </div>
              <p className="text-gray-600 mb-6">
                You need to be logged in to place an order. Please log in to your account to continue.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-6 items-start justify-center">
          {/* ── LEFT: Billing Form ── */}
          <div className="flex-1 w-[50%] border border-neutral-300 rounded-xl p-5">
            <h2
              className="text-[17px] font-medium mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Billing Details
            </h2>

            {/* First / Last */}
            <div className="flex gap-3">
              <Field label="First Name" required>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Field>
              <Field label="Last Name" required>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Field>
            </div>

            {/* Phone / Email */}
            <div className="flex gap-3">
              <Field label="Phone Number" required>
                <input
                  type="text"
                  name="phone"
                  placeholder="+1 555 000 0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Field>
              <Field label="Email Address" required>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Field>
            </div>

            {/* Address */}
            <Field label="Address" required>
              <input
                type="text"
                name="address"
                placeholder="123 Main Street, City, Country"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Field>

            {/* Special Note */}
            <Field label="Special Note" optional>
              <textarea
                name="specialNote"
                rows={3}
                placeholder="Notes about your order, e.g. special notes for delivery."
                value={formData.specialNote}
                onChange={handleInputChange}
              />
            </Field>

            {/* Save info */}
            <label className="flex items-center gap-2.5 mt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="w-4 h-4 accent-black cursor-pointer"
              />
              <span className="text-[12px] text-gray-400">
                Save this info for faster checkout next time
              </span>
            </label>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl border border-[#e8e6e0] overflow-hidden">
              {/* Card header */}
              <div className="px-5 py-4 border-b border-[#f0ede5]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                  Your Order ({products.length} items)
                </p>
              </div>

              {/* Product rows */}
              <div className="px-5 py-4 flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                {products.length > 0 ? (
                  products.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="w-[85px] h-[56px] rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-[#f0ede5]">
                        <img
                          src={p.image || p.imgSrcFirst}
                          alt={p.name || p.title}
                          className="w-full h-full p-1 object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-900 truncate">
                          {p.name || p.title}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Quantity: {p.quantity || 1}
                        </p>
                      </div>
                      <p className="text-[13px] font-semibold text-gray-900 whitespace-nowrap">
                        ৳{p.price}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-4">Your cart is empty</p>
                )}
              </div>

              {/* Pricing rows */}
              <div className="px-5 pb-5">
                <div className="h-px bg-[#f0ede5] mb-3" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500">Subtotal</span>
                    <span className="text-[13px] text-gray-800">
                      ৳{Number(subtotal).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500">Shipping</span>
                    <span
                      className={`text-[13px] ${shipping === 0 ? "font-medium text-emerald-500" : "text-gray-800"}`}
                    >
                      {shipping === 0
                        ? "Free"
                        : `৳${Number(shipping).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="h-px bg-[#f0ede5] my-1" />
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-[17px] font-semibold text-gray-900">
                      ৳{total}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-white rounded-2xl border border-[#e8e6e0] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400 mb-3">
                Have a Coupon Code?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 border border-[#e5e3dc] rounded-lg text-[13px] outline-none focus:border-gray-900"
                />
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-[12px] font-semibold transition">
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
              {/* Card header */}
              <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-400">
                  Payment Method
                </p>
                <span className="text-[10px] bg-neutral-900 text-white font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Secure Checkout
                </span>
              </div>

              <div className="px-4 py-4 flex flex-col gap-3">
                {paymentOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = payment === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => setPayment(opt.id)}
                      className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ease-out transform select-none ${
                        isActive
                          ? "border-black bg-neutral-50 shadow-sm translate-x-0.5"
                          : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/40 hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Icon tile */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-black text-white scale-110 shadow-sm"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        <Icon
                          size={18}
                          className="transition-transform duration-300"
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-[13.5px] font-bold transition-colors duration-300 ${
                              isActive
                                ? "text-black font-extrabold"
                                : "text-neutral-700"
                            }`}
                          >
                            {opt.label}
                          </p>
                          {opt.id === "onlinePayment" && (
                            <span className="inline-block text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wide">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[11px] mt-1 leading-relaxed transition-colors duration-300 ${
                            isActive ? "text-neutral-600" : "text-neutral-400"
                          }`}
                        >
                          {opt.desc}
                        </p>
                      </div>

                      {/* Custom radio dot */}
                      <div className="flex items-center self-center h-full">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isActive
                              ? "border-black bg-black scale-110 shadow-sm"
                              : "border-neutral-300 bg-white"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full bg-white transition-all duration-300 ${
                              isActive
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-50"
                            }`}
                          />
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-[#111] hover:bg-[#2a2a2a] disabled:bg-gray-400 active:scale-[0.99] text-white text-[13px] font-semibold uppercase tracking-wider py-4 rounded-[14px] transition-all duration-150 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>

            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              Your data is used to process your order per our{" "}
              <a href="#" className="text-gray-900 underline">
                privacy policy
              </a>
              .
            </p>
          </div>
          {/* ── END RIGHT PANEL ── */}
        </div>
      </Container>
    </div>
  );
};

/* ── Helper components ── */

const Field = ({ label, required, optional, children }) => (
  <div className="mb-4 flex-1">
    <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
      {optional && (
        <span className="text-gray-300 font-normal normal-case tracking-normal ml-1">
          (optional)
        </span>
      )}
    </label>
    {React.cloneElement(children, {
      className:
        "w-full px-3.5 py-2.5 border-[1.5px] border-[#e5e3dc] rounded-[10px] text-[14px] text-gray-900 bg-[#fafaf8] outline-none transition focus:border-gray-900 focus:bg-white placeholder:text-gray-300",
    })}
  </div>
);

const SummaryRow = ({ label, value, valueGreen, bold }) => (
  <div className={`flex justify-between items-center ${bold ? "pt-1" : ""}`}>
    <span
      className={`${bold ? "text-[15px] font-semibold text-gray-900" : "text-[13px] text-gray-500"}`}
    >
      {label}
    </span>
    <span
      className={`${
        bold
          ? "text-[15px] font-semibold text-gray-900"
          : valueGreen
            ? "text-[13px] font-medium text-green-500"
            : "text-[13px] text-gray-700"
      }`}
    >
      {value}
    </span>
  </div>
);

export default CheckOut;

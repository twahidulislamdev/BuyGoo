import React, { useState } from "react";
import Container from "../Container";
import { CreditCard, Landmark, Banknote, Wallet } from "lucide-react";

const products = [
  {
    id: 1,
    image: "../assets/images/checkout/product-1.png",
    name: "Calvin Shorts",
    qty: 1,
    price: 62,
  },
  {
    id: 2,
    image: "../assets/images/checkout/product-2.png",
    name: "Cableknit Shawl",
    qty: 1,
    price: 99,
  },
  {
    id: 3,
    image: "../assets/images/checkout/product-3.png",
    name: "Kirby T-Shirt",
    qty: 1,
    price: 17,
  },
];

const paymentOptions = [
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
  {
    id: "cod",
    label: "Cash on delivery",
    desc: "Pay with cash when your order arrives at your door.",
    icon: Banknote,
  },
  {
    id: "paypal",
    label: "PayPal",
    desc: "You will be redirected to PayPal to complete your payment securely.",
    icon: CreditCard,
  },
];

const CheckOut = () => {
  const [payment, setPayment] = useState("bank");
  const [saveInfo, setSaveInfo] = useState(false);

  const subtotal = products.reduce((s, p) => s + p.price * p.qty, 0);
  const vat = 19;
  const total = subtotal + vat;

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
                <input type="text" placeholder="John" />
              </Field>
              <Field label="Last Name" required>
                <input type="text" placeholder="Doe" />
              </Field>
            </div>

            <Field label="Company Name" optional>
              <input type="text" placeholder="Acme Inc." />
            </Field>

            <Field label="Street Address" required>
              <input type="text" placeholder="123 Main Street" />
            </Field>

            <Field label="Apartment, floor, etc." optional>
              <input type="text" placeholder="Apt 4B" />
            </Field>

            {/* City / Zip */}
            <div className="flex gap-3">
              <Field label="Town / City" required>
                <input type="text" placeholder="New York" />
              </Field>
              <Field label="Zip Code" required>
                <input type="text" placeholder="10001" />
              </Field>
            </div>

            {/* Phone / Email */}
            <div className="flex gap-3">
              <Field label="Phone Number" required>
                <input type="text" placeholder="+1 555 000 0000" />
              </Field>
              <Field label="Email Address" required>
                <input type="email" placeholder="john@example.com" />
              </Field>
            </div>

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
          </div>

          {/* ── RIGHT PANEL (improved) ── */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4">

            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl border border-[#e8e6e0] overflow-hidden">
              {/* Card header */}
              <div className="px-5 py-4 border-b border-[#f0ede5]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                  Your Order
                </p>
              </div>

              {/* Product rows */}
              <div className="px-5 py-4 flex flex-col gap-3">
                {products.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-[52px] h-[56px] rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-[#f0ede5]">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-900 truncate">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Qty: {p.qty}
                      </p>
                    </div>
                    <p className="text-[13px] font-semibold text-gray-900 whitespace-nowrap">
                      ${p.price}.00
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing rows */}
              <div className="px-5 pb-5">
                <div className="h-px bg-[#f0ede5] mb-3" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500">Subtotal</span>
                    <span className="text-[13px] text-gray-800">${subtotal}.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500">Shipping</span>
                    <span className="text-[13px] font-medium text-emerald-500">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500">VAT</span>
                    <span className="text-[13px] text-gray-800">${vat}.00</span>
                  </div>
                  <div className="h-px bg-[#f0ede5] my-1" />
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-semibold text-gray-900">Total</span>
                    <span className="text-[17px] font-semibold text-gray-900">${total}.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-2xl border border-[#e8e6e0] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#f0ede5]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                  Payment Method
                </p>
              </div>

              <div className="px-4 py-3 flex flex-col gap-2">
                {paymentOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = payment === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => setPayment(opt.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                        isActive
                          ? "border-gray-900 bg-gray-50"
                          : "border-[#e8e6e0] hover:border-gray-300 hover:bg-gray-50/60"
                      }`}
                    >
                      {/* Icon tile */}
                      <div
                        className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive ? "bg-gray-900" : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          size={17}
                          className={isActive ? "text-white" : "text-gray-500"}
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-900 leading-tight">
                          {opt.label}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed truncate">
                          {opt.desc}
                        </p>
                      </div>

                      {/* Custom radio dot */}
                      <div
                        className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isActive
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                      >
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-gray-900" />
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="button"
              className="w-full bg-[#111] hover:bg-[#2a2a2a] active:scale-[0.99] text-white text-[13px] font-semibold uppercase tracking-wider py-4 rounded-[14px] transition-all duration-150"
            >
              Place Order 
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

/* ── Helper components (unchanged) ── */

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
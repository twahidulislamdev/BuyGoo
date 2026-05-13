import React, { useState } from "react";
import Container from "../Container";

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
  },
  {
    id: "check",
    label: "Check payments",
    desc: "Send a check to our mailing address. Allow 5–7 days for processing.",
  },
  {
    id: "cod",
    label: "Cash on delivery",
    desc: "Pay with cash when your order arrives at your door.",
  },
  {
    id: "paypal",
    label: "PayPal",
    desc: "You will be redirected to PayPal to complete your payment securely.",
  },
];

const CheckOut = () => {
  const [payment, setPayment] = useState("bank");
  const [saveInfo, setSaveInfo] = useState(false);

  const subtotal = products.reduce((s, p) => s + p.price * p.qty, 0);
  const vat = 19;
  const total = subtotal + vat;

  return (
    <div className="py-10 px-4">
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
          <div className="flex-1 w-[50%]">
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

          {/* ── RIGHT PANEL ── */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4">
            {/* Order Summary */}
            <div className="bg-white rounded-[20px] border border-[#e8e6e0] p-6">
              <h2
                className="text-[17px] font-medium mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Your Order
              </h2>

              {/* Product rows */}
              <div className="flex flex-col gap-3 mb-4">
                {products.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    {/* Image / icon */}
                    <div className="flex items-center justify-center text-2xl flex-shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-[50px] h-[50px] object-cover rounded-[10px]"
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
                      ${p.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#f0ede5] my-3" />

              <div className="space-y-2">
                <SummaryRow label="Subtotal" value={`$${subtotal}`} />
                <SummaryRow label="Shipping" value="Free" valueGreen />
                <SummaryRow label="VAT" value={`$${vat}`} />
                <div className="h-px bg-[#f0ede5]" />
                <SummaryRow label="Total" value={`$${total}`} bold />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-[20px] border border-[#e8e6e0] p-6">
              <h2
                className="text-[17px] font-medium mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Payment Method
              </h2>
              <div className="flex flex-col gap-2">
                {paymentOptions.map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => setPayment(opt.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border-[1.5px] cursor-pointer transition-all ${
                      payment === opt.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-[#e8e6e0] hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === opt.id}
                      onChange={() => setPayment(opt.id)}
                      className="mt-0.5 accent-black cursor-pointer flex-shrink-0"
                    />
                    <div>
                      <p className="text-[13px] font-medium text-gray-900">
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Place Order */}
            <button
              type="button"
              className="w-full bg-[#111] hover:bg-[#222] active:scale-[0.99] text-white text-[13px] font-semibold uppercase tracking-wider py-4 rounded-[14px] transition-all"
            >
              Place Order →
            </button>

            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              Your data is used to process your order per our{" "}
              <a href="#" className="text-gray-900 underline">
                privacy policy
              </a>
              .
            </p>
          </div>
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

import { useState } from "react";
import Container from "../Container";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GalaxyS25Black from "../../assets/titaniumBlack.jpg";
import Iphone16Black from "../../assets/phoneThree.jpg";

const initialItems = [
  {
    id: 1,
    name: "Premium Cotton Hoodie",
    color: "Black",
    size: "Size L",
    price: 120,
    quantity: 2,
    image: GalaxyS25Black,
  },
  {
    id: 2,
    name: "Classic Sneakers",
    color: "White",
    size: "Size 42",
    price: 85,
    quantity: 1,
    image: Iphone16Black,
  },
];

export default function ShoppingCart() {
  const [items, setItems] = useState(initialItems);
  const [delivery, setDelivery] = useState("local");
  const [promo, setPromo] = useState("");

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = delivery === "local" ? 5 : 20;
  const tax = parseFloat((subtotal * 0.03).toFixed(2));
  const total = (subtotal + shipping + tax).toFixed(2);

  return (
    <div className="bg-white text-black font-sans p-2 flex items-start justify-center">
      <Container>
        <div className="w-full w-[60%] flex flex-col lg:flex-row gap-5">
          {/* LEFT PANEL */}
          <div className="flex-1 flex flex-col gap-3 ">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-lg lg:text-3xl font-bold mb-2 text-black">
                Shopping Cart
              </h1>
              <Link to="/shop">
                <button className="text-xs lg:text-lg text-black font-bold flex items-center gap-1 cursor-pointer ">
                  <ArrowLeft /> Continue Shopping
                </button>
              </Link>
            </div>

            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 flex gap-3.5 items-start border border-neutral-300 shadow-sm"
              >
                {/* Icon */}
                <div className="w-[100px] h-[100px] rounded-[14px] bg-gray-100 flex items-center justify-center text-4xl shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-base text-gray-900 leading-snug mb-1.5">
                        {item.name}
                      </h2>
                      <div className="flex gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                          {item.color === "White" && (
                            <span className="w-2 h-2 rounded-full bg-white border border-gray-300 shrink-0" />
                          )}
                          {item.color}
                        </span>
                        <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                          {item.size}
                        </span>
                      </div>
                    </div>
                    {/* Delete Cart Item */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-[30px] h-[30px] rounded-lg bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-800 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition shrink-0 cursor-pointer"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3.5">
                    <div className="flex items-center bg-neutral-100 border border-neutral-300 rounded-[10px] overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-[34px] h-[34px] flex items-center justify-center text-neutral-500 hover:text-gray-900 hover:bg-white text-xl font-semibold transition cursor-pointer"
                      >
                        −
                      </button>
                      <div className="w-px h-4 bg-neutral-200" />
                      <span className="min-w-[28px] text-center text-[13px] font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <div className="w-px h-4 bg-neutral-200" />
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-[34px] h-[34px] flex items-center justify-center text-neutral-500 hover:text-gray-900 hover:bg-white text-xl font-semibold transition cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-[17px] font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        ${item.price} / Piece
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*--------------- RIGHT PANEL — Order Summary ------------------ */}
          <div className="w-full lg:w-[40%] flex-shrink-0 border border-neutral-300 rounded-xl py-1">
            <div className=" rounded-2xl px-5 py-1 flex flex-col gap-3.5">
              <h2 className="text-2xl font-bold text-black">Order Summary</h2>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-2 text-sm text-black">
                <div className="flex justify-between text-balck text-base font-medium">
                  <span>Subtotal</span>
                  <span className="text-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black text-base font-medium">
                  <span>Shipping</span>
                  <span className="text-black">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black text-base font-medium">
                  <span>Tax (3%)</span>
                  <span className="text-black">${tax}</span>
                </div>
              </div>

              <div className="border-t border-[#3a3a3a]" />

              <div className="flex justify-between font-bold text-base text-black">
                <span>Total</span>
                <span>${total}</span>
              </div>

              {/* Delivery Method */}
              <div>
                <p className="text-sm font-bold text-black uppercase tracking-wider mb-2.5">
                  Delivery Method
                </p>

                <div className="flex flex-col gap-2">
                  {[
                    {
                      id: "local",
                      icon: "🏪",
                      label: "Local Pickup",
                      sub: "Ready in 2–3 Days",
                      price: "$5",
                    },
                    {
                      id: "home",
                      icon: "🚚",
                      label: "Home Delivery",
                      sub: "Arrives in 24 Hours",
                      price: "$20",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDelivery(opt.id)}
                      aria-pressed={delivery === opt.id}
                      className={`flex items-center justify-between p-3 rounded-[14px] transition text-left w-full border cursor-pointer ${
                        delivery === opt.id
                          ? "bg-black text-white border-gray-900 transition duration-200"
                          : "border-gray-200 bg-white text-black hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-xl transition ${
                            delivery === opt.id
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-black"
                          }`}
                        >
                          {opt.icon}
                        </div>

                        <div>
                          <p
                            className={`text-[13px] font-semibold ${
                              delivery === opt.id
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {opt.label}
                          </p>

                          <p
                            className={`text-[11px] ${
                              delivery === opt.id
                                ? "text-gray-200"
                                : "text-gray-600"
                            }`}
                          >
                            {opt.sub}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-[14px] font-bold ${
                            delivery === opt.id ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {opt.price}
                        </span>

                        <div
                          className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition ${
                            delivery === opt.id
                              ? "border-white"
                              : "border-gray-300"
                          }`}
                        >
                          <div
                            className={`w-[9px] h-[9px] rounded-full transition-all duration-150 ${
                              delivery === opt.id
                                ? "opacity-100 scale-100 bg-white"
                                : "opacity-0 scale-50 bg-gray-900"
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Promo Code Section ── */}
              <div className="space-y-3">
                {/* Heading */}
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                  Promo Code
                </h3>

                {/* Promo Input */}
                <div className="flex items-center gap-3 border border-neutral-300 focus-within:border-black focus-within:ring-4 focus-within:ring-black/5 rounded-2xl px-3 py-3 transition-all duration-200 bg-white">
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-lg">
                    🎁
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Enter promo or gift code"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-black placeholder:text-neutral-400 outline-none"
                  />

                  {/* Apply Button */}
                  <button className="bg-black hover:bg-neutral-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.95]">
                    Apply
                  </button>
                </div>
              </div>

              {/* ── Checkout Button ── */}
              <button className="w-full bg-black text-white text-lg font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:bg-neutral-800 cursor-pointer active:scale-[0.99] shadow-sm">
                <span>Proceed to checkout</span>
                <span className="text-xl">
                  <ArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

import Container from "../Container";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";

export default function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const items = cart.length > 0 ? cart : [];

  // Update Quantity
  const updateQty = (id, delta) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newQty = (item.quantity || 1) + delta;
      if (newQty <= 0) {
        removeFromCart({ id });
      } else {
        updateQuantity({ id }, newQty);
      }
    }
  };
  // Remove items
  const removeItem = (id) => {
    removeFromCart({ id });
  };
  // Subtotal
  const subtotal = items.reduce(
    (sum, i) => sum + i.price * (i.quantity || 1),
    0,
  );

  const total = subtotal.toFixed(2);

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
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400 border border-neutral-300 rounded-2xl bg-white shadow-sm">
                <svg
                  className="w-16 h-16 text-gray-300 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <p className="text-base font-medium">
                  Your shopping cart is empty
                </p>
                <Link to="/shop">
                  <button className="bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition hover:bg-neutral-800">
                    Go to Shop
                  </button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 flex gap-3.5 items-start border border-neutral-300 shadow-sm"
                >
                  {/* Icon */}
                  <div className="w-[100px] h-[100px] rounded-[14px] bg-gray-100 flex items-center justify-center text-4xl shrink-0">
                    <img
                      src={item.image || item.imgSrcFirst}
                      alt={item.name || item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info Like: Title, Price, Colors, Size, RAM, Storage, Quantity */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-semibold text-base text-gray-900 leading-snug mb-1.5">
                          {item.name || item.title}
                        </h2>
                        <div className="flex gap-1.5 flex-wrap">
                          {(item.color || item.colors) && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                              {(item.color === "White" ||
                                item.colors === "White") && (
                                <span className="w-2 h-2 rounded-full bg-white border border-gray-300 shrink-0" />
                              )}
                              {item.color || item.colors}
                            </span>
                          )}
                          {(item.size || item.sizes) && (
                            <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                              {item.size || item.sizes}
                            </span>
                          )}
                          {item.ram && (
                            <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                              RAM: {item.ram}
                            </span>
                          )}
                          {item.storage && (
                            <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                              Storage: {item.storage}
                            </span>
                          )}
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

                    {/* Update Quantity */}
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
                          {item.quantity || 1}
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
                        <p className="text-xl font-bold text-black">
                          <span className="text-lg font-extrabold text-black">
                            ৳
                          </span>{" "}
                          {(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                        <p className="text-xs text-black">
                          <span className="text-lg font-bold text-black">
                            ৳
                          </span>{" "}
                          {item.price} / Piece
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/*--------------- RIGHT PANEL — Order Summary ------------------ */}
          <div className="w-full lg:w-[40%] flex-shrink-0 border border-neutral-300 rounded-xl py-1">
            <div className=" rounded-2xl px-5 py-1 flex flex-col gap-3.5">
              <h2 className="text-2xl font-bold text-black">Order Summary</h2>

              {/* Subtotal */}
              <div className="flex flex-col gap-2 text-sm text-black">
                <div className="flex justify-between text-black text-base font-medium">
                  <span>Subtotal</span>
                  <span className="text-black">
                    <span className="text-base font-extrabold text-black">
                      ৳
                    </span>
                    {subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#3a3a3a]" />

              {/* Total Product Price */}
              <div className="flex justify-between font-bold text-base text-black">
                <span>Total</span>
                <span className="text-lg font-bold text-black">
                  <span className="text-base font-extrabold text-black">৳</span>{" "}
                  {total}
                </span>
              </div>

              {/* ── Checkout Button ── */}
              <Link
                to="/checkout"
                state={{ items, subtotal }}
                className="w-full bg-black text-white text-lg font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:bg-neutral-800 cursor-pointer active:scale-[0.99] shadow-sm"
              >
                <span>Proceed to checkout</span>
                <span className="text-xl">
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

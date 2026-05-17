import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../stores/cartStore";

const CartSidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const totalItems = cart.reduce((s, i) => s + (i.quantity || 1), 0);

  const removeProduct = (id) => {
    removeFromCart({ id });
  };

  const updateCartQuantity = (id, quantity) => {
    updateQuantity({ id }, quantity);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const total = subtotal;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[199] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[340px] sm:w-[390px] bg-white z-[200] flex flex-col shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-mainColor" />
            <span className="text-[15px] font-semibold text-gray-900 tracking-wide">
              Your Bag
              <span className="ml-2 text-xs font-bold bg-mainColor text-white rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm font-medium">Your bag is empty</p>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-mainColor underline underline-offset-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white rounded-2xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Image */}
                <div className="w-[85px] h-[95px] rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100 relative">
                  <img
                    src={item.imgSrcFirst}
                    alt={item.title || "Product image"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-gray-900 leading-tight">
                        {item.title}
                      </p>

                      {/* Color and Size */}
                      {((item.colors && item.colors.length > 0) || 
                        (item.sizes && item.sizes.length > 0)) && (
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[12px] font-medium text-gray-500">
                          {item.colors && item.colors.length > 0 && (
                            <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-0.5 rounded-md text-gray-600">
                              {item.colors[0]?.hex && (
                                <span 
                                  className="w-2.5 h-2.5 rounded-full shadow-sm border border-black/10" 
                                  style={{ backgroundColor: item.colors[0].hex }}
                                ></span>
                              )}
                              <span>{item.colors[0]?.name || "Color"}</span>
                            </div>
                          )}
                          {item.sizes && item.sizes.length > 0 && (
                            <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-600">
                              {item.sizes[0]?.name || item.sizes[0]}
                            </span>
                          )}
                        </div>
                      )}

                      {item.variant && !item.colors && !item.sizes && (
                        <p className="text-[12px] text-gray-400 mt-1">
                          {item.variant}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500 transition-all flex-shrink-0 bg-white shadow-sm"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty control */}
                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1 bg-gray-50/50">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.id,
                            Math.max(1, (item.quantity || 1) - 1),
                          )
                        }
                        className="w-5 h-5 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:text-mainColor hover:border-mainColor transition-colors shadow-sm"
                      >
                        <Minus size={12} strokeWidth={2.5} />
                      </button>
                      <span className="text-[13px] font-bold text-gray-800 w-4 text-center">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, (item.quantity || 1) + 1)
                        }
                        className="w-5 h-5 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:text-mainColor hover:border-mainColor transition-colors shadow-sm"
                      >
                        <Plus size={12} strokeWidth={2.5} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end">
                      <span className="text-[15px] font-extrabold text-gray-900">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] font-medium text-gray-400 mt-0.5">
                          ${item.price.toFixed(2)} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100 bg-gray-50/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Subtotal
              </span>
              <span className="text-lg font-bold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Link to="/addtocart" onClick={onClose}>
              <button className="w-full py-3 rounded-xl border-2 border-black text-black text-base font-semibold tracking-widest hover:bg-black hover:text-white transition-all duration-200 mb-2">
                VIEW CART
              </button>
            </Link>
            <Link to="/checkout" onClick={onClose}>
              <button className="w-full py-4 rounded-xl bg-black text-white text-base font-semibold tracking-widest hover:bg-gray-800 transition-all duration-200">
                CHECKOUT
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

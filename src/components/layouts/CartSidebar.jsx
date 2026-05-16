import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQty, onRemove }) => {
  const sidebarRef = useRef(null);

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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

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
                {cartItems.reduce((s, i) => s + i.qty, 0)}
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
          {cartItems.length === 0 ? (
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
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Image */}
                <div className="w-[80px] h-[90px] rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900 leading-tight">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {item.variant}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 ml-1"
                    >
                      <X size={12} className="text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty control */}
                    <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1">
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="text-gray-500 hover:text-mainColor transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-[13px] font-semibold text-gray-800 w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="text-gray-500 hover:text-mainColor transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-[14px] font-bold text-gray-900">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
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

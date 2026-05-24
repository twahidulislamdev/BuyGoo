import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useCartStore } from "../stores/cartStore";

const ProductCard = ({
  title,
  price,
  badgeText,
  ram,
  storage,
  imgSrcFirst,
  imgAlt,
  currency = "৳",
  isSmall = false,
  sizes = [],
  colors = [],
  productClassName,
  priceClassName,
  badgeClassName,
}) => {
  const { cart, addToCart } = useCartStore();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const colorVal = Array.isArray(colors)
    ? colors[0]?.name || colors[0]
    : typeof colors === "object"
    ? colors?.name
    : colors;

  const sizeVal = Array.isArray(sizes)
    ? sizes[0]?.name || sizes[0]
    : typeof sizes === "object"
    ? sizes?.name
    : sizes;

  const product = {
    id: title,
    title,
    price,
    ram,
    storage,
    imgSrcFirst,
    imgAlt,
    sizes: sizeVal,
    colors: colorVal,
    quantity: 1,
  };
  const isInCart = cart.some((item) => item.id === product.id);
  // Add to cart Button
  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  // Go to Product Details Page with Add to Cart Data
  const handleProductDetails = () => {
    const productToAdd = {
      id: product.id,
      title,
      price,
      ram,
      storage,
      imgSrcFirst,
      imgAlt,
      sizes: sizeVal,
      colors: colorVal,
      quantity: 1,
    };
    // Store data in session storage to use in product details page
    sessionStorage.setItem("productToAdd", JSON.stringify(productToAdd));
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col bg-white rounded-2xl shadow-sm border border-neutral-400 overflow-hidden transition-shadow duration-300 hover:shadow-md ${productClassName}`}
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* Badge */}
      {badgeText && (
        <div
          className={`absolute top-3 left-3 z-10 transform transition-transform duration-300 hover:scale-110`}
        >
          <div
            className={`${badgeClassName} py-1.5 px-3 text-xs font-bold rounded-xl shadow-lg backdrop-blur-sm border border-white border-opacity-30 uppercase tracking-wide`}
            style={{
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            {badgeText}
          </div>
        </div>
      )}

      {/* Wishlist Icon */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
            isWishlisted
              ? "bg-rose-500 text-white"
              : "bg-white border border-neutral-300 text-neutral-500 hover:bg-rose-50 hover:text-rose-500"
          }`}
        >
          {isWishlisted ? <HiHeart className="text-lg" /> : <HiOutlineHeart className="text-lg" />}
        </button>
      </div>

      {/* Image Area */}
      <Link to={"/productdetails"}>
        <button
          onClick={handleProductDetails}
          className="w-full group cursor-pointer"
        >
          <div
            className="relative w-full flex items-center justify-center overflow-hidden"
            style={{ height: isSmall ? "140px" : "260px" }}
          >
            <img
              src={imgSrcFirst}
              alt={imgAlt}
              className={`object-contain w-auto transition-transform duration-500 group-hover:scale-105 ${isSmall ? "h-[100px]" : "h-[220px]"}`}
            />
          </div>
        </button>
      </Link>
      {/* Info Area */}
      <div
        className={`px-4 pb-5 flex flex-col flex-grow rounded-t-2xl border-t-1 border-neutral-300 ${isSmall ? "pt-2 gap-1.5" : "pt-4 gap-3"}`}
      >
        {/* Title */}
        <h3
          className={`text-[#1a1a1a] font-semibold leading-snug text-center ${isSmall ? "text-xs" : "text-xl"}`}
        >
          {title}
        </h3>

        {/* Price */}
        <div
          className={`flex justify-center items-baseline gap-1 ${priceClassName}`}
        >
          <span
            className={`text-[#1a1a1a] font-extrabold ${isSmall ? "text-lg" : "text-3xl"}`}
          >
            {currency}
          </span>
          <span
            className={`text-[#1a1a1a] font-bold tracking-tight ${isSmall ? "text-sm" : "text-xl"}`}
          >
            {typeof price === "number" ? price.toLocaleString() : price}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center rounded-full border border-neutral-500 font-medium transition-all duration-250 cursor-pointer ${
              isInCart
                ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                : "text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
            } ${isSmall ? "px-2 lg:px-5 py-1 lg:py-2 text-sm" : "text-sm lg:text-base px-2 lg:px-5 py-1.5 lg:py-2"}`}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`flex items-center justify-center rounded-full border border-neutral-500 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-250 ${
              isWishlisted
                ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600 hover:border-rose-600"
                : "text-[#1a1a1a]"
            } cursor-pointer ${isSmall ? "w-9 h-9" : "w-8 h-8 lg:w-10 lg:h-10"}`}
          >
            {isWishlisted ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

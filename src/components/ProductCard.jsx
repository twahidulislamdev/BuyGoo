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
  priceClassName,
  badgeClassName,
  productClassName,
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
      quantity: 1,
      sizes: sizeVal,
      colors: colorVal,
    };
    // Store data in session storage to use in product details page
    sessionStorage.setItem("productToAdd", JSON.stringify(productToAdd));
  };

  return (
    <div
      className={`relative w-full h-[250px] lg:h-full flex flex-col bg-white rounded-2xl shadow-sm border border-neutral-400 overflow-hidden transition-shadow duration-300 hover:shadow-md ${productClassName}`}
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* Badge */}
      {badgeText && (
        <div
          className={`absolute top-2 left-2 lg:top-3 lg:left-3 z-10 transform transition-transform duration-300 hover:scale-110`}
        >
          <div
            className={`${badgeClassName} py-1 px-2 lg:py-1.5 lg:px-3 text-[10px] lg:text-xs font-bold rounded-xl shadow-lg backdrop-blur-sm border border-white border-opacity-30 uppercase tracking-wide`}
            style={{
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            {badgeText}
          </div>
        </div>
      )}

      {/* Wishlist Icon */}
      <div className="absolute top-2 right-2 lg:top-3 lg:right-3 z-10 transition-opacity duration-200">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
            isWishlisted
              ? "bg-rose-500 text-white"
              : "bg-white border border-neutral-300 text-neutral-500 hover:bg-rose-50 hover:text-rose-500"
          }`}
        >
          {isWishlisted ? (
            <HiHeart className="text-base lg:text-lg" />
          ) : (
            <HiOutlineHeart className="text-base lg:text-lg" />
          )}
        </button>
      </div>

      {/* Image Area */}
      <Link to={"/productdetails"}>
        <button
          onClick={handleProductDetails}
          className="w-full group cursor-pointer"
        >
          <div
            className={`relative w-full flex items-center justify-center overflow-hidden h-[130px] ${isSmall ? "lg:h-[170px]" : "lg:h-[210px]"}`}
          >
            <img
              src={imgSrcFirst}
              alt={imgAlt}
              className={`object-contain w-auto transition-transform duration-500 group-hover:scale-105 h-[110px] ${isSmall ? "lg:h-[170px]" : "lg:h-[210px]"}`}
            />
          </div>
        </button>
      </Link>
      {/* Info Area */}
      <div
        className={`px-2 pb-2 lg:px-3 lg:pb-4 flex flex-col flex-grow rounded-t-2xl border-t-1 border-neutral-300 pt-1.5 gap-1 ${isSmall ? "lg:pt-2 lg:gap-1.5" : "lg:pt-4 lg:gap-3"}`}
      >
        {/* Title */}
        <h3
          className={`text-[#1a1a1a] font-semibold leading-snug text-center text-sm lg:text-lg ${isSmall ? "" : "lg:text-xl"}`}
        >
          {title}
        </h3>

        {/* Price */}
        <div
          className={`flex justify-center items-baseline gap-1 ${priceClassName}`}
        >
          <span
            className={`text-[#1a1a1a] font-extrabold text-base ${isSmall ? "lg:text-lg" : "lg:text-3xl"}`}
          >
            {currency}
          </span>
          <span
            className={`text-[#1a1a1a] font-bold tracking-tight text-xs ${isSmall ? "lg:text-sm" : "lg:text-xl"}`}
          >
            {typeof price === "number" ? price.toLocaleString() : price}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center mt-auto w-full">
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center rounded-full border border-neutral-500 font-medium transition-all duration-250 cursor-pointer ${
              isInCart
                ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                : "text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
            } px-1.5 py-1.5 text-[11px] ${isSmall ? "lg:px-5 lg:py-2 lg:text-sm" : "lg:text-base lg:px-5 lg:py-2.5"}`}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

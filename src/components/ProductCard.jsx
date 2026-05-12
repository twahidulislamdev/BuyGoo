import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { HiOutlineHeart } from "react-icons/hi2";

const ProductCard = ({
  title,
  price,
  badgeText,
  imgSrcFirst,
  imgAlt,
  badgeClassName,
  priceClassName,
  productClassName,
  currency = "৳",
}) => {
  return (
    <div
      className={`relative w-full flex flex-col bg-white rounded-2xl shadow-sm border border-neutral-400 overflow-hidden transition-shadow duration-300 hover:shadow-md ${productClassName}`}
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* Badge */}
      {badgeText && (
        <div
          className={`absolute top-3 left-3 py-1 px-3 text-xs font-semibold rounded-full z-10 ${badgeClassName}`}
        >
          {badgeText}
        </div>
      )}

      {/* Wishlist Icon */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="w-8 h-8 rounded-full bg-gray-500 hover:bg-red-50 flex items-center justify-center transition-colors duration-200">
          <HiOutlineHeart className="text-gray-500 hover:text-red-500 text-lg transition-colors duration-200" />
        </button>
      </div>

      {/* Image Area */}
      <Link to={"/product-details"} className="w-full group">
        <div
          className="relative w-full flex items-center justify-center overflow-hidden"
          style={{ height: "260px" }}
        >
          <img
            src={imgSrcFirst}
            alt={imgAlt}
            className="object-contain w-auto h-[220px] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Info Area */}
      <div className="px-4 pt-4 pb-5 flex flex-col gap-3  rounded-t-2xl border-t-1 border-neutral-300">
        {/* Title */}
        <h3 className="text-[#1a1a1a text-xl font-semibold leading-snug text-center">
          {title}
        </h3>

        {/* Price */}
        <div
          className={`flex justify-center items-baseline gap-1 ${priceClassName}`}
        >
          <span className="text-[#1a1a1a] text-3xl font-extrabold">
            {currency}
          </span>
          <span className="text-[#1a1a1a] text-xl font-bold tracking-tight">
            {typeof price === "number" ? price.toLocaleString() : price}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-1">
          <Link
            to={"/product-details"}
            className="flex-1 flex items-center justify-center py-2.5 rounded-full border border-neutral-500 text-base font-medium text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-250"
          >
            Shop Now
          </Link>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-500 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-250 text-[#1a1a1a] cursor-pointer">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

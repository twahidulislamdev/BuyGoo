import { Link } from "react-router-dom";
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
}) => {
  return (
    <div
      className={`relative w-full h-[330px] lg:h-[380px] flex flex-col group border-2 border-gray-200 overflow-hidden ${productClassName}`}
    >
      <Link to={"/quickview"} className="w-full">
        <div className="relative w-full h-[250px] lg:h-[280px] border-b-2 border-neutral-300">
          {/* Default Image */}
          <img
            src={imgSrcFirst}
            alt={imgAlt}
            className="absolute inset-0 w-[150px] lg:w-full h-[150px] lg:h-[255px] object-cover transition-opacity duration-300 flex justify-center items-center m-auto"
          />

          {/* Group Hover Part */}
          <div className="lg:p-0 space-y-3 absolute bottom-0 left-0 w-full lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 sm:opacity-100 sm:translate-y-0 transition-all duration-300 ease-in-out delay-100">
            {/* Add To Cart */}
            <div className="w-full h-[30px] lg:h-[45px] flex justify-center items-center m-auto hover:cursor-pointer bg-black hover:bg-mainColor transition-colors duration-300">
              <p className="text-sm sm:text-md lg:text-lg font-medium text-white">
                ADD TO CART
              </p>
            </div>
          </div>

          {/* Wishlist Icon */}
          <div className="w-[30px] h-[30px] lg:w-[35px] lg:h-[35px] rounded-full bg-black hover:bg-mainColor absolute top-2 right-2 hover:cursor-pointer flex items-center justify-center lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 sm:opacity-100 sm:translate-y-0 transition-all duration-300 ease-in-out delay-100 z-10">
            <HiOutlineHeart className="text-white text-lg lg:text-2xl transition-colors duration-300" />
          </div>
        </div>
      </Link>

      {/* Badge */}
      <div
        className={`absolute top-2 left-2 py-1 px-3 lg:py-1.5 lg:px-4 text-black font-bold text-center text-xs lg:text-sm z-10 ${badgeClassName}`}
      >
        {badgeText}
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col px-3 lg:px-3">
        <h3 className="text-[#262626] text-sm lg:text-xl font-bold lg:pb-2 pt-2">
          {title}
        </h3>
        <div className="flex justify-between items-center pt-1 pb-2">
          <h4
            className={`text-mainColor text-sm lg:text-xl font-bold ${priceClassName}`}
          >
            ${price.toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { useEffect, useState } from "react";
import Container from "../Container";
import Flex from "../Flex";
import {
  FaRegUser,
  FaRegHeart,
  FaHome,
  FaBars,
  FaCalendarCheck,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { BiSolidContact } from "react-icons/bi";
import CartSidebar from "./CartSidebar";
import { useCartStore } from "../../stores/cartStore";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useCartStore();
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
    { name: "PAGES", path: "/pages" },
  ];

  return (
    <>
      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/*======== Desktop Header part start Here ========*/}
      <div
        className={`hidden lg:block sticky top-0 py-5 w-full z-[99] transition-all duration-300 ${
          isScrolled
            ? "bg-white backdrop-blur-md shadow-md transition-ease-in-out transition-all duration-200"
            : "bg-white shadow-sm"
        }`}
      >
        <Container>
          <Flex className={"justify-between items-center"}>
            <div className="text-2xl font-bold text-black">
              <span className="text-mainColor tracking-[2px]">Buy</span>Goo
            </div>

            {/* Menu */}
            <ul className="flex items-center gap-x-15 xl:gap-x-10">
              {menuItems.map((item, idx) => (
                <Link to={item.path} key={idx}>
                  <li className="relative list-none py-2 text-sm font-medium text-black group cursor-pointer transition-all ease-in-out">
                    {item.name}
                    <span className="absolute left-0 bottom-0 h-0.5 bg-mainColor w-0 group-hover:w-full transition-all duration-300"></span>
                  </li>
                </Link>
              ))}
            </ul>

            {/* Icons + Search */}
            <div className="flex items-center gap-x-3 lg:gap-x-5">
              <div className="flex-1 mx-3 lg:mx-5 flex justify-center items-center">
                <input
                  className="w-[200px] lg:w-[250px] py-2 px-3 
  rounded-md bg-black/5 backdrop-blur-md border border-black/20 
  text-black text-sm placeholder:text-gray-500 
  outline-none focus:border-black/40 transition-all duration-300"
                  type="text"
                  placeholder="What are you looking?"
                />
              </div>
              <FaRegHeart className="text-black text-xl cursor-pointer hover:text-mainColor transition-colors" />

              {/* Cart icon with badge */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative cursor-pointer text-black hover:text-mainColor transition-colors"
              >
                <HiOutlineShoppingBag className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-mainColor text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link to="/login">
                <FaRegUser className="text-black text-xl cursor-pointer hover:text-mainColor transition-colors" />
              </Link>
            </div>
          </Flex>
        </Container>
      </div>
      {/*=========  Desktop Header part End Here =========*/}

      {/*========= Mobile Header part start Here =========*/}
      <div
        className={`px-3 block lg:hidden sticky top-0 py-5 w-full z-[99] transition-all duration-300 ${
          isScrolled
            ? "bg-white backdrop-blur-md shadow-md transition-ease-in-out transition-all duration-200"
            : "bg-white shadow-sm"
        }`}
      >
        <Flex className={"justify-between items-center"}>
          <div className="text-xl font-bold text-black">
            <span className="text-mainColor tracking-[2px]">Buy</span>Goo
          </div>
          {/* Icons + Search */}
          <div className="flex items-center gap-x-3 lg:gap-x-5">
            <div className="flex-1 mx-3 lg:mx-5 flex justify-center items-center">
              <input
                className="w-[165px] lg:w-[250px] py-2 px-3 rounded-md bg-black/5 border border-black/20 outline-none focus:border-black/40 text-black text-sm placeholder:text-gray-500"
                type="text"
                placeholder="What are you looking?"
              />
            </div>
            <FaRegHeart className="text-black text-xl cursor-pointer" />

            {/* Mobile Cart icon with badge */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative cursor-pointer"
            >
              <HiOutlineShoppingBag className="text-black text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-mainColor text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>

            <Link to={"/login"}>
              <FaRegUser className="text-black text-xl cursor-pointer" />
            </Link>
          </div>
        </Flex>
      </div>
      {/*========= Mobile Header part End Here =========*/}

      {/*========= Mobile Footer Nav start Here =========*/}
      <div className="py-4 flex justify-between items-center lg:hidden w-full fixed bottom-0 left-0 z-[99] bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] ">
        <Link to="/" className="flex-1">
          <div className="flex flex-col justify-center items-center">
            <FaHome className="text-mainColor text-2xl  pb-1.5 cursor-pointer" />
            <p className="text-sm text-mainColor">HOME</p>
          </div>
        </Link>
        <Link to="/shop" className="flex-1">
          <div className="flex flex-col justify-center items-center">
            <HiOutlineShoppingBag className="text-mainColor text-2xl  pb-1.5 cursor-pointer" />
            <p className="text-sm text-mainColor">SHOP</p>
          </div>
        </Link>
        <Link to="/about" className="flex-1">
          <div className="flex flex-col justify-center items-center">
            <FaCalendarCheck className="text-mainColor text-2xl  pb-1.5 cursor-pointer" />
            <p className="text-sm text-mainColor">ABOUT</p>
          </div>
        </Link>
        <Link to="/contact" className="flex-1">
          <div className="flex flex-col justify-center items-center">
            <BiSolidContact className="text-mainColor text-2xl  pb-1.5 cursor-pointer" />
            <p className="text-sm text-mainColor">CONTACT</p>
          </div>
        </Link>
        <Link to="/pages" className="flex-1">
          <div className="flex flex-col justify-center items-center">
            <FaBars className="text-mainColor text-2xl  pb-1.5 cursor-pointer" />
            <p className="text-sm text-mainColor">PAGES</p>
          </div>
        </Link>
      </div>
      {/*========= Mobile Footer Nav End Here =========*/}
    </>
  );
};

export default Header;

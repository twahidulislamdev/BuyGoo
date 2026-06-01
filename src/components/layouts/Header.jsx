import { useEffect, useState } from "react";
import Container from "../Container";
import Flex from "../Flex";
import { FaRegHeart, FaHome, FaBars, FaCalendarCheck } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { BiSolidContact } from "react-icons/bi";
import { useCartStore } from "../../stores/cartStore";
import UserAccountDropdown from "./UserAccountDropdown";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { cart } = useCartStore();
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

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
              {/* Add To Cart Icon */}
              <Link
                to="/addtocart"
                className="relative cursor-pointer text-black hover:text-mainColor transition-colors"
              >
                <HiOutlineShoppingBag className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-mainColor text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {totalItems}
                  </span>
                )}
              </Link>
              {/* User Icon With Account Dropdown */}
              <UserAccountDropdown />
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
        <Flex className={"justify-between items-center relative"}>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-black"
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-black">
            <span className="text-mainColor tracking-[2px]">Buy</span>Goo
          </div>

          <div className="flex items-center gap-x-3">
            <Link to="/addtocart" className="relative cursor-pointer">
              <HiOutlineShoppingBag className="text-black text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-mainColor text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </Link>
            <UserAccountDropdown />
          </div>
        </Flex>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-white shadow-xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">All Categories</p>
                <h2 className="text-xl font-semibold text-black">Browse</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="text-black text-2xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <div className="mb-5">
              <input
                className="w-full py-3 px-4 rounded-md bg-black/5 border border-black/20 text-black text-sm placeholder:text-gray-500 outline-none focus:border-black/40 transition"
                type="text"
                placeholder="Search categories"
              />
            </div>
            <nav className="space-y-3">
              {menuItems.map((item, idx) => (
                <Link
                  to={item.path}
                  key={idx}
                  onClick={() => setIsSidebarOpen(false)}
                  className="block py-3 px-3 rounded-md text-black hover:bg-mainColor/10 transition"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
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
      </div>
      {/*========= Mobile Footer Nav End Here =========*/}
    </>
  );
};

export default Header;

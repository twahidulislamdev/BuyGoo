import { useEffect, useState } from "react";
import Container from "../Container";
import Flex from "../Flex";
import { NavLink, Link } from "react-router-dom";

import {
  FaRegUser,
  FaRegHeart,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

import { HiOutlineShoppingBag, HiMiniBars3CenterLeft } from "react-icons/hi2";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  // ================= MENU ITEMS =================
  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
    { name: "PAGES", path: "/pages" },
  ];

  // ================= PREVENT BODY SCROLL ==============
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/category/getallcategory")
      .then((res) => {
        setCategories(res.data.categories || []);
      })
      .catch((err) => {
        console.error("Error Fetching Categories:", err);
      });
  }, []);

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <div className="hidden lg:block w-full py-5">
        <Container>
          <Flex className="justify-between items-center">
            <Link to="/">
              <h3 className="text-2xl font-bold">
                Buy<span className="text-mainColor">Goo</span>
              </h3>
            </Link>

            <ul className="flex items-center gap-x-10">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `relative py-2 text-sm font-medium transition ${
                        isActive ? "text-black" : "text-gray-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}
                        <span
                          className={`absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-300 ${
                            isActive ? "w-full" : "w-0"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Flex>
        </Container>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div className="w-full bg-white shadow-sm lg:hidden sticky top-0 z-40">
        <Container>
          <Flex className="justify-between items-center py-3 px-3">
            <Link to="/">
              <h3 className="text-lg font-semibold">
                Buy<span className="text-mainColor">Goo</span>
              </h3>
            </Link>

            <button onClick={() => setIsMenuOpen(true)} className="p-2">
              <FaBars className="text-2xl" />
            </button>
          </Flex>
          <div
            onClick={() => setIsMenuOpen(false)}
            className={`fixed inset-0 bg-black/40 z-50 transition ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          />

          <aside
            className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transition-transform duration-300 ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex justify-between items-center px-5 py-5 border-b">
              <h3 className="text-lg font-semibold">Navigation</h3>
              <button onClick={() => setIsMenuOpen(false)}>
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <nav className="px-5 py-5">
              <ul className="space-y-2">
                {menuItems.map((item, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={item.path}
                      end
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-xl transition ${
                          isActive ? "bg-gray-100 text-black" : "text-gray-600"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                          {isActive && <span className="text-black">→</span>}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </Container>
      </div>

      {/* ================= LOWER HEADER ================= */}
      <div className="w-full flex justify-center bg-[#F5F5F3] px-3 py-3 shadow-sm">
        <Container>
          <div className="flex justify-between items-center">
            {/* ================= CATEGORY ================= */}
            <div className="relative">
              <HiMiniBars3CenterLeft
                className="text-2xl cursor-pointer"
                onClick={() => setCategoryDropdown((prev) => !prev)}
              />

              {categoryDropdown && (
                <>
                  {/* BACKDROP */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCategoryDropdown(false)}
                  />

                  {/* DROPDOWN */}
                  <div className="absolute left-0 top-12 z-50 w-72 bg-white shadow-2xl border border-gray-100 overflow-hidden rounded-md">
                    {/* HEADER */}
                    <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Browse Categories
                      </p>
                    </div>

                    {/* CATEGORY LIST */}
                    <div className="max-h-[400px] overflow-y-auto">
                      {categories.map((item) => (
                        <li
                          key={item._id}
                          onClick={() => setCategoryDropdown(false)}
                          className="w-full flex items-center justify-between px-5 py-5 text-sm font-medium text-gray-700 hover:bg-neutral-100 hover:text-black group transition-all duration-150 border-b border-neutral-200 cursor-pointer"
                        >
                          <span>{item.name}</span>
                          <FaChevronRight className="text-xs text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-150" />
                        </li>
                      ))}

                      {categories.length === 0 && (
                        <div className="px-5 py-8 text-center text-sm text-gray-500">
                          No Categories Found
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ================= SEARCH ================= */}
            <div className="flex-1 mx-4 flex justify-center">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-[200px] lg:w-[500px] py-1.5 lg:py-2 px-3 text-sm lg:text-base border rounded-md bg-[#F5F5F5] outline-none"
              />
            </div>

            {/* ================= ICONS ================= */}
            <div className="flex items-center gap-4">
              <FaRegHeart className="text-xl cursor-pointer" />
              <FaRegUser className="text-xl cursor-pointer" />
              <HiOutlineShoppingBag className="text-2xl cursor-pointer" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;

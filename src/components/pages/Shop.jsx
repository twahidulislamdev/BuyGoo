import React, { useEffect, useState } from "react";
import Flex from "../Flex";
import Container from "../Container";
import axios from "axios";
import { IoFilter } from "react-icons/io5";
import ProductCard from "../ProductCard";

const Shop = () => {
  const [myProduct, setMyProduct] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    async function allDatas() {
      try {
        const res = await axios.get(
          "https://buygoo-backend.onrender.com/api/v1/product/getallproducts",
        );
        const data = res.data.products || res.data;
        setMyProduct(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    allDatas();
  }, []);

  return (
    <div className="w-full py-10 lg:mx-0 overflow-x-hidden relative">
      <Container>
        {/* 🔘 New Filter Button (Mobile Only) - Modern Design */}
        <div className="lg:hidden mb-6 flex justify-start pl-3">
          <div
            className="relative flex justify-between items-center gap-x-2 bg-transparent px-6 py-3 border-2 border-black text-center text-black rounded cursor-pointer transition-all hover:bg-black hover:text-white active:scale-95"
            onClick={() => setShowFilter(true)}
          >
            <IoFilter className="text-black text-2xl transition-colors group-hover:text-white" />
            <h6 className="text-lg font-semibold text-black transition-colors group-hover:text-white">
              FILTERS
            </h6>
          </div>
        </div>

        <Flex className="justify-between">
          {/*-----------------  Sidebar ------------- */}
          <div
            className={`
              fixed lg:static top-0 left-0 h-full lg:h-auto p-5 lg:p-0
              w-[80%] sm:w-[65%] lg:w-[20%]
              bg-white z-50 lg:z-auto
              transform transition-transform duration-300
              ${showFilter ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0
              shadow-xl lg:shadow-none
               overflow-y-auto
            `}
          >
            {/* Close Button (Mobile) */}
            <div className="lg:hidden mb-5 flex justify-between items-center">
              <h2 className="font-semibold text-xl">Filters</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-black text-xl w-8 h-8 hover:text-gray-500 border-2 rounded-lg -mt-2"
              >
                ✕
              </button>
            </div>

            {/* Desktop Filter Title */}
            <h2 className="hidden lg:block text-xl font-semibold mb-5">
              Filter Products
            </h2>

            {/* 🔹 Category */}
            <div className="mb-6 border-b pb-4">
              <p className="font-semibold mb-3">Category</p>
              <div className="space-y-2 text-sm">
                {["All", "Smartphone", "Laptop", "Watch"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer hover:text-black"
                  >
                    <input type="checkbox" className="accent-black" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* 🔹 Brand */}
            <div className="mb-6 border-b pb-4">
              <p className="font-semibold mb-3">Brand</p>
              <div className="space-y-2 text-sm">
                {["Apple", "Samsung", "Xiaomi", "Realme"].map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer hover:text-black"
                  >
                    <input type="checkbox" className="accent-black" />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* 🔹 Display Size */}
            <div className="mb-6 border-b pb-4">
              <p className="font-semibold mb-3">Display Size</p>
              <div className="space-y-2 text-sm">
                {['4"-5"', '5"-6"', '6"+'].map((size) => (
                  <label
                    key={size}
                    className="flex items-center gap-2 cursor-pointer hover:text-black"
                  >
                    <input type="checkbox" className="accent-black" />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* 🔹 RAM */}
            <div className="mb-6 border-b pb-4">
              <p className="font-semibold mb-3">RAM</p>
              <div className="space-y-2 text-sm">
                {["2GB", "4GB", "6GB", "8GB"].map((ram) => (
                  <label
                    key={ram}
                    className="flex items-center gap-2 cursor-pointer hover:text-black"
                  >
                    <input type="checkbox" className="accent-black" />
                    {ram}
                  </label>
                ))}
              </div>
            </div>

            {/* 🔹 Storage (ROM) */}
            <div className="mb-6 border-b pb-4">
              <p className="font-semibold mb-3">Storage</p>
              <div className="space-y-2 text-sm">
                {["32GB", "64GB", "128GB", "256GB"].map((rom) => (
                  <label
                    key={rom}
                    className="flex items-center gap-2 cursor-pointer hover:text-black"
                  >
                    <input type="checkbox" className="accent-black" />
                    {rom}
                  </label>
                ))}
              </div>
            </div>

            {/* 🔹 Color Selection */}
            <div className="mb-6 border-b pb-4">
              <p className="font-semibold mb-3">Color</p>
              <div className="space-y-3">
                {[
                  { name: "Black", hex: "#000000" },
                  { name: "White", hex: "#FFFFFF" },
                  { name: "Red", hex: "#EF4444" },
                  { name: "Blue", hex: "#3B82F6" },
                  { name: "Green", hex: "#10B981" },
                  { name: "Gold", hex: "#FBBF24" },
                  { name: "Silver", hex: "#D1D5DB" },
                  { name: "Purple", hex: "#A855F7" },
                ].map((color) => (
                  <label
                    key={color.name}
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                  >
                    <input type="checkbox" className="accent-black" />
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300 transition-transform hover:scale-110"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <span className="text-sm">{color.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 🔹 Price Range */}
            <div className="mb-5">
              <p className="font-semibold mb-3">Price Range</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border px-3 py-2 rounded text-sm outline-none focus:border-black"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border px-3 py-2 rounded text-sm outline-none focus:border-black"
                />
              </div>

              <button className="mt-4 w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-900 transition">
                Apply Filter
              </button>
            </div>
          </div>

          {/* Overlay (Mobile Only) */}
          {showFilter && (
            <div
              onClick={() => setShowFilter(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />
          )}

          {/* Product Grid */}
          <div className="w-full lg:w-[75%] mx-3">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-3 gap-y-8">
              {myProduct.map((item, index) => (
                <ProductCard
                  key={index}
                  className=""
                  title={item.name}
                  price={item.price}
                  imgSrcFirst={item.image}
                  imgAlt={item.name || "Product Image"}
                  badgeText={item.badge}
                  badgeClassName={item.badge ? "bg-green-300" : ""}
                />
              ))}
            </div>
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Shop;

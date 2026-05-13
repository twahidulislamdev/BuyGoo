// import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

// ---------------------Tranding Product ---------------------

const TrendingProducts = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-5">
      <div className="px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl lg:text-4xl font-semibold text-black">
            Trending Products
          </h2>

          <button className="px-5 h-11 border border-black text-sm font-medium text-black rounded-xl transition-all duration-300">
            SEE ALL
          </button>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT - 2x2 Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <ProductCard
              isSmall={true}
              title="Nothing CMF Buds Pro"
              price={4990}
              oldPrice={8990}
              discount="44%"
              tag="Most Popular"
              imgSrcFirst="https://i.ibb.co/jkL0r0q/earbuds.png"
            />

            <ProductCard
              isSmall={true}
              title="Apple 30W USB C Power Adapter 2 Pin"
              price={4990}
              oldPrice={8990}
              discount="44%"
              outOfStock
              imgSrcFirst="https://i.ibb.co/3m8F0B6/adapter.png"
            />

            <ProductCard
              isSmall={true}
              title="Motorola Edge 50 Fusion 5G"
              price={26999}
              oldPrice={35990}
              discount="24%"
              tag="Hot Product"
              imgSrcFirst="https://i.ibb.co/yq6tM9k/moto1.png"
            />

            <ProductCard
              isSmall={true}
              title="Motorola Edge 50 Pro 5G"
              price={34990}
              oldPrice={44490}
              discount="21%"
              tag="Hot Product"
              imgSrcFirst="https://i.ibb.co/4W2DGKm/moto2.png"
            />
          </div>

          {/* CENTER - Large Featured Product */}
          <div className="lg:col-span-4">
            <ProductCard
              isLarge={true}
              title="iPhone 17 Pro Max"
              price={165990}
              oldPrice={214990}
              discount="22%"
              tag="Hot Product"
              imgSrcFirst="https://i.ibb.co/Gv0VYwL/iphone.png"
            />
          </div>

          {/* RIGHT - 2x2 Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <ProductCard
              isSmall={true}
              title="Apple Watch SE 3"
              price={34490}
              oldPrice={46490}
              discount="25%"
              tag="Customers Choice"
              imgSrcFirst="https://i.ibb.co/ZL3m5xM/watch1.png"
            />

            <ProductCard
              isSmall={true}
              title="Xiaomi Mibro Watch A2 Bluetooth Call Smart..."
              price={2999}
              oldPrice={4999}
              discount="40%"
              tag="Customers Choice"
              imgSrcFirst="https://i.ibb.co/j8z6v3P/watch2.png"
            />

            <ProductCard
              isSmall={true}
              title="Kieslect Lady Smart Watch Pura"
              price={3499}
              oldPrice={7999}
              discount="56%"
              tag="Top Selling"
              imgSrcFirst="https://i.ibb.co/R2Qn3Ty/watch3.png"
            />

            <ProductCard
              isSmall={true}
              title="iQOO Z9 5G"
              price={21990}
              oldPrice={30990}
              discount="29%"
              imgSrcFirst="https://i.ibb.co/1fN9QyK/iqoo.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;

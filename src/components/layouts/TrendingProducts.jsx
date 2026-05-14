// import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import Container from "../Container";

// ---------------------Tranding Product ---------------------

const TrendingProducts = () => {
  return (
    <div className="w-full  mt-5">
      <Container>
        <div className="px-3 lg:px-0">
          {/* Top Label */}
          <div className="w-full flex justify-start items-center space-x-2 px-2 lg:px-0 pb-3">
            <div className="w-3 h-6 sm:w-4 sm:h-7 bg-mainColor rounded-sm"></div>
            <h6 className="text-sm sm:text-base text-mainColor font-semibold">
              Last Month
            </h6>
          </div>

          {/* Heading + Navigation */}
          <div className="w-full flex items-center justify-between">
            <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold px-2 lg:px-0">
              Trending <span className="text-mainColor">Products</span>
            </h3>

            <button className="px-5 h-11 border border-black text-sm font-medium text-black rounded-xl transition-all duration-300">
              SEE ALL
            </button>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-5">
            {/* LEFT - 2x2 Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
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
      </Container>
    </div>
  );
};

export default TrendingProducts;

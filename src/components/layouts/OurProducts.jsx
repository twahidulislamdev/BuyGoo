import React, { useEffect, useState } from "react";
import Container from "../Container";

import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductCard";

const OurProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/product/getallproducts",
        );
        const data = res.data.products || res.data;
        setMyProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="w-full m-auto lg:px-0 mt-5 overflow-hidden">
      <Container>
        {/* Top Label */}
        <div className="w-full flex space-x-2 pb-3 px-2 lg:px-0">
          <div className="w-3 h-6 sm:w-4 sm:h-7 bg-mainColor rounded-sm"></div>
          <h6 className="text-sm sm:text-base text-mainColor font-semibold">
            Our Products
          </h6>
        </div>

        {/* Section Title */}
        <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold px-2 lg:px-0">
          Explore Our <span className="text-mainColor">Products</span>
        </h3>

        {/* Products grid retrieved from API */}
        <div className="w-full mt-5 px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3  justify-items-center">
            {(showAll ? myProducts : myProducts.slice(0, 8)).map((item) => (
              <div key={item.id} className="w-full">
                <ProductCard
                  title={item.name}
                  price={item.price}
                  imgSrcFirst={item.image}
                  imgAlt={item.name}
                  badgeText={item.badge}
                  badgeClassName={item.badge ? "bg-green-300" : ""}
                />
              </div>
            ))}
          </div>
        </div>

        {/* See More toggle */}
        {myProducts.length > 2 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="relative px-0 py-2 text-black text-sm md:text-base font-medium group cursor-pointer"
            >
              <span className="group-hover:text-black transition-colors duration-300">
                {showAll ? "SHOW LESS" : "SEE MORE"}
              </span>
              <span className="absolute left-0 bottom-0 h-0.5 bg-black w-1/3 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OurProducts;

import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../ProductCard";
import axios from "axios";
import Container from "../Container";

const BestSelling = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [products, setProducts] = useState([]);

  // Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "https://buygoo-backend.onrender.com/api/v1/product/getallproducts",
        );
        const data = res.data.products || res.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="w-full m-auto mt-3 overflow-hidden">
      <Container>
        {/* Top Label */}
        <div className="w-full flex justify-start items-center space-x-2 px-2 lg:px-0 pb-3">
          <div className="w-3 h-6 sm:w-4 sm:h-7 bg-mainColor rounded-sm"></div>
          <h6 className="text-sm sm:text-base text-mainColor font-semibold">
            This Month
          </h6>
        </div>

        {/* Heading + Navigation */}
        <div className="w-full flex items-center justify-between">
          <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold px-2 lg:px-0">
            Best Selling <span className="text-mainColor">Products</span>
          </h3>

          {/* Arrows only for lg+ */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              ref={prevRef}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white transition duration-300 shadow-sm"
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              ref={nextRef}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white transition duration-300 shadow-sm"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="w-full mt-5 px-2 lg:px-0">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={16}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={500}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard
                  title={item.title || item.name}
                  price={item.price}
                  imgSrcFirst={item.thumbnail || item.image || item.images?.[0]}
                  imgAlt={item.title || item.name}
                  badgeText={
                    item.discountPercentage
                      ? `${Math.round(item.discountPercentage)}%`
                      : "New"
                  }
                  badgeClassName={
                    item.discountPercentage ? "bg-green-300" : "bg-neutral-200"
                  }
                  ram={item.ram}
                  storage={item.storage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* See More */}
        <div className="flex justify-center mt-5">
          <Link to="/shop">
            <button className="relative text-sm md:text-base font-medium group cursor-pointer px-5 py-2 bg-mainColor text-white rounded">
              <span className="transition-colors duration-300">View All</span>
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default BestSelling;

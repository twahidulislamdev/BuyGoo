import React from "react";
import Banner from "../layouts/Banner";
import Categories from "../layouts/Categories";
import BestSelling from "../layouts/BestSelling";
import LatestOffer from "../layouts/LatestOffer";
import Policy from "../layouts/Policy";
import TrendingProducts from "../layouts/TrendingProducts";
import Ads from "../layouts/Ads";
import OurProducts from "../layouts/NewArrivals";

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <OurProducts />
      <LatestOffer />
      <BestSelling />
      <Ads />
      <TrendingProducts />
      <Policy />
    </>
  );
};

export default Home;

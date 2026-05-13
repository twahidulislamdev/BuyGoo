import React from "react";
import Banner from "../layouts/Banner";
import Categories from "../layouts/Categories";
import BestSelling from "../layouts/BestSelling";
import LatestOffer from "../layouts/LatestOffer";
import OurProducts from "../layouts/OurProducts";

import Policy from "../layouts/Policy";
import NewArrival from "../layouts/TrendingProducts";
import TrendingProducts from "../layouts/TrendingProducts";

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <BestSelling />
      <LatestOffer />
      <OurProducts />
      <TrendingProducts />
      <Policy />
    </>
  );
};

export default Home;

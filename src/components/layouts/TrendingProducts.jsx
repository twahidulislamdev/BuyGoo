import ProductCard from "../ProductCard";
import Container from "../Container";
import axios from "axios";
import { useState, useEffect } from "react";

// ---------------------Tranding Product ---------------------

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "https://buygoo-backend.onrender.com/api/v1/product/getallproducts",
        );
        const allProducts = res.data.products || res.data;
        // Filter products by "Top Trending" tag
        const filteredProducts = allProducts.filter(
          (product) => product.tags && product.tags.includes("Top Trending"),
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);
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
              Top Trending <span className="text-mainColor">Products</span>
            </h3>

            <button className="px-5 h-11 border border-black text-sm font-medium text-black rounded-xl transition-all duration-300">
              SEE ALL
            </button>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-5">
            {/* LEFT - 2x2 Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((item, index) => (
                <ProductCard
                  key={`left-${index}`}
                  isSmall={true}
                  title={item.title || item.name}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  discount={
                    item.discountPercentage
                      ? `${Math.round(item.discountPercentage)}%`
                      : item.discount
                  }
                  tag={
                    index === 0
                      ? "Most Popular"
                      : index === 2
                        ? "Hot Product"
                        : undefined
                  }
                  outOfStock={item.stock === 0}
                  imgSrcFirst={item.thumbnail || item.image || item.images?.[0]}
                  ram={item.ram}
                  storage={item.storage}
                  colors={item.colors}
                  sizes={item.sizes}
                />
              ))}
            </div>

            {/* CENTER - Large Featured Product */}
            <div className="lg:col-span-4">
              {products[5] && (
                <ProductCard
                  isLarge={true}
                  title={products[5].title || products[5].name}
                  price={products[5].price}
                  oldPrice={products[5].oldPrice}
                  discount={
                    products[5].discountPercentage
                      ? `${Math.round(products[5].discountPercentage)}%`
                      : products[5].discount
                  }
                  tag="Hot Product"
                  outOfStock={products[5].stock === 0}
                  imgSrcFirst={
                    products[5].thumbnail ||
                    products[5].image ||
                    products[5].images?.[0]
                  }
                  ram={products[5].ram}
                  storage={products[5].storage}
                  colors={products[5].colors}
                  sizes={products[5].sizes}
                />
              )}
            </div>

            {/* RIGHT - 2x2 Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {products.slice(6, 10).map((item, index) => (
                <ProductCard
                  key={`right-${index}`}
                  isSmall={true}
                  title={item.title || item.name}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  discount={
                    item.discountPercentage
                      ? `${Math.round(item.discountPercentage)}%`
                      : item.discount
                  }
                  tag={
                    index === 0 || index === 1
                      ? "Customers Choice"
                      : index === 2
                        ? "Top Selling"
                        : undefined
                  }
                  outOfStock={item.stock === 0}
                  imgSrcFirst={item.thumbnail || item.image || item.images?.[0]}
                  ram={item.ram}
                  storage={item.storage}
                  colors={item.colors}
                  sizes={item.sizes}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrendingProducts;

import { useState } from "react";
import Container from "../Container";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    alt: "Black hoodie front",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    alt: "Red puffer jacket front",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80",
    alt: "Red puffer jacket side",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    alt: "Red hoodie",
  },
];

const sizes = ["XS", "S", "M", "L", "XL"];

const colorOptions = [
  { name: "Midnight Black", hex: "#1a1a1a" },
  { name: "Slate Gray", hex: "#6b7280" },
  { name: "Crimson Red", hex: "#dc2626" },
];

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleWishlist = () => setWishlistAdded((prev) => !prev);

  const prevImage = () =>
    setSelectedImage((p) => (p - 1 + images.length) % images.length);
  const nextImage = () => setSelectedImage((p) => (p + 1) % images.length);

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Container>
        <div className="py-2 lg:py-5 px-3 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* ═══════════════ LEFT — Gallery ═══════════════ */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-6">
            {/* Main Image */}
            <div
              className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm group"
              style={{ height: "420px" }}
            >
              <img
                key={selectedImage}
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ animation: "fadeIn 0.35s ease" }}
              />

              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-2xl" />

              {/* Nav arrows */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-100"
              >
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-100"
              >
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              {/* Image counter pill */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm font-medium">
                {selectedImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                    selectedImage === idx
                      ? "border-gray-900 shadow-md ring-2 ring-gray-900/10 scale-[0.97]"
                      : "border-gray-200 hover:border-gray-400 hover:shadow-sm"
                  }`}
                  style={{ height: "80px" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === idx && (
                    <div className="absolute inset-0 bg-black/10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ═══════════════ RIGHT — Product Info ═══════════════ */}
          <div className="flex flex-col">
            {/* Category badge */}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-green-500 bg-green-50 px-3 py-1 rounded-full w-fit mb-3 border-1 border-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              In Stock
            </span>

            {/* Title */}
            <h1 className="text-xl lg:text-3xl font-bold text-neutral-900 leading-tight tracking-tight">
              Colorful Jacket
            </h1>

            <div className="flex items-end gap-3 mt-3">
              <span className="text-lg lg:text-xl font-semibold text-neutral-900">$29</span>
              <span className="text-lg lg:text-xl font-semibold text-neutral-900">.00</span>
              <span className="text-sm md:text-base lg:text-lg text-neutral-500 line-through font-medium mb-0.5">
                $49.00
              </span>
              <span className="mb-1 bg-rose-100 text-rose-600 text-xs font-bold px-2.5 py-0.5 rounded-full tracking-wide">
                −41%
              </span>
            </div>

            {/* Stars + Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">4.8</span>
              <span className="text-sm text-gray-400">·</span>
              <span className="text-sm text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors underline underline-offset-2">
                8,234 reviews
              </span>
            </div>

            {/* Price row */}


            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mt-3">
              Premium quality hoodie crafted with ultra-soft fleece fabric for
              all-day comfort. Features a relaxed silhouette, reinforced seams,
              and a durable water-resistant finish that keeps you stylish
              through any season.
            </p>

            <hr className="mt-3 border-gray-100" />

            {/* Color Selector */}
            <div className="mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-3">
                Color —{" "}
                <span className="text-gray-800 normal-case font-medium tracking-normal">
                  {colorOptions[selectedColor].name}
                </span>
              </span>
              <div className="flex gap-3">
                {colorOptions.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                      selectedColor === i
                        ? "border-gray-900 scale-110 shadow-md"
                        : "border-transparent hover:border-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-3 mb-5" >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Select Size
                </span>
                <button className="text-xs text-indigo-500 underline underline-offset-2 hover:text-indigo-700 transition-colors font-medium">
                  Size Guide ↗
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`w-12 h-12 rounded-xl border text-sm font-semibold transition-all duration-150 focus:outline-none ${
                      selectedSize === size
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-transparent text-gray-700 border-gray-300 hover:border-gray-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-rose-500 text-xs mt-2.5 font-medium flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 items-stretch">
              {/* Quantity */}
              <div className="flex items-center bg-white border border-neutral-400 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-xl font-light"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900 border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-xl font-light"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center bg-white gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none border border-neutral-400 ${
                  cartAdded
                    ? "bg-neutral-800 text-white scale-[0.98]"
                    : selectedSize
                      ? "bg-neutral-800 "
                      : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                }`}
              >
                {cartAdded ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Wishlist + Share */}
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleWishlist}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-400 text-sm font-medium transition-all duration-200 ${
                  wishlistAdded
                    ? "border-rose-400 bg-rose-50 text-rose-600 shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <svg
                  className={`w-4 h-4 transition-all duration-300 ${wishlistAdded ? "fill-rose-500 stroke-rose-500 scale-110" : "fill-none stroke-current"}`}
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistAdded ? "Wishlisted" : "Wishlist"}
              </button>

              <button className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-neutral-400 bg-white text-gray-600 text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
            </div>
            <hr className="my-6 border-gray-100" />

            {/* Meta Info */}
            <div className="space-y-2.5 text-sm">
              {[
                { label: "SKU", value: "WH1000XM4" },
                { label: "Category", value: "Jackets, Outerwear" },
              ].map((m) => (
                <div key={m.label} className="flex gap-3">
                  <span className="text-gray-400 w-20 shrink-0 font-medium">
                    {m.label}
                  </span>
                  <span className="text-gray-700">{m.value}</span>
                </div>
              ))}
              <div className="flex gap-3 items-center">
                <span className="text-gray-400 w-20 shrink-0 font-medium">
                  Tags
                </span>
                <div className="flex gap-2 flex-wrap">
                  {["Winter", "Lightweight", "Hood"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Fade-in keyframe */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

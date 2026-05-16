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

const colorOptions = [
  { name: "Midnight Black", hex: "#1a1a1a" },
  { name: "Slate Gray", hex: "#6b7280" },
  { name: "Crimson Red", hex: "#dc2626" },
  { name: "Slate Gray", hex: "#6b7280" },
];

const storageOptions = ["8/128GB", "8/256GB", "12/256GB", "12/512GB", "12/1TB"];

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlistAdded, setWishlistAdded] = useState(false);

  const handleWishlist = () => setWishlistAdded((prev) => !prev);

  const prevImage = () =>
    setSelectedImage((p) => (p - 1 + images.length) % images.length);
  const nextImage = () => setSelectedImage((p) => (p + 1) % images.length);

  return (
    <div className="bg-white lg:h-screen pb-24 lg:pb-0">
      <Container>
        <div className="py-2 lg:py-5 px-3 lg:px-0 grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-5 lg:gap-5 items-start">
          {/* ═══════════════ LEFT — Gallery ═══════════════ */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div
              className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm group"
              style={{ height: "480px" }}
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

              {/* Slider Arrows */}
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
                  style={{ height: "100px" }}
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
          <div className="flex flex-col bg-neutral-100 p-3 rounded-xl border border-neutral-300">
            <div className="flex justify-between items-start">
              {/* Title */}
              <div className="">
                <h1 className="text-lg lg:text-2xl font-semibold ">
                  Colorful Comfortable Jacket
                </h1>
                <p className="text-sm text-neutral-600 px-1 pt-2">
                  China   || 8/128GB   || Purple{" "}
                  <span className="text-red-500">(OFFICIAL WARRANTY)</span>
                </p>
              </div>
              {/* price */}
              <div className="flex flex-col items-end">
                <span className="text-sm lg:text-lg font-semibold text-amber-600">
                  BDT {12999}
                </span>
                <span className="text-xs lg:text-sm text-neutral-500 line-through font-medium">
                  BDT {1999}
                </span>
              </div>
            </div>
            {/* Short Description */}
            <div className="mt-3 p-3 rounded-xl border border-neutral-300 bg-white/50">
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-500 block mb-3">
                Key Specifications
              </span>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    <strong className="font-medium text-gray-800">
                      Display:
                    </strong>{" "}
                    6.83″ AMOLED, 120Hz, HDR10+, Dolby Vision, Xiaomi Dragon
                    Crystal Glass
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  <span>
                    <strong className="font-medium text-gray-800">
                      Performance:
                    </strong>{" "}
                    Dimensity 7400 Ultra, up to 12GB RAM, UFS 2.2
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    <strong className="font-medium text-gray-800">
                      Cameras:
                    </strong>{" "}
                    50MP OIS main + 8MP ultrawide, 20MP selfie, 4K video
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 7h14a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M22 11v2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6 10v4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 10v4"
                    />
                  </svg>
                  <span>
                    <strong className="font-medium text-gray-800">
                      Battery:
                    </strong>{" "}
                    7000mAh, 45W wired, 22.5W reverse wired
                  </span>
                </li>
              </ul>
            </div>

            {/* Color Selector */}
            <div>
              <span className="mt-3 px-3 text-base font-semibold uppercase tracking-widest text-gray-500 block mb-3">
                Color —{" "}
                <span className="text-gray-800 normal-case font-medium tracking-normal">
                  {colorOptions[selectedColor].name}
                </span>
              </span>
              <div className="flex gap-5.5 px-5">
                {colorOptions.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    title={c.name}
                    className={`w-9 h-9 rounded-lg transition-all duration-300 focus:outline-none relative flex items-center justify-center ${
                      selectedColor === i
                        ? "ring-2 ring-offset-2 ring-gray-900 scale-110 shadow-lg"
                        : "ring-1 ring-gray-200 ring-offset-1 hover:ring-gray-400 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor === i && (
                      <span className="w-3.5 h-3.5 rounded-full bg-white/40 shadow-sm backdrop-blur-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selector */}
            <div>
              <span className="mt-5 px-3 text-base font-semibold uppercase tracking-widest text-gray-500 block mb-3">
                Storage —{" "}
                <span className="text-gray-800 normal-case font-medium tracking-normal">
                  {storageOptions[selectedStorage]}
                </span>
              </span>
              <div className="flex flex-wrap gap-3 px-3 mb-3">
                {storageOptions.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStorage(i)}
                    className={`px-4 h-10 rounded-lg border-2 text-sm font-semibold transition-all duration-300 focus:outline-none flex items-center justify-center ${
                      selectedStorage === i
                        ? "border-gray-900 bg-gray-900 text-white shadow-lg scale-105"
                        : "border-gray-200 text-gray-600 hover:border-gray-400 hover:shadow-sm hover:scale-105 bg-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
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
                className={`flex-1 flex items-center justify-center bg-white gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none border border-neutral-400`}
              >
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

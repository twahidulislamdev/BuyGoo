import React from "react";
import Container from "../Container";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const linkSections = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Contact"],
  },
  {
    title: "Shop",
    links: ["All Products", "New Arrivals", "Best Sellers", "Deals"],
  },
  {
    title: "Support",
    links: ["Help Center", "Order Tracking", "Returns", "FAQ"],
  },
];

const legalLinks = ["Privacy", "Terms", "Cookies", "Sitemap"];

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 max-md:pb-24">
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:px-3">
          {/* ================= MAIN FOOTER ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-10 gap-x-6 py-10 lg:py-14 max-md:flex max-md:flex-col max-md:gap-8 max-md:py-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4 text-left max-md:text-center max-md:flex max-md:flex-col max-md:items-center">
              <h2 className="text-2xl font-bold mb-4 max-md:mb-3 max-md:text-xl">
                <span className="text-black">Prime </span>
                <span className="text-red-600">Store</span>
              </h2>

              <p className="text-gray-500 mb-6 max-w-md leading-relaxed text-sm sm:text-base max-md:mb-4 max-md:text-sm max-md:max-w-xs max-md:mx-auto">
                Your trusted destination for quality products and modern shopping
                experience. Fast delivery, best prices, and reliable service.
              </p>

              {/* Social Icons */}
              <div className="flex justify-start gap-4 max-md:justify-center max-md:gap-3">
                {[FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 hover:bg-red-600 transition-all duration-300 rounded-full flex items-center justify-center text-gray-600 hover:text-white active:scale-95 max-md:w-10 max-md:h-10 max-md:bg-white max-md:border max-md:border-gray-200 max-md:shadow-sm"
                    >
                      <Icon size={15} />
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Link columns — 3-up row on small screens */}
            <div className="col-span-2 md:contents max-md:grid max-md:grid-cols-3 max-md:gap-3 max-md:py-5 max-md:border-y max-md:border-gray-100">
              {linkSections.map((section, idx) => (
                <div
                  key={idx}
                  className="col-span-1 md:col-span-1 lg:col-span-2 text-left max-md:min-w-0"
                >
                  <h3 className="text-gray-900 font-semibold mb-3 text-base max-md:text-sm max-md:mb-2 max-md:uppercase max-md:tracking-wide">
                    {section.title}
                  </h3>

                  <ul className="space-y-2 text-sm max-md:space-y-1.5 max-md:text-xs">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-red-600 transition max-md:inline-block max-md:py-0.5"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="col-span-2 md:col-span-2 lg:col-span-2 text-left max-md:col-span-2 max-md:bg-gray-50 max-md:rounded-2xl max-md:p-4 max-md:border max-md:border-gray-100">
              <h3 className="text-gray-900 font-semibold mb-3 text-base max-md:text-sm max-md:mb-2">
                Newsletter
              </h3>

              <p className="text-sm text-gray-500 mb-4 max-md:mb-3 max-md:text-xs">
                Subscribe for updates & offers.
              </p>

              <div className="flex flex-col gap-3 max-md:flex-row max-md:gap-2 max-md:items-stretch">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-100 border border-gray-300 focus:border-red-500 outline-none rounded-lg px-3 py-2 text-sm max-md:flex-1 max-md:min-w-0 max-md:bg-white max-md:py-2.5"
                />
                <button className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-95 max-md:shrink-0 max-md:px-5 max-md:py-2.5">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM BAR ================= */}
          <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm max-md:py-5 max-md:gap-3 max-md:border-t-0 max-md:bg-gray-50 max-md:-mx-3 max-md:px-4 max-md:pb-2 max-md:rounded-2xl">
            <p className="text-gray-500 text-center md:text-left w-full md:w-auto max-md:text-xs max-md:order-1">
              © {new Date().getFullYear()} Prime Store. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-end text-gray-500 text-sm w-full md:w-auto max-md:order-2 max-md:grid max-md:grid-cols-4 max-md:gap-1 max-md:w-full max-md:gap-x-0">
              {legalLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-red-600 transition max-md:text-center max-md:text-xs max-md:py-2 max-md:px-1 max-md:rounded-lg max-md:bg-white max-md:border max-md:border-gray-200 max-md:font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            <p className="text-gray-500 text-center md:text-right text-xs sm:text-sm w-full md:w-auto max-md:order-3 max-md:text-[11px] max-md:text-gray-400">
              Made with ❤️ using React
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

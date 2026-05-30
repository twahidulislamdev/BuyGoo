import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { useAuthStore, getFullName } from "../../stores/authStore";

export default function UserAccountDropdown({ className = "" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { isLoggedIn, email, user, checkLogin, logout } = useAuthStore();

  const fullName = getFullName(user, email);
  const displayEmail = email || user?.email || "";
  const avatarLetter = (fullName.charAt(0) || "U").toUpperCase();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeDropdown = () => setDropdownOpen(false);

  const handleLogout = () => {
    logout();
    closeDropdown();
    navigate("/login");
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-label="Account menu"
        aria-expanded={dropdownOpen}
        className="flex h-10 w-10 items-center justify-center bg-neutral-100 border border-neutral-300 rounded-xl  text-slate-900 hover:border-mainColor hover:text-mainColor transition-all duration-300 cursor-pointer"
      >
        <FaRegUser className="text-xl" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 z-50 mt-7 w-[375px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
          {isLoggedIn ? (
            <div>
              <div className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-lg font-semibold text-white">
                    {avatarLetter}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-slate-900">
                      {fullName}
                    </h3>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {displayEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="grid gap-2 px-4 py-4">
                <Link
                  to="/account"
                  onClick={closeDropdown}
                  className="rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm
                  text-center font-bold text-slate-800 hover:bg-slate-100 cursor-pointer transition-all duration-300"
                >
                  My Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white  hover:bg-mainColor/90 cursor-pointer transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="px-5 py-4">
                <p className="text-sm font-semibold text-slate-900">Welcome!</p>
                <p className="mt-1 text-sm text-slate-500">
                  Sign in to see your orders, coupons, and address details.
                </p>
              </div>

              <div className="border-t border-gray-100" />

              <div className="grid gap-2 px-4 py-4">
                <Link
                  to="/login"
                  onClick={closeDropdown}
                  className="rounded-xl bg-mainColor px-4 py-3 text-center text-sm font-medium text-white hover:bg-mainColor/90 cursor-pointer transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeDropdown}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-800 hover:bg-slate-100 cursor-pointer transition-all duration-300"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

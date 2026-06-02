import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container";
import { useAuthStore, getFullName } from "../../stores/authStore";
import { orderApi } from "../../config/api";

const menuItems = [
  { label: "My Orders", description: "Review your recent purchases." },
  { label: "Wishlists", description: "See the products you saved for later." },
  { label: "My Coupon", description: "Track discounts and coupon codes." },
  { label: "Address", description: "Manage your shipping addresses." },
  { label: "Change Password", description: "Update your account password." },
  {
    label: "Logout",
    description: "Sign out of your account.",
    action: "logout",
  },
];

const contentMap = {
  "My Orders":
    "View all of your orders, track shipment status, and review order details.",
  Wishlists:
    "Your saved products appear here so you can add them to the cart later.",
  "My Coupon":
    "Add or apply coupon codes to your next purchase and view available offers.",
  Address:
    "Store, edit, and remove your saved shipping addresses for faster checkout.",
  "Change Password":
    "Update your password regularly to keep your account secure.",
};

// ------------------ My Orders Component -------------------

// ================== My Orders Component ===================
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getMyOrders();
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-gray-500">Loading your orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (orders.length === 0)
    return <p className="text-gray-500">You haven't placed any orders yet.</p>;

  return (
    // ================== Orders Item List Layout ===================
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Order ID
              </span>
              <p className="text-sm font-medium text-gray-900">
                #{order._id.slice(-6).toUpperCase()}
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Date
              </span>
              <p className="text-sm font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Status
              </span>
              <p
                className={`text-sm font-bold uppercase ${order.status === "delivered" ? "text-green-600" : order.status === "cancelled" ? "text-red-600" : "text-amber-500"}`}
              >
                {order.status}
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Total
              </span>
              <p className="text-sm font-bold text-gray-900">
                ৳{order.grandTotal?.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <h4 className="text-sm font-medium mb-2 text-gray-700">Items:</h4>
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-3">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded-md border border-gray-100"
                      />
                    )}
                    <span className="text-gray-600">
                      {item.title} (x{item.quantity})
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">
                    ৳{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
// ================== Dashboard Layout and Logic ===================
const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { email, isLoggedIn, checkLogin, logout } = useAuthStore();
  const [activeItem, setActiveItem] = useState("My Orders");
  const [authChecked, setAuthChecked] = useState(false);

  const { user } = useAuthStore();
  const fullName = getFullName(user, email);

  useEffect(() => {
    checkLogin().finally(() => setAuthChecked(true));
  }, [checkLogin]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!authChecked) {
    return (
      <Container>
        <div className="py-20 text-center text-gray-500">Loading your account...</div>
      </Container>
    );
  }

  // If the user is not logged in, show a prompt to log in
  if (!isLoggedIn) {
    return (
      <Container>
        <div className="py-20">
          <div className=" rounded-[32px] border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Please sign in
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              You need to log in to access your customer dashboard and order
              information.
            </p>
            <Link
              to="/login"
              className="inline-flex rounded-full bg-mainColor px-6 py-3 text-sm font-semibold text-white hover:bg-mainColor/90"
            >
              Go to login
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    // ================== Dashboard Layout Sidebar ===================
    <Container>
      <div className="py-5">
        <div className="mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="grid gap-6 md:grid-cols-[280px_1fr]">
            <aside className="border-r border-gray-100 bg-slate-50 p-6">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[.24em] text-gray-500">
                  Customer Dashboard
                </p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-900">
                  Hello, <br /> {fullName}
                </h1>
                <p className="mt-2 text-xs text-gray-500">{email}</p>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.action === "logout") {
                        handleLogout();
                      } else {
                        setActiveItem(item.label);
                      }
                    }}
                    className={`w-full rounded-xl px-3 py-3 text-left text-sm transition-all duration-200 border border-neutral-300 cursor-pointer ${
                      item.label === activeItem
                        ? "bg-black text-white"
                        : "bg-white text-neutral-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-base font-bold">{item.label}</div>

                    <p
                      className={`mt-1 text-xs ${
                        item.label === activeItem
                          ? "text-white"
                          : "text-neutral-500"
                      }`}
                    >
                      {item.description}
                    </p>
                  </button>
                ))}
              </nav>
            </aside>

            <main className="p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-900">
                    {activeItem}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Manage your account and customer settings from one place.
                  </p>
                </div>
                <Link
                  to="/shop"
                  className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
                >
                  Continue shopping
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-gray-700">
                {activeItem === "My Orders" ? (
                  <MyOrders />
                ) : (
                  <p className="text-sm leading-7">
                    {contentMap[activeItem] ||
                      "Choose an item from the menu to manage your dashboard settings."}
                  </p>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CustomerDashboard;

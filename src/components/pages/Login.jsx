import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Container from "../Container";
import { customerAuthApi } from "../../config/api";
import { useAuthStore } from "../../stores/authStore";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await customerAuthApi.login({
        email: formData.email,
        password: formData.password,
      });

      const responseMessage = response?.data?.message || "";
      if (responseMessage.startsWith("Error")) {
        setError(responseMessage);
        return;
      }

      const user = response?.data?.user || { email: formData.email };
      setUser(user);
      setMessage(responseMessage || "Login successful.");

      if (remember) {
        localStorage.setItem("buygoo_customer_email", formData.email);
      } else {
        localStorage.removeItem("buygoo_customer_email");
      }

      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <div className="flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="relative flex-col justify-between px-0 lg:px-10 py-0 lg:py-5 my-0 lg:my-5 overflow-hidden hidden lg:flex rounded-2xl border border-white/10"
              style={{ background: "#0d0d0d" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.025) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.025) 40px)",
                }}
              />

              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white opacity-[0.03]" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white opacity-[0.02]" />

              <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              <div className="relative z-10 flex items-center gap-3">
                <Link to="/" className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl text-white font-bold">
                    Buy<span className="text-mainColor">Goo</span>
                  </h3>
                </Link>
              </div>

              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <IoShieldCheckmarkOutline className="text-white/50 text-xs" />
                  <span className="text-xs text-white/40 tracking-wide">
                    Secure login
                  </span>
                </div>

                <h1
                  className="text-white text-[32px] font-normal leading-[1.35] mb-4"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Navigate your
                  <br />
                  <em className="not-italic text-white/30">workflow</em>
                  <br />
                  with clarity.
                </h1>
                <p className="text-white/35 text-sm leading-relaxed font-light mb-7">
                  The workspace built for teams
                  <br />
                  who move fast and think clearly.
                </p>

                <div className="flex items-center gap-5">
                  <div className="text-center">
                    <div className="text-lg font-medium text-white/80">12k+</div>
                    <div className="text-[11px] text-white/30 mt-0.5">Teams</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="text-lg font-medium text-white/80">99.9%</div>
                    <div className="text-[11px] text-white/30 mt-0.5">Uptime</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="text-lg font-medium text-white/80">SOC 2</div>
                    <div className="text-[11px] text-white/30 mt-0.5">Certified</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/")}
                className="relative z-10 flex items-center gap-2 text-sm text-white/75 font-medium border border-white/20 hover:bg-white/14 hover:border-white/40 transition-all duration-200 px-4 py-2 rounded-lg w-fit cursor-pointer"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <IoArrowBack className="text-sm" />
                Back to home
              </button>
            </div>

            <div className="bg-white flex flex-col justify-center px-10 py-0 lg:py-6 my-0 lg:my-5 rounded-2xl border border-gray-200">
              <button
                onClick={() => navigate("/")}
                className="flex lg:hidden items-center gap-2 text-sm text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200 px-3 py-2 rounded-lg w-fit cursor-pointer mb-8"
              >
                <IoArrowBack className="text-sm" />
                Back to home
              </button>

              <div className="mb-10">
                <h2
                  className="text-[26px] font-normal text-[#0d0d0d] mb-1.5"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Welcome back
                </h2>
                <p className="text-sm text-gray-400 font-light">
                  Sign in to continue to your workspace
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] font-medium uppercase tracking-[1px] text-gray-500">
                    Email address
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-[42px] pl-10 pr-3 text-sm text-[#0d0d0d] bg-gray-50 border border-gray-200 rounded-[9px] outline-none transition-all duration-200 focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5 placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] font-medium uppercase tracking-[1px] text-gray-500">
                    Password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none" />
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-[42px] pl-10 pr-12 text-sm text-[#0d0d0d] bg-gray-50 border border-gray-200 rounded-[9px] outline-none transition-all duration-200 focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5 placeholder:text-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xs font-medium cursor-pointer"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="flex justify-end mt-0.5">
                    <a
                      href="#"
                      className="text-xs text-[#0d0d0d] border-b border-black/20 hover:border-black transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="w-[14px] h-[14px] accent-black cursor-pointer rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-500 cursor-pointer select-none"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}
                {message && <p className="text-xs text-emerald-600">{message}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#0d0d0d] text-white text-xs font-medium uppercase tracking-[2px] rounded-[10px] hover:bg-[#2a2a2a] active:scale-[0.99] transition-all duration-200 cursor-pointer mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[11px] text-gray-300 whitespace-nowrap">
                    or continue with
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="h-10 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-[9px] text-sm text-[#0d0d0d] hover:bg-gray-100 hover:border-gray-300 active:scale-[0.99] transition-all duration-200 cursor-pointer"
                  >
                    <FcGoogle className="text-lg shrink-0" />
                    Google
                  </button>
                  <button
                    type="button"
                    className="h-10 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-[9px] text-sm text-[#0d0d0d] hover:bg-gray-100 hover:border-gray-300 active:scale-[0.99] transition-all duration-200 cursor-pointer"
                  >
                    <FaGithub className="text-[#0d0d0d] text-lg shrink-0" />
                    GitHub
                  </button>
                </div>

                <p className="text-center text-sm text-gray-400 mt-1">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-[#0d0d0d] font-medium border-b border-black/20 hover:border-black transition-colors"
                  >
                    Create one free
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;

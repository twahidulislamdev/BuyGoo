import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { IoArrowBack, IoCheckmarkCircleOutline } from "react-icons/io5";
import Container from "../Container";
import Image from "../Image";

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Weak", color: "#E24B4A" },
    { label: "Fair", color: "#EF9F27" },
    { label: "Good", color: "#639922" },
    { label: "Strong", color: "#1D9E75" },
  ];
  return { score, ...levels[score - 1] };
};

const PERKS = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
];

const SignUp = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState("");

  const strength = getPasswordStrength(password);

  return (
    <div>
      <Container>
        <div className="flex items-center justify-center font-sans overflow-hidden overflow-y-scroll">
          {/* Card Wrapper */}
          <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
            {/* ── LEFT PANEL ── */}
            <div
              className="relative flex-col justify-between px-10 py-0 lg:py-5 my-0 lg:my-5 overflow-hidden hidden lg:flex rounded-2xl border border-white/10"
              style={{ background: "#0d0d0d" }}
            >
              {/* Grid texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.025) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.025) 40px)",
                }}
              />

              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white opacity-[0.03]" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white opacity-[0.02]" />

              {/* Vertical accent line */}
              <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              {/* Brand */}
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

              {/* Headline + Perks */}
              <div className="relative z-10">
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs text-white/40 tracking-wide">
                    Free forever plan
                  </span>
                </div>

                <h1
                  className="text-white text-[32px] font-normal leading-[1.35] mb-4"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Start your
                  <br />
                  <em className="not-italic text-white/30">journey</em>
                  <br />
                  with us today.
                </h1>
                <p className="text-white/35 text-sm leading-relaxed font-light mb-7">
                  Join thousands of teams
                  <br />
                  who move fast and think clearly.
                </p>

                {/* Perks checklist */}
                <div className="flex flex-col gap-3">
                  {PERKS.map((perk) => (
                    <div key={perk} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <IoCheckmarkCircleOutline className="text-white/60 text-xs" />
                      </div>
                      <span className="text-[12px] text-white/40">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to Home */}
              <button
                onClick={() => navigate("/")}
                className="relative z-10 flex items-center gap-2 text-sm text-white/75 font-medium border border-white/20 hover:border-white/40 transition-all duration-200 px-4 py-2 rounded-lg w-fit cursor-pointer"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <IoArrowBack className="text-sm" />
                Back to home
              </button>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="bg-white flex flex-col justify-center px-10 py-0 lg:py-5 my-0 lg:my-5 rounded-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="mb-5">
                <h2
                  className="text-[24px] font-normal text-[#0d0d0d] mb-1"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Create an account
                </h2>
                <p className="text-sm text-gray-400 font-light">
                  Get started — it's free.
                </p>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3.5"
              >
                {/* First Name + Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10.5px] font-medium uppercase tracking-[1px] text-gray-500">
                      First name
                    </label>
                    <div className="relative">
                      <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none" />
                      <input
                        type="text"
                        placeholder="John"
                        required
                        className="w-full h-10 pl-10 pr-3 text-sm text-[#0d0d0d] bg-gray-50 border border-gray-200 rounded-[9px] outline-none transition-all duration-200 focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5 placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10.5px] font-medium uppercase tracking-[1px] text-gray-500">
                      Last name
                    </label>
                    <div className="relative">
                      <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Doe"
                        required
                        className="w-full h-10 pl-10 pr-3 text-sm text-[#0d0d0d] bg-gray-50 border border-gray-200 rounded-[9px] outline-none transition-all duration-200 focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5 placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] font-medium uppercase tracking-[1px] text-gray-500">
                    Email address
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="w-full h-10 pl-10 pr-3 text-sm text-[#0d0d0d] bg-gray-50 border border-gray-200 rounded-[9px] outline-none transition-all duration-200 focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5 placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] font-medium uppercase tracking-[1px] text-gray-500">
                    Password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none" />
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-10 pl-10 pr-12 text-sm text-[#0d0d0d] bg-gray-50 border border-gray-200 rounded-[9px] outline-none transition-all duration-200 focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5 placeholder:text-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xs font-medium cursor-pointer"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {password.length > 0 && (
                    <div className="mt-1">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((seg) => (
                          <div
                            key={seg}
                            className="flex-1 h-[3px] rounded-full transition-all duration-300"
                            style={{
                              background:
                                seg <= strength.score
                                  ? strength.color
                                  : "#e5e7eb",
                            }}
                          />
                        ))}
                      </div>
                      <p
                        className="text-[11px] transition-colors duration-200"
                        style={{ color: strength.color }}
                      >
                        {strength.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] font-medium uppercase tracking-[1px] text-gray-500">
                    Confirm password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none" />
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="w-full h-10 pl-10 pr-12 text-sm text-[#0d0d0d] bg-gray-50 border border-gray-200 rounded-[9px] outline-none transition-all duration-200 focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5 placeholder:text-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xs font-medium cursor-pointer"
                    >
                      {showConfirmPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="agreed"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="w-[14px] h-[14px] accent-black cursor-pointer rounded"
                  />
                  <label
                    htmlFor="agreed"
                    className="text-[12.5px] text-gray-500 cursor-pointer select-none"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-[#0d0d0d] font-medium border-b border-black/20 hover:border-black transition-colors"
                    >
                      Terms
                    </a>{" "}
                    &{" "}
                    <a
                      href="#"
                      className="text-[#0d0d0d] font-medium border-b border-black/20 hover:border-black transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full h-11 bg-[#0d0d0d] text-white text-xs font-medium uppercase tracking-[2px] rounded-[10px] hover:bg-[#2a2a2a] active:scale-[0.99] transition-all duration-200 cursor-pointer mt-0.5"
                >
                  Create account
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[11px] text-gray-300 whitespace-nowrap">
                    or continue with
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Google + GitHub Buttons */}
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

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-400 mt-0.5">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#0d0d0d] font-medium border-b border-black/20 hover:border-black transition-colors"
                  >
                    Sign in
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

export default SignUp;

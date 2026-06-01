import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoArrowBack, IoShieldCheckmarkOutline } from "react-icons/io5";
import Container from "../Container";
import { customerAuthApi } from "../../config/api";

const sanitizePrefilledEmail = (value) => {
  const cleaned = String(value ?? "")
    .trim()
    .replace(/=+$/g, "");

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
};

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(
    sanitizePrefilledEmail(
      location.state?.email || sessionStorage.getItem("pendingCustomerEmail"),
    ),
  );
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (email) {
      sessionStorage.setItem(
        "pendingCustomerEmail",
        sanitizePrefilledEmail(email),
      );
    }
  }, [email]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) return;

    setSubmitted(true);
    setError("");
    setMessage("");

    try {
      const response = await customerAuthApi.verifyOtp({
        email,
        otp: otpValue,
      });

      setMessage(response?.data?.message || "Email Verified Successfully.");
      sessionStorage.removeItem("pendingCustomerEmail");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "OTP Verification Failed. Please Try Again.",
      );
    } finally {
      setSubmitted(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Enter The Email Address First.");
      return;
    }
    setResending(true);
    setError("");
    setMessage("");

    try {
      const response = await customerAuthApi.resendOtp({ email });
      setMessage(response?.data?.message || "A New OTP Has Been Sent.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Could Not Resend OTP. Please Try Again.",
      );
    } finally {
      setResending(false);
    }
  };
  const otpComplete = otp.every((digit) => digit !== "");

  return (
    <div>
      <Container>
        <div className="flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
            {/* Left Section - Branding Start Here */}
            <div
              className="relative flex-col justify-between px-10 py-0 lg:py-5 my-0 lg:my-5 overflow-hidden hidden lg:flex rounded-2xl border border-white/10"
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

              <div className="relative z-10 px-5 py-5 flex-1 h-full flex flex-col items-start justify-center text-white">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <IoShieldCheckmarkOutline className="text-white/50 text-xs" />
                  <span className="text-xs text-white/40 tracking-wide">
                    Secure verification
                  </span>
                </div>
                <h1
                  className="text-white text-[32px] font-normal leading-[1.35] mb-4"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Verify your
                  <br />
                  <em className="not-italic text-white/30">account</em>
                  <br />
                  to complete signup.
                </h1>
                <p className="text-white/35 text-sm leading-relaxed font-light mb-7">
                  Enter the 6-digit code we sent to your email. This helps us
                  keep your account safe and secure.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white">
                      <IoShieldCheckmarkOutline className="text-lg" />
                    </div>
                    <span className="text-[12px] text-white/40">
                      One-Time Password Expires In 5 Minutes.
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white">
                      <MdEmail className="text-lg" />
                    </div>
                    <span className="text-[12px] text-white/40">
                      Make Sure You Use The Email You Registered With.
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-sm text-white/75 font-medium border border-white/20 hover:bg-white/14 hover:border-white/40 transition-all duration-200 px-4 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <IoArrowBack className="text-sm" />
                  Back to home
                </button>
              </div>
            </div>
            {/* Left Section - Branding End Here */}

            {/* Right Section - OTP Verification Form Section Start Here */}
            <div className="bg-white flex flex-col justify-center px-3 py-5 lg:px-5 lg:py-0 my-0 lg:my-5 rounded-2xl border border-gray-200 ">
              <button
                onClick={() => navigate("/")}
                className="flex lg:hidden items-center gap-2 text-sm text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200 px-3 py-3 rounded-lg w-fit cursor-pointer mb-8"
              >
                <IoArrowBack className="text-sm" />
                Back to home
              </button>

              <div className="w-full max-w-md mx-auto rounded-[26px] border border-gray-200 bg-[#fffdfd] px-5 py-6 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.55)]">
                <div className="mb-6">
                  <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[1.5px] text-gray-500 mb-4">
                    Secure verification
                  </div>
                  <h2
                    className="text-[26px] font-normal text-[#0d0d0d] mb-2"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    OTP Verification
                  </h2>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    Enter the 6-digit code we sent to your email to finish
                    signing up.
                  </p>
                </div>

                <form
                  onSubmit={handleVerifyOTP}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[10.5px] font-medium uppercase tracking-[1.5px] text-gray-500">
                      Email address
                    </label>
                    <div className="relative">
                      <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none" />
                      <input
                        type="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={(e) =>
                          setEmail(sanitizePrefilledEmail(e.target.value))
                        }
                        required
                        className="w-full h-[44px] pl-10 pr-3 text-sm text-[#0d0d0d] bg-[#fffefe] border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5 placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10.5px] font-medium uppercase tracking-[1.5px] text-gray-500">
                        One-time password
                      </label>
                      <span className="text-[10px] text-gray-400">
                        6 digits
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={index === 0 ? handleOtpPaste : undefined}
                          className={`
                            aspect-square text-center text-lg font-semibold text-[#0d0d0d]
                            bg-[#fffefe] border rounded-xl outline-none transition-all duration-150
                            focus:border-[#0d0d0d] focus:bg-white focus:ring-[3px] focus:ring-black/5
                            ${digit ? "border-[#0d0d0d] bg-white shadow-[0_0_0_1px_rgba(13,13,13,0.06)]" : "border-gray-200"}
                            placeholder:text-gray-200
                          `}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Tip: you can paste your 6-digit code directly.
                    </p>
                  </div>

                  {error && (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                      {error}
                    </p>
                  )}
                  {message && (
                    <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitted || !otpComplete}
                    className="w-full h-[44px] rounded-xl bg-[#111827] text-white text-sm font-medium hover:bg-black transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-[0_14px_40px_-20px_rgba(0,0,0,0.8)]"
                  >
                    {submitted ? "Verifying..." : "Verify OTP"}
                  </button>

                  <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-neutral-300 px-3 py-3 text-sm text-gray-500 ">
                    <span>Didn't receive a code?</span>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resending}
                      className="font-medium text-[#0d0d0d] text-xs hover:text-black disabled:opacity-50 border-b border-neutral-900 hover:border-black transition-all duration-150 cursor-pointer"
                    >
                      {resending ? "Resending..." : "Resend code"}
                    </button>
                  </div>
                </form>

                <p className="flex justify-center items-center text-sm text-gray-500 mt-5">
                  Already verified?{" "}
                  <Link
                    to="/login"
                    className="ml-1 text-[#0d0d0d] font-medium hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
            {/* Right Section - OTP Verification Form Section End Here */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OTPVerification;

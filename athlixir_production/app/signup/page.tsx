"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, ArrowRight, Loader2,
  Trophy, Users, Target, Phone, CheckCircle2, X,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Role = "athlete" | "coach" | "user";

interface SignupFormData {
  fullName: string;
  phone: string;
  role: Role;
  otp: string;
}

// ---------------------------------------------------------------------------
// Role config
// ---------------------------------------------------------------------------
const ROLES: { id: Role; label: string; icon: React.ElementType }[] = [
  { id: "athlete", label: "Athlete", icon: Trophy },
  { id: "coach",   label: "Coach",   icon: Target },
  { id: "user",    label: "User",     icon: Users  },
];

// ---------------------------------------------------------------------------
// Input class
// ---------------------------------------------------------------------------
const signupInputCls =
  "w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-base";

// ---------------------------------------------------------------------------
// Signup Page
// ---------------------------------------------------------------------------
export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    phone: "",
    role: "athlete",
    otp: "",
  });

  const [error, setError]           = useState<string>("");
  const [loading, setLoading]       = useState<boolean>(false);
  const [otpSent, setOtpSent]       = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [otpError, setOtpError]     = useState<string>("");
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpDigits, setOtpDigits]   = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const set = <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSendOtp = async () => {
    if (!formData.phone) return setError("Please enter your phone number first.");
    setOtpLoading(true);
    setOtpError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setOtpSent(true);
      setOtpDigits(["", "", "", "", "", ""]);
      set("otp", "");
      setShowOtpModal(true);
      setResendTimer(60);
    } catch {
      setOtpError("Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpDigits.join("");
    if (otp.length < 6) return setOtpError("Enter all 6 digits.");
    setOtpLoading(true);
    setOtpError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPhoneVerified(true);
      setOtpSent(false);
      setShowOtpModal(false);
    } catch {
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!phoneVerified) {
      return setError("Please verify your phone number before continuing.");
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("athlixir_signup_name", formData.fullName);
      localStorage.setItem("athlixir_signup_phone", formData.phone);
      localStorage.setItem("athlixir_signup_role", formData.role);
      if (formData.role === "coach") {
        router.push("/coach/dashboard");
      } else if (formData.role === "user") {
        router.push("/user/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            key="otp-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]" style={{ maxWidth: "360px" }}
            >
              <button
                type="button"
                onClick={() => { setShowOtpModal(false); setOtpError(""); }}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Phone size={26} className="text-primary" />
                </div>
              </div>

              <h2 className="text-white font-black text-xl uppercase tracking-widest text-center mb-1">Verify Phone</h2>
              <p className="text-gray-500 text-[11px] text-center uppercase tracking-widest mb-6">
                Enter the 6-digit OTP sent to<br />
                <span className="text-primary font-bold">+91 {formData.phone}</span>
              </p>

              <div className="flex justify-center gap-3 mb-4">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={otpRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      const next = [...otpDigits];
                      next[i] = val;
                      setOtpDigits(next);
                      setOtpError("");
                      if (val && i < 5) otpRefs[i + 1].current?.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otpDigits[i] && i > 0) {
                        otpRefs[i - 1].current?.focus();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                      const next = ["", "", "", "", "", ""];
                      pasted.split("").forEach((ch, idx) => { if (idx < 6) next[idx] = ch; });
                      setOtpDigits(next);
                      otpRefs[Math.min(pasted.length, 5)].current?.focus();
                    }}
                    disabled={otpLoading}
                    suppressHydrationWarning
                    className="w-10 h-10 text-center text-xl font-black text-white bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:bg-white/[0.08] transition-all"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-error text-[10px] font-bold uppercase tracking-widest text-center mb-4">{otpError}</p>
              )}

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otpLoading || otpDigits.join("").length < 6}
                suppressHydrationWarning
                className="w-3/4 mx-auto py-4 bg-primary hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,87,34,0.3)]"
              >
                {otpLoading ? <Loader2 size={18} className="animate-spin" /> : "Verify OTP"}
              </button>

              <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest mt-4">
                Didn&apos;t receive?{" "}
                {resendTimer > 0 ? (
                  <span className="text-primary font-black">
                    Resend in {Math.floor(resendTimer / 60)}:{String(resendTimer % 60).padStart(2, "0")}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    disabled={otpLoading}
                    className="text-primary font-black hover:text-orange-400 transition-colors"
                  >
                    Resend
                  </button>
                )}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
          alt="Athlete Training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-10 left-6 lg:left-12 z-20"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowRight className="rotate-180 text-primary" size={18} />
          Back to Home
        </Link>
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-175 px-6 relative z-10"
      >
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="mb-4">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <polygon points="26,4 6,48 14,48 26,18" fill="#FF5722" />
              <polygon points="26,4 46,48 38,48 26,18" fill="#E64A19" />
              <rect x="14" y="30" width="24" height="5" rx="1" fill="#FF5722" />
            </svg>
          </Link>
          <h1 className="text-4xl font-black text-white mb-2 uppercase text-center leading-tight tracking-[0.05em]">Join the Ecosystem</h1>
          <p className="text-gray-400 text-center text-[10px] font-black uppercase tracking-[0.3em]">
            Create your verified <span className="text-primary font-bold">digital profile</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row bg-black/40 backdrop-blur-3xl border border-white/10 rounded-lg overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]">

          {/* Vertical Role Switcher */}
          <div className="w-full md:w-32 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 flex md:flex-col justify-around md:justify-center p-4 gap-4">
            {ROLES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => set("role", id)}
                suppressHydrationWarning
                className={`flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-all flex-1 md:flex-none ${
                  formData.role === id
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(255,87,34,0.25)]"
                    : "text-muted hover:text-secondary hover:bg-white/5"
                }`}
              >
                <Icon size={24} className="mb-2" />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="flex-1 p-8 md:p-10" onFocus={() => setError("")}>

            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-bold uppercase tracking-widest text-center">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                  Full Identity Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-disabled group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={signupInputCls}
                    value={formData.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    required
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                  Phone Number
                </label>
                <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-lg focus-within:border-primary/50 focus-within:bg-white/[0.08] transition-all overflow-hidden">
                  <div className="pl-6 pr-4 flex items-center pointer-events-none text-disabled group-focus-within:text-primary transition-colors shrink-0 border-r border-white/10">
                    <Phone size={18} />
                  </div>
                  <span className="pl-4 pr-1 py-4 text-muted text-base select-none shrink-0">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="XXXXX XXXXX"
                    className="flex-1 bg-transparent py-4 pl-4 pr-4 text-white placeholder:text-muted focus:outline-none text-base"
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      set("phone", digits);
                      setPhoneVerified(false);
                      setOtpSent(false);
                      set("otp", "");
                    }}
                    required
                    disabled={loading || phoneVerified}
                    suppressHydrationWarning
                  />
                  {phoneVerified && (
                    <div className="pr-4 flex items-center shrink-0">
                      <span className="flex items-center gap-1.5 text-success text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle2 size={16} className="shrink-0" />
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>



              {/* Submit / Verify */}
              {!phoneVerified ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpLoading || !formData.fullName || formData.phone.length < 10}
                  suppressHydrationWarning
                  className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.5)] flex items-center justify-center gap-3 mt-6 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {otpLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify Phone
                      <Phone size={18} />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  suppressHydrationWarning
                  className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.5)] flex items-center justify-center gap-3 group mt-6 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create Profile
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-500 text-sm font-medium tracking-wide">
          Already an Athlete?{" "}
          <Link
            href="/login"
            className="text-primary font-black hover:text-orange-400 transition-colors uppercase ml-1"
          >
            Access Portal
          </Link>
        </p>
      </motion.div>
    </div>
  );
}


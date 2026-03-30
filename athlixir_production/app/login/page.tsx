"use client";


import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Phone } from "lucide-react";
import { buildMeriPehchaanAuthUrl, generateState, generateCodeVerifier, generateCodeChallenge } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  // OAuth login handler
  const handleOAuthLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    try {
      const state = generateState(16);
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const clientId = process.env.NEXT_PUBLIC_MERIPEHCHAAN_CLIENT_ID || "";
      if (!clientId) throw new Error("OAuth client ID not configured");
      
      localStorage.setItem("athlixir_login_phone", phone);
      localStorage.setItem("athlixir_oauth_state", state);
      localStorage.setItem("athlixir_oauth_code_verifier", codeVerifier);
      localStorage.setItem("athlixir_oauth_client_id", clientId);

      const url = buildMeriPehchaanAuthUrl({ clientId, state, codeChallenge });
      window.location.href = url;
    } catch (err: any) {
      setError(err.message || "Failed to start login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">


      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1305&auto=format&fit=crop"
          alt="Athlete Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Back to Home */}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-120 px-6 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <polygon points="26,4 6,48 14,48 26,18" fill="#FF5722" />
              <polygon points="26,4 46,48 38,48 26,18" fill="#E64A19" />
              <rect x="14" y="30" width="24" height="5" rx="1" fill="#FF5722" />
            </svg>
          </Link>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Access Portal</h1>
          <p className="text-gray-400 text-center text-[10px] font-black uppercase tracking-[0.3em]">
            Secured Athlixir <span className="text-primary">Data Gate</span>
          </p>
        </div>

        {/* Login Card */}
        <div
          className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-lg p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          onFocus={() => setError("")}
        >
          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleOAuthLogin} className="space-y-8">
            {/* Phone Field */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                Phone Number
              </label>
              <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-lg focus-within:border-primary/50 focus-within:bg-white/8 transition-all overflow-hidden">
                <div className="pl-5 pr-3 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors shrink-0">
                  <Phone size={20} />
                </div>
                <span className="pr-3 py-4 text-gray-500 text-base select-none shrink-0 border-r border-white/10">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="XXXXX XXXXX"
                  className="flex-1 bg-transparent py-4 pl-4 pr-4 text-white placeholder:text-gray-700 focus:outline-none text-lg"
                  value={phone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhone(digits);
                    setError("");
                  }}
                  required
                  disabled={loading}
                  suppressHydrationWarning
                />
                {/* No phoneVerified badge in OAuth flow */}
              </div>
            </div>

            {/* Submit / Verify Button */}
            <button
              type="submit"
              disabled={loading || phone.length < 10}
              suppressHydrationWarning
              className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.5)] flex items-center justify-center gap-3 group mt-4 uppercase tracking-widest text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Continue / Login
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-gray-500 text-sm font-medium tracking-wide">
          New Athlete?{" "}
          <Link href="/signup" className="text-primary font-black hover:text-orange-400 transition-colors uppercase ml-1">
            Build Profile
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

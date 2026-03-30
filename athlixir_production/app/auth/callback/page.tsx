"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeJwt } from "@/lib/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const processed = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (processed.current) return;

      const code = params.get("code");
      const state = params.get("state");
      if (!code || !state) {
        setError("Missing code or state");
        setLoading(false);
        return;
      }
      const storedState = localStorage.getItem("athlixir_oauth_state");
      const storedPhone = localStorage.getItem("athlixir_login_phone");
      const codeVerifier = localStorage.getItem("athlixir_oauth_code_verifier");
      const clientId = localStorage.getItem("athlixir_oauth_client_id");

      console.log('Auth Callback Debug:', {
        urlState: state,
        storedState,
        hasCodeVerifier: !!codeVerifier,
        clientId,
        domain: typeof window !== 'undefined' ? window.location.hostname : 'N/A'
      });

      if (!storedState || !codeVerifier || !clientId || state !== storedState) {
        setError("Invalid or expired state. Please try login again.");
        setLoading(false);
        return;
      }

      processed.current = true;
      try {
        const res = await fetch("/api/auth/meri-pehchaan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, code_verifier: codeVerifier, client_id: clientId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Token exchange failed");
        
        const idPayload = decodeJwt(data.id_token);
        const profile = data.user_profile || idPayload;

        // Extract phone for verification
        const idPhone = profile.phone_number || profile.phone || profile.mobile || "";
        const cleanIdPhone = String(idPhone).replace(/^\+91/, "");
        const cleanStoredPhone = String(storedPhone).replace(/^\+91/, "");

        if (storedPhone && cleanIdPhone && cleanStoredPhone !== cleanIdPhone) {
          setError(`Phone mismatch. Expected ${cleanStoredPhone}, but DigiLocker account uses ${cleanIdPhone}.`);
          setLoading(false);
          return;
        }

        // Store session and profile
        document.cookie = `athlixir_session=${data.id_token}; path=/; SameSite=Lax`;
        localStorage.setItem("athlixir_user_profile", JSON.stringify(profile));

        // Cleanup
        localStorage.removeItem("athlixir_oauth_state");
        localStorage.removeItem("athlixir_login_phone");
        localStorage.removeItem("athlixir_oauth_code_verifier");
        localStorage.removeItem("athlixir_oauth_client_id");

        // Redirect to dashboard or home
        router.replace("/dashboard");
      } catch (err: any) {
        setError(err.message || "Authentication failed");
        setLoading(false);
      }
    };
    run();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {loading ? (
        <div className="text-lg font-bold">Authenticating...</div>
      ) : error ? (
        <div className="max-w-md p-6 bg-red-900/80 rounded-xl border border-red-500/30 text-center">
          <div className="text-xl font-black mb-2">Login Error</div>
          <div className="text-red-300 mb-4">{error}</div>
          <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold mt-2" onClick={() => router.replace("/login")}>Back to Login</button>
        </div>
      ) : null}
    </div>
  );
}

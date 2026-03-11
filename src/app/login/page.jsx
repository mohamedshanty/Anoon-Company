"use client";
import { Suspense } from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// فصل محتوى الفورم في مكون منفصل
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log("Login attempt:", { email });

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Login response:", { authError, data });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      console.error("Login error:", authError.message);
      return;
    }

    if (data && data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      console.log("Session set for Supabase.");
    }

    setIsLoading(false);
    console.log("Login successful, redirecting:", redirect);
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#030712]">
      {/* Background - نفس الكود الموجود */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/10 via-[#030712] to-[#030712]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-32 h-16 rounded-2xl mb-4">
            <Image
              src="/images/logo1.png"
              alt="Anoon Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Anoon CMS</h1>
          <p className="text-white/40 mt-1 text-sm">
            Sign in to manage your blog
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/60 uppercase tracking-widest text-xs">
                Email
              </label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/60 uppercase tracking-widest text-xs">
                Password
              </label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
              />
            </div>

            <button
              type="submit"
              id="login-submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Powered by Supabase Auth · Anoon Solutions
        </p>
      </div>
    </div>
  );
}

// المكون الرئيسي مع Suspense
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#030712]">
          <div className="text-white/60 text-lg">Loading login page...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

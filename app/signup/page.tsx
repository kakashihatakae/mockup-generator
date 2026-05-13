"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { signupAction } from "@/lib/actions/auth";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signupAction(formData);

    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-6 text-[#1d1d1f]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[400px]"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-semibold text-[24px] tracking-tight mb-2">
            MockForge
          </Link>
          <h1 className="text-[24px] font-semibold tracking-tight">Create your account</h1>
          <p className="text-[15px] text-muted mt-1 tracking-tight">Get 20 free credits to start.</p>
        </div>

        <div className="apple-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[13px] font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-3 py-2.5 bg-white border border-black/10 rounded-lg text-[15px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[13px] font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                minLength={6}
                className="w-full px-3 py-2.5 bg-white border border-black/10 rounded-lg text-[15px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-[13px] font-medium text-foreground">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                minLength={6}
                className="w-full px-3 py-2.5 bg-white border border-black/10 rounded-lg text-[15px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
            </div>

            {error && (
              <div className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="apple-btn-primary w-full py-3 mt-4 flex items-center justify-center"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-[13px] text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in.
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

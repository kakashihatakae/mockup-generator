"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { loginAction } from "@/lib/actions/auth";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

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
          <h1 className="text-[24px] font-semibold tracking-tight">Sign in to MockForge</h1>
        </div>

        <div className="apple-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                autoComplete="current-password"
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
              className="apple-btn-primary w-full py-3 mt-2 flex items-center justify-center"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[13px] text-muted mt-6">
          Don&apos;t have an Apple ID?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create yours now.
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

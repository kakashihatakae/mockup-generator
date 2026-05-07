"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-primary" />
        <span className="font-bold text-xl tracking-tight">MockForge</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
        <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
        <Link href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</Link>
        <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="hidden md:block text-sm font-medium text-muted hover:text-foreground transition-colors">
          Log in
        </Link>
        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">
          Get Started
        </button>
      </div>
    </motion.nav>
  );
}

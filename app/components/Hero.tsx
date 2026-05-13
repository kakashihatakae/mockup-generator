"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 max-w-[980px] mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-[56px] md:text-[80px] leading-[1.05] font-semibold tracking-[-0.015em] mb-6">
          Mockups.<br />
          Perfectly crafted.
        </h1>
        <p className="text-[24px] leading-[1.3] text-muted font-medium mb-10 max-w-[600px] mx-auto tracking-tight">
          The ultimate engine for generating photorealistic apparel mockups. Fast, beautiful, and completely in your browser.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="apple-btn-primary w-full sm:w-auto text-[17px] py-3.5 px-8">
            Start generating
          </Link>
          <Link href="/dashboard" className="apple-btn-secondary w-full sm:w-auto text-[17px] py-3.5 px-8">
            View dashboard
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-20 relative aspect-video rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white border border-black/[0.04]"
      >
        <Image 
          src="/mockups/hero.png" 
          alt="MockForge Interface" 
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </section>
  );
}

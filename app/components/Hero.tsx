"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video auto-play failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh]">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
        src="/background.mp4"
      />
      
      {/* Targeted overlay for text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,245,247,0.85)_0%,rgba(245,245,247,0)_70%)] z-[1]" />

      <div className="px-6 md:px-12 mx-auto text-center relative z-10 flex justify-center items-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-[56px] md:text-[80px] leading-[1.05] font-semibold tracking-[-0.015em] mb-6">
            Mockups.<br />
            Perfectly crafted.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="apple-btn-primary w-full sm:w-auto text-[17px] py-3.5 px-8">
              Start generating
            </Link>
            {/* <Link href="/dashboard" className="apple-btn-secondary w-full sm:w-auto text-[17px] py-3.5 px-8">
              View dashboard
            </Link> */}
          </div>
        </motion.div>

        {/* <motion.div
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
        </motion.div> */}
      </div>
    </section>
  );
}

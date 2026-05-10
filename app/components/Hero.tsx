"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EditorMockup } from "./EditorMockup";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-accent mb-8">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          MockForge 2.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Turn Anything Into <br className="hidden md:block" />
          <span className="text-gradient">Stunning Mockups</span> in Seconds
        </h1>

        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
          Upload an image or describe your idea — MockForge generates high-quality, realistic mockups instantly. No design skills required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(124,92,255,0.4)]">
            Generate Mockup <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
            See Examples
          </button>
        </div>
      </motion.div>

      {/* <EditorMockup /> */}
    </section>
  );
}

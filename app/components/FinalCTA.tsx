"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Start Creating Mockups <br/>That Actually Convert
        </h2>
        <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
          Join thousands of creators making premium visuals in seconds. No credit card required.
        </p>
        <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          Try for Free <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}

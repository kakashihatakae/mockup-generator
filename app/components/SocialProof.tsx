"use client";

import { motion } from "framer-motion";
import { Hexagon, Triangle, Circle, Square } from "lucide-react";

export function SocialProof() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-muted mb-8">
          TRUSTED BY INNOVATIVE TEAMS WORLDWIDE
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale">
          <div className="flex items-center gap-2"><Hexagon className="w-6 h-6" /><span className="font-bold text-xl">Acme Corp</span></div>
          <div className="flex items-center gap-2"><Triangle className="w-6 h-6" /><span className="font-bold text-xl">Polymath</span></div>
          <div className="flex items-center gap-2"><Circle className="w-6 h-6" /><span className="font-bold text-xl">Nexus</span></div>
          <div className="flex items-center gap-2"><Square className="w-6 h-6" /><span className="font-bold text-xl">Vertex</span></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <div className="text-xl md:text-2xl font-medium italic text-foreground mb-4">
            &ldquo;MockForge saved me hours of design work. What used to take half a day in Photoshop now takes literally 5 seconds. It's magic.&rdquo;
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
            <div className="text-left">
              <div className="font-bold">Sarah Jenkins</div>
              <div className="text-sm text-muted">Indie Maker</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

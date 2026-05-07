"use client";

import { motion } from "framer-motion";
import { Briefcase, PenTool, Megaphone, Video } from "lucide-react";

const useCases = [
  {
    role: "Founders",
    use: "Pitch Decks",
    icon: Briefcase,
    description: "Drop your MVP screenshots into realistic laptops and phones to impress investors.",
  },
  {
    role: "Designers",
    use: "Portfolios",
    icon: PenTool,
    description: "Showcase your UI/UX designs in premium environments without downloading heavy PSDs.",
  },
  {
    role: "Marketers",
    use: "Ad Campaigns",
    icon: Megaphone,
    description: "Generate dozens of variations for A/B testing on social media instantly.",
  },
  {
    role: "Creators",
    use: "Social Media",
    icon: Video,
    description: "Make your digital products look tangible and boost your conversion rates.",
  }
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-6 border-t border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for Creators</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">See how different professionals are using MockForge to elevate their work.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((uc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl hover:bg-white/[0.08] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <uc.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{uc.role}</h3>
                  <div className="text-xs text-accent font-medium uppercase tracking-wider">{uc.use}</div>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out MockForge.",
    features: ["5 mockups per month", "Standard quality", "Watermarked exports", "Basic device library"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For professionals who need high-quality assets.",
    features: ["Unlimited mockups", "4K export quality", "No watermarks", "Full premium library", "API access"],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Studio",
    price: "$49",
    period: "/mo",
    description: "For teams working at scale.",
    features: ["Everything in Pro", "Custom 3D environments", "Team collaboration", "Priority support", "White-label exports"],
    cta: "Contact Sales",
    popular: false,
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                tier.popular 
                  ? "bg-gradient-to-b from-primary/20 to-black border-2 border-primary shadow-[0_0_40px_rgba(124,92,255,0.2)] md:-translate-y-4" 
                  : "glass border border-white/10"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-medium mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-muted">{tier.period}</span>}
              </div>
              <p className="text-sm text-muted mb-8 h-10">{tier.description}</p>
              
              <button className={`w-full py-3 rounded-xl font-bold transition-all mb-8 ${
                tier.popular 
                  ? "bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(124,92,255,0.4)]" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}>
                {tier.cta}
              </button>

              <ul className="space-y-4">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

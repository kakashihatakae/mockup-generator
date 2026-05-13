"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out the engine.",
    features: [
      "20 free generation credits",
      "Standard 1080p exports",
      "Basic apparel templates",
      "Community support"
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For independent designers and creators.",
    features: [
      "Unlimited generations",
      "4K high-res exports",
      "Premium garment library",
      "Commercial license",
      "Priority rendering"
    ],
    cta: "Start 14-day Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and high-volume brands.",
    features: [
      "Custom 3D model integration",
      "API access",
      "8K editorial exports",
      "Dedicated account manager",
      "SSO & advanced security"
    ],
    cta: "Contact Sales",
    highlighted: false,
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-[-0.015em] mb-4">
          Simple, transparent pricing.
        </h2>
        <p className="text-[21px] text-muted tracking-tight">
          Start for free, upgrade when you need more power.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`apple-card p-8 flex flex-col ${
              plan.highlighted ? "border-primary/30 shadow-[0_8px_30px_rgba(0,113,227,0.12)] relative" : ""
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                Most Popular
              </div>
            )}
            
            <h3 className="text-[24px] font-semibold tracking-tight mb-2">{plan.name}</h3>
            <p className="text-[15px] text-muted mb-6">{plan.description}</p>
            
            <div className="mb-8 flex items-baseline">
              <span className="text-[48px] font-bold tracking-tight">{plan.price}</span>
              {plan.period && <span className="text-[17px] text-muted ml-1">{plan.period}</span>}
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-[15px] leading-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3.5 rounded-full font-medium text-[15px] transition-colors ${
                plan.highlighted 
                  ? "bg-primary text-white hover:bg-primary-hover" 
                  : "bg-black/[0.05] text-foreground hover:bg-black/[0.08]"
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

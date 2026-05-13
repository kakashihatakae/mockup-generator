"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const featureDetails = [
  {
    title: "Heavyweight Cotton Hoodie",
    desc: "Achieve the perfect streetwear aesthetic. Our engine accurately renders the thick fabric folds, drawstrings, and subtle material grain of a premium heavyweight hoodie.",
    src: "/mockups/hero.png",
    badge: "Most Popular"
  },
  {
    title: "Canvas Tote Bag",
    desc: "Elevate your branding presentations. The engine perfectly wraps your design around the natural curves and wrinkles of heavy cotton canvas, reacting naturally to the studio lighting.",
    src: "/mockups/totebag.png",
    badge: "New Material"
  },
  {
    title: "Matte Ceramic Mug",
    desc: "Notice the way the light catches the curved edge. Our reflection algorithms ensure that your artwork conforms seamlessly to cylindrical objects without distortion.",
    src: "/mockups/coffeecup.png",
    badge: "Perfect Reflections"
  }
];

export function Features() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-[-0.015em] mb-4">
          Uncompromising detail.
        </h2>
        <p className="text-[21px] text-muted tracking-tight max-w-[600px] mx-auto">
          We don't do flat templates. Every mockup is rendered in a full 3D environment to capture true material physics.
        </p>
      </div>

      <div className="space-y-32">
        {featureDetails.map((feature, i) => (
          <div 
            key={i}
            className={`flex flex-col gap-12 lg:items-center ${
              i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
          >
            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 1 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-black/[0.04] bg-[#f5f5f7]">
                <Image 
                  src={feature.src} 
                  alt={feature.title} 
                  fill 
                  className="object-cover" 
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 lg:px-12"
            >
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[13px] font-semibold tracking-wide mb-6">
                {feature.badge}
              </div>
              <h3 className="text-[32px] md:text-[40px] leading-[1.1] font-semibold tracking-tight mb-6">
                {feature.title}
              </h3>
              <p className="text-[19px] text-muted leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

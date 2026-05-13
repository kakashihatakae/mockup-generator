"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "MockForge has completely replaced our Photoshop workflow. What used to take hours of warping and lighting adjustments now happens instantly.",
    author: "Sarah Jenkins",
    role: "Art Director, Studio Nine",
    initials: "SJ"
  },
  {
    quote: "The fabric textures and lighting realism are unmatched. It genuinely looks like we booked an expensive studio photoshoot for our merch line.",
    author: "David Chen",
    role: "Founder, Streetwear Co.",
    initials: "DC"
  },
  {
    quote: "We've seen a 40% increase in conversion rates since switching to MockForge's photorealistic product images on our store.",
    author: "Elena Rodriguez",
    role: "E-commerce Manager",
    initials: "ER"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white border-t border-b border-black/[0.04]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-[-0.015em] mb-4">
            Trusted by creators.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="apple-card p-8 flex flex-col justify-between"
            >
              <div className="mb-8">
                <div className="flex text-[#F5A623] mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[17px] text-foreground leading-relaxed">"{t.quote}"</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black/[0.05] flex items-center justify-center font-semibold text-[15px] tracking-wide">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] tracking-tight">{t.author}</h4>
                  <p className="text-[13px] text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

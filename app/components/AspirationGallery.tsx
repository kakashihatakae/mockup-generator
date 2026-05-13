"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    id: "01",
    title: "Canvas Tote",
    desc: "Heavyweight cotton texture with dramatic lighting.",
    src: "/mockups/totebag.png"
  },
  {
    id: "02",
    title: "Matte Ceramic",
    desc: "Perfect light reflection on curved surfaces.",
    src: "/mockups/coffeecup.png"
  },
  {
    id: "03",
    title: "Neon Edge",
    desc: "Premium streetwear aesthetic in dark environments.",
    src: "/mockups/tshirt.png"
  }
];

export function AspirationGallery() {
  return (
    <section className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            Flawless execution.
          </h2>
          <p className="text-2xl text-[#888888] max-w-2xl tracking-tight">
            Editorial-grade assets that elevate your brand narrative. Stop using generic templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#111] border border-white/10 mb-6">
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-mono text-[#555]">{item.id}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white tracking-tight mb-1">{item.title}</h3>
                  <p className="text-[#888] text-sm">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

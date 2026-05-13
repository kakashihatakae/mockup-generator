"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "1",
    title: "Upload",
    desc: "Drop your flat artwork into our engine."
  },
  {
    num: "2",
    title: "Adjust",
    desc: "Scale, position, and select your garment."
  },
  {
    num: "3",
    title: "Export",
    desc: "Download high-resolution, photorealistic assets."
  }
];

export function WorkflowSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-[980px] mx-auto text-center">
        <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-[-0.015em] mb-16">
          A seamless workflow.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-left"
            >
              <div className="w-12 h-12 rounded-full bg-black/[0.05] text-foreground flex items-center justify-center text-[20px] font-semibold mb-6">
                {step.num}
              </div>
              <h3 className="text-[24px] font-semibold tracking-tight mb-2">{step.title}</h3>
              <p className="text-[17px] leading-[1.4] text-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

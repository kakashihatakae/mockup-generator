"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Settings2, Zap, RotateCcw, Check } from "lucide-react";

const workflowSteps = [
  {
    id: "configure",
    title: "Configure",
    desc: "Select fabrics, lighting, and environmental details with a single tap. Our engine supports everything from heavy cotton to delicate silks.",
    icon: <Settings2 className="w-5 h-5" />
  },
  {
    id: "generate",
    title: "Generate",
    desc: "Watch as the engine renders your creation in photorealistic detail. Every fold and shadow is calculated in real-time.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: "repeat",
    title: "Repeat",
    desc: "Refine your design and iterate until the vision is perfect. Compare versions side-by-side to find the winning aesthetic.",
    icon: <RotateCcw className="w-5 h-5" />
  }
];

export function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.3) setActiveStep(0);
    else if (latest < 0.6) setActiveStep(1);
    else setActiveStep(2);
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white border-t border-black/[0.04]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="relative h-[400px] flex flex-col justify-center">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={false}
                animate={{ 
                  opacity: activeStep === i ? 1 : 0,
                  y: activeStep === i ? 0 : 20,
                  pointerEvents: activeStep === i ? "auto" : "none"
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-3 text-primary font-semibold tracking-wide uppercase text-[13px] mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  Step {i + 1}
                </div>
                <h2 className="text-[40px] md:text-[56px] leading-[1.1] font-semibold tracking-tight mb-6">
                  {step.title}
                </h2>
                <p className="text-[19px] text-muted leading-relaxed max-w-[440px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="relative aspect-square w-full max-w-[540px] mx-auto lg:ml-auto">
            <div className="absolute inset-0 apple-card overflow-hidden bg-[#F5F5F7] border-black/[0.04] shadow-[0_40px_80px_rgba(0,0,0,0.1)]">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div 
                    key="config"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="absolute inset-0 p-8 flex flex-col"
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <div className="relative w-48 h-48 rounded-2xl bg-white shadow-xl flex items-center justify-center p-4">
                        <div className="w-full h-full bg-black/[0.03] rounded-lg border-2 border-dashed border-black/10 flex items-center justify-center">
                          <Settings2 className="w-8 h-8 text-black/20" />
                        </div>
                      </div>
                    </div>
                    <motion.div className="apple-glass p-5 rounded-2xl border border-white/40 shadow-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-semibold uppercase tracking-wider text-muted">Material</span>
                        <div className="flex gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#E5E5E5] ring-2 ring-primary" />
                          <div className="w-5 h-5 rounded-full bg-[#2C2C2E]" />
                        </div>
                      </div>
                      <div className="h-[1px] bg-black/5 w-full" />
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-semibold uppercase tracking-wider text-muted">Lighting</span>
                        <div className="flex gap-2 bg-black/[0.05] p-1 rounded-lg">
                          <div className="px-3 py-1 bg-white rounded-md text-[11px] font-medium shadow-sm">Studio</div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div 
                    key="generate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image src="/mockups/hoodie_1.png" alt="Generating..." fill className="object-cover" />
                    <motion.div 
                      initial={{ top: "-10%" }} animate={{ top: "110%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-primary/20 to-transparent blur-xl z-20"
                    />
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div 
                    key="repeat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 p-8"
                  >
                    <div className="grid grid-cols-2 gap-4 h-full pt-12">
                      {[1, 2, 3, 4].map((n, i) => (
                        <motion.div
                          key={n}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="relative aspect-square rounded-xl overflow-hidden border border-black/5 shadow-md"
                        >
                          <Image src={i % 2 === 0 ? "/mockups/asian_t_shirt_1.png" : "/mockups/hoodie_1.png"} alt="Variant" fill className="object-cover" />
                          <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

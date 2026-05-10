"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Upload, SlidersHorizontal, Sparkles, Share2 } from "lucide-react";

/* ─── Step Data ─── */
const steps = [
  {
    number: 1,
    title: "Upload Your Design",
    description:
      "Drag and drop any image, logo, or screenshot. We support all major formats and handle the rest automatically.",
    icon: Upload,
  },
  {
    number: 2,
    title: "Customize Settings",
    description:
      "Pick a template, adjust colors, lighting, and angles. Fine‑tune every detail until it's perfect.",
    icon: SlidersHorizontal,
  },
  {
    number: 3,
    title: "Generate Mockups",
    description:
      "Our AI renders photorealistic mockups in seconds — no Photoshop, no 3D software, no waiting.",
    icon: Sparkles,
  },
  {
    number: 4,
    title: "Export & Share",
    description:
      "Download in high resolution or share directly to social media, pitch decks, and storefronts.",
    icon: Share2,
  },
];

/* ─── Main Section ─── */
export function WorkflowSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* ── Ambient Background Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-accent mb-6">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            Simple Workflow
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            From upload to export in four effortless steps. No design skills
            needed&nbsp;— just results.
          </p>
        </motion.div>

        {/* ── Desktop: Horizontal Layout with Connecting Line ── */}
        <div className="hidden lg:block relative">
          {/* Animated connecting line */}
          <div className="absolute top-[60px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-[2px] z-0">
            <div className="relative w-full h-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-primary via-accent to-primary rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <StepCard
                key={step.number}
                step={step}
                index={idx}
                isInView={isInView}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile / Tablet: Stacked Cards with Vertical Line ── */}
        <div className="lg:hidden relative">
          {/* Vertical connecting line */}
          <div className="absolute top-0 bottom-0 left-8 w-[2px] z-0">
            <div className="relative w-full h-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={
                  prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }
                }
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{
                  duration: 1.4,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 origin-top bg-gradient-to-b from-primary via-accent to-primary rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            {steps.map((step, idx) => (
              <MobileStepCard
                key={step.number}
                step={step}
                index={idx}
                isInView={isInView}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Desktop Step Card ─── */
function StepCard({
  step,
  index,
  isInView,
  prefersReducedMotion,
}: {
  step: (typeof steps)[0];
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
      className="group flex flex-col items-center text-center"
    >
      {/* Step Number Orb */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
        className="relative mb-6"
      >
        {/* Glow ring */}
        <div className="absolute -inset-3 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-[48px] h-[48px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary/50 group-hover:shadow-[0_0_25px_rgba(124,92,255,0.5)] transition-all duration-300">
          {step.number}
        </div>
      </motion.div>

      {/* Card Body */}
      <div className="glass p-6 rounded-2xl w-full hover:bg-white/[0.08] transition-all duration-300 cursor-default group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.08)]">
        {/* Image Placeholder */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-black/40 border border-white/5">
          {/* Blurred placeholder background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/10" />
          {/* Skeleton shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
          {/* Icon watermark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-10 h-10 text-white/10" />
          </div>
          {/* Soft top glow */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/20 blur-2xl rounded-full pointer-events-none" />
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-white group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
        {/* Description */}
        <p className="text-muted text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Step Card ─── */
function MobileStepCard({
  step,
  index,
  isInView,
  prefersReducedMotion,
}: {
  step: (typeof steps)[0];
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
      className="group flex gap-5 items-start"
    >
      {/* Step Number Orb — aligns with the vertical line */}
      <div className="relative shrink-0 mt-1">
        <div className="absolute -inset-2 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-[40px] h-[40px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-base text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(124,92,255,0.5)] transition-all duration-300 z-10">
          {step.number}
        </div>
      </div>

      {/* Card */}
      <div className="glass p-5 rounded-2xl flex-1 hover:bg-white/[0.08] transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.08)]">
        {/* Image Placeholder */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-8 h-8 text-white/10" />
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/20 blur-2xl rounded-full pointer-events-none" />
        </div>

        <h3 className="font-bold text-lg mb-1 text-white group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

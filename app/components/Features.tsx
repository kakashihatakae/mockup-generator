"use client";

import { motion } from "framer-motion";
import { LayoutTemplate, Gift, Layers, Wand2 } from "lucide-react";

const features = [
  {
    number: "#1",
    title: "AI Mockup Templates",
    description: "Its templates are so unique that nothing else comes close. No matter what product you have, every AI template from this AI mockup generator will touch your heart.",
    icon: LayoutTemplate,
    col: 1,
  },
  {
    number: "#2",
    title: "A Free Plan",
    description: "You don’t get a truly free plan with most mockup generators. It’s true that there are some limitations here, but getting downloads without watermarks is not possible anywhere else.",
    icon: Gift,
    col: 2,
  },
  {
    number: "#3",
    title: "Maximum Number of Templates & Categories",
    description: "More than 20,000 templates and over 45 categories. Wow, that’s more than anywhere else! And new ones keep getting added.",
    icon: Layers,
    col: 1,
  },
  {
    number: "#4",
    title: "AI Tools",
    description: "With the help of AI tools, you can convert mockups into animations, change the background and elements. The generation speed is fast, and the quality remains excellent.",
    icon: Wand2,
    col: 2,
  }
];

export function Features() {
  const col1 = features.filter(f => f.col === 1);
  const col2 = features.filter(f => f.col === 2);

  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Use MockForge&apos;s Online Mockup Generator?</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Why should you use MockForge? What does it have that others don’t? Let’s find out.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {col1.map((feature, idx) => (
              <FeatureCard key={feature.number} feature={feature} delay={idx * 0.1} />
            ))}
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col gap-6 w-full md:w-1/2 md:mt-24">
            {col2.map((feature, idx) => (
              <FeatureCard key={feature.number} feature={feature} delay={0.2 + idx * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }: { feature: typeof features[0], delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass p-8 md:p-10 rounded-3xl flex flex-col relative overflow-hidden group min-h-[400px] hover:bg-white/[0.08] transition-colors cursor-pointer"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="font-bold text-lg">{feature.number}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-2xl mb-4 text-white group-hover:text-primary transition-colors">{feature.title}</h3>
        <p className="text-muted leading-relaxed mb-8">{feature.description}</p>
        
        <div className="mt-auto flex justify-end">
          <div className="p-6 rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-105 origin-bottom-right shadow-[0_0_0_0_rgba(124,92,255,0)] group-hover:shadow-[0_0_30px_0_rgba(124,92,255,0.4)]">
            <feature.icon className="w-12 h-12 md:w-16 md:h-16" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


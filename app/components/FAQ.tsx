"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need any 3D or design skills?",
    a: "Not at all. MockForge is designed to be completely intuitive. Just upload your flat 2D artwork (PNG or JPG), select the garment, and our engine automatically wraps, lights, and renders it."
  },
  {
    q: "What file formats do you export?",
    a: "We support high-resolution PNG exports with transparent backgrounds, allowing you to seamlessly drop the mockups into your website, marketing materials, or social media."
  },
  {
    q: "Can I use the images for commercial purposes?",
    a: "Yes. All images generated on the Pro and Enterprise plans come with a full commercial license, meaning you can use them anywhere, indefinitely."
  },
  {
    q: "How fast is the rendering process?",
    a: "Most mockups render in under 3 seconds. High-resolution 4K exports on the Pro plan take approximately 5-8 seconds depending on server load."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-[800px] mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="text-center mb-16">
        <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-[-0.015em] mb-4">
          Common questions.
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="apple-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-[17px] font-medium tracking-tight">{faq.q}</span>
              <ChevronDown 
                className={`w-5 h-5 text-muted transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} 
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="px-6 pb-6 text-[15px] text-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

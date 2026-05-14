"use client";

import Link from "next/link";
import { ShieldCheck, Zap } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-white text-center border-t border-black/[0.04]">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-[-0.015em] mb-6">
          Ready to elevate your store?
        </h2>
        <p className="text-[21px] text-muted mb-10 tracking-tight max-w-[600px] mx-auto">
          Join thousands of designers generating perfect photorealistic mockups in seconds. No credit card required.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/signup" className="apple-btn-primary text-[17px] py-4 px-10 w-full sm:w-auto">
            Get your 20 free credits
          </Link>
          {/* <Link href="#pricing" className="apple-btn-secondary text-[17px] py-4 px-10 w-full sm:w-auto">
            View full pricing
          </Link> */}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[13px] text-muted font-medium">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F5A623]" />
            <span>Setup in under 60 seconds</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#34C759]" />
            <span>Secure commercial licensing</span>
          </div>
        </div>
      </div>
    </section>
  );
}

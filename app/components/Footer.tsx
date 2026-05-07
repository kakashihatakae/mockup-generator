"use client";

import Link from "next/link";
import { Sparkles, MessageCircle, Code, Briefcase } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">MockForge</span>
          </div>
          <p className="text-muted text-sm leading-relaxed mb-6">
            The AI-powered mockup generator for modern creators. Build stunning visuals in seconds.
          </p>
          <div className="flex gap-4 text-muted">
            <MessageCircle className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Code className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Briefcase className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="flex gap-16">
          <div>
            <h4 className="font-medium text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Showcase</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
        <p>© {new Date().getFullYear()} MockForge Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

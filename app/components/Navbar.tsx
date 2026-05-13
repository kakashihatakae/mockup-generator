"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[52px] apple-glass z-50 flex items-center justify-between px-6 md:px-12">
      <Link href="/" className="font-semibold text-[17px] tracking-tight">MockForge</Link>
      <div className="flex items-center gap-6">
        <Link href="/login" className="text-[13px] text-muted hover:text-foreground transition-colors">Sign In</Link>
        <Link href="/signup" className="text-[13px] text-primary hover:text-primary-hover transition-colors">Get Started</Link>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { LogOut, CreditCard, Zap } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

interface DashboardNavbarProps {
  credits: number;
  email: string;
}

export function DashboardNavbar({ credits, email }: DashboardNavbarProps) {
  const initials = email
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-[52px] apple-glass">
      <Link href="/dashboard" className="font-semibold text-[17px] tracking-tight text-[#1d1d1f]">
        MockForge
      </Link>

      <div className="flex items-center gap-4">
        {/* Credits badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-muted border border-black/[0.04]">
          <Zap className="w-3.5 h-3.5 text-[#1d1d1f]" />
          <span className="text-[13px] font-medium tracking-tight">
            <span className="text-[#1d1d1f]">{credits}</span>
            <span className="ml-1 hidden sm:inline">credits</span>
          </span>
        </div>

        {/* Buy credits CTA */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[13px] font-medium hover:bg-primary/20 transition-colors">
          <CreditCard className="w-3.5 h-3.5" />
          Buy Credits
        </button>

        {/* Avatar */}
        <div className="w-[28px] h-[28px] rounded-full bg-black/[0.05] flex items-center justify-center text-[10px] font-semibold text-[#1d1d1f] tracking-wide">
          {initials}
        </div>

        {/* Logout */}
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-[28px] h-[28px] rounded-full flex items-center justify-center hover:bg-black/[0.05] transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4 text-muted" />
          </button>
        </form>
      </div>
    </nav>
  );
}

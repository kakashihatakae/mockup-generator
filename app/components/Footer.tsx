import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-black/[0.04] py-10 px-6 md:px-12 text-[12px] text-muted">
      <div className="max-w-[980px] mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>Copyright © {new Date().getFullYear()} MockForge Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}

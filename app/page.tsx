import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WorkflowSection } from "./components/WorkflowSection";
import { Features } from "./components/Features";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export const metadata = {
  title: "MockForge - Photorealistic apparel mockups in seconds",
  description: "The ultimate engine for generating photorealistic apparel mockups. Fast, beautiful, and completely in your browser. Start with 20 free credits.",
};

export default function Home() {
  return (
    <div className="bg-[#f5f5f7] min-h-screen text-[#1d1d1f] selection:bg-primary selection:text-white font-sans">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <Testimonials />
        <Features />
        <WorkflowSection />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

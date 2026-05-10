import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { Features } from "./components/Features";
import { InteractiveDemo } from "./components/InteractiveDemo";
import { WorkflowSection } from "./components/WorkflowSection";
import { UseCases } from "./components/UseCases";
import { Pricing } from "./components/Pricing";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col pt-16">
        <Hero />
        {/* <SocialProof /> */}
        <WorkflowSection />
        <Features />
        {/* <InteractiveDemo /> */}
        {/* <UseCases /> */}
        {/* <Pricing /> */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

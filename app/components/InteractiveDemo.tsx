"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Loader2 } from "lucide-react";

export function InteractiveDemo() {
  const [prompt, setPrompt] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generated, setGenerated] = React.useState(false);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Glow behind demo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10" />

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">See the Magic</h2>
          <p className="text-muted">Describe your mockup, and we'll generate it instantly.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Description</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A sleek black iPhone 15 pro standing on a dark wooden desk with soft studio lighting..."
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button className="flex-1 glass border border-white/10 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                <Upload className="w-4 h-4" /> Upload Image
              </button>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="flex-[2] bg-primary text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="h-64 md:h-auto glass bg-black/40 border border-white/10 rounded-xl overflow-hidden relative flex items-center justify-center">
            {!generated && !isGenerating && (
              <div className="text-muted text-sm flex flex-col items-center gap-2">
                <Sparkles className="w-8 h-8 opacity-50" />
                Preview will appear here
              </div>
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {generated && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 p-6 flex flex-col"
              >
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-48 h-64 border-[6px] border-zinc-700 rounded-[2rem] bg-black relative shadow-2xl overflow-hidden shadow-primary/20">
                    <div className="absolute top-0 inset-x-0 h-4 bg-black z-10 rounded-t-[1.5rem]" />
                    <div className="absolute top-0 inset-x-0 flex justify-center z-20">
                      <div className="w-16 h-4 bg-black rounded-b-xl" />
                    </div>
                    {/* Simulated screen content based on prompt */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-center p-4">
                      <p className="text-[10px] font-mono text-white/80 line-clamp-4">{prompt}</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-center text-muted mt-2">Generated Result</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

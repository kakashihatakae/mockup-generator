"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Upload, Shirt, Sparkles, MousePointer2, Move, ZoomIn } from "lucide-react";

export function EditorMockup() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mt-20 relative w-full max-w-5xl mx-auto glass-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* Browser / App Header */}
      <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="mx-auto w-48 md:w-64 h-6 bg-white/5 rounded-md flex items-center px-3 justify-center">
           <span className="text-[10px] text-muted font-medium">mockforge.ai/editor</span>
        </div>
      </div>

      {/* App Body */}
      <div className="flex flex-col md:flex-row h-[350px] md:h-[500px] bg-[#0a0a0a]">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 border-r border-white/10 p-4 flex-col gap-4 bg-white/[0.02]">
          <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Layers</div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
            <ImageIcon className="w-4 h-4 text-muted" />
            <span className="text-sm">Base T-Shirt</span>
          </div>
          <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg flex items-center gap-3">
            <Upload className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Brand_Logo.png</span>
          </div>
          
          <div className="mt-auto">
            <button className="w-full py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-lg hover:bg-primary/90 transition-colors">
              Export Mockup
            </button>
          </div>
        </div>

        {/* Canvas Workspace */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* T-Shirt Mockup Area */}
          <div className="relative w-48 h-64 md:w-64 md:h-80 bg-zinc-800 rounded-2xl shadow-2xl flex items-center justify-center border border-white/5 z-10">
            <Shirt className="w-32 h-32 md:w-48 md:h-48 text-zinc-700" strokeWidth={1} />
            
            {/* Added image (Logo) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8, y: -40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
               className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(124,92,255,0.5)] border-2 border-white/20"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>

            {/* Drag handle mockup */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.5, duration: 0.3 }}
               className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 border border-dashed border-primary rounded-xl animate-[spin_10s_linear_infinite]"
            />
          </div>

          {/* Floating Toolbar */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-4 shadow-xl z-20"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20"><MousePointer2 className="w-4 h-4 text-zinc-300" /></div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer border border-primary/30"><Move className="w-4 h-4 text-primary" /></div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20"><ZoomIn className="w-4 h-4 text-zinc-300" /></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

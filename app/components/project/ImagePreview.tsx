"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Expand, Sparkles } from "lucide-react";
import { ImageLightbox } from "./ImageLightbox";

interface ImagePreviewProps {
  images: string[];
  isGenerating: boolean;
}

export function ImagePreview({ images, isGenerating }: ImagePreviewProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  function handleDownload(src: string, index: number) {
    const link = document.createElement("a");
    link.href = src;
    link.download = `nabber-mockup-${index + 1}.png`;
    link.click();
  }

  return (
    <>
      <ImageLightbox
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />

      <div className="space-y-4">
        {/* Warning banner */}
        <div className="px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs">
          ⚠️ Images are currently not stored permanently on the cloud. Please
          download your generated images after creation.
        </div>

        {/* Generation loading */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="aspect-[3/4] flex flex-col items-center justify-center gap-4 relative">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-pulse" />

                {/* Spinner */}
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="text-center z-10">
                  <p className="text-sm font-medium text-white">
                    Generating your mockup...
                  </p>
                  <p className="text-xs text-muted mt-1">
                    This may take 15–30 seconds
                  </p>
                </div>

                {/* Shimmer bars */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="h-3 bg-white/5 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-white/5 rounded animate-pulse w-1/2" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generated images */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Generated mockup ${i + 1}`}
                  className="w-full object-contain"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => setLightboxSrc(src)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
                    title="View full size"
                  >
                    <Expand className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => handleDownload(src, i)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
                    title="Download"
                  >
                    <Download className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isGenerating && images.length === 0 && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="aspect-[3/4] flex flex-col items-center justify-center gap-3 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <Sparkles className="w-10 h-10 text-white/10" />
              <p className="text-sm text-muted z-10">
                Your generated mockups will appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

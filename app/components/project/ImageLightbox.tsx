"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface ImageLightboxProps {
  src: string | null;
  onClose: () => void;
}

export function ImageLightbox({ src, onClose }: ImageLightboxProps) {
  if (!src) return null;

  function handleDownload() {
    if (!src) return;
    const link = document.createElement("a");
    link.href = src;
    link.download = `nabber-mockup-${Date.now()}.png`;
    link.click();
  }

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          {/* Actions bar */}
          <div className="absolute top-6 right-6 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            src={src}
            alt="Generated mockup preview"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  preview: string | null;
}

export function FileUploader({ onFileSelect, preview }: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleRemove = useCallback(() => {
    onFileSelect(null);
  }, [onFileSelect]);

  if (preview) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">
          Upload Graphic
        </label>
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Uploaded graphic"
            className="w-full h-40 object-contain p-4"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-red-500/30 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted">Upload Graphic</label>
      <motion.label
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-3 h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
          isDragOver
            ? "border-primary bg-primary/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDragOver ? "bg-primary/20" : "bg-white/5"
          }`}
        >
          {isDragOver ? (
            <ImageIcon className="w-5 h-5 text-primary" />
          ) : (
            <Upload className="w-5 h-5 text-muted" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm text-muted">
            <span className="text-primary font-medium">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-muted/60 mt-1">PNG, JPG up to 10MB</p>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </motion.label>
    </div>
  );
}

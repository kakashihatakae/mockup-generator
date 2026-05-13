"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateProject: () => void;
}

export function EmptyState({ onCreateProject }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-32 px-6"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-black/[0.03] flex items-center justify-center">
          <Plus className="w-8 h-8 text-muted" />
        </div>
      </div>

      <h2 className="text-[24px] font-semibold mb-2 tracking-tight">No mockups yet</h2>
      <p className="text-[15px] text-muted text-center max-w-sm mb-8 tracking-tight">
        Create your first mockup. Upload a design, pick your settings, and let our engine do the rest.
      </p>

      <button
        onClick={onCreateProject}
        className="apple-btn-primary flex items-center gap-2 text-[15px]"
      >
        <Plus className="w-4 h-4" />
        Create Project
      </button>
    </motion.div>
  );
}

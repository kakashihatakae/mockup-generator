"use client";

import { motion } from "framer-motion";

interface SegmentedControlProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted">{label}</label>
      <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="relative flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors z-10"
          >
            {value === opt.value && (
              <motion.div
                layoutId={`segment-${label}`}
                className="absolute inset-0 bg-primary rounded-lg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${
                value === opt.value ? "text-white" : "text-muted hover:text-white/70"
              }`}
            >
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

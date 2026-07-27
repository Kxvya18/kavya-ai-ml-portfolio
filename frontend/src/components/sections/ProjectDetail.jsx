import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ProjectDetail({ project, onClose }) {
  const d = project.detail;
  const rows = [
    { label: "Summary", value: d.summary },
    { label: "Stack", value: d.stack },
    { label: "Pipeline", value: d.pipeline },
    { label: "Outputs", value: d.outputs },
    { label: "Metrics", value: d.metrics },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div
        className="absolute inset-0 bg-[#0e0c08]/85 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", damping: 24 }}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#3a3220] bg-[#141009] p-8 md:p-12"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center border border-[#3a3220] text-[#a89b7a] hover:bg-[#c9a961] hover:text-[#0e0c08] hover:border-[#c9a961] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] mb-4">
          {project.category}
        </p>
        <h3 className="font-serif text-[#f5efe0] text-2xl md:text-4xl leading-tight mb-8">
          {d.title}
        </h3>

        <div className="space-y-6">
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid md:grid-cols-[140px_1fr] gap-3 md:gap-6 pb-6 border-b border-[#2a2416] last:border-0"
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#8a7c5c]">
                {r.label}
              </div>
              <p className="text-[#b8ac8c] text-sm leading-relaxed">{r.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

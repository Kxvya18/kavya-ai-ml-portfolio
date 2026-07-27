import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { filters, selectedWork } from "../../mock";
import ProjectDetail from "./ProjectDetail";

export default function SelectedWork() {
  const [active, setActive] = useState("All");
  const [openId, setOpenId] = useState(null);

  const list =
    active === "All" ? selectedWork : selectedWork.filter((p) => p.tag === active);

  const openProject = selectedWork.find((p) => p.id === openId);

  return (
    <section id="work" className="relative bg-[#0e0c08] py-32">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">
              Selected Work
            </p>
            <h2 className="font-serif text-[#f5efe0] text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Animated case-study wall
            </h2>
            <p className="mt-5 text-[#b8ac8c] max-w-md text-sm">
              Filter, open, and inspect the projects as technical systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-xs tracking-wide border transition-colors ${
                  active === f
                    ? "bg-[#c9a961] text-[#0e0c08] border-[#c9a961]"
                    : "border-[#3a3220] text-[#a89b7a] hover:border-[#c9a961] hover:text-[#e6d9a8]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, idx) => (
              <motion.button
                layout
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => setOpenId(p.id)}
                className="group text-left relative overflow-hidden rounded-2xl border border-[#2a2416] bg-[#141009] p-7 hover:border-[#c9a961]/60 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/0 via-transparent to-[#c9a961]/0 group-hover:from-[#c9a961]/8 group-hover:to-[#c9a961]/0 transition-all duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#c9a961]">
                      {p.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#8a7c5c] group-hover:text-[#e6d9a8] group-hover:rotate-45 transition-all" />
                  </div>
                  <h3 className="font-serif text-[#f5efe0] text-xl leading-snug mb-4 min-h-[3.5rem]">
                    {p.title}
                  </h3>
                  <p className="text-[#8a7c5c] text-xs leading-relaxed">{p.text}</p>
                  <div className="mt-6 pt-4 border-t border-[#2a2416] flex items-center justify-between">
                    <span className="text-[10px] tracking-wider uppercase text-[#5a5340]">
                      #{p.tag}
                    </span>
                    <span className="text-[10px] tracking-wider uppercase text-[#5a5340]">
                      Case Study
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectDetail project={openProject} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { projectIndex } from "../../mock";
import TerminalHeader from "../TerminalHeader";

export default function ProjectIndex({ hideHeader = false }) {
  return (
    <section className="relative bg-[#0e0c08] py-20 border-t border-[#2a2416]">
      <div className="max-w-[1400px] mx-auto px-8">
        {!hideHeader && (
          <div className="max-w-2xl mb-10">
            <TerminalHeader
              file="index.sh"
              cwd="~/portfolio/projects"
              command="find . -name '*.md' | wc -l"
              output={[`${projectIndex.length} additional experiments found`]}
            />
          </div>
        )}
        <div className="mb-10">
          <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">Index</p>
          <h2 className="font-serif text-[#f5efe0] text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
            More technical work
          </h2>
        </div>

        <div className="divide-y divide-[#2a2416] border-y border-[#2a2416]">
          {projectIndex.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04, duration: 0.6 }}
              className="group grid md:grid-cols-[80px_1fr_2fr] gap-6 py-7 hover:bg-[#141009] px-2 md:px-4 transition-colors cursor-default"
            >
              <div className="font-mono text-[#5a5340] text-xs pt-1">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-[#f5efe0] text-lg md:text-xl leading-snug group-hover:text-[#e6d9a8] transition-colors">
                {p.title}
              </h3>
              <p className="text-[#8a7c5c] text-sm leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

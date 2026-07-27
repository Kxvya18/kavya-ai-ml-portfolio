import React from "react";
import { motion } from "framer-motion";
import { skills } from "../../mock";
import TerminalHeader from "../TerminalHeader";

export default function Skills({ hideHeader = false }) {
  return (
    <section id="skills" className="relative bg-[#0e0c08] py-20 border-t border-[#2a2416]">
      <div className="max-w-[1400px] mx-auto px-8">
        {!hideHeader && (
          <>
            <div className="max-w-2xl mb-10">
              <TerminalHeader
                file="skills.sh"
                cwd="~/portfolio"
                command="cat skills.json | jq keys"
                output={skills.map(
                  (s, i) => `  "${String(i + 1).padStart(2, "0")}": "${s.title}"`
                )}
              />
            </div>
            <div className="mb-14">
              <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">Skills</p>
              <h2 className="font-serif text-[#f5efe0] text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                Technical range
              </h2>
            </div>
          </>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-[#2a2416] bg-[#141009] p-7 hover:border-[#c9a961]/50 transition-colors"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#c9a961]/8 blur-2xl group-hover:bg-[#c9a961]/15 transition-colors" />
              <div className="relative">
                <div className="font-mono text-[10px] text-[#5a5340] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-[#f5efe0] text-2xl mb-4">{s.title}</h3>
                <p className="text-[#8a7c5c] text-sm leading-relaxed">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

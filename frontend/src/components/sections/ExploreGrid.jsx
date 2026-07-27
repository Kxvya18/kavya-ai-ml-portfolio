import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, FlaskConical, Sparkles, FileText, Mail } from "lucide-react";
import TerminalHeader from "../TerminalHeader";

const cards = [
  { to: "/work", label: "Selected Work", icon: Briefcase, sub: "Case-study wall + full project index + evidence gallery." },
  { to: "/lab", label: "Lab", icon: FlaskConical, sub: "Interactive research experiments — planarity, spectra, homology." },
  { to: "/skills", label: "Skills", icon: Sparkles, sub: "Technical range across AI engineering, ML, DL, graphs, and topology." },
  { to: "/resume", label: "Resume", icon: FileText, sub: "AI-engineer resume with download and print-ready export." },
  { to: "/contact", label: "Contact", icon: Mail, sub: "Let's connect and build serious AI systems together." },
];

export default function ExploreGrid() {
  return (
    <section className="relative bg-[#0e0c08] py-28 border-t border-[#2a2416]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="max-w-2xl mb-10">
          <TerminalHeader
            file="portfolio.sh"
            cwd="~/portfolio"
            command="ls sections/"
            output={cards.map((c) => `drwx------  ${c.to.replace("/", "") || "home"}/  —  ${c.label.toLowerCase()}`)}
          />
        </div>

        <div className="mb-14">
          <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">Sections</p>
          <h2 className="font-serif text-[#f5efe0] text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">
            Enter a room in the portfolio.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <Link
                  to={c.to}
                  className="group block rounded-2xl border border-[#2a2416] bg-[#141009] p-7 hover:border-[#c9a961]/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="w-10 h-10 rounded-full border border-[#3a3220] flex items-center justify-center text-[#c9a961]">
                      <Icon className="w-4 h-4" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#8a7c5c] group-hover:text-[#e6d9a8] group-hover:rotate-45 transition-all" />
                  </div>
                  <div className="font-mono text-[10px] text-[#5a5340] mb-2 tracking-wider uppercase">
                    {String(i + 1).padStart(2, "0")} / 0{cards.length}
                  </div>
                  <div className="font-serif text-[#f5efe0] text-2xl mb-2">{c.label}</div>
                  <div className="text-[#8a7c5c] text-xs leading-relaxed">{c.sub}</div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

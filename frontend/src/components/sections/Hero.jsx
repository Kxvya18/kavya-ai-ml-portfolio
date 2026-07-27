import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroScene from "../three/HeroScene";
import { heroData, contact } from "../../mock";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-[#0e0c08]">
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0c08] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0e0c08_85%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-40 pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[#a89b7a] text-xs tracking-[0.3em] uppercase mb-8"
        >
          {heroData.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif text-[#f5efe0] text-5xl md:text-7xl lg:text-[88px] leading-[1.02] max-w-5xl tracking-tight"
        >
          {heroData.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-10 max-w-2xl text-[#b8ac8c] text-base md:text-lg leading-relaxed"
        >
          {heroData.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <button
            onClick={() => navigate("/work")}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9a961] text-[#0e0c08] hover:bg-[#e6d9a8] transition-colors text-sm font-medium"
          >
            Explore Work
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </button>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] transition-colors text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] transition-colors text-sm font-medium"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3"
        >
          {heroData.labels.map((l) => (
            <div key={l} className="flex items-center gap-2 text-[#8a7c5c] text-xs tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a961]" />
              {l}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#8a7c5c] text-[10px] tracking-[0.3em] uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}

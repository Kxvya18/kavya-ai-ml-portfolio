import React from "react";
import Nav from "../components/sections/Nav";
import Skills from "../components/sections/Skills";
import ResearchStrip from "../components/sections/ResearchStrip";
import Footer from "../components/sections/Footer";
import TerminalHeader from "../components/TerminalHeader";
import { skills } from "../mock";

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#0e0c08]">
      <Nav />
      <div className="max-w-[1400px] mx-auto px-8 pt-32 pb-8">
        <div className="max-w-2xl mb-10">
          <TerminalHeader
            file="skills.sh"
            cwd="~/portfolio"
            command="cat skills.json | jq keys"
            output={skills.map((s, i) => `  "${String(i + 1).padStart(2, "0")}": "${s.title}"`)}
          />
        </div>
        <div>
          <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">Skills</p>
          <h1 className="font-serif text-[#f5efe0] text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
            Technical range.
          </h1>
          <p className="mt-5 text-[#b8ac8c] max-w-xl text-sm">
            AI engineering, ML, deep learning, mathematical AI, graphs and topology, and programming systems.
          </p>
        </div>
      </div>
      <Skills hideHeader />
      <ResearchStrip />
      <Footer />
    </div>
  );
}

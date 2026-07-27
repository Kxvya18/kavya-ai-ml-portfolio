import React from "react";
import Nav from "../components/sections/Nav";
import SelectedWork from "../components/sections/SelectedWork";
import ProjectIndex from "../components/sections/ProjectIndex";
import EvidenceGallery from "../components/sections/EvidenceGallery";
import Footer from "../components/sections/Footer";
import TerminalHeader from "../components/TerminalHeader";
import { selectedWork, projectIndex } from "../mock";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#0e0c08]">
      <Nav />
      <div className="max-w-[1400px] mx-auto px-8 pt-32 pb-8">
        <div className="max-w-2xl mb-10">
          <TerminalHeader
            file="work.sh"
            cwd="~/portfolio/work"
            command="ls -la projects/ | wc -l"
            output={[
              `${selectedWork.length} selected case-studies · ${projectIndex.length} additional experiments`,
              "filter by tag, click any card to inspect stack, pipeline, outputs, and metrics.",
            ]}
          />
        </div>
        <div className="mb-6">
          <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">Work</p>
          <h1 className="font-serif text-[#f5efe0] text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
            Animated case-study wall.
          </h1>
          <p className="mt-5 text-[#b8ac8c] max-w-lg text-sm">
            Filter, open, and inspect the projects as technical systems.
          </p>
        </div>
      </div>
      <SelectedWork hideHeader />
      <ProjectIndex hideHeader />
      <EvidenceGallery />
      <Footer />
    </div>
  );
}

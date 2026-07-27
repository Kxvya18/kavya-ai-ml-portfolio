import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";
import Nav from "../components/sections/Nav";
import SpectralEigenPuzzle from "../components/games/SpectralEigenPuzzle";
import PersistentHomologySlider from "../components/games/PersistentHomologySlider";
import PreferentialAttachment from "../components/games/PreferentialAttachment";
import GraphGame from "../components/sections/GraphGame";

const experiments = [
  { id: "untangle", name: "Graph Untangle", subtitle: "planarity puzzle", tag: "graphs" },
  { id: "spectral", name: "Spectral Eigen Puzzle", subtitle: "Laplacian spectra", tag: "spectral" },
  { id: "homology", name: "Persistent Homology", subtitle: "H₀ barcode", tag: "topology" },
  { id: "pa", name: "Preferential Attachment", subtitle: "BA growth model", tag: "network science" },
];

function Prompt({ text }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    setShown("");
    const t = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [text]);
  return (
    <div className="font-mono text-xs text-[#a89b7a]">
      <span className="text-[#c9a961]">kavya@lab</span>
      <span className="text-[#5a5340]">:</span>
      <span className="text-[#8a7c5c]">~/experiments</span>
      <span className="text-[#5a5340]">$ </span>
      <span>{shown}</span>
      <span className="inline-block w-2 h-3 ml-0.5 bg-[#c9a961] animate-pulse align-middle" />
    </div>
  );
}

export default function LabPage() {
  const [active, setActive] = useState("spectral");

  const promptText = {
    untangle: "python untangle.py --nodes 6 --chords 1",
    spectral: "python spectral.py --graph rand --k 3 --matrix laplacian",
    homology: "python persistence.py --cloud 3-clusters --filtration vietoris-rips",
    pa: "python pa_growth.py --model BA --m 2 --live",
  }[active];

  return (
    <div className="min-h-screen bg-[#0e0c08]">
      <Nav />
      <div className="max-w-[1400px] mx-auto px-8 pt-32 pb-24">
        <div className="mb-14 flex items-start justify-between flex-wrap gap-6">
          <div>
            <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> Lab
            </p>
            <h1 className="font-serif text-[#f5efe0] text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-3xl">
              Interactive research experiments.
            </h1>
            <p className="mt-6 text-[#b8ac8c] text-sm max-w-xl leading-relaxed">
              Live, browser-side simulations of the ideas in my research — no server, no waiting.
              Poke, drag, and rerun.
            </p>
          </div>
        </div>

        {/* terminal-style command bar */}
        <div className="rounded-xl border border-[#2a2416] bg-[#141009] px-5 py-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8a5a3a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#c9a961]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#6a5f42]" />
            <span className="ml-3 text-[10px] tracking-widest uppercase text-[#5a5340]">lab.sh</span>
          </div>
          <Prompt key={active} text={promptText} />
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="space-y-1 lg:sticky lg:top-24 self-start">
            {experiments.map((e) => (
              <button
                key={e.id}
                onClick={() => setActive(e.id)}
                className={`w-full text-left group px-4 py-3 rounded-lg border transition-colors ${
                  active === e.id
                    ? "border-[#c9a961]/60 bg-[#141009]"
                    : "border-transparent hover:border-[#2a2416] hover:bg-[#141009]/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      active === e.id ? "text-[#e6d9a8]" : "text-[#a89b7a]"
                    }`}
                  >
                    {e.name}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      active === e.id ? "text-[#c9a961] translate-x-0.5" : "text-[#5a5340]"
                    }`}
                  />
                </div>
                <div className="text-[10px] tracking-wider uppercase text-[#5a5340] mt-1">
                  {e.subtitle} · {e.tag}
                </div>
              </button>
            ))}
          </aside>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {active === "spectral" && <SpectralEigenPuzzle />}
                {active === "homology" && <PersistentHomologySlider />}
                {active === "pa" && <PreferentialAttachment />}
                {active === "untangle" && (
                  <div className="-mx-0">
                    <GraphGame />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

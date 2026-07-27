import React from "react";
import { researchStrip } from "../../mock";

export default function ResearchStrip() {
  const items = [...researchStrip, ...researchStrip];
  return (
    <section className="relative border-y border-[#2a2416] bg-[#0e0c08] overflow-hidden py-8">
      <div className="flex whitespace-nowrap animate-[scroll_40s_linear_infinite]">
        {items.map((r, i) => (
          <div key={i} className="flex items-center gap-16 pr-16">
            <span className="font-serif text-3xl md:text-4xl text-[#e6e1d6]">{r}</span>
            <span className="w-2 h-2 rotate-45 bg-[#c9a961]" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

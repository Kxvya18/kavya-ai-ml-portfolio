import React from "react";
import { motion } from "framer-motion";
import { evidence } from "../../mock";

function DecisionGraph() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9a961" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8a7c5c" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {[[30,60],[80,30],[80,90],[130,20],[130,60],[130,100],[180,60]].map((n,i)=>(
        <g key={i}>
          <circle cx={n[0]} cy={n[1]} r="5" fill="url(#g1)" />
        </g>
      ))}
      {[[30,60,80,30],[30,60,80,90],[80,30,130,20],[80,30,130,60],[80,90,130,60],[80,90,130,100],[130,20,180,60],[130,60,180,60],[130,100,180,60]].map((e,i)=>(
        <line key={i} x1={e[0]} y1={e[1]} x2={e[2]} y2={e[3]} stroke="#8a7c5c" strokeWidth="0.6" opacity="0.6" />
      ))}
    </svg>
  );
}

function Chart() {
  const pts = [10, 30, 24, 45, 38, 60, 55, 72, 68, 82, 78, 90];
  const path = pts
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * 16 + 10} ${110 - y}`)
    .join(" ");
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <path d={path} stroke="#c9a961" strokeWidth="1.5" fill="none" />
      <path d={path + " L 190 110 L 10 110 Z"} fill="#c9a961" opacity="0.1" />
      {pts.map((y, i) => (
        <circle key={i} cx={i * 16 + 10} cy={110 - y} r="1.6" fill="#e6d9a8" />
      ))}
    </svg>
  );
}

function Persistence() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      {[10, 24, 38, 52, 66, 80, 94].map((y, i) => (
        <line key={i} x1="10" y1={y} x2={30 + i * 24} y2={y} stroke="#c9a961" strokeWidth="2" opacity={0.4 + i * 0.08} />
      ))}
      <line x1="10" y1="5" x2="10" y2="115" stroke="#3a3220" strokeWidth="0.5" />
      <line x1="10" y1="115" x2="195" y2="115" stroke="#3a3220" strokeWidth="0.5" />
    </svg>
  );
}

function Heatmap() {
  const cells = [];
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 10; c++) {
      const v = Math.abs(Math.sin(r * 0.7 + c * 0.4));
      cells.push({ r, c, v });
    }
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      {cells.map((c, i) => (
        <rect
          key={i}
          x={10 + c.c * 18}
          y={10 + c.r * 16}
          width="16"
          height="14"
          fill="#c9a961"
          opacity={0.15 + c.v * 0.7}
        />
      ))}
    </svg>
  );
}

const render = {
  "decision-graph": <DecisionGraph />,
  chart: <Chart />,
  persistence: <Persistence />,
  heatmap: <Heatmap />,
};

export default function EvidenceGallery() {
  return (
    <section className="relative bg-[#0e0c08] py-32 border-t border-[#2a2416]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-14">
          <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">
            Evidence Gallery
          </p>
          <h2 className="font-serif text-[#f5efe0] text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Outputs, diagnostics, and dashboards
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {evidence.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-[#2a2416] bg-[#141009] overflow-hidden hover:border-[#c9a961]/50 transition-colors"
            >
              <div className="aspect-[5/3] bg-[#0e0c08] border-b border-[#2a2416] p-4">
                {render[e.kind]}
              </div>
              <div className="p-5">
                <p className="text-[#a89b7a] text-xs leading-relaxed">{e.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

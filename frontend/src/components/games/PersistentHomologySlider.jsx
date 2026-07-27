import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Lightbulb, Info } from "lucide-react";

/**
 * Persistent Homology Slider (H₀)
 */

function unionFind(n) {
  const p = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
  const union = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return false;
    p[ra] = rb;
    return true;
  };
  return { find, union };
}

function genPoints() {
  const pts = [];
  const clusters = 3;
  for (let c = 0; c < clusters; c++) {
    const cx = 60 + Math.random() * 180;
    const cy = 60 + Math.random() * 180;
    const n = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < n; i++) {
      pts.push([cx + (Math.random() - 0.5) * 55, cy + (Math.random() - 0.5) * 55]);
    }
  }
  return pts;
}

function distances(pts) {
  const pairs = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i][0] - pts[j][0];
      const dy = pts[i][1] - pts[j][1];
      pairs.push({ i, j, d: Math.sqrt(dx * dx + dy * dy) });
    }
  }
  return pairs.sort((a, b) => a.d - b.d);
}

function computeBarcode(pts, sortedPairs) {
  const uf = unionFind(pts.length);
  const bars = pts.map(() => ({ birth: 0, death: null }));
  for (const { i, j, d } of sortedPairs) {
    const ri = uf.find(i);
    const rj = uf.find(j);
    if (ri !== rj) {
      const dyingRoot = ri > rj ? ri : rj;
      bars[dyingRoot].death = d;
      uf.union(i, j);
    }
  }
  return bars;
}

function HowToPlay() {
  return (
    <div className="rounded-xl border border-[#2a2416] bg-[#0e0c08]/60 p-4">
      <div className="flex items-center gap-2 mb-2 text-[#c9a961] text-[10px] tracking-[0.25em] uppercase">
        <Lightbulb className="w-3.5 h-3.5" /> How to play
      </div>
      <ul className="text-[#a89b7a] text-xs leading-relaxed space-y-1 list-disc pl-5">
        <li>
          Every point starts as its own <span className="text-[#e6d9a8]">connected component</span>.
        </li>
        <li>
          Drag <span className="text-[#e6d9a8]">ε</span> to grow a disk of radius ε/2 around each point. When two disks overlap, their components merge.
        </li>
        <li>
          The <span className="text-[#e6d9a8]">H₀ barcode</span> records each component's lifetime — born at ε=0, dying when it merges into another.
        </li>
        <li>
          <span className="text-[#e6d9a8]">Long bars</span> = robust clusters (they survive a wide range of ε). Short bars = noise.
        </li>
        <li>
          Try to find the ε where the number of components drops to <span className="text-[#e6d9a8]">3</span> — that's your cluster count.
        </li>
      </ul>
    </div>
  );
}

export default function PersistentHomologySlider() {
  const [seed, setSeed] = useState(0);
  const [eps, setEps] = useState(30);
  const [showHelp, setShowHelp] = useState(true);

  const { pts, pairs, bars, maxD } = useMemo(() => {
    const pts = genPoints();
    const pairs = distances(pts);
    const bars = computeBarcode(pts, pairs);
    const maxD = pairs[pairs.length - 1]?.d || 200;
    return { pts, pairs, bars, maxD };
    // eslint-disable-next-line
  }, [seed]);

  const activeEdges = pairs.filter((p) => p.d <= eps);
  const uf = unionFind(pts.length);
  activeEdges.forEach(({ i, j }) => uf.union(i, j));
  const compMap = new Map();
  pts.forEach((_, i) => {
    const r = uf.find(i);
    if (!compMap.has(r)) compMap.set(r, compMap.size);
  });
  const compCount = compMap.size;
  const colors = ["#c9a961", "#a89b7a", "#e6d9a8", "#8a7c5c", "#d4b877", "#6a5f42"];
  const barMax = Math.max(maxD, 1);

  const insight =
    compCount === 1
      ? "All points now belong to a single component. ε is large enough to bridge every gap."
      : compCount === 3
      ? "You've reached the natural cluster count. The long bars in the barcode confirm this is a robust structure."
      : compCount > 10
      ? "ε is small — most points are still isolated. Increase it to see structure form."
      : `${compCount} components remain. Watch bars die as ε crosses each merging distance.`;

  return (
    <div className="rounded-2xl border border-[#2a2416] bg-[#141009] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] mb-2">Game · Topology</p>
          <h3 className="font-serif text-[#f5efe0] text-2xl md:text-3xl">Persistent Homology</h3>
          <p className="mt-2 text-[#8a7c5c] text-xs max-w-md">
            Drag ε to grow disks around points. Watch components merge and the H₀ barcode fill in.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHelp((h) => !h)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[#a89b7a] hover:text-[#e6d9a8] border border-[#2a2416] hover:border-[#c9a961] transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHelp ? "Hide help" : "How to play"}
          </button>
          <div className="px-4 py-2 rounded-lg border border-[#2a2416] text-xs text-[#a89b7a]">
            Components <span className="text-[#e6d9a8] font-mono ml-1">{compCount}</span>
          </div>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#a89b7a] hover:text-[#e6d9a8] border border-[#2a2416] hover:border-[#c9a961] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> New cloud
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <HowToPlay />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#2a2416] bg-[#0e0c08] aspect-square">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {pts.map((p, i) => (
              <circle key={`d${i}`} cx={p[0]} cy={p[1]} r={eps / 2} fill="#c9a961" opacity="0.08" />
            ))}
            {activeEdges.map((e, i) => (
              <line
                key={i}
                x1={pts[e.i][0]}
                y1={pts[e.i][1]}
                x2={pts[e.j][0]}
                y2={pts[e.j][1]}
                stroke="#8a7c5c"
                strokeWidth="1"
                opacity="0.6"
              />
            ))}
            {pts.map((p, i) => {
              const c = colors[compMap.get(uf.find(i)) % colors.length];
              return <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={c} />;
            })}
          </svg>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-wider uppercase text-[#8a7c5c]">ε</span>
            <input
              type="range"
              min={0}
              max={200}
              value={eps}
              onChange={(e) => setEps(Number(e.target.value))}
              className="flex-1 accent-[#c9a961]"
            />
            <span className="font-mono text-xs text-[#e6d9a8] w-10">{eps}</span>
          </div>

          <div className="rounded-xl border border-[#2a2416] bg-[#0e0c08] p-4 flex-1 min-h-[260px]">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a7c5c] mb-3">H₀ Barcode</p>
            <div className="space-y-1.5">
              {bars
                .map((b, i) => ({ ...b, i }))
                .sort((a, b) => (b.death || 1e9) - (a.death || 1e9))
                .slice(0, 15)
                .map((b) => {
                  const end = b.death != null ? b.death : barMax;
                  const w = (end / barMax) * 100;
                  const alive = b.death == null || b.death > eps;
                  return (
                    <div key={b.i} className="flex items-center gap-2 h-3">
                      <div
                        className="h-2 rounded-sm"
                        style={{
                          width: `${w}%`,
                          background: alive ? "#c9a961" : "#5a5340",
                          opacity: alive ? 0.9 : 0.5,
                        }}
                      />
                      <div
                        className="h-3 w-px bg-[#e6d9a8]"
                        style={{ marginLeft: `${(eps / barMax) * 100 - w}%` }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[#c9a961]/30 bg-[#c9a961]/5 p-4">
            <div className="flex items-center gap-2 mb-2 text-[10px] tracking-[0.25em] uppercase text-[#c9a961]">
              <Info className="w-3.5 h-3.5" /> Insight
            </div>
            <p className="text-[#b8ac8c] text-xs leading-relaxed">{insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

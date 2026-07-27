import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Play, Pause, Plus, Lightbulb, Info } from "lucide-react";

/**
 * Preferential-Attachment (Barabási–Albert) Growth
 */
export default function PreferentialAttachment() {
  const [nodes, setNodes] = useState(() => [
    { id: 0, x: 200, y: 200 },
    { id: 1, x: 250, y: 220 },
  ]);
  const [edges, setEdges] = useState(() => [[0, 1]]);
  const [playing, setPlaying] = useState(false);
  const [m, setM] = useState(2);
  const [showHelp, setShowHelp] = useState(true);
  const canvasRef = useRef(null);

  const degree = new Array(nodes.length).fill(0);
  edges.forEach(([a, b]) => {
    degree[a] = (degree[a] || 0) + 1;
    degree[b] = (degree[b] || 0) + 1;
  });

  const addNode = () => {
    setNodes((prevNodes) => {
      setEdges((prevEdges) => {
        const deg = new Array(prevNodes.length).fill(0);
        prevEdges.forEach(([a, b]) => {
          deg[a] = (deg[a] || 0) + 1;
          deg[b] = (deg[b] || 0) + 1;
        });
        const total = deg.reduce((s, x) => s + Math.max(1, x), 0);
        const targets = new Set();
        const mm = Math.min(m, prevNodes.length);
        let attempts = 0;
        while (targets.size < mm && attempts < 50) {
          let r = Math.random() * total;
          for (let i = 0; i < prevNodes.length; i++) {
            r -= Math.max(1, deg[i]);
            if (r <= 0) {
              targets.add(i);
              break;
            }
          }
          attempts++;
        }
        const newId = prevNodes.length;
        const newEdges = [...prevEdges];
        targets.forEach((t) => newEdges.push([newId, t]));
        return newEdges;
      });
      const centerIdx = Math.floor(Math.random() * prevNodes.length);
      const center = prevNodes[centerIdx];
      const a = Math.random() * Math.PI * 2;
      const r = 40 + Math.random() * 30;
      return [
        ...prevNodes,
        {
          id: prevNodes.length,
          x: Math.max(20, Math.min(380, center.x + Math.cos(a) * r)),
          y: Math.max(20, Math.min(380, center.y + Math.sin(a) * r)),
        },
      ];
    });
  };

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      if (nodes.length >= 120) {
        setPlaying(false);
        return;
      }
      addNode();
    }, 220);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, [playing, nodes.length]);

  const reset = () => {
    setNodes([
      { id: 0, x: 200, y: 200 },
      { id: 1, x: 250, y: 220 },
    ]);
    setEdges([[0, 1]]);
    setPlaying(false);
  };

  const maxDeg = Math.max(1, ...degree);
  const buckets = new Array(maxDeg + 1).fill(0);
  degree.forEach((d) => (buckets[d] = (buckets[d] || 0) + 1));
  const maxCount = Math.max(1, ...buckets);

  const insight =
    nodes.length < 15
      ? "Add more nodes (or press Grow) to see the degree distribution take shape."
      : maxDeg <= 3
      ? "Distribution still looks flat. Keep growing — hubs emerge as N gets larger."
      : `Notice how the tail stretches to k=${maxDeg}: a handful of "hubs" have accumulated far more connections than average. That's the classic Barabási–Albert heavy tail.`;

  return (
    <div className="rounded-2xl border border-[#2a2416] bg-[#141009] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] mb-2">Game · Network Science</p>
          <h3 className="font-serif text-[#f5efe0] text-2xl md:text-3xl">Preferential Attachment</h3>
          <p className="mt-2 text-[#8a7c5c] text-xs max-w-md">
            Add nodes; each attaches to m existing nodes with probability ∝ degree. Watch a power-law form.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowHelp((h) => !h)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[#a89b7a] hover:text-[#e6d9a8] border border-[#2a2416] hover:border-[#c9a961] transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHelp ? "Hide help" : "How to play"}
          </button>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#2a2416]">
            <span className="text-[10px] uppercase tracking-wider text-[#8a7c5c]">m</span>
            <input
              type="range"
              min="1"
              max="4"
              value={m}
              onChange={(e) => setM(Number(e.target.value))}
              className="accent-[#c9a961] w-16"
            />
            <span className="font-mono text-xs text-[#e6d9a8] w-4">{m}</span>
          </div>
          <div className="px-3 py-2 rounded-lg border border-[#2a2416] text-xs text-[#a89b7a]">
            N <span className="font-mono text-[#e6d9a8] ml-1">{nodes.length}</span>
          </div>
          <button
            onClick={addNode}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[#0e0c08] bg-[#c9a961] hover:bg-[#e6d9a8] transition-colors font-medium"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[#e6d9a8] border border-[#3a3220] hover:border-[#c9a961] transition-colors"
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {playing ? "Pause" : "Grow"}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[#a89b7a] border border-[#2a2416] hover:border-[#c9a961] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
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
            <div className="rounded-xl border border-[#2a2416] bg-[#0e0c08]/60 p-4">
              <div className="flex items-center gap-2 mb-2 text-[#c9a961] text-[10px] tracking-[0.25em] uppercase">
                <Lightbulb className="w-3.5 h-3.5" /> How to play
              </div>
              <ul className="text-[#a89b7a] text-xs leading-relaxed space-y-1 list-disc pl-5">
                <li>
                  This models the <span className="text-[#e6d9a8]">Barabási–Albert</span> “rich get richer” process.
                </li>
                <li>
                  Each new node connects to <span className="text-[#e6d9a8]">m</span> existing nodes.
                </li>
                <li>
                  Picking a target is <span className="text-[#e6d9a8]">weighted by current degree</span> — popular nodes attract more edges.
                </li>
                <li>
                  Click “Add” or the canvas to add one node, or press “Grow” to auto-add.
                </li>
                <li>
                  Watch the histogram: the tail should slowly stretch into a heavy-tailed “power law”.
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-6">
        <div
          ref={canvasRef}
          onClick={addNode}
          className="rounded-xl border border-[#2a2416] bg-[#0e0c08] aspect-square cursor-crosshair"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {edges.map((e, i) => {
              const a = nodes[e[0]];
              const b = nodes[e[1]];
              if (!a || !b) return null;
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#8a7c5c"
                  strokeWidth="0.6"
                  opacity="0.5"
                />
              );
            })}
            {nodes.map((n, i) => {
              const d = degree[i] || 1;
              const r = 2 + Math.min(10, Math.sqrt(d));
              return (
                <circle
                  key={i}
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill="#c9a961"
                  opacity={0.4 + Math.min(0.55, d / 20)}
                />
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-[#2a2416] bg-[#0e0c08] p-5">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a7c5c] mb-3">
              Degree distribution
            </p>
            <svg viewBox="0 0 300 220" className="w-full h-56">
              <line x1="30" y1="200" x2="290" y2="200" stroke="#3a3220" strokeWidth="0.6" />
              <line x1="30" y1="20" x2="30" y2="200" stroke="#3a3220" strokeWidth="0.6" />
              {buckets.map((c, k) => {
                if (!c) return null;
                const w = 250 / Math.max(6, maxDeg + 1);
                const h = (c / maxCount) * 170;
                return (
                  <rect
                    key={k}
                    x={30 + k * w}
                    y={200 - h}
                    width={Math.max(2, w - 2)}
                    height={h}
                    fill="#c9a961"
                    opacity="0.85"
                  />
                );
              })}
            </svg>
            <div className="flex justify-between text-[10px] text-[#5a5340] font-mono mt-2 px-2">
              <span>k = 1</span>
              <span>k = {maxDeg}</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#c9a961]/30 bg-[#c9a961]/5 p-4">
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

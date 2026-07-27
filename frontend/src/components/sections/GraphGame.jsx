import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Trophy, Zap } from "lucide-react";

/**
 * Graph Untangle Puzzle
 * - Random planar-ish graph with intentional crossings.
 * - Player drags nodes to remove edge crossings.
 * - Live crossing counter; win when 0.
 */
export default function GraphGame() {
  const svgRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [level, setLevel] = useState(1);
  const [best, setBest] = useState(() => Number(localStorage.getItem("gg_best") || 0));

  const size = 480;

  const genLevel = useCallback((lvl) => {
    const n = 5 + lvl; // 6, 7, 8...
    const ns = [];
    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.35;
    // random positions but not on a circle -> guarantees crossings likely
    for (let i = 0; i < n; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = R * (0.4 + Math.random() * 0.7);
      ns.push({
        id: i,
        x: cx + Math.cos(angle) * r + (Math.random() - 0.5) * 30,
        y: cy + Math.sin(angle) * r + (Math.random() - 0.5) * 30,
      });
    }
    // build a cycle + a few chords
    const es = [];
    for (let i = 0; i < n; i++) es.push([i, (i + 1) % n]);
    const chords = Math.min(lvl + 1, Math.floor(n / 2));
    for (let i = 0; i < chords; i++) {
      const a = Math.floor(Math.random() * n);
      const b = (a + 2 + Math.floor(Math.random() * (n - 3))) % n;
      if (!es.find((e) => (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a)))
        es.push([a, b]);
    }
    setNodes(ns);
    setEdges(es);
  }, []);

  useEffect(() => {
    genLevel(level);
  }, [level, genLevel]);

  const segIntersect = (p1, p2, p3, p4) => {
    const d = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const d1 = d(p3, p4, p1);
    const d2 = d(p3, p4, p2);
    const d3 = d(p1, p2, p3);
    const d4 = d(p1, p2, p4);
    return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
      ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
  };

  const crossings = React.useMemo(() => {
    if (!nodes.length) return 0;
    let c = 0;
    for (let i = 0; i < edges.length; i++) {
      for (let j = i + 1; j < edges.length; j++) {
        const [a, b] = edges[i];
        const [x, y] = edges[j];
        if (a === x || a === y || b === x || b === y) continue;
        if (segIntersect(nodes[a], nodes[b], nodes[x], nodes[y])) c++;
      }
    }
    return c;
  }, [nodes, edges]);

  useEffect(() => {
    if (crossings === 0 && nodes.length > 0) {
      const newBest = Math.max(best, level);
      setBest(newBest);
      localStorage.setItem("gg_best", String(newBest));
    }
  }, [crossings, level, nodes.length, best]);

  const svgPoint = (evt) => {
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: ((evt.clientX - rect.left) / rect.width) * size,
      y: ((evt.clientY - rect.top) / rect.height) * size,
    };
  };

  const onDown = (id) => (e) => {
    e.preventDefault();
    setDragging(id);
  };
  const onMove = (e) => {
    if (dragging === null) return;
    const p = svgPoint(e);
    setNodes((prev) => prev.map((n) => (n.id === dragging ? { ...n, x: p.x, y: p.y } : n)));
  };
  const onUp = () => setDragging(null);

  const solved = crossings === 0 && nodes.length > 0;

  return (
    <section className="relative bg-[#0e0c08] py-32 border-t border-[#2a2416]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">Interactive</p>
            <h2 className="font-serif text-[#f5efe0] text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Untangle the graph
            </h2>
            <p className="mt-5 text-[#b8ac8c] max-w-lg text-sm leading-relaxed">
              Drag the nodes so that no edges cross. A small planarity puzzle inspired by graph-drawing research.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-5 py-4 rounded-xl border border-[#2a2416] bg-[#141009] min-w-[110px]">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#8a7c5c] mb-1 flex items-center gap-1"><Zap className="w-3 h-3" />Crossings</div>
              <div className={`font-serif text-2xl ${solved ? "text-[#c9a961]" : "text-[#f5efe0]"}`}>{crossings}</div>
            </div>
            <div className="px-5 py-4 rounded-xl border border-[#2a2416] bg-[#141009] min-w-[110px]">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#8a7c5c] mb-1 flex items-center gap-1"><Trophy className="w-3 h-3" />Level</div>
              <div className="font-serif text-2xl text-[#f5efe0]">{level}</div>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl border border-[#2a2416] bg-[#141009] overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${size} ${size}`}
            className="w-full aspect-square max-h-[560px] block touch-none select-none"
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onTouchMove={(e) => onMove(e.touches[0])}
            onTouchEnd={onUp}
          >
            {/* grid */}
            {[...Array(10)].map((_, i) => (
              <line key={`v${i}`} x1={(i * size) / 10} y1="0" x2={(i * size) / 10} y2={size} stroke="#1c1810" strokeWidth="0.5" />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={(i * size) / 10} x2={size} y2={(i * size) / 10} stroke="#1c1810" strokeWidth="0.5" />
            ))}

            {edges.map(([a, b], i) => {
              const p1 = nodes[a];
              const p2 = nodes[b];
              if (!p1 || !p2) return null;
              return (
                <line
                  key={i}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={solved ? "#c9a961" : "#8a7c5c"}
                  strokeWidth="1.8"
                  opacity={solved ? 0.9 : 0.7}
                />
              );
            })}
            {nodes.map((n) => (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="14"
                  fill="#c9a961"
                  opacity="0.15"
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="8"
                  fill={solved ? "#e6d9a8" : "#c9a961"}
                  onMouseDown={onDown(n.id)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    onDown(n.id)(e.touches[0]);
                  }}
                  style={{ cursor: "grab" }}
                />
              </g>
            ))}
          </svg>

          {solved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0e0c08] via-[#0e0c08]/80 to-transparent"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-serif text-[#e6d9a8] text-xl">Planar. Nicely done.</div>
                  <div className="text-[#8a7c5c] text-xs mt-1">Best level: {best}</div>
                </div>
                <button
                  onClick={() => setLevel((l) => l + 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a961] text-[#0e0c08] hover:bg-[#e6d9a8] transition-colors text-sm font-medium"
                >
                  Next level
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="text-[#5a5340] tracking-wider uppercase">Tip: no crossing edges = a planar drawing</div>
          <button
            onClick={() => genLevel(level)}
            className="inline-flex items-center gap-2 text-[#a89b7a] hover:text-[#e6d9a8] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reshuffle
          </button>
        </div>
      </div>
    </section>
  );
}

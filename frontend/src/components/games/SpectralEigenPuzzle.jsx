import React, { useMemo, useState } from "react";
import { RefreshCw, Check, X, Lightbulb, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Spectral Eigen Puzzle
 * Show a small graph. Present 3 candidate eigenvalue spectra of the Laplacian.
 * Player picks the one that matches. If wrong, explain why.
 */

function makeGraph(n) {
  const positions = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + Math.random() * 0.4;
    positions.push([100 + Math.cos(a) * 55, 100 + Math.sin(a) * 55]);
  }
  const edges = new Set();
  for (let i = 0; i < n; i++) edges.add([i, (i + 1) % n].sort((a, b) => a - b).join(","));
  const extra = 1 + Math.floor(Math.random() * 2);
  for (let k = 0; k < extra; k++) {
    const a = Math.floor(Math.random() * n);
    const b = (a + 2 + Math.floor(Math.random() * (n - 3))) % n;
    edges.add([a, b].sort((x, y) => x - y).join(","));
  }
  return {
    positions,
    edges: Array.from(edges).map((s) => s.split(",").map(Number)),
  };
}

function laplacianEigenvalues({ n, edges }) {
  const L = Array.from({ length: n }, () => Array(n).fill(0));
  for (const [a, b] of edges) {
    L[a][b] = -1;
    L[b][a] = -1;
    L[a][a] += 1;
    L[b][b] += 1;
  }
  const a = L.map((r) => r.slice());
  for (let it = 0; it < 200; it++) {
    let p = 0, q = 1, maxV = 0;
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++)
        if (Math.abs(a[i][j]) > maxV) {
          maxV = Math.abs(a[i][j]);
          p = i;
          q = j;
        }
    if (maxV < 1e-8) break;
    const th = a[p][p] === a[q][q]
      ? Math.PI / 4
      : 0.5 * Math.atan2(2 * a[p][q], a[p][p] - a[q][q]);
    const c = Math.cos(th);
    const s = Math.sin(th);
    for (let i = 0; i < n; i++) {
      const aip = a[i][p], aiq = a[i][q];
      a[i][p] = c * aip + s * aiq;
      a[i][q] = -s * aip + c * aiq;
    }
    for (let j = 0; j < n; j++) {
      const apj = a[p][j], aqj = a[q][j];
      a[p][j] = c * apj + s * aqj;
      a[q][j] = -s * apj + c * aqj;
    }
  }
  const eig = [];
  for (let i = 0; i < n; i++) eig.push(Math.max(0, a[i][i]));
  return eig.sort((x, y) => x - y);
}

function GraphSVG({ g }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {g.edges.map(([a, b], i) => (
        <line
          key={i}
          x1={g.positions[a][0]}
          y1={g.positions[a][1]}
          x2={g.positions[b][0]}
          y2={g.positions[b][1]}
          stroke="#8a7c5c"
          strokeWidth="1.4"
          opacity="0.7"
        />
      ))}
      {g.positions.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="6" fill="#c9a961" />
      ))}
    </svg>
  );
}

function SpectrumSVG({ values, correct, selected, onSelect, disabled }) {
  const max = Math.max(...values, 1);
  const state = selected == null
    ? "neutral"
    : correct ? "correct" : "wrong";
  const stroke = state === "correct"
    ? "#c9a961"
    : state === "wrong" ? "#8a5a3a" : "#3a3220";
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`relative rounded-xl border ${state === "neutral" ? "border-[#2a2416] hover:border-[#c9a961]" : ""} bg-[#0e0c08] p-4 transition-colors disabled:cursor-default`}
      style={{ borderColor: selected != null ? stroke : undefined }}
    >
      <svg viewBox="0 0 200 90" className="w-full h-24">
        {values.map((v, i) => (
          <rect
            key={i}
            x={20 + i * (160 / values.length)}
            y={80 - (v / max) * 70}
            width={Math.max(6, 160 / values.length - 6)}
            height={(v / max) * 70}
            fill="#c9a961"
            opacity="0.85"
          />
        ))}
        <line x1="20" y1="80" x2="180" y2="80" stroke="#3a3220" strokeWidth="0.6" />
      </svg>
      <div className="mt-2 font-mono text-[10px] text-[#8a7c5c] tracking-wider text-center">
        {values.map((v) => v.toFixed(2)).join("  \u00b7  ")}
      </div>
      {selected != null && (
        <div
          className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
            state === "correct" ? "bg-[#c9a961] text-[#0e0c08]" : "bg-[#3a2a1a] text-[#e6d9a8]"
          }`}
        >
          {state === "correct" ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
        </div>
      )}
    </button>
  );
}

function HowToPlay() {
  return (
    <div className="rounded-xl border border-[#2a2416] bg-[#0e0c08]/60 p-4">
      <div className="flex items-center gap-2 mb-2 text-[#c9a961] text-[10px] tracking-[0.25em] uppercase">
        <Lightbulb className="w-3.5 h-3.5" /> How to play
      </div>
      <ul className="text-[#a89b7a] text-xs leading-relaxed space-y-1 list-disc pl-5">
        <li>
          Every graph has a <span className="text-[#e6d9a8]">Laplacian matrix</span>{" "}
          <span className="font-mono">L = D − A</span> (degree matrix minus adjacency).
        </li>
        <li>
          The Laplacian's eigenvalues form its <span className="text-[#e6d9a8]">spectrum</span> — a fingerprint of the graph.
        </li>
        <li>Rules of thumb:</li>
        <li className="pl-4">
          – The <span className="text-[#e6d9a8]">smallest eigenvalue is always 0</span> (for a connected graph, exactly one 0).
        </li>
        <li className="pl-4">
          – The number of eigenvalues equals the number of nodes.
        </li>
        <li className="pl-4">
          – The <span className="text-[#e6d9a8]">largest eigenvalue ≤ max-degree + 1</span> (roughly).
        </li>
        <li className="pl-4">
          – More edges + more connectivity → larger eigenvalues on average.
        </li>
      </ul>
    </div>
  );
}

function Explanation({ round, picked }) {
  if (picked == null) return null;
  const truthIdx = round.options.findIndex((o) => o.isTruth);
  const truth = round.options[truthIdx].values;
  const chosen = round.options[picked].values;
  const isRight = picked === truthIdx;
  const nNodes = round.graph.positions.length;
  const nEdges = round.graph.edges.length;
  const maxDeg = (() => {
    const d = new Array(nNodes).fill(0);
    round.graph.edges.forEach(([a, b]) => {
      d[a]++;
      d[b]++;
    });
    return Math.max(...d);
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 ${
        isRight
          ? "border-[#c9a961]/50 bg-[#c9a961]/5"
          : "border-[#8a5a3a]/50 bg-[#3a2a1a]/30"
      }`}
    >
      <div className="flex items-center gap-2 mb-2 text-[10px] tracking-[0.25em] uppercase">
        <Info className={`w-3.5 h-3.5 ${isRight ? "text-[#c9a961]" : "text-[#e6d9a8]"}`} />
        <span className={isRight ? "text-[#c9a961]" : "text-[#e6d9a8]"}>
          {isRight ? "Correct" : "Not quite"}
        </span>
      </div>
      <p className="text-[#b8ac8c] text-xs leading-relaxed mb-2">
        The graph has <span className="text-[#e6d9a8] font-mono">{nNodes}</span> nodes,{" "}
        <span className="text-[#e6d9a8] font-mono">{nEdges}</span> edges, and max degree{" "}
        <span className="text-[#e6d9a8] font-mono">{maxDeg}</span>.
      </p>
      <p className="text-[#b8ac8c] text-xs leading-relaxed mb-2">
        The correct spectrum is{" "}
        <span className="font-mono text-[#c9a961]">
          [{truth.map((v) => v.toFixed(2)).join(", ")}]
        </span>
        . It has {truth.filter((v) => v < 1e-3).length} zero eigenvalue (connected graph) and a largest eigenvalue of{" "}
        <span className="font-mono text-[#e6d9a8]">{truth[truth.length - 1].toFixed(2)}</span>{" "}
        — consistent with max-degree + 1 ={" "}
        <span className="font-mono">{(maxDeg + 1).toFixed(2)}</span>.
      </p>
      {!isRight && (
        <p className="text-[#b8ac8c] text-xs leading-relaxed">
          Your pick{" "}
          <span className="font-mono text-[#e6d9a8]">
            [{chosen.map((v) => v.toFixed(2)).join(", ")}]
          </span>{" "}
          {chosen.length !== truth.length
            ? "had the wrong number of eigenvalues — it must equal the number of nodes."
            : Math.abs(chosen[chosen.length - 1] - truth[truth.length - 1]) > 0.5
            ? "had a largest eigenvalue that didn't match the graph's connectivity."
            : "differed in the mid-range eigenvalues — those reflect finer connectivity structure."}
        </p>
      )}
    </motion.div>
  );
}

export default function SpectralEigenPuzzle() {
  const [seed, setSeed] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [showHelp, setShowHelp] = useState(true);

  const round = useMemo(() => {
    const n = 5 + Math.floor(Math.random() * 2);
    const truth = makeGraph(n);
    const decoys = [makeGraph(n), makeGraph(n)];
    const truthE = laplacianEigenvalues({ n, edges: truth.edges });
    const decoyE = decoys.map((g) => laplacianEigenvalues({ n, edges: g.edges }));
    const options = [
      { values: truthE, isTruth: true },
      { values: decoyE[0], isTruth: false },
      { values: decoyE[1], isTruth: false },
    ];
    options.sort(() => Math.random() - 0.5);
    return { graph: truth, options };
    // eslint-disable-next-line
  }, [seed]);

  const next = () => {
    setPicked(null);
    setSeed((s) => s + 1);
  };

  const onPick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    setScore((s) => ({
      right: s.right + (round.options[i].isTruth ? 1 : 0),
      total: s.total + 1,
    }));
  };

  return (
    <div className="rounded-2xl border border-[#2a2416] bg-[#141009] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] mb-2">
            Game · Spectral
          </p>
          <h3 className="font-serif text-[#f5efe0] text-2xl md:text-3xl">Spectral Eigen Puzzle</h3>
          <p className="mt-2 text-[#8a7c5c] text-xs max-w-md">
            Pick the Laplacian spectrum that belongs to the graph on the left.
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
            Score{" "}
            <span className="text-[#e6d9a8] font-mono ml-1">
              {score.right}/{score.total}
            </span>
          </div>
          <button
            onClick={next}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#a89b7a] hover:text-[#e6d9a8] border border-[#2a2416] hover:border-[#c9a961] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {picked === null ? "New" : "Next"}
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
        <div className="rounded-xl border border-[#2a2416] bg-[#0e0c08] aspect-square max-w-[280px] mx-auto md:mx-0">
          <GraphSVG g={round.graph} />
        </div>
        <div className="grid gap-3">
          {round.options.map((o, i) => (
            <SpectrumSVG
              key={i}
              values={o.values}
              correct={o.isTruth}
              selected={picked === i ? true : null}
              onSelect={() => onPick(i)}
              disabled={picked !== null}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            <Explanation round={round} picked={picked} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

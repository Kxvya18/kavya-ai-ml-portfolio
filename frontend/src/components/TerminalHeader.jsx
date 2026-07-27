import React, { useEffect, useRef, useState } from "react";

/**
 * Reusable terminal-style section header.
 *
 * Renders a macOS-style window chrome with a typewriter-animated prompt.
 * Starts typing when the header enters the viewport.
 *
 * Props:
 *   file:    file name label (e.g. "work.sh")
 *   cwd:     working-directory string (e.g. "~/portfolio/work")
 *   command: command to type out (e.g. "ls -la selected/")
 *   output:  optional array of pre-formatted output lines (or nodes)
 */
export default function TerminalHeader({
  file = "portfolio.sh",
  cwd = "~/portfolio",
  command = "",
  output = [],
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setTyped("");
    setDone(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(command.slice(0, i));
      if (i >= command.length) {
        clearInterval(t);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(t);
  }, [visible, command]);

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-[#2a2416] bg-[#141009] overflow-hidden ${className}`}
    >
      <div className="px-4 py-2.5 border-b border-[#2a2416] flex items-center gap-2 bg-[#0e0c08]/60">
        <span className="w-2.5 h-2.5 rounded-full bg-[#8a5a3a]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#c9a961]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#6a5f42]" />
        <span className="ml-3 text-[10px] tracking-widest uppercase text-[#5a5340] font-mono">
          {file}
        </span>
      </div>
      <div className="px-5 py-4 font-mono text-xs md:text-[13px] leading-relaxed">
        <div className="text-[#a89b7a]">
          <span className="text-[#c9a961]">kavya@portfolio</span>
          <span className="text-[#5a5340]">:</span>
          <span className="text-[#8a7c5c]">{cwd}</span>
          <span className="text-[#5a5340]">$ </span>
          <span className="text-[#e6e1d6]">{typed}</span>
          {!done && (
            <span className="inline-block w-2 h-3 ml-0.5 bg-[#c9a961] animate-pulse align-middle" />
          )}
        </div>
        {done && output.length > 0 && (
          <div className="mt-2 space-y-0.5 text-[#8a7c5c]">
            {output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

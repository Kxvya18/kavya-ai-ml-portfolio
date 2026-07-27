import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Terminal } from "lucide-react";
import Nav from "../components/sections/Nav";

function Typewriter({ text, delay = 0 }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, 22);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  return <span>{shown}</span>;
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0e0c08] text-[#e6e1d6]">
      <Nav />
      <div className="max-w-[900px] mx-auto px-8 pt-40 pb-24">
        <div className="rounded-2xl border border-[#2a2416] bg-[#141009] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2a2416] flex items-center gap-2 bg-[#0e0c08]/60">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8a5a3a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#c9a961]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#6a5f42]" />
            <span className="ml-3 text-[10px] tracking-widest uppercase text-[#5a5340] font-mono flex items-center gap-1.5">
              <Terminal className="w-3 h-3" /> error.sh
            </span>
          </div>
          <div className="px-6 py-8 font-mono text-sm leading-relaxed">
            <div className="text-[#a89b7a]">
              <span className="text-[#c9a961]">kavya@portfolio</span>
              <span className="text-[#5a5340]">:</span>
              <span className="text-[#8a7c5c]">~</span>
              <span className="text-[#5a5340]">$ </span>
              <Typewriter text={`cd ${window.location.pathname}`} />
            </div>
            <div className="mt-3 text-[#8a5a3a]">
              <Typewriter text="bash: cd: no such file or directory" delay={900} />
            </div>
            <div className="mt-3 text-[#a89b7a]">
              <span className="text-[#c9a961]">kavya@portfolio</span>
              <span className="text-[#5a5340]">:</span>
              <span className="text-[#8a7c5c]">~</span>
              <span className="text-[#5a5340]">$ </span>
              <Typewriter text="ls available/" delay={1600} />
            </div>
            <div className="mt-3 text-[#8a7c5c] space-y-0.5">
              <div>drwx------  home/</div>
              <div>drwx------  work/</div>
              <div>drwx------  lab/</div>
              <div>drwx------  skills/</div>
              <div>drwx------  resume/</div>
              <div>drwx------  contact/</div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-4">Error 404</p>
          <h1 className="font-serif text-[#f5efe0] text-5xl md:text-7xl leading-[1.05]">
            That page didn't compile.
          </h1>
          <p className="mt-6 text-[#b8ac8c] max-w-lg text-sm leading-relaxed">
            The URL you followed doesn't exist in this portfolio. Try one of the sections below
            or head back to the home page.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9a961] text-[#0e0c08] hover:bg-[#e6d9a8] text-sm font-medium transition-colors"
            >
              <Home className="w-4 h-4" /> Back home
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] text-sm transition-colors"
            >
              View Work
            </Link>
            <Link
              to="/lab"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] text-sm transition-colors"
            >
              Try the Lab
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

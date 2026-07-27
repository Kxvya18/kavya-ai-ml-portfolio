import React from "react";
import { Download, Printer, ArrowLeft, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { skills, selectedWork, projectIndex, contact, heroData } from "../mock";

export default function ResumePage() {
  const printPDF = () => window.print();

  return (
    <div className="min-h-screen bg-[#0e0c08] text-[#e6e1d6]">
      {/* Top bar (hidden in print) */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-40 bg-[#0e0c08]/85 backdrop-blur-xl border-b border-[#2a2416]">
        <div className="max-w-[1000px] mx-auto px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#a89b7a] hover:text-[#e6d9a8] text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={printPDF}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] text-xs"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={printPDF}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a961] text-[#0e0c08] hover:bg-[#e6d9a8] text-xs font-medium"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-8 pt-28 pb-20 print:pt-8">
        <div className="border-b border-[#2a2416] pb-8 mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] mb-3">
            {heroData.eyebrow}
          </p>
          <h1 className="font-serif text-[#f5efe0] text-4xl md:text-6xl leading-[1.05] mb-4">
            {heroData.name}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#a89b7a]">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {contact.location}
            </span>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:text-[#e6d9a8]">
              <Mail className="w-3.5 h-3.5" /> {contact.email}
            </a>
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-[#e6d9a8]">
              <Github className="w-3.5 h-3.5" /> github.com/kavya
            </a>
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-[#e6d9a8]">
              <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/kavya
            </a>
          </div>
        </div>

        <Section label="Summary">
          <p className="text-[#b8ac8c] text-sm leading-relaxed">{heroData.summary}</p>
        </Section>

        <Section label="Selected Work">
          <div className="space-y-6">
            {selectedWork.map((p) => (
              <div key={p.id} className="grid md:grid-cols-[180px_1fr] gap-4">
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#c9a961]">
                    {p.category}
                  </div>
                  <div className="text-[10px] text-[#5a5340] mt-1 font-mono">#{p.tag}</div>
                </div>
                <div>
                  <h3 className="font-serif text-[#f5efe0] text-lg mb-1.5">{p.title}</h3>
                  <p className="text-[#8a7c5c] text-xs leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Other Projects">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {projectIndex.map((p, i) => (
              <div key={i}>
                <div className="font-serif text-[#e6e1d6] text-sm mb-1">{p.title}</div>
                <div className="text-[#8a7c5c] text-[11px] leading-relaxed">{p.text}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Technical Skills">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
            {skills.map((s, i) => (
              <div key={i}>
                <div className="font-serif text-[#e6d9a8] text-sm mb-1">{s.title}</div>
                <div className="text-[#8a7c5c] text-[11px] leading-relaxed">{s.text}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Focus areas">
          <div className="flex flex-wrap gap-2">
            {[
              "AI Engineering",
              "LLM Systems",
              "RAG Evaluation",
              "Graph Learning",
              "Topological Data Analysis",
              "Model Calibration",
              "Network Science",
              "Healthcare AI",
              "Optimization",
              "Mathematical AI",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border border-[#3a3220] text-[10px] tracking-wider uppercase text-[#a89b7a]"
              >
                {t}
              </span>
            ))}
          </div>
        </Section>

        <div className="mt-16 pt-6 border-t border-[#2a2416] text-[10px] text-[#5a5340] flex justify-between">
          <span>References available on request.</span>
          <span>Rendered {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
        </div>
      </div>

      <style>{`
        @media print {
          body, .bg-\\[\\#0e0c08\\] { background: white !important; }
          .text-\\[\\#f5efe0\\], .text-\\[\\#e6e1d6\\], .text-\\[\\#e6d9a8\\] { color: #111 !important; }
          .text-\\[\\#b8ac8c\\], .text-\\[\\#a89b7a\\], .text-\\[\\#8a7c5c\\] { color: #333 !important; }
          .text-\\[\\#c9a961\\] { color: #8a6b2a !important; }
          .border-\\[\\#2a2416\\], .border-\\[\\#3a3220\\] { border-color: #ddd !important; }
          .text-\\[\\#5a5340\\] { color: #666 !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <section className="mb-10">
      <div className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-6">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#8a7c5c] pt-1">
          {label}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

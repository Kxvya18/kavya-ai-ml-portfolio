import React from "react";
import { Download, Printer, ArrowLeft, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../components/sections/Nav";
import TerminalHeader from "../components/TerminalHeader";
import {
  heroData,
  selectedWork,
  projectIndex,
  skills,
  education,
  certifications,
  contact,
} from "../mock";

export default function ResumePage() {
  const downloadPdf = () => {
    const a = document.createElement("a");
    a.href = contact.cvPdfUrl;
    a.download = "Kavya_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadDocx = async () => {
    try {
      const res = await fetch(contact.cvUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Kavya_Resume.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      // fallback to direct link
      window.open(contact.cvUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0c08] text-[#e6e1d6]">
      <div className="print:hidden">
        <Nav />
      </div>

      {/* Toolbar */}
      <div className="print:hidden max-w-[1100px] mx-auto px-8 pt-28 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#a89b7a] hover:text-[#e6d9a8] text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] text-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Save as PDF
          </button>
          <a
            href={contact.cvUrl}
            download="Kavya_Resume.docx"
            onClick={(e) => {
              e.preventDefault();
              downloadDocx();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a961] text-[#0e0c08] hover:bg-[#e6d9a8] text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download CV (.docx)
          </a>
        </div>
      </div>

      {/* Terminal intro */}
      <div className="print:hidden max-w-[1100px] mx-auto px-8 mb-8">
        <TerminalHeader
          file="resume.sh"
          cwd="~/portfolio/resume"
          command="cat kavya_kalavala.md --profile=ai-engineer"
          output={[
            "loading ai-engineer profile...",
            "focus: ai engineering · ml / dl · graphs · topology · mathematical ai",
            "press ⌘K to jump anywhere.",
          ]}
        />
      </div>

      {/* Resume document */}
      <div className="max-w-[1100px] mx-auto px-8 pb-24 print:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#2a2416] bg-[#141009] print:border-0 print:bg-white overflow-hidden"
        >
          {/* window chrome */}
          <div className="print:hidden px-5 py-3 border-b border-[#2a2416] flex items-center gap-2 bg-[#0e0c08]/60">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8a5a3a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#c9a961]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#6a5f42]" />
            <span className="ml-3 text-[10px] tracking-widest uppercase text-[#5a5340] font-mono">
              kavya_kalavala_resume.pdf
            </span>
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            {/* Header */}
            <header className="pb-8 mb-10 border-b border-[#2a2416]">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] mb-3">
                AI Engineering / ML Research / Graph Intelligence
              </p>
              <h1 className="font-serif text-[#f5efe0] text-5xl md:text-7xl leading-[1.02] mb-6">
                {heroData.name}
              </h1>
              <div className="grid md:grid-cols-2 gap-y-2 gap-x-8 text-xs text-[#a89b7a]">
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:text-[#e6d9a8]">
                  <Mail className="w-3.5 h-3.5" /> {contact.email}
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> {contact.phone}
                </span>
                <a href={contact.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#e6d9a8]">
                  <Github className="w-3.5 h-3.5" /> {contact.githubLabel}
                </a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#e6d9a8]">
                  <Linkedin className="w-3.5 h-3.5" /> {contact.linkedinLabel}
                </a>
                <span className="inline-flex items-center gap-1.5 md:col-span-2">
                  <MapPin className="w-3.5 h-3.5" /> {contact.location}
                </span>
              </div>
            </header>

            <Section n="01" label="Summary">
              <p className="text-[#b8ac8c] text-sm leading-relaxed">
                Computer Science (Data Science) undergraduate focused on AI engineering, machine learning, deep learning,
                LLM systems, mathematical learning, graph-based inference, topology, optimization, and reproducible
                research software. Comfortable translating open-ended problems into structured, testable prototypes
                across model building, evaluation, RAG systems, graph and topology features, and API-backed workflows.
              </p>
            </Section>

            <Section n="02" label="Focus areas">
              <div className="flex flex-wrap gap-2">
                {[
                  "AI Engineering",
                  "Machine Learning",
                  "Deep Learning",
                  "LLM Systems / RAG",
                  "Graph Learning",
                  "Topological Data Analysis",
                  "Mathematical AI",
                  "Model Calibration",
                  "Network Science",
                  "Optimization",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full border border-[#3a3220] text-[10px] tracking-wider uppercase text-[#a89b7a] print:border-[#ccc]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Section>

            <Section n="03" label="Selected projects">
              <div className="space-y-7">
                {selectedWork.map((p) => (
                  <div key={p.id} className="grid md:grid-cols-[170px_1fr] gap-4 md:gap-6">
                    <div>
                      <div className="text-[10px] tracking-[0.25em] uppercase text-[#c9a961]">
                        {p.category}
                      </div>
                      <div className="text-[10px] text-[#5a5340] mt-1 font-mono">#{p.tag.toLowerCase()}</div>
                    </div>
                    <div>
                      <h3 className="font-serif text-[#f5efe0] text-lg mb-1.5">{p.title}</h3>
                      <p className="text-[#8a7c5c] text-xs leading-relaxed mb-2">{p.text}</p>
                      <p className="text-[10px] text-[#6a5f42] leading-relaxed">
                        <span className="uppercase tracking-wider text-[#5a5340] mr-2">Stack ·</span>
                        {p.detail.stack}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section n="04" label="Additional experiments">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {projectIndex.map((p, i) => (
                  <div key={i}>
                    <div className="font-serif text-[#e6e1d6] text-sm mb-1">{p.title}</div>
                    <div className="text-[#8a7c5c] text-[11px] leading-relaxed">{p.text}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section n="05" label="Technical range">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                {skills.map((s) => (
                  <div key={s.title}>
                    <div className="font-serif text-[#e6d9a8] text-sm mb-1">{s.title}</div>
                    <div className="text-[#8a7c5c] text-[11px] leading-relaxed">{s.text}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section n="06" label="Education">
              <div className="space-y-4">
                {education.map((e, i) => (
                  <div key={i} className="grid md:grid-cols-[140px_1fr] gap-3">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#8a7c5c] pt-1 font-mono">
                      {e.period}
                    </div>
                    <div>
                      <div className="font-serif text-[#f5efe0] text-sm">{e.school}</div>
                      <div className="text-[#a89b7a] text-xs mt-0.5">{e.degree}</div>
                      <div className="text-[#c9a961] text-[11px] mt-0.5 font-mono">{e.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section n="07" label="Certifications">
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-1.5 list-none">
                {certifications.map((c, i) => (
                  <li key={i} className="text-[#a89b7a] text-xs leading-relaxed flex gap-2">
                    <span className="text-[#c9a961]">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <div className="mt-16 pt-6 border-t border-[#2a2416] text-[10px] text-[#5a5340] flex justify-between">
              <span>References available on request.</span>
              <span>
                Rendered{" "}
                {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media print {
          @page { margin: 0.5in; }
          body, .bg-\\[\\#0e0c08\\] { background: white !important; color: #111 !important; }
          .text-\\[\\#f5efe0\\], .text-\\[\\#e6e1d6\\], .text-\\[\\#e6d9a8\\] { color: #111 !important; }
          .text-\\[\\#b8ac8c\\], .text-\\[\\#a89b7a\\], .text-\\[\\#8a7c5c\\], .text-\\[\\#6a5f42\\] { color: #333 !important; }
          .text-\\[\\#c9a961\\] { color: #8a6b2a !important; }
          .border-\\[\\#2a2416\\], .border-\\[\\#3a3220\\] { border-color: #ddd !important; }
          .text-\\[\\#5a5340\\] { color: #666 !important; }
          .bg-\\[\\#141009\\] { background: white !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ n, label, children }) {
  return (
    <section className="mb-10 print:mb-6">
      <div className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-6">
        <div>
          <div className="font-mono text-[10px] text-[#5a5340]">{n}</div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#8a7c5c] mt-1">{label}</div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

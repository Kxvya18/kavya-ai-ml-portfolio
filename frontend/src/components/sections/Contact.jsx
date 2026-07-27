import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Github, Linkedin, ArrowUpRight, Phone } from "lucide-react";
import { contact } from "../../mock";

export default function Contact({ hideFooter = false }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  return (
    <section id="contact" className="relative bg-[#0e0c08] py-24 border-t border-[#2a2416] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#c9a961]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-8 text-center">
        <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase mb-6">Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-[#f5efe0] text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto"
        >
          {contact.heading}
        </motion.h2>
        <p className="mt-8 text-[#a89b7a] text-sm tracking-wide">
          {contact.location} <span className="text-[#5a5340] mx-3">/</span>{" "}
          <span className="text-[#e6d9a8]">{contact.email}</span>
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9a961] text-[#0e0c08] hover:bg-[#e6d9a8] transition-colors text-sm font-medium"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy Email"}
          </button>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] transition-colors text-sm font-medium"
          >
            <Github className="w-4 h-4" /> GitHub
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] transition-colors text-sm font-medium"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3a3220] text-[#e6e1d6] hover:border-[#c9a961] hover:text-[#e6d9a8] transition-colors text-sm font-medium"
          >
            <Phone className="w-4 h-4" /> {contact.phone}
          </a>
        </div>

        {!hideFooter && (
          <div className="mt-24 pt-8 border-t border-[#2a2416] flex flex-col md:flex-row justify-between items-center gap-4 text-[#5a5340] text-xs">
            <div>© {new Date().getFullYear()} Kavya Kalavala</div>
            <div className="tracking-wider uppercase">Built with math, graphs, and code.</div>
          </div>
        )}
      </div>
    </section>
  );
}

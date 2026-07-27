import React from "react";
import { motion } from "framer-motion";
import { heroData, contact } from "../../mock";

export default function Footer() {
  return (
    <footer className="relative bg-[#0e0c08] border-t border-[#2a2416] py-14">
      <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-serif text-[#e6e1d6] text-lg">{heroData.name}</div>
          <div className="text-[#8a7c5c] text-xs mt-1 tracking-wider uppercase">
            AI Engineering / ML / Graphs · Bengaluru
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#a89b7a]">
          <a href={`mailto:${contact.email}`} className="hover:text-[#e6d9a8]">
            {contact.email}
          </a>
          <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-[#e6d9a8]">
            {contact.githubLabel}
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#e6d9a8]">
            {contact.linkedinLabel}
          </a>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-8 mt-8 pt-6 border-t border-[#2a2416] flex justify-between text-[10px] text-[#5a5340] tracking-wider uppercase">
        <span>© {new Date().getFullYear()} Kavya Kalavala</span>
        <span>Built with math, graphs, and code.</span>
      </div>
    </footer>
  );
}

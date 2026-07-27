import React, { useEffect, useState } from "react";
import { navItems, heroData } from "../../mock";
import { motion } from "framer-motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[#0e0c08]/80 backdrop-blur-xl border-b border-[#2a2416]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
        <a href="#top" className="font-serif text-[#e6e1d6] text-lg tracking-wide">
          {heroData.name}
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={(e) => handleClick(e, n.href)}
              className="text-[#a89b7a] hover:text-[#e6d9a8] text-sm tracking-wide transition-colors relative group"
            >
              {n.label}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#c9a961] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

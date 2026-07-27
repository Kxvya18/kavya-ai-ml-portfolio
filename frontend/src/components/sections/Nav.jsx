import React, { useEffect, useState } from "react";
import { heroData } from "../../mock";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import { Command } from "lucide-react";

const navItems = [
  { label: "Work", href: "#work", section: true },
  { label: "Lab", to: "/lab" },
  { label: "Skills", href: "#skills", section: true },
  { label: "Resume", to: "/resume" },
  { label: "Contact", href: "#contact", section: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSection = (e, href) => {
    e.preventDefault();
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openPalette = () => {
    // dispatch cmd+k programmatically
    const event = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      metaKey: true,
      ctrlKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
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
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between gap-4">
        <Link to="/" className="font-serif text-[#e6e1d6] text-lg tracking-wide">
          {heroData.name}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((n) =>
            n.section ? (
              <a
                key={n.label}
                href={n.href}
                onClick={(e) => handleSection(e, n.href)}
                className="text-[#a89b7a] hover:text-[#e6d9a8] text-sm tracking-wide transition-colors relative group"
              >
                {n.label}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#c9a961] transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={n.label}
                to={n.to}
                className={`text-sm tracking-wide transition-colors relative group ${
                  pathname === n.to ? "text-[#e6d9a8]" : "text-[#a89b7a] hover:text-[#e6d9a8]"
                }`}
              >
                {n.label}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#c9a961] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            aria-label="Command palette"
            className="hidden md:inline-flex items-center gap-2 px-3 h-9 rounded-full border border-[#3a3220] text-[#a89b7a] hover:border-[#c9a961] hover:text-[#e6d9a8] text-xs transition-colors"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="font-mono">K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}

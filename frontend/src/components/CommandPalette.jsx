import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import {
  Home,
  FlaskConical,
  FileText,
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon,
  Sparkles,
  Puzzle,
} from "lucide-react";
import { selectedWork } from "../mock";
import { useTheme } from "../context/ThemeContext";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toggle, theme } = useTheme();

  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const run = useCallback((fn) => {
    setOpen(false);
    setTimeout(fn, 30);
  }, []);

  const scrollTo = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections, projects, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => navigate("/"))}>
            <Home className="mr-2 h-4 w-4" /> Home
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/lab"))}>
            <FlaskConical className="mr-2 h-4 w-4" /> Lab
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/resume"))}>
            <FileText className="mr-2 h-4 w-4" /> Resume
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Jump to section">
          <CommandItem onSelect={() => run(() => scrollTo("#top"))}>
            <Sparkles className="mr-2 h-4 w-4" /> Hero
          </CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("#work"))}>Selected Work</CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("#lab"))}>Profile</CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("#skills"))}>Skills</CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("#contact"))}>Contact</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          {selectedWork.map((p) => (
            <CommandItem
              key={p.id}
              onSelect={() => run(() => scrollTo("#work"))}
            >
              <Puzzle className="mr-2 h-4 w-4" /> {p.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(toggle)}>
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            Toggle {theme === "dark" ? "light" : "dark"} theme
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigator.clipboard.writeText("kxvya1820@gmail.com"))}>
            <Mail className="mr-2 h-4 w-4" /> Copy email
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.open("https://github.com/", "_blank"))}>
            <Github className="mr-2 h-4 w-4" /> Open GitHub
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.open("https://linkedin.com/", "_blank"))}>
            <Linkedin className="mr-2 h-4 w-4" /> Open LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

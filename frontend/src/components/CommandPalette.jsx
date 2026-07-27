import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  Briefcase,
} from "lucide-react";
import { selectedWork, contact } from "../mock";
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

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, projects, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => run(() => navigate("/"))}>
            <Home className="mr-2 h-4 w-4" /> Home
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/work"))}>
            <Briefcase className="mr-2 h-4 w-4" /> Work
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/lab"))}>
            <FlaskConical className="mr-2 h-4 w-4" /> Lab
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/skills"))}>
            <Sparkles className="mr-2 h-4 w-4" /> Skills
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/resume"))}>
            <FileText className="mr-2 h-4 w-4" /> Resume
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/contact"))}>
            <Mail className="mr-2 h-4 w-4" /> Contact
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          {selectedWork.map((p) => (
            <CommandItem key={p.id} onSelect={() => run(() => navigate("/work"))}>
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
          <CommandItem
            onSelect={() =>
              run(() => navigator.clipboard.writeText(contact.email))
            }
          >
            <Mail className="mr-2 h-4 w-4" /> Copy email
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.open(contact.github, "_blank"))}>
            <Github className="mr-2 h-4 w-4" /> Open GitHub
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.open(contact.linkedin, "_blank"))}>
            <Linkedin className="mr-2 h-4 w-4" /> Open LinkedIn
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(async () => {
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
                  window.open(contact.cvUrl, "_blank");
                }
              })
            }
          >
            <FileText className="mr-2 h-4 w-4" /> Download CV (.docx)
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

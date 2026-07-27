import React from "react";
import Nav from "../components/sections/Nav";
import Hero from "../components/sections/Hero";
import ResearchStrip from "../components/sections/ResearchStrip";
import Profile from "../components/sections/Profile";
import SelectedWork from "../components/sections/SelectedWork";
import ProjectIndex from "../components/sections/ProjectIndex";
import EvidenceGallery from "../components/sections/EvidenceGallery";
import GraphGame from "../components/sections/GraphGame";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <ResearchStrip />
      <Profile />
      <SelectedWork />
      <ProjectIndex />
      <EvidenceGallery />
      <GraphGame />
      <Skills />
      <Contact />
    </>
  );
}

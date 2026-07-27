import React from "react";
import "./App.css";
import Nav from "./components/sections/Nav";
import Hero from "./components/sections/Hero";
import ResearchStrip from "./components/sections/ResearchStrip";
import Profile from "./components/sections/Profile";
import SelectedWork from "./components/sections/SelectedWork";
import ProjectIndex from "./components/sections/ProjectIndex";
import EvidenceGallery from "./components/sections/EvidenceGallery";
import GraphGame from "./components/sections/GraphGame";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Cursor from "./components/Cursor";

function App() {
  return (
    <div className="App bg-[#0e0c08] min-h-screen">
      <Cursor />
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
    </div>
  );
}

export default App;

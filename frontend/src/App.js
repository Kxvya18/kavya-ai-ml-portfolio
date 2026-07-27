import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";
import LabPage from "./pages/LabPage";
import ResumePage from "./pages/ResumePage";
import NotFoundPage from "./pages/NotFoundPage";
import Cursor from "./components/Cursor";
import CommandPalette from "./components/CommandPalette";
import GlobalCornerScene from "./components/three/GlobalCornerScene";

function App() {
  return (
    <ThemeProvider>
      <div className="App bg-[#0e0c08] min-h-screen">
        <BrowserRouter>
          <Cursor />
          <CommandPalette />
          <GlobalCornerScene />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

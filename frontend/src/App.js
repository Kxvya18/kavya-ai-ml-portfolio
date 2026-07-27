import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import LabPage from "./pages/LabPage";
import ResumePage from "./pages/ResumePage";
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
            <Route path="/lab" element={<LabPage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

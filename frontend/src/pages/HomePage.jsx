import React from "react";
import Nav from "../components/sections/Nav";
import Hero from "../components/sections/Hero";
import ResearchStrip from "../components/sections/ResearchStrip";
import Profile from "../components/sections/Profile";
import ExploreGrid from "../components/sections/ExploreGrid";
import Footer from "../components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <ResearchStrip />
      <Profile />
      <ExploreGrid />
      <Footer />
    </>
  );
}

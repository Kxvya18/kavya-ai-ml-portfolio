import React from "react";
import Nav from "../components/sections/Nav";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import TerminalHeader from "../components/TerminalHeader";
import { contact } from "../mock";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0e0c08]">
      <Nav />
      <div className="max-w-[1400px] mx-auto px-8 pt-32 pb-8">
        <div className="max-w-2xl mb-10">
          <TerminalHeader
            file="contact.sh"
            cwd="~"
            command="cat contact.txt"
            output={[
              `email    : ${contact.email}`,
              `phone    : ${contact.phone}`,
              `github   : ${contact.githubLabel}`,
              `linkedin : ${contact.linkedinLabel}`,
              `location : ${contact.location}`,
            ]}
          />
        </div>
      </div>
      <Contact hideFooter />
      <Footer />
    </div>
  );
}

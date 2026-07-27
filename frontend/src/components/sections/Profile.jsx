import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../mock";
import TorusBackground from "../three/TorusBackground";

export default function Profile() {
  return (
    <section id="lab" className="relative bg-[#0e0c08] py-28 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden lg:block">
        <TorusBackground />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-2">
          <p className="text-[#8a7c5c] text-xs tracking-[0.3em] uppercase">Profile</p>
        </div>
        <div className="lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[#f5efe0] text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-4xl"
          >
            {profile.heading}
          </motion.h2>
          <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[#b8ac8c] text-sm leading-relaxed"
            >
              {profile.p1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-[#b8ac8c] text-sm leading-relaxed"
            >
              {profile.p2}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

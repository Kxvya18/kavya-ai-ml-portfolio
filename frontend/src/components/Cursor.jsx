import React, { useEffect, useRef } from "react";

/** Custom cursor with dot + soft aura */
export default function Cursor() {
  const dot = useRef(null);
  const aura = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
    };
    const loop = () => {
      tx += (x - tx) * 0.12;
      ty += (y - ty) * 0.12;
      if (aura.current) {
        aura.current.style.transform = `translate(${tx - 20}px, ${ty - 20}px)`;
      }
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        ref={aura}
        className="pointer-events-none fixed top-0 left-0 z-[200] w-10 h-10 rounded-full border border-[#c9a961]/50 mix-blend-difference hidden md:block"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[201] w-2 h-2 rounded-full bg-[#c9a961] hidden md:block"
      />
    </>
  );
}

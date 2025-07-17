import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Letters = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Crear ScrollTrigger para controlar el translateX
    ScrollTrigger.create({
      trigger: text,
      start: "top bottom",
      end: "bottom top",
      scrub: true, // Sincroniza directamente con el scroll
      onUpdate: (self) => {
        const progress = self.progress;
        // Mover de derecha a izquierda cuando se hace scroll hacia abajo
        const translateX = (progress - 0.5) * 800; // Aumentado para más movimiento
        gsap.set(text, { x: translateX });
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex items-center justify-center overflow-hidden mt-16">
      <span
        ref={textRef}
        className="uppercase text-[160px] text-nowrap text-[#1B1B1E] font-black"
      >
        Diaz Constructions&nbsp;
      </span>
    </div>
  );
};

export default Letters;

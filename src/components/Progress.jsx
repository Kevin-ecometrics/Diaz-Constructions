import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiArrowUp } from "react-icons/fi";

const ScrollProgressCircle = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / scrollHeight;
      const offset = circumference - scrollFraction * circumference;

      gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer group"
      onClick={scrollToTop}
      title="Volver al inicio"
    >
      <svg width="60" height="60">
        <circle
          ref={circleRef}
          cx="30"
          cy="30"
          r="25"
          stroke="#f97316"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FiArrowUp className="text-orange-500 text-xl group-hover:scale-110 transition-transform duration-200" />
      </div>
    </div>
  );
};

export default ScrollProgressCircle;

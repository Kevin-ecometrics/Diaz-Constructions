import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import gsap from "gsap";

function AboutInfo() {
  const [expanded, setExpanded] = useState(false);
  const extraRef = useRef(null);

  const paragraphs = [
    "Our core values of quality, efficiency and integrity drive us to provide tailor made solutions for each client, completing projects 60% faster without compromising excellence and quality focus.",
    "Specializing in both soft and general construction, we handle very aspect from permits and project management to safety permits and final inspections, ensuring a seamless stress-free experience. Our team works with meticulous attention to detail to guarantee your satisfaction and high-quality results.",
    "Let's bring your vision to life through honest communication at every step, with efficient execution and flawless finishes. Feel free to get a quote or schedule a consultation. We´re fully committed to helping make your new home or project an unforgettable experience understanding your needs and making your dream space a reality.",
    "We are here to help make your new home build an unforgettable experience. We have 15 years of experience working with several homeowners and have developed several projects ranging from kitchen & bathroom remodels, landscaping, additions & more. Our team is ready to tackle every part of your home.",
    "With a deep understanding of San Francsico and Bay Area styles and building codes, we are commitment to help homeowners improve their living spaces with top-quality materials and aesthetic results and log lasting",
  ];

  // animaciones
  useEffect(() => {
    if (extraRef.current) {
      if (expanded) {
        gsap.to(extraRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(extraRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    }
  }, [expanded]);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* siempre visibles */}
      <p className="text-gray-300 sm:text-gray-400 text-sm sm:text-base leading-relaxed">
        {paragraphs[0]}
      </p>
      <p className="text-gray-300 sm:text-gray-400 text-sm sm:text-base leading-relaxed">
        {paragraphs[1]}
      </p>

      {/* contenedor animado con gsap */}
      <div
        ref={extraRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
        className="space-y-3 sm:space-y-4"
      >
        {paragraphs.slice(2).map((text, index) => (
          <p
            key={index}
            className="text-gray-300 sm:text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            {text}
          </p>
        ))}
      </div>

      {/* botón */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center text-sm text-orange-400 hover:text-orange-500 transition-colors"
      >
        {expanded ? (
          <>
            Show less <FaChevronUp className="ml-2" />
          </>
        ) : (
          <>
            Read more <FaChevronDown className="ml-2" />
          </>
        )}
      </button>
    </div>
  );
}

export default AboutInfo;

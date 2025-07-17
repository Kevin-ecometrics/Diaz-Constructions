import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(0); // Primer elemento abierto por defecto
  const contentRefs = useRef([]);
  const arrowRefs = useRef([]);

  const accordionData = [
    {
      question: "What Are The 5 Stages Of Building Construction?",
      answer: {
        title: "We Work Strictly And Responsibly.",
        description:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
        additionalText:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
      },
    },
    {
      question: "How Long Does It Take To Get An Estimate?",
      answer: {
        title: "We Work Strictly And Responsibly.",
        description:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
        additionalText:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
      },
    },
    {
      question: "What Are The 5 Stages Of Building Construction?",
      answer: {
        title: "We Work Strictly And Responsibly.",
        description:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
        additionalText:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
      },
    },
    {
      question: "How Long Does It Take To Get An Estimate?",
      answer: {
        title: "We Work Strictly And Responsibly.",
        description:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
        additionalText:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
      },
    },
    {
      question: "What are the different types of construction projects?",
      answer: {
        title: "We Work Strictly And Responsibly.",
        description:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
        additionalText:
          "Proactively restore professional data and multimedia based collaboration and idea sharing. Credibly top line deliverables and cross platform manufactured products. Dramatically facilitate enabled value with seamless growth strategies.",
      },
    },
  ];

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Cerrar si ya está abierto
    } else {
      setOpenIndex(index); // Abrir nuevo
    }
  };

  useEffect(() => {
    // Animar el contenido cuando cambie el índice abierto
    contentRefs.current.forEach((content, index) => {
      if (content) {
        if (openIndex === index) {
          // Abrir
          gsap.fromTo(
            content,
            {
              height: 0,
              opacity: 0,
            },
            {
              height: "auto",
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            }
          );
        } else {
          // Cerrar
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        }
      }
    });

    // Animar las flechas
    arrowRefs.current.forEach((arrow, index) => {
      if (arrow) {
        gsap.to(arrow, {
          rotation: openIndex === index ? 180 : 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, [openIndex]);

  useEffect(() => {
    // Inicializar el primer elemento como abierto
    if (contentRefs.current[0]) {
      gsap.set(contentRefs.current[0], {
        height: "auto",
        opacity: 1,
      });
    }
  }, []);

  return (
    <section className="container mx-auto px-8 py-2">
      <div className="space-y-4">
        {accordionData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <h3 className="text-lg font-black text-gray-800">
                {item.question}
              </h3>
              <div
                ref={(el) => (arrowRefs.current[index] = el)}
                className="ml-4 flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Content */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden"
              style={{
                height: index === 0 ? "auto" : 0,
                opacity: index === 0 ? 1 : 0,
              }}
            >
              <div className="p-6 pt-0">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-1/3 flex-shrink-0">
                    <img
                      src="https://html.themewant.com/elever/assets/images/faq/02.webp"
                      alt="Construction work"
                      className="w-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="lg:w-2/3">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                      {item.answer.title}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.answer.description}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.answer.additionalText}
                    </p>

                    {/* Button */}
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                      Get A Free Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Accordion;

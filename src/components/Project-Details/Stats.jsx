import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const statsRef = useRef(null);
  const counters = useRef([]);

  const statsData = [
    {
      icon: (
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      number: 1200,
      suffix: "+",
      title: "We've had so many compliments from friends and family",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      number: 100,
      suffix: "+",
      title: "Our dedication to sustainable building practices",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      number: 95,
      suffix: "+",
      title: "Success rate of bot case completion",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      number: 16,
      suffix: "+",
      title: "Hours delivered back to the business",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Configurar la animación de contadores
      counters.current.forEach((counter, index) => {
        if (counter) {
          gsap.fromTo(
            counter,
            {
              textContent: 0,
            },
            {
              textContent: statsData[index].number,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                counter.textContent = Math.ceil(this.targets()[0].textContent);
              },
            }
          );
        }
      });

      // Animación del contenedor
      gsap.fromTo(
        statsRef.current.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className=" mb-8 py-8 container mx-auto rounded-2xl px-8">
      <div
        ref={statsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="text-start bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="flex justify-start mb-6">{stat.icon}</div>
            <div className="text-4xl font-bold text-gray-800 mb-4">
              <span
                ref={(el) => (counters.current[index] = el)}
                className="counter"
              >
                0
              </span>
              <span className="text-red-500">{stat.suffix}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;

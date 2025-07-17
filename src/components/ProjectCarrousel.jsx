import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ProjectCarrousel = ({ projectList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const intervalRef = useRef(null);
  const overlayRef = useRef(null);

  // Función para iniciar/pausar el carrusel
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Función para navegación manual
  const goToNext = () => {
    setDirection(1);
    animateTransition((currentIndex + 1) % projectList.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    animateTransition(
      (currentIndex - 1 + projectList.length) % projectList.length
    );
  };

  // Función de animación de transición mejorada
  const animateTransition = (nextIndex) => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Animación de salida con efecto de slide
    tl.to(containerRef.current, {
      x: direction * -100,
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex(nextIndex);

        // Reiniciar posición para entrada
        gsap.set(containerRef.current, {
          x: direction * 100,
          opacity: 0,
          scale: 0.95,
        });

        // Animación de entrada
        gsap.to(containerRef.current, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      },
    });
  };

  // Carrusel automático mejorado
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        animateTransition((currentIndex + 1) % projectList.length);
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, projectList.length, isPlaying, direction]);

  // Animaciones mejoradas para la entrada del nuevo centro
  useEffect(() => {
    const centerCard = cardRefs.current[1];
    if (centerCard) {
      const overlay = centerCard.querySelector(".project-overlay");
      const image = centerCard.querySelector(".project-image");
      const title = centerCard.querySelector(".project-title");
      const category = centerCard.querySelector(".project-category");
      const location = centerCard.querySelector(".project-location");
      const priceCards = centerCard.querySelectorAll(".price-card");

      // Timeline principal
      const tl = gsap.timeline();

      // Efecto de entrada de la imagen con parallax
      tl.fromTo(
        image,
        { scale: 1.3, opacity: 0, rotationY: 10 },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Animación del overlay con efecto de cristal
      tl.fromTo(
        overlay,
        {
          x: -120,
          opacity: 0,
          scale: 0.9,
          backdropFilter: "blur(0px)",
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          backdropFilter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Título con efecto de máquina de escribir
      tl.fromTo(
        title,
        { y: 40, opacity: 0, rotationX: 90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );

      // Categoría con slide suave
      tl.fromTo(
        category,
        { x: -30, opacity: 0, filter: "blur(5px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Ubicación con efecto de zoom
      tl.fromTo(
        location,
        { scale: 0, rotation: 180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // Cards de información con animación en cascada
      tl.fromTo(
        priceCards,
        {
          y: 60,
          opacity: 0,
          scale: 0.8,
          rotationY: 45,
          transformOrigin: "center bottom",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.6,
            from: "start",
            grid: [2, 2],
          },
        },
        "-=0.4"
      );

      // Efecto de respiración para la imagen
      gsap.to(image, {
        scale: 1.02,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      // Animación de brillo en el overlay
      gsap.to(overlay, {
        boxShadow: "0 0 30px rgba(255,255,255,0.1)",
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }

    // Animación para las cards laterales con efecto de flotación
    cardRefs.current.forEach((card, index) => {
      if (card && index !== 1) {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0.6, scale: 0.9, rotationY: 20 },
          {
            y: 0,
            opacity: 0.8,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.3 + index * 0.2,
          }
        );

        // Efecto de flotación suave
        gsap.to(card, {
          y: -15,
          duration: 3 + Math.random() * 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 1,
        });

        // Efecto de rotación sutil
        gsap.to(card, {
          rotationY: 3,
          duration: 4 + Math.random() * 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 0.5,
        });
      }
    });
  }, [currentIndex]);

  // Animación de entrada inicial del contenedor
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      );
    }
  }, []);

  const visibleProjects = [
    projectList[(currentIndex - 1 + projectList.length) % projectList.length],
    projectList[currentIndex % projectList.length],
    projectList[(currentIndex + 1) % projectList.length],
  ];

  return (
    <div className="relative px-4">
      {/* Carrusel principal */}
      <div
        ref={containerRef}
        className="flex justify-center items-center gap-6 perspective-1000"
      >
        {visibleProjects.map((project, index) => {
          const isCenter = index === 1;
          const cardWidth = isCenter ? "md:w-[700px]" : "md:w-[500px]";
          const cardHeight = isCenter ? "h-[600px]" : "h-[500px]";
          const visibilityClasses = isCenter ? "block" : "hidden sm:block";

          return (
            <a
              href="/project-details"
              key={`${project.id}-${currentIndex}-${index}`}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`relative group cursor-pointer ${visibilityClasses}`}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              <div
                className={`relative overflow-hidden rounded-2xl ${cardHeight} ${cardWidth} 
                  shadow-2xl border border-white/20 backdrop-blur-sm
                  transform transition-all duration-500 
                  group-hover:scale-105 group-hover:shadow-3xl
                  ${!isCenter ? "hover:opacity-90" : ""}`}
              >
                {/* Imagen con overlay de gradiente */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>

                <img
                  src={project.projectImage}
                  alt={project.title}
                  className="project-image object-cover h-full transform transition-transform duration-700 group-hover:scale-110 "
                  loading="eager"
                />

                {/* Overlay de información para el centro */}
                {isCenter && (
                  <div
                    className="project-overlay absolute bottom-0 left-0 h-full w-80 
                    bg-gradient-to-br from-white/95 via-white/90 to-white/85 
                    backdrop-blur-xl text-black shadow-2xl z-20 
                    rounded-r-2xl border-r border-white/30"
                  >
                    {/* Efecto de brillo en el borde */}
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>

                    <div className="project-content h-full p-8 flex flex-col justify-between">
                      <div>
                        <div className="mb-6">
                          <h3 className="project-title text-2xl font-bold text-gray-900 mb-3 leading-tight">
                            {project.title}
                          </h3>
                          <p className="project-category text-gray-600 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full inline-block">
                            {project.category} • {project.status}
                          </p>
                        </div>

                        <div className="mb-8">
                          <div className="project-location inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-100">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span className="text-sm text-blue-700 font-medium">
                              {project.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="price-card  rounded-xl p-4 border border-black hover:shadow-md transition-all duration-300 hover:scale-105">
                          <div className="text-xs  font-medium mb-1">
                            Price:
                          </div>
                          <div className="text-lg font-bold ">
                            ${project.price || "290k"}
                          </div>
                        </div>

                        <div className="price-card  rounded-xl p-4 border border-black hover:shadow-md transition-all duration-300 hover:scale-105">
                          <div className="text-xs  font-medium mb-1">
                            Client:
                          </div>
                          <div className="text-lg font-bold">
                            {project.client || "RC Builders"}
                          </div>
                        </div>

                        <div className="price-card  rounded-xl p-4 border border-black hover:shadow-md transition-all duration-300 hover:scale-105">
                          <div className="text-xs  font-medium mb-1">Year:</div>
                          <div className="text-lg font-bold ">
                            {project.year}
                          </div>
                        </div>

                        <div className="price-card  rounded-xl p-4 border border-black hover:shadow-md transition-all duration-300 hover:scale-105">
                          <div className="text-xs font-medium mb-1">
                            Duration:
                          </div>
                          <div className="text-lg font-bold">
                            {project.duration || "5Y, 3M"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay de hover para cards laterales */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-6">
                    <div className="text-white">
                      <h4 className="text-lg font-bold mb-2">
                        {project.title}
                      </h4>
                      <p className="text-sm text-white/80">
                        {project.category}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>

      {/* Contador de proyectos */}
      <div className="text-center mt-8 text-white/70 mb-8">
        <span className="text-sm">
          {currentIndex + 1} / {projectList.length}
        </span>
      </div>
      {/* Controles del carrusel */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={goToPrev}
          className="group bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-white group-hover:text-gray-800 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={togglePlayPause}
          className="group bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-white group-hover:text-gray-800 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white group-hover:text-gray-800 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-4-8V3a1 1 0 011-1h1a1 1 0 011 1v1"
              />
            </svg>
          )}
        </button>

        <button
          onClick={goToNext}
          className="group bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-white group-hover:text-gray-800 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Indicadores de progreso */}
      <div className="flex justify-center gap-2 mb-8">
        {projectList.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              animateTransition(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white shadow-lg scale-125"
                : "bg-white/40 hover:bg-white/60 hover:scale-110"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarrousel;

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "./Button";
import Home from "@assets/Home";
const HeroCarrousel = () => {
  const slides = [
    {
      id: 1,
      image: "/diaz-hero.webp",
      subtitle: "BUILDING THE BETTER FUTURE",
      title: "Construction beyond projects",
      description:
        "Your Trusted Partner for Stress-Free Construction – Soft and general constructor solutions for Home Remodeling and Beyond In SF ",
    },
    {
      id: 2,
      image: "/diaz-project3.webp",
      subtitle: "INNOVATIVE SOLUTIONS",
      title:
        "Unlock a remarkable 60% reduction in time while enjoying seamless results",
      description:
        "All thanks to our highly specialized team. Trust us to elevate your space and bring your vision to life  ",
    },
    {
      id: 3,
      image: "/diaz-project9.3.webp",
      subtitle: "EXPERT CRAFTSMANSHIP",
      title: "15+ Years of turning visions into reality",
      description:
        "Your trusted team for fast, flawless projects in San Francisco & Bay area  ",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasMounted = useRef(false);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const containerRef = useRef(null);

  // Detectar si estamos en el cliente
  useEffect(() => {
    setIsClient(true);
    // Pequeño delay para asegurar que todo esté listo
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const animateContent = () => {
    // Solo animar si estamos en el cliente y todo está listo
    if (!isClient || !isReady) return;

    // Verificar que las refs existan
    if (
      !imageRef.current ||
      !subtitleRef.current ||
      !titleRef.current ||
      !descRef.current
    ) {
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.6"
      );
  };

  const handleSlideChange = (index) => {
    if (index === activeSlide || !isClient || !isReady) return;

    // Verificar que las refs existan antes de animar
    if (!subtitleRef.current || !titleRef.current || !descRef.current) {
      setActiveSlide(index);
      return;
    }

    gsap.to([subtitleRef.current, titleRef.current, descRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveSlide(index);
      },
    });
  };

  // Swipe logic
  useEffect(() => {
    if (!isClient || !isReady) return;

    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && activeSlide < slides.length - 1) {
          handleSlideChange(activeSlide + 1);
        } else if (diff < 0 && activeSlide > 0) {
          handleSlideChange(activeSlide - 1);
        }
      }
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSlide, isClient, isReady]);

  // Animar cuando cambie el slide activo
  useEffect(() => {
    if (!isClient || !isReady) return;

    if (hasMounted.current) {
      animateContent();
    } else {
      hasMounted.current = true;
      // Para el primer montaje, esperamos un poco más
      setTimeout(() => {
        animateContent();
      }, 50);
    }
  }, [activeSlide, isClient, isReady]);

  // Mostrar un placeholder mientras se carga
  if (!isClient) {
    return (
      <div id="hero" className="px-4 sm:px-6 md:px-8 py-16">
        <div className="relative w-full overflow-hidden">
          <div className="relative overflow-hidden rounded-xl">
            <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="hero" className="px-4 sm:px-6 md:px-8 py-16">
      <div ref={containerRef} className="relative w-full overflow-hidden">
        {/* Imagen */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            ref={imageRef}
            src={slides[activeSlide].image}
            alt={`Slide ${activeSlide + 1}`}
            title={`Slide ${activeSlide + 1}`}
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover"
            onLoad={() => {
              // Asegurar que la animación se ejecute después de que la imagen cargue
              if (isReady && !hasMounted.current) {
                setTimeout(animateContent, 100);
              }
            }}
          />

          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
        </div>

        {/* Texto */}
        <div className="absolute inset-0 flex items-center z-30 justify-center sm:justify-start px-4 sm:px-10">
          <div ref={textRef} className="text-white max-w-xl sm:max-w-2xl">
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg mb-4 sm:mb-6 text-background font-bold "
            >
              {slides[activeSlide].subtitle}
            </p>
            <h1
              ref={titleRef}
              className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              {slides[activeSlide].title}
            </h1>
            <p
              ref={descRef}
              className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed"
            >
              {slides[activeSlide].description}
            </p>
            <Button
              titulo="Our Services"
              background="white"
              textColor="orange"
              hoverTextColor="white"
              href="/services/"
              border={false}
            />
          </div>
        </div>

        {/* Botones de navegación (ocultos en mobile) */}
        <div className="hidden sm:flex absolute bottom-4 sm:bottom-[40%] right-4 sm:right-10 flex-row sm:flex-col space-x-3 sm:space-x-0 sm:space-y-3 z-30">
          {slides.map((slide, index) => (
            <button
              aria-label="Go to Slide"
              key={slide.id}
              onClick={() => handleSlideChange(index)}
              onMouseEnter={(e) => {
                if (isReady) {
                  gsap.to(e.target, { scale: 1.1, duration: 0.2 });
                }
              }}
              onMouseLeave={(e) => {
                if (isReady) {
                  gsap.to(e.target, {
                    scale: activeSlide === index ? 1.1 : 1,
                    duration: 0.2,
                  });
                }
              }}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-lg font-bold transition-colors duration-300 flex items-center justify-center ${
                activeSlide === index
                  ? "bg-orange-500 shadow-lg scale-110"
                  : "bg-orange-400"
              }`}
              style={{
                // Asegurar que los botones sean visibles desde el inicio
                opacity: isReady ? 1 : 0.8,
                transition: "opacity 0.3s ease",
              }}
            >
              <Home width={20} height={20} />
            </button>
          ))}
        </div>

        <div className="absolute bottom-5 sm:hidden left-4 right-4 flex justify-center z-30">
          <p className="text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-md shadow">
            Desliza para cambiar
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="absolute bottom-2 sm:bottom-8 left-4 right-4 z-30">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded transition-all duration-300 ${
                  activeSlide === index
                    ? "bg-background"
                    : "bg-white bg-opacity-30"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarrousel;

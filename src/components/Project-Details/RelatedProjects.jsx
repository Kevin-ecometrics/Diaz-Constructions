import React, { useRef, useState, useEffect } from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoLocationSharp,
} from "react-icons/io5";

const ProjectSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Azila Mansion",
      subtitle: "Luxury Residences, Modern Homes",
      location: "Dubai Marina",
      price: "From $290k",
      client: "RC Builders",
      projectYear: "15 Oct 2019",
      duration: "5Y, 3M",
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/05.webp",
    },
    {
      id: 2,
      title: "Marina Heights",
      subtitle: "Premium Towers, Luxury Living",
      location: "Dubai Marina",
      price: "From $450k",
      client: "Elite Properties",
      projectYear: "22 Mar 2020",
      duration: "4Y, 8M",
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/06.webp",
    },
    {
      id: 3,
      title: "Skyline Towers",
      subtitle: "Urban Architecture, Modern Design",
      location: "Business Bay",
      price: "From $380k",
      client: "Metro Construction",
      projectYear: "08 Jul 2021",
      duration: "3Y, 6M",
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/05.webp",
    },
    {
      id: 4,
      title: "Ocean Vista",
      subtitle: "Waterfront Living, Luxury Suites",
      location: "Palm Jumeirah",
      price: "From $750k",
      client: "Luxury Developments",
      projectYear: "12 Nov 2022",
      duration: "6Y, 2M",
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/06.webp",
    },
    {
      id: 5,
      title: "Golden Plaza",
      subtitle: "Commercial Excellence, Modern Spaces",
      location: "Downtown Dubai",
      price: "From $520k",
      client: "Premium Corp",
      projectYear: "05 Jan 2023",
      duration: "4Y, 1M",
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/05.webp",
    },
  ];

  const slideWidth = isMobile ? 100 : 50; // 100% en mobile, 50% en desktop

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    // Si llegamos al final del primer set, resetear sin animación
    if (nextIndex >= projects.length) {
      setTimeout(() => {
        setCurrentIndex(0);
        if (sliderRef.current) {
          sliderRef.current.style.transition = "none";
          sliderRef.current.style.transform = "translateX(0%)";
          requestAnimationFrame(() => {
            sliderRef.current.style.transition = "transform 0.5s ease-in-out";
          });
        }
        setIsAnimating(false);
      }, 500);
    } else {
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (currentIndex === 0) {
      // Ir al último elemento del primer set
      setCurrentIndex(projects.length - 1);
      if (sliderRef.current) {
        sliderRef.current.style.transition = "none";
        sliderRef.current.style.transform = `translateX(-${
          (projects.length - 1) * slideWidth
        }%)`;
        requestAnimationFrame(() => {
          sliderRef.current.style.transition = "transform 0.5s ease-in-out";
        });
      }
    } else {
      setCurrentIndex(currentIndex - 1);
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Soporte para gestos táctiles
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 py-8">
      {/* Main Slider Container */}
      <div
        className="relative h-[500px] sm:h-[600px] overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
        >
          {/* Duplicar los proyectos para crear un loop infinito */}
          {[...projects, ...projects].map((project, index) => (
            <div
              key={`${project.id}-${Math.floor(index / projects.length)}`}
              className={`relative ${
                isMobile ? "min-w-full" : "min-w-1/2"
              } h-full flex-shrink-0`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Info Overlay */}
              <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-auto text-white z-10">
                <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 leading-tight">
                  {project.title}
                </h1>
                <p className="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6 leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Location Badge */}
                <div className="inline-flex items-center gap-2 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-white border-opacity-20">
                  <IoLocationSharp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{project.location}</span>
                </div>
              </div>

              {/* Project Details Card */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl">
                  <div
                    className={`grid ${
                      isMobile ? "grid-cols-2 gap-4" : "grid-cols-4 gap-6"
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Price:
                      </p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {project.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Client:
                      </p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {project.client}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Project Year:
                      </p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {project.projectYear}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Duration:
                      </p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {project.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Solo visible en desktop */}
        {!isMobile && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white border-opacity-30"
              disabled={isAnimating}
            >
              <IoChevronBack className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white border-opacity-30"
              disabled={isAnimating}
            >
              <IoChevronForward className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-4 sm:mt-8 gap-2 sm:gap-3 mb-8 md:hidden">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex % projects.length
                ? "bg-gray-800 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Project Counter */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-white">
        <span className="text-xs sm:text-sm">
          {String((currentIndex % projects.length) + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default ProjectSlider;

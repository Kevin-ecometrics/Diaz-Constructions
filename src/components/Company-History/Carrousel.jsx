import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "Leading The Way",
      description:
        "Varius dis malesuada nisi ligulavel senectus habitant aliquam, augue natoque sem nascetur quis himenaeos volutpat facilisis orco morbi mattis sagittis atu commodo pharetra fermentum. Primis risus diam himenaeos viverra rat habitant",
    },
    {
      title: "Innovation Excellence",
      description:
        "Transforming industries through cutting-edge technology and strategic partnerships. Our commitment to excellence drives us to deliver solutions that exceed expectations and create lasting value for our clients.",
    },
    {
      title: "Building Tomorrow",
      description:
        "Pioneering sustainable construction practices that shape the future of urban development. Every project represents our dedication to quality, safety, and environmental responsibility in modern architecture.",
    },
    {
      title: "Professional Excellence",
      description:
        "Decades of experience combined with innovative approaches ensure project success. Our team of experts brings unmatched expertise and attention to detail to every construction challenge we undertake.",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentIndex]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 md:px-0 py-8">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center gap-8">
        {/* Flecha Izquierda Desktop */}
        <button
          aria-label="Previous Slide"
          onClick={prevSlide}
          className="bg-orange-800/90 hover:bg-orange-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl flex-shrink-0"
        >
          <FaChevronLeft className="text-2xl" />
        </button>

        {/* Card del Carrusel Desktop */}
        <div className="relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div
            className="relative w-full h-96 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Slides Container Desktop */}
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `tranorangeX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 flex">
                  {/* Image Section */}
                  <div className="w-1/2 relative overflow-hidden">
                    <img
                      src="https://html.themewant.com/elever/assets/images/about/01.jpg"
                      alt={slide.title}
                      title={slide.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                  </div>

                  {/* Content Section */}
                  <div className="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="space-y-6">
                      <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators Desktop */}
          <div className="absolute bottom-4 left-1/2 transform -tranorange-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                aria-label="Go to Slide"
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-orange-800 scale-125 shadow-lg"
                    : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar Desktop */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-orange-800 to-orange-600 transition-all duration-700 ease-out"
              style={{
                width: `${((currentIndex + 1) / slides.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Flecha Derecha Desktop */}
        <button
          aria-label="Next Slide"
          onClick={nextSlide}
          className="bg-orange-800/90 hover:bg-orange-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl flex-shrink-0"
        >
          <FaChevronRight className="text-2xl" />
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Card del Carrusel Mobile - Sin flechas */}
        <div className="relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          <div
            className="relative w-full h-80 overflow-hidden"
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            {/* Slides Container Mobile */}
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `tranorangeX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 flex flex-col">
                  {/* Image Section Mobile */}
                  <div className="w-full h-48 relative overflow-hidden">
                    <img
                      src="https://html.themewant.com/elever/assets/images/about/01.jpg"
                      alt={slide.title}
                      title={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>

                  {/* Content Section Mobile */}
                  <div className="w-full p-6 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100 h-32">
                    <div className="space-y-3">
                      <h2 className="text-xl font-bold text-gray-800 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar Mobile */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-orange-800 to-orange-600 transition-all duration-700 ease-out"
              style={{
                width: `${((currentIndex + 1) / slides.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Controles Mobile - Abajo del carrusel */}
        <div className="flex items-center justify-center gap-6">
          {/* Flecha Izquierda Mobile */}
          <button
            aria-label="Previous Slide"
            onClick={prevSlide}
            className="bg-orange-800/90 hover:bg-orange-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          {/* Indicators Mobile */}
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                aria-label={`Go to Slide ${index + 1}`}
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-orange-800 scale-125 shadow-lg"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Flecha Derecha Mobile */}
          <button
            aria-label="Next Slide"
            onClick={nextSlide}
            className="bg-orange-800/90 hover:bg-orange-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

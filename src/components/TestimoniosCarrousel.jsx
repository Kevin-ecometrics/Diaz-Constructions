import React, { useState, useRef, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const TestimoniosCarrousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateView = () => {
      const mobile = window.innerWidth < 768;
      setItemsPerView(mobile ? 1 : 2);
      setIsMobile(mobile);
      setCurrentIndex(0);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const animateSlide = (index) => {
    if (containerRef.current) {
      const translateX = -(index * (100 / testimonials.length));
      containerRef.current.style.transform = `translateX(${translateX}%)`;
    }
  };

  const nextSlide = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    animateSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    animateSlide(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    animateSlide(index);
  };

  return (
    <div className="relative max-w-6xl mx-auto p-6">
      {/* Carrusel con navegación lateral */}
      <div className="relative">
        {!isMobile && (
          <>
            {/* Botón Izquierda */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute left-[-100px] top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-orange-50 group transition ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Anterior"
            >
              <IoChevronBack className="w-6 h-6 text-gray-600 group-hover:text-background" />
            </button>

            {/* Botón Derecha */}
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`absolute right-[-100px] top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-orange-50 group transition ${
                currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Siguiente"
            >
              <IoChevronForward className="w-6 h-6 text-gray-600 group-hover:text-background" />
            </button>
          </>
        )}

        {/* Contenedor del carrusel */}
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(100 / itemsPerView) * testimonials.length}%`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="flex-shrink-0 px-4"
                style={{
                  width: `${100 / testimonials.length}%`,
                }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {testimonial.position}
                      </p>
                      <div className="flex items-center gap-2 text-yellow-400">
                        <span className="text-lg">⭐⭐⭐⭐⭐</span>
                        <span className="text-sm font-semibold text-gray-700">
                          {testimonial.rating} Ratings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: botones abajo */}
        {isMobile && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition hover:bg-orange-50 group ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Anterior"
            >
              <IoChevronBack className="w-6 h-6 text-gray-600 group-hover:text-background" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition hover:bg-orange-50 group ${
                currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Siguiente"
            >
              <IoChevronForward className="w-6 h-6 text-gray-600 group-hover:text-background" />
            </button>
          </div>
        )}
      </div>

      {/* Indicadores de puntos */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-background scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="text-center mt-3 text-sm text-gray-500">
        {currentIndex + 1} de {maxIndex + 1}
      </div>
    </div>
  );
};

export default TestimoniosCarrousel;

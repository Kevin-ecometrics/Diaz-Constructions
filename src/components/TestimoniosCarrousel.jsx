import React, { useState, useRef, useEffect } from "react";

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
    <div className="relative md:max-w-6xl md:mx-auto p-6">
      {/* Carrusel con navegación lateral */}
      <div className="relative">
        {!isMobile && (
          <>
            {/* Botón Izquierda */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute left-[-80px] md:top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-orange-50 hover:shadow-xl group transition-all duration-300 ${
                currentIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              aria-label="Anterior"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors"
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

            {/* Botón Derecha */}
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-orange-50 hover:shadow-xl group transition-all duration-300 ${
                currentIndex === maxIndex
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              aria-label="Siguiente"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors"
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
          </>
        )}

        {/* Mobile: botones abajo */}
        {isMobile && (
          <div className="flex justify-between items-center gap-4 p-2">
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50 group ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                aria-label="Anterior"
              >
                <svg
                  className="w-6 h-6 text-gray-600 group-hover:text-orange-600"
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
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className={`p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50 group ${
                  currentIndex === maxIndex
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                aria-label="Siguiente"
              >
                <svg
                  className="w-6 h-6 text-gray-600 group-hover:text-orange-600"
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
            <div className="text-center mt-2 text-sm text-gray-500 font-medium">
              {currentIndex + 1} of {maxIndex + 1}
            </div>
          </div>
        )}

        {/* Contenedor del carrusel */}
        <div className="overflow-hidden py-2 md:py-4">
          <div
            ref={containerRef}
            className="flex items-start transition-transform duration-500 ease-in-out"
            style={{
              width: `${(100 / itemsPerView) * testimonials.length}%`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="flex-shrink-0 px-2 md:px-4 flex"
                style={{
                  width: `${100 / testimonials.length}%`,
                }}
              >
                {/* Card con altura automática en mobile y fija en desktop */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full md:h-full flex flex-col overflow-hidden group">
                  {/* Contenido principal */}
                  <div className="flex-1 p-4 md:p-8">
                    {/* Quote icon */}
                    <div className="mb-3 md:mb-4">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-orange-200"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>

                    {/* Texto del testimonio */}
                    <p className="text-gray-700 text-sm md:text-lg leading-relaxed font-medium">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Footer con información del autor */}
                  <div className="bg-gradient-to-r from-gray-50 to-orange-50 px-4 py-4 md:px-8 md:py-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-3 border-white shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white"></div>
                      </div>

                      {/* Información del autor */}
                      <div className="flex-1">
                        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {testimonial.position}
                        </p>

                        {/* Rating con estrellas */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 md:w-4 md:h-4 ${
                                  i < testimonial.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-200 fill-current"
                                }`}
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs md:text-sm font-semibold text-gray-700 ml-1">
                            {testimonial.rating} Ratings
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicadores de puntos mejorados */}
      <div className="md:flex justify-center gap-2 mt-6 hidden">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-orange-500 w-8 shadow-lg"
                : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="text-center mt-3 text-sm text-gray-500 md:block hidden font-medium">
        {currentIndex + 1} / {maxIndex + 1}
      </div>
    </div>
  );
};

export default TestimoniosCarrousel;

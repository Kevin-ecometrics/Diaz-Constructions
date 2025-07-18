import { useRef, useState, useEffect } from "react";

const services = [
  {
    id: 1,
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    label: "Service 01",
    title: "New home builds",
    description:
      "Looking to build your dream home? Building a home starts with an idea we are here to push your ideas into visions and bring them to life ",
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    label: "Service 02",
    title: "Additions/ ADUS",
    description:
      "Do you want to extend your home? Growing family and in need of an extra room, home office, laundry room whatever you need we manage to make the process as easy as possible for you. ",
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    label: "Service 03",
    title: "Bathroom and Kitchen remodel ",
    description:
      "In need for an update? We do custom designs to combine functionality and style with high quality finishes and modern layouts for your specific needs  ",
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    label: "Service 04",
    title: "Landscape/ hardscape",
    description:
      "Your outdoor living space should leave you speechless each time you step out the door. We can help with driveways, walkways, retaining walls, artificial turf, Irrigation systems, pavers, concrete and decking. ",
  },
  {
    id: 5,
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    label: "Service 05",
    title: "Outdoor kitchen /BBQ",
    description:
      "The perfect outdoor space for relaxation, entertaining with all attention to detail to look like an harmonious extension of your house  ",
  },
  {
    id: 6,
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    label: "Service 06",
    title: "Flooring ",
    description:
      " Looking to upgrade your flooring? Hardwood, laminate or luxury vinyl planks whatever you choose we offer high quality finishes durability  ",
  },
];

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;
  const cardWidth = 384; // w-96 = 384px
  const gap = 32;
  const totalItems = services.length;
  const maxIndex = totalItems - visibleCards;
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      const offset = -(currentIndex * (cardWidth + gap));
      sliderRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  // Auto-slide cada 10 segundos
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, [maxIndex]);

  return (
    <section className="py-10 md:py-20 text-white">
      <div className="md:w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-background text-lg  font-semibold tracking-wide">
            What We Offer
          </h2>
          <h3 className="text-2xl font-bold mt-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            We have a deep understanding of San Francisco and Bay Area styles
            and building codes, and we're committed to helping homeowners
            enhance their living spaces with top-quality materials and
            aesthetically pleasing, long-lasting results.{" "}
          </h3>
        </div>

        <div className="relative">
          {/* Botón Izquierda */}
          <button
            aria-label="Previous Slide"
            className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-10 bg-background bg-opacity-50 hover:bg-opacity-80 p-3 rounded-full"
            onClick={handlePrev}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Botón Derecha */}
          <button
            aria-label="Next Slide"
            className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-10 bg-background bg-opacity-50 hover:bg-opacity-80 p-3 rounded-full"
            onClick={handleNext}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden md:block hidden">
            <div
              className="flex gap-8 transition-transform duration-500 will-change-transform"
              ref={sliderRef}
              style={{ width: `${(cardWidth + gap) * services.length}px` }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-96 p-6 rounded-xl shadow-2xl border border-background bg-[#1E1E20] hover:from-gray-800 hover:to-gray-900 transition-all duration-500 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-background to-background rounded-xl flex items-center justify-center shadow-lg">
                      {service.icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
                      {service.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-background transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href="/services/"
                    title="Explore More"
                    onClick={(e) => e.stopPropagation()}
                    className="text-background font-semibold hover:text-background transition-all duration-300 flex items-center gap-2"
                  >
                    Explore More
                    <svg
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
          {/* Versión Mobile */}
          <section className="block md:hidden py-10 text-white">
            <div className="w-full px-4">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {services.map((service) => (
                    <div key={service.id} className="w-full flex-shrink-0 p-4">
                      <div className="p-6 rounded-xl shadow-2xl border border-background bg-[#1E1E20]">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-background to-background rounded-xl flex items-center justify-center shadow-lg">
                            {service.icon}
                          </div>
                          <span className="text-xs font-semibold text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
                            {service.label}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-background">
                          {service.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paginación */}
                <div className="flex justify-center mt-6 gap-2">
                  {services.map((_, idx) => (
                    <button
                      aria-label="Go to Slide"
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "bg-background scale-110"
                          : "bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;

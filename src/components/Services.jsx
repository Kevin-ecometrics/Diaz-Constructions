import { useRef, useState, useEffect } from "react";
import Service from "@assets/Service";
import Service2 from "@assets/Service2";
import Service3 from "@assets/Service3";
import Service4 from "@assets/Service4";
import Service5 from "@assets/Service5";
import Service6 from "@assets/Service6";
const services = [
  {
    id: 1,
    icon: <Service className="invert" />,
    label: "Service 01",
    title: "New home builds",
    description:
      "Looking to build your dream home? Building a home starts with an idea we are here to push your ideas into visions and bring them to life ",
    url: "/service-details/new-home-builds/",
  },
  {
    id: 2,
    icon: <Service2 className="invert" />,
    label: "Service 02",
    title: "Additions/ ADUS",
    description:
      "Do you want to extend your home? Growing family and in need of an extra room, home office, laundry room whatever you need we manage to make the process as easy as possible for you. ",
    url: "/service-details/additions-adus/",
  },
  {
    id: 3,
    icon: <Service3 className="invert" />,
    label: "Service 03",
    title: "Bathroom and Kitchen remodel ",
    description:
      "In need for an update? We do custom designs to combine functionality and style with high quality finishes and modern layouts for your specific needs  ",
    url: "/service-details/bathroom-kitchen-remodel/",
  },
  {
    id: 4,
    icon: <Service4 className="invert" />,
    label: "Service 04",
    title: "Landscape/ hardscape",
    description:
      "Your outdoor living space should leave you speechless each time you step out the door. We can help with driveways, walkways, retaining walls, artificial turf, Irrigation systems, pavers, concrete and decking. ",
    url: "/service-details/landscape-hardscape/",
  },
  {
    id: 5,
    icon: <Service5 className="invert" />,
    label: "Service 05",
    title: "Outdoor kitchen /BBQ",
    description:
      "The perfect outdoor space for relaxation, entertaining with all attention to detail to look like an harmonious extension of your house  ",
    url: "/service-details/outdoor-kitchen-bbq/",
  },
  {
    id: 6,
    icon: <Service6 className="invert" />,
    label: "Service 06",
    title: "Flooring ",
    description:
      " Looking to upgrade your flooring? Hardwood, laminate or luxury vinyl planks whatever you choose we offer high quality finishes durability  ",
    url: "/service-details/flooring/",
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
          <h3 className="md:text-2xl text-xl font-bold mt-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
          <div className="overflow-hidden md:block hidden md:h-80">
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
                  <a href="#" className="group-hover:text-background">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-background transition-colors duration-300">
                      {service.title}
                    </h3>
                  </a>

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
                          {/* <div className="w-12 h-12 bg-gradient-to-br from-background to-background rounded-xl flex items-center justify-center shadow-lg">
                            {service.icon}
                          </div> */}
                          <span className="text-xs font-semibold text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
                            {service.label}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-background">
                          {service.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
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

// ProjectCarrousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectCarrousel = ({ projectList }) => {
  const swiperRef = useRef(null);

  return (
    <div className="relative px-4">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={40}
        centeredSlides
        loop
        slidesPerView="auto"
        navigation={false}
        speed={1000}
        className="w-full max-w-7xl mb-8"
      >
        {projectList.map((project, index) => (
          <SwiperSlide
            key={project.id || index}
            className=" w-auto md:!w-[700px] transition-all duration-700 ease-in-out"
          >
            {({ isActive }) => (
              <a
                href={project.projectUrl}
                title={project.title}
                className="relative group cursor-pointer flex justify-center"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? "h-[600px] md:w-[700px] scale-100 opacity-100"
                      : "h-[500px] md:w-[500px] scale-90 opacity-70"
                  } group-hover:scale-[1.03]`}
                >
                  {/* Overlay oscuro */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10 transition-opacity duration-700"></div>

                  {/* Imagen */}
                  <img
                    src={project.projectImage}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    loading="eager"
                  />

                  {isActive ? (
                    // Panel lateral (solo en el slide central)
                    <div className="absolute bottom-0 left-0 h-full w-72 md:w-80 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl text-black shadow-2xl z-20 rounded-r-2xl border-r border-white/30 transition-all duration-1000 ease-in-out">
                      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                      <div className="h-full p-8 flex flex-col justify-between">
                        <div>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full inline-block">
                              {project.category} • {project.status}
                            </p>
                          </div>
                          <div className="mb-8">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-100">
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
                                  d="M15 11a3 3 0 11-6 0 3 3 0z"
                                />
                              </svg>
                              <span className="text-sm text-blue-700 font-medium">
                                {project.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {["Price", "Client", "Year", "Duration"].map(
                            (label, i) => (
                              <div
                                key={i}
                                className="rounded-xl p-4 border border-black hover:shadow-md transition-all duration-500 ease-in-out hover:scale-105"
                              >
                                <div className="text-xs font-medium mb-1">
                                  {label}:
                                </div>
                                <div className="text-lg font-bold">
                                  {label === "Price"
                                    ? `$${project.price || "290k"}`
                                    : label === "Client"
                                    ? project.client || "RC Builders"
                                    : label === "Year"
                                    ? project.year
                                    : project.duration || "5Y, 3M"}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Overlay hover para laterales
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 flex items-end p-6">
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
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controles personalizados en la parte inferior */}
      <div className="flex items-center justify-center gap-8 mt-8">
        {/* Botón Anterior */}
        <button
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Slide anterior"
        >
          <svg
            className="w-5 h-5 text-white transform group-hover:-translate-x-0.5 transition-transform duration-200"
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

        {/* Botón Siguiente */}
        <button
          onClick={() => swiperRef.current?.swiper?.slideNext()}
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Slide siguiente"
        >
          <svg
            className="w-5 h-5 text-white transform group-hover:translate-x-0.5 transition-transform duration-200"
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
    </div>
  );
};

export default ProjectCarrousel;

// MapComponent.jsx
import { useEffect, useRef } from "react";

const MapComponent = ({
  title = "Our Location",
  subtitle = "Find us on the map below",
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20California%2C%20EE.%20UU.!5e0!3m2!1ses-419!2smx!4v1752020612132!5m2!1ses-419!2smx",
  height = "500",
  width = "100%",
  rounded = true,
  showHeader = true,
}) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => iframe.classList.add("loaded");
    iframe.addEventListener("load", handleLoad);

    // Forzar reload si el iframe no carga correctamente
    if (!iframe.src.includes("google")) {
      iframe.src = iframe.src;
    }

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div
            className={`relative overflow-hidden shadow-lg ${
              rounded ? "rounded-2xl" : ""
            }`}
          >
            <div className="relative bg-white">
              <iframe
                ref={iframeRef}
                src={mapUrl}
                width={width}
                height={height}
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
                title="Mapa de ubicación"
              ></iframe>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 hidden md:block">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-background"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Ubication
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          iframe {
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
          }
          iframe.loaded {
            opacity: 1;
          }

          @media (max-width: 768px) {
            iframe {
              height: 400px !important;
            }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            iframe {
              height: 500px !important;
            }
          }
          @media (min-width: 1025px) {
            iframe {
              height: 600px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default MapComponent;

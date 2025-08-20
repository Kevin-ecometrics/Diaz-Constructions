import { useState, useEffect, useCallback, useMemo } from "react";

const ProjectImage = ({ src, alt, title, className = "", images = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Memoizar la lista de imágenes y verificaciones
  const isSingleImage = !images || images.length === 0;
  const imageList = useMemo(() => {
    return isSingleImage ? [{ src, alt, title }] : images;
  }, [isSingleImage, src, alt, title, images]);

  const currentImage = imageList[currentImageIndex];
  const hasNavigation = imageList.length > 1;

  // Callbacks memoizados para evitar re-renders innecesarios
  const openModal = useCallback(() => {
    if (!isSingleImage) {
      const currentIndex = images.findIndex((img) => img.src === src);
      setCurrentImageIndex(currentIndex >= 0 ? currentIndex : 0);
    } else {
      setCurrentImageIndex(0);
    }
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, [isSingleImage, images, src]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const nextImage = useCallback(() => {
    if (imageList.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
    }
  }, [imageList.length]);

  const prevImage = useCallback(() => {
    if (imageList.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + imageList.length) % imageList.length
      );
    }
  }, [imageList.length]);

  const goToImage = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
      }
    },
    [closeModal, nextImage, prevImage]
  );

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (isModalOpen) e.preventDefault();
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchmove", handleTouchMove);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isModalOpen, handleKeyDown]);

  return (
    <>
      {/* Imagen clickeable */}
      <img
        src={src}
        alt={alt || "Imagen"}
        title={title || ""}
        className={`${className} cursor-pointer hover:opacity-90 transition-opacity duration-200`}
        onClick={openModal}
        loading="lazy"
      />

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-999 p-4"
          onClick={handleOverlayClick}
        >
          {/* Botón cerrar */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white transition-colors z-20 p-2 rounded-full hover:bg-white hover:text-orange-500 hover:bg-opacity-10"
            aria-label="Cerrar modal"
          >
            ✕
          </button>

          {/* Navegación */}
          {hasNavigation && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 hidden md:block -translate-y-1/2 text-white transition-colors z-20 p-2 rounded-full hover:bg-white hover:text-orange-500 hover:bg-opacity-10"
                aria-label="Imagen anterior"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 hidden md:block -translate-y-1/2 text-white transition-colors z-20 p-2 rounded-full hover:bg-white hover:text-orange-500 hover:bg-opacity-10"
                aria-label="Imagen siguiente"
              >
                →
              </button>
            </>
          )}

          {/* Contenedor principal de la imagen */}
          <div className="flex flex-col items-center justify-center max-w-full max-h-full pb-24">
            <div className="relative max-w-4xl max-h-[65vh] mb-4">
              <img
                src={currentImage.src}
                alt={currentImage.alt || "Imagen"}
                className="h-[75vh] object-contain rounded-lg shadow-2xl"
                loading="eager"
              />
            </div>
          </div>

          {/* Miniaturas */}
          {hasNavigation && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                {imageList.map((img, index) => (
                  <button
                    key={`${img.src}-${index}`}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? "border-white opacity-100 scale-110"
                        : "border-gray-400 opacity-60 hover:opacity-80 hover:border-gray-300"
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt || "Miniatura"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Indicadores de teclado */}
          {hasNavigation && (
            <div className="absolute top-4 left-4 hidden md:block text-white text-xs opacity-50 space-y-1">
              <div>← → Navegar</div>
              <div>ESC Cerrar</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectImage;

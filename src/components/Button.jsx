import React from "react";

const Button = ({
  titulo = "Button",
  background = "white", // "black", "white", "transparent"
  textColor = "black", // "white", "orange", "black"
  hoverTextColor = "white", // "white", "orange"
  backgroundHover = "orange", // "orange", "white", "black"
  border = false, // true (naranja), false (sin borde)
  href = "",
}) => {
  // Mapeo de backgrounds
  const backgrounds = {
    black: "bg-black",
    white: "bg-white",
    transparent: "bg-transparent",
  };

  // Mapeo de colores de texto
  const textColors = {
    white: "text-white",
    orange: "text-[#E88632]",
    black: "text-black",
  };

  // Mapeo para background en hover
  const hoverBackgrounds = {
    orange: "bg-[#E88632]",
    white: "bg-white",
    black: "bg-black",
  };

  const baseClasses = `
    relative overflow-hidden px-8 py-4 rounded font-semibold group inline-block
    transition-all duration-300 ease-in-out
    ${backgrounds[background] || backgrounds.white}
    ${textColors[textColor] || textColors.black}
    ${border ? "border-2 border-[#E88632]" : ""}
  `
    .trim()
    .replace(/\s+/g, " ");

  const content = (
    <>
      {/* Fondo animado con color hover */}
      <span
        className={`absolute left-0 bottom-0 w-full h-full rounded z-0 pointer-events-none origin-bottom transition-transform duration-300 scale-y-0 group-hover:scale-y-100 ${
          hoverBackgrounds[backgroundHover] || "bg-[#E88632]"
        }`}
        aria-hidden="true"
      />
      {/* Texto */}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          hoverTextColor === "white"
            ? "group-hover:text-white"
            : "group-hover:text-[#E88632]"
        }`}
      >
        {titulo}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }

  return <button className={baseClasses}>{content}</button>;
};

export default Button;

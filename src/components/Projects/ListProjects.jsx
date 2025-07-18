import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProjectsPortfolio = () => {
  const projectsList = [
    {
      id: 1,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/20.webp",
      title: "Vehicle Manufacturing",
      text: "Building, Renovation",
      tags: ["all-works", "construction-project"],
      href: "/project-details/",
    },
    {
      id: 2,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/19.webp",
      title: "Advanced Engineering",
      text: "Industrial, Technology",
      tags: ["all-works", "alfa-project"],
      href: "/project-details/",
    },
    {
      id: 3,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/18.webp",
      title: "Modern Architecture",
      text: "Design, Construction",
      tags: ["all-works", "lorence-project"],
      href: "/project-details/",
    },
    {
      id: 4,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/17.webp",
      title: "Infrastructure Development",
      text: "Building, Planning",
      tags: ["all-works", "construction-project"],
      href: "/project-details/",
    },
    {
      id: 5,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/16.webp",
      title: "Innovation Hub",
      text: "Technology, Research",
      tags: ["all-works", "alfa-project"],
      href: "/project-details/",
    },
    {
      id: 6,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/15.webp",
      title: "Sustainable Design",
      text: "Green, Environment",
      tags: ["all-works", "lorence-project"],
      href: "/project-details/",
    },
    {
      id: 7,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/14.webp",
      title: "Urban Planning",
      text: "City, Development",
      tags: ["all-works", "construction-project"],
      href: "/project-details/",
    },
    {
      id: 8,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/13.webp",
      title: "Smart Solutions",
      text: "Digital, Innovation",
      tags: ["all-works", "alfa-project"],
      href: "/project-details/",
    },
    {
      id: 9,
      image:
        "https://html.themewant.com/elever/assets/images/portfolio/12.webp",
      title: "Creative Spaces",
      text: "Art, Culture",
      tags: ["all-works", "lorence-project"],
      href: "/project-details/",
    },
  ];

  const availableTags = [
    { id: "all-works", name: "ALL WORKS" },
    { id: "alfa-project", name: "ALFA PROJECT" },
    { id: "construction-project", name: "CONSTRUCTION PROJECT" },
    { id: "lorence-project", name: "LORENCE PROJECT" },
  ];

  const [activeTag, setActiveTag] = useState("all-works");
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef(null);
  const projectRefs = useRef([]);

  const filterProjectsByTag = (tag) => {
    if (tag === "all-works") {
      return projectsList;
    }
    return projectsList.filter((project) => project.tags.includes(tag));
  };

  const filteredProjects = filterProjectsByTag(activeTag);

  // Animación inicial cuando el componente se monta
  useEffect(() => {
    gsap.fromTo(
      projectRefs.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, []);

  // Animación cuando cambia el filtro
  useEffect(() => {
    if (projectRefs.current.length > 0) {
      gsap.fromTo(
        projectRefs.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }
  }, [filteredProjects]);

  const handleTagChange = (tagId) => {
    if (tagId === activeTag || isAnimating) return;

    setIsAnimating(true);

    // Animación de salida
    gsap.to(projectRefs.current, {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setActiveTag(tagId);
        setIsAnimating(false);
      },
    });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Navigation Tags */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {availableTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagChange(tag.id)}
              disabled={isAnimating}
              className={`relative px-8 py-4 font-semibold text-sm uppercase tracking-wide transition-all duration-300 rounded-full ${
                activeTag === tag.id
                  ? "text-white bg-background shadow-lg shadow-background/30 transform scale-105"
                  : "text-gray-700 bg-white hover:text-background hover:bg-orange-50 shadow-md hover:shadow-lg hover:transform hover:scale-105"
              } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {tag.name}
              {activeTag === tag.id && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 -z-10"></div>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="group relative overflow-hidden rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300"
            >
              <a href={project.href} title={project.title} className="block">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    title={project.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {project.title}
                      </h3>
                      <p className="text-orange-300 text-sm font-medium">
                        {project.text}
                      </p>
                      <div className="mt-4 flex items-center text-orange-400">
                        <span className="text-sm font-semibold">
                          View Project
                        </span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {isAnimating && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-background rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">
                  Loading projects...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPortfolio;

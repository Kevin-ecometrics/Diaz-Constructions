import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProjectsPortfolio = () => {
  const projectsList = [
    {
      id: 1,
      image: "/diaz-project1.webp",
      title: "Modern Bathroom",
      text: "Bathroom Design",
      tags: ["all-works", "bathroom"],
      href: "/project-details/modern-bathroom/",
    },
    {
      id: 2,
      image: "/diaz-project2.webp",
      title: "Renovated Bathroom",
      text: "Bathroom Renovation",
      tags: ["all-works", "bathroom"],
      href: "/project-details/renovation-bathroom/",
    },
    {
      id: 3,
      image: "/diaz-project3.webp",
      title: "Luxury Kitchen",
      text: "Kitchen Renovation",
      tags: ["all-works", "kitchen"],
      href: "/project-details/luxury-kitchen/",
    },
    {
      id: 4,
      image: "/diaz-project4.webp",
      title: "Custom Closet",
      text: "Closet Custom Build",
      tags: ["all-works", "closet"],
      href: "/project-details/custom-closet/",
    },
    {
      id: 5,
      image: "/diaz-project5.webp",
      title: "Laundry Room",
      text: "Utility Space",
      tags: ["all-works", "laundry-room"],
      href: "/project-details/laundry-room/",
    },
    {
      id: 6,
      image: "/diaz-project6.webp",
      title: "Bathroom Suite",
      text: "Outdoor Patio",
      tags: ["all-works", "bathroom"],
      href: "/project-details/bathroom-suite/",
    },
    {
      id: 7,
      image: "/diaz-project7.webp",
      title: "Bathroom Small",
      text: "Small Bathroom",
      tags: ["all-works", "bathroom"],
      href: "/project-details/bathroom-small/",
    },
    {
      id: 8,
      image: "/diaz-project8.webp",
      title: "Master Bedroom",
      text: "Bedroom Renovation",
      tags: ["all-works", "bedroom"],
      href: "/project-details/master-bedroom/",
    },
    {
      id: 9,
      image: "/diaz-project9.webp",
      title: "Bathroom Luxury",
      text: "Suite Design",
      tags: ["all-works", "bathroom"],
      href: "/project-details/bathroom-luxury/",
    },
    {
      id: 10,
      image: "/diaz-project10.webp",
      title: "Expansive Home",
      text: "Home Renovation",
      tags: ["all-works", "Expansive Home"],
      href: "/project-details/expansive-home/",
    },
    {
      id: 11,
      image: "/diaz-project11.webp",
      title: "Expansive Room",
      text: "Living Room",
      tags: ["all-works", "Expansive Home"],
      href: "/project-details/room-expansion/",
    },
    {
      id: 12,
      image: "/diaz-project12.webp",
      title: "Custom Bedroom",
      text: "Bedroom Design",
      tags: ["all-works", "Expansive Home"],
      href: "/project-details/bedroom-interior/",
    },
  ];

  const availableTags = [
    { id: "all-works", name: "ALL WORKS" },
    { id: "bathroom", name: "BATHROOM" },
    { id: "kitchen", name: "KITCHEN" },
    { id: "closet", name: "CLOSET" },
    { id: "laundry-room", name: "LAUNDRY ROOM" },
    { id: "Expansive Home", name: "EXPANSIVE HOME" },
  ];

  const [activeTag, setActiveTag] = useState("all-works");
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef(null);
  const projectRefs = useRef([]);

  const filterProjectsByTag = (tag) => {
    if (tag === "all-works") return projectsList;
    return projectsList.filter((project) => project.tags.includes(tag));
  };

  const filteredProjects = filterProjectsByTag(activeTag);

  // Animación inicial
  useEffect(() => {
    gsap.fromTo(
      projectRefs.current,
      { opacity: 0, y: 50, scale: 0.8 },
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

  // Animación al cambiar filtro
  useEffect(() => {
    if (projectRefs.current.length > 0) {
      gsap.fromTo(
        projectRefs.current,
        { opacity: 0, y: 30, scale: 0.9 },
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
              aria-label="Filter Projects"
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

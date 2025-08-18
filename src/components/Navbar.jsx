import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FiPhone, FiMail, FiMenu, FiX } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Navbar = ({ url }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const logoRef = useRef(null);
  const socialIconsRef = useRef([]);
  const navLinksRef = useRef([]);
  const activeLink = new URL(url).pathname;

  const [isFixed, setIsFixed] = useState(false);

  const links = [
    { id: 1, label: "Home", href: "/" },
    // { id: 2, label: "About", href: "/about/" },
    // { id: 3, label: "Services", href: "/services/" },
    // { id: 4, label: "Projects", href: "/projects/" },
    // { id: 5, label: "Team", href: "/team/" },
    // { id: 6, label: "Company History", href: "/company-history/" },
    // { id: 7, label: "Blogs", href: "/blogs/" },
    // { id: 8, label: "Contact", href: "/contact/" },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/DiazConstructionCo",
      label: "Facebook",
    },
    { icon: FaXTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  // Animaciones de entrada al cargar
  useEffect(() => {
    const tl = gsap.timeline();

    // Animación del logo
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }
    );

    // Animación de los enlaces de navegación
    tl.fromTo(
      navLinksRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

    // Animación de los iconos sociales
    tl.fromTo(
      socialIconsRef.current,
      { opacity: 0, scale: 0, rotation: 180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );
  }, []);

  // Animación del menú móvil
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "100vh", opacity: 1, duration: 0.8, ease: "power2.out" }
        );

        // Animar elementos internos del menú
        gsap.fromTo(
          mobileMenuRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Función para animación hover de botones
  const handleButtonHover = (e, isEntering) => {
    if (isEntering) {
      gsap.to(e.currentTarget, {
        scale: 1.05,
        y: -2,
        boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(e.currentTarget, {
        scale: 1,
        y: 0,
        boxShadow: "0 0px 0px rgba(249, 115, 22, 0)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Función para animación hover de iconos sociales
  const handleSocialHover = (e, isEntering) => {
    if (isEntering) {
      gsap.to(e.currentTarget, {
        scale: 1.2,
        backgroundColor: "#f97316",
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(e.currentTarget, {
        scale: 1,
        backgroundColor: "#374151",
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        ${isFixed ? "fixed top-0 left-0" : "sticky md:top-10"}
        z-50 w-full bg-black px-0 sm:px-6 lg:px-8 transition-all duration-300 md:bg-transparent 
      `}
    >
      <div
        className={`max-w-8xl mx-auto lg:rounded-xl px-4 sm:px-6 lg:px-8 
    bg-black bg-[url(/background-navbar.png)] bg-no-repeat bg-bottom`}
      >
        {/* Desktop Navigation */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-6 lg:py-6">
          {/* Logo */}
          <a
            title="Go to Page"
            href="/"
            className="flex justify-center items-center row-span-2"
          >
            <div className="flex flex-col mb-2">
              <img
                ref={logoRef}
                src="/logo.webp"
                alt="Diaz Construction"
                title="Diaz Construction"
                className="cursor-pointer"
              />
              <span className="logo text-3xl tracking-widest">
                Construction
              </span>
            </div>
          </a>

          {/* Contact Info */}
          <div className="col-span-3 flex items-center text-sm text-gray-300">
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+16504549122"
                className="flex cursor-pointer items-center gap-2 hover:text-background transition-colors duration-300"
              >
                <FiPhone className="text-background" />
                +1 650 454 9122
              </a>

              <a
                href="mailto:service@diazconstructions.com"
                className="flex cursor-pointer items-center gap-2 hover:text-background transition-colors duration-300"
              >
                <FiMail className="text-background" />
                service@diazconstructions.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-end gap-3">
            <span className="text-xs text-gray-400">Follow Us:</span>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    ref={(el) => (socialIconsRef.current[index] = el)}
                    title="Go to Page"
                    href={social.href}
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer"
                    aria-label={social.label}
                    onMouseEnter={(e) => handleSocialHover(e, true)}
                    onMouseLeave={(e) => handleSocialHover(e, false)}
                  >
                    <IconComponent className="text-xs" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-3 flex gap-6 items-center mb-4">
            {links.map((link, index) => (
              <a
                key={link.id}
                ref={(el) => (navLinksRef.current[index] = el)}
                title="Go to Page"
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 relative group ${
                  activeLink === link.href
                    ? "text-background"
                    : "text-white hover:text-background"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-background transition-all duration-500 ${
                    activeLink === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}
          </div>

          {/* Quote Button */}
          <div className="flex items-center justify-end gap-3 mb-4">
            {/* <FiSearch className="text-gray-400 hover:text-background cursor-pointer transition-colors duration-300 w-5 h-5 hover:scale-110" /> */}
            <a
              title="Go to Page"
              href="/contact"
              className="bg-background hover:bg-orange-600 py-2 px-6 text-sm font-semibold transition-colors duration-300 rounded cursor-pointer"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              Get a Quote
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Logo */}
            <div className="flex items-center">
              <div className="mb-4">
                <img
                  ref={logoRef}
                  src="/logo.webp"
                  alt="Diaz Construction"
                  title="Diaz Construction"
                  className="cursor-pointer"
                />
                <span className="logo text-3xl tracking-widest">
                  Construction
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white hover:text-background focus:outline-none focus:text-background transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              ) : (
                <FiMenu className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className="border-t border-gray-800 overflow-hidden"
            style={{ height: 0 }}
          >
            <div className="py-4 space-y-4">
              {/* Mobile Contact Info */}
              <div className="border-b border-gray-800 pb-4">
                <div className="text-xs text-gray-400 mb-2">Contact Info:</div>
                <div className="space-y-2 text-sm text-gray-300">
                  <a
                    href="tel:+16504549122"
                    className="flex cursor-pointer items-center gap-2 hover:text-background transition-colors duration-300"
                  >
                    <FiPhone className="text-background" />
                    +1 650 454 9122
                  </a>

                  <a
                    href="mailto:service@diazconstructions.com"
                    className="flex cursor-pointer items-center gap-2 hover:text-background transition-colors duration-300"
                  >
                    <FiMail className="text-background" />
                    service@diazconstructions.com
                  </a>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {links.map((link) => (
                  <a
                    key={link.id}
                    title="Go to Page"
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block py-2 text-sm font-medium hover:text-background transition-colors duration-300 hover:translate-x-2 transform"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile Social & Button */}
              <div className="border-t border-gray-800 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Follow Us:</span>
                  <div className="flex gap-2">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={index}
                          title="Go to Page"
                          href={social.href}
                          className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center hover:bg-background transition-all duration-300 hover:scale-110 cursor-pointer"
                          aria-label={social.label}
                        >
                          <IconComponent className="text-xs" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                <button
                  aria-label="Get a Quote"
                  onClick={closeMobileMenu}
                  className="w-full bg-background hover:bg-orange-600 py-3 text-sm font-semibold transition-all duration-300 rounded hover:shadow-lg transform hover:scale-105"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

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
    { id: 2, label: "About", href: "/about/" },
    { id: 3, label: "Services", href: "/services/" },
    { id: 4, label: "Projects", href: "/projects/" },
    { id: 5, label: "Team", href: "/team/" },
    { id: 6, label: "Company History", href: "/company-history/" },
    { id: 7, label: "Blogs", href: "/blogs/" },
    { id: 8, label: "Contact", href: "/contact/" },
  ];

  const Yelp = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="56 0 24 40"
        fill="none"
      >
        <path
          d="M64.722 22.065l1.296-.3a1.49 1.49 0 00.127-.034 1.43 1.43 0 001.022-1.703l-.006-.023a1.428 1.428 0 00-.22-.482 1.804 1.804 0 00-.529-.453 4.885 4.885 0 00-.752-.348l-1.42-.518c-.797-.296-1.595-.585-2.4-.867-.521-.185-.963-.348-1.348-.466-.072-.023-.152-.045-.217-.067-.465-.143-.79-.202-1.067-.203a1.27 1.27 0 00-.538.098 1.37 1.37 0 00-.468.332 2.84 2.84 0 00-.183.232 2.736 2.736 0 00-.273.543 7.371 7.371 0 00-.388 2.42c.006.744.026 1.698.435 2.345.098.166.23.31.388.421.291.201.585.228.892.25.457.032.9-.08 1.342-.182l4.304-.996.003.001zm14.451-6.882a7.36 7.36 0 00-1.407-2.005 2.18 2.18 0 00-.24-.205 2.817 2.817 0 00-.243-.164 2.765 2.765 0 00-.267-.127 1.37 1.37 0 00-.565-.094 1.283 1.283 0 00-.527.149c-.247.123-.514.32-.87.65-.049.05-.11.105-.166.156-.293.276-.62.617-1.008 1.013-.6.606-1.19 1.216-1.777 1.832l-1.05 1.09c-.192.2-.367.414-.523.643-.133.193-.227.41-.277.64a1.41 1.41 0 00.012.53l.006.023a1.428 1.428 0 001.663 1.081c.057-.008.102-.018.13-.024l5.6-1.296c.442-.102.89-.196 1.286-.426.266-.155.519-.308.692-.616a1.38 1.38 0 00.165-.55c.086-.763-.313-1.63-.634-2.3zm-10.024 2.358c.406-.51.404-1.27.44-1.892.122-2.076.25-4.152.351-6.23.04-.786.124-1.562.076-2.355-.038-.654-.043-1.405-.456-1.942-.73-.946-2.284-.868-3.344-.72-.325.045-.65.105-.973.183-.323.078-.642.162-.955.263-1.017.333-2.448.945-2.69 2.118-.136.663.188 1.34.439 1.946.304.733.72 1.393 1.1 2.083 1.001 1.823 2.022 3.633 3.04 5.446.304.54.635 1.226 1.223 1.506.039.017.078.032.119.045.263.1.55.12.825.055l.05-.011c.253-.07.482-.207.662-.399.033-.03.064-.062.093-.096zm-.484 5.559a1.295 1.295 0 00-1.443-.486c-.062.02-.121.045-.18.074a1.775 1.775 0 00-.254.16c-.233.172-.43.397-.608.622-.046.058-.087.134-.141.184l-.9 1.24c-.511.694-1.015 1.39-1.514 2.097-.326.457-.607.842-.83 1.183-.042.065-.086.137-.126.194-.267.413-.418.714-.495.982a1.283 1.283 0 00-.054.554c.025.194.09.38.192.547.054.084.112.165.174.243a2.748 2.748 0 00.453.416c.622.433 1.303.744 2.02.984a7.14 7.14 0 001.842.351c.106.005.213.003.32-.007a2.82 2.82 0 00.293-.041 2.8 2.8 0 00.287-.084 1.301 1.301 0 00.787-.779c.104-.26.172-.59.217-1.078.004-.07.014-.154.021-.23.035-.406.052-.883.078-1.444.043-.862.078-1.72.105-2.582l.057-1.53c.013-.354.002-.744-.096-1.095a1.633 1.633 0 00-.206-.475zm10.17 2.393c-.188-.206-.454-.412-.875-.666-.06-.034-.132-.079-.197-.118-.35-.21-.772-.432-1.264-.7a150.76 150.76 0 00-2.278-1.22l-1.35-.716c-.07-.02-.141-.07-.207-.102a3.356 3.356 0 00-.82-.293 1.735 1.735 0 00-.298-.03 1.125 1.125 0 00-.193.011 1.297 1.297 0 00-1.082 1.07c-.02.172-.014.346.019.515.066.36.227.715.393 1.026l.721 1.351c.401.762.808 1.52 1.224 2.275.269.492.492.914.701 1.263.04.066.085.137.12.197.254.42.459.685.666.874.135.13.296.229.473.29.185.061.382.083.576.064a2.79 2.79 0 00.294-.052c.096-.025.19-.056.283-.091.1-.038.197-.083.29-.135a7.153 7.153 0 001.502-1.125c.539-.53 1.015-1.109 1.385-1.77a2.19 2.19 0 00.134-.292 2.8 2.8 0 00.09-.282c.022-.098.039-.196.05-.295a1.394 1.394 0 00-.066-.576 1.28 1.28 0 00-.29-.473z"
          fill="#fff"
        ></path>
      </svg>
    );
  };

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/DiazConstructionCo",
      label: "Facebook",
    },
    { icon: FaXTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    {
      icon: Yelp,
      href: "https://www.yelp.com/biz/diaz-construction-menlo-park-2",
      label: "Yelp",
    },
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
                    target="_blank"
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
                          target="_blank"
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

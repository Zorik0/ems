import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  BriefcaseBusiness as BriefcaseIcon,
  UserPlus,
  Building2,
  Search as SearchIcon,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

// --- HELPER COMPONENTS ---

// Enhanced SEO Component with JSON-LD Structured Data
const SEO = ({ title, description, keywords, jsonData }) => {
  useEffect(() => {
    document.title = title;

    // Standard meta tags
    const setMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    setMeta("description", description);
    setMeta("keywords", keywords);

    // JSON-LD structured data
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(jsonData);
  }, [title, description, keywords, jsonData]);

  return null;
};

// --- UI COMPONENTS ---

const Header = ({ setPage, activePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Vacancies", page: "vacancies", type: "anchor" },
    { name: "About Us", page: "about" },
    { name: "Mission & Vision", page: "mission" },
    { name: "Candidates", page: "candidates" },
    { name: "Employers", page: "employers" },
    { name: "Contact Us", page: "contact" },
  ];

  const handleLinkClick =
    (link, closeMenu = false) =>
    (e) => {
      e.preventDefault();
      if (link.type === "anchor" && link.page === "vacancies") {
        setPage("home");
        if (closeMenu) setIsMenuOpen(false);
        setTimeout(() => {
          const el = document.getElementById("vacancies");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", "#vacancies");
        }, 50);
        return;
      }
      setPage(link.page);
      if (closeMenu) setIsMenuOpen(false);
    };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage("home");
              }}
              className="flex items-center space-x-3 group"
            >
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="h-14 w-auto"
                src="https://emsconsulting.in/assets/images/HLogo.png"
                alt="Engineering Manpower Solution Logo"
              />
              <span className="text-xl font-bold text-gray-800 hidden md:block group-hover:text-blue-600 transition-colors">
                Engineering Manpower Solution
              </span>
            </a>
          </div>
          <div className="hidden md:block">
            <nav className="flex items-center">
              {navLinks.map((link) => (
                <a
                  key={link.page}
                  href={`#${link.page}`}
                  onClick={handleLinkClick(link)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out mx-1 ${
                    link.page === "candidates" || link.page === "employers"
                      ? activePage === link.page
                        ? "bg-blue-600 text-white shadow"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : activePage === link.page
                      ? "bg-gray-100 text-blue-600 font-semibold"
                      : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {link.page === "candidates" && (
                      <UserPlus className="h-4 w-4" />
                    )}
                    {link.page === "employers" && (
                      <Building2 className="h-4 w-4" />
                    )}
                    {link.name}
                  </span>
                </a>
              ))}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#enquiry"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("enquiry");
                }}
                className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${
                  activePage === "enquiry"
                    ? "bg-blue-700 ring-2 ring-offset-2 ring-blue-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Enquiry
              </motion.a>
            </nav>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.page}
                  href={`#${link.page}`}
                  onClick={handleLinkClick(link, true)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    activePage === link.page
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <a
                href="#enquiry"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("enquiry");
                  setIsMenuOpen(false);
                }}
                className={`block text-center w-full px-4 py-3 rounded-md text-base font-medium text-white ${
                  activePage === "enquiry"
                    ? "bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Enquiry
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = ({ setPage }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Engineering Manpower Solution
            </h3>
            <p className="text-gray-400 text-sm">
              Your one-stop solution for engineering workforce needs. We connect
              top talent with leading companies in the construction and
              infrastructure sectors.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  onClick={() => setPage("home")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#vacancies"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("home");
                    setTimeout(
                      () =>
                        document
                          .getElementById("vacancies")
                          ?.scrollIntoView({ behavior: "smooth" }),
                      50
                    );
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Live Vacancies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setPage("about")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setPage("mission")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mission & Vision
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setPage("candidates")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Candidate Desk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setPage("employers")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Employer Desk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setPage("contact")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setPage("enquiry")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Enquiry
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPinIcon />
                <span className="ml-3">
                  18/484 | GF | DDA Flats Madangir | New Delhi- 110062
                </span>
              </li>
              <li className="flex items-center">
                <MailIcon />
                <a
                  href="mailto:info@emsconsulting.in"
                  className="ml-3 hover:text-white transition-colors"
                >
                  info@emsconsulting.in
                </a>
              </li>
              <li className="flex items-center">
                <PhoneIcon />
                <span className="ml-3">+919717274117, +919310452338</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>
            Copyright © {new Date().getFullYear()} Engineering Manpower
            Solution. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FloatingButton = ({ setPage }) => {
  return (
    <motion.button
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setPage("contact")}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-40"
      aria-label="Contact Us"
    >
      <PhoneIcon />
    </motion.button>
  );
};

// --- PAGE COMPONENTS ---

const HomePage = ({ setPage }) => {
  const services = [
    {
      name: "Infrastructure",
      img: "https://emsconsulting.in/assets/images/infrastructure.png",
    },
    {
      name: "Labour Mobilization",
      img: "https://emsconsulting.in/assets/images/labour.png",
    },
    {
      name: "Project Management",
      img: "https://emsconsulting.in/assets/images/pmc.png",
    },
    {
      name: "Mining & Metals",
      img: "https://emsconsulting.in/assets/images/mining.png",
    },
    {
      name: "Construction",
      img: "https://emsconsulting.in/assets/images/construction.png",
    },
    {
      name: "Architecture & Design",
      img: "https://emsconsulting.in/assets/images/design.png",
    },
  ];

  const clients = [
    {
      name: "Simplex",
      img: "https://emsconsulting.in/assets/images/simplexLogo.png",
    },
    { name: "HMC", img: "https://emsconsulting.in/assets/images/hmcLogo.png" },
    {
      name: "Metro Buildtech",
      img: "https://emsconsulting.in/assets/images/metrobuildtech.png",
    },
    {
      name: "Hospitech",
      img: "https://emsconsulting.in/assets/images/hospitechLogo.png",
    },
    { name: "NCC", img: "https://emsconsulting.in/assets/images/Ncclogo.png" },
    {
      name: "Meinhardt",
      img: "https://emsconsulting.in/assets/images/meinhardtLogo.png",
    },
    { name: "RRW", img: "https://emsconsulting.in/assets/images/rrwLogo.png" },
  ];

  const heroImages = [
    "https://emsconsulting.in/assets/images/OMJ.png",
    "https://emsconsulting.in/assets/images/1468818409_slider-2.jpg",
    "https://emsconsulting.in/assets/images/man_power-1500x630.jpg",
  ];

  const [currentHero, setCurrentHero] = useState(0);
  const [vacancies, setVacancies] = useState([]);
  const [vacancyError, setVacancyError] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("all");
  const [vacancySearch, setVacancySearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    let isMounted = true;
    fetch(process.env.PUBLIC_URL + "/vacancies.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length) {
          setVacancies(data);
        } else {
          setVacancies([]);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setVacancyError("Unable to load vacancies right now.");
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Engineering Manpower Solution",
    url: "https://emsconsulting.in/",
    logo: "https://emsconsulting.in/assets/images/HLogo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9717274117",
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "18/484 | GF | DDA Flats Madangir",
      addressLocality: "New Delhi",
      postalCode: "110062",
      addressCountry: "IN",
    },
    sameAs: [],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <SEO
        title="Engineering Manpower Solution | One-Stop Workforce Solution"
        description="Leading HR firm in New Delhi for engineering, construction, and infrastructure sectors. Specializing in placement, outsourcing, executive search, and labour mobilization."
        keywords="Job Placement Consultants, Top Consultant In Delhi, Recruitment Agency In Delhi, Manpower Solutions, Construction Hiring, Skilled Labour, Executive Search, Engineering Jobs"
        jsonData={organizationSchema}
      />
      <main>
        <section className="relative h-[55vh] md:h-[70vh] bg-gray-800 text-white overflow-hidden">
          <AnimatePresence>
            {heroImages.map(
              (src, index) =>
                index === currentHero && (
                  <motion.img
                    key={src}
                    src={src}
                    alt={`Hero image ${index + 1}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="relative h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center px-4"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
                Your One-Stop Engineering Workforce Solution
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
                Connecting Top-Tier Talent with Industry-Leading Opportunities
              </p>
            </motion.div>
          </div>
        </section>

        <section
          id="vacancies"
          className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
              <div>
                <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                  Open Roles
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                  Live Vacancies
                </h2>
                <p className="text-gray-500 mt-1">
                  Curated opportunities across Engineering, Construction and
                  Infra
                </p>
                <div className="mt-4 relative">
                  <SearchIcon className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search roles, companies, locations..."
                    value={vacancySearch}
                    onChange={(e) => setVacancySearch(e.target.value)}
                    className="w-full sm:w-96 rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="rounded-2xl border border-indigo-200 bg-white/80 backdrop-blur p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Are you an Employer?
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Share your requirements and we’ll help you hire faster.
                      </p>
                    </div>
                    <button
                      onClick={() => setPage("employers")}
                      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700"
                      type="button"
                    >
                      Go to Employer Desk <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {vacancyError && (
              <div className="mb-6 p-4 rounded-md bg-yellow-50 text-yellow-800">
                {vacancyError}
              </div>
            )}
            {!vacancies.length && !vacancyError ? (
              <div className="text-gray-600">
                No vacancies available at the moment. Please check back later.
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {(() => {
                  const normalizedQuery = vacancySearch.trim().toLowerCase();
                  const filtered = vacancies.filter((v) => {
                    if (!normalizedQuery) return true;
                    const blob = `${v.title} ${v.company} ${v.location} ${
                      v.description
                    } ${(v.tags || []).join(" ")}`.toLowerCase();
                    return blob.includes(normalizedQuery);
                  });
                  return filtered.slice(0, 6).map((v) => {
                    const isNew = (() => {
                      try {
                        const days =
                          (Date.now() - new Date(v.postedAt).getTime()) /
                          (1000 * 60 * 60 * 24);
                        return days <= 14;
                      } catch {
                        return false;
                      }
                    })();
                    return (
                      <motion.div
                        key={v.id}
                        variants={itemVariants}
                        className="group rounded-2xl p-[1px] bg-gradient-to-br from-blue-200 to-indigo-200 shadow-lg hover:shadow-2xl transition-shadow"
                      >
                        <div className="h-full bg-white rounded-2xl p-6 flex flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {v.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {v.company} • {v.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {isNew && (
                                <span className="text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 mt-4 overflow-hidden">
                            {v.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {(v.tags || []).map((t) => (
                              <span
                                key={t}
                                className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4" /> {v.postedAt}
                            </span>
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={v.applyUrl}
                              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-1.5 hover:bg-blue-700"
                            >
                              Apply <ArrowRight className="h-4 w-4" />
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </motion.div>
            )}
          </div>
        </section>

        <section className="py-20 bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
            className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to EMS Consulting
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              We are a group of HR Professionals & Engineers with 18 years of
              extensive hiring expertise in Construction, Infrastructure,
              Manufacturing, and IT. We specialize in placing "PROJECTS TEAM"
              and providing "Bulk Labour Mobilization" for projects of any
              scale, both domestically and in the GCC region.
            </p>
          </motion.div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Industries We Serve
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service) => (
                <motion.div
                  key={service.name}
                  variants={itemVariants}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl"
                >
                  <div className="relative">
                    <img
                      src={service.img}
                      alt={service.name}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-0 left-0 p-6 text-2xl font-bold text-white">
                      {service.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Our Esteemed Clientele
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
            >
              {clients.map((client) => (
                <motion.div
                  key={client.name}
                  variants={itemVariants}
                  className="p-2"
                  title={client.name}
                >
                  <img
                    src={client.img}
                    alt={client.name}
                    className="h-16 md:h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Floating hero CTA replaces lower candidate/employer section */}
      </main>
    </>
  );
};

const AboutPage = () => (
  <>
    <SEO
      title="About Us | Engineering Manpower Solution"
      description="Learn about Engineering Manpower Solution, a leading specialized hiring agency for Construction & Infra sectors based in South Delhi, India since 2006."
      keywords="About EMS, HR Firm Delhi, Construction Recruitment, Infra Hiring, Manpower Services India, Engineering Staffing"
    />
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 h-64 flex items-center justify-center">
        <img
          src="https://emsconsulting.in/assets/images/man_power-1500x630.jpg"
          alt="Engineering professionals discussing a project"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute text-center px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-300"
          >
            Your Trusted Partner in Specialized Hiring Since 2006
          </motion.p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              <b>Engineering Manpower Solution (EMS)</b> is a premier,
              specialized hiring agency for the Construction and Infrastructure
              sectors. Based in the heart of South Delhi, India, we are a
              dedicated group of seasoned HR Professionals and retired Engineers
              bringing over <b>18 years of extensive hiring expertise</b> to the
              table.
            </p>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              We believe in building long-term partnerships. Our solutions are
              meticulously customized to address the unique challenges and
              requirements of each client, ensuring the best possible outcomes
              and driving project success.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src="https://emsconsulting.in/assets/images/1468818409_slider-2.jpg"
              alt="Construction site"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Core Sectors Section */}
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Core Sectors of Expertise
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              We provide reliable and tailored human resource services across a
              wide spectrum of industries.
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              "Civil Construction (High Rise, Commercial, Residential, Industrial)",
              "Project Management Consultancy (PMC)",
              "Architecture & Structural Design",
              "Construction Equipment & Machinery",
              "Infrastructure (Roads, Highways, Mining, Power, Metro)",
              "Interior Design & Structural Works",
            ].map((sector) => (
              <motion.div
                key={sector}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                    <BriefcaseIcon />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {sector}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </>
);

const MissionPage = () => (
  <>
    <SEO
      title="Mission & Vision | Engineering Manpower Solution"
      description="Our mission is to deliver exceptional manpower solutions. Our vision is to be the most trusted partner in engineering recruitment."
      keywords="EMS Mission, EMS Vision, Manpower Solutions Motto, HR Commitments, Engineering Recruitment Vision"
    />
    <div className="bg-slate-50">
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
          Mission & Vision
        </h1>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our motto is – "Successful completion of Projects on Time". Our
              mission is to deliver exceptional manpower solutions that drive
              business success and enhance career growth for job seekers. We are
              committed to excellence, integrity, and innovation in every aspect
              of our service.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To continuously meet new challenges in hiring by introducing
              efficient processes. We aim to provide competent technical teams
              with required skill sets, building on our proven track record of
              successful placements to be the most reliable and excellent
              manpower consultancy.
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2 bg-blue-600 text-white p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">
              Our Commitments & Expertise
            </h2>
            <p className="mb-6 leading-relaxed">
              We are committed to building outstanding teams for our clients to
              complete projects within the given time and with minimum manpower
              cost. We provide the best solutions in human resources hierarchy.
              "We are for your prosperity & organizational development".
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="bg-white text-blue-600 rounded-full h-6 w-6 text-center font-bold mr-3">
                  ✔
                </span>{" "}
                18 Years of specialized hiring expertise in Engineering Sectors.
              </li>
              <li className="flex items-center">
                <span className="bg-white text-blue-600 rounded-full h-6 w-6 text-center font-bold mr-3">
                  ✔
                </span>{" "}
                Strong pool of talent from top-to-lower management levels.
              </li>
              <li className="flex items-center">
                <span className="bg-white text-blue-600 rounded-full h-6 w-6 text-center font-bold mr-3">
                  ✔
                </span>{" "}
                Rigorous technical competency evaluation before client
                submission.
              </li>
              <li className="flex items-center">
                <span className="bg-white text-blue-600 rounded-full h-6 w-6 text-center font-bold mr-3">
                  ✔
                </span>{" "}
                Expertise in closing critical openings within tight time frames.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  </>
);

const ContactPage = () => (
  <>
    <SEO
      title="Contact Us | Engineering Manpower Solution"
      description="Get in touch with Engineering Manpower Solution. Find our address, email, and phone numbers. We are located in New Delhi, India."
      keywords="Contact EMS, EMS Address, EMS Phone, EMS Email, Manpower Consultants Delhi"
    />
    <div className="bg-white">
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
          Get In Touch
        </h1>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 p-8 rounded-xl shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Contact Details
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start">
                <MapPinIcon className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <strong className="block">Address:</strong>
                  <span>
                    18/484 | GF | DDA Flats Madangir | New Delhi- 110062, India
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <MailIcon className="text-blue-500 mr-4 flex-shrink-0" />
                <div>
                  <strong className="block">Email:</strong>
                  <a
                    href="mailto:info@emsconsulting.in"
                    className="text-blue-500 hover:underline"
                  >
                    info@emsconsulting.in
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="text-blue-500 mr-4 flex-shrink-0" />
                <div>
                  <strong className="block">Phone:</strong>
                  <span>+919717274117, +919310452338</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-slate-50 p-8 rounded-xl shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.315582239451!2d77.215732!3d28.501176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1a44aaaaaab%3A0x4d5681b325780526!2sMadangir!5e0!3m2!1sen!2sin!4v1662546145821!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  </>
);

const CandidateContactPage = ({ setPage }) => (
  <>
    <SEO
      title="Candidate Desk | Engineering Manpower Solution"
      description="Submit your resume and preferences to our Candidate Desk for engineering opportunities."
      keywords="Submit Resume, Engineering Jobs, Candidate Desk, Apply EMS"
    />
    <div className="bg-slate-50">
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
          Candidate Desk
        </h1>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <p className="text-gray-700">
            Email your CV to{" "}
            <a
              className="text-blue-600 hover:underline"
              href="mailto:info@emsconsulting.in?subject=Candidate%20Submission"
            >
              info@emsconsulting.in
            </a>{" "}
            or fill the enquiry form and select Candidate.
          </p>
          <div className="mt-8">
            <a
              href="#enquiry"
              onClick={(e) => {
                e.preventDefault();
                setPage("enquiry");
              }}
              className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Open Enquiry Form
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

const EmployerContactPage = ({ setPage }) => (
  <>
    <SEO
      title="Employer Desk | Engineering Manpower Solution"
      description="Share your hiring requirements with our Employer Desk for rapid closures."
      keywords="Hire Engineers, Employer Desk, Post Vacancy, EMS Hiring"
    />
    <div className="bg-slate-50">
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
          Employer Desk
        </h1>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <p className="text-gray-700">
            Share your job description and timeline at{" "}
            <a
              className="text-blue-600 hover:underline"
              href="mailto:info@emsconsulting.in?subject=Employer%20Requirement"
            >
              info@emsconsulting.in
            </a>{" "}
            or use the enquiry form and select Employer.
          </p>
          <div className="mt-8">
            <a
              href="#enquiry"
              onClick={(e) => {
                e.preventDefault();
                setPage("enquiry");
              }}
              className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Open Enquiry Form
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

const EnquiryPage = () => {
  const [formData, setFormData] = useState({
    contactPerson: "",
    companyName: "",
    address: "",
    email: "",
    country: "",
    phone: "",
    audience: "candidate",
    details: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setStatus({
      message:
        "Thank you for your enquiry. We will get in touch with you shortly.",
      type: "success",
    });
    setFormData({
      contactPerson: "",
      companyName: "",
      address: "",
      email: "",
      country: "",
      phone: "",
      audience: "candidate",
      details: "",
    });
    setTimeout(() => setStatus({ message: "", type: "" }), 5000);
  };

  return (
    <>
      <SEO
        title="Enquiry | Engineering Manpower Solution"
        description="Submit your manpower requirements through our enquiry form. We provide tailored solutions for your business needs."
        keywords="Manpower Enquiry, Post Requirement, Hire Engineers, Construction Staffing, EMS Enquiry"
      />
      <div className="bg-slate-50 min-h-screen flex items-center py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-2">
            <div className="relative hidden md:block">
              <img
                src="https://emsconsulting.in/assets/images/OMJ.png"
                alt="Contact us"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-800 bg-opacity-80 p-12 text-white flex flex-col justify-center">
                <motion.h2
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold"
                >
                  Let's Build the Future Together
                </motion.h2>
                <motion.p
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-blue-100"
                >
                  Whether you're looking for the right talent or the right
                  opportunity, we're here to help. Fill out the form and our
                  team will be in touch.
                </motion.p>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Send an Enquiry
                </h2>
                <p className="text-gray-500 mb-8">
                  We'll get back to you promptly.
                </p>
                {status.message && (
                  <div
                    className={`mb-6 text-center p-4 rounded-md ${
                      status.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contactPerson"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="audience"
                      className="block text-sm font-medium text-gray-700"
                    >
                      I am a <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="audience"
                      name="audience"
                      value={formData.audience}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="candidate">Candidate</option>
                      <option value="employer">Employer</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone / Mobile No.{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enquiry Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="details"
                      id="details"
                      rows="4"
                      value={formData.details}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                    ></textarea>
                  </div>
                  <div className="text-right pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit Enquiry
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={setPage} />;
      case "about":
        return <AboutPage />;
      case "mission":
        return <MissionPage />;
      case "contact":
        return <ContactPage />;
      case "candidates":
        return <CandidateContactPage setPage={setPage} />;
      case "employers":
        return <EmployerContactPage setPage={setPage} />;
      case "enquiry":
        return <EnquiryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-white font-sans antialiased">
      <Header setPage={setPage} activePage={page} />
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer setPage={setPage} />
      <FloatingButton setPage={setPage} />
    </div>
  );
}

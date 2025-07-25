"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Moon, Sun, Languages, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { useLanguage } from "@/contexts/language-context";
import { useSmoothNavigation } from "@/hooks/use-smooth-navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { navigateToSection } = useSmoothNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isHovered, setIsHovered] = useState(false);

  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const navbarBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const navbarY = useTransform(scrollY, [0, 100], [0, -2]);

  // Detectar scroll con más precisión
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detectar sección activa con mejores opciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id || "hero");
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-10% 0px -50% 0px",
      }
    );

    // Function to observe sections with retry logic for lazy-loaded content
    const observeSections = () => {
      const sectionsToObserve = ["hero", "features", "demo", "waitlist"];

      sectionsToObserve.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
          console.log(`📍 Observing section: ${id}`);
        } else {
          console.log(`⏳ Section ${id} not yet available`);
        }
      });
    };

    // Initial observation
    observeSections();

    // Re-check for lazy-loaded sections periodically
    const recheckInterval = setInterval(() => {
      const unobservedSections = [
        "hero",
        "features",
        "demo",
        "waitlist",
      ].filter((id) => {
        const element = document.getElementById(id);
        return (
          element &&
          !Array.from(document.querySelectorAll('[data-observed="true"]')).find(
            (el) => el.id === id
          )
        );
      });

      if (unobservedSections.length > 0) {
        unobservedSections.forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            observer.observe(element);
            element.setAttribute("data-observed", "true");
            console.log(`📍 Late-observing section: ${id}`);
          }
        });
      }
    }, 1000);

    // Cleanup after 10 seconds (should be enough for lazy loading)
    const cleanupTimeout = setTimeout(() => {
      clearInterval(recheckInterval);
    }, 10000);

    return () => {
      observer.disconnect();
      clearInterval(recheckInterval);
      clearTimeout(cleanupTimeout);
    };
  }, []);

  const navItems = [
    { key: "nav.features", href: "#features", id: "features" },
    { key: "nav.demo", href: "#demo", id: "demo" },
    { key: "nav.waitlist", href: "#waitlist", id: "waitlist" },
  ];

  // Pre-load function to trigger lazy loading before navigation
  const preTriggerLazyLoading = (targetId: string) => {
    if (targetId === "waitlist") {
      // Force trigger the lazy loading by scrolling partially towards the section
      const currentScroll = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Scroll to 70% of the page to trigger lazy loading without fully navigating
      const preScrollPosition = Math.min(
        documentHeight * 0.7,
        documentHeight - windowHeight
      );

      // Only pre-scroll if we're not already near the bottom
      if (currentScroll < preScrollPosition) {
        window.scrollTo({
          top: preScrollPosition,
          behavior: "auto", // No smooth scroll for pre-loading
        });

        // Return to original position quickly
        setTimeout(() => {
          window.scrollTo({
            top: currentScroll,
            behavior: "auto",
          });
        }, 100);
      }
    }
  };

  const handleNavigation = (href: string) => {
    console.log("🚀 Navigation clicked:", href);

    // Close mobile menu first
    setIsMobileMenuOpen(false);

    // Remove # if present and clean the ID
    const targetId = href.replace("#", "").trim();
    console.log("🎯 Looking for element:", targetId);

    // Pre-trigger lazy loading for problematic sections
    preTriggerLazyLoading(targetId);

    // Function to scroll to element
    const scrollToElement = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const currentScroll = window.pageYOffset;
      const navbarOffset = 80;
      const targetPosition = currentScroll + rect.top - navbarOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setActiveSection(targetId);
      console.log("✅ Successfully navigated to:", targetId);
    };

    // Function to attempt navigation with retry logic
    const attemptNavigation = (retryCount = 0) => {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        console.log("✅ Element found! Scrolling...");
        scrollToElement(targetElement);
        return true;
      }

      // If element not found and we haven't exceeded max retries
      if (retryCount < 5) {
        console.log(
          `⏳ Attempt ${retryCount + 1}: Waiting for component to load...`
        );
        setTimeout(
          () => {
            attemptNavigation(retryCount + 1);
          },
          retryCount === 0 ? 200 : 400 * retryCount
        ); // Progressive delay
        return false;
      }

      // Final fallback: force trigger lazy loading by scrolling to approximate position
      console.log("🔄 Triggering lazy loading for:", targetId);
      const sectionIndex = navItems.findIndex((item) => item.id === targetId);
      if (sectionIndex !== -1) {
        // Estimate position based on section order
        const estimatedPosition = window.innerHeight * (sectionIndex + 1.5);
        window.scrollTo({
          top: estimatedPosition,
          behavior: "smooth",
        });

        // Try again after scroll
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            scrollToElement(element);
          } else {
            console.error("❌ Final attempt failed for:", targetId);
          }
        }, 1500);
      }

      return false;
    };

    // Start navigation attempt with a small delay to allow pre-loading
    setTimeout(
      () => {
        attemptNavigation();
      },
      targetId === "waitlist" ? 300 : 0
    );
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavigation("#hero")}
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative p-2 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                <Image
                  src={
                    theme === "dark"
                      ? "/iconos/isologo_negro.png"
                      : "/iconos/isologo_blanco.png"
                  }
                  alt="Xiorelia"
                  width={32}
                  height={32}
                  className="w-20 h-8 transition-transform group-hover:scale-110"
                />
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-white bg-blue-600 shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Controles Desktop */}
              <div className="hidden sm:flex items-center">
                <div className="flex items-center bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full p-1 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <motion.button
                    onClick={() => setLanguage(language === "es" ? "en" : "es")}
                    className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Languages className="h-4 w-4" />
                  </motion.button>

                  <motion.button
                    onClick={toggleTheme}
                    className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={{ rotate: theme === "light" ? 0 : 180 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      {theme === "light" ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={() => handleNavigation("#waitlist")}
                className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-full font-medium transition-all duration-200"
              >
                {t("hero.cta.primary")}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-8 h-8 p-0 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/20 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {t(item.key)}
                  </button>
                ))}
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200/30 dark:border-gray-700/30">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => setLanguage(language === "es" ? "en" : "es")}
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {language.toUpperCase()}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  >
                    {theme === "light" ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <Button
                  onClick={() => handleNavigation("#waitlist")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-full font-medium"
                >
                  {t("hero.cta.primary")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}

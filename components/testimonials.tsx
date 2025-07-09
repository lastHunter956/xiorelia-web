"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Play,
  Pause,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useRef, useState, useEffect, useCallback } from "react";

export default function Testimonials() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      content: t("testimonials.ana.content"),
      author: "Ana J.",
      role: t("testimonials.ana.role"),
      company: "TechVentures",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      industry: language === "en" ? "Technology" : "Tecnología",
      location: language === "en" ? "Silicon Valley, CA" : "Silicon Valley, CA",
    },
    {
      content: t("testimonials.marcus.content"),
      author: "Marcus Chen",
      role: t("testimonials.marcus.role"),
      company: "InnovateLab",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      industry: language === "en" ? "Innovation" : "Innovación",
      location: language === "en" ? "New York, NY" : "Nueva York, NY",
    },
    {
      content: t("testimonials.sarah.content"),
      author: "Sarah Williams",
      role: t("testimonials.sarah.role"),
      company: "StartupHub",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      industry: language === "en" ? "Startup Accelerator" : "Aceleradora",
      location: language === "en" ? "London, UK" : "Londres, Reino Unido",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  }, [testimonials.length]);

  const goToTestimonial = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setIsAutoPlaying(false);
    },
    [currentIndex]
  );

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/70 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/50 overflow-hidden relative"
    >
      {/* Enhanced background decorations with more visual impact */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient orbs */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/25 to-pink-400/25 dark:from-purple-600/15 dark:to-pink-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 dark:from-indigo-600/10 dark:to-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 right-20 w-4 h-4 bg-blue-400/60 dark:bg-blue-500/40 rotate-45 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-32 left-20 w-3 h-3 bg-purple-400/60 dark:bg-purple-500/40 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-400/60 dark:bg-cyan-500/40 rotate-45 animate-bounce"
          style={{ animationDelay: "2.5s" }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header with more visual impact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20 lg:mb-24"
        >
          {/* Enhanced badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 150,
            }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-blue-200/40 dark:border-blue-800/40 shadow-2xl mb-8 sm:mb-10 relative overflow-hidden"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse" />

            <div className="relative flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-lg" />
              <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300 tracking-wide uppercase">
                {language === "en" ? "Success Stories" : "Historias de Éxito"}
              </span>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg" />
            </div>
          </motion.div>

          {/* Enhanced title with text effects */}
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4 relative"
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 dark:from-white dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent">
                {t("testimonials.title")}
              </span>
              {/* Subtle underline effect */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 1 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full origin-left"
              />
            </span>
          </motion.h2>

          {/* Enhanced subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 font-medium"
          >
            {t("testimonials.subtitle")}
          </motion.p>

          {/* Enhanced stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-12 sm:mt-16"
          >
            {/* Rating display with enhanced styling */}
            <div className="flex items-center gap-4 px-6 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={
                      isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.7 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Star className="h-6 w-6 sm:h-7 sm:w-7 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                  </motion.div>
                ))}
              </div>
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                  4.9
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {language === "en" ? "RATING" : "PUNTUACIÓN"}
                </div>
              </div>
            </div>

            {/* Additional metrics */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                  500+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {language === "en" ? "Happy Clients" : "Clientes Felices"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
                  24/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {language === "en" ? "Support" : "Soporte"}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Testimonial Card with Smooth Transitions */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Premium Glass Card - Made Larger */}
          <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl lg:rounded-4xl border border-white/40 dark:border-gray-700/40 shadow-2xl overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 dark:from-blue-400/5 dark:via-cyan-400/5 dark:to-purple-400/5 rounded-3xl lg:rounded-4xl" />

            {/* Content Container - Optimized Padding */}
            <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="pt-8 sm:pt-10 lg:pt-12">
                {/* Animated Testimonial Content - Auto Height */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="w-full"
                    >
                      {/* Testimonial Text - Larger Size */}
                      <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium mb-6 sm:mb-8">
                        <span className="text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif leading-none">
                          "
                        </span>
                        <span className="italic">
                          {testimonials[currentIndex].content}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif leading-none">
                          "
                        </span>
                      </div>

                      {/* Author Info - Optimized Layout */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                        <div className="relative">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl ring-4 ring-white/50 dark:ring-gray-800/50">
                            <img
                              src={testimonials[currentIndex].avatar}
                              alt={testimonials[currentIndex].author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Online indicator */}
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-3 border-white dark:border-gray-900 shadow-xl" />
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {testimonials[currentIndex].author}
                          </h4>
                          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-2">
                            {testimonials[currentIndex].role}
                          </p>
                          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 text-xs sm:text-sm lg:text-base">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {testimonials[currentIndex].company}
                            </span>
                            <span className="hidden sm:block text-gray-400">
                              •
                            </span>
                            <span className="text-gray-500 dark:text-gray-500">
                              {testimonials[currentIndex].industry}
                            </span>
                            <span className="hidden sm:block text-gray-400">
                              •
                            </span>
                            <span className="text-gray-500 dark:text-gray-500">
                              {testimonials[currentIndex].location}
                            </span>
                          </div>

                          {/* Rating - Reduced Size */}
                          <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
                            {[...Array(testimonials[currentIndex].rating)].map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 fill-yellow-400 text-yellow-400"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-8 sm:mt-10 px-4 sm:px-0">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
              {/* Previous Button */}
              <motion.button
                onClick={prevTestimonial}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200/60 dark:border-gray-700/60 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label={
                  language === "en"
                    ? "Previous testimonial"
                    : "Testimonio anterior"
                }
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:-translate-x-0.5" />
              </motion.button>

              {/* Auto-play Control */}
              <motion.button
                onClick={toggleAutoPlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl backdrop-blur-sm border-2 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isAutoPlaying
                    ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                    : "bg-white/90 dark:bg-gray-800/90 border-gray-200/60 dark:border-gray-700/60 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                aria-label={
                  isAutoPlaying
                    ? language === "en"
                      ? "Pause auto-play"
                      : "Pausar reproducción"
                    : language === "en"
                    ? "Start auto-play"
                    : "Iniciar reproducción"
                }
              >
                {isAutoPlaying ? (
                  <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </motion.button>

              {/* Next Button */}
              <motion.button
                onClick={nextTestimonial}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200/60 dark:border-gray-700/60 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label={
                  language === "en"
                    ? "Next testimonial"
                    : "Testimonio siguiente"
                }
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>

            {/* Enhanced Dots Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/40 dark:border-gray-700/40 shadow-lg">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg"
                      : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`${
                    language === "en" ? "Go to testimonial" : "Ir al testimonio"
                  } ${index + 1}`}
                >
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Progress Indicator */}
            {isAutoPlaying && (
              <div className="w-full sm:w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16 sm:mt-20"
        >
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-base sm:text-lg font-semibold">
              {language === "en"
                ? "500+ Happy Clients"
                : "500+ Clientes Satisfechos"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-base sm:text-lg font-semibold">
              {language === "en" ? "99.9% Uptime" : "99.9% Disponibilidad"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-base sm:text-lg font-semibold">
              {language === "en" ? "24/7 Support" : "Soporte 24/7"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

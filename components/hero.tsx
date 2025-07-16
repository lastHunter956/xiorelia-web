"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Check,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const interfaceRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const isInterfaceInView = useInView(interfaceRef, {
    once: true,
    amount: 0.3,
  });
  const [currentStep, setCurrentStep] = useState(0);

  // Interface animation steps
  const steps = [
    { id: "incoming", delay: 0.5 },
    { id: "client", delay: 1.2 },
    { id: "message", delay: 2.0 },
    { id: "notification", delay: 2.8 },
  ];

  useEffect(() => {
    if (isInterfaceInView) {
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index + 1);
        }, step.delay * 1000);
      });
    }
  }, [isInterfaceInView]);

  // Sophisticated entrance animations
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: 0.5,
      },
    },
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1.1,
      },
    },
  };

  const interfaceVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.9,
      rotateY: 15,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        delay: 0.6,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50"
    >
      {/* Minimal background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-100/20 to-pink-100/20 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center py-4 sm:py-8 lg:py-12">
          {/* Left Content - Minimalist */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-left">
            {/* Main Title with sophisticated animation */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white leading-[0.9] tracking-tight"
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Xiorelia
                  <motion.span
                    className="text-blue-600 dark:text-blue-400"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    .
                  </motion.span>
                </motion.span>
              </motion.h1>

              <motion.h2
                variants={subtitleVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-800 dark:text-gray-200 leading-tight max-w-2xl"
              >
                {language === "en" ? (
                  <>
                    Your personal assistant that{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      answers calls and schedules
                    </span>{" "}
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      24/7
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Tu asistente personal que{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      responde llamadas y programa
                    </span>{" "}
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      24/7
                    </span>
                    .
                  </>
                )}
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              variants={descriptionVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl font-medium"
            >
              {language === "en"
                ? "Designed for entrepreneurs looking to take their business to the next level."
                : "Diseñada para emprendedores que buscan llevar su negocio al siguiente nivel."}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-3 font-semibold">
                  {language === "en"
                    ? "Join Waitlist"
                    : "Únete a la Lista de Espera"}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </span>

                {/* Subtle hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Minimal Interface */}
          <motion.div
            variants={interfaceVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative perspective-1000"
          >
            {/* Subtle glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-3xl blur-2xl"
            />

            {/* Minimal Interface */}
            <div
              ref={interfaceRef}
              className="relative z-10 max-w-xs sm:max-w-sm mx-auto lg:max-w-md"
            >
              {/* Main Interface Window */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInterfaceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-xl"
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Window Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInterfaceInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-between px-4 py-3 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50"
                >
                  {/* Traffic Lights */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  {/* Title */}
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {language === "en"
                      ? "Xiorelia Assistant"
                      : "Asistente Xiorelia"}
                  </div>
                  <div className="w-12"></div> {/* Spacer */}
                </motion.div>

                {/* Content */}
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {/* Incoming Call Section */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={currentStep >= 1 ? "visible" : "hidden"}
                    className="flex items-center justify-between p-2 sm:p-3 bg-blue-50/80 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 sm:w-8 h-7 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-3 sm:h-4 w-3 sm:w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                          {language === "en"
                            ? "Incoming Call"
                            : "Llamada Entrante"}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {language === "en"
                            ? "Xiorelia is handling it"
                            : "Xiorelia la está atendiendo"}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={currentStep >= 1 ? { scale: 1 } : {}}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="px-1.5 sm:px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium"
                    >
                      {language === "en" ? "Active" : "Activo"}
                    </motion.div>
                  </motion.div>

                  {/* Client Information */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={currentStep >= 2 ? "visible" : "hidden"}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl"
                  >
                    <div className="w-7 sm:w-8 h-7 sm:h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Phone className="h-3 sm:h-4 w-3 sm:w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {language === "en"
                          ? "Alexander Martin"
                          : "Alejandro Martín"}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {language === "en"
                          ? "Potential Client"
                          : "Cliente Potencial"}
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={currentStep >= 2 ? { scale: 1 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      <MoreHorizontal className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />
                    </motion.div>
                  </motion.div>

                  {/* AI Message */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={currentStep >= 3 ? "visible" : "hidden"}
                    className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-xl"
                  >
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {language === "en"
                        ? "Xiorelia is scheduling a meeting with Alexander for tomorrow at 2:00 PM"
                        : "Xiorelia está programando una reunión con Alejandro para mañana a las 14:00"}
                    </p>
                  </motion.div>

                  {/* Success Notification */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={currentStep >= 4 ? "visible" : "hidden"}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50/80 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-700/30"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={currentStep >= 4 ? { scale: 1, rotate: 0 } : {}}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-5 sm:w-6 h-5 sm:h-6 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="h-3 w-3 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-green-800 dark:text-green-300">
                        {language === "en"
                          ? "Meeting scheduled"
                          : "Reunión programada"}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        {language === "en"
                          ? "Tomorrow, 2:00 PM"
                          : "Mañana, 14:00"}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInterfaceInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0],
                        rotate: [0, 5, 0],
                      }
                    : {}
                }
                transition={{
                  opacity: { delay: 1.5, duration: 0.6 },
                  scale: { delay: 1.5, duration: 0.6 },
                  y: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-lg"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInterfaceInView
                    ? {
                        opacity: 1,
                        scale: [1, 1.1, 1],
                        x: [0, 4, 0],
                      }
                    : {}
                }
                transition={{
                  opacity: { delay: 2, duration: 0.6 },
                  scale: {
                    delay: 2,
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                  },
                  x: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator Premium */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-0 right-0 flex justify-center z-20">
        <motion.div
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center gap-2 sm:gap-3 pointer-events-none"
        >
          {/* Texto sutil */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase text-center px-4"
          >
            {language === "en"
              ? "Scroll to explore"
              : "Desplázate para explorar"}
          </motion.p>

          {/* Mouse moderno con efectos */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer group flex items-center justify-center pointer-events-auto"
          >
            {/* Mouse principal */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative w-4 sm:w-5 md:w-6 h-7 sm:h-8 md:h-10 border-2 border-gray-300/80 dark:border-gray-500/80 rounded-full flex justify-center bg-white/5 dark:bg-gray-900/20 backdrop-blur-sm group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors duration-300"
            >
              {/* Rueda del mouse */}
              <motion.div
                animate={{
                  y: [1.5, 4, 1.5],
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="w-0.5 sm:w-0.5 md:w-1 h-1.5 sm:h-2 md:h-3 bg-gradient-to-b from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-200 rounded-full mt-1 sm:mt-1.5 md:mt-2 group-hover:from-blue-400 group-hover:to-blue-600 transition-colors duration-300"
              />

              {/* Brillo interno */}
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0.5 sm:inset-1 bg-gradient-to-b from-blue-100/20 to-transparent dark:from-blue-400/10 rounded-full"
              />
            </motion.div>

            {/* Partículas flotantes optimizadas para móvil */}
            <motion.div
              animate={{
                y: [0, -12, -24],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                delay: 0.5,
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-blue-400 rounded-full"
            />
            <motion.div
              animate={{
                y: [0, -15, -30],
                opacity: [0, 0.8, 0],
                scale: [0, 0.8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                delay: 1,
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 translate-x-1 sm:translate-x-2 w-0.5 h-0.5 bg-purple-400 rounded-full"
            />
            <motion.div
              animate={{
                y: [0, -18, -36],
                opacity: [0, 0.6, 0],
                scale: [0, 0.6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                delay: 1.5,
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-x-1 sm:-translate-x-2 w-0.5 h-0.5 bg-cyan-400 rounded-full"
            />
          </motion.div>

          {/* Línea de conexión sutil */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="w-px h-3 sm:h-4 md:h-6 bg-gradient-to-b from-gray-300/50 to-transparent dark:from-gray-500/50 origin-top"
          />
        </motion.div>
      </div>
    </section>
  );
}

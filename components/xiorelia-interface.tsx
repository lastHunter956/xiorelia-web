"use client"

import { motion, useInView } from "framer-motion"
import { Phone, MessageSquare, Check, Zap } from "lucide-react"
import { useRef, useState, useEffect, memo } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useOptimizedAnimations, optimizedTransition, springTransition } from "@/utils/animation-config"
import PerformanceWrapper from "./optimized/performance-wrapper"

const XioreliaInterface = memo(function XioreliaInterface() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [currentStep, setCurrentStep] = useState(0)
  const { getAnimationConfig, variants, shouldReduceAnimations } = useOptimizedAnimations()

  const steps = [
    { id: "incoming", delay: shouldReduceAnimations ? 0.1 : 0.3 },
    { id: "client", delay: shouldReduceAnimations ? 0.2 : 0.6 },
    { id: "message", delay: shouldReduceAnimations ? 0.3 : 0.9 },
    { id: "notification", delay: shouldReduceAnimations ? 0.4 : 1.2 },
  ]

  useEffect(() => {
    if (isInView) {
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index + 1)
        }, step.delay * 1000)
      })
    }
  }, [isInView, shouldReduceAnimations])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceAnimations ? 0.05 : 0.15,
        delayChildren: shouldReduceAnimations ? 0.1 : 0.2,
      },
    },
  }

  const itemVariants = shouldReduceAnimations
    ? variants
    : {
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: springTransition,
        },
      }

  const SimpleFallback = () => (
    <div className="relative max-w-sm mx-auto">
      <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                {t("interface.incoming.title")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t("interface.incoming.subtitle")}</p>
            </div>
          </div>
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg">
            {t("interface.status.active")}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Phone className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                {t("interface.client.name")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t("interface.client.type")}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 sm:p-5 border border-gray-200/50 dark:border-gray-600/30">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-sm sm:text-base">
            {t("interface.message.content")}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-green-50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/30 rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-green-800 dark:text-green-300 text-sm sm:text-base">
              {t("interface.notification.title")}
            </h4>
            <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
              {t("interface.notification.time")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <PerformanceWrapper fallback={<SimpleFallback />}>
      <div ref={ref} className="relative max-w-sm mx-auto">
        {/* Main Interface Content with enhanced mobile styling */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden p-6 sm:p-8 space-y-6"
          style={{ willChange: "transform" }}
        >
          {/* Enhanced header with better mobile spacing */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-6 pb-6 border-b border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3968FF] to-[#6DBEED] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">Xiorelia</span>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-700 dark:text-green-400">Live</span>
              </div>
            </div>
          </motion.div>

          {/* Incoming Call Section with enhanced mobile layout */}
          <motion.div variants={itemVariants} className="group">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/30 dark:border-blue-700/30">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={shouldReduceAnimations ? {} : { scale: 1.05, rotate: 5 }}
                  transition={optimizedTransition}
                  style={{ willChange: "transform" }}
                >
                  <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                    {t("interface.incoming.title")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("interface.incoming.subtitle")}</p>
                </div>
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={currentStep >= 1 ? { scale: 1, opacity: 1 } : {}}
                transition={
                  getAnimationConfig({
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3,
                  }).transition
                }
                className="relative"
              >
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                  {t("interface.status.active")}
                </div>
                {!shouldReduceAnimations && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    style={{ willChange: "transform, opacity" }}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Client Information with enhanced styling */}
          <motion.div variants={itemVariants} className="group">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200/30 dark:border-purple-700/30">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={shouldReduceAnimations ? {} : { scale: 1.05, rotate: -5 }}
                  transition={optimizedTransition}
                  style={{ willChange: "transform" }}
                >
                  <Phone className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                    {t("interface.client.name")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("interface.client.type")}</p>
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={currentStep >= 2 ? { scale: 1 } : {}}
                transition={
                  getAnimationConfig({
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3,
                  }).transition
                }
                className="flex gap-1.5"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 rounded-full"
                    animate={
                      shouldReduceAnimations
                        ? {}
                        : {
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6],
                          }
                    }
                    transition={{
                      duration: 1.5,
                      repeat: shouldReduceAnimations ? 0 : Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    style={{ willChange: "transform, opacity" }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* AI Message with enhanced mobile styling */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-700/80 rounded-2xl p-4 sm:p-5 border border-gray-200/50 dark:border-gray-600/30 shadow-sm"
              whileHover={shouldReduceAnimations ? {} : { scale: 1.02 }}
              transition={optimizedTransition}
              style={{ willChange: "transform" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-sm sm:text-base">
                  {t("interface.message.content")}
                </p>
              </div>
            </motion.div>
            {!shouldReduceAnimations && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
                style={{ willChange: "transform" }}
              />
            )}
          </motion.div>

          {/* Notification with enhanced mobile styling */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200/50 dark:border-green-700/30 rounded-2xl p-4 sm:p-5 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={currentStep >= 4 ? { scale: 1, opacity: 1 } : {}}
              transition={
                getAnimationConfig({
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
                  delay: 0.2,
                }).transition
              }
              whileHover={shouldReduceAnimations ? {} : { scale: 1.02, y: -2 }}
              style={{ willChange: "transform" }}
            >
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                animate={shouldReduceAnimations ? {} : { rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 1.5 }}
                style={{ willChange: "transform" }}
              >
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-green-800 dark:text-green-300 text-sm sm:text-base truncate">
                  {t("interface.notification.title")}
                </h4>
                <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                  {t("interface.notification.time")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Elements with mobile optimization */}
        {!shouldReduceAnimations && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5, ...springTransition }}
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl shadow-xl"
              animate={{
                rotate: [0, 180, 360],
                y: [0, -8, 0],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              style={{ willChange: "transform" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.8, ...springTransition }}
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 rounded-full shadow-xl opacity-80"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 4, 0],
              }}
              transition={{
                scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                x: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              style={{ willChange: "transform" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2.1, ...springTransition }}
              className="absolute top-1/2 -left-6 sm:-left-10 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 rounded-lg sm:rounded-xl shadow-lg"
              animate={{
                rotate: [0, -180, -360],
                y: [0, 12, 0],
              }}
              transition={{
                rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                y: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              style={{ willChange: "transform" }}
            />
          </>
        )}
      </div>
    </PerformanceWrapper>
  )
})

export default XioreliaInterface

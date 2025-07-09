"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Phone,
  Calendar,
  Briefcase,
  MessageSquare,
  Clock,
  Globe,
  Zap,
  Shield,
  Star,
} from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

const features = [
  {
    icon: Phone,
    title: "features.answers_call_title",
    description: "features.answers_call_description",
    color: "from-[#3968FF] to-[#6DBEED]",
    bgColor:
      "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    borderColor: "border-blue-200/30 dark:border-blue-700/30",
    tags: ["features.natural_voice", "features.call_recording"],
    stats: "99.9%",
    statsLabel: "Uptime",
  },
  {
    icon: Calendar,
    title: "features.smart_scheduling_title",
    description: "features.smart_scheduling_description",
    color: "from-[#6DBEED] to-[#A0DBE9]",
    bgColor:
      "from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
    borderColor: "border-cyan-200/30 dark:border-cyan-700/30",
    tags: ["features.calendar_sync", "features.time_zones"],
    stats: "24/7",
    statsLabel: "Available",
  },
  {
    icon: Briefcase,
    title: "features.built_entrepreneurs_title",
    description: "features.built_entrepreneurs_description",
    color: "from-[#A0DBE9] to-[#3968FF]",
    bgColor:
      "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
    borderColor: "border-purple-200/30 dark:border-purple-700/30",
    tags: ["features.crm_integration", "features.analytics"],
    stats: "50+",
    statsLabel: "Integrations",
  },
];

const additionalFeatures = [
  {
    icon: MessageSquare,
    title: "features.additional.multilang_support",
    description: "features.additional.multilang_desc",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Clock,
    title: "features.additional.instant_response",
    description: "features.additional.instant_desc",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: Globe,
    title: "features.additional.global_availability",
    description: "features.additional.global_desc",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Shield,
    title: "features.additional.enterprise_security",
    description: "features.additional.enterprise_desc",
    color: "text-red-600 dark:text-red-400",
  },
  {
    icon: Zap,
    title: "features.additional.ai_powered",
    description: "features.additional.ai_desc",
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    icon: Star,
    title: "features.additional.premium_support",
    description: "features.additional.premium_desc",
    color: "text-pink-600 dark:text-pink-400",
  },
];

const extendedFeatures = [
  {
    icon: MessageSquare,
    title: "features.extended.smart_call_routing",
    description: "features.extended.smart_call_desc",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Calendar,
    title: "features.extended.advanced_analytics",
    description: "features.extended.advanced_analytics_desc",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Shield,
    title: "features.extended.custom_integrations",
    description: "features.extended.custom_integrations_desc",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: Globe,
    title: "features.extended.voice_cloning",
    description: "features.extended.voice_cloning_desc",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Zap,
    title: "features.extended.realtime_transcription",
    description: "features.extended.realtime_transcription_desc",
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Star,
    title: "features.extended.smart_followups",
    description: "features.extended.smart_followups_desc",
    color: "text-rose-600 dark:text-rose-400",
  },
  {
    icon: Clock,
    title: "features.extended.mood_detection",
    description: "features.extended.mood_detection_desc",
    color: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Briefcase,
    title: "features.extended.lead_qualification",
    description: "features.extended.lead_qualification_desc",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Phone,
    title: "features.extended.whitelabel_solution",
    description: "features.extended.whitelabel_solution_desc",
    color: "text-violet-600 dark:text-violet-400",
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showExtended, setShowExtended] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const { t } = useLanguage();

  const handleExploreFeatures = () => {
    setShowExtended(!showExtended);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const additionalVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Enhanced Background with mobile optimization */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-cyan-50/40 dark:from-gray-950/80 dark:via-blue-950/40 dark:to-purple-950/20" />

      {/* Floating background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 left-4 lg:left-20 w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-400/8 to-cyan-400/8 dark:from-blue-400/15 dark:to-cyan-400/15 rounded-full blur-2xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 right-4 lg:right-20 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-400/8 to-pink-400/8 dark:from-purple-400/15 dark:to-pink-400/15 rounded-full blur-2xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-800/50 shadow-lg mb-6"
          >
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              {t("features.badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gradient-primary mb-4 lg:mb-6 leading-tight">
            {t("features.title")}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Main Feature Cards - Enhanced for mobile */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              className="group relative"
            >
              {/* Enhanced Glass Card */}
              <motion.div
                className={`relative glass-card rounded-3xl p-6 lg:p-8 h-full transition-all duration-500 ${
                  activeCard === index
                    ? "shadow-2xl scale-[1.02]"
                    : "shadow-xl hover:shadow-2xl"
                }`}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {/* Gradient background overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`}
                />

                {/* Border gradient */}
                <div
                  className={`absolute inset-0 rounded-3xl border ${feature.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 space-y-6">
                  {/* Enhanced Icon with stats */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                    </motion.div>

                    {/* Stats badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-right"
                    >
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        {feature.stats}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {feature.statsLabel}
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {t(feature.title)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                      {t(feature.description)}
                    </p>
                  </div>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-2">
                    {feature.tags?.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + tagIndex * 0.1 }}
                        className="px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-blue-700 dark:text-blue-300 rounded-full text-xs lg:text-sm font-medium border border-blue-200/50 dark:border-blue-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
                      >
                        {t(tag)}
                      </motion.span>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <motion.div
                    className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r ${feature.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{
                        duration: 1,
                        delay: 0.8 + index * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features Grid - Enhanced for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("features.everything_need")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("features.comprehensive_desc")}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={additionalVariants}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className="group glass-card rounded-2xl p-4 lg:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon
                      className={`h-6 w-6 lg:h-8 lg:w-8 ${feature.color}`}
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {t(feature.title)}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed">
                      {t(feature.description)}
                    </p>
                  </div>
                </div>

                {/* Subtle hover indicator */}
                <motion.div
                  className="mt-3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Extended Features Section */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: showExtended ? 1 : 0,
            height: showExtended ? "auto" : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-8 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showExtended ? 1 : 0,
                y: showExtended ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-8 lg:mb-12"
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("features.advanced_capabilities")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("features.unlock_potential")}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={showExtended ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              {extendedFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={additionalVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="group glass-card rounded-2xl p-4 lg:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon
                        className={`h-6 w-6 lg:h-8 lg:w-8 ${feature.color}`}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {t(feature.title)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed">
                        {t(feature.description)}
                      </p>
                    </div>
                  </div>

                  {/* Subtle hover indicator */}
                  <motion.div
                    className="mt-3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <motion.button
            onClick={handleExploreFeatures}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#3968FF] to-[#6DBEED] hover:from-[#2952CC] hover:to-[#5BA8D4] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold overflow-hidden group"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />

            <span className="relative z-10 text-sm lg:text-base">
              {showExtended
                ? t("features.show_less")
                : t("features.explore_all")}
            </span>

            <motion.div
              className="relative z-10"
              animate={{
                rotate: showExtended ? 180 : 0,
                x: showExtended ? 0 : [0, 4, 0],
              }}
              transition={{
                rotate: { duration: 0.3 },
                x: {
                  duration: 1.5,
                  repeat: showExtended ? 0 : Number.POSITIVE_INFINITY,
                },
              }}
            >
              {showExtended ? "↑" : "→"}
            </motion.div>

            {/* Subtle shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

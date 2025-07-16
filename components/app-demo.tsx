"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  Play,
  Phone,
  Calendar,
  BarChart3,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Globe,
  Bell,
  Shield,
  Volume2,
  Mic,
  PhoneCall,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";

export default function AppDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const { t } = useLanguage();
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const tabs = [
    {
      id: "dashboard",
      icon: BarChart3,
      label: t("dashboard.sidebar.dashboard"),
    },
    { id: "calls", icon: Phone, label: t("dashboard.sidebar.calls") },
    { id: "schedule", icon: Calendar, label: t("dashboard.sidebar.schedule") },
    { id: "settings", icon: Settings, label: t("dashboard.sidebar.settings") },
  ];

  // Mock data for different sections
  const mockCalls = [
    {
      id: 1,
      name: "Ana García",
      time: "14:30",
      duration: "5:23",
      status: "completed",
      type: "inbound",
    },
    {
      id: 2,
      name: "Carlos López",
      time: "13:15",
      duration: "3:45",
      status: "completed",
      type: "outbound",
    },
    {
      id: 3,
      name: "María Rodríguez",
      time: "12:00",
      duration: "7:12",
      status: "missed",
      type: "inbound",
    },
    {
      id: 4,
      name: "Juan Pérez",
      time: "11:30",
      duration: "4:56",
      status: "completed",
      type: "inbound",
    },
  ];

  const mockSchedule = [
    {
      id: 1,
      title: t("demo.item1.scheduled"),
      time: "09:00",
      date: "Hoy",
      attendees: 5,
    },
    {
      id: 2,
      title: t("demo.item2.scheduled"),
      time: "14:00",
      date: "Hoy",
      attendees: 3,
    },
    {
      id: 3,
      title: t("demo.item3.scheduled"),
      time: "16:30",
      date: "Mañana",
      attendees: 8,
    },
    {
      id: 4,
      title: t("demo.item4.scheduled"),
      time: "10:00",
      date: "Mañana",
      attendees: 2,
    },
  ];

  const renderDashboard = () => (
    <motion.div
      className="space-y-6 lg:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
        {[
          {
            value: "247",
            label: t("dashboard.stats.calls_handled"),
            color: "from-blue-500 to-cyan-500",
            delay: 0.2,
          },
          {
            value: "89",
            label: t("dashboard.stats.meetings_scheduled"),
            color: "from-cyan-500 to-blue-500",
            delay: 0.3,
          },
          {
            value: "98%",
            label: t("dashboard.stats.satisfaction_rate"),
            color: "from-blue-500 to-purple-500",
            delay: 0.4,
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: stat.delay,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 },
            }}
            className={`bg-gradient-to-br ${stat.color} p-4 lg:p-6 rounded-xl lg:rounded-2xl text-white shadow-lg cursor-pointer`}
          >
            <motion.div
              className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: stat.delay + 0.3,
                type: "spring",
                stiffness: 200,
              }}
            >
              {stat.value}
            </motion.div>
            <div className="text-xs lg:text-sm opacity-90 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <motion.div
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-bold text-lg lg:text-xl text-gray-900 dark:text-gray-100 mb-4 lg:mb-6">
          {t("dashboard.recent_activity.title")}
        </h3>
        <div className="space-y-3 lg:space-y-4">
          {[
            {
              text: t("dashboard.recent_activity.call_completed"),
              color: "from-green-400 to-emerald-500",
              delay: 0.5,
            },
            {
              text: t("dashboard.recent_activity.meeting_scheduled"),
              color: "from-blue-400 to-cyan-500",
              delay: 0.6,
            },
            {
              text: t("dashboard.recent_activity.calendar_updated"),
              color: "from-purple-400 to-pink-500",
              delay: 0.7,
            },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: activity.delay,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg lg:rounded-xl cursor-pointer transition-all duration-200"
            >
              <motion.div
                className={`w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r ${activity.color} rounded-full shadow-lg`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: activity.delay,
                }}
              />
              <span className="text-sm lg:text-base text-gray-700 dark:text-gray-300 font-medium">
                {activity.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderCalls = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg lg:text-xl text-gray-900 dark:text-gray-100">
          {t("demo.calls.title")}
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all text-sm lg:text-base"
        >
          <PhoneCall className="h-4 w-4" />
          <span className="hidden sm:inline">{t("demo.calls.start")}</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Call history */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 lg:mb-4 text-sm lg:text-base">
            {t("demo.calls.history")}
          </h4>
          <div className="space-y-2 lg:space-y-3">
            {mockCalls.map((call, index) => (
              <div
                key={call.id}
                className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all cursor-pointer"
              >
                <div
                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${
                    call.status === "completed"
                      ? "bg-green-500"
                      : call.status === "missed"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100 text-sm lg:text-base truncate">
                    {call.name}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                    {call.time} • {call.duration}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {call.type === "inbound" ? (
                    <Phone className="h-3 w-3 lg:h-4 lg:w-4 text-blue-500 rotate-180" />
                  ) : (
                    <Phone className="h-3 w-3 lg:h-4 lg:w-4 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call analytics */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 lg:mb-4 text-sm lg:text-base">
            {t("demo.calls.analytics")}
          </h4>
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.calls.today")}
              </span>
              <span className="font-bold text-gray-900 dark:text-gray-100 text-sm lg:text-base">
                15
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.calls.answered")}
              </span>
              <span className="font-bold text-green-600 text-sm lg:text-base">
                12
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.calls.missed")}
              </span>
              <span className="font-bold text-red-600 text-sm lg:text-base">
                3
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.calls.avg_duration")}
              </span>
              <span className="font-bold text-gray-900 dark:text-gray-100 text-sm lg:text-base">
                4:32
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <motion.div
      className="space-y-4 lg:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg lg:text-xl text-gray-900 dark:text-gray-100">
          {t("demo.schedule.title")}
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all text-sm lg:text-base"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">{t("demo.schedule.add")}</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Today's schedule */}
        <motion.div
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 lg:mb-4 text-sm lg:text-base">
            {t("demo.schedule.today")}
          </h4>
          <div className="space-y-2 lg:space-y-3">
            {mockSchedule
              .filter((event) => event.date === "Hoy")
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all cursor-pointer"
                >
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-blue-500 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm lg:text-base truncate">
                      {event.title}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                      {event.time} • {event.attendees} {t("demo.people")}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 lg:gap-2">
                    <Edit3 className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400 hover:text-blue-500 transition-colors" />
                    <Trash2 className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400 hover:text-red-500 transition-colors" />
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Upcoming schedule */}
        <motion.div
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 lg:mb-4 text-sm lg:text-base">
            {t("demo.schedule.upcoming")}
          </h4>
          <div className="space-y-2 lg:space-y-3">
            {mockSchedule
              .filter((event) => event.date === "Mañana")
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all cursor-pointer"
                >
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-purple-500 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm lg:text-base truncate">
                      {event.title}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                      {event.time} • {event.attendees} {t("demo.people")}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 lg:gap-2">
                    <Edit3 className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400 hover:text-blue-500 transition-colors" />
                    <Trash2 className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400 hover:text-red-500 transition-colors" />
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div
      className="space-y-4 lg:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-bold text-lg lg:text-xl text-gray-900 dark:text-gray-100">
        {t("demo.settings.title")}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Voice settings */}
        <motion.div
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 lg:mb-4 flex items-center gap-2 text-sm lg:text-base">
            <Volume2 className="h-4 w-4 lg:h-5 lg:w-5" />
            {t("demo.settings.voice")}
          </h4>
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.settings.voice_type")}
              </span>
              <select className="px-2 lg:px-3 py-1 lg:py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs lg:text-sm">
                <option>{t("demo.settings.voice_professional")}</option>
                <option>{t("demo.settings.voice_friendly")}</option>
                <option>{t("demo.settings.voice_formal")}</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.settings.language")}
              </span>
              <select className="px-2 lg:px-3 py-1 lg:py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs lg:text-sm">
                <option>{t("demo.settings.lang_spanish")}</option>
                <option>{t("demo.settings.lang_english")}</option>
                <option>{t("demo.settings.lang_french")}</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.settings.speed")}
              </span>
              <input
                type="range"
                className="w-16 lg:w-24"
                min="0.5"
                max="2"
                step="0.1"
                defaultValue="1"
              />
            </div>
          </div>
        </motion.div>

        {/* Security settings */}
        <motion.div
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 lg:mb-4 flex items-center gap-2 text-sm lg:text-base">
            <Shield className="h-4 w-4 lg:h-5 lg:w-5" />
            {t("demo.settings.security")}
          </h4>
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.settings.encryption")}
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-green-500" />
                <span className="text-xs lg:text-sm text-green-600">
                  {t("demo.settings.enabled")}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.settings.recording")}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-9 h-5 lg:w-11 lg:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 lg:after:h-5 lg:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {t("demo.settings.notifications")}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-9 h-5 lg:w-11 lg:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 lg:after:h-5 lg:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex justify-center pt-4 lg:pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all text-sm lg:text-base"
        >
          <Save className="h-4 w-4" />
          {t("demo.settings.save")}
        </motion.button>
      </motion.div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "calls":
        return renderCalls();
      case "schedule":
        return renderSchedule();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <section
      id="demo"
      ref={containerRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Enhanced Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-blue-50/80 dark:from-slate-900/80 dark:to-blue-900/80"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-700 dark:from-gray-100 dark:via-blue-300 dark:to-cyan-200 bg-clip-text text-transparent mb-6">
            {t("demo.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            {t("demo.subtitle")}
          </p>
          {/*
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3968FF] to-[#6DBEED] hover:from-[#2952CC] hover:to-[#5BA8D4] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Play className="h-5 w-5" />
            {t("demo.watch_demo")}
          </motion.button>
          */}
        </motion.div>
        
        {/* Interactive App Interface */}
        <motion.div
          style={{ scale }}
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Desktop Glass panel background */}
          <div className="absolute -inset-8 bg-gradient-to-br from-white/60 to-white/20 dark:from-black/60 dark:to-black/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-black/30 shadow-2xl hidden lg:block" />

          {/* Mobile iPhone Frame */}
          <div className="lg:hidden relative mx-auto w-[375px] max-w-[90vw] h-[812px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-20"></div>

            {/* iPhone Screen */}
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden relative">
              {/* iOS Status Bar */}
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-6 pt-12 pb-4 flex justify-between items-center text-sm font-medium text-black dark:text-white border-b border-gray-200/30 dark:border-gray-700/30">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="ml-2 w-6 h-3 border border-black dark:border-white rounded-sm">
                    <div className="w-4 h-2 bg-black dark:bg-white rounded-sm m-0.5"></div>
                  </div>
                </div>
              </div>

              {/* iOS Header */}
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-200/20 dark:border-gray-700/20">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      theme === "dark"
                        ? "/iconos/logotipo_blanco.png"
                        : "/iconos/logotipo_negro.png"
                    }
                    alt="Xiorelia"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    Xiorelia
                  </span>
                </div>
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
              </div>

              {/* Mobile Content */}
              <div className="h-[calc(100%-140px)] overflow-y-auto px-4 py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* iOS Bottom Navigation */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/30 dark:border-gray-700/30 px-4 py-2 pb-8">
                <div className="flex justify-around items-center">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "text-[#007AFF]"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <tab.icon className="h-6 w-6" />
                      <span className="text-xs font-medium">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
                {/* iOS Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black dark:bg-white rounded-full opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Desktop App interface content */}
          <motion.div
            className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/30 hidden lg:block"
            variants={itemVariants}
          >
            {/* Desktop App interface */}
            <div className="p-8 min-h-[700px]">
              <div className="grid lg:grid-cols-4 gap-8 h-full">
                {/* Interactive Sidebar */}
                <motion.div className="space-y-6" variants={itemVariants}>
                  <div className="flex items-center gap-3 mb-8">
                    <Image
                      src={
                        theme === "dark"
                          ? "/iconos/logotipo_blanco.png"
                          : "/iconos/logotipo_negro.png"
                      }
                      alt="Xiorelia Logo"
                      width={40}
                      height={40}
                      className="object-contain drop-shadow-lg filter hover:drop-shadow-xl transition-all duration-300"
                    />
                    <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
                      Xiorelia
                    </span>
                  </div>

                  <nav className="space-y-3">
                    {tabs.map((tab, index) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-[#3968FF] dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </motion.button>
                    ))}
                  </nav>
                </motion.div>

                {/* Dynamic Main content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    className="lg:col-span-3"
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import type React from "react";
import Image from "next/image"; // ← AÑADIR ESTE IMPORT
import { motion, useInView } from "framer-motion";
import { Check, User, Mail, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Turnstile } from "@marsidev/react-turnstile";

export default function Waitlist() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isTurnstileVerified, setIsTurnstileVerified] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar que Turnstile esté completado
    if (!isTurnstileVerified || !turnstileToken) {
      setError("Por favor, completa la verificación de seguridad.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setTurnstileToken("");
        setIsTurnstileVerified(false);
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        throw new Error(data.error || "Error al enviar el formulario");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para manejar Turnstile
  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
    setIsTurnstileVerified(true);
    setError(""); // Limpiar cualquier error previo
  };

  const handleTurnstileError = () => {
    setTurnstileToken("");
    setIsTurnstileVerified(false);
    setError(
      "Error en la verificación de seguridad. Por favor, inténtalo de nuevo."
    );
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken("");
    setIsTurnstileVerified(false);
    setError(
      "La verificación de seguridad ha expirado. Por favor, complétala nuevamente."
    );
  };

  return (
    <>
      {/* Waitlist Section */}
      <section
        id="waitlist"
        ref={containerRef}
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10 relative overflow-hidden"
      >
        {/* Subtle Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-100/20 to-cyan-100/20 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-purple-100/20 to-pink-100/20 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8 sm:space-y-12"
            >
              {/* Header */}
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-800/50 shadow-lg mb-4 sm:mb-6"
                >
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {t("waitlist.trust.early_access")}
                  </span>
                </motion.div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight px-4">
                  {language === "en" ? (
                    <>
                      Ready to Take <br className="hidden sm:block" />
                      <span className="text-gradient-primary">Control?</span>
                    </>
                  ) : (
                    <>
                      ¿Listo para Tomar <br className="hidden sm:block" />
                      <span className="text-gradient-primary">Control?</span>
                    </>
                  )}
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                  {t("waitlist.main.subtitle")}
                </p>
              </div>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-lg mx-auto group"
              >
                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-gray-200/30 dark:border-gray-700/30 shadow-2xl dark:shadow-blue-900/20 p-8 mx-4 sm:mx-0 overflow-hidden group-hover:shadow-3xl transition-all duration-500">
                  {/* Advanced Background Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/20 to-cyan-50/30 dark:from-blue-950/20 dark:via-gray-900/40 dark:to-purple-950/15 rounded-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20 dark:from-transparent dark:via-gray-900/10 dark:to-gray-800/20 rounded-3xl"></div>
                  </div>

                  {/* Sophisticated Border Effects */}
                  <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-b from-white/60 via-white/20 to-transparent dark:from-gray-800/60 dark:via-gray-800/20 dark:to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-cyan-500/0 dark:from-blue-400/0 dark:via-blue-400/10 dark:to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* Micro-interactions: Floating Particles */}
                  <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse pointer-events-none"></div>
                  <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-cyan-400/40 rounded-full animate-pulse delay-300 pointer-events-none"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/50 rounded-full animate-pulse delay-700 pointer-events-none"></div>

                  <div className="relative z-20">
                    {/* Enhanced Form Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-3">
                        {t("waitlist.form.title")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t("waitlist.form.subtitle")}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Enhanced Name Input */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-400/5 dark:to-cyan-400/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300 blur-sm pointer-events-none"></div>
                        <div className="relative z-10">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-all duration-300 z-10" />
                          <Input
                            type="text"
                            placeholder={t("waitlist.form.name.placeholder")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-12 h-14 bg-gray-50/80 dark:bg-gray-800/60 border-0 ring-1 ring-gray-200/60 dark:ring-gray-700/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-400/40 backdrop-blur-sm transition-all duration-300 text-base font-medium hover:ring-gray-300/80 dark:hover:ring-gray-600/80 focus:bg-white/90 dark:focus:bg-gray-800/80 relative z-10"
                            required
                          />
                        </div>
                      </div>

                      {/* Enhanced Email Input */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-400/5 dark:to-cyan-400/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300 blur-sm pointer-events-none"></div>
                        <div className="relative z-10">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-all duration-300 z-10" />
                          <Input
                            type="email"
                            placeholder={t("waitlist.form.email.placeholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-12 h-14 bg-gray-50/80 dark:bg-gray-800/60 border-0 ring-1 ring-gray-200/60 dark:ring-gray-700/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-400/40 backdrop-blur-sm transition-all duration-300 text-base font-medium hover:ring-gray-300/80 dark:hover:ring-gray-600/80 focus:bg-white/90 dark:focus:bg-gray-800/80 relative z-10"
                            required
                          />
                        </div>
                      </div>

                      {/* Cloudflare Turnstile Widget */}
                      <div className="relative">
                        <div className="flex flex-col items-center space-y-3">
                          {/* Contenedor del Turnstile con z-index alto */}
                          <div className="relative z-50 bg-transparent">
                            <Turnstile
                              siteKey={
                                process.env
                                  .NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
                                "1x00000000000000000000AA"
                              }
                              onSuccess={handleTurnstileSuccess}
                              onError={handleTurnstileError}
                              onExpire={handleTurnstileExpire}
                              options={{
                                theme: theme === "dark" ? "dark" : "light",
                                language: language === "es" ? "es" : "en",
                                size: "normal",
                                action: "waitlist-signup",
                                cData: "waitlist-form",
                              }}
                            />
                          </div>

                          {/* Indicador de verificación */}
                          {isTurnstileVerified && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50/60 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200/40 dark:border-green-800/40 backdrop-blur-sm relative z-10"
                            >
                              <Check className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {t("waitlist.form.turnstile.success")}
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Premium Submit Button */}
                      <div className="relative group pt-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 dark:from-blue-500 dark:via-blue-600 dark:to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                        <Button
                          type="submit"
                          disabled={isLoading || !isTurnstileVerified}
                          className={`relative w-full h-14 ${
                            !isTurnstileVerified
                              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 dark:from-blue-500 dark:via-blue-600 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:via-blue-700 dark:hover:to-cyan-600"
                          } disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 dark:shadow-blue-500/20 dark:hover:shadow-blue-500/30 transition-all duration-500 text-base overflow-hidden group`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <span className="relative flex items-center justify-center gap-3">
                            {isLoading ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            ) : (
                              <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                            )}
                            {isLoading
                              ? "Enviando..."
                              : !isTurnstileVerified
                              ? "Completa la verificación"
                              : t("waitlist.form.button")}
                            {!isLoading && isTurnstileVerified && (
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }}
                              >
                                <ArrowRight className="h-5 w-5" />
                              </motion.div>
                            )}
                          </span>
                        </Button>
                      </div>

                      {/* Enhanced Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative bg-red-50/90 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 rounded-2xl p-4 backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                              {error}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </form>

                    {/* Premium Trust Indicators */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-200/30 dark:border-gray-700/30">
                      <div className="flex items-center gap-3 text-green-600 dark:text-green-400 bg-green-50/60 dark:bg-green-900/20 px-4 py-2.5 rounded-full border border-green-200/40 dark:border-green-800/40 backdrop-blur-sm">
                        <div className="relative">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-30"></div>
                        </div>
                        <span className="text-sm font-medium">
                          {t("waitlist.trust.no_spam")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-900/20 px-4 py-2.5 rounded-full border border-blue-200/40 dark:border-blue-800/40 backdrop-blur-sm">
                        <div className="relative">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                          <div className="absolute inset-0 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-30 delay-500"></div>
                        </div>
                        <span className="text-sm font-medium">
                          {t("waitlist.trust.early_access")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto"
            >
              <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl dark:shadow-2xl dark:shadow-green-500/10 p-6 sm:p-8 text-center mx-4 sm:mx-0 overflow-hidden">
                {/* Success Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30 dark:from-green-950/30 dark:via-transparent dark:to-emerald-950/20 rounded-2xl sm:rounded-3xl"></div>

                {/* Success Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg dark:shadow-green-500/25">
                    <Check className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-2 sm:mb-3">
                    {t("waitlist.success.title")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("waitlist.success.message")}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
            {/* Logo */}
            <div className="relative p-2 rounded-lg group-hover:bg-blue-500/10 transition-colors">
              <Image
                src={
                  theme === "dark"
                    ? "/iconos/isologo_negro.png"
                    : "/iconos/isologo_blanco.png"
                }
                alt="Xiorelia"
                width={80}
                height={32}
                className="w-20 h-8 transition-transform group-hover:scale-110"
              />
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <a
                href="#"
                className="hover:text-gray-900 dark:hover:text-white transition-colors touch-target"
              >
                {t("footer.privacy")}
              </a>
              <a
                href="#"
                className="hover:text-gray-900 dark:hover:text-white transition-colors touch-target"
              >
                {t("footer.terms")}
              </a>
              <a
                href="#"
                className="hover:text-gray-900 dark:hover:text-white transition-colors touch-target"
              >
                {t("footer.contact")}
              </a>
            </div>

            {/* Copyright */}
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
              © 2025 Xiorelia. {t("footer.rights")}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

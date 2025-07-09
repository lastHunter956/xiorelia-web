"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.features": "Características",
    "nav.demo": "Demo",
    "nav.testimonials": "Testimonios",
    "nav.waitlist": "Lista de Espera",

    // Hero Section
    "hero.badge": "IA Avanzada",
    "hero.title": "Conoce a Xiorelia",
    "hero.subtitle":
      "Tu asistente de IA premium que maneja llamadas, programa reuniones y gestiona tu negocio 24/7",
    "hero.cta.primary": "Unirse a Lista de Espera",
    "hero.cta.secondary": "Ver Demo",
    "hero.stats.available": "Disponible 24/7",
    "hero.stats.scheduling": "Programación Inteligente",
    "hero.stats.multilang": "Multi-idioma",
    "hero.incoming.call": "Llamada Entrante",
    "hero.assistant.ready": "Lista para ayudar",

    // Interface Component
    "interface.title": "Asistente Xiorelia",
    "interface.incoming.title": "Llamada Entrante",
    "interface.incoming.subtitle": "Xiorelia la está atendiendo",
    "interface.client.name": "Alejandro Martín",
    "interface.client.type": "Cliente Potencial",
    "interface.message.content":
      "Xiorelia está programando una reunión con Alejandro para mañana a las 14:00",
    "interface.notification.title": "Reunión programada",
    "interface.notification.time": "Mañana, 14:00",
    "interface.status.active": "Activo",

    // Features Section
    "features.title": "Características Poderosas",
    "features.subtitle":
      "Todo lo que necesitas en un asistente de IA premium, diseñado para empresas modernas",
    "features.calls.title": "Responde Todas las Llamadas",
    "features.calls.description":
      "Nunca pierdas una oportunidad de negocio. Xiorelia maneja todas las llamadas entrantes con conversación natural y profesionalismo perfecto.",
    "features.scheduling.title": "Programación Inteligente 24/7",
    "features.scheduling.description":
      "Programa reuniones automáticamente, gestiona tu calendario y envía recordatorios. Funciona las 24 horas, incluso mientras duermes.",
    "features.entrepreneurs.title": "Hecho para Emprendedores",
    "features.entrepreneurs.description":
      "Diseñado específicamente para dueños de negocios que necesitan un asistente confiable que entienda el contexto y prioridades empresariales.",
    "features.natural.voice": "Voz Natural",
    "features.call.recording": "Grabación de Llamadas",
    "features.calendar.sync": "Sincronización de Calendario",
    "features.time.zones": "Zonas Horarias",
    "features.crm.integration": "Integración CRM",
    "features.analytics": "Analíticas",
    "features.multilang.support": "Soporte Multi-idioma",
    "features.multilang.desc": "Comunícate en más de 50 idiomas",
    "features.instant.response": "Respuesta Instantánea",
    "features.instant.desc": "Tiempo de respuesta promedio menor a 2 segundos",
    "features.global.availability": "Disponibilidad Global",
    "features.global.desc": "Funciona en todas las zonas horarias",

    // App Demo Section
    "demo.title": "Ve Xiorelia en Acción",
    "demo.subtitle":
      "Experimenta la interfaz intuitiva que hace que gestionar tu asistente de IA sea sin esfuerzo",
    "demo.cta": "Ver Demo Completo",
    "demo.dashboard": "Panel de Control",
    "demo.calls": "Llamadas",
    "demo.schedule": "Horario",
    "demo.settings": "Configuración",
    "demo.calls.handled": "Llamadas Atendidas",
    "demo.meetings.scheduled": "Reuniones Programadas",
    "demo.satisfaction.rate": "Tasa de Satisfacción",
    "demo.recent.activity": "Actividad Reciente",
    "demo.call.completed": "Llamada completada con Juan Pérez - hace 2 min",
    "demo.meeting.scheduled": "Reunión programada para mañana - hace 5 min",
    "demo.calendar.updated":
      "Calendario actualizado con nueva cita - hace 8 min",

    // Testimonials Section
    "testimonials.title": "Lo que Dicen Nuestros Usuarios",
    "testimonials.subtitle":
      "Únete a miles de emprendedores que han transformado su negocio con Xiorelia",
    "testimonials.rating.text": "calificación promedio de más de 500 usuarios",
    "testimonials.ana.content":
      "Xiorelia ha transformado cómo manejo las llamadas de negocio. Es como tener un asistente premium que nunca duerme. El ROI es increíble.",
    "testimonials.ana.role": "Inversionista Tecnológica",
    "testimonials.marcus.content":
      "Era escéptico sobre los asistentes de IA, pero el flujo de conversación natural de Xiorelia y su inteligencia empresarial me convencieron. Es revolucionario.",
    "testimonials.marcus.role": "Emprendedor Serial",
    "testimonials.sarah.content":
      "Solo la automatización de programación me ahorra más de 10 horas por semana. Xiorelia entiende el contexto mejor que cualquier asistente humano que he tenido.",
    "testimonials.sarah.role": "Fundadora de Startup",
    "testimonials.rating": "calificación promedio",
    "testimonials.based.on": "Basado en más de 500 usuarios de acceso temprano",

    // Waitlist Section
    "waitlist.main.title": "¿Listo para Tomar Control?",
    "waitlist.main.subtitle":
      "Únete a la lista de espera exclusiva y sé de los primeros en experimentar el futuro de la asistencia IA",
    "waitlist.form.title": "Únete a la Lista de Espera",
    "waitlist.form.subtitle":
      "Sé el primero en experimentar el futuro de la asistencia IA",
    "waitlist.form.name.placeholder": "Tu nombre completo",
    "waitlist.form.email.placeholder": "tu.email@ejemplo.com",
    "waitlist.form.button": "Asegurar Mi Lugar",
    "waitlist.trust.no_spam": "Sin spam, nunca",
    "waitlist.trust.early_access": "Acceso temprano garantizado",
    "waitlist.success.title": "¡Estás en la lista!",
    "waitlist.success.message":
      "Te notificaremos cuando Xiorelia esté listo para acceso temprano",
    "waitlist.title": "Únete al Futuro",
    "waitlist.subtitle":
      "Sé uno de los primeros en experimentar Xiorelia. Espacios limitados de acceso temprano disponibles.",
    "waitlist.email.placeholder": "Ingresa tu dirección de email",
    "waitlist.cta": "Unirse a Lista de Espera",
    "waitlist.no.spam":
      "Sin spam, nunca. Cancela suscripción en cualquier momento.",
    "waitlist.early.access": "Acceso Temprano",
    "waitlist.early.desc":
      "Sé el primero en experimentar las características premium de Xiorelia",
    "waitlist.exclusive.community": "Comunidad Exclusiva",
    "waitlist.exclusive.desc":
      "Únete a un grupo selecto de emprendedores visionarios",
    "waitlist.special.pricing": "Precios Especiales",
    "waitlist.special.desc":
      "Asegura precios de fundador con descuentos exclusivos",

    // Footer
    "footer.tagline": "El asistente de IA premium para emprendedores modernos",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio",
    "footer.contact": "Contacto",
    "footer.rights": "Todos los derechos reservados.",

    // Theme & Language Controls
    "controls.language": "Idioma",
    "controls.theme": "Tema",
    "controls.light": "Claro",
    "controls.dark": "Oscuro",

    // Dashboard translations
    "dashboard.sidebar.dashboard": "Panel",
    "dashboard.sidebar.calls": "Llamadas",
    "dashboard.sidebar.schedule": "Horario",
    "dashboard.sidebar.settings": "Configuración",
    "dashboard.stats.calls_handled": "Llamadas Atendidas",
    "dashboard.stats.meetings_scheduled": "Reuniones Programadas",
    "dashboard.stats.satisfaction_rate": "Tasa de Satisfacción",
    "dashboard.recent_activity.title": "Actividad Reciente",
    "dashboard.recent_activity.call_completed":
      "Llamada completada con Juan Pérez - hace 2 min",
    "dashboard.recent_activity.meeting_scheduled":
      "Reunión programada para mañana - hace 5 min",
    "dashboard.recent_activity.calendar_updated":
      "Calendario actualizado con nueva cita - hace 8 min",

    // Features translations
    "features.badge": "Características Poderosas",
    "features.everything_need": "Todo lo que Necesitas",
    "features.comprehensive_desc":
      "Características integrales diseñadas para empresas modernas",
    "features.advanced_capabilities": "Capacidades Avanzadas",
    "features.unlock_potential":
      "Desbloquea todo el potencial de la comunicación potenciada por IA",
    "features.show_less": "Mostrar Menos Características",
    "features.explore_all": "Explorar Todas las Características",

    // Additional features
    "features.additional.multilang_support": "Soporte Multi-idioma",
    "features.additional.multilang_desc": "Comunícate en más de 50 idiomas",
    "features.additional.instant_response": "Respuesta Instantánea",
    "features.additional.instant_desc":
      "Tiempo de respuesta promedio menor a 2 segundos",
    "features.additional.global_availability": "Disponibilidad Global",
    "features.additional.global_desc": "Funciona en todas las zonas horarias",
    "features.additional.enterprise_security": "Seguridad Empresarial",
    "features.additional.enterprise_desc":
      "Encriptación y privacidad de nivel bancario",
    "features.additional.ai_powered": "Potenciado por IA",
    "features.additional.ai_desc":
      "Algoritmos avanzados de aprendizaje automático",
    "features.additional.premium_support": "Soporte Premium",
    "features.additional.premium_desc": "Éxito del cliente dedicado 24/7",

    // Extended features
    "features.extended.smart_call_routing":
      "Enrutamiento Inteligente de Llamadas",
    "features.extended.smart_call_desc":
      "Distribución inteligente de llamadas basada en contexto y prioridad",
    "features.extended.advanced_analytics": "Analíticas Avanzadas",
    "features.extended.advanced_analytics_desc":
      "Insights detallados y métricas de rendimiento",
    "features.extended.custom_integrations": "Integraciones Personalizadas",
    "features.extended.custom_integrations_desc":
      "Conecta con tus herramientas y flujos de trabajo existentes",
    "features.extended.voice_cloning": "Clonación de Voz",
    "features.extended.voice_cloning_desc":
      "Voz personalizada que coincide con tu marca",
    "features.extended.realtime_transcription": "Transcripción en Tiempo Real",
    "features.extended.realtime_transcription_desc":
      "Transcripción de llamadas en vivo y toma de notas",
    "features.extended.smart_followups": "Seguimientos Inteligentes",
    "features.extended.smart_followups_desc":
      "Emails de seguimiento automático y recordatorios",
    "features.extended.mood_detection": "Detección de Estado de Ánimo",
    "features.extended.mood_detection_desc":
      "Inteligencia emocional potenciada por IA en conversaciones",
    "features.extended.lead_qualification": "Calificación de Leads",
    "features.extended.lead_qualification_desc":
      "Puntuación y calificación automática de leads",
    "features.extended.whitelabel_solution": "Solución Marca Blanca",
    "features.extended.whitelabel_solution_desc":
      "Completamente personalizable para coincidir con tu marca",

    "features.answers_call_title": "Responde Todas las Llamadas",
    "features.answers_call_description":
      "Nunca pierdas una oportunidad de negocio. Xiorelia maneja todas las llamadas entrantes con conversación natural y profesionalismo perfecto.",
    "features.smart_scheduling_title": "Programación Inteligente 24/7",
    "features.smart_scheduling_description":
      "Programa reuniones automáticamente, gestiona tu calendario y envía recordatorios. Funciona las 24 horas, incluso mientras duermes.",
    "features.built_entrepreneurs_title": "Hecho para Emprendedores",
    "features.built_entrepreneurs_description":
      "Diseñado específicamente para dueños de negocios que necesitan un asistente confiable que entienda el contexto y prioridades empresariales.",
    "features.natural_voice": "Voz Natural",
    "features.call_recording": "Grabación de Llamadas",
    "features.calendar_sync": "Sincronización de Calendario",
    "features.time_zones": "Zonas Horarias",
    "features.crm_integration": "Integración CRM",

    // Demo translations
    "demo.watch_demo": "Ver Demo Completo",
    "demo.calls.title": "Gestión de Llamadas",
    "demo.calls.start": "Iniciar Llamada",
    "demo.calls.history": "Historial de Llamadas",
    "demo.calls.analytics": "Analíticas de Llamadas",
    "demo.calls.today": "Llamadas Hoy",
    "demo.calls.answered": "Respondidas",
    "demo.calls.missed": "Perdidas",
    "demo.calls.avg_duration": "Duración Promedio",
    "demo.schedule.title": "Programación",
    "demo.schedule.add": "Agregar Evento",
    "demo.schedule.today": "Agenda de Hoy",
    "demo.schedule.upcoming": "Próximos Eventos",
    "demo.settings.title": "Configuración",
    "demo.settings.voice": "Configuración de Voz",
    "demo.settings.voice_type": "Tipo de Voz",
    "demo.settings.language": "Idioma",
    "demo.settings.speed": "Velocidad",
    "demo.settings.security": "Seguridad",
    "demo.settings.encryption": "Encriptación",
    "demo.settings.recording": "Grabación",
    "demo.settings.notifications": "Notificaciones",
    "demo.settings.save": "Guardar Cambios",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.demo": "Demo",
    "nav.testimonials": "Testimonials",
    "nav.waitlist": "Waitlist",

    // Hero Section
    "hero.badge": "Advanced AI",
    "hero.title": "Meet Xiorelia",
    "hero.subtitle":
      "Your premium AI assistant that handles calls, schedules meetings, and manages your business 24/7",
    "hero.cta.primary": "Join Waitlist",
    "hero.cta.secondary": "Watch Demo",
    "hero.stats.available": "24/7 Available",
    "hero.stats.scheduling": "Smart Scheduling",
    "hero.stats.multilang": "Multi-language",
    "hero.incoming.call": "Incoming Call",
    "hero.assistant.ready": "Ready to help",

    // Interface Component
    "interface.title": "Xiorelia Assistant",
    "interface.incoming.title": "Incoming Call",
    "interface.incoming.subtitle": "Xiorelia is handling it",
    "interface.client.name": "Alexander Martin",
    "interface.client.type": "Potential Client",
    "interface.message.content":
      "Xiorelia is scheduling a meeting with Alexander for tomorrow at 2:00 PM",
    "interface.notification.title": "Meeting scheduled",
    "interface.notification.time": "Tomorrow, 2:00 PM",
    "interface.status.active": "Active",

    // Features Section
    "features.title": "Powerful Features",
    "features.subtitle":
      "Everything you need in a premium AI assistant, designed for modern businesses",
    "features.calls.title": "Answers Every Call",
    "features.calls.description":
      "Never miss a business opportunity. Xiorelia handles all incoming calls with natural conversation and perfect professionalism.",
    "features.scheduling.title": "Smart Scheduling 24/7",
    "features.scheduling.description":
      "Automatically schedules meetings, manages your calendar, and sends reminders. Works around the clock, even while you sleep.",
    "features.entrepreneurs.title": "Built for Entrepreneurs",
    "features.entrepreneurs.description":
      "Designed specifically for business owners who need a reliable assistant that understands business context and priorities.",
    "features.natural.voice": "Natural Voice",
    "features.call.recording": "Call Recording",
    "features.calendar.sync": "Calendar Sync",
    "features.time.zones": "Time Zones",
    "features.crm.integration": "CRM Integration",
    "features.analytics": "Analytics",
    "features.multilang.support": "Multi-language Support",
    "features.multilang.desc": "Communicate in 50+ languages",
    "features.instant.response": "Instant Response",
    "features.instant.desc": "Average response time under 2 seconds",
    "features.global.availability": "Global Availability",
    "features.global.desc": "Works across all time zones",

    // App Demo Section
    "demo.title": "See Xiorelia in Action",
    "demo.subtitle":
      "Experience the intuitive interface that makes managing your AI assistant effortless",
    "demo.cta": "Watch Full Demo",
    "demo.dashboard": "Dashboard",
    "demo.calls": "Calls",
    "demo.schedule": "Schedule",
    "demo.settings": "Settings",
    "demo.calls.handled": "Calls Handled",
    "demo.meetings.scheduled": "Meetings Scheduled",
    "demo.satisfaction.rate": "Satisfaction Rate",
    "demo.recent.activity": "Recent Activity",
    "demo.call.completed": "Call completed with John Smith - 2 min ago",
    "demo.meeting.scheduled": "Meeting scheduled for tomorrow - 5 min ago",
    "demo.calendar.updated":
      "Calendar updated with new appointment - 8 min ago",

    // Testimonials Section
    "testimonials.title": "What Our Users Are Saying",
    "testimonials.subtitle":
      "Join thousands of entrepreneurs who have transformed their business with Xiorelia",
    "testimonials.rating.text": "average rating from 500+ users",
    "testimonials.ana.content":
      "Xiorelia has transformed how I handle business calls. It's like having a premium assistant that never sleeps. The ROI is incredible.",
    "testimonials.ana.role": "Tech Investor",
    "testimonials.marcus.content":
      "I was skeptical about AI assistants, but Xiorelia's natural conversation flow and business intelligence convinced me. It's a game-changer.",
    "testimonials.marcus.role": "Serial Entrepreneur",
    "testimonials.sarah.content":
      "The scheduling automation alone saves me 10+ hours per week. Xiorelia understands context better than any human assistant I've had.",
    "testimonials.sarah.role": "Startup Founder",
    "testimonials.rating": "average rating",
    "testimonials.based.on": "Based on 500+ early access users",

    // Waitlist Section
    "waitlist.main.title": "Ready to Take Control?",
    "waitlist.main.subtitle":
      "Join the exclusive waitlist and be among the first to experience the future of AI assistance",
    "waitlist.form.title": "Join the Waitlist",
    "waitlist.form.subtitle":
      "Be the first to experience the future of AI assistance",
    "waitlist.form.name.placeholder": "Your full name",
    "waitlist.form.email.placeholder": "your.email@example.com",
    "waitlist.form.button": "Secure My Spot",
    "waitlist.trust.no_spam": "No spam, ever",
    "waitlist.trust.early_access": "Early access guaranteed",
    "waitlist.success.title": "You're on the list!",
    "waitlist.success.message":
      "We'll notify you when Xiorelia is ready for early access",
    "waitlist.title": "Join the Future",
    "waitlist.subtitle":
      "Be among the first to experience Xiorelia. Limited early access spots available.",
    "waitlist.email.placeholder": "Enter your email address",
    "waitlist.cta": "Join Waitlist",
    "waitlist.no.spam": "No spam, ever. Unsubscribe at any time.",
    "waitlist.early.access": "Early Access",
    "waitlist.early.desc": "Be first to experience Xiorelia's premium features",
    "waitlist.exclusive.community": "Exclusive Community",
    "waitlist.exclusive.desc":
      "Join a select group of forward-thinking entrepreneurs",
    "waitlist.special.pricing": "Special Pricing",
    "waitlist.special.desc": "Lock in founder pricing with exclusive discounts",

    // Footer
    "footer.tagline": "The premium AI assistant for modern entrepreneurs",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",

    // Theme & Language Controls
    "controls.language": "Language",
    "controls.theme": "Theme",
    "controls.light": "Light",
    "controls.dark": "Dark",

    // Dashboard translations
    "dashboard.sidebar.dashboard": "Dashboard",
    "dashboard.sidebar.calls": "Calls",
    "dashboard.sidebar.schedule": "Schedule",
    "dashboard.sidebar.settings": "Settings",
    "dashboard.stats.calls_handled": "Calls Handled",
    "dashboard.stats.meetings_scheduled": "Meetings Scheduled",
    "dashboard.stats.satisfaction_rate": "Satisfaction Rate",
    "dashboard.recent_activity.title": "Recent Activity",
    "dashboard.recent_activity.call_completed":
      "Call completed with John Smith - 2 min ago",
    "dashboard.recent_activity.meeting_scheduled":
      "Meeting scheduled for tomorrow - 5 min ago",
    "dashboard.recent_activity.calendar_updated":
      "Calendar updated with new appointment - 8 min ago",

    // Features translations
    "features.badge": "Powerful Features",
    "features.everything_need": "Everything You Need",
    "features.comprehensive_desc":
      "Comprehensive features designed for modern businesses",
    "features.advanced_capabilities": "Advanced Capabilities",
    "features.unlock_potential":
      "Unlock the full potential of AI-powered communication",
    "features.show_less": "Show Less Features",
    "features.explore_all": "Explore All Features",

    // Additional features
    "features.additional.multilang_support": "Multi-language Support",
    "features.additional.multilang_desc": "Communicate in 50+ languages",
    "features.additional.instant_response": "Instant Response",
    "features.additional.instant_desc": "Average response time under 2 seconds",
    "features.additional.global_availability": "Global Availability",
    "features.additional.global_desc": "Works across all time zones",
    "features.additional.enterprise_security": "Enterprise Security",
    "features.additional.enterprise_desc": "Bank-level encryption and privacy",
    "features.additional.ai_powered": "AI-Powered",
    "features.additional.ai_desc": "Advanced machine learning algorithms",
    "features.additional.premium_support": "Premium Support",
    "features.additional.premium_desc": "24/7 dedicated customer success",

    // Extended features
    "features.extended.smart_call_routing": "Smart Call Routing",
    "features.extended.smart_call_desc":
      "Intelligent call distribution based on context and priority",
    "features.extended.advanced_analytics": "Advanced Analytics",
    "features.extended.advanced_analytics_desc":
      "Detailed insights and performance metrics",
    "features.extended.custom_integrations": "Custom Integrations",
    "features.extended.custom_integrations_desc":
      "Connect with your existing tools and workflows",
    "features.extended.voice_cloning": "Voice Cloning",
    "features.extended.voice_cloning_desc":
      "Personalized voice that matches your brand",
    "features.extended.realtime_transcription": "Real-time Transcription",
    "features.extended.realtime_transcription_desc":
      "Live call transcription and note-taking",
    "features.extended.smart_followups": "Smart Follow-ups",
    "features.extended.smart_followups_desc":
      "Automated follow-up emails and reminders",
    "features.extended.mood_detection": "Mood Detection",
    "features.extended.mood_detection_desc":
      "AI-powered emotional intelligence in conversations",
    "features.extended.lead_qualification": "Lead Qualification",
    "features.extended.lead_qualification_desc":
      "Automatic lead scoring and qualification",
    "features.extended.whitelabel_solution": "White-label Solution",
    "features.extended.whitelabel_solution_desc":
      "Fully customizable to match your brand",

    "features.answers_call_title": "Answers Every Call",
    "features.answers_call_description":
      "Never miss a business opportunity. Xiorelia handles all incoming calls with natural conversation and perfect professionalism.",
    "features.smart_scheduling_title": "Smart Scheduling 24/7",
    "features.smart_scheduling_description":
      "Automatically schedules meetings, manages your calendar, and sends reminders. Works around the clock, even while you sleep.",
    "features.built_entrepreneurs_title": "Built for Entrepreneurs",
    "features.built_entrepreneurs_description":
      "Designed specifically for business owners who need a reliable assistant that understands business context and priorities.",
    "features.natural_voice": "Natural Voice",
    "features.call_recording": "Call Recording",
    "features.calendar_sync": "Calendar Sync",
    "features.time_zones": "Time Zones",
    "features.crm_integration": "CRM Integration",

    // Demo translations
    "demo.watch_demo": "Watch Full Demo",
    "demo.calls.title": "Call Management",
    "demo.calls.start": "Start Call",
    "demo.calls.history": "Call History",
    "demo.calls.analytics": "Call Analytics",
    "demo.calls.today": "Calls Today",
    "demo.calls.answered": "Answered",
    "demo.calls.missed": "Missed",
    "demo.calls.avg_duration": "Avg Duration",
    "demo.schedule.title": "Scheduling",
    "demo.schedule.add": "Add Event",
    "demo.schedule.today": "Today's Schedule",
    "demo.schedule.upcoming": "Upcoming Events",
    "demo.settings.title": "Settings",
    "demo.settings.voice": "Voice Settings",
    "demo.settings.voice_type": "Voice Type",
    "demo.settings.language": "Language",
    "demo.settings.speed": "Speed",
    "demo.settings.security": "Security",
    "demo.settings.encryption": "Encryption",
    "demo.settings.recording": "Recording",
    "demo.settings.notifications": "Notifications",
    "demo.settings.save": "Save Changes",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

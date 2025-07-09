import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xiorelia - Asistente de IA Premium para Emprendedores",
  description:
    "Tu asistente de IA premium que maneja llamadas, programa reuniones y gestiona tu negocio 24/7. Hecho para emprendedores modernos.",
  keywords:
    "asistente IA, asistente virtual, automatización empresarial, manejo de llamadas, programación, emprendedores",
  authors: [{ name: "Equipo Xiorelia" }],
  icons: {
    icon: [
      {
        url: "/iconos/logotipo_negro.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/iconos/logotipo_blanco.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/iconos/isologo_negro.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/iconos/isologo_blanco.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    title: "Xiorelia - Asistente de IA Premium para Emprendedores",
    description:
      "Tu asistente de IA premium que maneja llamadas, programa reuniones y gestiona tu negocio 24/7.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xiorelia - Asistente de IA Premium para Emprendedores",
    description:
      "Tu asistente de IA premium que maneja llamadas, programa reuniones y gestiona tu negocio 24/7.",
  },
  generator: "v0.dev",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    // Validar los datos recibidos
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y email son requeridos" },
        { status: 400 }
      );
    }

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Puedes cambiar esto por otro proveedor
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Configurar el email para el administrador
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Nueva suscripción a la lista de espera - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nueva suscripción a Xiorelia</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}</p>
          </div>
          <p style="color: #64748b;">Este usuario se ha registrado en la lista de espera para acceso temprano a Xiorelia.</p>
        </div>
      `,
    };

    // Configurar el email de confirmación para el usuario
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "¡Bienvenido a la lista de espera de Xiorelia!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="cid:xiorelia-logo" 
                 alt="Xiorelia Logo" 
                 style="max-width: 200px; height: auto; margin-bottom: 10px; padding: 20px; border-radius: 12px;" />
            <div style="width: 60px; height: 4px; background: linear-gradient(to right, #2563eb, #06b6d4); margin: 0 auto;"></div>
          </div>
          
          <h2 style="color: #1f2937;">¡Hola ${name}!</h2>
          
          <p style="color: #374151; line-height: 1.6;">
            Gracias por unirte a nuestra lista de espera. Estamos emocionados de tenerte a bordo.
          </p>
          
          <div style="background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%); padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">¿Qué sigue?</h3>
            <ul style="color: #374151; padding-left: 20px;">
              <li>Serás uno de los primeros en probar Xiorelia</li>
              <li>Recibirás acceso exclusivo antes del lanzamiento público</li>
              <li>Te mantendremos actualizado sobre nuestro progreso</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">🚀 ¡Completa tu Pre-inscripción!</h3>
            <p style="color: #374151; margin-bottom: 20px;">
              Para asegurar tu lugar en la lista de espera y recibir acceso prioritario, completa tu pre-inscripción:
            </p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfmNLxNk3Dsdyp4-rTwDpl8trqtcmpKrC-hPtRULlfLR3cvsw/viewform?usp=header" 
               style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 50px; font-weight: bold; font-size: 16px; margin: 10px 0; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3); transition: all 0.3s ease;">
              ✨ Completar Pre-inscripción
            </a>
            <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">
              Solo toma 2 minutos y asegura tu acceso prioritario
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Si tienes alguna pregunta, no dudes en contactarnos.
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px;">
              © 2025 Xiorelia. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "isologo_blanco.png",
          path: path.join(
            process.cwd(),
            "public",
            "iconos",
            "isologo_blanco.png"
          ),
          cid: "xiorelia-logo",
        },
      ],
    };

    // Enviar ambos emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({
      message: "Emails enviados exitosamente",
      success: true,
    });
  } catch (error) {
    console.error("Error enviando emails:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

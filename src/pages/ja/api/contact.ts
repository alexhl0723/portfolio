import type { APIRoute } from "astro";
import { RESEND_API_KEY } from "astro:env/server";
import { Resend } from "resend";

// Escapa HTML para evitar que el contenido del usuario rompa el layout o inyecte HTML
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("🚀 Iniciando /api/contact");

    const formData = await request.formData();

    const rawName = formData.get("name")?.toString().trim();
    const rawEmail = formData.get("email")?.toString().trim();
    const rawMessage = formData.get("message")?.toString().trim();

    // Validación
    if (!rawName || !rawEmail || !rawMessage) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Todos los campos son obligatorios"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    console.log("✅ Datos recibidos:", {
      name: rawName,
      email: rawEmail,
      message: rawMessage
    });

    // Versión segura para insertar en HTML
    const name = escapeHtml(rawName);
    const email = escapeHtml(rawEmail);
    const message = escapeHtml(rawMessage).replace(/\n/g, "<br>");

    const resend = new Resend(RESEND_API_KEY);

    // ============================================
    // 1. NOTIFICACIÓN PARA ALEX
    // ============================================

    console.log("📧 Enviando notificación a Alex...");

    const notification = await resend.emails.send({
      from: "Notificaciones <noreply@notificaciones.alexhl.me>",
      to: ["alexrodrigoherbas07@gmail.com"],
      replyTo: rawEmail,
      subject: `Nuevo mensaje de contacto de ${rawName}`,
      html: `
        <h2>Nuevo mensaje desde tu portafolio 🚀</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    });

    console.log("========== RESEND NOTIFICACIÓN ==========");
    console.log(JSON.stringify(notification, null, 2));
    console.log("==========================================");

    if (notification.error) {
      console.error("❌ Error enviando notificación:", notification.error);

      return new Response(
        JSON.stringify({
          success: false,
          message: "No se pudo enviar la notificación"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    console.log("📨 Notificación enviada:", notification.data?.id);

    // ============================================
    // 2. RESPUESTA AUTOMÁTICA AL USUARIO
    // ============================================

    console.log(`📩 Enviando confirmación a ${rawEmail}...`);

    const autoReply = await resend.emails.send({
      from: "Notificaciones <noreply@notificaciones.alexhl.me>",
      to: [rawEmail],
      subject: `Gracias por tu mensaje, ${rawName}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gracias por contactarme</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, Helvetica, sans-serif;color:#1f2937;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">

          <!-- HEADER (color sólido con bgcolor de respaldo, NO gradient) -->
          <tr>
            <td bgcolor="#111827" style="padding:32px;background-color:#111827;color:#ffffff;">
              <div style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#d1d5db;margin-bottom:10px;font-weight:600;">
                Portafolio
              </div>
              <div style="font-size:26px;font-weight:700;line-height:1.3;color:#ffffff;">
                ¡Gracias por escribirme, ${name}! 🚀
              </div>
              <div style="margin-top:10px;font-size:14px;color:#e5e7eb;">
                Recibí tu mensaje y te responderé lo antes posible.
              </div>
            </td>
          </tr>

          <!-- CONTENIDO -->
          <tr>
            <td style="padding:32px;">
              <div style="font-size:12px;font-weight:700;color:#4b5563;text-transform:uppercase;letter-spacing:1px;margin-bottom:18px;">
                Este fue tu mensaje
              </div>

              <div style="background-color:#f8fafc;border-left:4px solid #2563eb;border-radius:8px;padding:20px;font-size:15px;line-height:1.7;color:#1f2937;">
                ${message}
              </div>

              <div style="height:1px;background-color:#e5e7eb;margin:28px 0;"></div>

              <p style="font-size:14px;color:#4b5563;line-height:1.6;">
                Si quieres agregar algo más, puedes responder directamente a este correo.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td bgcolor="#f9fafb" style="padding:24px 32px;background-color:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
              <div style="font-size:13px;font-weight:600;color:#1f2937;">
                Alex Herbas
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
    });

    console.log("========== RESEND AUTO-REPLY ==========");
    console.log(JSON.stringify(autoReply, null, 2));
    console.log("=========================================");

    if (autoReply.error) {
      console.error("⚠️ Error enviando respuesta automática:", autoReply.error);
    } else {
      console.log("📩 Respuesta automática enviada:", autoReply.data?.id);
    }

    // ============================================
    // 3. RESPUESTA AL FRONTEND
    // ============================================

    return new Response(
      JSON.stringify({
        success: true,
        message: "Mensaje enviado correctamente",
        emailId: notification.data?.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("❌ ERROR GENERAL:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error enviando el correo"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
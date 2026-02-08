// src/pages/api/contact.ts
import type { APIRoute } from "astro";
import { MongoClient } from "mongodb";
import { MONGODB_URI, DB_NAME } from 'astro:env/server';
import { Resend } from "resend";
import { RESEND_API_KEY } from "astro:env/server";

export const POST: APIRoute = async ({ request }) => {
  let client;

  try {
    console.log("🚀 Iniciando la solicitud POST a /api/contact");

    // Obtener datos del formulario
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        success: false,
        message: "Faltan datos requeridos"
      }), { status: 400 });
    }

    console.log("✅ Datos del formulario recibidos:", { name, email, message });

    // ============================================
    // ✅ 1. Intentar guardar en MongoDB PERO NO FALLAR SI DA ERROR
    // ============================================
    try {
      console.log("🔌 Conectando a MongoDB...");
      client = new MongoClient(MONGODB_URI);
      await client.connect();

      const db = client.db(DB_NAME);
      const collection = db.collection("mewinPortfolio");

      const resultado = await collection.insertOne({
        nombre: name,
        correo: email,
        mensaje: message,
        fecha: new Date()
      });

      console.log("📝 Mensaje guardado en MongoDB:", resultado.insertedId);
    } catch (mongoError) {
      console.error("⚠️ No se pudo guardar en MongoDB, pero seguiremos:", mongoError);
    } finally {
      if (client) {
        await client.close();
        console.log("🔌 MongoDB cerrado");
      }
    }

    // ============================================
    // ✅ 2. Enviar correos aunque Mongo falle
    // ============================================
    const resend = new Resend(RESEND_API_KEY);

    // correo para ti
    await resend.emails.send({
      from: 'alex@alexhl.software',
      to: 'alexrodrigoherbas07@gmail.com',
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje desde tu portafolio 🚀</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    });
    console.log("📨 Correo enviado a Alex");

    // respuesta automática
    await resend.emails.send({
      from: 'alex@alexhl.software',
      to: email,
      subject: `Gracias por tu mensaje, ${name}`,
      html: `
        <h2>Hola ${name} 👋</h2>
        <p>Gracias por contactarme desde mi portafolio. Acabo de recibir tu mensaje:</p>
        <blockquote>${message}</blockquote>
        <p>Me pondré en contacto contigo lo antes posible.</p>
        <p>Un saludo,<br>Alex</p>
      `
    });
    console.log("📩 Respuesta automática enviada");

    // ============================================
    // RESPUESTA FINAL
    // ============================================
    return new Response(JSON.stringify({
      success: true,
      message: "Mensaje enviado correctamente (MongoDB opcional)"
    }), { status: 200 });

  } catch (err) {
    console.error("❌ Error inesperado:", err);

    return new Response(JSON.stringify({
      success: false,
      message: "Error inesperado procesando el formulario"
    }), { status: 500 });
  }
};

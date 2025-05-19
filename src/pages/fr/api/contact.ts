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
    
    // Validar datos
    if (!name || !email || !message) {
      console.error("❌ Datos de formulario incompletos:", { name, email, message });
      return new Response(
        JSON.stringify({ success: false, message: "Faltan datos requeridos" }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    console.log("✅ Datos del formulario recibidos:", { name, email, message });

    // Conectar a MongoDB
    console.log("🔌 Conectando a MongoDB...");
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Conexión a MongoDB establecida");
    
    // Insertar datos en la colección
    const db = client.db(DB_NAME);
    const collection = db.collection("mewinPortfolio");
    
    const resultado = await collection.insertOne({
      nombre: name,
      correo: email,
      mensaje: message,
      fecha: new Date()
    });
    console.log("📝 Mensaje guardado en MongoDB con ID:", resultado.insertedId);

    const resend = new Resend(RESEND_API_KEY);

// Enviar correo a ti mismo
await resend.emails.send({
  from: 'alex@alexhl.software',
  to: 'alexrodrigoherbas07@gmail.com',
  subject: `Nuevo mensaje de contacto de ${name}`,
  html: `
    <h2>Nouveau message de votre portfolio 🚀</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message}</p>
  `
});
console.log("📨 Correo enviado a Alex");

// Enviar respuesta automática al visitante
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
console.log("📩 Respuesta automática enviada al visitante");


    // console.log("📝 Mensaje guardado en MongoDB con ID:", resultado.insertedId);

    // Enviar mensaje al bot de WhatsApp
    // try {
    //   const mensajeParaBot = `mensaje desde tu portafolio:\n\n👤 Nombre: ${name}\n📧 Correo: ${email}\n💬 Mensaje: ${message}`;
      
    //   await fetch("http://localhost:3000/api/enviar-mensaje", { // cámbialo si tienes otro endpoint
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       numero: "521XXXXXXXXXX", // reemplázalo con tu número si tu bot lo necesita
    //       mensaje: mensajeParaBot
    //     })
    //   });

    //   console.log("📲 Mensaje enviado al bot de WhatsApp");
    // } catch (botError) {
    //   console.error("❌ Error al enviar el mensaje al bot de WhatsApp:", botError);
    // }


    
    
    // Respuesta exitosa
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Mensaje enviado y guardado correctamente" 
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("❌ Error procesando la solicitud:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Error al procesar el formulario" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  } finally {
    // Cerrar la conexión a MongoDB
    if (client) {
      await client.close();
      console.log("🔌 Conexión a MongoDB cerrada");
    }
  }
};
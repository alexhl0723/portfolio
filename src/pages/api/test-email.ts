/*
import type { APIRoute } from "astro";
import { RESEND_API_KEY } from "astro:env/server";
import { Resend } from "resend";

export const GET: APIRoute = async () => {
  const resend = new Resend(RESEND_API_KEY);

  const result = await resend.emails.send({
    from: "Notificaciones <noreply@notificaciones.alexhl.me>",
    to: ["alexrodrigoherbas07@gmail.com"],
    subject: "Prueba Resend desde Astro",
    html: "<h1>FUNCIONA BRO 🚀</h1>"
  });

  console.log("========== RESEND ==========");
  console.log(JSON.stringify(result, null, 2));
  console.log("============================");

  return new Response(
    JSON.stringify(result),
    {
      status: result.error ? 500 : 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
*/
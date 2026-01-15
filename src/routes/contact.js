import express from "express";
import { resend } from "../mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { subject, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      subject: `📩 ${subject}`,
      html: `
        <h3>Nuevo mensaje desde tu portafolio</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Error al enviar correo" });
  }
});

export default router;

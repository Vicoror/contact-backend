import express from "express";
import { transporter } from "../mailer.js";

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  const { subject, email, message } = req.body;

  // Validaciones
  if (!subject || !email || !message) {
    return res.status(400).json({ error: "Campos incompletos" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Correo inválido" });
  }

  try {
    console.log("ENV CHECK:", {
      user: !!process.env.GMAIL_USER,
      pass: !!process.env.GMAIL_PASS,
    });
    await transporter.sendMail({
      from: `"Portafolio" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `📩 ${subject}`,
      html: `
        <h3>Nuevo mensaje desde tu portafolio</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
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

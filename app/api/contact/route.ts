import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { IDEA_BOX_TYPE, PROJECT_TYPE_LABELS, formulaLabel } from "@/lib/contact";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { firstName, lastName, structureName, email, projectType, request: demande, message, website } =
    body as Record<string, string>;

  // Honeypot: a real visitor never fills this hidden field.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!firstName || !lastName || !structureName || !email || !PROJECT_TYPE_LABELS[projectType] || !message) {
    return NextResponse.json({ error: "Merci de remplir tous les champs requis." }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_APP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    console.error("SMTP_USER / SMTP_APP_PASSWORD are not configured.");
    return NextResponse.json({ error: "Le formulaire est momentanément indisponible." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const projectLabel = PROJECT_TYPE_LABELS[projectType] ?? "Non précisé";
  // Boîte à idées : pas de formule, le message contient l'idée.
  const isIdeaBox = projectType === IDEA_BOX_TYPE;
  const requestLabel = formulaLabel(projectType, demande) ?? "Non précisé";
  const structureLine = structureName ? `Structure : ${structureName}\n` : "";

  try {
    await transporter.sendMail({
      from: `"Satisa Formation" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `${isIdeaBox ? "Boîte à idées" : "Nouveau message du site"} - ${firstName} ${lastName}`,
      text: `Nom : ${firstName} ${lastName}\n${structureLine}Email : ${email}\nType de projet : ${projectLabel}\n${isIdeaBox ? "" : `Formule souhaitée : ${requestLabel}\n`}\n${message}`,
      html: `
        <p><strong>Nom :</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        ${structureName ? `<p><strong>Structure :</strong> ${escapeHtml(structureName)}</p>` : ""}
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Type de projet :</strong> ${escapeHtml(projectLabel)}</p>
        ${isIdeaBox ? "" : `<p><strong>Formule souhaitée :</strong> ${escapeHtml(requestLabel)}</p>`}
        <p><strong>${isIdeaBox ? "Idée" : "Message"} :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez ou écrivez directement à chris@satisa.fr." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

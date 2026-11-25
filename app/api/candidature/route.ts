import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { applicationMail, parseApplication } from "@/lib/application";
import { OFFRES } from "@/lib/offres";
import { creerLimiteur, evaluerAntiSpam } from "@/lib/rsRncp/antispam";

// Candidature à une offre, CV en pièce jointe. Rien n'est enregistré sur le site : tout part par e-mail.
// Protections : champ piège, délai minimal de soumission, limitation de débit (5 envois par adresse et par 10 minutes).
const limiter = creerLimiteur({ max: 5, fenetreMs: 10 * 60 * 1000 });

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "inconnu";
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Les champs sont vérifiés avant l'anti-spam : une erreur de saisie ne consomme pas le quota d'envois.
  const parsed = await parseApplication(form, OFFRES);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const verdict = evaluerAntiSpam(
    { piege: form.get("website"), delaiMs: Number(form.get("elapsedMs")), cle: clientKey(request) },
    limiter,
  );
  if (verdict === "honeypot") {
    return NextResponse.json({ ok: true });
  }
  if (verdict === "trop_rapide") {
    return NextResponse.json({ error: "Merci de patienter quelques secondes avant d'envoyer." }, { status: 400 });
  }
  if (verdict === "limite") {
    return NextResponse.json({ error: "Trop d'envois depuis votre connexion. Réessayez dans quelques minutes." }, { status: 429 });
  }

  const { application } = parsed;
  const recipient = application.offer.candidature.email;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_APP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    console.error("SMTP_USER / SMTP_APP_PASSWORD are not configured.");
    return NextResponse.json(
      { error: `Le formulaire est momentanément indisponible. Écrivez-nous à ${recipient}.` },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: `"Satisa Formation" <${smtpUser}>`,
      to: recipient,
      replyTo: application.email,
      ...applicationMail(application),
      attachments: [
        {
          filename: application.cv.filename,
          content: Buffer.from(application.cv.content),
          contentType: "application/pdf",
        },
      ],
    });
  } catch (error) {
    console.error("Failed to send application email:", error);
    return NextResponse.json({ error: `L'envoi a échoué. Réessayez ou écrivez à ${recipient}.` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

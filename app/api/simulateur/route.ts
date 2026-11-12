import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { calculer, erreurSimulation, euros, type Answers } from "@/lib/simulateur";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { answers, contact, website } = body as {
    answers?: Answers;
    contact?: Record<string, unknown>;
    website?: string;
  };

  // Champ piège : un vrai visiteur ne le remplit jamais.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const prenom = text(contact?.prenom, 100);
  const nom = text(contact?.nom, 100);
  const structure = text(contact?.structure, 150);
  const email = text(contact?.email, 200);
  const tel = text(contact?.tel, 40);

  if (!prenom || !nom || !structure) {
    return NextResponse.json({ error: "Indiquez vos prénom, nom et structure." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Indiquez une adresse email valide." }, { status: 400 });
  }
  if (!answers || typeof answers !== "object" || erreurSimulation(answers)) {
    return NextResponse.json({ error: "La simulation est incomplète. Refaites-la puis réessayez." }, { status: 400 });
  }

  // Le prix est toujours recalculé ici : on ne fait pas confiance à celui affiché dans le navigateur.
  const res = calculer(answers);
  if (!res) {
    return NextResponse.json({ error: "La simulation est incomplète. Refaites-la puis réessayez." }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_APP_PASSWORD;
  if (!smtpUser || !smtpPassword) {
    console.error("SMTP_USER / SMTP_APP_PASSWORD are not configured.");
    return NextResponse.json({ error: "Le formulaire est momentanément indisponible." }, { status: 500 });
  }

  const complete = res.cle === "complete";
  const plateforme =
    answers.plateforme === "oui"
      ? `${answers.plateformeNom} (${answers.configuree === "oui" ? "configurée" : "à configurer"})`
      : "Aucune";

  const lignes = [
    `Formule obtenue : ${res.formule}`,
    `Prix affiché : ${euros(res.total)}`,
    `Heures d'e-learning estimées : ${answers.heures} h`,
    `Contenu prêt à l'emploi : ${answers.pret === "oui" ? "Oui" : "Non"}`,
    `Référent métier disponible : ${answers.pret === "oui" ? "Non demandé" : answers.referent === "oui" ? "Oui" : "Non"}`,
    "",
    `Format : ${answers.format}`,
    `Formation séquencée : ${complete ? "Non demandé (inclus)" : answers.sequencee === "oui" ? "Oui" : `Non (durée totale : ${answers.duree} h)`}`,
    `Plateforme : ${complete ? "Non demandé (inclus)" : plateforme}`,
    `Détail : ${res.lignes.map((l) => `${l.libelle} = ${euros(l.montant)}`).join(" ; ")}`,
    "",
    `Contact : ${prenom} ${nom} · ${structure} · ${email}${tel ? ` · ${tel}` : ""}`,
    `Date : ${new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" })}`,
  ];
  const corps = lignes.join("\n");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: `"Satisa Formation" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `Simulation digitalisation · ${structure}`,
      text: corps,
      html: `<p>${escapeHtml(corps).replace(/\n/g, "<br>")}</p>`,
    });
  } catch (error) {
    console.error("Failed to send simulator email:", error);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou écrivez directement à chris@satisa.fr." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

// Candidature envoyée depuis la page « Nous rejoindre » : règles partagées entre le formulaire et l'API.

import type { Offre } from "./offres";

// Vercel refuse les requêtes de plus de 4,5 Mo : les fichiers (CV + portfolio) sont limités à 4 Mo au total
// pour laisser la place aux autres champs.
export const FILES_MAX_BYTES = 4 * 1024 * 1024;
export const FILES_MAX_LABEL = "4 Mo";

export const MESSAGE_MAX_LENGTH = 5000;
const FIELD_MAX_LENGTH = 300;

export type Application = {
  offer: Offre;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: string;
  duration: string;
  link: string;
  message: string;
  cv: { filename: string; content: Uint8Array };
  /** Portfolio en fichier PDF (facultatif : on peut aussi indiquer un lien). */
  portfolio?: { filename: string; content: Uint8Array };
};

type Result = { ok: true; application: Application } | { ok: false; error: string };

const fail = (error: string): Result => ({ ok: false, error });

// Nom de fichier de la pièce jointe : lettres, chiffres, espaces et quelques signes seulement.
const safeName = (prefix: string, firstName: string, lastName: string) =>
  `${prefix} - ${firstName} ${lastName}`.replace(/[^\p{L}\p{N} ._-]/gu, "").slice(0, 100);

export async function parseApplication(form: FormData, offers: Offre[]): Promise<Result> {
  // Les champs courts tiennent sur une ligne : un retour à la ligne ne doit pas atteindre l'objet de l'e-mail.
  const text = (name: string) => {
    const value = form.get(name);
    return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";
  };

  const offer = offers.find((item) => item.id === text("offerId"));
  if (!offer) return fail("Cette offre n'est plus ouverte.");

  const firstName = text("firstName");
  const lastName = text("lastName");
  const email = text("email");
  const phone = text("phone");
  const startDate = text("startDate");
  const duration = text("duration");
  const link = text("link");
  const rawMessage = form.get("message");
  const message = typeof rawMessage === "string" ? rawMessage.trim() : "";

  if (!firstName || !lastName || !email || !phone || !startDate || !duration || !message) {
    return fail("Merci de remplir tous les champs requis.");
  }
  if ([firstName, lastName, email, phone, link].some((value) => value.length > FIELD_MAX_LENGTH)) {
    return fail("Un des champs est trop long.");
  }
  if (message.length > MESSAGE_MAX_LENGTH) return fail("Votre message est trop long.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("L'adresse e-mail n'est pas valide.");
  if (!/^\+?[\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 8) {
    return fail("Le numéro de téléphone n'est pas valide.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || Number.isNaN(Date.parse(startDate))) {
    return fail("La date de début n'est pas valide.");
  }
  if (!offer.candidature.durees.includes(duration)) return fail("La durée choisie n'est pas proposée pour cette offre.");

  const file = form.get("cv");
  if (!(file instanceof Blob) || file.size === 0) return fail("Merci de joindre votre CV au format PDF.");
  const portfolioFile = form.get("portfolio");
  const hasPortfolio = portfolioFile instanceof Blob && portfolioFile.size > 0;
  const totalSize = file.size + (hasPortfolio ? portfolioFile.size : 0);
  if (totalSize > FILES_MAX_BYTES) return fail(`Vos fichiers dépassent ${FILES_MAX_LABEL} au total.`);
  const content = new Uint8Array(await file.arrayBuffer());
  // On vérifie la signature du fichier : l'extension seule ne prouve pas qu'il s'agit d'un PDF.
  if (new TextDecoder().decode(content.subarray(0, 5)) !== "%PDF-") return fail("Votre CV doit être un fichier PDF.");

  let portfolio: Application["portfolio"];
  if (hasPortfolio) {
    const portfolioContent = new Uint8Array(await portfolioFile.arrayBuffer());
    if (new TextDecoder().decode(portfolioContent.subarray(0, 5)) !== "%PDF-") {
      return fail("Votre portfolio doit être un fichier PDF.");
    }
    portfolio = { filename: `${safeName("Portfolio", firstName, lastName)}.pdf`, content: portfolioContent };
  }

  const filename = safeName("CV", firstName, lastName);

  return {
    ok: true,
    application: {
      offer,
      firstName,
      lastName,
      email,
      phone,
      startDate,
      duration,
      link,
      message,
      cv: { filename: `${filename}.pdf`, content },
      ...(portfolio ? { portfolio } : {}),
    },
  };
}

export function applicationMail({ offer, firstName, lastName, email, phone, startDate, duration, link, message, portfolio }: Application) {
  const [year, month, day] = startDate.split("-");
  const lines = [
    `Offre : ${offer.titre} (${offer.type})`,
    `Nom : ${firstName} ${lastName}`,
    `E-mail : ${email}`,
    `Téléphone : ${phone}`,
    `Début souhaité : ${day}/${month}/${year}`,
    `Durée souhaitée : ${duration}`,
    ...(link ? [`Lien LinkedIn / portfolio : ${link}`] : []),
    ...(portfolio ? ["Portfolio : en pièce jointe (PDF)"] : []),
    "",
    message,
  ];
  return { subject: `${offer.candidature.objet} - ${firstName} ${lastName}`, text: lines.join("\n") };
}

// Outil « RS ou RNCP ? » : envoi de la demande PAR E-MAIL à Satisa, comme le simulateur de prix et le formulaire de contact.
//
// Utilisé en production quand aucun webhook n'est configuré mais que la messagerie du site l'est (SMTP_USER et
// SMTP_APP_PASSWORD) : la demande arrive dans la boîte de Satisa, avec le résultat et les réponses au test.
// Ce fichier ne connaît ni nodemailer ni l'environnement : la fonction d'envoi est passée en paramètre.

import type { AdaptateurDemande, DemandePayload } from "./demande";
import type { Config } from "./types";

export type Courriel = { from: string; to: string; replyTo: string; subject: string; text: string; html: string };
export type EnvoiCourriel = (courriel: Courriel) => Promise<unknown>;

function echapper(valeur: string): string {
  return valeur.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function uneLigne(valeur: string): string {
  return valeur.replace(/[\r\n]+/g, " ").trim();
}

/** Construit l'e-mail reçu par Satisa : contact, résultat, réponses au test et preuve du consentement. */
export function construireCourriel(
  payload: DemandePayload,
  config: Config,
  adresses: { expediteur: string; destinataire: string },
): Courriel {
  const { contact, resultat } = payload;
  const date = new Date(payload.date).toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

  const reponses = config.questions.map((question) => {
    const choix = question.options.find((option) => option.value === payload.reponses[question.id]);
    return `${question.titre} : ${choix ? choix.label : "non renseignée"}`;
  });

  const lignes = [
    "Nouvelle demande depuis le test « RS ou RNCP ? »",
    "",
    `Contact : ${contact.prenom} ${contact.nom} · ${contact.structure} · ${contact.email}${contact.telephone ? ` · ${contact.telephone}` : ""}`,
    `Date : ${date}`,
    "",
    `Résultat : ${resultat.verdictTitre}`,
    `Niveau de préparation : ${resultat.preparationLabel}`,
    `Formule recommandée : ${resultat.formule.nom} (${resultat.formule.prixTexte})`,
    `Durée indicative : ${resultat.dureeIndicative}`,
    "",
    "Pourquoi ce résultat :",
    ...resultat.raisons.map((raison) => `- ${raison}`),
    ...(resultat.vigilances.length > 0 ? ["", "Points de vigilance :", ...resultat.vigilances.map((vigilance) => `- ${vigilance}`)] : []),
    "",
    "Réponses au test :",
    ...reponses.map((ligne) => `- ${ligne}`),
    "",
    `Lien du résultat : ${payload.lienResultat}`,
    `Consentement : accepté le ${date} (« ${payload.consentement.texte} »)`,
    `Version des règles : ${payload.versionRegles}`,
  ];
  const corps = lignes.join("\n");

  return {
    from: adresses.expediteur,
    to: adresses.destinataire,
    replyTo: contact.email,
    subject: uneLigne(`Test RS ou RNCP · ${contact.structure}`),
    text: corps,
    html: `<p>${echapper(corps).replace(/\n/g, "<br>")}</p>`,
  };
}

/** Adaptateur « e-mail » : envoie la demande à Satisa par la messagerie du site. */
export function adaptateurCourriel(options: {
  envoyer: EnvoiCourriel;
  config: Config;
  expediteur: string;
  destinataire: string;
}): AdaptateurDemande {
  return {
    nom: "courriel",
    async envoyer(payload) {
      try {
        await options.envoyer(
          construireCourriel(payload, options.config, { expediteur: options.expediteur, destinataire: options.destinataire }),
        );
        return { ok: true };
      } catch (erreur) {
        return { ok: false, erreur: `Envoi du courriel impossible : ${erreur instanceof Error ? erreur.name : "erreur inconnue"}.` };
      }
    },
  };
}

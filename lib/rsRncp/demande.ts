// Outil « RS ou RNCP ? » : demande de contact faite APRÈS l'affichage du résultat.
//
// Une seule interface, `envoyerDemande(payload)`, avec plusieurs implémentations interchangeables :
//   - en développement : un adaptateur SIMULÉ, qui journalise la demande dans la console et dans un fichier local
//     (`.data/rs-ou-rncp-demandes.jsonl`, ignoré par git) ;
//   - en production : un adaptateur WEBHOOK, dont l'URL vient de la variable d'environnement SATISA_WEBHOOK_URL
//     (voir AUTOMATION.md pour le brancher à Make, n8n ou Zapier) ;
//   - en production sans webhook : un adaptateur E-MAIL (courriel.ts), si la messagerie du site est configurée.
// Ce fichier ne connaît ni le moteur de règles ni l'interface : les dépendances sont passées en paramètre.

import type { Answers, Config, Resultat } from "./types";

const REGEX_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Mêmes champs que le formulaire du simulateur de prix : prénom, nom, structure et e-mail obligatoires, téléphone facultatif.
export type ContactDemande = { prenom: string; nom: string; structure: string; email: string; telephone: string };

/** Contenu envoyé à l'outil d'automatisation. Schéma documenté dans AUTOMATION.md. */
export type DemandePayload = {
  type: "demande_rs_ou_rncp";
  versionPayload: 1;
  versionRegles: string;
  date: string;
  pageOrigine: string;
  contact: ContactDemande;
  consentement: { accepte: true; date: string; texte: string };
  reponses: Answers;
  resultat: {
    verdict: string;
    verdictTitre: string;
    preparation: string;
    preparationLabel: string;
    dureeIndicative: string;
    formule: { cle: string; nom: string; prixTexte: string; prixMin: number; prixMax: number };
    raisons: string[];
    vigilances: string[];
  };
  lienResultat: string;
};

export type ResultatEnvoi = { ok: true } | { ok: false; erreur: string };

export interface AdaptateurDemande {
  nom: string;
  envoyer(payload: DemandePayload): Promise<ResultatEnvoi>;
}

export const TEXTE_CONSENTEMENT =
  "J'accepte que Satisa Formation utilise ces informations pour me recontacter au sujet de ma demande.";

function texte(valeur: unknown, max: number): string {
  return typeof valeur === "string" ? valeur.trim().slice(0, max) : "";
}

export type ContexteConstruction = {
  config: Config;
  evaluer: (reponses: unknown) => Resultat | null;
  encoder: (reponses: Answers) => string | null;
  /** Adresse de la page de l'outil, sans « # » (ex. https://www.satisa-formation.fr/…/rs-ou-rncp). */
  pageOrigine: string;
  maintenant?: () => Date;
};

export type ConstructionDemande = { ok: true; payload: DemandePayload } | { ok: false; erreur: string };

/**
 * Valide les champs envoyés par le navigateur et construit la demande.
 * Le verdict est TOUJOURS recalculé ici à partir des réponses : on ne fait pas confiance à celui affiché dans le navigateur.
 */
export function construireDemande(brut: unknown, contexte: ContexteConstruction): ConstructionDemande {
  if (!brut || typeof brut !== "object") return { ok: false, erreur: "Requête invalide." };
  const donnees = brut as Record<string, unknown>;

  const prenom = texte(donnees.prenom, 100);
  const nom = texte(donnees.nom, 100);
  const structure = texte(donnees.structure, 150);
  if (!prenom || !nom || !structure) return { ok: false, erreur: "Indiquez vos prénom, nom et structure." };
  const email = texte(donnees.email, 200);
  if (!REGEX_EMAIL.test(email)) return { ok: false, erreur: "Indiquez une adresse e-mail valide." };
  if (donnees.consentement !== true) return { ok: false, erreur: "Merci de cocher la case de consentement." };

  const resultat = contexte.evaluer(donnees.reponses);
  if (!resultat) return { ok: false, erreur: "Le test est incomplet. Refaites-le puis réessayez." };
  const reponses = donnees.reponses as Answers;

  const maintenant = (contexte.maintenant ?? (() => new Date()))();
  const code = contexte.encoder(reponses);
  const lienResultat = code ? `${contexte.pageOrigine}#r=${code}` : contexte.pageOrigine;

  return {
    ok: true,
    payload: {
      type: "demande_rs_ou_rncp",
      versionPayload: 1,
      versionRegles: resultat.versionRegles,
      date: maintenant.toISOString(),
      pageOrigine: contexte.pageOrigine,
      contact: { prenom, nom, structure, email, telephone: texte(donnees.telephone, 40) },
      consentement: { accepte: true, date: maintenant.toISOString(), texte: TEXTE_CONSENTEMENT },
      reponses,
      resultat: {
        verdict: resultat.verdict,
        verdictTitre: resultat.titre,
        preparation: resultat.preparation,
        preparationLabel: resultat.preparationLabel,
        dureeIndicative: resultat.dureeIndicative,
        formule: {
          cle: resultat.formule.cle,
          nom: resultat.formule.nom,
          prixTexte: resultat.formule.prixTexte,
          prixMin: resultat.formule.prixMin,
          prixMax: resultat.formule.prixMax,
        },
        raisons: resultat.raisons,
        vigilances: resultat.vigilances,
      },
      lienResultat,
    },
  };
}

// ---------- Adaptateurs ----------

/** Adaptateur de développement : journalise dans la console et dans un fichier local. Aucun envoi réel. */
export function adaptateurSimule(options: {
  ecrire: (fichier: string, objet: unknown) => Promise<void>;
  journal?: (message: string) => void;
}): AdaptateurDemande {
  const journal = options.journal ?? ((message: string) => console.info(message));
  return {
    nom: "simule",
    async envoyer(payload) {
      journal(`[rs-ou-rncp] Demande simulée (aucun envoi réel) : ${payload.contact.email}, verdict ${payload.resultat.verdict}`);
      try {
        await options.ecrire("rs-ou-rncp-demandes.jsonl", payload);
      } catch (erreur) {
        journal(`[rs-ou-rncp] Écriture du journal local impossible : ${String(erreur)}`);
      }
      return { ok: true };
    },
  };
}

/** Adaptateur de production : envoie la demande à l'URL du webhook, avec un secret facultatif. */
export function adaptateurWebhook(options: {
  url: string;
  secret?: string;
  delaiMs?: number;
  fetchImpl?: typeof fetch;
}): AdaptateurDemande {
  const fetchImpl = options.fetchImpl ?? fetch;
  return {
    nom: "webhook",
    async envoyer(payload) {
      const controleur = new AbortController();
      const minuteur = setTimeout(() => controleur.abort(), options.delaiMs ?? 8000);
      try {
        const reponse = await fetchImpl(options.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(options.secret ? { "X-Satisa-Secret": options.secret } : {}),
          },
          body: JSON.stringify(payload),
          signal: controleur.signal,
        });
        if (!reponse.ok) return { ok: false, erreur: `Le webhook a répondu ${reponse.status}.` };
        return { ok: true };
      } catch (erreur) {
        return { ok: false, erreur: `Envoi au webhook impossible : ${erreur instanceof Error ? erreur.name : "erreur inconnue"}.` };
      } finally {
        clearTimeout(minuteur);
      }
    },
  };
}

/** Adaptateur de dernier recours : en production sans webhook configuré, on refuse proprement. */
export function adaptateurIndisponible(): AdaptateurDemande {
  return {
    nom: "indisponible",
    async envoyer() {
      return { ok: false, erreur: "Le service d'envoi n'est pas configuré." };
    },
  };
}

type Environnement = Record<string, string | undefined>;

/**
 * Choisit l'adaptateur :
 *   - webhook si l'URL est définie ;
 *   - en production sans webhook : e-mail si la messagerie du site est configurée, sinon « indisponible » ;
 *   - hors production : simulé (jamais d'e-mail réel pendant le développement).
 */
export function choisirAdaptateur(
  env: Environnement,
  ecrire: (fichier: string, objet: unknown) => Promise<void>,
  courriel?: () => AdaptateurDemande | null,
): AdaptateurDemande {
  const url = env.SATISA_WEBHOOK_URL;
  if (url) return adaptateurWebhook({ url, secret: env.SATISA_WEBHOOK_SECRET });
  if (env.NODE_ENV !== "production") return adaptateurSimule({ ecrire });
  return courriel?.() ?? adaptateurIndisponible();
}

/** Interface unique : envoie la demande avec l'adaptateur choisi. */
export async function envoyerDemande(payload: DemandePayload, adaptateur: AdaptateurDemande): Promise<ResultatEnvoi> {
  return adaptateur.envoyer(payload);
}

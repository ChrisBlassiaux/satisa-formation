// Outil « RS ou RNCP ? » : statistiques ANONYMES, sans cookie et sans donnée personnelle.
//
// Le navigateur envoie de petits événements (démarrage, question atteinte, test terminé, demande de contact).
// Ils ne contiennent ni adresse e-mail, ni réponse détaillée, ni adresse IP : seulement le nom de l'événement,
// un identifiant aléatoire de PARCOURS (créé en mémoire pour un test, jamais stocké dans le navigateur, jamais
// relié à une personne) et, selon le cas, la question atteinte ou le verdict obtenu.
//
// Ces chiffres répondent à : combien de tests démarrés / terminés, quels verdicts, quelles questions font
// abandonner, combien de demandes de contact. Le script `scripts/stats-rs-ou-rncp.mjs` les résume.

import type { Config, PreparationCle, QuestionId, VerdictCle } from "./types";

export type NomEvenement = "demarrage" | "question" | "termine" | "demande";

export type Evenement = {
  evt: NomEvenement;
  /** Identifiant aléatoire du parcours (lettres minuscules, chiffres et tirets, 8 à 40 caractères). */
  run: string;
  /** Question atteinte (événement « question »). */
  q?: QuestionId;
  verdict?: VerdictCle;
  preparation?: PreparationCle;
};

export type EvenementEnregistre = Evenement & { date: string };

const NOMS: NomEvenement[] = ["demarrage", "question", "termine", "demande"];
const VERDICTS: VerdictCle[] = ["rncp", "rs", "deux", "pas_pret"];
const NIVEAUX: PreparationCle[] = ["pret", "presque_pret", "a_construire"];

export type ValidationEvenement = { ok: true; evenement: Evenement } | { ok: false };

export function validerEvenement(brut: unknown, config: Config): ValidationEvenement {
  if (!brut || typeof brut !== "object") return { ok: false };
  const donnees = brut as Record<string, unknown>;
  const evt = donnees.evt;
  const run = donnees.run;
  if (typeof evt !== "string" || !NOMS.includes(evt as NomEvenement)) return { ok: false };
  if (typeof run !== "string" || !/^[a-z0-9-]{8,40}$/.test(run)) return { ok: false };

  const evenement: Evenement = { evt: evt as NomEvenement, run };

  if (evt === "question") {
    if (!config.questions.some((question) => question.id === donnees.q)) return { ok: false };
    evenement.q = donnees.q as QuestionId;
  }
  if (evt === "termine" || evt === "demande") {
    if (typeof donnees.verdict !== "string" || !VERDICTS.includes(donnees.verdict as VerdictCle)) return { ok: false };
    evenement.verdict = donnees.verdict as VerdictCle;
    if (typeof donnees.preparation === "string" && NIVEAUX.includes(donnees.preparation as PreparationCle)) {
      evenement.preparation = donnees.preparation as PreparationCle;
    }
  }
  return { ok: true, evenement };
}

export interface AdaptateurEvenements {
  nom: string;
  enregistrer(evenement: EvenementEnregistre): Promise<void>;
}

type Environnement = Record<string, string | undefined>;

/**
 * Choisit où vont les statistiques :
 *   - développement : fichier local `.data/rs-ou-rncp-evenements.jsonl` ;
 *   - production avec SATISA_STATS_WEBHOOK_URL : envoi à cette adresse ;
 *   - production sans URL : une ligne JSON dans les journaux du serveur (visibles dans le tableau de bord de l'hébergeur).
 */
export function choisirAdaptateurEvenements(
  env: Environnement,
  ecrire: (fichier: string, objet: unknown) => Promise<void>,
  journal: (message: string) => void = (message) => console.info(message),
  fetchImpl: typeof fetch = fetch,
): AdaptateurEvenements {
  const url = env.SATISA_STATS_WEBHOOK_URL;
  if (url) {
    return {
      nom: "webhook",
      async enregistrer(evenement) {
        try {
          await fetchImpl(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "evenement_rs_ou_rncp", ...evenement }),
          });
        } catch {
          // Une statistique perdue ne doit jamais gêner un visiteur.
        }
      },
    };
  }
  if (env.NODE_ENV !== "production") {
    return {
      nom: "fichier-local",
      async enregistrer(evenement) {
        try {
          await ecrire("rs-ou-rncp-evenements.jsonl", evenement);
        } catch {
          // Idem : jamais d'erreur visible pour une statistique.
        }
      },
    };
  }
  return {
    nom: "journal-serveur",
    async enregistrer(evenement) {
      journal(`[rs-ou-rncp-stat] ${JSON.stringify(evenement)}`);
    },
  };
}

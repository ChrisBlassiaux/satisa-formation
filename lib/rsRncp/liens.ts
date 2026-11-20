// Outil « RS ou RNCP ? » : où mène le bouton « Voir cette formule » du résultat.
//
// On ouvre la page d'offre du bon répertoire (RNCP ou RS), directement sur la formule recommandée
// (ancres « offre-… » des pages Dépôt RNCP et Dépôt RS, ouvertes par components/OfferAccordion.tsx).
// Quand le résultat n'oriente vers aucun répertoire en particulier (« les deux » ou « pas encore prêt »),
// on suit la tendance des scores, et à égalité on choisit le RNCP.

import type { FormuleCle, Resultat } from "./types";

export const ANCRES_FORMULES: Record<FormuleCle, string> = {
  diagnostic: "offre-diagnostic",
  guidee: "offre-guidee",
  pilotee: "offre-pilotee",
};

export function lienFormule(
  resultat: Pick<Resultat, "verdict" | "scores"> & { formule: Pick<Resultat["formule"], "cle"> },
  pages: { rncp: string; rs: string },
): string {
  const verslRs =
    resultat.verdict === "rs" || (resultat.verdict !== "rncp" && resultat.scores.rs > resultat.scores.rncp);
  return `${verslRs ? pages.rs : pages.rncp}#${ANCRES_FORMULES[resultat.formule.cle]}`;
}

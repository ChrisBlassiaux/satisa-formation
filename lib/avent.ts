// Calendrier de l'Avent (page temporaire, non indexée) : ce que le navigateur a le droit de connaître. Les textes des
// cases sont dans lib/aventCases.ts et ne partent vers le navigateur qu'une fois leur jour arrivé.

export const ANNEE_AVENT = 2026;
export const NOMBRE_CASES = 24;

export type TypeCase = "guide" | "checklist" | "modele" | "infographie" | "video" | "outil" | "citation" | "offre";

export const TYPE_LABELS: Record<TypeCase, string> = {
  guide: "Guide",
  checklist: "Checklist",
  modele: "Modèle",
  infographie: "Infographie",
  video: "Vidéo",
  outil: "Outil",
  citation: "Citation",
  offre: "Offre",
};

export type CaseAvent = {
  jour: number;
  type: TypeCase;
  titre: string;
  texte: string;
  /** `href: null` = ressource pas encore disponible (bouton désactivé). `telechargement` : le lien est un fichier. */
  cta: { label: string; href: string | null; telechargement?: boolean } | null;
};

/** Réponse de la route du calendrier : seules les cases dont le jour est arrivé y figurent. */
export type EtatCalendrier = {
  /** 0 avant le 1er décembre, de 1 à 24 en décembre, 25 ensuite. */
  jour: number;
  cases: CaseAvent[];
  /** Vrai en local et sur l'aperçu Vercel : la date peut être simulée. */
  simulationPossible: boolean;
};

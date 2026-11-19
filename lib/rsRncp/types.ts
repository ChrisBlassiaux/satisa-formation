// Outil « RS ou RNCP ? » : types partagés (moteur, interface, API). Aucun code exécutable ici.

export type QuestionId =
  | "objectif"
  | "nature"
  | "duree"
  | "public"
  | "referentiel"
  | "promotion"
  | "insertion"
  | "jury"
  | "temps"
  | "delai";

/** Réponses du visiteur : identifiant de question → valeur de l'option choisie. */
export type Answers = Partial<Record<QuestionId, string>>;

export type Option = { value: string; label: string };

export type Question = {
  id: QuestionId;
  titre: string;
  /** Aide « Pourquoi cette question ? », en langage simple. */
  pourquoi: string;
  options: Option[];
};

export type Repertoire = "rncp" | "rs";
export type VerdictCle = "rncp" | "rs" | "deux" | "pas_pret";
export type PreparationCle = "pret" | "presque_pret" | "a_construire";
export type FormuleCle = "diagnostic" | "guidee" | "pilotee";

/** Texte qui dépend du répertoire visé : `commun` s'applique dans tous les cas. */
export type TexteSelonRepertoire = { commun?: string; rncp?: string; rs?: string };

/** Traçabilité d'une règle : d'où elle vient, quand elle a été vérifiée, et si Chris doit la valider. */
export type Tracabilite = {
  source: string;
  verifieLe: string;
  aValiderParChris: boolean;
  /** Pourquoi la règle est à valider (facultatif). */
  noteValidation?: string;
};

export type Effets = {
  /** Points en faveur du RNCP / du RS (peuvent être négatifs). */
  rncp?: number;
  rs?: number;
  /** Points de préparation (0 à 7 au total). */
  preparation?: number;
  raison?: TexteSelonRepertoire;
  vigilance?: TexteSelonRepertoire;
  /** Ce qui manque pour déposer, avec une priorité (1 = le plus urgent). Un manque « bloquant » plafonne la préparation. */
  manque?: { texte: string; priorite: number };
  /** Une exclusion rend le projet inéligible en l'état (verdict « pas encore prêt »). */
  exclusion?: string;
  /** Poids de la règle dans l'affichage des raisons (plus grand = affiché en premier). */
  priorite?: number;
};

export type Regle = Tracabilite & {
  id: string;
  /** Conditions combinées par ET : chaque question doit avoir l'une des valeurs listées. */
  quand: Partial<Record<QuestionId, string[]>>;
  effets: Effets;
};

export type TexteVerdict = {
  titre: string;
  resume: string;
  /** Cas « les deux » : ce qui permet de trancher. */
  critere?: string;
  /** Raison affichée quand aucune règle n'apporte de raison : un résultat n'est jamais vide. */
  raisonParDefaut: string;
};

export type TextePreparation = { label: string; texte: string };

export type OffreConfig = {
  nom: string;
  /** Sous-titre de l'offre, tel qu'affiché sur les pages Dépôt RNCP et Dépôt RS. */
  sousTitre: string;
  description: string;
  /** Prix en euros HT. Un nombre pour un prix unique, ou un prix par répertoire. */
  prix: number | { rncp: number; rs: number };
};

export type Config = {
  version: string;
  questions: Question[];
  regles: Regle[];
  /** Points de préparation à atteindre pour être « prêt » ou « presque prêt ». */
  seuilsPreparation: { pret: number; presquePret: number };
  /** Écart minimal de points pour recommander un seul répertoire. */
  ecartMinimal: number;
  /** Un manque de priorité inférieure ou égale à ce seuil est « bloquant » : la préparation reste « à construire ». */
  blocageJusqua: number;
  /** « Pas encore prêt » dès que ce nombre de manques bloquants est atteint (ou en cas d'exclusion). */
  pasPretSiBloquants: number;
  verdicts: Record<VerdictCle, TexteVerdict>;
  preparation: Record<PreparationCle, TextePreparation>;
  /** Formule recommandée selon le niveau de préparation et le temps interne disponible. */
  formules: {
    parDefaut: FormuleCle;
    parNiveau: Partial<Record<PreparationCle, FormuleCle | Record<string, FormuleCle>>>;
  };
  offres: Record<FormuleCle, OffreConfig>;
  durees: Record<Repertoire, string>;
  duree: { apresDiagnostic: string };
  avertissement: string;
  fraisDepot: string;
};

export type Formule = {
  cle: FormuleCle;
  nom: string;
  sousTitre: string;
  description: string;
  /** Prix lisible, par exemple « 5 000 € HT » ou « 4 000 € à 5 000 € HT ». */
  prixTexte: string;
  /** Montant minimal en euros HT (utile pour les statistiques et l'automatisation). */
  prixMin: number;
  prixMax: number;
};

export type Resultat = {
  verdict: VerdictCle;
  titre: string;
  resume: string;
  critere?: string;
  preparation: PreparationCle;
  preparationLabel: string;
  preparationTexte: string;
  /** Trois raisons au maximum. Pour « pas encore prêt », ce sont les manques par ordre de priorité. */
  raisons: string[];
  vigilances: string[];
  dureeIndicative: string;
  formule: Formule;
  avertissement: string;
  fraisDepot: string;
  /** Scores bruts, utiles aux tests et à l'automatisation. */
  scores: { rncp: number; rs: number; preparation: number };
  versionRegles: string;
};

// Simulateur de prix de digitalisation : paramètres, règles de calcul et validation.
// Partagé entre le composant (affichage) et la route serveur (qui recalcule toujours le prix elle-même).

export type YesNo = "oui" | "non";
export type FormuleKey = "essentielle" | "coconstruite" | "complete";

export type Answers = {
  format?: string;
  heures?: number;
  pret?: YesNo;
  referent?: YesNo;
  sequencee?: YesNo;
  duree?: number;
  plateforme?: YesNo;
  plateformeNom?: string;
  configuree?: YesNo;
};

export const FORMATS = ["100 % e-learning", "Blended"] as const;
export const PLATEFORMES = ["Moodle", "Teachizy", "Digiforma", "360Learning", "Autre"] as const;

export const PARAMS = {
  tarifBase: 130, // € HT par heure d'e-learning
  integration: 0.15, // part du tarif de base, incluse dans toutes les formules
  arrondiHoraire: 10, // arrondi du prix horaire
  minimumHeures: 20, // minimum facturé par projet
  formules: {
    essentielle: { nom: "Essentielle", coef: 0.65, finTranche1: 20, finTranche2: 40, remiseTranche2: 0.15, remiseTranche3: 0.25 },
    coconstruite: { nom: "Co-construite", coef: 1, finTranche1: 20, finTranche2: 40, remiseTranche2: 0.15, remiseTranche3: 0.25 },
    complete: { nom: "Complète", coef: 3, finTranche1: 20, finTranche2: 40, remiseTranche2: 0.25, remiseTranche3: 0.35 },
  },
  sequencage: { finTranche1: 100, finTranche2: 300, prix: [900, 1500, 2400] }, // selon la durée totale de la formation
  configuration: { simple: 400, avancee: 800, plateformesAvancees: ["Moodle"] },
  accompagnementMois: 3,
} as const;

type FormuleParams = (typeof PARAMS.formules)[FormuleKey];

function arrondir(valeur: number, pas: number) {
  return Math.round(valeur / pas) * pas;
}

export function determinerFormule(r: Answers): FormuleKey | null {
  if (r.pret === "oui") return "essentielle";
  if (r.pret === "non" && r.referent === "oui") return "coconstruite";
  if (r.pret === "non" && r.referent === "non") return "complete";
  return null;
}

function prixHoraire(f: FormuleParams) {
  return arrondir(PARAMS.tarifBase * (f.coef + PARAMS.integration), PARAMS.arrondiHoraire);
}

function montantDigitalisation(heures: number, f: FormuleParams) {
  const h = Math.max(heures, PARAMS.minimumHeures);
  const t1 = Math.min(h, f.finTranche1);
  const t2 = Math.max(0, Math.min(h, f.finTranche2) - f.finTranche1);
  const t3 = Math.max(0, h - f.finTranche2);
  return prixHoraire(f) * (t1 + t2 * (1 - f.remiseTranche2) + t3 * (1 - f.remiseTranche3));
}

function prixSequencage(duree: number) {
  const s = PARAMS.sequencage;
  if (duree <= s.finTranche1) return s.prix[0];
  if (duree <= s.finTranche2) return s.prix[1];
  return s.prix[2];
}

export type Ligne = { libelle: string; montant: number };
export type Resultat = {
  cle: FormuleKey;
  formule: string;
  lignes: Ligne[];
  supplementsInclus: string[];
  total: number;
};

export function calculer(r: Answers): Resultat | null {
  const cle = determinerFormule(r);
  if (!cle || !r.heures) return null;
  const f = PARAMS.formules[cle];
  const heures = r.heures;
  const lignes: Ligne[] = [];

  lignes.push({
    libelle:
      `Digitalisation · ${heures} h d'e-learning` +
      (heures < PARAMS.minimumHeures ? ` (minimum facturé : ${PARAMS.minimumHeures} h)` : ""),
    montant: Math.round(montantDigitalisation(heures, f)),
  });

  const supplementsInclus: string[] = [];
  if (cle === "complete") {
    supplementsInclus.push(
      "Séquençage et scénarisation",
      "Configuration de la plateforme",
      `Formation à la plateforme + accompagnement ${PARAMS.accompagnementMois} mois`,
    );
  } else {
    if (r.sequencee === "non") {
      lignes.push({ libelle: "Séquençage et scénarisation", montant: prixSequencage(r.duree ?? 0) });
    }
    if (r.plateforme === "non" || r.configuree === "non") {
      const avancee = (PARAMS.configuration.plateformesAvancees as readonly string[]).includes(r.plateformeNom ?? "");
      lignes.push({
        libelle: "Configuration de la plateforme" + (avancee ? " (avancée)" : ""),
        montant: avancee ? PARAMS.configuration.avancee : PARAMS.configuration.simple,
      });
    }
  }

  return {
    cle,
    formule: f.nom,
    lignes,
    supplementsInclus,
    total: lignes.reduce((somme, ligne) => somme + ligne.montant, 0),
  };
}

const MAX_HEURES = 2000;

function nombreValide(valeur: unknown, max: number): valeur is number {
  return typeof valeur === "number" && Number.isFinite(valeur) && valeur > 0 && valeur <= max;
}

// Retourne un message d'erreur pour l'étape donnée, ou une chaîne vide si tout est renseigné.
export function erreurEtape(step: 1 | 2 | 3, r: Answers): string {
  if (step === 1) {
    if (!r.format || !(FORMATS as readonly string[]).includes(r.format)) return "Choisissez le format de la formation.";
    if (!nombreValide(r.heures, MAX_HEURES)) return "Indiquez un nombre d'heures d'e-learning.";
  }
  if (step === 2) {
    if (!r.pret) return "Indiquez si vos contenus sont prêts.";
    if (r.pret === "non" && !r.referent) return "Indiquez si une personne de votre équipe peut répondre à nos questions.";
  }
  if (step === 3) {
    if (!r.sequencee) return "Indiquez si votre formation est déjà découpée en séquences.";
    if (r.sequencee === "non" && !nombreValide(r.duree, MAX_HEURES)) return "Indiquez la durée totale de la formation.";
    if (!r.plateforme) return "Indiquez si vous avez déjà une plateforme.";
    if (r.plateforme === "oui" && (!r.plateformeNom || !(PLATEFORMES as readonly string[]).includes(r.plateformeNom) || !r.configuree)) {
      return "Précisez votre plateforme et si elle est configurée.";
    }
  }
  return "";
}

// Validation complète d'une simulation (utilisée par la route serveur).
export function erreurSimulation(r: Answers): string {
  const e12 = erreurEtape(1, r) || erreurEtape(2, r);
  if (e12) return e12;
  return determinerFormule(r) === "complete" ? "" : erreurEtape(3, r);
}

export function euros(montant: number) {
  return `${montant.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} € HT`;
}

export const SOCLE = [
  "Organisation et adaptation de vos contenus à l'apprentissage en ligne",
  "Structuration des modules et des activités pédagogiques",
  "Activités, quiz et évaluations, avec leurs corrections",
  "Intégration dans votre plateforme, progression et conditions d'achèvement",
  "Tests fonctionnels et ajustements",
  "Deux cycles de relecture par livrable",
];

export const SPECIFIQUE: Record<FormuleKey, { pourquoi: string; inclus: string[] }> = {
  essentielle: {
    pourquoi: "Vos contenus sont prêts : nous les transformons en parcours en ligne.",
    inclus: ["Mise en ligne de vos contenus existants (vidéos finies, cours rédigés)"],
  },
  coconstruite: {
    pourquoi: "Votre référent apporte le savoir, nous construisons la formation.",
    inclus: [
      "Cahiers de contenu remplis par votre référent, rédaction du contenu final par nos soins",
      "Capsules vidéo face caméra : scripts et montage (tournage par votre référent avec notre guide)",
    ],
  },
  complete: {
    pourquoi: "Nous prenons tout en charge, de l'analyse à l'accompagnement.",
    inclus: [
      "Création de tout le contenu à partir de vos sources, validé par votre référent",
      "Capsules vidéo face caméra : scripts et montage (tournage par votre équipe avec notre guide)",
    ],
  },
};

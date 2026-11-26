import "server-only";
import { ANNEE_AVENT, type CaseAvent } from "@/lib/avent";
import { LINKEDIN_URL, ROUTES } from "@/lib/routes";

// Contenu des cases et règle d'ouverture, côté serveur uniquement : le navigateur ne reçoit que les cases ouvertes
// (« server-only » fait échouer la compilation si un composant client importe ce fichier).
// CONTENU PROVISOIRE : les textes, l'ordre et les types de cases sont à valider. Les cases « modèle » n'ont pas
// encore de fichier à télécharger. Un fichier placé dans public/ serait accessible à tous avant son jour : le servir
// par une route qui vérifie la date.

/** Une case dont le jour est passé peut-elle encore s'ouvrir (rattrapage) ? Décision à prendre. */
export const RATTRAPAGE_POSSIBLE = true;

const article = (slug: string) => `${ROUTES.blog}/${slug}`;

const CASES_AVENT: CaseAvent[] = [
  { jour: 1, type: "outil", titre: "Le test RS ou RNCP", texte: "10 questions, 2 minutes : découvrez si votre certification relève du RS ou du RNCP.", cta: { label: "Faire le test", href: ROUTES.certificationRsOuRncp } },
  { jour: 2, type: "expertise", titre: "RNCP ou RS : comment choisir en 2026 ?", texte: "Budget, délais, financement : le comparatif pour choisir le bon répertoire.", cta: { label: "Lire l'article", href: article("rncp-ou-rs-guide-complet") } },
  { jour: 3, type: "modele", titre: "Checklist : mon dossier est-il prêt ?", texte: "Les points à vérifier avant de déposer, en une page.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 4, type: "expertise", titre: "Suis-je éligible au RNCP ?", texte: "Les critères d'éligibilité et les conditions à remplir en 2026.", cta: { label: "Lire l'article", href: article("suis-je-eligible-au-rncp-criteres-d-eligibilite-et-conditions-2026") } },
  { jour: 5, type: "expertise", titre: "Suis-je éligible au RS ?", texte: "Les critères d'éligibilité et les conditions du Répertoire spécifique.", cta: { label: "Lire l'article", href: article("certification-rncp-suis-je-eligible-au-rs-criteres-de-certification-au-repertoire-specifique") } },
  { jour: 6, type: "service", titre: "Un mini-audit offert de 20 minutes", texte: "Parlons de votre projet de certification, sans engagement.", cta: { label: "Prendre rendez-vous", href: ROUTES.contact } },
  { jour: 7, type: "expertise", titre: "Comment lire une fiche France Compétences ?", texte: "Apprenez à décrypter une fiche RNCP ou RS, ligne par ligne.", cta: { label: "Lire l'article", href: article("comment-lire-une-fiche-france-competences-rncp-ou-rs") } },
  { jour: 8, type: "modele", titre: "Les étapes d'un dépôt, de A à Z", texte: "Le parcours complet d'un dépôt, étape par étape.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 9, type: "expertise", titre: "Passer d'un RS à un RNCP : est-ce possible ?", texte: "C'est une nouvelle demande : ce qui se réutilise, ce qu'il faut refaire.", cta: { label: "Lire l'article", href: article("passer-d-une-certification-rs-a-un-rncp-est-ce-possible") } },
  { jour: 10, type: "outil", titre: "Le simulateur de prix e-learning", texte: "Estimez en 1 minute le prix de la digitalisation de votre formation.", cta: { label: "Calculer mon tarif", href: ROUTES.formationsSimulateur } },
  { jour: 11, type: "expertise", titre: "Qui peut délivrer une certification ?", texte: "Certificateur, organisme habilité, ou ni l'un ni l'autre : trois statuts possibles.", cta: { label: "Lire l'article", href: article("organisme-certificateur-ou-organisme-habilite-qui-peut-delivrer-une-certification-rncp-ou-rs") } },
  { jour: 12, type: "modele", titre: "Trame de référentiel de compétences", texte: "Une trame prête à remplir, avec un exemple.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 13, type: "expertise", titre: "Comment devenir organisme habilité ?", texte: "Préparer et évaluer sur la certification d'un autre organisme : ce qu'il faut savoir.", cta: { label: "Lire l'article", href: article("comment-devenir-organisme-habilite-sur-une-certification-rncp-ou-rs") } },
  { jour: 14, type: "service", titre: "Une relecture express de votre positionnement", texte: "RS ou RNCP : un avis rapide sur votre projet.", cta: { label: "Prendre rendez-vous", href: ROUTES.contact } },
  { jour: 15, type: "expertise", titre: "Évaluation formative, sommative, certificative", texte: "Trois évaluations, trois rôles : les différences en formation professionnelle.", cta: { label: "Lire l'article", href: article("evaluation-formative-sommative-certificative-quelles-differences-en-formation-professionnelle") } },
  { jour: 16, type: "modele", titre: "Grille : lire une fiche France Compétences", texte: "Une grille pour ne rien oublier à la lecture d'une fiche.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 17, type: "expertise", titre: "Passer l'examen en ligne : est-ce possible ?", texte: "Les règles de télésurveillance et la position de la CNIL.", cta: { label: "Lire l'article", href: article("passer-l-examen-d-une-certification-rncp-ou-rs-en-ligne-est-ce-possible-regles-telesurveillance-cnil") } },
  { jour: 18, type: "modele", titre: "Trame de scénario pédagogique", texte: "Structurer un module e-learning avant de le produire.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 19, type: "expertise", titre: "Le conseil express de Chris", texte: "Un conseil court, directement applicable à votre projet.", cta: null },
  { jour: 20, type: "service", titre: "Questions-réponses en direct sur LinkedIn", texte: "Posez vos questions sur la certification, en direct.", cta: { label: "Rejoindre sur LinkedIn", href: LINKEDIN_URL } },
  { jour: 21, type: "expertise", titre: "Le conseil express de Chris", texte: "Un conseil court, directement applicable à votre projet.", cta: null },
  { jour: 22, type: "modele", titre: "Comparer deux devis e-learning", texte: "La checklist pour comparer ce que chaque devis inclut vraiment.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 23, type: "expertise", titre: "Le conseil express de Chris", texte: "Un conseil court, directement applicable à votre projet.", cta: null },
  { jour: 24, type: "offre", titre: "Une offre pour finir l'année", texte: "Une offre spéciale sur le diagnostic de faisabilité, réservée aux visiteurs du calendrier.", cta: { label: "Prendre rendez-vous", href: ROUTES.contact } },
];

/**
 * Dernier jour ouvrable à la date donnée : 0 avant le 1er décembre, de 1 à 24 en décembre,
 * 25 une fois les 24 jours passés (tout est alors ouvrable). Calculé à l'heure de Paris.
 */
export function jourOuvrable(maintenant: Date): number {
  const parties = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(maintenant)
    .reduce<Record<string, number>>((acc, p) => {
      if (p.type === "year" || p.type === "month" || p.type === "day") acc[p.type] = Number(p.value);
      return acc;
    }, {});
  const { year, month, day } = parties;
  if (year < ANNEE_AVENT || (year === ANNEE_AVENT && month < 12)) return 0;
  if (year === ANNEE_AVENT && month === 12) return Math.min(day, 25);
  return 25;
}

export function casesOuvertes(jour: number): CaseAvent[] {
  return CASES_AVENT.filter((c) => c.jour === jour || (RATTRAPAGE_POSSIBLE && c.jour < jour));
}

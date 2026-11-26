import "server-only";
import { ANNEE_AVENT, type CaseAvent } from "@/lib/avent";
import { ROUTES } from "@/lib/routes";

// Contenu des cases et règle d'ouverture, côté serveur uniquement : le navigateur ne reçoit que les cases ouvertes
// (« server-only » fait échouer la compilation si un composant client importe ce fichier).
// Contenu repris du tableau de la page Notion « Le calendrier » (version du 26/11/2026). Ce tableau peut évoluer :
// le reprendre dans sa dernière version avant chaque mise en production. `href: null` = ressource pas encore validée.
// Pour un fichier : le déposer dans content/avent/ et indiquer son nom avec `fichier`. Jamais dans public/, où il
// serait accessible à tous avant son jour.

/** Une case dont le jour est passé peut-elle encore s'ouvrir (rattrapage) ? Décision à prendre. */
export const RATTRAPAGE_POSSIBLE = true;

type CaseSource = CaseAvent & { fichier?: string };

// Date simulée : en local et sur l'aperçu Vercel (accès réservé à l'équipe) uniquement, jamais en production.
const SIMULATION_POSSIBLE = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

const article = (slug: string) => `${ROUTES.blog}/${slug}`;

const CASES_AVENT: CaseSource[] = [
  { jour: 1, type: "guide", titre: "Pourquoi créer une certification ?", texte: "Les bonnes et les mauvaises raisons, et 3 questions pour tester votre projet.", cta: { label: "Télécharger le guide", href: null } },
  { jour: 2, type: "outil", titre: "Test « RS ou RNCP ? »", texte: "En 2 minutes, voyez vers quel répertoire orienter votre certification.", cta: { label: "Faire le test", href: ROUTES.certificationRsOuRncp } },
  { jour: 3, type: "infographie", titre: "Les étapes d'un dépôt", texte: "Le parcours d'un dépôt, résumé en une page.", cta: { label: "Télécharger l'infographie", href: null } },
  { jour: 4, type: "infographie", titre: "Vrai ou faux : 6 idées reçues sur le dépôt", texte: "Six idées reçues sur le dépôt, passées au crible.", cta: { label: "Télécharger l'infographie", href: null } },
  { jour: 5, type: "citation", titre: "La citation du week-end", texte: "« Choisir entre RNCP et RS, ce n'est pas une question de prestige. C'est une question de ce que vos apprenants savent faire à la sortie. » Chris", cta: { label: "Lire l'article", href: article("rncp-ou-rs-guide-complet") } },
  { jour: 6, type: "citation", titre: "La citation du week-end", texte: "« Porter une certification, c'est s'engager sur un métier, pas seulement sur une formation. » Chris", cta: { label: "Lire l'article", href: article("organisme-certificateur-ou-organisme-habilite-qui-peut-delivrer-une-certification-rncp-ou-rs") } },
  { jour: 7, type: "modele", titre: "Trame d'analyse d'opportunité", texte: "Un document à remplir pour analyser l'opportunité de votre projet.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 8, type: "checklist", titre: "Les pièces d'un dossier de dépôt", texte: "Les pièces à réunir, dont le règlement de certification, à cocher une à une.", cta: { label: "Télécharger la checklist", href: null } },
  { jour: 9, type: "outil", titre: "Rétroplanning simplifié", texte: "Les grandes phases de votre projet, à planifier dans un tableau.", cta: { label: "Ouvrir le rétroplanning", href: null } },
  { jour: 10, type: "infographie", titre: "Repères temps et budget d'un dépôt", texte: "Les repères à connaître avant de vous lancer, en une page.", cta: { label: "Télécharger l'infographie", href: null } },
  { jour: 11, type: "infographie", titre: "Les erreurs qui fragilisent un dossier", texte: "Les erreurs à éviter, réunies en une page.", cta: { label: "Télécharger l'infographie", href: null } },
  { jour: 12, type: "citation", titre: "La citation du week-end", texte: "« Le meilleur moment pour préparer un dépôt, c'est avant d'en avoir besoin. » Chris", cta: { label: "Lire l'article", href: article("suis-je-eligible-au-rncp-criteres-d-eligibilite-et-conditions-2026") } },
  { jour: 13, type: "citation", titre: "La citation du week-end", texte: "« Un dossier solide ne raconte pas une formation. Il prouve un métier. » Chris", cta: { label: "Lire l'article", href: article("certification-rncp-suis-je-eligible-au-rs-criteres-de-certification-au-repertoire-specifique") } },
  { jour: 14, type: "video", titre: "Lire une fiche France Compétences", texte: "Une vidéo pour apprendre à lire une fiche RNCP ou RS.", cta: { label: "Voir la vidéo", href: null } },
  { jour: 15, type: "guide", titre: "Comprendre et structurer un référentiel", texte: "Activités, compétences, blocs et évaluation : comment les organiser.", cta: { label: "Télécharger le guide", href: null } },
  { jour: 16, type: "modele", titre: "Construire son programme", texte: "Une trame de programme à remplir, avec des verbes d'action.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 17, type: "modele", titre: "Grille d'évaluation certificative", texte: "Une grille à compléter, avec une ligne d'exemple.", cta: { label: "Télécharger le modèle", href: null } },
  { jour: 18, type: "infographie", titre: "Qui fait quoi dans un projet de certification ?", texte: "Porteur, experts métier, jury, partenaires : le rôle de chacun en une page.", cta: { label: "Télécharger l'infographie", href: null } },
  { jour: 19, type: "citation", titre: "La citation du week-end", texte: "« Une compétence qui ne s'évalue pas n'a pas sa place dans un référentiel. » Chris", cta: { label: "Lire l'article", href: article("evaluation-formative-sommative-certificative-quelles-differences-en-formation-professionnelle") } },
  { jour: 20, type: "citation", titre: "La citation du week-end", texte: "« En ligne ou en salle, une épreuve certificative doit prouver la même chose. » Chris", cta: { label: "Lire l'article", href: article("passer-l-examen-d-une-certification-rncp-ou-rs-en-ligne-est-ce-possible-regles-telesurveillance-cnil") } },
  { jour: 21, type: "guide", titre: "Suivre ses anciens apprenants", texte: "Un guide et un questionnaire modifiable pour suivre vos anciens apprenants.", cta: { label: "Télécharger les documents", href: null } },
  { jour: 22, type: "checklist", titre: "Choisir son accompagnement : les questions à poser", texte: "Les questions à poser avant de choisir, réunies en une page.", cta: { label: "Télécharger la checklist", href: null } },
  { jour: 23, type: "outil", titre: "Simulateur de prix e-learning et blended", texte: "Estimez le prix de la digitalisation de votre formation.", cta: { label: "Calculer mon tarif", href: ROUTES.formationsSimulateur } },
  { jour: 24, type: "offre", titre: "Récapitulatif et offre de diagnostic", texte: "Le récapitulatif du calendrier et une offre sur le diagnostic de faisabilité, valable jusqu'au 31 janvier.", cta: { label: "Prendre rendez-vous", href: ROUTES.contact } },
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

/** Jour à appliquer à une requête : la date du serveur, ou la date simulée (`?jour=`) quand c'est permis. */
export function jourDeLaRequete(request: Request) {
  const demande = new URL(request.url).searchParams.get("jour");
  const valeur = SIMULATION_POSSIBLE && demande !== null ? Number(demande) : NaN;
  const simule = Number.isInteger(valeur) && valeur >= 0 && valeur <= 25;
  return { jour: simule ? valeur : jourOuvrable(new Date()), simule, simulationPossible: SIMULATION_POSSIBLE };
}

function sourcesOuvertes(jour: number): CaseSource[] {
  return CASES_AVENT.filter((c) => c.jour === jour || (RATTRAPAGE_POSSIBLE && c.jour < jour));
}

/** Cases ouvertes, telles qu'envoyées au navigateur : un fichier devient un lien vers la route de téléchargement. */
export function casesOuvertes(jour: number, simule: boolean): CaseAvent[] {
  return sourcesOuvertes(jour).map(({ fichier, ...c }) => {
    if (!fichier) return c;
    const href = `${ROUTES.advent}/fichiers/${c.jour}${simule ? `?jour=${jour}` : ""}`;
    return { ...c, cta: { label: c.cta?.label ?? "Télécharger", href, telechargement: true } };
  });
}

/** Nom du fichier d'une case, seulement si elle est ouverte. */
export function fichierOuvert(numero: number, jour: number): string | undefined {
  return sourcesOuvertes(jour).find((c) => c.jour === numero)?.fichier;
}

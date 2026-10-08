import { ROUTES } from "@/lib/routes";

export type Formula = {
  index: number;
  name: string;
  price: string;
  noteBefore?: string;
  deliverables: string[];
  noteAfter?: string;
  cta: string;
};

export const FORMULAS: Record<"conception" | "contenus" | "digitalisation" | "maintenance", Formula> = {
  conception: {
    index: 6,
    name: "Conception de formation",
    price: "2 500 € HT",
    deliverables: [
      "Analyse de la demande, du référentiel et du public cible",
      "Progression pédagogique (objectifs dérivés du référentiel)",
      "Programme de formation conforme Qualiopi",
      "Scénario pédagogique et d'accompagnement, séquencement et volumétrie horaire",
    ],
    noteAfter:
      "Alignement avec le référentiel de la certification visée (RNCP, RS ou référentiel interne), de l'analyse des compétences jusqu'aux modalités d'évaluation certificative.",
    cta: "Prendre un rendez-vous",
  },
  contenus: {
    index: 7,
    name: "Création de contenus de formation",
    price: "Sur devis",
    deliverables: [
      "Supports de présentation (diapositives, fiches, guide formateur)",
      "Activités d'apprentissage (exercices pratiques et mises en situation)",
      "Évaluations formatives, sommatives et certificatives",
    ],
    cta: "Discutons de votre projet",
  },
  digitalisation: {
    index: 8,
    name: "Digitalisation",
    price: "Sur devis",
    noteBefore:
      "Diagnostic inclus. Modalités couvertes : e-learning, blended learning. Outils : Moodle, Digiforma, Teachizy, 360Learning, outils auteurs (Articulate Rise, Storyline, iSpring), HTML/CSS/JS sur-mesure, SCORM 1.2.",
    deliverables: [
      "Diagnostic et cadrage du projet",
      "Scénarisation et conception digitale",
      "Production des modules",
      "Déploiement technique sur le LMS",
      "Tests et accompagnement des équipes",
    ],
    cta: "Discutons de votre projet",
  },
  maintenance: {
    index: 9,
    name: "Maintenance pédagogique mensuelle",
    price: "800 € HT/mois",
    noteBefore: "Engagement de 3 mois minimum.",
    deliverables: ["Mise à jour des contenus", "Maintenance et paramétrage du LMS"],
    cta: "Prendre un rendez-vous",
  },
};

export type FaqItem = { question: string; answer: string };

const FAQ_DELAYS: FaqItem = {
  question: "Combien de temps prend la digitalisation d'une formation ?",
  answer:
    "Comptez 4 à 8 semaines pour un module e-learning standard, selon le volume de contenu et le niveau d'interactivité souhaité. Le diagnostic initial affine cette estimation.",
};

const FAQ_LMS: FaqItem = {
  question: "Est-ce compatible avec mon LMS actuel ?",
  answer:
    "Les modules sont produits au format SCORM 1.2, compatible avec la grande majorité des LMS (Moodle, Digiforma, Teachizy, 360Learning, et bien d'autres). Le diagnostic vérifie la compatibilité avec votre outil.",
};

const FAQ_CUSTOM: FaqItem = {
  question: "Puis-je faire du sur-mesure plutôt que des outils auteurs classiques ?",
  answer:
    "Oui, en plus des outils auteurs (Articulate, iSpring), Satisa développe aussi des modules sur-mesure en HTML/CSS/JS pour des besoins spécifiques d'interactivité ou de charte graphique.",
};

const FAQ_STRUCTURED: FaqItem = {
  question: "Faut-il déjà avoir un programme de formation structuré ?",
  answer:
    "Non. Si votre contenu n'est pas encore structuré, la formule Conception de formation pose les bases (progression, programme conforme Qualiopi) avant toute digitalisation.",
};

const FAQ_MAINTENANCE: FaqItem = {
  question: "La maintenance pédagogique est-elle obligatoire ?",
  answer:
    "Non, elle est optionnelle. Elle est utile si vos contenus évoluent régulièrement ou si vous ouvrez de nouvelles cohortes nécessitant un suivi pédagogique continu.",
};

export const FAQ_FORMATIONS: FaqItem[] = [
  {
    question: "Quelle différence entre conception et digitalisation d'une formation ?",
    answer:
      "La conception structure votre contenu en un programme pédagogique cohérent et conforme Qualiopi : objectifs, progression, supports et évaluations. La digitalisation transforme ces contenus en parcours blended learning ou 100 % e-learning, avec intégration LMS. Si votre contenu n'est pas encore structuré, la conception vient avant la digitalisation.",
  },
  FAQ_STRUCTURED,
  FAQ_MAINTENANCE,
  {
    question: "Par où commencer ?",
    answer:
      "Par un rendez-vous de cadrage : on analyse votre contenu actuel et vos objectifs pour vous orienter vers la conception, la digitalisation ou les deux.",
  },
];

export const FAQ_CONCEPTION: FaqItem[] = [
  FAQ_STRUCTURED,
  {
    question: "Quelle différence entre la conception de formation et la création de contenus ?",
    answer:
      "La conception de formation (formule 6) pose les bases : analyse de la demande, du référentiel et du public cible, progression pédagogique, programme conforme Qualiopi et scénario pédagogique. La création de contenus (formule 7) produit la matière : supports de présentation, activités d'apprentissage et évaluations formatives, sommatives et certificatives.",
  },
  {
    question: "Mon programme sera-t-il aligné avec ma certification ?",
    answer:
      "Oui. La conception s'aligne avec le référentiel de la certification visée (RNCP, RS ou référentiel interne), de l'analyse des compétences jusqu'aux modalités d'évaluation certificative.",
  },
  FAQ_MAINTENANCE,
];

export const FAQ_DIGITALISATION: FaqItem[] = [
  FAQ_DELAYS,
  {
    question: "Quelles sont les étapes d'un projet de digitalisation ?",
    answer:
      "Rendez-vous de cadrage, diagnostic et cadrage, scénarisation et conception digitale, production des modules, intégration et paramétrage sur le LMS, tests et validation, puis accompagnement et première session. Comptez 4 à 8 semaines pour un module e-learning standard.",
  },
  FAQ_LMS,
  FAQ_CUSTOM,
  {
    question: "Les modules créés m'appartiennent-ils ?",
    answer: "Oui : les modules créés pour vous sont à vous, ils ne sont pas réutilisés pour d'autres clients.",
  },
  FAQ_MAINTENANCE,
];

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const base = "https://www.satisa-formation.fr";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${base}/` },
      ...trail.map((step, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: step.name,
        item: `${base}${step.path}`,
      })),
    ],
  };
}

export const FORMATIONS_PATHS = {
  mother: ROUTES.formations,
  conception: ROUTES.formationsConception,
  digitalisation: ROUTES.formationsDigitalisation,
};

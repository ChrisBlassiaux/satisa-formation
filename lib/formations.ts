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

export const FORMULAS: Record<"conception" | "contenus" | "maintenance", Formula> = {
  conception: {
    index: 6,
    name: "Conception de formation",
    price: "2 500 € HT",
    deliverables: [
      "Analyse de la demande, du référentiel et du public cible",
      "Progression pédagogique (objectifs dérivés du référentiel)",
      "Programme de formation conforme Qualiopi",
      "Scénario pédagogique et d'accompagnement, séquençage et volumétrie horaire",
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
    cta: "Prendre un rendez-vous",
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

// Digitalisation d'un bloc de formation : socle commun, trois formules, formules supplémentaires.
export const DIGITALISATION_CORE: string[] = [
  "Organisation des contenus pédagogiques du bloc",
  "Adaptation à l'apprentissage en ligne : séquences courtes, consignes, textes de liaison",
  "Structuration des modules et des activités pédagogiques",
  "Activités, quiz et évaluations, avec leurs corrections",
  "Intégration dans votre LMS",
  "Paramétrage de la progression et des conditions d'achèvement",
  "Tests fonctionnels et ajustements",
  "Deux cycles de relecture par livrable",
];

export type DigitalisationPlan = {
  name: string;
  price: string;
  tagline: string;
  deliverables: string[];
  badge?: string;
};

export const DIGITALISATION_PLANS: DigitalisationPlan[] = [
  {
    name: "Essentielle",
    price: "À partir de 2 000 € HT par bloc",
    tagline: "Vos contenus sont prêts à l'emploi, nous les mettons en ligne.",
    deliverables: [
      "Vous fournissez des contenus utilisables tels quels : vidéos finies, cours déjà rédigés.",
      "Nous faisons tout le reste.",
    ],
  },
  {
    name: "Co-construite",
    price: "À partir de 3 000 € HT par bloc",
    tagline: "Votre référent métier apporte le savoir, nous construisons la formation.",
    badge: "⭐ La plus demandée",
    deliverables: [
      "Votre référent métier remplit nos cahiers de contenu et valide le résultat.",
      "Nous rédigeons le contenu final et créons les activités.",
      "Capsules vidéo face caméra : nous écrivons les scripts et faisons le montage, votre équipe tourne.",
    ],
  },
  {
    name: "Complète",
    price: "À partir de 8 200 € HT par bloc",
    tagline: "Nous prenons tout en charge, de l'analyse à l'accompagnement.",
    deliverables: [
      "Vous fournissez vos sources et nous mettez en relation avec votre référent métier.",
      "Nous créons tout le contenu.",
      "Capsules vidéo face caméra : nous écrivons les scripts et faisons le montage.",
      "Inclus pour tous vos blocs : séquençage et scénarisation, configuration de la plateforme, formation + accompagnement 3 mois.",
    ],
  },
];

export const DIGITALISATION_NOTES: string[] = [
  "Le tournage des capsules vidéo reste assuré par votre équipe, avec notre accompagnement.",
  "Prix pour un bloc de 20 h d'e-learning. Le prix final dépend de la durée du bloc, fixée lors du séquençage.",
  "Votre référent métier : formateur, professionnel du métier ou responsable pédagogique qui maîtrise le sujet de la formation.",
];

export type DigitalisationExtra = { name: string; price: string; text: string; list?: string[]; note?: string };

export const DIGITALISATION_EXTRAS: DigitalisationExtra[] = [
  {
    name: "Séquençage et scénarisation",
    price: "À partir de 900 € HT",
    text: "Analyse des objectifs, structuration du parcours et des séquences, choix des méthodes pédagogiques et des modalités d'évaluation.",
  },
  {
    name: "Configuration de la plateforme",
    price: "À partir de 400 € HT",
    text: "Configuration initiale, organisation de l'espace de formation, paramétrage des accès et des fonctionnalités.",
  },
  {
    name: "Formation à la plateforme + accompagnement 3 mois",
    price: "900 € HT",
    text: "Vos équipes formées à la plateforme, puis accompagnées pendant 3 mois pour la mise en service.",
  },
  {
    name: "Maintenance pédagogique mensuelle",
    price: "800 € HT par mois",
    text: "Votre formation reste à jour et votre plateforme fonctionne, sans que vous ayez à vous en occuper.",
    list: ["Mise à jour des contenus", "Maintenance et paramétrage du LMS"],
    note: "Engagement de 3 mois minimum.",
  },
];

export type FaqItem = { question: string; answer: string };

const FAQ_DELAYS: FaqItem = {
  question: "Combien de temps prend la digitalisation d'une formation ?",
  answer:
    "Le délai dépend du volume de contenu, du niveau d'interactivité et de la rapidité de vos validations. Nous l'établissons avec vous dès le diagnostic, puis nous le suivons étape par étape.",
};

const FAQ_LMS: FaqItem = {
  question: "Est-ce compatible avec mon LMS actuel ?",
  answer:
    "Oui. Nous intégrons et paramétrons vos contenus sur les LMS les plus courants (Moodle, Digiforma, Teachizy, 360Learning) ou sur votre plateforme. Le diagnostic vérifie la compatibilité avec votre outil.",
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
      "La conception de formation pose les bases : analyse de la demande, du référentiel et du public cible, progression pédagogique, programme conforme Qualiopi et scénario pédagogique. La création de contenus produit la matière : supports de présentation, activités d'apprentissage et évaluations formatives, sommatives et certificatives.",
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
      "Rendez-vous de cadrage, diagnostic, scénarisation et conception digitale, production des modules, intégration et paramétrage sur le LMS, tests et validation, puis accompagnement et première session.",
  },
  FAQ_LMS,
  FAQ_CUSTOM,
  {
    question: "Les modules créés m'appartiennent-ils ?",
    answer: "Oui. Chaque module est conçu en exclusivité pour vous et le contenu vous appartient.",
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

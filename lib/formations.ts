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
    index: 11,
    name: "Maintenance pédagogique mensuelle",
    price: "800 € HT/mois",
    noteBefore: "Engagement de 3 mois minimum.",
    deliverables: ["Mise à jour des contenus", "Maintenance et paramétrage du LMS"],
    cta: "Prendre un rendez-vous",
  },
};

// Digitalisation : socle commun, trois formules (numérotées 8 à 10 dans la suite des offres), options supplémentaires.
export const DIGITALISATION_CORE: string[] = [
  "Organisation des contenus pédagogiques par module",
  "Adaptation à l'apprentissage en ligne : séquences courtes, consignes, textes de liaison",
  "Structuration des modules et des activités pédagogiques",
  "Activités, quiz et évaluations, avec leurs corrections",
  "Intégration dans votre LMS",
  "Paramétrage de la progression et des conditions d'achèvement",
  "Tests fonctionnels et ajustements",
  "Deux cycles de relecture par livrable",
];

export type DigitalisationPlan = {
  index: number;
  name: string;
  price: string;
  unit: string;
  tagline: string;
  deliverables: string[];
  badge?: string;
};

export const DIGITALISATION_PLANS: DigitalisationPlan[] = [
  {
    index: 8,
    name: "Essentielle",
    price: "À partir de 2 000 € HT",
    unit: "Pour 20 h d'e-learning*",
    tagline: "Vos contenus sont prêts à l'emploi, nous les mettons en ligne.",
    deliverables: [
      "Vous fournissez des contenus utilisables tels quels : vidéos finies, cours déjà rédigés.",
      "Nous faisons tout le reste.",
    ],
  },
  {
    index: 9,
    name: "Co-construite",
    price: "À partir de 3 000 € HT",
    unit: "Pour 20 h d'e-learning*",
    tagline: "Votre référent métier* apporte le savoir, nous construisons la formation.",
    badge: "La plus demandée",
    deliverables: [
      "Votre référent métier* remplit nos cahiers de contenu et valide le résultat.",
      "Nous rédigeons le contenu final et créons les activités.",
      "Capsules vidéo face caméra* : nous écrivons les scripts et faisons le montage, votre équipe tourne.",
    ],
  },
  {
    index: 10,
    name: "Complète",
    price: "À partir de 8 200 € HT",
    unit: "Pour 20 h d'e-learning*",
    tagline: "Nous prenons tout en charge, de l'analyse à l'accompagnement.",
    deliverables: [
      "Vous fournissez vos sources et vous nous mettez en relation avec votre référent métier*.",
      "Nous créons tout le contenu.",
      "Capsules vidéo face caméra* : nous écrivons les scripts et faisons le montage.",
      "Inclus pour l'ensemble de votre projet : séquençage et scénarisation, configuration de la plateforme, formation + accompagnement 3 mois.",
    ],
  },
];

export const DIGITALISATION_NOTES: string[] = [
  "* Pour 20 h d'e-learning : le prix final dépend de la durée de la formation, fixée lors du séquençage.",
  "* Capsules vidéo face caméra : le tournage reste assuré par votre équipe, avec notre accompagnement.",
  "* Référent métier : formateur, professionnel du métier ou responsable pédagogique qui maîtrise le sujet de la formation.",
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
    text: "Mise à jour des contenus, maintenance et paramétrage du LMS.",
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
  {
    question: "Comment digitaliser une formation présentielle ?",
    answer:
      "Digitaliser une formation présentielle, c'est la transformer en parcours e-learning ou blended learning, disponible sur un LMS. Le projet suit six étapes : cadrage et choix du format, scénarisation pédagogique, production des contenus, développement du module, intégration et paramétrage du LMS, puis lancement et accompagnement. Il ne s'agit pas de copier le présentiel en ligne : la formation est repensée pour la distance, avec des séquences courtes, des activités et des évaluations.",
  },
  {
    question: "Combien coûte la digitalisation d'une formation ?",
    answer:
      "Chez Satisa Formation, la digitalisation démarre à 2 000 € HT pour 20 heures d'e-learning avec la formule Essentielle (vos contenus sont prêts), à partir de 3 000 € HT avec la formule Co-construite (votre référent métier apporte le savoir) et à partir de 8 200 € HT avec la formule Complète (nous prenons tout en charge). Le prix final dépend de la durée d'e-learning, fixée lors du séquençage. Le simulateur de prix en ligne donne une estimation en 1 minute.",
  },
  {
    question: "Quelle différence entre e-learning, blended learning et digital learning ?",
    answer:
      "L'e-learning est une formation entièrement suivie à distance, en ligne, sur un LMS. Le blended learning (ou formation hybride) combine des séances en présentiel ou en classe virtuelle avec des modules e-learning dans un même parcours. Le digital learning est le terme le plus large : il regroupe tous les formats de formation digitale (e-learning, classe virtuelle, micro-learning, mobile learning).",
  },
  FAQ_DELAYS,
  {
    question: "Quelles sont les étapes d'un projet de digitalisation ?",
    answer:
      "Rendez-vous de cadrage, diagnostic, scénarisation et conception digitale, production des modules, intégration et paramétrage sur le LMS, tests et validation, puis accompagnement et première session.",
  },
  FAQ_LMS,
  {
    question: "Quel LMS choisir pour un organisme de formation ?",
    answer:
      "Le bon LMS dépend de votre taille, de votre budget, du suivi attendu (progression, évaluations, assiduité) et de son intégration avec vos outils de gestion. Nous intégrons et paramétrons vos contenus sur Moodle, Digiforma, Teachizy, 360Learning ou sur votre plateforme, et le diagnostic permet de vérifier que votre outil répond à votre projet.",
  },
  {
    question: "SCORM 1.2, SCORM 2004 ou xAPI : quel format choisir pour mon LMS ?",
    answer:
      "SCORM 1.2 est le format le plus largement compatible avec les LMS, dont Moodle : il suit l'achèvement et le score. SCORM 2004 permet un suivi plus fin, mais sa prise en charge varie selon la version de la plateforme. xAPI est plus riche mais demande généralement un LRS (Learning Record Store). Nous exportons vos modules en SCORM 1.2 et vérifions la compatibilité de votre LMS dès le diagnostic.",
  },
  {
    question: "Une formation e-learning doit-elle respecter Qualiopi ?",
    answer:
      "Les formations à distance ou hybrides relèvent du référentiel Qualiopi comme les formations présentielles, avec des preuves propres à la distance : traçabilité de l'assiduité, évaluation des acquis, accompagnement des apprenants. Nous les anticipons dans la scénarisation et dans le paramétrage du LMS (suivi de progression, conditions d'achèvement, évaluations avec corrections).",
  },
  FAQ_CUSTOM,
  {
    question: "Les modules créés m'appartiennent-ils ?",
    answer: "Oui. Chaque module est conçu en exclusivité pour vous et le contenu vous appartient.",
  },
  FAQ_MAINTENANCE,
  {
    question: "Qui est Satisa Formation ?",
    answer:
      "Satisa Formation est une structure d'ingénierie pédagogique et d'ingénierie de certification RNCP/RS, fondée en 2024 par Chris Blassiaux, ingénieur pédagogique et ingénieur de certification en freelance. Elle accompagne les organismes de formation sur la conception pédagogique, la digitalisation de leurs formations (e-learning, blended learning, intégration LMS) et le dépôt de certifications RNCP/RS, avec un interlocuteur unique.",
  },
  {
    question: "Pouvez-vous intervenir comme ingénieur pédagogique freelance sur mon projet ?",
    answer:
      "Oui. Chris Blassiaux, fondateur de Satisa Formation, intervient en freelance comme ingénieur pédagogique : conception de la formation, création des contenus, développement des modules e-learning et intégration sur votre LMS, du cadrage à la première session. Prenez rendez-vous pour qu'il étudie votre projet.",
  },
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

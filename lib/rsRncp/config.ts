// Outil « RS ou RNCP ? » : configuration unique (questions, règles, verdicts, textes, offres, prix et durées).
//
// Pour mettre à jour l'outil, on modifie ce fichier et rien d'autre :
//   - les prix et les durées ne sont écrits qu'ICI (rubrique « offres » et « durées ») ;
//   - chaque règle porte sa source, sa date de vérification et le drapeau « aValiderParChris ».
// Le calcul du verdict (engine.ts) est déterministe : mêmes réponses, même résultat. Aucune IA, aucune API externe.

import type { Config, Regle, Tracabilite } from "./types";

const VERIFIE_LE = "2026-11-19";

// ---------- Sources ----------
const SRC_GUIDE = "Article du blog Satisa « RNCP ou RS : comment choisir en 2026 ? » (10/09/2026)";
const SRC_RNCP = "Article du blog Satisa « Suis-je éligible au RNCP ? » (01/10/2026), art. R.6113-9 du Code du travail";
const SRC_RS = "Article du blog Satisa « Suis-je éligible au RS ? » (02/10/2026), art. L.6113-6 du Code du travail";
const SRC_PAGE_RS = "Page Dépôt RS, rubrique « Diagnostic de faisabilité » (actions exclues : sensibilisation, remise à niveau)";
const SRC_PAGES_OFFRES = "Pages Dépôt RNCP et Dépôt RS (durées et formules affichées)";
const SRC_POIDS = "Pondération interne de l'outil (jugement d'expert Satisa, pas un texte réglementaire)";

/** Règle sourcée sur un article ou une page du site : Chris l'a déjà publiée. */
const sourcee = (source: string): Tracabilite => ({ source, verifieLe: VERIFIE_LE, aValiderParChris: false });

/** Règle de pondération ou d'usage : à valider par Chris. */
const aValider = (source: string, noteValidation?: string): Tracabilite => ({
  source,
  verifieLe: VERIFIE_LE,
  aValiderParChris: true,
  noteValidation,
});

// ---------- Durées et prix (une seule source de vérité) ----------
const DUREES = { rncp: "À partir de 10 mois", rs: "À partir de 8 mois" } as const;
const MOIS_MIN = { rncp: "10 mois", rs: "8 mois" } as const;

const REGLES: Regle[] = [
  // ----- Nature de la certification -----
  {
    id: "nature-metier",
    ...sourcee(SRC_GUIDE),
    quand: { nature: ["metier"] },
    effets: {
      rncp: 3,
      raison: { rncp: "Votre certification prépare à un métier complet, avec ses activités et ses responsabilités propres : c'est la logique du RNCP." },
      priorite: 10,
    },
  },
  {
    id: "nature-competences",
    ...sourcee(SRC_GUIDE),
    quand: { nature: ["competences"] },
    effets: {
      rs: 3,
      raison: { rs: "Vous certifiez une compétence qui s'ajoute à un métier déjà exercé : c'est la logique du Répertoire spécifique (RS)." },
      priorite: 10,
    },
  },
  {
    id: "nature-habilitation",
    ...sourcee(SRC_RS),
    quand: { nature: ["habilitation"] },
    effets: {
      rs: 3,
      raison: { rs: "Une habilitation ou une compétence exigée par une réglementation ou une norme relève en général du Répertoire spécifique (RS)." },
      vigilance: {
        rs: "Si votre habilitation est établie directement par l'État, elle peut être enregistrée de plein droit : vérifiez ce point avant de monter un dossier complet.",
      },
      priorite: 10,
    },
  },
  {
    id: "nature-sensibilisation",
    ...aValider(
      SRC_PAGE_RS,
      "Exclusion sourcée seulement pour le RS sur le site (sensibilisation, remise à niveau) ; à confirmer pour le RNCP et à formuler avec la référence réglementaire exacte.",
    ),
    quand: { nature: ["sensibilisation"] },
    effets: {
      exclusion:
        "Les actions de sensibilisation, d'initiation et de remise à niveau sont exclues du Répertoire spécifique, et elles ne préparent pas à un métier : en l'état, votre action ne peut pas être enregistrée.",
      manque: { texte: "Faire évoluer l'offre vers une compétence précise, évaluée et attestée (et non une simple sensibilisation)", priorite: 1 },
    },
  },

  // ----- Durée de la formation -----
  {
    id: "duree-courte",
    ...aValider(SRC_POIDS, "Seuil de 35 heures (environ une semaine) choisi par l'outil, à confirmer."),
    quand: { duree: ["courte"] },
    effets: {
      rs: 1,
      raison: { rs: "Un parcours court correspond plutôt à une compétence précise (RS) qu'à un métier complet." },
      priorite: 5,
    },
  },
  {
    id: "duree-longue",
    ...aValider(SRC_POIDS, "Seuil de 300 heures choisi par l'outil, à confirmer."),
    quand: { duree: ["longue"] },
    effets: {
      rncp: 2,
      raison: { rncp: "La durée de votre parcours est cohérente avec la préparation à un métier complet." },
      priorite: 5,
    },
  },
  {
    id: "metier-parcours-court",
    ...aValider(SRC_POIDS),
    quand: { nature: ["metier"], duree: ["courte"] },
    effets: {
      vigilance: {
        rncp: "Un métier complet se prépare rarement en moins de 35 heures : vérifiez que votre périmètre couvre bien l'ensemble des activités du métier.",
      },
    },
  },
  {
    id: "competence-parcours-long",
    ...aValider(SRC_POIDS),
    quand: { nature: ["competences", "habilitation"], duree: ["longue"] },
    effets: {
      rncp: 1,
      vigilance: {
        commun: "Un parcours long pour une compétence complémentaire : vérifiez qu'il ne s'agit pas, en réalité, d'un métier complet.",
      },
    },
  },

  // ----- Public visé -----
  {
    id: "public-demandeurs",
    ...aValider(SRC_POIDS),
    quand: { public: ["demandeurs"] },
    effets: {
      rncp: 1,
      vigilance: { commun: "Avec un public de demandeurs d'emploi, l'insertion professionnelle de vos titulaires est l'élément central du dossier." },
    },
  },
  {
    id: "public-salaries",
    ...aValider(SRC_POIDS),
    quand: { public: ["salaries"] },
    effets: {
      rs: 1,
      raison: { rs: "Vos apprenants exercent déjà un métier : une compétence complémentaire est cohérente avec ce public." },
      priorite: 3,
    },
  },

  // ----- Objectif principal -----
  {
    id: "objectif-marche",
    ...sourcee(SRC_GUIDE),
    quand: { objectif: ["marche"] },
    effets: {
      rncp: 1,
      rs: 1,
      raison: { commun: "Pour accéder au CPF et à de nombreux financements, il faut une certification enregistrée au RNCP ou au RS." },
      vigilance: {
        rs: "Depuis le décret du 24 février 2026, le CPF ne finance une certification RS qu'à hauteur de 1 500 € maximum : si votre formation coûte plus cher, le reste est à la charge du candidat.",
      },
      priorite: 4,
    },
  },
  {
    id: "objectif-metier",
    ...sourcee(SRC_GUIDE),
    quand: { objectif: ["metier"] },
    effets: {
      rncp: 2,
      raison: { rncp: "Vous voulez faire reconnaître un métier : le RNCP associe la certification à un niveau de qualification." },
      priorite: 6,
    },
  },
  {
    id: "objectif-interne",
    ...aValider(SRC_POIDS),
    quand: { objectif: ["interne"] },
    effets: {
      vigilance: {
        commun: "Si l'enjeu est une reconnaissance en interne, sans financement à débloquer, un enregistrement n'est peut-être pas nécessaire : demandez-vous ce qu'il vous apporterait concrètement.",
      },
    },
  },

  // ----- Référentiel de compétences et évaluation -----
  {
    id: "referentiel-complet",
    ...sourcee(SRC_RNCP),
    quand: { referentiel: ["complet"] },
    effets: {
      preparation: 2,
      raison: { commun: "Votre référentiel de compétences et vos modalités d'évaluation sont déjà formalisés : c'est le socle d'un dossier." },
      priorite: 4,
    },
  },
  {
    id: "referentiel-partiel",
    ...sourcee(SRC_RNCP),
    quand: { referentiel: ["partiel"] },
    effets: {
      preparation: 1,
      vigilance: { commun: "Votre référentiel n'est que partiellement formalisé : il faudra le rédiger de façon complète (activités, compétences, évaluation)." },
    },
  },
  {
    id: "referentiel-absent",
    ...sourcee(SRC_RNCP),
    quand: { referentiel: ["non"] },
    effets: {
      manque: { texte: "Rédiger le référentiel d'activités, de compétences et d'évaluation", priorite: 2 },
    },
  },

  // ----- Promotion déjà formée et évaluée -----
  {
    id: "promotion-oui",
    ...sourcee(SRC_RNCP),
    quand: { promotion: ["oui"] },
    effets: {
      preparation: 2,
      raison: { commun: "Vous avez déjà formé et évalué au moins une promotion : c'est la preuve sur laquelle s'appuie l'examen du dossier." },
      priorite: 7,
    },
  },
  {
    id: "promotion-en-cours",
    ...sourcee(SRC_RNCP),
    quand: { promotion: ["encours"] },
    effets: {
      preparation: 1,
      vigilance: { commun: "Votre première promotion n'est pas terminée : le dépôt n'est possible qu'après avoir formé et évalué des candidats." },
    },
  },
  {
    id: "promotion-absente",
    ...sourcee(SRC_RNCP),
    quand: { promotion: ["non"] },
    effets: {
      manque: { texte: "Former et évaluer une première promotion de candidats", priorite: 1 },
      vigilance: {
        commun:
          "Une exception existe pour certains métiers (réglementés par une norme internationale ou légale, ou inscrits sur la liste des métiers en évolution ou en émergence) : un diagnostic permet de le vérifier.",
      },
    },
  },

  // ----- Suivi de l'insertion des titulaires -----
  {
    id: "insertion-oui",
    ...sourcee(SRC_RNCP),
    quand: { insertion: ["oui"] },
    effets: {
      preparation: 2,
      rncp: 1,
      raison: { rncp: "Vous pouvez suivre l'insertion de vos titulaires, un élément central de l'examen d'un dossier RNCP." },
      priorite: 6,
    },
  },
  {
    id: "insertion-possible",
    ...sourcee(SRC_RNCP),
    quand: { insertion: ["possible"] },
    effets: {
      preparation: 1,
      vigilance: { commun: "Le suivi de l'insertion n'est pas encore organisé : il faudra le mettre en place avant le dépôt (enquêtes, relances, tableau de suivi)." },
    },
  },
  {
    id: "insertion-absente",
    ...aValider(
      SRC_RNCP,
      "Le décret n° 2025-500 est daté du 6 juin 2025 dans les articles du site, et du 1er octobre 2025 dans le cahier des charges de l'outil : confirmer la date, la portée pour le RS et la formulation.",
    ),
    quand: { insertion: ["non"] },
    effets: {
      rncp: -2,
      vigilance: {
        rncp: "Sans suivi de l'insertion de vos titulaires, un dossier RNCP n'est pas recevable : c'est le point à traiter en priorité.",
        rs: "Le devenir professionnel des titulaires est aussi examiné pour le RS : vérifiez ce point avec le décret n° 2025-500 relatif à la certification professionnelle.",
      },
      manque: { texte: "Mettre en place le suivi de l'insertion de vos titulaires", priorite: 3 },
    },
  },

  // ----- Évaluation indépendante -----
  {
    id: "jury-oui",
    ...aValider(SRC_POIDS),
    quand: { jury: ["oui"] },
    effets: {
      preparation: 1,
      raison: { commun: "Vos évaluations sont assurées par un jury ou des évaluateurs indépendants du formateur." },
      priorite: 3,
    },
  },
  {
    id: "jury-prevu",
    ...aValider(SRC_POIDS),
    quand: { jury: ["prevu"] },
    effets: {
      vigilance: { commun: "L'évaluation devra être organisée de façon indépendante du formateur (jury ou évaluateurs externes)." },
    },
  },
  {
    id: "jury-absent",
    ...aValider(SRC_POIDS),
    quand: { jury: ["non"] },
    effets: {
      vigilance: { commun: "Les évaluations doivent être organisées de façon indépendante du formateur : prévoyez un jury ou des évaluateurs externes." },
      manque: { texte: "Organiser une évaluation indépendante du formateur (jury ou évaluateurs externes)", priorite: 4 },
    },
  },

  // ----- Temps interne et délai -----
  {
    id: "temps-limite",
    ...aValider(SRC_POIDS),
    quand: { temps: ["peu"] },
    effets: {
      vigilance: {
        commun:
          "Vous disposez de peu de temps pour le projet : un dépôt mobilise l'équipe de façon importante (référentiels, collecte des données, suivi). Une formule où nous pilotons le projet est plus adaptée.",
      },
    },
  },
  {
    id: "delai-court",
    ...sourcee(SRC_PAGES_OFFRES),
    quand: { delai: ["court"] },
    effets: {
      vigilance: {
        commun: `Un délai de moins de 8 mois est très serré : comptez à partir de ${MOIS_MIN.rs} pour le RS et à partir de ${MOIS_MIN.rncp} pour le RNCP, de la préparation à la décision.`,
      },
    },
  },
  {
    id: "delai-moyen",
    ...sourcee(SRC_PAGES_OFFRES),
    quand: { delai: ["moyen"] },
    effets: {
      vigilance: { rncp: `Pour le RNCP, comptez à partir de ${MOIS_MIN.rncp} : un délai de 8 à 12 mois reste serré.` },
    },
  },
];

export const CONFIG: Config = {
  version: "2026-11-19",

  questions: [
    {
      id: "objectif",
      titre: "Quel est votre objectif principal avec cette certification ?",
      pourquoi:
        "Les deux répertoires ouvrent l'accès aux financements, mais pas dans les mêmes conditions. Votre objectif nous aide à savoir ce qui compte vraiment pour vous.",
      options: [
        { value: "marche", label: "Répondre à un marché ou accéder à des financements (CPF, OPCO…)" },
        { value: "metier", label: "Faire reconnaître officiellement un métier" },
        { value: "interne", label: "Reconnaître un parcours en interne, sans enjeu de financement" },
        { value: "autre", label: "Un autre objectif" },
      ],
    },
    {
      id: "nature",
      titre: "Que voulez-vous certifier avec votre formation ?",
      pourquoi:
        "C'est la question la plus importante. Le RNCP certifie un métier complet ; le RS certifie une compétence qui s'ajoute à un métier. Certaines actions ne peuvent pas être enregistrées du tout.",
      options: [
        { value: "metier", label: "Un métier complet, avec ses activités et ses responsabilités" },
        { value: "competences", label: "Un ensemble de compétences qui complète un métier déjà exercé" },
        { value: "habilitation", label: "Une habilitation ou une compétence exigée par une réglementation ou une norme" },
        { value: "sensibilisation", label: "Une sensibilisation, une initiation ou une remise à niveau" },
      ],
    },
    {
      id: "duree",
      titre: "Quelle est la durée de la formation ?",
      pourquoi: "La durée est un indice : un parcours court correspond plutôt à une compétence, un parcours long plutôt à un métier.",
      options: [
        { value: "courte", label: "Moins de 35 heures (environ une semaine)" },
        { value: "moyenne", label: "De 35 à 300 heures" },
        { value: "longue", label: "Plus de 300 heures" },
      ],
    },
    {
      id: "public",
      titre: "À qui s'adresse votre formation ?",
      pourquoi:
        "Un public de salariés oriente plutôt vers une compétence complémentaire ; un public de demandeurs d'emploi met l'insertion professionnelle au premier plan.",
      options: [
        { value: "salaries", label: "Des salariés" },
        { value: "demandeurs", label: "Des demandeurs d'emploi" },
        { value: "tous", label: "Tout public, ou un public mixte" },
      ],
    },
    {
      id: "referentiel",
      titre: "Avez-vous un référentiel de compétences écrit, avec des modalités d'évaluation ?",
      pourquoi:
        "Un dossier s'appuie sur un référentiel qui décrit les activités, les compétences visées et la façon de les évaluer. C'est souvent là que se joue la solidité du dossier.",
      options: [
        { value: "complet", label: "Oui : activités, compétences et épreuves d'évaluation sont écrites et utilisées" },
        { value: "partiel", label: "En partie : j'ai un programme, mais pas de référentiel de compétences formalisé" },
        { value: "non", label: "Non, rien d'écrit pour l'instant" },
      ],
    },
    {
      id: "promotion",
      titre: "Avez-vous déjà formé et évalué une promotion de candidats ?",
      pourquoi:
        "Dans la grande majorité des cas, on ne peut déposer qu'après avoir formé et évalué au moins une promotion : l'examen du dossier s'appuie sur ces résultats réels.",
      options: [
        { value: "oui", label: "Oui, au moins une promotion complète" },
        { value: "encours", label: "En cours : ma première promotion est en formation ou en évaluation" },
        { value: "non", label: "Non, aucune promotion pour l'instant" },
      ],
    },
    {
      id: "insertion",
      titre: "Pouvez-vous suivre ce que deviennent vos diplômés après la formation ?",
      pourquoi:
        "Les données d'insertion (emploi, évolution) sont obligatoires pour le RNCP et examinées aussi pour le RS. Sans suivi, il est difficile de constituer un dossier.",
      options: [
        { value: "oui", label: "Oui, j'ai un suivi structuré (contacts, enquêtes, données)" },
        { value: "possible", label: "C'est possible, mais ce n'est pas encore organisé" },
        { value: "non", label: "Non, je n'ai pas de visibilité sur leur devenir" },
      ],
    },
    {
      id: "jury",
      titre: "Vos évaluations sont-elles assurées par un jury ou des évaluateurs indépendants du formateur ?",
      pourquoi: "L'évaluation doit être sérieuse et indépendante : c'est un point de contrôle de la qualité de la certification.",
      options: [
        { value: "oui", label: "Oui, un jury ou des évaluateurs indépendants" },
        { value: "prevu", label: "Pas encore, mais je peux l'organiser" },
        { value: "non", label: "Non, c'est le formateur qui évalue" },
      ],
    },
    {
      id: "temps",
      titre: "Quel temps votre équipe peut-elle consacrer au projet ?",
      pourquoi:
        "Le dépôt est gratuit, mais il demande beaucoup de temps (référentiels, collecte des données, suivi). C'est le vrai coût du projet.",
      options: [
        { value: "peu", label: "Très peu : je ne peux pas y consacrer de temps régulier" },
        { value: "modere", label: "Quelques heures par semaine" },
        { value: "important", label: "Un référent dédié, au moins une demi-journée par semaine" },
      ],
    },
    {
      id: "delai",
      titre: "Dans quel délai souhaitez-vous obtenir l'enregistrement ?",
      pourquoi: "Entre la préparation du dossier et la décision de France Compétences, il faut compter plusieurs mois. Mieux vaut le savoir dès le départ.",
      options: [
        { value: "court", label: "En moins de 8 mois" },
        { value: "moyen", label: "Entre 8 et 12 mois" },
        { value: "long", label: "Plus de 12 mois, ou pas de contrainte de délai" },
      ],
    },
  ],

  regles: REGLES,

  // Préparation : 7 points au maximum (référentiel 2, promotion 2, insertion 2, jury 1).
  seuilsPreparation: { pret: 6, presquePret: 3 },
  ecartMinimal: 2,
  blocageJusqua: 2,
  pasPretSiBloquants: 2,

  verdicts: {
    rncp: {
      titre: "Votre certification relève plutôt du RNCP",
      resume:
        "Votre projet prépare à un métier complet : c'est ce que le Répertoire national des certifications professionnelles (RNCP) enregistre. La certification serait rattachée à un niveau de qualification.",
      raisonParDefaut: "Les éléments que vous avez indiqués vont, dans l'ensemble, dans le sens d'un métier complet.",
    },
    rs: {
      titre: "Votre certification relève plutôt du RS",
      resume:
        "Votre projet certifie une compétence précise, qui complète un métier : c'est ce que le Répertoire spécifique (RS) enregistre. La certification n'est pas rattachée à un niveau de qualification.",
      raisonParDefaut: "Les éléments que vous avez indiqués vont, dans l'ensemble, dans le sens d'une compétence complémentaire.",
    },
    deux: {
      titre: "Les deux répertoires sont envisageables",
      resume:
        "Votre projet pourrait relever du RNCP comme du RS : tout dépend du périmètre exact de votre certification.",
      critere:
        "Ce qui tranche : le périmètre. Si votre certification couvre un métier complet, avec ses activités et ses responsabilités propres, visez le RNCP. Si elle ajoute une compétence à un métier déjà exercé, visez le RS.",
      raisonParDefaut: "Vos réponses vont autant dans le sens du RNCP que dans celui du RS : elles ne permettent pas de trancher à ce stade.",
    },
    pas_pret: {
      titre: "Votre projet n'est pas encore prêt à être déposé",
      resume:
        "Avant de choisir un répertoire, il manque des éléments essentiels. Ils sont listés ci-dessous, dans l'ordre de priorité.",
      raisonParDefaut: "Des éléments essentiels sont à construire avant de pouvoir déposer.",
    },
  },

  preparation: {
    pret: {
      label: "Prêt",
      texte: "Vos éléments essentiels sont réunis : vous pouvez engager le dossier.",
    },
    presque_pret: {
      label: "Presque prêt",
      texte: "L'essentiel est là, mais certains éléments sont à compléter avant le dépôt.",
    },
    a_construire: {
      label: "À construire",
      texte: "Plusieurs éléments essentiels sont à construire avant de pouvoir déposer.",
    },
  },

  // Formule recommandée selon la préparation, puis selon le temps interne disponible (question « temps »).
  formules: {
    parDefaut: "guidee",
    parNiveau: {
      a_construire: "diagnostic",
      presque_pret: { peu: "pilotee", modere: "guidee", important: "guidee" },
      pret: { peu: "pilotee", modere: "guidee", important: "guidee" },
    },
  },

  // Prix en euros HT, repris des pages Dépôt RNCP et Dépôt RS.
  offres: {
    diagnostic: {
      nom: "Diagnostic de faisabilité",
      sousTitre: "Savoir si votre projet peut être déposé",
      description: "Savoir si votre projet peut être déposé, dans quel répertoire, en combien de temps et à quelles conditions.",
      prix: 700,
    },
    guidee: {
      nom: "Certification guidée",
      sousTitre: "Vous produisez, nous vous guidons",
      description: "Vous rédigez les livrables avec nos trames, nos relectures et notre assistance, jusqu'à la décision de France Compétences.",
      prix: { rncp: 5000, rs: 4000 },
    },
    pilotee: {
      nom: "Certification pilotée",
      sousTitre: "Nous produisons, vous validez",
      description: "Nous rédigeons les livrables et pilotons le projet, vous validez, jusqu'à la décision de France Compétences.",
      prix: { rncp: 10000, rs: 8000 },
    },
  },

  durees: { rncp: DUREES.rncp, rs: DUREES.rs },
  duree: { apresDiagnostic: "Estimée à l'issue du diagnostic de faisabilité" },

  avertissement:
    "Ce test est une orientation générale, pas un avis juridique. L'enregistrement dépend de la décision de France compétences.",
  fraisDepot: "Le dépôt auprès de France Compétences est gratuit : le coût indiqué est celui de l'accompagnement.",
};

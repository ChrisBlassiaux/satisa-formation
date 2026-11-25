// Offres d'emploi et de stage affichées sur la page « Offres d'emploi ».
// Pour ajouter une offre : ajouter un objet à OFFRES. Pour retirer une offre pourvue : la supprimer de la liste.
// Quand la liste est vide, la page affiche un message « aucune offre pour le moment ».

export type Offre = {
  /** Identifiant utilisé comme ancre de l'URL (#community-manager). */
  id: string;
  titre: string;
  /** Type de collaboration, mis en avant sur la carte (Stage, CDI, etc.). */
  type: string;
  /** Pastilles affichées sous le titre. */
  pastilles: string[];
  /** Encadré d'alerte en tête de l'offre. */
  alerte?: string;
  /** Première phrase de présentation du poste. */
  accroche: string;
  aPropos: string;
  descriptif: string;
  missions: string;
  profil: {
    intro: string;
    competences: string[];
    plus: string[];
  };
  conditions: string[];
  secteur: string;
  /** Points à vérifier avant de candidater (questions de présélection). */
  avantDePostuler: string[];
  candidature: {
    email: string;
    objet: string;
  };
};

export const OFFRES: Offre[] = [
  {
    id: "community-manager",
    titre: "Community manager",
    type: "Stage",
    pastilles: ["2 mois maximum", "100 % télétravail", "Non rémunéré"],
    alerte: "Nous recrutons pour un stage de 2 mois maximum (pas d'alternance).",
    accroche: "Satisa Formation recherche un stagiaire pour le poste de Community Manager.",
    aPropos:
      "Satisa Formation accompagne les organismes de formation sur deux expertises complémentaires : l'ingénierie de certification RNCP et RS auprès de France Compétences, et la conception et digitalisation de formations.",
    descriptif: "L'objectif du stage est le développement du projet Satisa Formation à travers notre présence en ligne.",
    missions:
      "Le community manager s'occupera de consolider et d'animer la communauté Satisa Formation sur LinkedIn, et sur le site internet. Cela via la création de contenus pour les réseaux sociaux et la création de contenu pour le site web en respectant la charte graphique Satisa Formation.",
    profil: {
      intro: "Le stagiaire devra avoir quelques compétences permettant de poursuivre l'apprentissage durant le stage.",
      competences: ["Rédaction", "Design (Canva)", "Connaissance de l'univers de LinkedIn et du web"],
      plus: ["L'outil Notion"],
    },
    conditions: [
      "Le stage a pour objectif de finaliser un cursus de formation et s'effectuera sur une durée de deux mois maximum (non rémunérés).",
      "Stage 100 % en télétravail (mais suivi !).",
      "Avec son propre ordinateur.",
      "En autonomie.",
      "Idéal pour un stage en première année de communication (ou en formation).",
      "Nous sommes souples concernant la date de début du stage.",
    ],
    secteur: "Formation technique et professionnelle",
    avantDePostuler: [
      "Vous acceptez de travailler à distance.",
      "Vous recherchez un stage d'une durée de deux mois maximum.",
      "Vos dates de stage figurent sur votre CV.",
    ],
    candidature: {
      email: "chris@satisa.fr",
      objet: "Candidature - Community manager (stage)",
    },
  },
];

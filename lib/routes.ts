export const ROUTES = {
  home: "/",
  certification: "/deposer-une-certification-rncp-rs",
  certificationRncp: "/deposer-une-certification-rncp-rs/depot-rncp",
  certificationRs: "/deposer-une-certification-rncp-rs/depot-rs",
  certificationRsOuRncp: "/deposer-une-certification-rncp-rs/rs-ou-rncp",
  formations: "/concevoir-digitaliser-vos-formations",
  formationsConception: "/concevoir-digitaliser-vos-formations/conception-pedagogique",
  formationsDigitalisation: "/concevoir-digitaliser-vos-formations/digitalisation-formation",
  formationsSimulateur: "/concevoir-digitaliser-vos-formations/simulateur-prix-digitalisation",
  tools: "/boite-a-outils",
  advent: "/calendrier-de-l-avent",
  about: "/a-propos",
  jobs: "/nous-rejoindre",
  blog: "/blog",
  contact: "/rendez-vous",
  legalMentions: "/mentions-legales",
  cgv: "/cgv",
  privacy: "/politique-confidentialite",
} as const;

export const MAIN_NAV_LINKS = [
  {
    href: ROUTES.certification,
    label: "Certification RNCP/RS",
    children: [
      { href: ROUTES.certificationRncp, label: "Dépôt RNCP" },
      { href: ROUTES.certificationRs, label: "Dépôt RS" },
    ],
  },
  {
    href: ROUTES.formations,
    label: "Formations et digital",
    children: [
      { href: ROUTES.formationsConception, label: "Conception pédagogique" },
      { href: ROUTES.formationsDigitalisation, label: "Digitalisation" },
    ],
  },
  {
    href: ROUTES.tools,
    label: "Boîte à outils",
    wide: true,
    // Les deux outils les plus stratégiques, puis le lien vers la page qui les réunit tous.
    children: [
      { href: ROUTES.formationsSimulateur, label: "Simulateur de prix e-learning" },
      { href: ROUTES.certificationRsOuRncp, label: "Test RS ou RNCP" },
      { href: ROUTES.tools, label: "Voir tous nos outils", more: true },
    ],
  },
  { href: ROUTES.blog, label: "Blog" },
  { href: ROUTES.about, label: "À propos" },
] as const;

export const LINKEDIN_URL = "https://www.linkedin.com/in/christopher-blassiaux-802891198/";

// URL de la page LinkedIn de l'entreprise Satisa Formation (à renseigner : alimente les données structurées de l'organisation).
export const LINKEDIN_COMPANY_URL = "";

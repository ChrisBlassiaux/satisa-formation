export const ROUTES = {
  home: "/",
  certification: "/deposer-une-certification-rncp-rs",
  certificationRncp: "/deposer-une-certification-rncp-rs/depot-rncp",
  certificationRs: "/deposer-une-certification-rncp-rs/depot-rs",
  formations: "/concevoir-digitaliser-vos-formations",
  formationsConception: "/concevoir-digitaliser-vos-formations/conception-pedagogique",
  formationsDigitalisation: "/concevoir-digitaliser-vos-formations/digitalisation-formation",
  about: "/a-propos",
  blog: "/blog",
  contact: "/rendez-vous",
  legalMentions: "/mentions-legales",
  cgv: "/cgv",
  privacy: "/politique-confidentialite",
} as const;

export const MAIN_NAV_LINKS = [
  {
    href: ROUTES.certification,
    label: "Déposer une certification RNCP/RS",
    children: [
      { href: ROUTES.certificationRncp, label: "Dépôt RNCP" },
      { href: ROUTES.certificationRs, label: "Dépôt RS" },
    ],
  },
  {
    href: ROUTES.formations,
    label: "Concevoir et digitaliser vos formations",
    children: [
      { href: ROUTES.formationsConception, label: "Conception pédagogique" },
      { href: ROUTES.formationsDigitalisation, label: "Digitalisation" },
    ],
  },
  { href: ROUTES.about, label: "À propos" },
] as const;

export const LINKEDIN_URL = "https://www.linkedin.com/in/christopher-blassiaux-802891198/";

export const ROUTES = {
  home: "/",
  certification: "/deposer-une-certification-rncp-rs",
  certificationRncp: "/deposer-une-certification-rncp-rs/depot-rncp",
  certificationRs: "/deposer-une-certification-rncp-rs/depot-rs",
  formations: "/concevoir-digitaliser-vos-formations",
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
  { href: ROUTES.formations, label: "Concevoir et digitaliser vos formations" },
  { href: ROUTES.about, label: "À propos" },
] as const;

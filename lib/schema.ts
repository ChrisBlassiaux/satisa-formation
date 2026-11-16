import { LINKEDIN_URL, LINKEDIN_COMPANY_URL } from "@/lib/routes";

export const SITE_URL = "https://www.satisa-formation.fr";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/a-propos#chris-blassiaux`;

const orgSameAs = [LINKEDIN_COMPANY_URL].filter(Boolean);

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: "Satisa Formation",
  alternateName: "Satisa",
  url: `${SITE_URL}/`,
  description:
    "Ingénierie de certification RNCP/RS et ingénierie pédagogique et digitale pour les organismes de formation.",
  logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo/logo-satisa-noir.svg` },
  image: `${SITE_URL}/images/photos/profil-chris-apropos-2.webp`,
  email: "chris@satisa.fr",
  telephone: "+33783456753",
  founder: { "@id": PERSON_ID },
  areaServed: { "@type": "Country", name: "France" },
  serviceType: [
    "Accompagnement au dépôt d'une certification RNCP",
    "Accompagnement au dépôt d'une certification RS",
    "Conception de formation conforme Qualiopi",
    "Digitalisation de formation (e-learning, blended learning)",
  ],
  knowsAbout: [
    "Certification professionnelle RNCP",
    "Répertoire spécifique (RS)",
    "France Compétences",
    "Habilitation et certification",
    "Qualiopi",
    "Ingénierie pédagogique",
    "E-learning et LMS",
  ],
  ...(orgSameAs.length > 0 ? { sameAs: orgSameAs } : {}),
};

export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Chris Blassiaux",
  alternateName: "Christopher Blassiaux",
  jobTitle: "Ingénieur de certification et pédagogique",
  url: `${SITE_URL}/a-propos`,
  image: `${SITE_URL}/images/photos/profil-chris-apropos-2.webp`,
  sameAs: [LINKEDIN_URL],
  worksFor: { "@id": ORGANIZATION_ID },
  knowsAbout: ["Certification RNCP", "Répertoire spécifique (RS)", "France Compétences", "Qualiopi", "Ingénierie pédagogique"],
};

export type ServiceOffer = { name: string; price: number; unit?: string };

// Les prix doivent rester identiques à ceux affichés sur les pages d'offre.
export function serviceJsonLd({
  name,
  description,
  url,
  offers,
}: {
  name: string;
  description: string;
  url: string;
  offers: ServiceOffer[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: name,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "France" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Formules : ${name}`,
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        url,
        priceCurrency: "EUR",
        price: offer.price,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: offer.price,
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
          ...(offer.unit ? { unitText: offer.unit } : {}),
        },
      })),
    },
  };
}

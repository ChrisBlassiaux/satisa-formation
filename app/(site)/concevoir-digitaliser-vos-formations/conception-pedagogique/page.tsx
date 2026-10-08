import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FAQ_CONCEPTION, FORMULAS, breadcrumbJsonLd, faqJsonLd } from "@/lib/formations";
import FaqList from "@/components/FaqList";
import FormulaCard from "@/components/FormulaCard";

const TITLE = "Conception de formation conforme Qualiopi - Satisa Formation";
const DESCRIPTION =
  "Conception de programmes de formation conformes Qualiopi, alignés sur votre référentiel RNCP, RS ou interne, et création de contenus : supports, activités, évaluations.";
const URL = "https://www.satisa-formation.fr/concevoir-digitaliser-vos-formations/conception-pedagogique";

export const metadata: Metadata = {
  title: "Conception de formation conforme Qualiopi",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Satisa Formation",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const BREADCRUMB_JSON_LD = breadcrumbJsonLd([
  { name: "Concevoir et digitaliser vos formations", path: ROUTES.formations },
  { name: "Conception pédagogique", path: ROUTES.formationsConception },
]);

export default function ConceptionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_CONCEPTION)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />

      <section className="hero-page hero-page--formations hero-page--wide-h1">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Conception pédagogique</p>
            <h1>Structurez vos formations avec un programme conforme Qualiopi</h1>
            <p className="hero-page__subtitle">
              De l&apos;analyse de votre référentiel et de votre public jusqu&apos;aux supports, activités et
              évaluations : Satisa conçoit le programme et les contenus de vos formations.
            </p>
          </div>
          <div className="hero-page__visual" aria-hidden="true">
            <div className="hero-page__visual-shape">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="28" y="20" width="44" height="60" rx="5" />
                <path d="M38 38h24M38 50h24M38 62h14" />
                <path d="M62 76l10 10 14-14" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Nos formules</p>
            <h2>Choisissez la formule adaptée à votre projet de conception</h2>
            <p className="hero-page__subtitle">
              Structurer votre contenu en un programme pédagogique cohérent et conforme Qualiopi : objectifs,
              progression, supports et évaluations.
            </p>
          </div>
          <div className="formula-cards formula-cards--3">
            <FormulaCard formula={FORMULAS.conception} />
            <FormulaCard formula={FORMULAS.contenus} />
            <FormulaCard formula={FORMULAS.maintenance} />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>La conception pédagogique en détail</h2>
          </div>
          <FaqList items={FAQ_CONCEPTION} />
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontWeight: 700, color: "#002730" }}>
              Vous souhaitez aussi digitaliser vos formations ?
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              →{" "}
              <Link href={ROUTES.formationsDigitalisation} style={{ fontStyle: "italic", textDecoration: "underline" }}>
                Découvrez notre service de digitalisation
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Un projet de formation en tête ?</h2>
              <p>Parlons de votre contenu actuel et de vos objectifs pédagogiques.</p>
            </div>
            <div className="cta-banner__actions">
              <Link href={ROUTES.contact} className="btn btn--primary">Prendre un rendez-vous</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

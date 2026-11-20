import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { IDEA_BOX_TYPE } from "@/lib/contact";
import ToolCard, { TOOLS } from "@/components/ToolCard";

const TITLE = "Boîte à outils : outils gratuits pour votre projet de formation - Satisa Formation";
const DESCRIPTION =
  "Des outils gratuits pour avancer sur votre projet : estimer le prix d'une formation e-learning, choisir entre RS et RNCP. Sans inscription.";

// Page de test : non indexée tant qu'elle n'est pas validée.
export const metadata: Metadata = {
  title: "Boîte à outils",
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, siteName: "Satisa Formation", locale: "fr_FR", type: "website" },
};

export default function ToolboxPage() {
  return (
    <>
      <section className="hero-page hero-page--formations">
        <div className="container">
          <p className="eyebrow">Boîte à outils</p>
          <h1>Des outils gratuits pour avancer sur votre projet</h1>
          <p className="hero-page__subtitle">
            Quelques minutes suffisent pour estimer un budget ou choisir le bon répertoire. Sans inscription.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <h2>Nos outils</h2>
          </div>
          <div className="tb-grid">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.title} tool={tool} />
            ))}
            <article className="tb-card tb-card--soon">
              <div className="tb-card__media tb-card__media--soon" aria-hidden="true">
                <span className="tb-idea">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path className="tb-idea__bulb" d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6M10 22h4" />
                  </svg>
                </span>
              </div>
              <div className="tb-card__body">
                <span className="tb-card__tag">Une idée ?</span>
                <h3 className="tb-card__title">Un outil vous manque ?</h3>
                <p className="tb-card__text">Dites-nous quel outil vous aiderait dans votre projet de formation.</p>
                <Link href={`${ROUTES.contact}?projet=${IDEA_BOX_TYPE}`} className="btn btn--outline tb-card__cta">
                  Nous écrire
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

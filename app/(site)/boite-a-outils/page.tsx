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
                <svg className="tb-idea" viewBox="0 0 200 240" focusable="false">
                  <g className="tb-idea__rays">
                    <path d="M100 4v-3M38 22l-3-3M162 22l3-3M12 82H9M188 82h3M26 138l-3 3M174 138l3 3" />
                  </g>
                  <path
                    className="tb-idea__glass"
                    d="M100 20C60 20 30 50 30 90c0 25 12 40 26 58 8 10 12 20 14 32h60c2-12 6-22 14-32 14-18 26-33 26-58 0-40-30-70-70-70Z"
                  />
                  <path className="tb-idea__shine" d="M54 76c3-18 16-32 34-38" />
                  <path className="tb-idea__filament" d="M88 180v-52c0-10 6-16 12-16s12 6 12 16v52" />
                  <rect className="tb-idea__base" x="68" y="188" width="64" height="14" rx="7" />
                  <rect className="tb-idea__base" x="78" y="208" width="44" height="14" rx="7" />
                </svg>
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

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
                <svg className="tb-idea" viewBox="0 0 300 280" focusable="false">
                  <path
                    className="tb-idea__cloud"
                    d="M70 120C50 100 60 60 100 62c10-27 60-34 80-10 35-12 75 18 60 53 28 20 15 70-20 75 5 30-30 45-55 30-25 22-70 15-75-15-35 5-60-35-35-55 3-8 7-14 15-20Z"
                  />
                  <circle className="tb-idea__cloud" cx="206" cy="234" r="10" />
                  <circle className="tb-idea__cloud" cx="223" cy="253" r="7" />
                  <circle className="tb-idea__cloud" cx="234" cy="268" r="4.5" />
                  <g className="tb-idea__line">
                    <path d="M85 82L68 74M103 60L88 44M128 45L122 25M150 42L150 20M172 45L178 25M197 60L212 44M215 82L232 74" />
                    <path d="M54 122C46 94 62 68 82 58M250 70c18 20 20 52 8 72" />
                    <path d="M150 60c-32 0-50 25-46 52 2 18 14 28 20 44v10h52v-10c6-16 18-26 20-44 4-27-14-52-46-52Z" />
                    <path d="M140 160v-30c0-12 8-16 12-12 4 4 0 12-6 10" />
                    <path d="M126 174c14 8 34-8 48 0M126 186c14 8 34-8 48 0M131 198c12 7 26-6 38 0M142 208h16" />
                  </g>
                  <path className="tb-idea__scribble" d="M166 78c8 4 14 10 18 18M160 90c10 6 16 14 18 24M170 70c6 2 10 4 14 8" />
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

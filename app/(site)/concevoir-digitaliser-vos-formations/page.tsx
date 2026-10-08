import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FAQ_FORMATIONS, breadcrumbJsonLd, faqJsonLd } from "@/lib/formations";
import FaqList from "@/components/FaqList";

const TITLE = "Ingénierie pédagogique et digitalisation - Satisa Formation";
const DESCRIPTION =
  "Conception de parcours de formation conforme Qualiopi, création de contenus pédagogiques, digitalisation e-learning et intégration LMS.";

export const metadata: Metadata = {
  title: "Ingénierie pédagogique et digitalisation",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.satisa-formation.fr/concevoir-digitaliser-vos-formations",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.satisa-formation.fr/concevoir-digitaliser-vos-formations",
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
]);

export default function FormationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_FORMATIONS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />
      <section className="hero-page hero-page--formations">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Ingénierie pédagogique &amp; digital</p>
            <h1>Vous avez le contenu. Il manque la structure pédagogique et la digitalisation.</h1>
            <p className="hero-page__subtitle">
              Votre équipe a les compétences, mais concevoir et digitaliser des formations en parallèle de la
              délivrance, c&apos;est une charge supplémentaire que Satisa peut absorber. Du programme jusqu&apos;au
              déploiement sur votre LMS.
            </p>
            <div className="hero__actions" style={{ marginTop: "1.5rem" }}>
              <Link href={ROUTES.formationsConception} className="btn btn--dark">
                Conception pédagogique
              </Link>
              <Link href={ROUTES.formationsDigitalisation} className="btn btn--outline">
                Digitalisation
              </Link>
            </div>
          </div>
          <div className="hero-page__visual" aria-hidden="true">
            <div className="hero-page__visual-shape">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 20c-14 0-24 10-24 23 0 9 5 15 9 19 3 3 5 6 5 10h20c0-4 2-7 5-10 4-4 9-10 9-19 0-13-10-23-24-23z" />
                <path d="M42 82h16" />
                <path d="M44 90h12" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Conception ou digitalisation ?</p>
            <h2>Concevoir et digitaliser vos formations : deux leviers complémentaires</h2>
          </div>

          <ul className="problem-list problem-list--2col">
            <li>
              <span className="problem-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
                  <path d="M7 10.5V16c0 1.1 2.2 3 5 3s5-1.9 5-3v-5.5" />
                  <path d="M21 7.5v6" />
                </svg>
              </span>
              <div>
                <h3>Conception des formations</h3>
                <p>Structurer votre contenu en un programme pédagogique cohérent et conforme Qualiopi : objectifs, progression, supports et évaluations.</p>
                <Link href={ROUTES.formationsConception} className="problem-list__link">
                  Découvrir la conception pédagogique →
                </Link>
              </div>
            </li>
            <li>
              <span className="problem-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="13" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </span>
              <div>
                <h3>Digitalisation des formations</h3>
                <p>Transformer vos contenus en parcours blended learning ou 100&nbsp;% e-learning, avec intégration LMS (Moodle, Digiforma, 360Learning...).</p>
                <Link href={ROUTES.formationsDigitalisation} className="problem-list__link">
                  Découvrir la digitalisation →
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <h3 className="subsection-title">Les deux axes de digitalisation</h3>
          <div className="digital-axes">
            <div className="digital-axis">
              <div className="digital-axis__head">
                <span className="offer-row__index" aria-hidden="true">1</span>
                <h4>
                  Présentiel &amp; télé-présentiel augmenté <span>(Blended Learning)</span>
                </h4>
              </div>
              <ul className="digital-axis__list">
                <li>Enrichissez vos cours en salle ou en visio avec du contenu complémentaire en ligne</li>
                <li>Plateforme pédagogique disponible en parallèle de la formation</li>
                <li>Supports, vidéos, quiz, exercices pour approfondir les notions</li>
                <li>Plus de temps en présentiel pour la pratique et les échanges</li>
              </ul>
            </div>
            <div className="digital-axis">
              <div className="digital-axis__head">
                <span className="offer-row__index" aria-hidden="true">2</span>
                <h4>
                  Distanciel <span>(E-learning)</span>
                </h4>
              </div>
              <ul className="digital-axis__list">
                <li>Transformez une partie ou l&apos;ensemble de vos formations en modules accessibles 100&nbsp;% à distance</li>
                <li>Capsules vidéos interactives, quiz et exercices auto-corrigés</li>
                <li>Suivi de progression et validation des acquis</li>
                <li>Accessibles à tout moment, sur tout appareil</li>
              </ul>
            </div>
          </div>

          <h3 className="subsection-title">Ce que ça change pour votre organisme de formation</h3>
          <div className="benefit-grid">
            <div className="benefit-tile">
              <span className="benefit-tile__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="9" r="3" />
                  <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  <circle cx="17" cy="8" r="2.5" />
                  <path d="M14.7 14.3c2.7.5 4.3 2.7 4.3 5.7" />
                </svg>
              </span>
              <p className="benefit-tile__title">Attirez plus d&apos;apprenants</p>
              <p className="benefit-tile__text">Une offre accessible à distance élargit votre audience au-delà de votre zone géographique.</p>
            </div>
            <div className="benefit-tile">
              <span className="benefit-tile__icon benefit-tile__icon--accent" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 11a8 8 0 00-14.9-3.5" />
                  <path d="M4 13a8 8 0 0014.9 3.5" />
                  <path d="M5 4v4h4" />
                  <path d="M19 20v-4h-4" />
                </svg>
              </span>
              <p className="benefit-tile__title">Modernisez vos formations</p>
              <p className="benefit-tile__text">Des contenus interactifs et à jour, à la hauteur des attentes de vos apprenants.</p>
            </div>
            <div className="benefit-tile">
              <span className="benefit-tile__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
              </span>
              <p className="benefit-tile__title">Proposez une expérience engageante et flexible</p>
              <p className="benefit-tile__text">Apprentissage à son rythme, sur tout appareil, avec un suivi de la progression.</p>
            </div>
            <div className="benefit-tile">
              <span className="benefit-tile__icon benefit-tile__icon--accent" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M15 6h6v6" />
                </svg>
              </span>
              <p className="benefit-tile__title">Nouvelles sources de revenus</p>
              <p className="benefit-tile__text">Vendez vos modules en ligne ou proposez des formules hybrides à plus forte marge.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Concevoir et digitaliser : vos questions</h2>
          </div>
          <FaqList items={FAQ_FORMATIONS} />
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

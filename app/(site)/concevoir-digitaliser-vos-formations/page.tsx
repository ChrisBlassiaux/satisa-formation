import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FAQ_FORMATIONS, breadcrumbJsonLd, faqJsonLd } from "@/lib/formations";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";

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
                  Découvrir la conception pédagogique <LinkArrow />
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
                  Découvrir la digitalisation <LinkArrow />
                </Link>
              </div>
            </li>
          </ul>
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

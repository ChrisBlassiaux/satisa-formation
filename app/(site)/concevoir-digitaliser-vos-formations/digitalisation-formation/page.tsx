import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  DIGITALISATION_CORE,
  DIGITALISATION_EXTRAS,
  DIGITALISATION_NOTES,
  DIGITALISATION_PLANS,
  FAQ_DIGITALISATION,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/formations";
import DigitalisationSimulator from "@/components/DigitalisationSimulator";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";

const TITLE = "Digitalisation de formation : e-learning et LMS - Satisa Formation";
const DESCRIPTION =
  "Digitalisation de formation : e-learning, blended learning et intégration LMS (Moodle, Digiforma, Teachizy, 360Learning), avec contenus 100 % uniques.";
const URL = "https://www.satisa-formation.fr/concevoir-digitaliser-vos-formations/digitalisation-formation";

export const metadata: Metadata = {
  title: "Digitalisation de formation : e-learning et LMS",
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
  { name: "Digitalisation", path: ROUTES.formationsDigitalisation },
]);

// Motif de points décoratif des cartes de formules : plus dense à mesure que la formule prend en charge.
const MARK_DENSITY = ["sparse", "medium", "dense"];

const EXTRA_ICONS: Record<string, ReactNode> = {
  "Séquençage et scénarisation": (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h7a3.5 3.5 0 000-7H9a3.5 3.5 0 010-7h7" />
    </>
  ),
  "Configuration de la plateforme": (
    <>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </>
  ),
  "Formation à la plateforme + accompagnement 3 mois": (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    </>
  ),
  "Maintenance pédagogique mensuelle": (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M9 15l2 2 4-4" />
    </>
  ),
};

const TOOL_CHIPS = ["Articulate Rise", "Storyline", "iSpring", "SCORM 1.2", "HTML/CSS/JS"];

const DIGITAL_FEATURES = [
  {
    title: "Vidéos pédagogiques et audios",
    text: "Face caméra : nous rédigeons le script, vous conseillons au tournage et montons vos vidéos. Sans vous filmer : motion design et voix off.",
    icon: (
      <>
        <rect x="3" y="5" width="14" height="14" rx="2" />
        <path d="M17 10l4-2.5v9L17 14" />
      </>
    ),
  },
  {
    title: "Exercices et évaluations interactifs sur mesure",
    text: "Quiz, mises en situation, évaluations : adaptés à votre public, alignés sur vos objectifs, avec suivi des résultats.",
    icon: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4h6v3H9z" />
        <path d="M9 13l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Outils auteurs, SCORM et développement web",
    text: "Articulate Rise, Storyline, iSpring ou développement sur-mesure en HTML/CSS/JS, avec export SCORM 1.2.",
    chips: TOOL_CHIPS,
    icon: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" />,
  },
  {
    title: "Exclusivité des contenus",
    text: "Chaque module est conçu en exclusivité pour vous : le contenu vous appartient.",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </>
    ),
  },
  {
    title: "Conforme Qualiopi",
    text: "Des formations digitales conçues pour répondre aux exigences du référentiel Qualiopi (objectifs, modalités d'évaluation, suivi).",
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Intégration et paramétrage sur LMS",
    text: "Déploiement et réglages sur Moodle, Digiforma, Teachizy, 360Learning ou votre plateforme.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <path d="M7 7h.01M7 17h.01" />
      </>
    ),
  },
];

const AXES = [
  {
    num: 1,
    tone: "light",
    title: (
      <>
        Présentiel &amp; télé-présentiel augmenté <span>(Blended Learning)</span>
      </>
    ),
    items: [
      "Enrichissez vos cours en salle ou en visio avec du contenu complémentaire en ligne",
      "Plateforme pédagogique disponible en parallèle de la formation",
      "Supports, vidéos, quiz, exercices pour approfondir les notions",
      "Plus de temps en présentiel pour la pratique et les échanges",
    ],
  },
  {
    num: 2,
    tone: "dark",
    title: (
      <>
        Distanciel <span>(E-learning)</span>
      </>
    ),
    items: [
      "Transformez une partie ou l'ensemble de vos formations en modules accessibles 100 % à distance",
      "Capsules vidéos interactives, quiz et exercices auto-corrigés",
      "Suivi de progression et validation des acquis",
      "Accessibles à tout moment, sur tout appareil",
    ],
  },
];

const BENEFITS = [
  {
    title: "Attirez plus d'apprenants",
    text: "Une offre accessible à distance élargit votre audience au-delà de votre zone géographique.",
    icon: (
      <>
        <circle cx="8" cy="9" r="3" />
        <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M14.7 14.3c2.7.5 4.3 2.7 4.3 5.7" />
      </>
    ),
  },
  {
    title: "Modernisez vos formations",
    text: "Des contenus interactifs et à jour, à la hauteur des attentes de vos apprenants.",
    icon: (
      <>
        <path d="M20 11a8 8 0 00-14.9-3.5" />
        <path d="M4 13a8 8 0 0014.9 3.5" />
        <path d="M5 4v4h4" />
        <path d="M19 20v-4h-4" />
      </>
    ),
  },
  {
    title: "Proposez une expérience engageante et flexible",
    text: "Apprentissage à son rythme, sur tout appareil, avec un suivi de la progression.",
    icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    title: "Nouvelles sources de revenus",
    text: "Vendez vos modules en ligne ou proposez des formules hybrides à plus forte marge.",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 6h6v6" />
      </>
    ),
  },
];

// Grille « Ce que comprend notre service » : même ordre que DIGITAL_FEATURES. Les tuiles reprennent le style du
// socle ; deux d'entre elles (exercices, outils auteurs) sont mises en avant.
const TILE_LAYOUT: { span: number; featured?: boolean }[] = [
  { span: 2 },
  { span: 2, featured: true },
  { span: 2, featured: true },
  { span: 1 },
  { span: 1 },
  { span: 4 },
];

export default function DigitalisationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_DIGITALISATION)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />

      <section className="hero-page hero-page--formations hero-page--wide-h1">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Digitalisation des formations</p>
            <h1>
              Digitalisez vos formations : <span style={{ whiteSpace: "nowrap" }}>e-learning</span> et intégration LMS
            </h1>
            <p className="hero-page__subtitle">
              De votre contenu à la première session : on conçoit, produit et déploie vos formations digitales
              (e-learning ou blended learning) sur votre LMS.
            </p>
          </div>
          <div className="hero-page__visual" aria-hidden="true">
            <div className="hero-page__visual-shape">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="20" y="26" width="60" height="42" rx="5" />
                <path d="M40 78h20M50 68v10" />
                <path d="M45 40l14 7-14 7z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Nos formules</p>
            <h2>Choisissez la formule adaptée à votre projet de digitalisation</h2>
          </div>
          <div className="dg-plans">
            {DIGITALISATION_PLANS.map((plan, index) => {
              const featured = Boolean(plan.badge);
              return (
                <article key={plan.name} className={`dg-plan dg-plan--${featured ? "dark" : "light"}`}>
                  <span className={`dg-plan__mark dg-plan__mark--${MARK_DENSITY[index] ?? "dense"}`} aria-hidden="true" />
                  <div className="dg-plan__top">
                    {plan.badge && (
                      <span className="dg-plan__badge">
                        <svg className="dg-plan__badge-star" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path d="M10 1.6l2.35 4.76 5.25.77-3.8 3.7.9 5.23L10 13.5l-4.7 2.46.9-5.23-3.8-3.7 5.25-.77L10 1.6z" fill="#FECC01" />
                        </svg>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <header className="dg-plan__head">
                    <h3 className="dg-plan__name">{plan.name}</h3>
                    <span className="dg-plan__price">{plan.price}</span>
                  </header>
                  <p className="dg-plan__unit">{plan.unit}</p>
                  <p className="dg-plan__tagline">{plan.tagline}</p>
                  <a href="#socle-inclus" className="dg-plan__core">
                    ✓ Tout le socle inclus <span aria-hidden="true">↓</span>
                  </a>
                  <ul className="dg-plan__list">
                    {plan.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link
                    href={ROUTES.contact}
                    className={`btn ${featured ? "btn--primary" : "btn--dark"} btn--block dg-plan__cta`}
                  >
                    Prendre un rendez-vous
                  </Link>
                </article>
              );
            })}
          </div>
          <ul className="digital-notes">
            {DIGITALISATION_NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="digital-core" id="socle-inclus">
            <p className="digital-core__title">Le socle inclus dans chaque formule</p>
            <ul className="pricing-card__deliverables digital-core__list">
              {DIGITALISATION_CORE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <h3 className="subsection-title digital-extras-title">Formules supplémentaires</h3>
          <p className="digital-extras-intro">À ajouter selon vos besoins, une seule fois par projet de formation, sauf la maintenance, facturée chaque mois.</p>
          <div className="dg-extras">
            {DIGITALISATION_EXTRAS.map((extra) => (
              <article key={extra.name} className="dg-extra">
                <span className="dg-extra__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {EXTRA_ICONS[extra.name]}
                  </svg>
                </span>
                <header className="dg-extra__main">
                  <h4 className="dg-extra__name">{extra.name}</h4>
                  <span className="dg-extra__price">{extra.price}</span>
                </header>
                <div>
                  <p className="dg-extra__text">{extra.text}</p>
                  {extra.list && (
                    <ul className="pricing-card__deliverables">
                      {extra.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {extra.note && <p className="pricing-card__note dg-extra__note">{extra.note}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dg-sim">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Simulateur de prix</p>
            <h2>Estimez le prix de votre projet de digitalisation</h2>
            <p className="hero-page__subtitle sim-section-intro">
              Répondez à quelques questions sur vos contenus et votre organisation : vous obtenez la formule adaptée et
              une estimation en euros HT, sans engagement.
            </p>
          </div>
          <DigitalisationSimulator />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Pourquoi digitaliser</p>
            <h2>Pourquoi créer une formation en ligne ?</h2>
          </div>
          <h3 className="subsection-title subsection-title--start">Les deux axes de digitalisation</h3>
          <div className="dg-axes">
            {AXES.map((axis) => (
              <div key={axis.num} className={`dg-axis dg-axis--${axis.tone}`}>
                <span className="dg-axis__num" aria-hidden="true">{axis.num}</span>
                <h4 className="dg-axis__title">{axis.title}</h4>
                <ul className="dg-axis__list">
                  {axis.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="subsection-title subsection-title--start">Ce que ça change pour votre organisme de formation</h3>
          <div className="dg-benefits">
            {BENEFITS.map((benefit, index) => (
              <div key={benefit.title} className="dg-benefit">
                <span className={`dg-benefit__icon${index % 2 === 1 ? " dg-benefit__icon--accent" : ""}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {benefit.icon}
                  </svg>
                </span>
                <p className="dg-benefit__title">{benefit.title}</p>
                <p className="dg-benefit__text">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Notre savoir-faire</p>
            <h2>Ce que comprend notre service de digitalisation</h2>
          </div>
          <div className="dg-bento">
            {DIGITAL_FEATURES.map((feature, index) => {
              const layout = TILE_LAYOUT[index];
              return (
                <div key={feature.title} className={`dg-tile dg-tile--span-${layout.span}${layout.featured ? " dg-tile--featured" : ""}`}>
                  <span className="dg-tile__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {feature.icon}
                    </svg>
                  </span>
                  <div>
                    <h3 className="dg-tile__title">{feature.title}</h3>
                    <p className="dg-tile__text">{feature.text}</p>
                    {feature.chips && (
                      <ul className="digital-chips">
                        {feature.chips.map((chip) => (
                          <li key={chip} className="tag">{chip}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Délais, compatibilité, sur-mesure</h2>
          </div>
          <FaqList items={FAQ_DIGITALISATION} />
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontWeight: 700, color: "#002730" }}>
              Votre contenu n&apos;est pas encore structuré ?
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <Link href={ROUTES.formationsConception} style={{ fontStyle: "italic", textDecoration: "underline" }}>
                Découvrez notre service de conception pédagogique <LinkArrow />
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

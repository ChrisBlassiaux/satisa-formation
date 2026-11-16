import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { serviceJsonLd, webPageJsonLd } from "@/lib/schema";
import {
  DIGITALISATION_CORE,
  DIGITALISATION_EXTRAS,
  DIGITALISATION_NOTES,
  DIGITALISATION_PLANS,
  FAQ_DIGITALISATION,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/formations";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";
import RelatedArticles from "@/components/RelatedArticles";

const TITLE = "Digitalisation de formation e-learning - Satisa Formation";
const DESCRIPTION =
  "Digitalisation de formation : e-learning sur mesure, blended learning et intégration LMS (Moodle, Teachizy). Formules dès 2 000 € HT. Satisa Formation.";
const URL = "https://www.satisa-formation.fr/concevoir-digitaliser-vos-formations/digitalisation-formation";

export const metadata: Metadata = {
  title: "Digitalisation de formation e-learning",
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

const prixEnNombre = (prix: string) => Number(prix.replace(/\D/g, ""));

// Les prix du balisage viennent des mêmes données que les cartes affichées : ils restent toujours identiques.
const SERVICE_JSON_LD = serviceJsonLd({
  name: "Digitalisation de formation (e-learning et blended learning)",
  description: DESCRIPTION,
  url: URL,
  offers: [
    ...DIGITALISATION_PLANS.map((plan) => ({
      name: `Formule ${plan.name}`,
      price: prixEnNombre(plan.price),
      unit: plan.unit.replace(/^Pour\s+/, "").replace(/\*/g, ""),
    })),
    ...DIGITALISATION_EXTRAS.map((extra) => ({
      name: extra.name,
      price: prixEnNombre(extra.price),
      ...(extra.name.startsWith("Maintenance") ? { unit: "mois" } : {}),
    })),
  ],
});

const WEBPAGE_JSON_LD = webPageJsonLd({
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  dateModified: "2026-11-16",
});

// Les six étapes d'un projet de digitalisation (même enchaînement que la FAQ et le diagnostic).
const STEPS = [
  {
    title: "Cadrage et choix du format",
    text: "Nous analysons votre formation, votre public et vos contraintes pour choisir entre 100 % e-learning, blended learning (présentiel et distanciel) ou classe virtuelle, puis nous fixons la durée d'e-learning à produire.",
  },
  {
    title: "Scénarisation pédagogique",
    text: "Séquençage de la formation, storyboard, choix des activités et des modalités d'évaluation : la formation n'est pas copiée du présentiel, elle est repensée pour la distance.",
  },
  {
    title: "Production des contenus",
    text: "Textes, vidéos (face caméra, ou motion design et voix off), quiz, exercices et corrigés, avec la relecture de votre référent métier.",
  },
  {
    title: "Développement du module",
    text: "Mise en forme dans un outil auteur (Articulate Rise, Storyline, iSpring) ou développement sur mesure en HTML/CSS/JS, avec export SCORM 1.2.",
  },
  {
    title: "Intégration et paramétrage du LMS",
    text: "Déploiement sur Moodle, Digiforma, Teachizy, 360Learning ou votre plateforme : accès, progression, conditions d'achèvement et tests fonctionnels.",
  },
  {
    title: "Lancement et accompagnement",
    text: "Vos équipes sont formées à la plateforme et accompagnées sur la première session, puis une maintenance pédagogique mensuelle est possible.",
  },
];

// E-learning, blended learning, digital learning : les termes que cherchent les prospects.
const TERMS = [
  {
    term: "E-learning",
    definition: "Formation entièrement suivie à distance, en ligne et en autonomie, sur un LMS : modules, quiz et suivi de progression.",
    when: "Public dispersé, rythme libre, grand nombre d'apprenants.",
  },
  {
    term: "Blended learning (formation hybride)",
    definition: "Parcours qui combine des séances en présentiel ou en classe virtuelle et des modules e-learning.",
    when: "Mises en situation, pratique, échanges en groupe.",
  },
  {
    term: "Digital learning",
    definition: "Terme le plus large : tous les formats de formation digitale (e-learning, classe virtuelle, micro-learning, mobile learning, MOOC).",
    when: "Stratégie de formation globale, plusieurs formats à articuler.",
  },
];

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_JSON_LD) }} />

      <aside className="dg-banner" aria-label="Simulateur de prix">
        <div className="container dg-banner__inner">
          <p className="dg-banner__text">
            <svg className="dg-banner__sparkle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path className="dg-banner__sparkle-main" d="M10 4l1.9 5.1L17 11l-5.1 1.9L10 18l-1.9-5.1L3 11l5.1-1.9z" />
              <path className="dg-banner__sparkle-small" d="M18.5 2l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
              <path className="dg-banner__sparkle-tiny" d="M18 15l.6 1.6 1.6.6-1.6.6L18 19.4l-.6-1.6-1.6-.6 1.6-.6z" />
            </svg>
            <span className="dg-banner__short">Estimez votre prix en 1 minute</span>
            <span className="dg-banner__long">Combien coûte votre projet de digitalisation ? Estimez-le en 1 minute.</span>
          </p>
          <Link href={ROUTES.formationsSimulateur} className="btn btn--primary dg-banner__cta">
            Calculer mon tarif <LinkArrow />
          </Link>
        </div>
      </aside>

      <section className="hero-page hero-page--formations hero-page--wide-h1">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Digitalisation des formations</p>
            <h1>
              Digitalisation de formation : <span className="dg-nowrap">e-learning</span> sur mesure et intégration LMS
            </h1>
            <p className="hero-page__subtitle">
              Satisa Formation conçoit, produit et déploie vos formations digitales (e-learning ou blended learning) sur
              votre LMS, de votre contenu existant à la première session.
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
            <h2>Formules de digitalisation de formation : contenu et tarifs HT</h2>
          </div>
          <div className="dg-plans">
            {DIGITALISATION_PLANS.map((plan, index) => {
              const featured = Boolean(plan.badge);
              return (
                <article key={plan.name} className={`dg-plan dg-plan--${featured ? "dark" : "light"}`}>
                  <span className={`dg-plan__mark dg-plan__mark--${MARK_DENSITY[index] ?? "dense"}`} aria-hidden="true" />
                  <div className="dg-plan__top">
                    <span className="dg-plan__index" aria-hidden="true">{plan.index}</span>
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
                    <span aria-hidden="true">✓</span> Tout le socle inclus <span aria-hidden="true">↓</span>
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
            <h3 className="digital-core__title">Le socle inclus dans chaque formule</h3>
            <ul className="pricing-card__deliverables digital-core__list">
              {DIGITALISATION_CORE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <h3 className="subsection-title digital-extras-title">Options supplémentaires</h3>
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
        <div className="container dg-sim__layout">
          <div className="dg-sim__text">
            <div className="section-head">
              <p className="eyebrow">Simulateur de prix</p>
              <h2>Calculez votre tarif sur mesure en 1 minute</h2>
              <p className="hero-page__subtitle sim-section-intro">
                Répondez à quelques questions sur vos contenus et votre organisation : vous obtenez la formule adaptée et
                une estimation en euros HT, sans engagement.
              </p>
            </div>
            <p className="dg-sim__cta">
              <Link href={ROUTES.formationsSimulateur} className="btn btn--primary">
                Calculer mon tarif <LinkArrow />
              </Link>
            </p>
          </div>
          <Image
            className="dg-sim__visual"
            src="/images/simulateur/apercu-simulateur-v2.webp"
            alt="Aperçu du simulateur de prix : trois écrans de questions puis le résultat, avec la formule recommandée et le tarif en euros HT"
            width={1545}
            height={602}
            sizes="(min-width: 768px) 44vw, 100vw"
          />
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
            <p className="eyebrow">Méthode</p>
            <h2>Comment digitaliser une formation ? Les 6 étapes de Satisa Formation</h2>
          </div>
          <p className="seo-lead">
            Digitaliser une formation, c&apos;est transformer un cours présentiel ou des supports existants en parcours{" "}
            <strong>e-learning</strong> ou <strong>blended learning</strong>, disponible sur un LMS, avec scénarisation
            pédagogique, activités, évaluations et suivi des apprenants. Chez Satisa Formation, un projet de
            digitalisation suit six étapes, du cadrage à la première session.
          </p>
          <ol className="dg-steps">
            {STEPS.map((step, index) => (
              <li key={step.title} className="dg-step">
                <span className="dg-step__num" aria-hidden="true">{index + 1}</span>
                <h3 className="dg-step__title">{step.title}</h3>
                <p className="dg-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="seo-more">
            Vous voulez connaître le budget de votre projet ?{" "}
            <Link href={ROUTES.formationsSimulateur}>Estimez le prix de votre formation e-learning en 1 minute</Link>.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Vocabulaire</p>
            <h2>E-learning, blended learning, digital learning : quelles différences ?</h2>
          </div>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <caption className="visually-hidden">Différences entre e-learning, blended learning et digital learning</caption>
              <thead>
                <tr>
                  <th scope="col">Terme</th>
                  <th scope="col">Définition</th>
                  <th scope="col">Quand le choisir</th>
                </tr>
              </thead>
              <tbody>
                {TERMS.map((row) => (
                  <tr key={row.term}>
                    <th scope="row">{row.term}</th>
                    <td data-label="Définition">{row.definition}</td>
                    <td data-label="Quand le choisir">{row.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="seo-more">
            Que vous partiez d&apos;un cours en salle ou de contenus déjà rédigés, Satisa Formation vous aide à choisir le
            bon format, puis à produire la formation digitale correspondante.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Format et plateforme</p>
            <h2>SCORM, xAPI, LMS : quel format et quelle plateforme pour votre formation digitale ?</h2>
          </div>
          <div className="article-body">
            <h3>SCORM 1.2, SCORM 2004 ou xAPI : quel format choisir ?</h3>
            <p>
              <strong>SCORM 1.2</strong> est le format le plus largement compatible avec les LMS, dont Moodle : il suit
              l&apos;achèvement et le score. <strong>SCORM 2004</strong> permet un suivi plus fin, mais sa prise en
              charge varie selon la version de la plateforme. <strong>xAPI</strong> est plus riche mais demande
              généralement un LRS (Learning Record Store). Nous exportons vos modules en SCORM 1.2 et vérifions la
              compatibilité de votre LMS dès le diagnostic.
            </p>
            <h3>Quel LMS choisir pour un organisme de formation ?</h3>
            <p>
              Le bon LMS dépend de votre taille, de votre budget, du suivi attendu (progression, évaluations, assiduité)
              et de son intégration avec vos outils de gestion. Nous intégrons et paramétrons vos contenus sur Moodle,
              Digiforma, Teachizy, 360Learning ou sur votre plateforme.
            </p>
            <h3>Digitalisation de formation et Qualiopi</h3>
            <p>
              Une formation à distance ou hybride doit pouvoir prouver ce qui a été réalisé : traçabilité de
              l&apos;assiduité, évaluation des acquis, accompagnement des apprenants. Nous construisons les parcours et
              le paramétrage du LMS (suivi de progression, conditions d&apos;achèvement, évaluations avec corrections)
              pour répondre aux exigences Qualiopi applicables aux formations à distance.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Satisa Formation</p>
            <h2>Satisa Formation, votre ingénieur pédagogique freelance pour digitaliser vos formations</h2>
          </div>
          <div className="article-body">
            <p>
              Satisa Formation est une structure d&apos;ingénierie pédagogique et d&apos;ingénierie de certification
              RNCP/RS, fondée en 2024 par <strong>Chris Blassiaux</strong>, ingénieur pédagogique et ingénieur de
              certification en freelance. Ancien développeur web et formateur en développement web, Chris conçoit les
              formations digitales de bout en bout : conception pédagogique, création des contenus, développement des
              modules et intégration sur votre LMS.
            </p>
            <p>
              Cette double compétence, pédagogique et technique, permet de proposer des modules e-learning sur mesure en
              HTML/CSS/JS lorsque les outils auteurs ne suffisent plus. Chris est titulaire du CCP1 du titre
              professionnel de formateur professionnel d&apos;adultes (FPA), qui valide la conception de parcours
              multimodaux, la scénarisation pédagogique et la conception d&apos;activités d&apos;apprentissage et
              d&apos;évaluation. Il est également responsable et ingénieur pédagogique freelance au sein de
              l&apos;organisme de formation Cloud Campus.
            </p>
            <ul className="seo-checks">
              <li>Un interlocuteur unique, du référentiel RNCP/RS à la formation digitalisée</li>
              <li>Des contenus conçus en exclusivité, qui vous appartiennent</li>
              <li>Des tarifs affichés et un simulateur de prix en ligne</li>
              <li>Des formations digitales conçues pour répondre aux exigences du référentiel Qualiopi</li>
            </ul>
            <p>
              En savoir plus sur <Link href={ROUTES.about}>Chris Blassiaux et Satisa Formation</Link>, sur la{" "}
              <Link href={ROUTES.formationsConception}>conception pédagogique de formation</Link> ou sur
              l&apos;<Link href={ROUTES.certification}>accompagnement au dépôt d&apos;une certification RNCP/RS</Link>.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Questions fréquentes sur la digitalisation de formation</h2>
          </div>
          <FaqList items={FAQ_DIGITALISATION} />
          <div className="dg-faq-more">
            <p className="dg-faq-more__lead">Votre contenu n&apos;est pas encore structuré ?</p>
            <p>
              <Link href={ROUTES.formationsConception} className="dg-faq-more__link">
                Découvrez notre service de conception pédagogique <LinkArrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <RelatedArticles slugs={["evaluation-formative-sommative-certificative-quelles-differences-en-formation-professionnelle"]} />

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

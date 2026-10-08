import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FAQ_DIGITALISATION, FORMULAS, breadcrumbJsonLd, faqJsonLd } from "@/lib/formations";
import FaqList from "@/components/FaqList";
import FormulaCard from "@/components/FormulaCard";

const TITLE = "Digitalisation de formation : e-learning et LMS - Satisa Formation";
const DESCRIPTION =
  "Digitalisation de vos formations en e-learning ou blended learning : rétroplanning, vidéos, exercices interactifs, SCORM et intégration LMS (Moodle, Digiforma, Teachizy, 360Learning).";
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

const ROADMAP_STEPS = [
  { title: "Rendez-vous de cadrage", text: "On définit vos objectifs, votre public et le périmètre du projet." },
  { title: "Diagnostic et cadrage", text: "Analyse de vos contenus et de votre LMS, validation du plan de production." },
  { title: "Scénarisation et conception digitale", text: "Scénario pédagogique digital et maquettes validés avec vous." },
  { title: "Production des modules", text: "Vidéos, audios, exercices et évaluations interactifs, module par module." },
  { title: "Intégration et paramétrage sur le LMS", text: "Déploiement des modules et réglage des parcours, des accès et du suivi." },
  { title: "Tests et validation", text: "Recette complète avec vous avant l'ouverture aux apprenants." },
  { title: "Accompagnement et première session", text: "Prise en main par vos équipes et appui au lancement." },
];

const TOOL_CHIPS = ["Articulate Rise", "Storyline", "iSpring", "SCORM 1.2", "HTML/CSS/JS"];

const DIGITAL_FEATURES = [
  {
    title: "Vidéos pédagogiques et audios",
    text: "Script, conseils au tournage et montage, de l'écriture à la vidéo finale, et pour les contenus audio.",
    icon: (
      <>
        <rect x="3" y="5" width="14" height="14" rx="2" />
        <path d="M17 10l4-2.5v9L17 14" />
      </>
    ),
  },
  {
    title: "Exercices et évaluations interactifs et personnalisés",
    text: "Quiz, mises en situation et évaluations adaptés à votre public et à vos objectifs, avec suivi des résultats.",
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
    title: "Exclusivité des modules",
    text: "Les modules créés pour vous sont à vous : ils ne sont pas réutilisés pour d'autres clients.",
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

export default function DigitalisationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_DIGITALISATION)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />

      <section className="hero-page hero-page--formations hero-page--wide-h1">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Digitalisation des formations</p>
            <h1>Digitalisez vos formations : e-learning, SCORM et intégration LMS</h1>
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
          <div className="formula-cards formula-cards--2">
            <FormulaCard formula={FORMULAS.digitalisation} />
            <FormulaCard formula={FORMULAS.maintenance} />
          </div>
        </div>
      </section>

      <section className="digital-band">
        <div className="container">
          <h2 className="roadmap-title">Du rendez-vous de cadrage à la première session</h2>
          <ol className="roadmap">
            {ROADMAP_STEPS.map((step, index) => (
              <li key={step.title} className="roadmap__step">
                <span className="roadmap__num" aria-hidden="true">{index + 1}</span>
                <p className="roadmap__title">{step.title}</p>
                <p className="roadmap__text">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="roadmap-note">Délai indicatif : 4 à 8 semaines pour un module e-learning standard.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Ce qui est inclus</p>
            <h2>Ce que comprend notre service de digitalisation</h2>
          </div>
          <div className="digital-features">
            {DIGITAL_FEATURES.map((feature, index) => (
              <div key={feature.title} className="digital-feature">
                <span
                  className={`benefit-tile__icon${index % 2 === 1 ? " benefit-tile__icon--accent" : ""}`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {feature.icon}
                  </svg>
                </span>
                <h3 className="digital-feature__title">{feature.title}</h3>
                <p className="digital-feature__text">{feature.text}</p>
                {feature.chips && (
                  <ul className="digital-chips">
                    {feature.chips.map((chip) => (
                      <li key={chip} className="tag">{chip}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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
              →{" "}
              <Link href={ROUTES.formationsConception} style={{ fontStyle: "italic", textDecoration: "underline" }}>
                Découvrez notre service de conception pédagogique
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

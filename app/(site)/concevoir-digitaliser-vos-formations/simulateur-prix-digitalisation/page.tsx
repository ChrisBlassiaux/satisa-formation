import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { DIGITALISATION_NOTES, DIGITALISATION_PLANS, breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/formations";
import DigitalisationSimulator from "@/components/DigitalisationSimulator";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";

const TITLE = "Simulateur de prix de formation e-learning - Satisa Formation";
const DESCRIPTION =
  "Estimez en 1 minute le prix de la digitalisation de votre formation en e-learning ou en blended learning : formule recommandée et détail du tarif en € HT, sans engagement.";
const URL = `https://www.satisa-formation.fr${ROUTES.formationsSimulateur}`;

export const metadata: Metadata = {
  title: "Simulateur de prix de formation e-learning",
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
  { name: "Simulateur de prix de digitalisation", path: ROUTES.formationsSimulateur },
]);

const FAQ_SIMULATEUR: FaqItem[] = [
  {
    question: "Le résultat du simulateur est-il un devis ?",
    answer:
      "Non, c'est une estimation indicative en euros HT. Elle est confirmée après un échange avec vous et le séquençage de votre formation, qui fixe la durée d'e-learning à produire.",
  },
  {
    question: "Que comprend l'estimation ?",
    answer:
      "La digitalisation de vos contenus : organisation des contenus par module, activités, quiz et évaluations avec leurs corrections, intégration dans votre LMS, tests et deux cycles de relecture par livrable. Selon vos réponses, elle ajoute le séquençage et scénarisation et la configuration de la plateforme. La maintenance pédagogique mensuelle n'est pas incluse.",
  },
  {
    question: "Comment le prix évolue-t-il avec la durée de la formation ?",
    answer:
      "Le prix suit le nombre d'heures d'e-learning à produire, avec un minimum facturé de 20 heures. Le tarif horaire est dégressif au-delà de 20 heures, puis de 40 heures. En blended learning, seules les heures en ligne sont comptées.",
  },
  {
    question: "Que se passe-t-il quand j'envoie mon résultat ?",
    answer:
      "Nous recevons votre simulation avec vos coordonnées et nous vous répondons sous 48 heures. Vous n'avez pas à nous redonner les mêmes informations.",
  },
  {
    question: "Mon projet ne rentre pas dans les questions du simulateur. Que faire ?",
    answer:
      "Prenez un rendez-vous : nous étudions votre projet avec vous et nous le chiffrons sur mesure, par exemple pour un volume important, plusieurs formations ou un besoin de développement spécifique.",
  },
];

const STEPS = [
  {
    num: 1,
    title: "Vos heures d'e-learning",
    text: "Le prix part du nombre d'heures d'e-learning à produire, avec un minimum de 20 heures. Le tarif horaire baisse au-delà de 20 heures, puis de 40 heures.",
  },
  {
    num: 2,
    title: "L'état de vos contenus",
    text: "Contenus prêts : formule Essentielle. Pas prêts, mais un référent métier est disponible : formule Co-construite. Sinon : formule Complète, où nous prenons tout en charge.",
  },
  {
    num: 3,
    title: "Vos options",
    text: "Séquençage et scénarisation (à partir de 900 € HT) et configuration de la plateforme (à partir de 400 € HT) s'ajoutent selon vos réponses. Ils sont inclus dans la formule Complète.",
  },
];

export default function SimulateurPrixPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_SIMULATEUR)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />

      <section className="hero-page hero-page--formations hero-page--wide-h1">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Simulateur de prix</p>
            <h1>Simulateur de prix : combien coûte la digitalisation de votre formation ?</h1>
            <p className="hero-page__subtitle">
              Répondez à quelques questions sur vos contenus et votre organisation : vous obtenez la formule adaptée
              et une estimation en euros HT, en 1 minute, sans engagement.
            </p>
            <ul className="sim-promises">
              <li>3 étapes, 1 minute</li>
              <li>Résultat immédiat</li>
              <li>Sans engagement</li>
            </ul>
          </div>
          <div className="hero-page__visual" aria-hidden="true">
            <div className="hero-page__visual-shape">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="28" y="20" width="44" height="60" rx="5" />
                <rect x="35" y="28" width="30" height="12" rx="2" />
                <path d="M37 52h.01M50 52h.01M63 52h.01M37 63h.01M50 63h.01M63 63h.01M37 73h.01M50 73h.01M63 73h.01" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="dg-sim" id="simulateur">
        <div className="container">
          <DigitalisationSimulator showFormulasLink />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Méthode de calcul</p>
            <h2>Comment est calculé le prix de votre digitalisation ?</h2>
          </div>
          <div className="dg-benefits dg-benefits--3">
            {STEPS.map((step) => (
              <div key={step.num} className="dg-benefit">
                <span className="dg-benefit__icon" aria-hidden="true">{step.num}</span>
                <h3 className="dg-benefit__title">{step.title}</h3>
                <p className="dg-benefit__text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Nos formules</p>
            <h2>Les trois formules de digitalisation en un coup d&apos;œil</h2>
          </div>
          <div className="dg-plans">
            {DIGITALISATION_PLANS.map((plan) => (
              <article key={plan.name} className="dg-plan dg-plan--light">
                <span className="dg-plan__mark dg-plan__mark--medium" aria-hidden="true" />
                <div className="dg-plan__top">
                  <span className="dg-plan__index" aria-hidden="true">{plan.index}</span>
                </div>
                <header className="dg-plan__head">
                  <h3 className="dg-plan__name">{plan.name}</h3>
                  <span className="dg-plan__price">{plan.price}</span>
                </header>
                <p className="dg-plan__unit">{plan.unit}</p>
                <p className="dg-plan__tagline">{plan.tagline}</p>
              </article>
            ))}
          </div>
          <ul className="digital-notes">
            {DIGITALISATION_NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="sim-more-formulas">
            <Link href={ROUTES.formationsDigitalisation} className="btn btn--outline">
              Voir le détail des formules et des options <LinkArrow />
            </Link>
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Le prix de la digitalisation, en détail</h2>
          </div>
          <FaqList items={FAQ_SIMULATEUR} />
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

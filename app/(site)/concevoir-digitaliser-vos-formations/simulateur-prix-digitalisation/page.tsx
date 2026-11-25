import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { DIGITALISATION_PLANS, breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/formations";
import DigitalisationSimulator from "@/components/DigitalisationSimulator";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";
import SimulatorGuide from "@/components/SimulatorGuide";
import Breadcrumb from "@/components/Breadcrumb";

const TITLE = "Calculateur de coût e-learning - Satisa Formation";
const DESCRIPTION =
  "Calculez gratuitement le prix de votre formation e-learning ou blended : recevez votre tarif en 1 minute, sans inscription ni engagement.";
// Description des aperçus de partage (LinkedIn, Facebook, WhatsApp…) : plus directe que celle de Google.
const SHARE_DESCRIPTION =
  "Quelques questions, un tarif en euros HT affiché immédiatement pour votre formation e-learning ou blended learning. Sans inscription, sans engagement.";
const URL = `https://www.satisa-formation.fr${ROUTES.formationsSimulateur}`;

export const metadata: Metadata = {
  title: "Calculateur de coût e-learning",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: URL,
    siteName: "Satisa Formation",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHARE_DESCRIPTION,
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

const COVER_POINTS = ["Quelques questions simples", "Tarif en euros HT affiché immédiatement", "Sans engagement, sans inscription"];

// Ici, pas de renvoi d'astérisque : les notes sont sur la page de détail des formules.
const sansAsterisque = (texte: string) => texte.replace(/\*/g, "");

// Même motif de points que sur la page de vente : plus dense à mesure que la formule prend en charge.
const MARK_DENSITY = ["sparse", "medium", "dense"];

export default function SimulateurPrixPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_SIMULATEUR)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />

      <section className="dg-sim dg-sim--cover">
        <Breadcrumb tone="light" />
        <div className="container sim-cover">
          <div className="sim-cover__text">
            <p className="sim-intro__eyebrow">Calculateur de coût e-learning</p>
            <h1 className="sim-intro__title">Simulateur de prix de formation e-learning</h1>
            <p className="sim-intro__lead">
              Le simulateur de digitalisation calcule gratuitement le coût de votre création de formation e-learning ou
              blended learning pour votre organisme de formation. Il suffit de répondre à quelques questions sur vos
              contenus et vous obtenez un tarif en euros HT rapidement. Aucune coordonnée n&apos;est demandée et vous
              n&apos;êtes recontacté que si vous envoyez votre simulation.
            </p>
            <ul className="sim-intro__points">
              {COVER_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <Image
            className="sim-cover__visual"
            src="/images/simulateur/apercu-simulateur-v4.webp"
            alt=""
            aria-hidden="true"
            width={1535}
            height={591}
            quality={95}
            sizes="(min-width: 1000px) 1300px, 120vw"
            priority
          />
        </div>

        <div className="container dg-sim__tool">
          <DigitalisationSimulator />
        </div>
      </section>

      <SimulatorGuide />

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Nos formules</p>
            <h2>Les trois formules de digitalisation en un coup d&apos;œil</h2>
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
                  <p className="dg-plan__unit">{sansAsterisque(plan.unit)}</p>
                  <p className="dg-plan__tagline">{sansAsterisque(plan.tagline)}</p>
                </article>
              );
            })}
          </div>
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

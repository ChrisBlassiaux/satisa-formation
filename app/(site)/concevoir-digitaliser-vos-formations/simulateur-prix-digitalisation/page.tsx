import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { DIGITALISATION_PLANS, breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/formations";
import DigitalisationSimulator from "@/components/DigitalisationSimulator";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";

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

// Schéma « ce que contient une heure d'e-learning » : ce que suit l'apprenant, et ce qui est produit en amont.
const LEARNER_ITEMS = [
  "Lectures et capsules vidéo",
  "Capsules pédagogiques interactives",
  "Activités et exercices",
  "Quiz et évaluations",
  "Consignes et synthèses",
];

const UPSTREAM_ITEMS = [
  "Scénarisation et storyboard",
  "Rédaction des contenus",
  "Scripts et montage vidéo",
  "Activités et leurs corrections",
  "Intégration et paramétrage",
  "Tests fonctionnels",
  "Relectures et validations",
];

const PRICE_CRITERIA = [
  {
    title: "La durée du parcours",
    text: "C'est le premier facteur : plus il y a d'heures d'e-learning à produire, plus le budget augmente, même si beaucoup de prestataires appliquent un tarif dégressif.",
  },
  {
    title: "L'état de vos contenus",
    text: "Des vidéos finies ou un cours déjà rédigé pour l'apprenant se mettent en ligne rapidement. Des diaporamas de formateur ou des notes demandent d'être réécrits. Sans aucun support, tout est à créer.",
  },
  {
    title: "Qui apporte le savoir",
    text: "Si un expert de votre équipe peut transmettre le contenu, le prestataire se concentre sur la mise en forme. Sinon, il doit faire appel à un expert du sujet, un formateur par exemple, pour produire le contenu : c'est un coût en plus.",
  },
  {
    title: "Les vidéos",
    text: "Le tournage, le montage, l'animation ou le motion design pèsent lourd. Une capsule filmée par votre équipe coûte bien moins qu'une vidéo produite par un studio.",
  },
  {
    title: "Le niveau d'interactivité",
    text: "Des quiz et des exercices classiques restent abordables. Des mises en situation à embranchements, des simulations ou un jeu sérieux demandent beaucoup plus de conception.",
  },
];

const QUOTE_QUESTIONS = [
  {
    question: "Sur quoi porte le prix : la durée de formation pour l'apprenant, ou seulement les minutes de vidéo ?",
    why: "Une heure de formation en ligne contient aussi des lectures, des exercices et des quiz, pas seulement des vidéos",
  },
  {
    question: "Qui rédige le contenu : votre expert ou le prestataire ?",
    why: "C'est souvent une grosse part du travail",
  },
  {
    question: "Les vidéos sont-elles incluses ? Qui tourne, qui monte ?",
    why: "Le tournage et le montage changent fortement le prix",
  },
  {
    question: "Les quiz, exercices et évaluations sont-ils inclus ?",
    why: "Certains devis ne couvrent que la mise en forme",
  },
  {
    question: "L'intégration dans votre plateforme est-elle comprise ?",
    why: "Elle est parfois facturée à part",
  },
  {
    question: "Combien de cycles de relecture sont prévus ?",
    why: "Sans limite écrite, les allers-retours dérapent",
  },
  {
    question: "Que se passe-t-il si la durée réelle change ?",
    why: "Un devis sérieux prévoit une règle d'ajustement",
  },
  {
    question: "Un module pilote est-il prévu ?",
    why: "Il permet de juger sur pièce avant de tout produire",
  },
];

const PRICING_MODES = [
  {
    mode: "À l'heure d'e-learning",
    principle: "Un prix par heure de formation suivie par l'apprenant.",
    check: "Ce que comprend une heure : seulement des vidéos, ou aussi des lectures, des exercices et des quiz.",
  },
  {
    mode: "Au module",
    principle: "Un prix par module, quelle que soit sa longueur.",
    check: "La durée et le contenu d'un module, qui varient d'un prestataire à l'autre.",
  },
  {
    mode: "À la minute de vidéo",
    principle: "Un prix par minute de vidéo produite.",
    check: "Ce qui entoure la vidéo : activités, quiz, intégration.",
  },
  {
    mode: "Au forfait",
    principle: "Un prix global pour le projet.",
    check: "Le périmètre exact et ce qui se passe si le volume change.",
  },
];

export default function SimulateurPrixPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_SIMULATEUR)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />

      <section className="dg-sim dg-sim--cover">
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

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Repères</p>
            <h2>Ce que contient une heure d&apos;e-learning</h2>
          </div>
          <figure className="sim-schema">
            <figcaption className="sim-schema__title">
              Une heure d&apos;e-learning repose sur bien plus que ce que voit l&apos;apprenant
            </figcaption>
            <div className="sim-schema__grid">
              <div className="sim-schema__panel">
                <h3 className="sim-schema__heading">Ce que suit l&apos;apprenant (1&nbsp;h)</h3>
                <ul className="sim-schema__list">
                  {LEARNER_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="sim-schema__link" aria-hidden="true">
                <span className="sim-schema__link-label">pour</span>
                <svg className="sim-schema__arrow" viewBox="0 0 48 16" fill="none">
                  <path d="M47 8H3M10 1.5L3 8l7 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="sim-schema__panel sim-schema__panel--accent">
                <h3 className="sim-schema__heading">Ce que nous produisons en amont</h3>
                <ul className="sim-schema__list">
                  {UPSTREAM_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </figure>
          <div className="sim-prose">
            <p>
              Une heure d&apos;e-learning, c&apos;est une heure de formation suivie par l&apos;apprenant, pas une heure de
              vidéo. Elle mélange des lectures, des capsules vidéo, des capsules pédagogiques interactives, des activités,
              des quiz et des évaluations, reliés par des consignes et des synthèses.
            </p>
            <p>
              Pour que cette heure fonctionne sans formateur, tout doit être préparé en amont : le parcours est scénarisé,
              chaque écran est décrit dans un storyboard, les contenus sont rédigés, les vidéos scriptées et montées, les
              activités créées avec leurs corrections, puis tout est intégré, testé et relu. C&apos;est ce travail
              invisible qui fait la qualité d&apos;un module, et qui explique son prix.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Critères de prix</p>
            <h2>Ce qui fait varier le prix d&apos;un module e-learning</h2>
            <p>Quel que soit le prestataire, cinq critères font varier le prix d&apos;une formation e-learning.</p>
          </div>
          <ol className="sim-criteria">
            {PRICE_CRITERIA.map((criterion, index) => (
              <li key={criterion.title} className="sim-criteria__item">
                <span className="sim-criteria__num" aria-hidden="true">{index + 1}</span>
                <div>
                  <h3 className="sim-criteria__title">{criterion.title}</h3>
                  <p className="sim-criteria__text">{criterion.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="sim-prose">
            <p>
              S&apos;y ajoutent souvent des prestations autour du contenu : le séquençage de la formation, la
              configuration de la plateforme (LMS), la formation de vos équipes et l&apos;accompagnement après la mise en
              ligne.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Comparer</p>
            <h2>Comment comparer deux devis e-learning&nbsp;?</h2>
            <p>
              Deux devis peuvent afficher des prix très différents pour le même projet, simplement parce qu&apos;ils ne
              couvrent pas la même chose. Avant de comparer les montants, comparez ce qu&apos;ils incluent.
            </p>
          </div>
          <div className="sim-table-wrap">
            <table className="sim-table">
              <thead>
                <tr>
                  <th scope="col">Question à poser</th>
                  <th scope="col">Pourquoi elle compte</th>
                </tr>
              </thead>
              <tbody>
                {QUOTE_QUESTIONS.map((row) => (
                  <tr key={row.question}>
                    <th scope="row">{row.question}</th>
                    <td data-label="Pourquoi elle compte">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sim-prose">
            <p>
              Un devis plus cher qui inclut la rédaction, les évaluations et l&apos;intégration peut coûter moins au final
              qu&apos;un devis bas qui les facture en supplément.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Durée</p>
            <h2>E-learning ou blended : bien estimer le nombre d&apos;heures</h2>
          </div>
          <div className="sim-prose">
            <p>
              En 100&nbsp;% e-learning, tout le parcours est produit en ligne : le budget suit la durée totale. En
              blended, seules certaines séquences passent en ligne (apports, exercices individuels, évaluations), le reste
              se fait en présentiel ou en classe virtuelle.
            </p>
            <p>
              Dans les deux cas, une heure de présentiel ne fait pas une heure d&apos;e-learning : en ligne, l&apos;apprenant
              va droit au contenu. Elle donne généralement moins d&apos;une heure en ligne, et c&apos;est le séquençage qui
              fixe la durée réelle.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Modes de tarification</p>
            <h2>Les 4 façons de fixer le prix d&apos;une formation e-learning</h2>
            <p>Aucune n&apos;est meilleure que les autres : l&apos;important est de savoir ce qu&apos;elle couvre.</p>
          </div>
          <div>
            {PRICING_MODES.map((item) => (
              <details key={item.mode} className="faq-item">
                <summary className="faq-item__question">
                  {item.mode}
                  <span className="faq-item__icon" aria-hidden="true"></span>
                </summary>
                <div className="faq-item__answer sim-mode">
                  <p>
                    <strong>Principe :</strong> {item.principle}
                  </p>
                  <p>
                    <strong>Ce qu&apos;il faut vérifier :</strong> {item.check}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Méthode de calcul</p>
            <h2>Comment est calculé le prix chez Satisa ?</h2>
            <p>
              Le simulateur applique la même méthode que nos devis : le prix dépend de ce que vous apportez. Le résultat
              est indicatif ; le prix final est confirmé après un échange et le séquençage de votre formation.
            </p>
          </div>
          <div className="dg-benefits dg-benefits--3">
            <div className="dg-benefit">
              <span className="dg-benefit__icon" aria-hidden="true">1</span>
              <h3 className="dg-benefit__title">Vos heures d&apos;e-learning</h3>
              <p className="dg-benefit__text">
                Le prix part du nombre d&apos;heures d&apos;e-learning à produire, avec un minimum de 20 heures. Le tarif
                horaire baisse au-delà de 20 heures, puis au-delà de 40 heures.
              </p>
            </div>
            <div className="dg-benefit">
              <span className="dg-benefit__icon" aria-hidden="true">2</span>
              <h3 className="dg-benefit__title">L&apos;état de vos contenus</h3>
              <ul className="sim-benefit-list">
                <li>Contenus prêts à l&apos;emploi : formule Essentielle.</li>
                <li>Pas prêts, mais un référent métier peut transmettre le savoir : formule Co-construite.</li>
                <li>Ni contenus prêts, ni référent disponible : formule Complète, Satisa prend tout en charge.</li>
              </ul>
            </div>
            <div className="dg-benefit">
              <span className="dg-benefit__icon" aria-hidden="true">3</span>
              <h3 className="dg-benefit__title">Les options supplémentaires</h3>
              <p className="dg-benefit__text">
                Selon vos réponses, le séquençage et la scénarisation (à partir de 900&nbsp;€&nbsp;HT) et la
                configuration de la plateforme (à partir de 400&nbsp;€&nbsp;HT) s&apos;ajoutent. Ils sont inclus dans la
                formule Complète.
              </p>
            </div>
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

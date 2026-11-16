import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  DIGITALISATION_EXTRAS,
  DIGITALISATION_PLANS,
  breadcrumbJsonLd,
  faqJsonLd,
  type FaqItem,
} from "@/lib/formations";
import { calculer, euros, normaliser, type Answers } from "@/lib/simulateur";
import { webApplicationJsonLd, webPageJsonLd } from "@/lib/schema";
import DigitalisationSimulator from "@/components/DigitalisationSimulator";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";

const TITLE = "Prix formation e-learning : simulateur - Satisa Formation";
const DESCRIPTION =
  "Combien coûte une formation e-learning ? Simulateur gratuit : estimation en euros HT en 1 minute. Formules dès 2 000 € HT. Satisa Formation.";
const URL = `https://www.satisa-formation.fr${ROUTES.formationsSimulateur}`;

export const metadata: Metadata = {
  title: "Prix formation e-learning : simulateur",
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
    question: "Combien coûte la création d'une formation e-learning ?",
    answer:
      "Le prix dépend surtout du nombre d'heures d'e-learning à produire, de l'état de vos contenus (prêts ou à créer) et des options (scénarisation, plateforme). Chez Satisa Formation, la digitalisation démarre à 2 000 € HT pour 20 heures (formule Essentielle), à partir de 3 000 € HT (Co-construite) et à partir de 8 200 € HT (Complète). Le simulateur calcule votre estimation en 1 minute.",
  },
  {
    question: "Quel est le prix d'un module e-learning sur mesure ?",
    answer:
      "Le prix d'un module sur mesure dépend de sa durée, de la part de contenu à créer et de l'accompagnement choisi. Chez Satisa Formation, il se calcule à l'heure d'e-learning, avec un minimum facturé de 20 heures par projet et un tarif dégressif au-delà de 20 puis de 40 heures. Le simulateur donne le montant correspondant à votre projet.",
  },
  {
    question: "Le simulateur de prix e-learning est-il gratuit et sans engagement ?",
    answer:
      "Oui. Le simulateur est gratuit, sans inscription et sans engagement : vous obtenez une estimation en euros HT en 1 minute. Envoyer votre résultat à Satisa Formation est facultatif.",
  },
  {
    question: "Le résultat du simulateur est-il un devis ?",
    answer:
      "Non, c'est une estimation indicative en euros HT. Elle est confirmée après un échange avec vous et le séquençage de votre formation, qui fixe la durée d'e-learning à produire.",
  },
  {
    question: "Peut-on obtenir un devis e-learning en ligne ?",
    answer:
      "Le simulateur donne une estimation immédiate en euros HT. Si vous envoyez votre résultat, Satisa Formation vous répond sous 48 heures et confirme le prix lors d'un échange et du séquençage de votre formation.",
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
    question: "Quelle différence de prix entre les formules Essentielle, Co-construite et Complète ?",
    answer:
      "La différence vient de ce que vous fournissez. Essentielle (dès 2 000 € HT pour 20 h) : vos contenus sont prêts. Co-construite (dès 3 000 € HT) : votre référent métier apporte le savoir et valide le résultat, nous rédigeons le contenu. Complète (dès 8 200 € HT) : nous prenons tout en charge, avec le séquençage, la configuration de la plateforme et la formation à la plateforme inclus.",
  },
  {
    question: "Combien coûte la maintenance d'une formation e-learning ?",
    answer:
      "La maintenance pédagogique mensuelle de Satisa Formation coûte 800 € HT par mois, avec un engagement de 3 mois minimum. Elle comprend la mise à jour des contenus, la maintenance et le paramétrage du LMS. Elle est facultative.",
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
  {
    question: "Qui a conçu ce simulateur ?",
    answer:
      "Ce simulateur de prix est édité par Satisa Formation, structure d'ingénierie pédagogique fondée en 2024 par Chris Blassiaux, ingénieur pédagogique et ingénieur de certification en freelance. Les tarifs affichés sont ceux que Satisa Formation applique à ses projets de digitalisation de formation.",
  },
];

const WEBAPP_JSON_LD = webApplicationJsonLd({
  name: "Simulateur de prix de formation e-learning",
  description: DESCRIPTION,
  url: URL,
});

const WEBPAGE_JSON_LD = webPageJsonLd({
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  dateModified: "2026-11-16",
});

const COVER_POINTS = ["3 questions simples", "Estimation immédiate en euros HT", "Sans engagement, sans inscription"];

// Ici, pas de renvoi d'astérisque : les notes sont sur la page de détail des formules.
const sansAsterisque = (texte: string) => texte.replace(/\*/g, "");

// Même motif de points que sur la page de vente : plus dense à mesure que la formule prend en charge.
const MARK_DENSITY = ["sparse", "medium", "dense"];

// Exemples chiffrés : calculés avec les mêmes règles que le simulateur, donc toujours identiques à son résultat.
const EXAMPLE_DEFS: { situation: string; answers: Answers }[] = [
  {
    situation:
      "Formation 100 % e-learning de 30 heures, contenus déjà prêts, formation déjà séquencée, pas encore de plateforme",
    answers: { format: "100 % e-learning", duree: 30, pret: "oui", sequencee: "oui", plateforme: "non" },
  },
  {
    situation:
      "Formation 100 % e-learning de 20 heures, contenus à créer avec un référent métier disponible, plateforme Moodle déjà configurée",
    answers: {
      format: "100 % e-learning",
      duree: 20,
      pret: "non",
      referent: "oui",
      sequencee: "oui",
      plateforme: "oui",
      plateformeNom: "Moodle",
      configuree: "oui",
    },
  },
  {
    situation: "Formation blended learning de 40 heures dont 20 heures d'e-learning, contenus à créer, sans référent métier",
    answers: { format: "Blended", duree: 40, heures: 20, pret: "non", referent: "non" },
  },
];

const EXAMPLES = EXAMPLE_DEFS.flatMap((example) => {
  const result = calculer(normaliser(example.answers));
  return result ? [{ ...example, result }] : [];
});

const PRICE_FACTORS = [
  {
    title: "Le nombre d'heures d'e-learning",
    text: "C'est le premier facteur : plus il y a d'heures à produire, plus le budget augmente. Chez Satisa Formation, le minimum facturé est de 20 heures par projet et le tarif horaire baisse au-delà de 20 puis de 40 heures. En blended learning, seules les heures en ligne comptent.",
  },
  {
    title: "L'état de vos contenus",
    text: "Des contenus déjà prêts (vidéos finies, cours rédigés) se mettent en ligne pour un budget bien inférieur à des contenus à créer. C'est la différence entre la formule Essentielle et les formules Co-construite et Complète.",
  },
  {
    title: "La disponibilité d'un référent métier",
    text: "Si un formateur ou un expert de votre équipe peut remplir nos cahiers de contenu et valider le résultat, la formule Co-construite suffit. Sinon, la formule Complète prend en charge la création du contenu à partir de vos sources.",
  },
  {
    title: "Le séquençage et la scénarisation",
    text: "Une formation déjà découpée en séquences (durées, activités) est plus rapide à digitaliser. Sinon, le séquençage et la scénarisation structurent le parcours, à partir de 900 € HT selon la durée totale de la formation.",
  },
  {
    title: "La plateforme (LMS)",
    text: "Si votre LMS est déjà configuré, rien à ajouter. Sinon, la configuration de la plateforme démarre à 400 € HT et dépend de la plateforme choisie (Moodle, Teachizy, Digiforma, 360Learning).",
  },
  {
    title: "L'accompagnement et la maintenance",
    text: "La formation à la plateforme avec accompagnement de 3 mois (900 € HT) et la maintenance pédagogique mensuelle (800 € HT par mois, engagement de 3 mois) sont facultatives.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBAPP_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_JSON_LD) }} />

      <section className="dg-sim dg-sim--cover">
        <div className="container sim-cover">
          <div className="sim-cover__text">
            <p className="sim-intro__eyebrow">Simulateur de prix</p>
            <h1 className="sim-intro__title">Simulateur de prix de formation e-learning</h1>
            <p className="sim-intro__lead">
              Répondez à quelques questions sur vos contenus et votre organisation : vous obtenez la formule adaptée et
              une estimation en euros HT, en 1 minute, sans engagement.
            </p>
            <ul className="sim-intro__points">
              {COVER_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <Image
            className="sim-cover__visual"
            src="/images/simulateur/apercu-simulateur-v2.webp"
            alt=""
            aria-hidden="true"
            width={1545}
            height={602}
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
            <p className="eyebrow">Tarifs</p>
            <h2>Combien coûte une formation e-learning ? Les tarifs de Satisa Formation</h2>
          </div>
          <p className="seo-lead">
            Chez Satisa Formation, la digitalisation d&apos;une formation démarre à <strong>2 000 € HT pour 20 heures
            d&apos;e-learning</strong> si vos contenus sont déjà prêts (formule Essentielle), à partir de{" "}
            <strong>3 000 € HT</strong> si votre référent métier apporte le savoir (formule Co-construite) et à partir de{" "}
            <strong>8 200 € HT</strong> si Satisa Formation prend tout en charge (formule Complète). Le prix final dépend
            de la durée d&apos;e-learning, fixée lors du séquençage. Le simulateur ci-dessus calcule votre estimation
            personnalisée en 1 minute.
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <caption className="visually-hidden">
                Tarifs HT de la digitalisation de formation (e-learning et blended learning) chez Satisa Formation,
                novembre 2026
              </caption>
              <thead>
                <tr>
                  <th scope="col">Formule ou option</th>
                  <th scope="col">En bref</th>
                  <th scope="col">Prix (HT)</th>
                </tr>
              </thead>
              <tbody>
                {DIGITALISATION_PLANS.map((plan) => (
                  <tr key={plan.name}>
                    <th scope="row">Formule {plan.name}</th>
                    <td data-label="En bref">{sansAsterisque(plan.tagline)}</td>
                    <td data-label="Prix (HT)">
                      {plan.price} <span className="seo-table__unit">{sansAsterisque(plan.unit).toLowerCase()}</span>
                    </td>
                  </tr>
                ))}
                {DIGITALISATION_EXTRAS.map((extra) => (
                  <tr key={extra.name}>
                    <th scope="row">{extra.name} (option)</th>
                    <td data-label="En bref">
                      {extra.text}
                      {extra.note ? ` ${extra.note}` : ""}
                    </td>
                    <td data-label="Prix (HT)">{extra.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="seo-more">
            Tarifs HT, mis à jour en novembre 2026. Le détail de chaque formule est sur la page{" "}
            <Link href={ROUTES.formationsDigitalisation}>digitalisation de formation</Link>.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Facteurs de prix</p>
            <h2>Ce qui fait varier le prix d&apos;une formation e-learning</h2>
          </div>
          <div className="grid grid--2">
            {PRICE_FACTORS.map((factor) => (
              <div key={factor.title} className="competence-block">
                <h3>{factor.title}</h3>
                <p>{factor.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Exemples</p>
            <h2>Exemples de simulation : combien coûte la digitalisation d&apos;une formation ?</h2>
          </div>
          <ul className="seo-examples">
            {EXAMPLES.map((example) => (
              <li key={example.situation}>
                <p className="seo-examples__situation">{example.situation}</p>
                <p className="seo-examples__result">
                  Formule {example.result.formule} : <strong>{euros(example.result.total)}</strong>
                </p>
                <p className="seo-examples__detail">
                  {example.result.lignes.map((ligne) => `${ligne.libelle} : ${euros(ligne.montant)}`).join(" ; ")}
                </p>
              </li>
            ))}
          </ul>
          <p className="seo-more">Ces exemples sont des estimations indicatives, confirmées lors d&apos;un échange.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Méthode de calcul</p>
            <h2>Comment est calculé le prix de votre formation e-learning ?</h2>
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
            <p className="eyebrow">Satisa Formation</p>
            <h2>Qui est derrière ce simulateur de prix e-learning ?</h2>
          </div>
          <div className="article-body">
            <p>
              Ce simulateur est édité par <strong>Satisa Formation</strong>, structure d&apos;ingénierie pédagogique et
              d&apos;ingénierie de certification RNCP/RS fondée en 2024 par <strong>Chris Blassiaux</strong>, ingénieur
              pédagogique et ingénieur de certification en freelance. Les tarifs affichés sont ceux que Satisa Formation
              applique réellement à ses projets de digitalisation de formation : e-learning, blended learning et
              intégration LMS.
            </p>
            <p>
              Il s&apos;adresse aux organismes de formation, aux centres de formation et aux responsables formation qui
              veulent chiffrer la digitalisation d&apos;une formation avant de demander un devis. Le résultat est une
              estimation indicative, confirmée lors d&apos;un échange et du séquençage de votre formation.
            </p>
            <p>
              Pour aller plus loin : la page{" "}
              <Link href={ROUTES.formationsDigitalisation}>digitalisation de formation (e-learning et LMS)</Link>, la{" "}
              <Link href={ROUTES.formationsConception}>conception pédagogique de formation</Link> et la présentation de{" "}
              <Link href={ROUTES.about}>Chris Blassiaux, ingénieur pédagogique freelance</Link>.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Prix d&apos;une formation e-learning : vos questions</h2>
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

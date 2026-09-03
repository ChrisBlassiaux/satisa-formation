import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import OfferAccordion from "@/components/OfferAccordion";
import OfferRowChevron from "@/components/OfferRowChevron";
import PaymentOptions from "@/components/PaymentOptions";

const TITLE = "Accompagnement au dépôt de certification RNCP/RS - Satisa Formation";
const DESCRIPTION =
  "Faites reconnaître votre expertise RNCP ou RS auprès de France Compétences. Diagnostic, référentiel, dépôt de dossier.";

export const metadata: Metadata = {
  title: "Accompagnement au dépôt de certification RNCP/RS",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs",
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

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment déposer un dossier RNCP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le dépôt d'un dossier RNCP suit un parcours en plusieurs étapes : diagnostic de faisabilité, construction du référentiel de compétences, constitution d'une cohorte pilote, rédaction du dossier puis dépôt et suivi auprès de France Compétences. Satisa vous accompagne sur tout ou partie de ce parcours, selon la formule choisie.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps dure un projet de certification RNCP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Comptez en moyenne 8 à 14 mois entre le diagnostic de faisabilité et la décision de France Compétences, selon la complexité du référentiel et la disponibilité de votre cohorte pilote.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre RNCP et RS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le RNCP certifie un métier complet avec un bloc de compétences structuré, tandis que le RS certifie une compétence ou une pratique professionnelle plus ciblée. Le choix dépend de votre positionnement et de vos financements visés.",
      },
    },
    {
      "@type": "Question",
      name: "Comment enregistrer une certification RNCP ou RS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est le terme officiel employé par France Compétences pour désigner le dépôt d'un dossier au RNCP ou au Répertoire Spécifique : le processus est identique à celui décrit ci-dessus.",
      },
    },
  ],
};

export default function CertificationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <section className="hero-page hero-page--certification">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Ingénierie de certification RNCP/RS</p>
            <h1>Vous formez déjà. Il est temps d&apos;être reconnu RNCP ou RS par France Compétences.</h1>
            <p className="hero-page__subtitle">
              Vous formez des professionnels depuis des années, mais sans certification enregistrée auprès de
              France Compétences, votre expertise reste non reconnue officiellement. Le projet RNCP/RS est
              complexe et personne en interne n&apos;a le temps de le piloter. C&apos;est exactement ce que fait
              Satisa.
            </p>
          </div>
          <div className="hero-page__visual" aria-hidden="true">
            <div className="hero-page__visual-shape">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="50" cy="38" r="26" />
                <path d="M38 38l8 8 16-16" />
                <path d="M36 60l-10 28 14-5 9 12" />
                <path d="M64 60l10 28-14-5-9 12" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Nos formules</p>
            <h2>Choisissez la formule adaptée à votre projet</h2>
          </div>

          <OfferAccordion>
            <div className="offer-row">
              <button type="button" className="offer-row__header" aria-expanded="false" aria-controls="offer-body-1">
                <span className="offer-row__title">
                  <span className="offer-row__name-row">
                    <span className="offer-row__index" aria-hidden="true">1</span>
                    <span className="offer-row__name">Diagnostic de faisabilité</span>
                  </span>
                </span>
                <span className="offer-row__meta">
                  <span className="offer-row__price">700 € HT</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-1" hidden>
                <span className="offer-row__highlight">Déductible de toute mission signée dans les 60 jours suivants</span>
                <ul className="pricing-card__deliverables">
                  <li>Analyse du projet</li>
                  <li>Étude de faisabilité</li>
                  <li>Rapport avec recommandations et plan d&apos;action</li>
                  <li>Entretien de restitution</li>
                </ul>
                <Link href={ROUTES.contact} className="btn btn--primary btn--block">Prendre un rendez-vous</Link>
              </div>
            </div>

            <div className="offer-row-pair">
              <div className="offer-row">
                <button type="button" className="offer-row__header" data-pair="23" aria-expanded="false" aria-controls="offer-body-2">
                  <span className="offer-row__title">
                    <span className="offer-row__name-row">
                      <span className="offer-row__index" aria-hidden="true">2</span>
                      <span className="offer-row__name">Certification guidée</span>
                    </span>
                    <span className="offer-card__subtitle">Vous produisez, nous vous guidons</span>
                  </span>
                  <span className="offer-row__meta">
                    <span className="offer-row__price offer-row__price--dual">
                      <span className="offer-row__price-item" data-label="RS">4 000 €</span>
                      <span className="offer-row__price-sep">–</span>
                      <span className="offer-row__price-item" data-label="RNCP">5 000 € HT</span>
                    </span>
                    <OfferRowChevron />
                  </span>
                </button>
                <div className="offer-row__body" id="offer-body-2" hidden>
                  <ul className="pricing-card__deliverables">
                    <li>Rétroplanning partagé, vous pilotez l&apos;avancement</li>
                    <li>Trames et modèles de documents fournis</li>
                    <li>Assistance à la rédaction de l&apos;ensemble des livrables</li>
                    <li>Relectures et corrections à chaque étape clé</li>
                    <li>Coordination avec votre référent métier</li>
                    <li>Assistance au dépôt du dossier sur le site de France Compétences</li>
                    <li>Suivi jusqu&apos;à la décision finale de France Compétences</li>
                  </ul>
                  <p className="pricing-card__note">Votre référent métier : responsable pédagogique, ingénieur pédagogique ou formateur.</p>
                  <PaymentOptions
                    title="RNCP"
                    options={[
                      { icon: "check", label: "Paiement unique", price: "5 000 € HT" },
                      { icon: "calendar", label: "Paiement échelonné", price: "3 000 €", detail: "à la signature + 500 €/mois pendant 4 mois" },
                    ]}
                  />
                  <PaymentOptions
                    title="RS"
                    options={[
                      { icon: "check", label: "Paiement unique", price: "4 000 € HT" },
                      { icon: "calendar", label: "Paiement échelonné", price: "2 400 €", detail: "à la signature + 400 €/mois pendant 4 mois" },
                    ]}
                  />
                  <Link href={ROUTES.contact} className="btn btn--primary btn--block">Prendre un rendez-vous</Link>
                </div>
              </div>

              <div className="offer-row">
                <button type="button" className="offer-row__header" data-pair="23" aria-expanded="false" aria-controls="offer-body-3">
                  <span className="offer-row__title">
                    <span className="offer-row__name-row">
                      <span className="offer-row__index" aria-hidden="true">3</span>
                      <span className="offer-row__name">Certification pilotée</span>
                    </span>
                    <span className="offer-card__subtitle">Nous produisons, vous validez</span>
                  </span>
                  <span className="offer-row__meta">
                    <span className="offer-row__price offer-row__price--dual">
                      <span className="offer-row__price-item" data-label="RS">8 000 €</span>
                      <span className="offer-row__price-sep">–</span>
                      <span className="offer-row__price-item" data-label="RNCP">10 000 € HT</span>
                    </span>
                    <OfferRowChevron />
                  </span>
                </button>
                <div className="offer-row__body" id="offer-body-3" hidden>
                  <ul className="pricing-card__deliverables">
                    <li>Rétroplanning partagé, nous pilotons l&apos;avancement</li>
                    <li>Analyse du métier et mapping des compétences avec votre référent métier</li>
                    <li>Rédaction intégrale du référentiel</li>
                    <li>Rédaction de l&apos;ensemble des documents du dossier</li>
                    <li>Pilotage opérationnel de la cohorte pilote (recrutement, stages, collecte des données d&apos;insertion)</li>
                    <li>Pilotage opérationnel de la collecte des courriers de témoignages et de soutien</li>
                    <li>Assistance au dépôt du dossier sur le site de France Compétences</li>
                    <li>Suivi jusqu&apos;à la décision finale de France Compétences</li>
                  </ul>
                  <p className="pricing-card__note">Votre référent métier : responsable pédagogique, ingénieur pédagogique ou formateur.</p>
                  <PaymentOptions
                    title="RNCP"
                    options={[
                      { icon: "check", label: "Paiement unique", price: "10 000 € HT" },
                      { icon: "calendar", label: "Paiement échelonné", price: "4 000 €", detail: "à la signature + 1 000 €/mois pendant 6 mois" },
                    ]}
                  />
                  <PaymentOptions
                    title="RS"
                    options={[
                      { icon: "check", label: "Paiement unique", price: "8 000 € HT" },
                      { icon: "calendar", label: "Paiement échelonné", price: "3 200 €", detail: "à la signature + 800 €/mois pendant 6 mois" },
                    ]}
                  />
                  <Link href={ROUTES.contact} className="btn btn--primary btn--block">Prendre un rendez-vous</Link>
                </div>
              </div>
            </div>

            <div className="offer-row">
              <button type="button" className="offer-row__header" aria-expanded="false" aria-controls="offer-body-4">
                <span className="offer-row__title">
                  <span className="offer-row__name-row">
                    <span className="offer-row__index" aria-hidden="true">4</span>
                    <span className="offer-row__name">Ingénieur de certification intégré</span>
                  </span>
                </span>
                <span className="offer-row__meta">
                  <span className="offer-row__price">500 € HT/jour</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-4" hidden>
                <p className="pricing-card__note">Sous réserve de disponibilité.</p>
                <ul className="pricing-card__deliverables">
                  <li>Intégration freelance dans votre équipe</li>
                  <li>Disponible au quotidien</li>
                  <li>100 % distanciel</li>
                  <li>Différents rythmes possibles</li>
                </ul>
                <Link href={ROUTES.contact} className="btn btn--primary btn--block">Prendre un rendez-vous</Link>
              </div>
            </div>

            <div className="offer-row">
              <button type="button" className="offer-row__header" aria-expanded="false" aria-controls="offer-body-5">
                <span className="offer-row__title">
                  <span className="offer-row__name-row">
                    <span className="offer-row__index" aria-hidden="true">5</span>
                    <span className="offer-row__name">Responsable de certification externalisé</span>
                  </span>
                </span>
                <span className="offer-row__meta">
                  <span className="offer-row__price">500 € HT/mois</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-5" hidden>
                <p className="pricing-card__note">Post-dépôt.</p>
                <ul className="pricing-card__deliverables">
                  <li>Réunion mensuelle de suivi de la certification</li>
                  <li>Veille réglementaire RNCP/RS ciblée</li>
                  <li>Mise à jour des documents opérationnels (grilles, règlement, guide du jury)</li>
                  <li>Service Q/R, réponse sous 48h</li>
                  <li>Audit de conformité annuel</li>
                </ul>
                <Link href={ROUTES.contact} className="btn btn--primary btn--block">Prendre un rendez-vous</Link>
              </div>
            </div>
          </OfferAccordion>
        </div>
      </section>

      <section className="problem-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Le problème</p>
            <h2>Ce que vivent les organismes de formation sans certification RNCP ou RS</h2>
          </div>
          <ul className="problem-list">
            <li>
              <span className="problem-list__icon" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="30" y="46" width="40" height="32" rx="4" />
                  <path d="M38 46V34a12 12 0 0 1 24 0v12" />
                  <circle cx="50" cy="60" r="3.5" />
                  <path d="M50 64v6" />
                </svg>
              </span>
              <div>
                <h3>Pas d&apos;accès au CPF</h3>
                <p>Vos apprenants ne peuvent pas mobiliser leur compte formation, ce qui ferme une part importante du marché.</p>
              </div>
            </li>
            <li>
              <span className="problem-list__icon" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 42l28-16 28 16" />
                  <path d="M26 42v30M40 42v30M60 42v30M74 42v30" />
                  <path d="M20 78h60" />
                  <path d="M18 42h64" />
                </svg>
              </span>
              <div>
                <h3>Aucun titre reconnu pour vos apprenants</h3>
                <p>Vos formations sont solides, mais sans certification RNCP ou RS, vos apprenants ne repartent avec aucun titre reconnu à valoriser sur leur CV ou auprès d&apos;un employeur.</p>
              </div>
            </li>
            <li>
              <span className="problem-list__icon" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="50" cy="50" r="14" />
                  <path d="M50 22v10M50 68v10M78 50h-10M22 50h10M69 31l-7 7M38 62l-7 7M69 69l-7-7M38 38l-7-7" />
                </svg>
              </span>
              <div>
                <h3>Un projet complexe, sans ressources internes</h3>
                <p>Référentiel, cohorte pilote, dossier administratif : personne en interne n&apos;a le temps ni l&apos;expertise pour piloter ce projet en plus de son activité.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Ce qui différencie Satisa</p>
            <h2>Une expertise pensée pour le terrain</h2>
          </div>
          <div className="grid grid--3">
            <div className="card">
              <span className="card__icon card__icon--accent" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5c2-1.2 5-1.2 8 0v13c-3-1.2-6-1.2-8 0V5z" />
                  <path d="M20 5c-2-1.2-5-1.2-8 0v13c3-1.2 6-1.2 8 0V5z" />
                </svg>
              </span>
              <h3>La pédagogie intégrée à la certification</h3>
              <p>Ingénieur pédagogique avant d&apos;être ingénieur de certification : le référentiel de compétences construit avec vous est pensé pour être formé, pas seulement pour être déposé.</p>
            </div>
            <div className="card">
              <span className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <polygon points="15.5 8.5 13.2 13.2 8.5 15.5 10.8 10.8 15.5 8.5" />
                </svg>
              </span>
              <h3>Un accompagnement qui s&apos;adapte à votre équipe</h3>
              <p>Selon la formule choisie, Satisa prend en charge tout ou une partie du projet : rétroplanning, rédaction, coordination avec votre référent métier, jusqu&apos;à la décision finale.</p>
            </div>
            <div className="card">
              <span className="card__icon card__icon--accent" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <h3>Tarifs clairs et affichés</h3>
              <p>Nos formules de certification RNCP/RS ont un prix défini, visible directement sur le site. Pas de devis préalable pour connaître le budget.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Le processus RNCP/RS en détail</h2>
          </div>
          <div>
            <details className="faq-item">
              <summary className="faq-item__question">
                Comment déposer un dossier RNCP ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Le dépôt d&apos;un dossier RNCP suit un parcours en plusieurs étapes : diagnostic de faisabilité, construction du référentiel de compétences, constitution d&apos;une cohorte pilote, rédaction du dossier puis dépôt et suivi auprès de France Compétences. Satisa vous accompagne sur tout ou partie de ce parcours, selon la formule choisie.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Combien de temps dure un projet de certification RNCP ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Comptez en moyenne 8 à 14 mois entre le diagnostic de faisabilité et la décision de France Compétences, selon la complexité du référentiel et la disponibilité de votre cohorte pilote.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Quelle est la différence entre RNCP et RS ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Le RNCP certifie un métier complet, structuré en blocs de compétences. Le RS certifie une compétence ou une pratique professionnelle plus ciblée. Le choix dépend de votre positionnement et des financements visés.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Comment enregistrer une certification RNCP ou RS ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">C&apos;est le terme officiel employé par France Compétences pour désigner le dépôt d&apos;un dossier au RNCP ou au Répertoire Spécifique : le processus est identique à celui décrit ci-dessus.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Dois-je avoir déjà formé des apprenants avant de déposer ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Oui, une cohorte pilote ayant suivi votre formation est nécessaire pour démontrer la pertinence du référentiel et collecter les données d&apos;insertion attendues par France Compétences.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Que se passe-t-il si France Compétences refuse le dossier ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Un refus donne lieu à des observations précises. Le suivi inclus dans les formules 2 et 3 couvre l&apos;analyse de ces retours et l&apos;ajustement du dossier en vue d&apos;un nouveau dépôt.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Les tarifs affichés sont-ils fixes ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Oui pour les formules 1, 2 et 3. La formule 4 est facturée en régie selon le temps engagé, et la formule 5 est un abonnement mensuel sans engagement de durée minimale.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Puis-je payer en plusieurs fois ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Oui, les formules 2 et 3 proposent chacune une option de paiement échelonné sur plusieurs mois, détaillée dans chaque formule ci-dessus.</p>
            </details>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Un projet de certification en tête ?</h2>
              <p>Commençons par un échange pour évaluer la faisabilité de votre projet.</p>
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

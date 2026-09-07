import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import OfferAccordion from "@/components/OfferAccordion";
import OfferRowChevron from "@/components/OfferRowChevron";
import PaymentOptions from "@/components/PaymentOptions";

const TITLE = "Accompagnement au dépôt RS - Satisa Formation";
const DESCRIPTION =
  "Accompagnement au dépôt d'une certification RS auprès de France Compétences : diagnostic, référentiel ciblé, cohorte pilote, dépôt du dossier.";

export const metadata: Metadata = {
  title: "Accompagnement au dépôt RS",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/depot-rs",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/depot-rs",
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
      name: "Comment déposer un dossier RS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le dépôt d'un dossier RS suit un parcours similaire au RNCP, mais plus resserré : diagnostic de faisabilité, construction du référentiel de compétences ciblé sur la pratique visée, constitution d'une cohorte pilote, rédaction du dossier puis dépôt et suivi auprès de France Compétences. Satisa vous accompagne sur tout ou partie de ce parcours, selon la formule choisie.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps dure un projet de certification RS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Comptez en moyenne 6 à 12 mois entre le diagnostic de faisabilité et la décision de France Compétences, selon la complexité du référentiel et la disponibilité de votre cohorte pilote.",
      },
    },
    {
      "@type": "Question",
      name: "Dois-je avoir déjà formé des apprenants avant de déposer un dossier RS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, comme pour le RNCP, une cohorte pilote ayant suivi votre formation est nécessaire pour démontrer la pertinence du référentiel et collecter les données d'insertion attendues par France Compétences.",
      },
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il si France Compétences refuse le dossier ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un refus donne lieu à des observations précises. Le suivi inclus dans les formules 2 et 3 couvre l'analyse de ces retours et l'ajustement du dossier en vue d'un nouveau dépôt.",
      },
    },
    {
      "@type": "Question",
      name: "Les tarifs affichés sont-ils fixes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui pour les formules 1, 2 et 3. La formule 4 est facturée en régie selon le temps engagé, et la formule 5 est un abonnement mensuel sans engagement de durée minimale.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je payer en plusieurs fois ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, les formules 2 et 3 proposent chacune une option de paiement échelonné sur plusieurs mois, détaillée dans chaque formule ci-dessus.",
      },
    },
  ],
};

export default function CertificationRsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <section className="hero-page hero-page--certification">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Ingénierie de certification RS</p>
            <h1>Vous formez déjà une compétence ciblée. Il est temps d&apos;être reconnu RS par France Compétences.</h1>
            <p className="hero-page__subtitle">
              Sans certification RS enregistrée auprès de France Compétences, votre expertise reste non reconnue
              officiellement et vos apprenants n&apos;ont accès ni au CPF ni à un titre valorisable. Satisa pilote
              le projet à vos côtés, du référentiel jusqu&apos;à la décision finale.
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
            <h2>Choisissez la formule adaptée à votre projet RS</h2>
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
                    <span className="offer-row__price">4 000 € HT</span>
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
                    <span className="offer-row__price">8 000 € HT</span>
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
                  <li>Veille réglementaire RS ciblée</li>
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

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Le dépôt RS en détail</h2>
          </div>
          <div>
            <details className="faq-item">
              <summary className="faq-item__question">
                Comment déposer un dossier RS ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Le dépôt d&apos;un dossier RS suit un parcours similaire au RNCP, mais plus resserré : diagnostic de faisabilité, construction du référentiel de compétences ciblé sur la pratique visée, constitution d&apos;une cohorte pilote, rédaction du dossier puis dépôt et suivi auprès de France Compétences. Satisa vous accompagne sur tout ou partie de ce parcours, selon la formule choisie.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Combien de temps dure un projet de certification RS ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Comptez en moyenne 6 à 12 mois entre le diagnostic de faisabilité et la décision de France Compétences, selon la complexité du référentiel et la disponibilité de votre cohorte pilote.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Dois-je avoir déjà formé des apprenants avant de déposer un dossier RS ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Oui, comme pour le RNCP, une cohorte pilote ayant suivi votre formation est nécessaire pour démontrer la pertinence du référentiel et collecter les données d&apos;insertion attendues par France Compétences.</p>
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
              <h2>Un projet de certification RS en tête ?</h2>
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

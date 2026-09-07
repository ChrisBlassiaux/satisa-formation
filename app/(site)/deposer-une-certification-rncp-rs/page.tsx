import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

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
      name: "Quelle est la vraie différence entre RNCP et RS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le RNCP certifie un métier complet, structuré en blocs de compétences, avec une portée large sur le marché du travail. Le RS certifie une compétence ou une pratique professionnelle plus ciblée, souvent complémentaire à un métier déjà exercé.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on déposer les deux pour le même organisme ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Beaucoup d'organismes construisent d'abord une certification RS sur une compétence phare, puis un RNCP une fois la structure et la cohorte pilote consolidées.",
      },
    },
    {
      "@type": "Question",
      name: "Et si je ne sais toujours pas lequel choisir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est le rôle du diagnostic de faisabilité : en 700 € HT, on qualifie votre projet, votre référentiel potentiel et on tranche avec vous entre RNCP et RS avant tout engagement plus large.",
      },
    },
    {
      "@type": "Question",
      name: "Comment enregistrer une certification RNCP ou RS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est le terme officiel employé par France Compétences pour désigner le dépôt d'un dossier au RNCP ou au Répertoire Spécifique : chaque parcours est détaillé sur sa page dédiée.",
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
            <h1>RNCP ou RS : quelle certification fait avancer votre organisme ?</h1>
            <p className="hero-page__subtitle">
              Les deux répertoires ouvrent l&apos;accès au CPF et à la reconnaissance France Compétences, mais ne
              répondent pas au même projet. Cette page vous aide à choisir, avant d&apos;entrer dans le détail des
              formules.
            </p>
            <div className="hero__actions" style={{ marginTop: "1.5rem" }}>
              <Link href={ROUTES.certificationRncp} className="btn btn--dark">
                Dépôt RNCP
              </Link>
              <Link href={ROUTES.certificationRs} className="btn btn--outline">
                Dépôt RS
              </Link>
            </div>
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
            <p className="eyebrow">Comparatif</p>
            <h2>Deux répertoires, deux logiques</h2>
            <p className="hero-page__subtitle">
              Le RNCP certifie un métier complet. Le RS certifie une compétence ou une pratique ciblée. Le bon
              choix dépend de ce que vos apprenants font une fois formés.
            </p>
          </div>
          <div className="grid grid--2">
            <div className="card card--service">
              <div className="compare-card__body">
                <span className="tag card__tag">Répertoire national</span>
                <h3>RNCP</h3>
                <p>
                  Certifie un métier complet, structuré en blocs de compétences. Pour les organismes qui forment
                  sur un poste ou une fonction entière.
                </p>
                <dl className="compare-facts">
                  <dt>Certifie</dt>
                  <dd>Un métier, en blocs de compétences</dd>
                  <dt>Durée moyenne</dt>
                  <dd>8 à 14 mois</dd>
                  <dt>Adapté si</dt>
                  <dd>Vous formez sur un poste entier</dd>
                </dl>
              </div>
              <Link href={ROUTES.certificationRncp} className="btn btn--primary">Voir le dépôt RNCP</Link>
            </div>
            <div className="card card--service">
              <div className="compare-card__body">
                <span className="tag card__tag">Répertoire spécifique</span>
                <h3>RS</h3>
                <p>
                  Certifie une compétence ou une pratique professionnelle ciblée. Pour les organismes qui forment
                  sur un savoir-faire précis.
                </p>
                <dl className="compare-facts">
                  <dt>Certifie</dt>
                  <dd>Une compétence ciblée</dd>
                  <dt>Durée moyenne</dt>
                  <dd>8 à 14 mois</dd>
                  <dt>Adapté si</dt>
                  <dd>Vous formez sur une pratique précise</dd>
                </dl>
              </div>
              <Link href={ROUTES.certificationRs} className="btn btn--primary">Voir le dépôt RS</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tinted">
        <div className="container" style={{ maxWidth: "720px" }}>
          <div className="section-head">
            <h2>RNCP ou RS : comment choisir ?</h2>
          </div>
          <div>
            <div className="decision-row">
              <span className="decision-row__who">Choisissez le RNCP</span>
              <p>
                si votre formation prépare à un métier entier et que vos apprenants doivent pouvoir se prévaloir
                d&apos;un titre reconnu sur l&apos;ensemble d&apos;une fonction.
              </p>
            </div>
            <div className="decision-row">
              <span className="decision-row__who">Choisissez le RS</span>
              <p>
                si votre formation cible une compétence précise, avec un référentiel plus resserré et complémentaire
                à un métier déjà exercé.
              </p>
            </div>
            <div className="decision-row">
              <span className="decision-row__who" style={{ color: "#4a6b70" }}>Vous hésitez encore</span>
              <p>
                le diagnostic de faisabilité (700 € HT) tranche la question avec vous, avant tout engagement sur
                une formule de dépôt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Le problème</p>
            <h2>Ce que vivent les organismes de formation sans certification enregistrée</h2>
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
                <h3>Un choix difficile à trancher seul</h3>
                <p>RNCP ou RS : le mauvais choix coûte du temps et remet le dossier en question en cours de route.</p>
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
              <p>Chaque formule a un prix clair, affiché dès la première page de son offre, sans devis à demander en amont.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>RNCP ou RS : les questions qu&apos;on nous pose ?</h2>
          </div>
          <div>
            <details className="faq-item">
              <summary className="faq-item__question">
                Quelle est la vraie différence entre RNCP et RS ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Le RNCP certifie un métier complet, structuré en blocs de compétences, avec une portée large sur le marché du travail. Le RS certifie une compétence ou une pratique professionnelle plus ciblée, souvent complémentaire à un métier déjà exercé.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Peut-on déposer les deux pour le même organisme ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Oui. Beaucoup d&apos;organismes construisent d&apos;abord une certification RS sur une compétence phare, puis un RNCP une fois la structure et la cohorte pilote consolidées.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Et si je ne sais toujours pas lequel choisir ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">C&apos;est le rôle du diagnostic de faisabilité : en 700 € HT, on qualifie votre projet, votre référentiel potentiel et on tranche avec vous entre RNCP et RS avant tout engagement plus large.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Comment enregistrer une certification RNCP ou RS ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">C&apos;est le terme officiel employé par France Compétences pour désigner le dépôt d&apos;un dossier au RNCP ou au Répertoire Spécifique : chaque parcours est détaillé sur sa page dédiée.</p>
            </details>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontWeight: 700, color: "#002730" }}>
              Pour aller plus loin, consultez nos articles de blog associés :
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              →{" "}
              <Link
                href={`${ROUTES.blog}/cpf-rncp-rs-difference`}
                style={{ fontStyle: "italic", textDecoration: "underline" }}
              >
                RNCP ou RS : quelle certification pour votre offre ?
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Un projet de certification en tête ?</h2>
              <p>30 minutes pour cadrer votre besoin et trancher entre RNCP et RS, sans engagement.</p>
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

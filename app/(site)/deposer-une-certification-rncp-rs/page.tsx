import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const TITLE = "RNCP ou RS : quelle certification choisir ? - Satisa Formation";
const DESCRIPTION =
  "RNCP ou RS ? Comparez les deux répertoires France Compétences et trouvez le bon choix pour votre organisme de formation. Diagnostic dès 700 € HT.";

export const metadata: Metadata = {
  title: "RNCP ou RS : quelle certification choisir ?",
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
      name: "Faut-il déjà avoir des apprenants formés pour déposer un dossier RNCP/RS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, dans les deux cas. France Compétences exige des données réelles sur au moins deux promotions d'apprenants déjà formés, pour vérifier leur insertion professionnelle avant d'accepter le dossier. Une exception existe pour les métiers émergents. C'est justement l'objet du diagnostic de faisabilité que de vérifier où en est votre projet sur ce point.",
      },
    },
  ],
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.satisa-formation.fr/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Déposer une certification RNCP/RS",
      item: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
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
                  <dd>6 à 12 mois</dd>
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
            <div className="decision-row">
              <span className="decision-row__who" style={{ color: "#4a6b70" }}>Vous doutez de votre éligibilité</span>
              <p>
                cohorte pilote, activité déjà exercée, référentiel construit : certains critères sont à réunir
                avant de déposer, quel que soit le répertoire visé.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Votre situation</p>
            <h2>Dans quelle situation êtes-vous ?</h2>
          </div>
          <div className="profile-cards">
            <div className="profile-card">
              <span className="profile-card__number">1</span>
              <h3>Vous formez sans certification enregistrée</h3>
              <p>
                Vous animez des formations sur votre expertise, vos apprenants progressent, mais ils repartent avec
                une attestation de formation, pas une certification reconnue. Le CPF vous est fermé, et une partie
                de votre marché aussi.
              </p>
              <ul className="profile-card__list profile-card__list--negative">
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  L&apos;accès au CPF fermé pour vos apprenants
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  La reconnaissance officielle de votre expertise absente
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Des candidats qui préfèrent un concurrent certifié
                </li>
              </ul>
              <div className="profile-card__satisa">
                On construit votre dossier de certification RNCP ou RS, jusqu&apos;à la décision de France
                Compétences.
              </div>
            </div>

            <div className="profile-card">
              <span className="profile-card__number">2</span>
              <h3>Vous êtes organisme habilité sur une certification tierce</h3>
              <p>
                Vous formez sur une certification qui appartient à un autre organisme. Vous versez une redevance
                pour chaque candidat. Vous dépendez d&apos;un certificateur qui peut modifier le référentiel, ne
                pas renouveler la certification, ou retirer votre habilitation.
              </p>
              <ul className="profile-card__list profile-card__list--negative">
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Une marge rognée pour chaque candidat (400 à 600 € de redevance en moyenne)
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Votre indépendance et toute exclusivité sur votre positionnement perdues
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Un actif que vous ne possédez pas et ne pourrez jamais valoriser
                </li>
              </ul>
              <div className="profile-card__satisa">
                On vous accompagne pour déposer votre propre certification et ne plus dépendre d&apos;un tiers.
              </div>
            </div>

            <div className="profile-card profile-card--featured">
              <span className="profile-card__badge">Objectif</span>
              <span className="profile-card__number">3</span>
              <h3>Vous êtes certificateur</h3>
              <p>
                Vous possédez votre propre certification RNCP ou RS. Vos apprenants accèdent au CPF, vous encaissez
                une redevance pour chaque candidat formé dans votre réseau d&apos;organismes habilités, et votre
                référentiel vous appartient. C&apos;est le profil le plus solide commercialement.
              </p>
              <ul className="profile-card__list profile-card__list--positive">
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✓</span>
                  Accès au CPF ouvert pour vos apprenants
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✓</span>
                  Une redevance encaissée pour chaque candidat de votre réseau
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✓</span>
                  Un actif qui vous appartient et valorise votre structure
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✓</span>
                  La possibilité de déposer d&apos;autres certifications pour élargir votre offre
                </li>
              </ul>
              <div className="profile-card__satisa">
                On vous accompagne pour déposer une nouvelle certification ou piloter le renouvellement de
                l&apos;existante.
              </div>
            </div>
          </div>
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
                Faut-il déjà avoir des apprenants formés pour déposer un dossier RNCP/RS ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Oui, dans les deux cas. France Compétences exige des données réelles sur au moins deux promotions d&apos;apprenants déjà formés, pour vérifier leur insertion professionnelle avant d&apos;accepter le dossier. Une exception existe pour les métiers émergents. C&apos;est justement l&apos;objet du diagnostic de faisabilité que de vérifier où en est votre projet sur ce point.</p>
            </details>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontWeight: 700, color: "#002730" }}>
              Pour aller plus loin, consultez notre article de blog associé :
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              →{" "}
              <Link
                href={`${ROUTES.blog}/rncp-ou-rs-guide-complet`}
                style={{ fontStyle: "italic", textDecoration: "underline" }}
              >
                RNCP ou RS : comment choisir en 2026 (budget, délais, financement)
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

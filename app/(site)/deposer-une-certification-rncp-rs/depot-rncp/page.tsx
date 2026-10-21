import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import RelatedArticles from "@/components/RelatedArticles";
import OfferAccordion from "@/components/OfferAccordion";
import OfferRowChevron from "@/components/OfferRowChevron";
import PaymentOptions from "@/components/PaymentOptions";
import DiagnosticFaisabilite from "@/components/DiagnosticFaisabilite";
import DepotProcess from "@/components/DepotProcess";
import { serviceJsonLd } from "@/lib/schema";

const TITLE = "Accompagnement au dépôt RNCP - Satisa Formation";
const DESCRIPTION =
  "Accompagnement au dépôt RNCP : je vous aide à enregistrer votre certification auprès de France Compétences, du diagnostic au dossier. Tarifs fixes.";

export const metadata: Metadata = {
  title: "Accompagnement au dépôt RNCP",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/depot-rncp",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/depot-rncp",
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
        text: "Le dépôt d'un dossier RNCP suit un parcours en plusieurs étapes : diagnostic de faisabilité, construction du référentiel de compétences, constitution d'une promotion de titulaires, rédaction du dossier puis dépôt et suivi auprès de France Compétences. Satisa vous accompagne sur tout ou partie de ce parcours, selon la formule choisie.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps dure un projet de certification RNCP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Comptez en moyenne 12 à 24 mois entre le diagnostic de faisabilité et la décision de France Compétences, selon la complexité du référentiel, votre engagement et la disponibilité de votre promotion de titulaires.",
      },
    },
    {
      "@type": "Question",
      name: "Dois-je avoir déjà formé des apprenants avant de déposer ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. France Compétences attend des preuves concrètes que la formation fonctionne : des apprenants qui ont suivi le parcours, des données d'insertion professionnelle et des témoignages de l'utilité du titre. Dans la pratique, une promotion de titulaires bien documentée peut suffire. Le nombre de promotions nécessaires dépend de la qualité et de la représentativité des données collectées.",
      },
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il si France Compétences refuse le dossier ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un refus donne lieu à des observations précises de France Compétences. Quand le dossier est mal construit mais le projet viable, le suivi inclus dans les formules 2 et 3 couvre l'analyse de ces retours et l'ajustement en vue d'un nouveau dépôt. Si le refus est lié à un manque de besoin réel sur le marché, aucun accompagnement ne peut rendre le projet recevable.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte un dépôt RNCP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le dépôt auprès de France Compétences est gratuit. Ce qui représente un coût réel, c'est le temps : celui de vos équipes internes mobilisées sur le projet (référent métier, direction, formateurs) et celui de l'accompagnement externe pour construire un dossier solide. Rédiger un référentiel, piloter une promotion de titulaires, collecter les données d'insertion et constituer l'ensemble des documents représente plusieurs mois de travail. C'est cette charge que Satisa prend en charge, en tout ou en partie selon la formule choisie, à partir de 5 000€ HT.",
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

const SERVICE_JSON_LD = serviceJsonLd({
  name: "Accompagnement au dépôt RNCP",
  description:
    "Accompagnement au dépôt RNCP : diagnostic de faisabilité, étude d'opportunité, référentiels, promotion de titulaires et dossier France Compétences.",
  url: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/depot-rncp",
  offers: [
    { name: "Diagnostic de faisabilité", price: 700 },
    { name: "Certification guidée", price: 5000 },
    { name: "Certification pilotée", price: 10000 },
    { name: "Ingénieur de certification intégré", price: 500, unit: "jour" },
    { name: "Responsable de certification externalisé", price: 500, unit: "mois" },
  ],
});

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
    {
      "@type": "ListItem",
      position: 3,
      name: "Dépôt RNCP",
      item: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/depot-rncp",
    },
  ],
};

export default function CertificationRncpPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />

      <section className="hero-page hero-page--certification hero-page--wide-h1">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Certification RNCP</p>
            <h1>Déposez votre certification RNCP auprès de France Compétences</h1>
            <p className="hero-page__subtitle">
              Sans dépôt de certification RNCP enregistrée auprès de France Compétences, votre expertise reste non
              reconnue officiellement et vos apprenants n&apos;ont accès ni au CPF ni à une certification
              valorisable. Satisa pilote votre enregistrement RNCP à vos côtés, du référentiel jusqu&apos;à la
              décision finale.
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
            <h2>Choisissez la formule adaptée à votre projet RNCP</h2>
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
                  <span className="offer-row__price" data-nosnippet>700 € HT</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-1" hidden>
                <DiagnosticFaisabilite />
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
                    <span className="offer-row__price" data-nosnippet>5 000 € HT</span>
                    <OfferRowChevron />
                  </span>
                </button>
                <div className="offer-row__body" id="offer-body-2" hidden>
                  <ul className="pricing-card__deliverables">
                    <li>Rétroplanning partagé, vous pilotez l&apos;avancement</li>
                    <li>Trames et modèles de documents fournis</li>
                    <li>Assistance à la rédaction de l&apos;ensemble des livrables : étude d&apos;opportunité, référentiel et documents du dossier</li>
                    <li>Relectures et corrections à chaque étape clé</li>
                    <li>Coordination avec votre référent métier</li>
                    <li>Assistance au dépôt du dossier sur le site de France Compétences</li>
                    <li>Suivi jusqu&apos;à la décision finale de France Compétences</li>
                  </ul>
                  <p className="pricing-card__note">Votre référent métier : responsable pédagogique, ingénieur pédagogique ou formateur.</p>
                  <PaymentOptions
                    options={[
                      { icon: "check", label: "Paiement unique", price: "5 000 € HT" },
                      { icon: "calendar", label: "Paiement échelonné", price: "3 000 €", detail: "à la signature + 500 €/mois pendant 4 mois" },
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
                    <span className="offer-row__price" data-nosnippet>10 000 € HT</span>
                    <OfferRowChevron />
                  </span>
                </button>
                <div className="offer-row__body" id="offer-body-3" hidden>
                  <ul className="pricing-card__deliverables">
                    <li>Rétroplanning partagé, nous pilotons l&apos;avancement</li>
                    <li>Rédaction de l&apos;étude d&apos;opportunité</li>
                    <li>Analyse du métier et mapping des compétences avec votre référent métier</li>
                    <li>Rédaction intégrale du référentiel</li>
                    <li>Rédaction de l&apos;ensemble des documents du dossier</li>
                    <li>Pilotage opérationnel de la promotion de titulaires (recrutement, stages, collecte des données d&apos;insertion)</li>
                    <li>Pilotage opérationnel de la collecte des courriers de témoignages et de soutien</li>
                    <li>Assistance au dépôt du dossier sur le site de France Compétences</li>
                    <li>Suivi jusqu&apos;à la décision finale de France Compétences</li>
                  </ul>
                  <p className="pricing-card__note">Votre référent métier : responsable pédagogique, ingénieur pédagogique ou formateur.</p>
                  <PaymentOptions
                    options={[
                      { icon: "check", label: "Paiement unique", price: "10 000 € HT" },
                      { icon: "calendar", label: "Paiement échelonné", price: "4 000 €", detail: "à la signature + 1 000 €/mois pendant 6 mois" },
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
                  <span className="offer-row__price" data-nosnippet>500 € HT/jour</span>
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
                  <span className="offer-row__price" data-nosnippet>500 € HT/mois</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-5" hidden>
                <p className="pricing-card__note">Post-dépôt.</p>
                <ul className="pricing-card__deliverables">
                  <li>Réunion mensuelle de suivi de la certification</li>
                  <li>Veille réglementaire RNCP ciblée</li>
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

      <DepotProcess
        title="Comment se déroule l’accompagnement au dépôt RNCP"
        intro="Une certification RNCP atteste qu’une personne maîtrise un métier. Pour l’enregistrer, France Compétences attend la preuve que ce métier répond à un besoin réel, que vos référentiels sont solides et que vos titulaires s’insèrent dans les emplois visés. Voici comment Satisa vous accompagne, du diagnostic jusqu’à la décision."
        stats={[
          { value: "6 étapes", label: "du diagnostic de faisabilité à la décision de France Compétences" },
          { value: "12 à 24 mois", label: "durée évaluée dès le diagnostic, du diagnostic à la décision, selon l’existant actuel" },
          { value: "0 €", label: "de frais de dépôt : le dépôt auprès de France Compétences est gratuit" },
        ]}
        steps={[
          { title: "Diagnostic de faisabilité", text: "Nous vérifions que votre projet vise bien un métier complet, relevant du RNCP, et qu’un niveau de qualification est défendable. Vous savez avant tout investissement si votre projet peut aboutir, en combien de temps et à quelles conditions." },
          { title: "Étude d’opportunité", text: "Nous démontrons que le métier visé répond à un besoin du marché du travail, à partir de sources fiables et, le cas échéant, de courriers de soutien et témoignages. C’est le premier critère examiné par France Compétences : sans besoin démontré, pas d’enregistrement." },
          { title: "Référentiels d’activités, de compétences et d’évaluation", text: "Avec votre référent métier, nous analysons les situations de travail et définissons les emplois visés. Nous construisons ensuite les trois référentiels de votre certification, découpés en blocs de compétences." },
          { title: "Première promotion de titulaires", text: "Vous formez et évaluez vos apprenants selon ces référentiels. Nous organisons la collecte des données sur l’insertion de vos titulaires dans les emplois visés, élément central de l’examen de votre dossier." },
          { title: "Constitution et dépôt du dossier", text: "Nous rédigeons ou relisons l’ensemble des pièces selon votre formule, puis déposons ensemble le dossier sur la plateforme de France Compétences." },
          { title: "Instruction et décision", text: "Nous vous accompagnons dans la réponse à toutes les demandes de l’instructeur, jusqu’à la décision de France Compétences. Nous analysons ensuite le résultat avec vous." },
        ]}
        audience={[
          "Les organismes de formation qui préparent déjà à un métier et souhaitent faire reconnaître leur parcours par une certification RNCP",
          "Les organismes dont le projet de certification est engagé, mais bloqué faute de référentiels structurés ou de dossier solide",
          "Les équipes pédagogiques qui n’ont pas le temps de piloter seules un projet de plusieurs mois",
        ]}
        limits={
          <>
            La décision appartient à France Compétences, qui peut aussi modifier le niveau de qualification, l’intitulé ou la durée d’enregistrement demandés. Nous ne garantissons pas l’enregistrement : le diagnostic de faisabilité sert justement à ne lancer que les projets viables. Si votre projet vise une compétence complémentaire plutôt qu’un métier complet, découvrez notre{" "}
            <Link href={ROUTES.certificationRs}>accompagnement au dépôt RS</Link>.
          </>
        }
      />


      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Le dépôt RNCP en détail</h2>
          </div>
          <div>
            <details className="faq-item">
              <summary className="faq-item__question">
                Comment déposer un dossier RNCP ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Le dépôt d&apos;un dossier RNCP suit un parcours en plusieurs étapes : diagnostic de faisabilité, construction du référentiel de compétences, constitution d&apos;une promotion de titulaires, rédaction du dossier puis dépôt et suivi auprès de France Compétences. Satisa vous accompagne sur tout ou partie de ce parcours, selon la formule choisie.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Combien de temps dure un projet de certification RNCP ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Comptez en moyenne 12 à 24 mois entre le diagnostic de faisabilité et la décision de France Compétences, selon la complexité du référentiel, votre engagement et la disponibilité de votre promotion de titulaires.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Dois-je avoir déjà formé des apprenants avant de déposer ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">
                Oui. France Compétences attend des preuves concrètes que la formation fonctionne : des apprenants qui ont suivi le parcours, des données d&apos;insertion professionnelle et des témoignages de l&apos;utilité du titre. Dans la pratique, une promotion de titulaires bien documentée peut suffire. Le nombre de promotions nécessaires dépend de la qualité et de la représentativité des données collectées.{" "}
                <Link
                  href={`${ROUTES.blog}/suis-je-eligible-au-rncp-criteres-d-eligibilite-et-conditions-2026`}
                  style={{ fontStyle: "italic", textDecoration: "underline" }}
                >
                  Découvrez tous les critères d&apos;éligibilité au RNCP.
                </Link>
              </p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Que se passe-t-il si France Compétences refuse le dossier ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Un refus donne lieu à des observations précises de France Compétences. Quand le dossier est mal construit mais le projet viable, le suivi inclus dans les formules 2 et 3 couvre l&apos;analyse de ces retours et l&apos;ajustement en vue d&apos;un nouveau dépôt. Si le refus est lié à un manque de besoin réel sur le marché, aucun accompagnement ne peut rendre le projet recevable.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Combien coûte un dépôt RNCP ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Le dépôt auprès de France Compétences est gratuit. Ce qui représente un coût réel, c&apos;est le temps : celui de vos équipes internes mobilisées sur le projet (référent métier, direction, formateurs) et celui de l&apos;accompagnement externe pour construire un dossier solide. Rédiger un référentiel, piloter une promotion de titulaires, collecter les données d&apos;insertion et constituer l&apos;ensemble des documents représente plusieurs mois de travail. C&apos;est cette charge que Satisa prend en charge, en tout ou en partie selon la formule choisie, à partir de 5 000€ HT.</p>
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
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontWeight: 700, color: "#002730" }}>
              Pour aller plus loin, consultez notre article de blog associé :
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              →{" "}
              <Link
                href={`${ROUTES.blog}/suis-je-eligible-au-rncp-criteres-d-eligibilite-et-conditions-2026`}
                style={{ fontStyle: "italic", textDecoration: "underline" }}
              >
                Suis-je éligible au RNCP ? Critères d&apos;éligibilité et conditions 2026
              </Link>
            </p>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontWeight: 700, color: "#002730" }}>
              Vous hésitez encore entre RNCP et RS ?
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              →{" "}
              <Link href={ROUTES.certification} style={{ fontStyle: "italic", textDecoration: "underline" }}>
                Consultez notre comparatif RNCP vs RS
              </Link>
            </p>
          </div>
        </div>
      </section>

      <RelatedArticles slugs={["suis-je-eligible-au-rncp-criteres-d-eligibilite-et-conditions-2026", "rncp-ou-rs-guide-complet", "comment-devenir-organisme-habilite-sur-une-certification-rncp-ou-rs"]} />

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Un projet de certification RNCP en tête ?</h2>
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

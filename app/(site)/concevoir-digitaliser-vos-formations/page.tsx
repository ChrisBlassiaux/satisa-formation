import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import OfferAccordion from "@/components/OfferAccordion";
import OfferRowChevron from "@/components/OfferRowChevron";

export const metadata: Metadata = {
  title: "Concevoir et digitaliser vos formations",
  description:
    "Ingénieur pédagogique freelance pour organismes de formation : conception de programme conforme Qualiopi, création de contenus pédagogiques, digitalisation e-learning et intégration LMS (Moodle, Digiforma). Maintenance pédagogique incluse.",
  alternates: {
    canonical: "https://www.satisa-formation.fr/concevoir-digitaliser-vos-formations",
  },
};

export default function FormationsPage() {
  return (
    <>
      <section className="hero-page hero-page--formations">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Ingénierie pédagogique &amp; digital</p>
            <h1>Vous avez le contenu. Il manque la structure et le digital.</h1>
            <p className="hero-page__subtitle">
              Vos formateurs savent enseigner, mais personne dans votre équipe ne sait structurer une progression
              pédagogique ni produire du e-learning de qualité. Ingénieur pédagogique freelance pour organismes de
              formation, Satisa conçoit et digitalise vos formations, du programme conforme Qualiopi jusqu&apos;au
              déploiement sur votre LMS.
            </p>
          </div>
          <div className="hero-page__visual" aria-hidden="true">
            <div className="hero-page__visual-shape">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 20c-14 0-24 10-24 23 0 9 5 15 9 19 3 3 5 6 5 10h20c0-4 2-7 5-10 4-4 9-10 9-19 0-13-10-23-24-23z" />
                <path d="M42 82h16" />
                <path d="M44 90h12" />
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
              <button type="button" className="offer-row__header" aria-expanded="true" aria-controls="offer-body-6">
                <span className="offer-row__title">
                  <span className="offer-row__name-row">
                    <span className="offer-row__index" aria-hidden="true">6</span>
                    <span className="offer-row__name">Conception de formation</span>
                  </span>
                </span>
                <span className="offer-row__meta">
                  <span className="offer-row__price">2 500 € HT</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-6">
                <ul className="pricing-card__deliverables">
                  <li>Analyse de la demande, du référentiel et du public cible</li>
                  <li>Progression pédagogique (objectifs dérivés du référentiel)</li>
                  <li>Programme de formation conforme Qualiopi</li>
                  <li>Scénario pédagogique et d&apos;accompagnement, séquencement et volumétrie horaire</li>
                </ul>
                <p className="pricing-card__note">
                  Alignement avec le référentiel de la certification visée (RNCP, RS ou référentiel interne), de
                  l&apos;analyse des compétences jusqu&apos;aux modalités d&apos;évaluation certificative.
                </p>
                <Link href={ROUTES.contact} className="btn btn--primary btn--block">Prendre un rendez-vous</Link>
              </div>
            </div>

            <div className="offer-row">
              <button type="button" className="offer-row__header" aria-expanded="false" aria-controls="offer-body-7">
                <span className="offer-row__title">
                  <span className="offer-row__name-row">
                    <span className="offer-row__index" aria-hidden="true">7</span>
                    <span className="offer-row__name">Création de contenus de formation</span>
                  </span>
                </span>
                <span className="offer-row__meta">
                  <span className="offer-row__price">Sur devis</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-7" hidden>
                <ul className="pricing-card__deliverables">
                  <li>Supports de présentation (diapositives, fiches, guide formateur)</li>
                  <li>Activités d&apos;apprentissage (exercices pratiques et mises en situation)</li>
                  <li>Évaluations formatives, sommatives et certificatives</li>
                </ul>
                <Link href={ROUTES.contact} className="btn btn--primary btn--block">Discutons de votre projet</Link>
              </div>
            </div>

            <div className="offer-row">
              <button type="button" className="offer-row__header" aria-expanded="false" aria-controls="offer-body-8">
                <span className="offer-row__title">
                  <span className="offer-row__name-row">
                    <span className="offer-row__index" aria-hidden="true">8</span>
                    <span className="offer-row__name">Digitalisation</span>
                  </span>
                </span>
                <span className="offer-row__meta">
                  <span className="offer-row__price">Sur devis</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-8" hidden>
                <p className="pricing-card__note">
                  Diagnostic inclus. Modalités couvertes : e-learning, blended learning. Outils : Moodle, Digiforma,
                  Teachizy, 360Learning, outils auteurs (Articulate Rise, Storyline, iSpring), HTML/CSS/JS
                  sur-mesure, SCORM 1.2.
                </p>
                <ul className="pricing-card__deliverables">
                  <li>Diagnostic et cadrage du projet</li>
                  <li>Scénarisation et conception digitale</li>
                  <li>Production des modules</li>
                  <li>Déploiement technique sur le LMS</li>
                  <li>Tests et accompagnement des équipes</li>
                </ul>
                <Link href={ROUTES.contact} className="btn btn--primary btn--block">Discutons de votre projet</Link>
              </div>
            </div>

            <div className="offer-row">
              <button type="button" className="offer-row__header" aria-expanded="false" aria-controls="offer-body-9">
                <span className="offer-row__title">
                  <span className="offer-row__name-row">
                    <span className="offer-row__index" aria-hidden="true">9</span>
                    <span className="offer-row__name">Maintenance pédagogique mensuelle</span>
                  </span>
                </span>
                <span className="offer-row__meta">
                  <span className="offer-row__price">800 € HT/mois</span>
                  <OfferRowChevron />
                </span>
              </button>
              <div className="offer-row__body" id="offer-body-9" hidden>
                <p className="pricing-card__note">Engagement de 3 mois minimum.</p>
                <ul className="pricing-card__deliverables">
                  <li>Mise à jour des contenus</li>
                  <li>Nouveaux modules</li>
                  <li>Suivi pédagogique des cohortes</li>
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
            <p className="eyebrow">Nos orientations</p>
            <h2>Concevoir et digitaliser : deux leviers complémentaires</h2>
          </div>

          <ul className="problem-list problem-list--2col">
            <li>
              <span className="problem-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
                  <path d="M7 10.5V16c0 1.1 2.2 3 5 3s5-1.9 5-3v-5.5" />
                  <path d="M21 7.5v6" />
                </svg>
              </span>
              <div>
                <h3>Conception des formations</h3>
                <p>Structurer votre contenu en un programme pédagogique cohérent et conforme Qualiopi : objectifs, progression, supports et évaluations.</p>
              </div>
            </li>
            <li>
              <span className="problem-list__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="13" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </span>
              <div>
                <h3>Digitalisation des formations</h3>
                <p>Transformer vos contenus en parcours blended ou 100&nbsp;% e-learning, déployés sur votre plateforme pédagogique.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <h3 className="subsection-title">Les deux axes de digitalisation</h3>
          <div className="digital-axes">
            <div className="digital-axis">
              <div className="digital-axis__head">
                <span className="offer-row__index" aria-hidden="true">1</span>
                <h4>
                  Présentiel &amp; télé-présentiel augmenté <span>(Blended Learning)</span>
                </h4>
              </div>
              <ul className="digital-axis__list">
                <li>Enrichissez vos cours en salle ou en visio avec du contenu complémentaire en ligne</li>
                <li>Plateforme pédagogique disponible en parallèle de la formation</li>
                <li>Supports, vidéos, quiz, exercices pour approfondir les notions</li>
                <li>Plus de temps en présentiel pour la pratique et les échanges</li>
              </ul>
            </div>
            <div className="digital-axis">
              <div className="digital-axis__head">
                <span className="offer-row__index" aria-hidden="true">2</span>
                <h4>
                  Distanciel <span>(E-learning)</span>
                </h4>
              </div>
              <ul className="digital-axis__list">
                <li>Transformez une partie ou l&apos;ensemble de vos formations en modules accessibles 100&nbsp;% à distance</li>
                <li>Capsules vidéos interactives, quiz et exercices auto-corrigés</li>
                <li>Suivi de progression et validation des acquis</li>
                <li>Accessibles à tout moment, sur tout appareil</li>
              </ul>
            </div>
          </div>

          <h3 className="subsection-title">Ce que ça change pour votre organisme de formation</h3>
          <div className="benefit-grid">
            <div className="benefit-tile">
              <span className="benefit-tile__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="9" r="3" />
                  <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  <circle cx="17" cy="8" r="2.5" />
                  <path d="M14.7 14.3c2.7.5 4.3 2.7 4.3 5.7" />
                </svg>
              </span>
              <p>Attirez plus d&apos;apprenants</p>
            </div>
            <div className="benefit-tile">
              <span className="benefit-tile__icon benefit-tile__icon--accent" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 11a8 8 0 00-14.9-3.5" />
                  <path d="M4 13a8 8 0 0014.9 3.5" />
                  <path d="M5 4v4h4" />
                  <path d="M19 20v-4h-4" />
                </svg>
              </span>
              <p>Modernisez vos formations</p>
            </div>
            <div className="benefit-tile">
              <span className="benefit-tile__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
              </span>
              <p>Proposez une expérience engageante et flexible</p>
            </div>
            <div className="benefit-tile">
              <span className="benefit-tile__icon benefit-tile__icon--accent" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M15 6h6v6" />
                </svg>
              </span>
              <p>Nouvelles sources de revenus</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Délais, compatibilité, sur-mesure</h2>
          </div>
          <div>
            <details className="faq-item">
              <summary className="faq-item__question">
                Combien de temps prend la digitalisation d&apos;une formation ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Comptez 4 à 8 semaines pour un module e-learning standard, selon le volume de contenu et le niveau d&apos;interactivité souhaité. Le diagnostic initial affine cette estimation.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Est-ce compatible avec mon LMS actuel ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Les modules sont produits au format SCORM 1.2, compatible avec la grande majorité des LMS (Moodle, Digiforma, Teachizy, 360Learning, et bien d&apos;autres). Le diagnostic vérifie la compatibilité avec votre outil.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Puis-je faire du sur-mesure plutôt que des outils auteurs classiques ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Oui, en plus des outils auteurs (Articulate, iSpring), Satisa développe aussi des modules sur-mesure en HTML/CSS/JS pour des besoins spécifiques d&apos;interactivité ou de charte graphique.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                Faut-il déjà avoir un programme de formation structuré ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Non. Si votre contenu n&apos;est pas encore structuré, la formule Conception de formation pose les bases (progression, programme conforme Qualiopi) avant toute digitalisation.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-item__question">
                La maintenance pédagogique est-elle obligatoire ?
                <span className="faq-item__icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-item__answer">Non, elle est optionnelle. Elle est utile si vos contenus évoluent régulièrement ou si vous ouvrez de nouvelles cohortes nécessitant un suivi pédagogique continu.</p>
            </details>
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

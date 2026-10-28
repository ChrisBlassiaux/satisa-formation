import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FAQ_FORMATIONS, breadcrumbJsonLd, faqJsonLd } from "@/lib/formations";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";

const TITLE = "Ingénierie pédagogique et digitalisation - Satisa Formation";
const DESCRIPTION =
  "Conception de parcours de formation conforme Qualiopi, création de contenus pédagogiques, digitalisation e-learning et intégration LMS.";

export const metadata: Metadata = {
  title: "Ingénierie pédagogique et digitalisation",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.satisa-formation.fr/concevoir-digitaliser-vos-formations",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.satisa-formation.fr/concevoir-digitaliser-vos-formations",
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
]);

export default function FormationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_FORMATIONS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />
      <section className="hero-page hero-page--formations">
        <div className="container hero-page__layout">
          <div>
            <p className="eyebrow">Ingénierie pédagogique &amp; digital</p>
            <h1>Vous avez le contenu. Il manque la structure pédagogique et la digitalisation.</h1>
            <p className="hero-page__subtitle">
              Votre équipe a les compétences, mais concevoir et digitaliser des formations en parallèle de la
              délivrance, c&apos;est une charge supplémentaire que Satisa peut absorber. Du programme jusqu&apos;au
              déploiement sur votre LMS.
            </p>
            <div className="hero__actions" style={{ marginTop: "1.5rem" }}>
              <Link href={ROUTES.formationsConception} className="btn btn--dark">
                Conception pédagogique
              </Link>
              <Link href={ROUTES.formationsDigitalisation} className="btn btn--outline">
                Digitalisation
              </Link>
            </div>
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

      <section className="problem-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Conception ou digitalisation ?</p>
            <h2>Concevoir et digitaliser vos formations : deux leviers complémentaires</h2>
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
                <Link href={ROUTES.formationsConception} className="problem-list__link">
                  Découvrir la conception pédagogique <LinkArrow />
                </Link>
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
                <p>Transformer vos contenus en parcours blended learning ou 100&nbsp;% e-learning, avec intégration LMS (Moodle, Digiforma, 360Learning...).</p>
                <Link href={ROUTES.formationsDigitalisation} className="problem-list__link">
                  Découvrir la digitalisation <LinkArrow />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Votre situation</p>
            <h2>Dans quelle situation êtes-vous ?</h2>
            <p className="hero-page__subtitle section-head__lead">
              Concevoir une formation et la digitaliser demande des compétences distinctes de celles qui permettent de
              la délivrer. Un expert dans son domaine n&apos;est pas nécessairement outillé pour formaliser des
              objectifs pédagogiques, séquencer un parcours ou produire des contenus e-learning, et lui demander de le
              faire en plus de son activité, c&apos;est rarement la bonne équation. Si votre organisme n&apos;a pas ces
              compétences en interne, les externaliser n&apos;est pas un raccourci : c&apos;est le bon chemin.
            </p>
          </div>
          <div className="profile-cards">
            <div className="profile-card">
              <span className="profile-card__number">1</span>
              <h3>Vous avez des contenus, mais pas de programme structuré</h3>
              <p className="profile-card__description">
                Vos formateurs maîtrisent leur domaine. Mais les contenus n&apos;ont jamais été formalisés : pas de programme détaillé, pas d&apos;objectifs pédagogiques écrits, pas de progression documentée.
              </p>
              <ul className="profile-card__list profile-card__list--negative">
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Des formations difficilement défendables en audit Qualiopi
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Une dépendance au formateur qui &laquo;&nbsp;sait&nbsp;&raquo; mais n&apos;a rien écrit
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Aucun livrable transmissible à un nouveau formateur ou à un client
                </li>
              </ul>
              <div className="profile-card__satisa">
                On structure vos contenus en un programme pédagogique complet, conforme et réutilisable.
              </div>
            </div>

            <div className="profile-card">
              <span className="profile-card__number">2</span>
              <h3>Vous voulez digitaliser, mais ne savez pas par où commencer</h3>
              <p className="profile-card__description">
                Vos formations existent en présentiel. Passer en e-learning ou blended learning est dans les plans, mais vous ne savez pas ce qui se digitalise, comment, ni avec quel outil.
              </p>
              <ul className="profile-card__list profile-card__list--negative">
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Des contenus qui restent bloqués en présentiel faute de méthode
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Des tentatives de digitalisation qui donnent des slides PDF en ligne
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✗</span>
                  Un LMS inutilisé ou sous-exploité
                </li>
              </ul>
              <div className="profile-card__satisa">
                On cadre le projet, on produit les contenus et on intègre le parcours dans votre LMS.
              </div>
            </div>

            <div className="profile-card profile-card--featured">
              <span className="profile-card__number">3</span>
              <h3>Vous n&apos;avez ni l&apos;équipe ni le temps en interne</h3>
              <p className="profile-card__description">
                Vous savez ce qu&apos;il faut faire. Mais vous n&apos;avez pas d&apos;ingénieur pédagogique en interne, et vos formateurs ont déjà une charge pleine.
              </p>
              <ul className="profile-card__list profile-card__list--positive">
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✓</span>
                  Une conception et une digitalisation entièrement externalisées
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✓</span>
                  Des livrables prêts à déployer, sans mobiliser vos équipes
                </li>
                <li>
                  <span className="profile-card__mark" aria-hidden="true">✓</span>
                  Un interlocuteur unique du cadrage jusqu&apos;à la mise en ligne
                </li>
              </ul>
              <div className="profile-card__satisa">
                On prend en charge l&apos;ensemble, du programme jusqu&apos;au déploiement.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Concevoir et digitaliser : vos questions</h2>
          </div>
          <FaqList items={FAQ_FORMATIONS} />
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

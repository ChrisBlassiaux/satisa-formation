import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { getAllPosts, CATEGORY_LABELS, formatPostDate } from "@/lib/posts";

const TITLE = "Certification RNCP/RS & ingénierie pédagogique - Satisa Formation";
const DESCRIPTION =
  "Faites reconnaître vos formations, structurez et digitalisez vos programmes. Certification RNCP/RS et ingénierie pédagogique pour organismes de formation.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.satisa-formation.fr/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.satisa-formation.fr/",
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

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Satisa Formation",
  url: "https://www.satisa-formation.fr/",
  description:
    "Ingénierie de certification RNCP/RS et ingénierie pédagogique et digitale pour les organismes de formation.",
  founder: {
    "@type": "Person",
    name: "Chris Blassiaux",
  },
  areaServed: "FR",
};

export default async function HomePage() {
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />

      <section className="hero--sunrays">
        <div className="hero__rays" aria-hidden="true">
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMinYMid slice" role="presentation" aria-hidden="true" focusable="false">
            <g className="hero__rays-group">
              <polygon points="-60,400 2340,400 2171,1283" fill="#FECC01" />
              <polygon points="-60,400 1882,1811 1226,2426" fill="#d9f1ee" />
              <polygon points="-60,400 682,2683 -211,2795" fill="#d9f1ee" />
              <polygon points="-60,400 -802,2683 -1590,2249" fill="#d9f1ee" />
              <polygon points="-60,400 -2002,1811 -2385,997" fill="#d9f1ee" />
              <polygon points="-60,400 -2460,400 -2291,-483" fill="#FECC01" />
              <polygon points="-60,400 -2002,-1011 -1346,-1626" fill="#d9f1ee" />
              <polygon points="-60,400 -802,-1883 91,-1995" fill="#d9f1ee" />
              <polygon points="-60,400 682,-1883 1470,-1449" fill="#d9f1ee" />
              <polygon points="-60,400 1882,-1011 2265,-197" fill="#d9f1ee" />
            </g>
          </svg>
        </div>
        <div className="container hero__content">
          <div className="hero__grid">
            <div className="hero__intro">
              <p className="eyebrow">Certification RNCP/RS &amp; ingénierie pédagogique</p>
              <h1>
                Construisez une certification RNCP/RS qui tient la route,{" "}
                <span className="accent">et des formations qui rayonnent.</span>
              </h1>
              <p className="hero__subtitle">
                Satisa Formation accompagne les organismes de formation dans l&apos;ingénierie de certification
                RNCP/RS et l&apos;ingénierie pédagogique : référentiel de compétences, accompagnement au dépôt
                France Compétences, conception de formation certifiante, digitalisation e-learning. Une seule
                expertise, la continuité en plus.
              </p>
              <div className="hero__actions">
                <Link href={ROUTES.certification} className="btn btn--dark">
                  Déposer une certification
                </Link>
                <Link href={ROUTES.formations} className="btn btn--outline">
                  Concevoir mes formations
                </Link>
              </div>
            </div>
            <div className="hero__proof">
              <div className="proof-card">
                <div className="proof-card__labels">
                  <span className="proof-card__label">Certification RNCP/RS</span>
                  <span className="proof-card__sector">Médecine du sommeil</span>
                </div>
                <p>
                  <strong>Mission en cours.</strong> Accompagnement complet pour le dépôt d&apos;un dossier RNCP
                  niveau 6. Dépôt prévu fin 2026.
                </p>
                <a className="proof-card__client" href="https://sleep-learning-center.fr/" target="_blank" rel="noopener">
                  <Image className="proof-card__client-logo" src="/images/logo/logo-slc.webp" alt="" width={37} height={16} priority unoptimized />
                  Sleep Learning Center
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <div className="proof-card">
                <div className="proof-card__labels">
                  <span className="proof-card__label">Formations &amp; digital</span>
                  <span className="proof-card__sector">Développement web &amp; web design</span>
                </div>
                <p>
                  <strong>Mission en cours.</strong> Refonte pédagogique du programme de formation « Développeur
                  Full Stack ».
                </p>
                <a className="proof-card__client" href="https://cloud-campus.fr/" target="_blank" rel="noopener">
                  <Image className="proof-card__client-logo" src="/images/logo/logo-cloud-campus.webp" alt="" width={16} height={16} priority />
                  Cloud Campus
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <div className="hero__stats">
                <a className="hero__stat" href="https://www.linkedin.com/in/christopher-blassiaux-802891198/" target="_blank" rel="noopener">
                  <svg className="hero__stat-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 1.6l2.35 4.76 5.25.77-3.8 3.7.9 5.23L10 13.5l-4.7 2.46.9-5.23-3.8-3.7 5.25-.77L10 1.6z" fill="#FECC01" />
                  </svg>
                  <span>
                    <strong>8 recommandations</strong> sur LinkedIn
                  </span>
                </a>
                <a className="hero__stat" href="https://share.google/FPIClYaWJU1g31hRp" target="_blank" rel="noopener">
                  <svg className="hero__stat-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 1.6l2.35 4.76 5.25.77-3.8 3.7.9 5.23L10 13.5l-4.7 2.46.9-5.23-3.8-3.7 5.25-.77L10 1.6z" fill="#FECC01" />
                  </svg>
                  <span>
                    <strong>25 avis</strong> sur Google
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Nos deux expertises</p>
            <h2>
              Un projet de certification RNCP/RS ou de conception de formation présentiel et e-learning : toujours
              la même exigence.
            </h2>
          </div>
          <div className="grid grid--2">
            <div className="card card--service">
              <div>
                <span className="tag card__tag">Certification</span>
                <h3>Ingénierie de certification RNCP/RS</h3>
                <p>
                  Accompagnement au dépôt RNCP/RS de A à Z auprès de France Compétences : référentiel de
                  compétences, cohorte pilote, dépôt du dossier. Guidé ou piloté, selon votre niveau
                  d&apos;autonomie.
                </p>
              </div>
              <Link href={ROUTES.certification} className="btn btn--primary">
                Voir les formules certification
              </Link>
            </div>
            <div className="card card--service">
              <div>
                <span className="tag card__tag">Formations &amp; digital</span>
                <h3>Ingénierie pédagogique et digitalisation</h3>
                <p>
                  Conception de formation certifiante alignée sur votre référentiel, création de contenus
                  pédagogiques, digitalisation blended et e-learning. Pour des parcours structurés, conformes
                  Qualiopi, et engageants pour vos apprenants.
                </p>
              </div>
              <Link href={ROUTES.formations} className="btn btn--primary">
                Voir les formules formations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container grid grid--2" style={{ alignItems: "center" }}>
          <div className="about-photo about-photo--compact">
            <Image src="/images/photos/profil-chris.webp" alt="Chris Blassiaux, fondateur de Satisa Formation" width={500} height={500} />
          </div>
          <div>
            <p className="eyebrow">À propos</p>
            <h2>Chris Blassiaux, ingénieur de certification et pédagogique</h2>
            <blockquote className="quote">
              « La qualité du service pédagogique est cruciale, car elle a un impact direct sur la satisfaction des
              étudiants et, par conséquent, sur la réputation et la croissance de l&apos;établissement. »
            </blockquote>
            <p style={{ marginTop: "1rem" }}>
              <Link href={ROUTES.about} className="btn btn--outline">
                Découvrir son parcours
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section-tinted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Pourquoi Satisa</p>
            <h2>Les bénéfices concrets pour votre organisme de formation</h2>
          </div>
          <div className="grid grid--2 benefit-panels">
            <div className="benefit-panel benefit-panel--certification">
              <h3 className="benefit-panel__title">Côté certification RNCP/RS</h3>
              <div className="benefit-panel__list">
                <div className="benefit-row">
                  <span className="benefit-row__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  </span>
                  <div>
                    <h4>Accès au financement CPF</h4>
                    <p>Une certification RNCP ou RS enregistrée ouvre l&apos;accès au CPF et aux financements associés.</p>
                  </div>
                </div>
                <div className="benefit-row">
                  <span className="benefit-row__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <polygon points="15.5 8.5 13.2 13.2 8.5 15.5 10.8 10.8 15.5 8.5" />
                    </svg>
                  </span>
                  <div>
                    <h4>Un niveau d&apos;intervention adapté à vos ressources</h4>
                    <p>Guidé ou piloté, Satisa s&apos;implique à 100% dans votre projet. C&apos;est le mode de fonctionnement qui s&apos;adapte à votre organisation, pas l&apos;engagement.</p>
                  </div>
                </div>
                <div className="benefit-row">
                  <span className="benefit-row__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 5c2-1.2 5-1.2 8 0v13c-3-1.2-6-1.2-8 0V5z" />
                      <path d="M20 5c-2-1.2-5-1.2-8 0v13c3-1.2 6-1.2 8 0V5z" />
                    </svg>
                  </span>
                  <div>
                    <h4>Un référentiel pensé pour être formé</h4>
                    <p>Parce que l&apos;ingénierie pédagogique et l&apos;ingénierie de certification ne font qu&apos;un ici, votre référentiel est pensé pour être formé, pas seulement déposé.</p>
                  </div>
                </div>
              </div>
              <Link href={ROUTES.certification} className="btn btn--primary">
                Voir les formules certification
              </Link>
            </div>
            <div className="benefit-panel benefit-panel--formations">
              <h3 className="benefit-panel__title">Côté formations &amp; digital</h3>
              <div className="benefit-panel__list">
                <div className="benefit-row">
                  <span className="benefit-row__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20 3 6" />
                      <line x1="9" y1="4" x2="9" y2="18" />
                      <line x1="15" y1="6" x2="15" y2="20" />
                    </svg>
                  </span>
                  <div>
                    <h4>Des parcours structurés</h4>
                    <p>Progressions pédagogiques, scénarisation, supports conformes Qualiopi, alignés sur votre référentiel.</p>
                  </div>
                </div>
                <div className="benefit-row">
                  <span className="benefit-row__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="13" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </span>
                  <div>
                    <h4>Une digitalisation sans y laisser vos équipes</h4>
                    <p>Blended learning, e-learning, déploiement LMS : nous produisons, vos formateurs se concentrent sur l&apos;animation et l&apos;accompagnement.</p>
                  </div>
                </div>
                <div className="benefit-row">
                  <span className="benefit-row__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
                    </svg>
                  </span>
                  <div>
                    <h4>Une expérience apprenant modernisée</h4>
                    <p>Suivi, traçabilité SCORM et parcours engageants, pour des apprenants qui vont au bout de la formation.</p>
                  </div>
                </div>
              </div>
              <Link href={ROUTES.formations} className="btn btn--primary">
                Voir les formules formations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Le blog</p>
            <h2>Nos derniers articles</h2>
          </div>
          <div className="grid grid--3">
            {latestPosts.map((post) => (
              <Link key={post.slug} className="post-card" href={`${ROUTES.blog}/${post.slug}`}>
                <div className="post-card__thumb">
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="post-card__thumb-img"
                    />
                  )}
                </div>
                <div className="post-card__body">
                  <div className="post-card__meta">
                    <span>{CATEGORY_LABELS[post.category]}</span>
                    <span>·</span>
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  </div>
                  <h3 className="post-card__title">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Parlons de votre projet</h2>
              <p>30 minutes pour cadrer votre besoin, sans engagement.</p>
            </div>
            <div className="cta-banner__actions">
              <Link href={ROUTES.contact} className="btn btn--primary">
                Prendre un rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/formations";
import { OFFRES } from "@/lib/offres";
import { formatPostDate } from "@/lib/posts";
import Breadcrumb from "@/components/Breadcrumb";
import JobsDeepLink from "@/components/JobsDeepLink";

const TITLE = "Nous rejoindre : offres d'emploi et de stage - Satisa Formation";
const DESCRIPTION =
  "Rejoignez Satisa Formation : retrouvez les offres d'emploi et de stage ouvertes, comme le stage de community manager en télétravail.";

const URL = `https://www.satisa-formation.fr${ROUTES.jobs}`;

export const metadata: Metadata = {
  title: "Nous rejoindre : offres d'emploi et de stage",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: "Satisa Formation", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const BREADCRUMB_JSON_LD = breadcrumbJsonLd([{ name: "Nous rejoindre", path: ROUTES.jobs }]);

export default function JobsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />

      <JobsDeepLink />

      <section className="hero-page hero-page--formations">
        <Breadcrumb />
        <div className="container">
          <p className="eyebrow">Recrutement</p>
          <h1>Nous rejoindre</h1>
          <p className="hero-page__subtitle">
            Satisa Formation recrute. Retrouvez ici les postes et les stages actuellement ouverts.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          {OFFRES.length === 0 ? (
            <p className="job-empty">
              Aucune offre n&apos;est ouverte pour le moment. Vous pouvez tout de même nous{" "}
              <Link href={ROUTES.contact}>écrire</Link>.
            </p>
          ) : (
            <>
              <h2 className="job-count">
                {OFFRES.length === 1 ? "1 offre ouverte" : `${OFFRES.length} offres ouvertes`}
              </h2>
              <div className="job-list">
                {OFFRES.map((offre) => (
                  <details key={offre.id} id={offre.id} className="job">
                    <summary className="job__summary">
                      <span className="job__badge">
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="7" width="20" height="14" rx="2" />
                          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" />
                        </svg>
                        <span className="job__type">{offre.type}</span>
                      </span>
                      <span className="job__head">
                        <h3 className="job__title">{offre.titre}</h3>
                        <span className="job__lead">{offre.accroche}</span>
                        <span className="job__chips">
                          {offre.pastilles.map((pastille) => (
                            <span key={pastille} className="job__chip">
                              {pastille}
                            </span>
                          ))}
                        </span>
                        <span className="job__date">
                          Offre publiée le <time dateTime={offre.datePublication}>{formatPostDate(offre.datePublication)}</time>
                        </span>
                      </span>
                      <span className="job__toggle" aria-hidden="true">
                        <span className="job__toggle-open">Voir l&apos;offre</span>
                        <span className="job__toggle-close">Masquer</span>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </summary>

                    <div className="job__content">
                      <div className="job__main">
                        {offre.alerte && (
                          <p className="job__alert" role="note">
                            {offre.alerte}
                          </p>
                        )}

                        <section className="job__block">
                          <h4>À propos de Satisa Formation</h4>
                          <p>{offre.aPropos}</p>
                        </section>

                        <section className="job__block">
                          <h4>Descriptif du poste</h4>
                          <p>{offre.descriptif}</p>
                        </section>

                        <section className="job__block">
                          <h4>Les missions</h4>
                          <p>{offre.missions}</p>
                        </section>

                        <section className="job__block">
                          <h4>Profil recherché</h4>
                          <p>{offre.profil.intro}</p>
                          <div className="job__skills">
                            <div className="job__skill">
                              <p className="job__sub">Les compétences souhaitées</p>
                              <ul className="job__checks">
                                {offre.profil.competences.map((competence) => (
                                  <li key={competence}>{competence}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="job__skill">
                              <p className="job__sub">Les plus</p>
                              <ul className="job__checks">
                                {offre.profil.plus.map((plus) => (
                                  <li key={plus}>{plus}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </section>

                        <section className="job__block">
                          <h4>Conditions</h4>
                          <ul className="job__checks">
                            {offre.conditions.map((condition) => (
                              <li key={condition}>{condition}</li>
                            ))}
                          </ul>
                        </section>

                        <section className="job__block">
                          <h4>Secteur</h4>
                          <p>{offre.secteur}</p>
                        </section>
                      </div>

                      <aside className="job__apply">
                        <h4>Avant de postuler</h4>
                        <ul className="job__checks">
                          {offre.avantDePostuler.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                        <a
                          className="btn btn--primary"
                          href={`mailto:${offre.candidature.email}?subject=${encodeURIComponent(offre.candidature.objet)}`}
                        >
                          Postuler par e-mail
                        </a>
                        <p className="job__mail">
                          Ou écrivez à <strong>{offre.candidature.email}</strong> avec l&apos;objet « {offre.candidature.objet} ».
                        </p>
                      </aside>
                    </div>
                  </details>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import RevealTimeline from "@/components/RevealTimeline";
import TimelineLogoBadge from "@/components/TimelineLogoBadge";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Chris Blassiaux, ingénieur de certification RNCP freelance et ingénieur pédagogique, fondateur de Satisa Formation. Une double compétence au service des organismes de formation.",
  alternates: {
    canonical: "https://www.satisa-formation.fr/a-propos",
  },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chris Blassiaux",
  jobTitle: "Ingénieur de certification et pédagogique",
  worksFor: {
    "@type": "Organization",
    name: "Satisa Formation",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
      />

      <section>
        <div className="container hero-page--split">
          <div className="about-photo">
            <Image
              src="/images/photos/profil-chris.webp"
              alt="Chris Blassiaux, fondateur de Satisa Formation"
              width={500}
              height={500}
            />
          </div>
          <div>
            <p className="eyebrow">À propos</p>
            <h1>Je fais le lien entre la certification et la pédagogie, parce que l&apos;une ne va pas sans l&apos;autre.</h1>
            <p className="hero-page__subtitle">
              Fondateur de Satisa Formation. Ingénieur de certification RNCP et pédagogique en freelance, je
              travaille avec les organismes de formation qui veulent déposer une certification RNCP/RS ou
              structurer leurs formations, sans multiplier les interlocuteurs.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Mon parcours</p>
            <h2>Du terrain pédagogique à l&apos;ingénierie de certification</h2>
          </div>
          <div className="article-body about-story">
            <p>
              Mon parcours mêle deux univers qui, sur le marché, restent presque toujours séparés :
              l&apos;ingénierie pédagogique et l&apos;ingénierie de certification. J&apos;ai construit ma pratique
              sur le terrain, au contact direct des organismes de formation, de leurs formateurs et de leurs
              contraintes réelles : des programmes à structurer, des contenus à rendre engageants, des outils
              numériques à intégrer sans complexifier le quotidien des équipes.
            </p>
            <p>
              C&apos;est cette double pratique qui m&apos;a naturellement conduit vers l&apos;ingénierie de
              certification. Construire un référentiel RNCP ou RS, ce n&apos;est pas seulement remplir un dossier
              administratif : c&apos;est concevoir un métier, le traduire en compétences évaluables, puis en
              formation qui tient debout. Ma compétence technique en développement web et digital learning me
              permet d&apos;aller jusqu&apos;au bout de cette logique : du référentiel jusqu&apos;à la formation
              digitalisée, sans rupture ni interlocuteur supplémentaire.
            </p>
            <p>
              Ma mission la plus structurante à ce jour : accompagner un centre de formation spécialisé dans le
              secteur de la santé sur l&apos;ensemble de son projet de certification RNCP, du dépôt du dossier
              jusqu&apos;à la conception des programmes et des évaluations.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tinted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Parcours</p>
            <h2>Les grandes étapes</h2>
          </div>
          <RevealTimeline>
            <li className="timeline__item">
              <div className="timeline__marker" aria-hidden="true"></div>
              <div className="timeline__content">
                <p className="timeline__date">Avant 2021</p>
                <h3 className="timeline__title">Développeur web &amp; web designer UX/UI</h3>
                <p className="timeline__text">
                  Conception d&apos;interfaces web : de la maquette UX/UI à l&apos;intégration front-end, pour des
                  sites et applications sur mesure. Une base technique qui se retrouve aujourd&apos;hui dans
                  chaque module e-learning conçu sur mesure, là où les outils auteurs ne suffisent plus.
                </p>
              </div>
            </li>

            <li className="timeline__item">
              <div className="timeline__marker" aria-hidden="true"></div>
              <div className="timeline__content">
                <p className="timeline__date">2021 - 2024</p>
                <h3 className="timeline__title">Formateur en développement web et web design</h3>
                <p className="timeline__text">
                  Animation de formations en développement web et web design, en présentiel comme à distance, pour
                  des organismes de formation et des entreprises. Enseigner dans des organismes de formation,
                  c&apos;est comprendre de l&apos;intérieur ce que vivent les formateurs, les apprenants et les
                  équipes pédagogiques au quotidien.
                </p>
                <p className="timeline__text">
                  <strong>J&apos;ai travaillé avec ces organismes de formation</strong>
                </p>
                <div className="timeline__logos">
                  <TimelineLogoBadge src="/images/logo/logo-orsys.png" alt="ORSYS" width={57} height={20} />
                  <TimelineLogoBadge src="/images/logo/logo-hetic.png" alt="HETIC" width={47} height={20} />
                  <TimelineLogoBadge src="/images/logo/logo-webforce3.png" alt="WebForce3" width={56} height={20} />
                  <TimelineLogoBadge src="/images/logo/logo-epsi.png" alt="EPSI" width={38} height={20} />
                  <TimelineLogoBadge src="/images/logo/logo-ipssi.png" alt="IPSSI" width={49} height={20} />
                  <TimelineLogoBadge src="/images/logo/logo-efrei.webp" alt="Efrei" width={61} height={20} />
                  <TimelineLogoBadge src="/images/logo/logo-doranco.webp" alt="Doranco" width={95} height={20} />
                </div>
                <p className="timeline__text">
                  <strong>J&apos;ai travaillé avec ces entreprises</strong>
                </p>
                <div className="timeline__logos">
                  <TimelineLogoBadge src="/images/logo/logo-ircem.png" alt="IRCEM" width={70} height={20} />
                  <TimelineLogoBadge src="/images/logo/logo-insee.svg" alt="INSEE" width={60} height={20} />
                </div>
              </div>
            </li>

            <li className="timeline__item">
              <div className="timeline__marker" aria-hidden="true"></div>
              <div className="timeline__content">
                <p className="timeline__date">2024</p>
                <h3 className="timeline__title">Lancement de Satisa Formation - Ingénierie pédagogique et digital learning</h3>
                <p className="timeline__text">
                  Création de Satisa Formation pour accompagner les organismes de formation dans la conception
                  pédagogique et la digitalisation de leurs formations professionnelles.
                </p>
              </div>
            </li>

            <li className="timeline__item">
              <div className="timeline__marker" aria-hidden="true"></div>
              <div className="timeline__content">
                <p className="timeline__date">Depuis janvier 2024</p>
                <h3 className="timeline__title">Responsable et ingénieur pédagogique - Cloud Campus</h3>
                <p className="timeline__text">
                  Pilotage de l&apos;ingénierie pédagogique, de la conception pédagogique et du digital learning
                  au sein de l&apos;organisme.
                </p>
                <div className="timeline__logos">
                  <TimelineLogoBadge src="/images/logo/logo-cloud-campus.webp" alt="Cloud Campus" width={20} height={20} />
                </div>
              </div>
            </li>

            <li className="timeline__item">
              <div className="timeline__marker" aria-hidden="true"></div>
              <div className="timeline__content">
                <p className="timeline__date">2024</p>
                <h3 className="timeline__title">Titre professionnel FPA - CCP1</h3>
                <p className="timeline__text">
                  Fort de plusieurs années de pratique en ingénierie pédagogique, j&apos;ai voulu officialiser ces
                  compétences par une certification reconnue. Le CCP1 du titre FPA valide ma maîtrise de la
                  conception de parcours multimodaux, de la scénarisation pédagogique et de la conception
                  d&apos;activités d&apos;apprentissage et d&apos;évaluation.
                </p>
                <p className="timeline__text">
                  <strong>Compétences validées :</strong>
                </p>
                <ul className="timeline__list">
                  <li>Élaborer la progression pédagogique d&apos;une formation multimodale à partir d&apos;une demande</li>
                  <li>Concevoir un scénario pédagogique et d&apos;accompagnement en intégrant la multimodalité</li>
                  <li>Concevoir des activités d&apos;apprentissage et d&apos;évaluation en intégrant la multimodalité</li>
                </ul>
              </div>
            </li>

            <li className="timeline__item">
              <div className="timeline__marker" aria-hidden="true"></div>
              <div className="timeline__content">
                <p className="timeline__date">2025</p>
                <h3 className="timeline__title">Satisa Formation - Évolution vers l&apos;ingénierie de certification RNCP/RS</h3>
                <p className="timeline__text">
                  Évolution de Satisa Formation vers l&apos;ingénierie de certification. Accompagnement des
                  organismes de formation sur leurs projets de dépôt et de renouvellement de certification
                  RNCP/RS auprès de France Compétences.
                </p>
              </div>
            </li>
          </RevealTimeline>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">La double compétence</p>
            <h2>Ce que ça change concrètement pour vous</h2>
          </div>
          <div className="grid grid--2">
            <div className="competence-block">
              <h3>Ingénierie de certification</h3>
              <p>
                Analyse métier, mapping des compétences, rédaction du référentiel, pilotage de la cohorte pilote,
                dépôt et suivi du dossier France Compétences.
              </p>
              <ul>
                <li>Un référentiel pensé pour être formé, pas seulement déposé</li>
                <li>Un pilotage réel du chantier, pas une simple méthodologie</li>
                <li>Une connaissance fine des attentes de France Compétences</li>
              </ul>
            </div>
            <div className="competence-block">
              <h3>Ingénierie pédagogique et digital</h3>
              <p>Conception de formation, création de contenus, digitalisation blended et e-learning, déploiement LMS.</p>
              <ul>
                <li>Des parcours alignés sur le référentiel de la certification visée</li>
                <li>Des supports conformes Qualiopi, prêts à être animés</li>
                <li>Une digitalisation qui ne complexifie pas le quotidien de vos équipes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Satisa Formation</p>
            <h2>Pourquoi cette structure existe</h2>
          </div>
          <div className="article-body">
            <p>
              Satisa Formation est né d&apos;un constat simple : sur le marché de l&apos;accompagnement RNCP/RS,
              la continuité entre référentiel, formation et digitalisation n&apos;existe pas. Pourtant, c&apos;est
              précisément ce qui fait qu&apos;une certification fonctionne dans la durée.
            </p>
            <p>
              L&apos;objectif n&apos;est pas de vendre une méthodologie, mais de prendre en charge le chantier,
              avec un interlocuteur unique du premier au dernier livrable.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div
            className="photo-placeholder"
            role="img"
            aria-label="Photo secondaire de Chris en contexte de travail à intégrer (optionnelle)"
            style={{ minHeight: "320px" }}
          >
            Photo secondaire de Chris en contexte de travail
            <br />
            (optionnelle, à intégrer si disponible)
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Discutons de votre projet</h2>
              <p>Certification, formation, digitalisation : parlons de ce qui vous bloque aujourd&apos;hui.</p>
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/formations";
import FaqList from "@/components/FaqList";
import LinkArrow from "@/components/LinkArrow";
import RsOuRncpTool from "@/components/RsOuRncpTool";

const TITLE = "Test gratuit : RS ou RNCP ? - Satisa Formation";
const DESCRIPTION =
  "Votre certification doit-elle viser le RS ou le RNCP ? Répondez à 10 questions : verdict en 2 minutes, gratuit, sans inscription.";
const COVER_POINTS = ["10 questions simples", "Verdict immédiat, avec les raisons", "Gratuit, sans inscription"];

const URL = `https://www.satisa-formation.fr${ROUTES.certificationRsOuRncp}`;

export const metadata: Metadata = {
  title: "Test gratuit : RS ou RNCP ?",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
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

const FAQ_RS_OU_RNCP: FaqItem[] = [
  {
    question: "Quelle est la différence entre le RNCP et le RS ?",
    answer:
      "Le RNCP enregistre des certifications qui préparent à un métier complet, avec un niveau de qualification. Le RS enregistre une compétence complémentaire à un métier (une spécialisation, une compétence transversale ou une habilitation), sans niveau de qualification. Les deux sont tenus par France Compétences et ouvrent l'accès au CPF, mais pas dans les mêmes conditions.",
  },
  {
    question: "Ce test remplace-t-il un diagnostic de faisabilité ?",
    answer:
      "Non. Le test est une orientation générale, pas un avis juridique : l'enregistrement dépend de la décision de France Compétences. Le diagnostic de faisabilité analyse votre projet en détail (besoin en compétences, offre existante, promotions, dispositif d'évaluation, conformité) et vous rend un verdict argumenté.",
  },
  {
    question: "Mes réponses sont-elles conservées ?",
    answer:
      "Aucune donnée personnelle n'est demandée pour voir le résultat. Vos réponses restent dans le lien de la page : elles ne sont envoyées que si vous choisissez de recevoir votre résultat par e-mail. Nous comptons seulement, de façon anonyme et sans cookie, le nombre de tests commencés et terminés.",
  },
  {
    question: "Le dépôt auprès de France Compétences est-il payant ?",
    answer:
      "Non, le dépôt lui-même est gratuit. Le coût d'un projet vient du temps de préparation (référentiels, promotion de titulaires, données d'insertion) et, si vous le souhaitez, de l'accompagnement.",
  },
];

const BREADCRUMB_JSON_LD = breadcrumbJsonLd([
  { name: "Déposer une certification RNCP/RS", path: ROUTES.certification },
  { name: "Test RS ou RNCP", path: ROUTES.certificationRsOuRncp },
]);

export default function RsOuRncpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_RS_OU_RNCP)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />

      <section className="rsr-cover">
        <div className="container sim-cover">
          <div className="sim-cover__text">
            <p className="sim-intro__eyebrow">Test gratuit</p>
            <h1 className="sim-intro__title">RS ou RNCP : quel répertoire pour votre certification ?</h1>
            <p className="sim-intro__lead">
              Répondez à 10 questions : en 2 minutes, vous obtenez un verdict clair, les points de vigilance et la
              formule d&apos;accompagnement adaptée à votre situation. Aucune coordonnée n&apos;est demandée pour voir le
              résultat.
            </p>
            <ul className="sim-intro__points">
              {COVER_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <Image
            className="sim-cover__visual"
            src="/images/simulateur/apercu-test-rs-rncp-v1.webp"
            alt=""
            aria-hidden="true"
            width={1535}
            height={591}
            quality={90}
            sizes="(min-width: 1000px) 1300px, 120vw"
            priority
          />
        </div>

        <div className="container dg-sim__tool">
          <RsOuRncpTool />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Les repères</p>
            <h2>RS ou RNCP : la différence en bref</h2>
            <p>
              Les deux répertoires sont tenus par France Compétences et ouvrent l&apos;accès au CPF. Ils ne certifient pas la
              même chose.
            </p>
          </div>
          <div className="rsr-difference">
            <article className="rsr-difference__carte">
              <h3>RNCP : un métier complet</h3>
              <ul>
                <li>La certification prépare à un métier identifié, avec ses activités et ses responsabilités propres.</li>
                <li>Elle est rattachée à un niveau de qualification (équivalent bac, bac+2…).</li>
                <li>Exemples : développeur, gestionnaire, designer, commercial.</li>
              </ul>
              <Link href={ROUTES.certificationRncp} className="btn btn--outline">
                Accompagnement au dépôt RNCP <LinkArrow />
              </Link>
            </article>
            <article className="rsr-difference__carte rsr-difference__carte--sombre">
              <h3>RS : une compétence complémentaire</h3>
              <ul>
                <li>La certification atteste une compétence qui s&apos;ajoute à un métier déjà exercé.</li>
                <li>Elle n&apos;est pas rattachée à un niveau de qualification.</li>
                <li>Exemples : langue, logiciel, technique de spécialisation, habilitation réglementaire.</li>
              </ul>
              <Link href={ROUTES.certificationRs} className="btn btn--primary">
                Accompagnement au dépôt RS <LinkArrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2>Le test RS ou RNCP, en détail</h2>
          </div>
          <FaqList items={FAQ_RS_OU_RNCP} />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Besoin d&apos;un accompagnement ?</h2>
              <p>Le diagnostic de faisabilité vérifie votre projet en détail et vous dit s&apos;il peut être déposé.</p>
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

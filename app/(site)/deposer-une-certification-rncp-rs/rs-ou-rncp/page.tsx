import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/formations";
import FaqList from "@/components/FaqList";
import RsOuRncpGuide from "@/components/RsOuRncpGuide";
import RsOuRncpTool from "@/components/RsOuRncpTool";
import Breadcrumb from "@/components/Breadcrumb";

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
    question: "Ce test remplace-t-il un diagnostic de faisabilité ?",
    answer:
      "Non. Le test est une orientation générale, pas un avis juridique : l'enregistrement dépend de la décision de France Compétences. Le diagnostic de faisabilité analyse votre projet en détail (besoin en compétences, offre existante, promotions, dispositif d'évaluation, conformité) et vous rend un verdict argumenté.",
  },
  {
    question: "Le dépôt auprès de France Compétences est-il payant ?",
    answer:
      "Non, le dépôt lui-même est gratuit. Le coût d'un projet vient du temps de préparation (référentiels, promotion de titulaires, données d'insertion) et, si vous le souhaitez, de l'accompagnement.",
  },
  {
    question: "Mon RS peut-il devenir un RNCP plus tard ?",
    answer:
      "Non, un RS ne se transforme pas en RNCP : passer de l'un à l'autre, c'est déposer une nouvelle demande, avec un autre périmètre et d'autres critères. Une partie du travail se réutilise (le retour d'expérience de votre formation, vos contenus), mais le référentiel d'activités est à créer. Si vous savez dès le départ que vous voulez un niveau de qualification, mieux vaut viser directement le RNCP : commencer par un RS additionne les délais et le travail.",
  },
  {
    question: "Dois-je créer ma propre certification pour faire certifier ma formation ?",
    answer:
      "Pas forcément. Il y a trois situations : vous êtes organisme certificateur (vous créez et déposez la certification, et vous en portez la responsabilité), organisme habilité (vous préparez ou évaluez des candidats sur la certification d'un autre organisme, avec un accord formel avec lui), ou ni l'un ni l'autre (formation non certifiante, qui reste fermée au CPF). Ce test concerne le cas où vous déposez votre propre certification.",
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
        <Breadcrumb />
        <div className="container sim-cover">
          <div className="sim-cover__text">
            <p className="sim-intro__eyebrow">Test gratuit</p>
            <h1 className="sim-intro__title">RS ou RNCP : quel répertoire pour votre certification ?</h1>
            <p className="sim-intro__lead">
              Répondez à 10 questions : en 2 minutes, vous obtenez un verdict clair et les points de vigilance. Aucune
              coordonnée n&apos;est demandée pour voir le résultat.
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

      <RsOuRncpGuide />

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

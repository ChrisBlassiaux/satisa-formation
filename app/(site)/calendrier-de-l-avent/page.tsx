import type { Metadata } from "next";
import Link from "next/link";
import AdventCalendar from "@/components/AdventCalendar";
import { Etoiles, Neige } from "@/components/AdventDecor";
import Breadcrumb from "@/components/Breadcrumb";
import LinkArrow from "@/components/LinkArrow";
import { RATTRAPAGE_POSSIBLE } from "@/lib/aventCases";
import { ROUTES } from "@/lib/routes";

// Page temporaire : ni indexée par Google, ni dans le plan du site, ni dans le menu. À retirer après l'opération.
export const metadata: Metadata = {
  title: "Calendrier de l'Avent",
  description:
    "Du 1er au 24 décembre, une case par jour pour comprendre le dépôt RNCP/RS et prendre de l'avance pour 2027. Gratuit et sans inscription.",
  robots: { index: false, follow: false },
};

// Les quatre temps du mois, sans dévoiler le contenu des cases.
const ETAPES = [
  {
    dates: "Du 1er au 6 décembre",
    titre: "Comprendre et choisir",
    texte:
      "Découvrez ce qu'implique un dépôt, clarifiez pourquoi certifier et vers quel répertoire vous orienter : RS ou RNCP.",
  },
  {
    dates: "Du 7 au 13 décembre",
    titre: "Vérifier et planifier",
    texte: "Mesurez si votre projet est faisable, et ce qu'il demandera en temps et en budget.",
  },
  {
    dates: "Du 14 au 20 décembre",
    titre: "Poser les bases",
    texte: "Découvrez les fondations à préparer : référentiel, programme et évaluation.",
  },
  {
    dates: "Du 21 au 24 décembre",
    titre: "Anticiper 2027",
    texte: "Repérez les preuves à réunir dès maintenant, et choisissez comment avancer l'an prochain.",
  },
];

export default function AdventPage() {
  return (
    <>
      <section className="avent-page">
        <Breadcrumb tone="light" />
        <Neige nombre={40} />
        <Etoiles nombre={26} />
        <div className="container avent-page__contenu">
          <header className="avent-page__tete">
            <p className="avent-page__etiquette">Calendrier de l&apos;Avent</p>
            <h1>Préparez votre enregistrement RNCP/RS</h1>
            <p className="avent-page__intro">
              Vous pensez à une certification pour 2027 ? Chaque jour, une case pour y voir plus clair et prendre de
              l&apos;avance. Gratuit, sans inscription.
            </p>
          </header>
          <AdventCalendar />
        </div>
      </section>

      <section className="section-tinted">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Prenez de l&apos;avance pour 2027</h2>
            <p className="avent-objectif__chapo">
              Pas besoin de vous lancer dans le dossier dès décembre. Profitez de ce mois pour comprendre, clarifier
              votre projet et repérer ce qu&apos;il faudra préparer, pour savoir par où commencer l&apos;an prochain.
            </p>
          </div>
          <ol className="avent-etapes">
            {ETAPES.map((etape, i) => (
              <li key={etape.titre} className="avent-etape">
                <span className="avent-etape__repere" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="avent-etape__carte">
                  <p className="avent-etape__dates">{etape.dates}</p>
                  <h3>{etape.titre}</h3>
                  <p>{etape.texte}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="avent-objectif__pied">
            <p>Dans les cases : des repères en une page, des documents à réutiliser et des outils en ligne.</p>
            {RATTRAPAGE_POSSIBLE && <p>Vous arrivez en cours de route ? Les cases passées restent ouvertes.</p>}
            <Link href={ROUTES.contact} className="avent-objectif__lien">
              Prendre un rendez-vous <LinkArrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

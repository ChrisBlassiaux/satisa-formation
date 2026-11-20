import type { ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import LinkArrow from "@/components/LinkArrow";

// Sections de repères de la page du test « RS ou RNCP ? » : « Sur quoi se base le test ? ».
// Elles réutilisent les composants visuels de la page du simulateur de prix (préfixe sg-) ; seuls les ajustements
// propres à cette page sont dans styles/_rsrncp.scss (préfixe rsr-).
// Le contenu reprend les règles réelles de l'outil (lib/rsRncp/config.ts) : aucune règle n'est inventée ici.

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const ICONS = {
  briefcase: (
    <Icon>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" />
    </Icon>
  ),
  puzzle: (
    <Icon>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <circle cx="12" cy="12" r="4" />
    </Icon>
  ),
  award: (
    <Icon>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
    </Icon>
  ),
  clock: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icon>
  ),
  users: (
    <Icon>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </Icon>
  ),
  target: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Icon>
  ),
  check: (
    <Icon>
      <path d="m5 12 5 5L20 7" />
    </Icon>
  ),
  book: (
    <Icon>
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
    </Icon>
  ),
  info: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </Icon>
  ),
};

type Chip = { label: string; more?: boolean };

function ChipList({ chips }: { chips: Chip[] }) {
  return (
    <ul className="sg-chips">
      {chips.map((chip) => (
        <li key={chip.label} className={chip.more ? "sg-chips__more" : undefined}>
          {chip.label}
        </li>
      ))}
    </ul>
  );
}

// ---------- Étape 2 : niveau de préparation (libellés identiques à ceux du résultat) ----------
const NIVEAUX = [
  "Prêt : vos éléments essentiels sont réunis, vous pouvez engager le dossier.",
  "Presque prêt : l'essentiel est là, certains éléments sont à compléter avant le dépôt.",
  "À construire : plusieurs éléments essentiels sont à construire avant de pouvoir déposer.",
];

// ---------- Les 4 critères qui orientent vers le RNCP ou le RS ----------
const CRITERES = [
  {
    tone: "mint",
    title: "Ce que vous certifiez",
    icon: ICONS.award,
    text: "C'est le critère le plus important. Le RNCP certifie un métier complet, avec ses activités et ses responsabilités. Le RS certifie une compétence qui s'ajoute à un métier déjà exercé, ou une habilitation exigée par une réglementation ou une norme. Certaines actions, comme une simple sensibilisation ou une remise à niveau, ne peuvent pas être enregistrées.",
    chips: [{ label: "Métier complet : RNCP" }, { label: "Compétence ou habilitation : RS" }],
  },
  {
    tone: "dark",
    title: "La durée du parcours",
    icon: ICONS.clock,
    text: "La durée est un indice, pas une règle absolue : un parcours court correspond plutôt à une compétence, un parcours long plutôt à un métier. Le test distingue trois tranches de durée.",
    chips: [{ label: "Parcours court : plutôt RS" }, { label: "Parcours long : plutôt RNCP" }],
  },
  {
    tone: "plain",
    title: "Le public visé",
    icon: ICONS.users,
    text: "Des salariés, qui exercent déjà un métier, orientent plutôt vers une compétence complémentaire (RS). Avec des demandeurs d'emploi, l'insertion professionnelle de vos titulaires devient l'élément central du dossier.",
    chips: [{ label: "Salariés : plutôt RS" }, { label: "Demandeurs d'emploi : insertion au centre" }],
  },
  {
    tone: "mint",
    title: "Votre objectif",
    icon: ICONS.target,
    text: "Pour accéder au CPF et à de nombreux financements, il faut une certification enregistrée au RNCP ou au RS. Si vous voulez faire reconnaître un métier, le RNCP associe la certification à un niveau de qualification. Si l'enjeu est une reconnaissance en interne, un enregistrement n'est peut-être pas nécessaire.",
    chips: [{ label: "Financements : RNCP ou RS" }, { label: "Reconnaître un métier : RNCP" }],
  },
] as const;

// ---------- Les 5 points de préparation que le test vérifie ----------
const POINTS_DE_PREPARATION = [
  {
    title: "Un référentiel de compétences écrit",
    why: "Il décrit les activités, les compétences visées et la façon de les évaluer. C'est souvent là que se joue la solidité du dossier.",
  },
  {
    title: "Au moins une promotion formée et évaluée",
    why: "Dans la grande majorité des cas, on ne peut déposer qu'après avoir formé et évalué au moins une promotion : l'examen du dossier s'appuie sur ces résultats réels.",
  },
  {
    title: "Un suivi de ce que deviennent vos diplômés",
    why: "Les données d'insertion (emploi, évolution) sont obligatoires pour le RNCP et examinées aussi pour le RS. Sans suivi, il est difficile de constituer un dossier.",
  },
  {
    title: "Une évaluation indépendante du formateur",
    why: "L'évaluation doit être sérieuse et indépendante : un jury ou des évaluateurs extérieurs au formateur sont un point de contrôle de la qualité de la certification.",
  },
  {
    title: "Du temps pour le projet, dans un délai réaliste",
    why: "Le dépôt est gratuit, mais il demande beaucoup de temps : référentiels, collecte des données, suivi. Entre la préparation du dossier et la décision de France Compétences, il faut compter plusieurs mois.",
  },
];

// ---------- Ce que le test ne fait pas ----------
const LIMITES = [
  "C'est une orientation générale, pas un avis juridique.",
  "La décision d'enregistrement revient à France Compétences.",
  "Un résultat « presque prêt » indique ce qu'il reste à compléter : il ne garantit rien.",
];

const ARTICLES = [
  { title: "RNCP ou RS : comment choisir en 2026 ?", slug: "rncp-ou-rs-guide-complet" },
  { title: "Suis-je éligible au RNCP ?", slug: "suis-je-eligible-au-rncp-criteres-d-eligibilite-et-conditions-2026" },
  { title: "Suis-je éligible au RS ?", slug: "certification-rncp-suis-je-eligible-au-rs-criteres-de-certification-au-repertoire-specifique" },
];

export default function RsOuRncpGuide() {
  return (
    <>
      {/* 1. Sur quoi se base le test : deux étapes */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Sur quoi se base le test ?</p>
            <h2>Comment faire le choix d&apos;un RS ou d&apos;un RNCP&nbsp;?</h2>
            <p>
              Le test ne devine pas : il applique des règles écrites, les mêmes pour tout le monde, tirées de nos
              articles et du Code du travail. Certains critères, comme le public ou la durée, sont pondérés selon
              l&apos;expérience de Satisa. Le test répond à deux questions, dans cet ordre.
            </p>
          </div>
          <figure className="sg-hour rsr-etapes">
            <div className="sg-hour__grid">
              <div className="sg-hour__panel sg-hour__panel--learner">
                <h3 className="sg-hour__heading">Étape 1 : le bon répertoire. Que certifie votre formation&nbsp;?</h3>
                <ul className="sg-hour__list">
                  <li>
                    <span className="sg-hour__icon">{ICONS.briefcase}</span>
                    Un métier complet : plutôt le RNCP
                  </li>
                  <li>
                    <span className="sg-hour__icon">{ICONS.puzzle}</span>
                    Une compétence qui complète un métier : plutôt le RS
                  </li>
                </ul>
                <p className="sg-hour__note">
                  Quatre questions pèsent dans ce choix : ce que vous certifiez, la durée du parcours, le public visé et
                  votre objectif.
                </p>
              </div>
              <div className="sg-hour__panel sg-hour__panel--upstream">
                <span className="sg-mark sg-mark--light" aria-hidden="true" />
                <h3 className="sg-hour__heading">Étape 2 : votre niveau de préparation. Votre projet est-il prêt à être déposé&nbsp;?</h3>
                <ol className="sg-hour__list sg-hour__list--steps">
                  {NIVEAUX.map((niveau, index) => (
                    <li key={niveau}>
                      <span className="sg-hour__num" aria-hidden="true">{index + 1}</span>
                      {niveau}
                    </li>
                  ))}
                </ol>
                <p className="sg-hour__note">
                  Six questions servent à ce niveau : le référentiel, les promotions, le suivi des diplômés, l&apos;évaluation,
                  le temps disponible et le délai. Il détermine aussi la formule d&apos;accompagnement recommandée.
                </p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* 2. Les 4 critères */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Les critères</p>
            <h2>Les 4 critères qui orientent vers le RNCP ou le RS</h2>
            <p>Ils correspondent aux quatre premières questions du test.</p>
          </div>
          <div className="sg-levers">
            {CRITERES.map((critere, index) => (
              <article
                key={critere.title}
                className={`sg-lever sg-lever--w3${critere.tone === "plain" ? "" : ` sg-lever--${critere.tone}`}`}
              >
                <span className="sg-lever__num" aria-hidden="true">{index + 1}</span>
                <span className="sg-lever__icon">{critere.icon}</span>
                <div>
                  <h3 className="sg-lever__title">{critere.title}</h3>
                  <p className="sg-lever__text">{critere.text}</p>
                </div>
                <ChipList chips={[...critere.chips]} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Les 5 points de préparation */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Préparation</p>
            <h2>Êtes-vous prêt à déposer ? Les 5 points que le test vérifie</h2>
            <p>
              Un dossier s&apos;appuie sur des éléments concrets. Le test regarde où vous en êtes sur chacun d&apos;eux, et vous
              indique ce qu&apos;il reste à construire, par ordre de priorité.
            </p>
          </div>
          <ul className="sg-quotes rsr-points">
            {POINTS_DE_PREPARATION.map((point) => (
              <li key={point.title} className="sg-quote">
                <span className="sg-quote__check" aria-hidden="true">{ICONS.check}</span>
                <div>
                  <h3 className="sg-quote__q">{point.title}</h3>
                  <p className="sg-quote__why">{point.why}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Ce que le test ne fait pas + pour aller plus loin */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Les limites</p>
            <h2>Ce que le test ne fait pas</h2>
          </div>
          <div className="rsr-limites">
            <article className="sg-lever sg-lever--mint">
              <span className="sg-lever__icon">{ICONS.info}</span>
              <div>
                <h3 className="sg-lever__title">Une orientation, pas une décision</h3>
                <ul className="rsr-limites__liste">
                  {LIMITES.map((limite) => (
                    <li key={limite}>{limite}</li>
                  ))}
                </ul>
              </div>
            </article>
            <article className="sg-lever sg-lever--dark">
              <span className="sg-mark sg-mark--light" aria-hidden="true" />
              <span className="sg-lever__icon">{ICONS.book}</span>
              <div>
                <h3 className="sg-lever__title">Pour aller plus loin</h3>
                <p className="sg-lever__text">Les articles sur lesquels s&apos;appuient les règles du test.</p>
              </div>
              <ul className="rsr-limites__articles">
                {ARTICLES.map((article) => (
                  <li key={article.slug}>
                    <Link href={`${ROUTES.blog}/${article.slug}`}>
                      {article.title} <LinkArrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

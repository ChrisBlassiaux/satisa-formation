import type { ReactNode } from "react";

// Sections de repères de la page du simulateur (préfixe sg-). Même niveau de finition que la page Digitalisation :
// cartes menthe / foncées, motif de points, grands chiffres en filigrane, pictogrammes. Chaque section a une forme
// adaptée à son contenu.

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const ICONS = {
  read: (
    <Icon>
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
    </Icon>
  ),
  video: (
    <Icon>
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="m22 8-6 4 6 4z" />
    </Icon>
  ),
  interactive: (
    <Icon>
      <path d="m9 9 5 12 1.8-5.2L21 14z" />
      <path d="m7.2 2.2.8 2.9M5.1 8l-2.9-.8M14 4.1 12 6M6 12l-1.9 2" />
    </Icon>
  ),
  pencil: (
    <Icon>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </Icon>
  ),
  quiz: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </Icon>
  ),
  list: (
    <Icon>
      <path d="m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8" />
    </Icon>
  ),
  clock: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icon>
  ),
  file: (
    <Icon>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8" />
    </Icon>
  ),
  expert: (
    <Icon>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m16 11 2 2 4-4" />
    </Icon>
  ),
  search: (
    <Icon>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Icon>
  ),
  check: (
    <Icon>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
  ),
  arrowRight: (
    <Icon>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </Icon>
  ),
  scale: (
    <Icon>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </Icon>
  ),
};

// ---------- 1. Ce que contient une heure d'e-learning ----------
const LEARNER_ITEMS = [
  { label: "Lectures et capsules vidéo", icon: ICONS.video },
  { label: "Capsules pédagogiques interactives", icon: ICONS.interactive },
  { label: "Activités et exercices", icon: ICONS.pencil },
  { label: "Quiz et évaluations", icon: ICONS.quiz },
  { label: "Consignes et synthèses", icon: ICONS.list },
];

const UPSTREAM_ITEMS = [
  "Scénarisation et storyboard",
  "Rédaction des contenus",
  "Scripts et montage vidéo",
  "Activités et leurs corrections",
  "Intégration et paramétrage",
  "Tests fonctionnels",
  "Relectures et validations",
];

// ---------- 2. Ce qui fait varier le prix ----------
type Chip = { label: string; more?: boolean };

const CONTENT_SCALE = [
  { label: "Contenus prêts", level: 1 },
  { label: "À réécrire", level: 2 },
  { label: "Tout à créer", level: 3 },
];

const ADDED_SERVICES = [
  "Séquençage de la formation",
  "Configuration de la plateforme (LMS)",
  "Formation de vos équipes",
  "Accompagnement après la mise en ligne",
];

// ---------- 3. Comparer deux devis ----------
const QUOTE_QUESTIONS = [
  {
    question: "Sur quoi porte le prix : la durée de formation pour l'apprenant, ou seulement les minutes de vidéo\u00a0?",
    why: "Une heure de formation en ligne contient aussi des lectures, des exercices et des quiz, pas seulement des vidéos.",
  },
  {
    question: "Qui rédige le contenu : votre expert ou le prestataire\u00a0?",
    why: "C'est souvent une grosse part du travail.",
  },
  {
    question: "Les vidéos sont-elles incluses ? Qui tourne, qui monte\u00a0?",
    why: "Le tournage et le montage changent fortement le prix.",
  },
  {
    question: "Les quiz, exercices et évaluations sont-ils inclus\u00a0?",
    why: "Certains devis ne couvrent que la mise en forme.",
  },
  {
    question: "L'intégration dans votre plateforme est-elle comprise\u00a0?",
    why: "Elle est parfois facturée à part.",
  },
  {
    question: "Combien de cycles de relecture sont prévus\u00a0?",
    why: "Sans limite écrite, les allers-retours dérapent.",
  },
  {
    question: "Que se passe-t-il si la durée réelle change\u00a0?",
    why: "Un devis sérieux prévoit une règle d'ajustement.",
  },
  {
    question: "Un module pilote est-il prévu\u00a0?",
    why: "Il permet de juger sur pièce avant de tout produire.",
  },
];

// ---------- 5. Les 4 façons de fixer le prix ----------
const PRICING_MODES = [
  {
    mode: "À l'heure d'e-learning",
    principle: "Un prix par heure de formation suivie par l'apprenant.",
    check: "Ce que comprend une heure : seulement des vidéos, ou aussi des lectures, des exercices et des quiz.",
  },
  {
    mode: "Au module",
    principle: "Un prix par module, quelle que soit sa longueur.",
    check: "La durée et le contenu d'un module, qui varient d'un prestataire à l'autre.",
  },
  {
    mode: "À la minute de vidéo",
    principle: "Un prix par minute de vidéo produite.",
    check: "Ce qui entoure la vidéo : activités, quiz, intégration.",
  },
  {
    mode: "Au forfait",
    principle: "Un prix global pour le projet.",
    check: "Le périmètre exact et ce qui se passe si le volume change.",
  },
];

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

export default function SimulatorGuide() {
  return (
    <>
      {/* 1. Une heure d'e-learning */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Repères</p>
            <h2>Ce que contient une heure <span className="nowrap">d&apos;e-learning</span></h2>
          </div>
          <figure className="sg-hour">
            <figcaption>
              <p className="sg-hour__lead">
                Une heure d&apos;e-learning repose sur bien plus que ce que voit l&apos;apprenant
              </p>
            </figcaption>
            <div className="sg-hour__grid">
              <div className="sg-hour__panel sg-hour__panel--learner">
                <h3 className="sg-hour__heading">Ce que suit un apprenant durant 1&nbsp;h de formation</h3>
                <ul className="sg-hour__list">
                  {LEARNER_ITEMS.map((item) => (
                    <li key={item.label}>
                      <span className="sg-hour__icon">{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                <p className="sg-hour__note">
                  Une heure d&apos;e-learning, c&apos;est une heure de formation suivie par l&apos;apprenant, pas une heure
                  de vidéo. Elle mélange des lectures, des capsules vidéo, des capsules pédagogiques interactives, des
                  activités, des quiz et des évaluations, reliés par des consignes et des synthèses.
                </p>
              </div>
              <div className="sg-hour__panel sg-hour__panel--upstream">
                <span className="sg-mark sg-mark--light" aria-hidden="true" />
                <h3 className="sg-hour__heading">Ce que nous produisons en amont</h3>
                <ol className="sg-hour__list sg-hour__list--steps">
                  {UPSTREAM_ITEMS.map((item, index) => (
                    <li key={item}>
                      <span className="sg-hour__num" aria-hidden="true">{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
                <p className="sg-hour__note">
                  Pour que cette heure fonctionne sans formateur, tout doit être préparé en amont : le parcours est
                  scénarisé, chaque écran est décrit dans un storyboard, les contenus sont rédigés, les vidéos scriptées
                  et montées, les activités créées avec leurs corrections, puis tout est intégré, testé et relu.
                  C&apos;est ce travail invisible qui fait la qualité d&apos;un module, et qui explique son prix.
                </p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* 2. Ce qui fait varier le prix */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Critères de prix</p>
            <h2>Ce qui fait varier le prix d&apos;un module e-learning</h2>
            <p>Quel que soit le prestataire, cinq critères font varier le prix d&apos;une formation e-learning.</p>
          </div>
          <div className="sg-levers">
            <article className="sg-lever sg-lever--mint sg-lever--w3">
              <span className="sg-lever__num" aria-hidden="true">1</span>
              <span className="sg-lever__icon">{ICONS.clock}</span>
              <div>
                <h3 className="sg-lever__title">La durée du parcours</h3>
                <p className="sg-lever__text">
                  C&apos;est le premier facteur : plus il y a d&apos;heures d&apos;e-learning à produire, plus le budget
                  augmente, même si beaucoup de prestataires appliquent un tarif dégressif.
                </p>
              </div>
              <ChipList chips={[{ label: "Plus d'heures, plus de budget" }, { label: "Tarif dégressif" }]} />
            </article>

            <article className="sg-lever sg-lever--dark sg-lever--w3">
              <span className="sg-lever__num" aria-hidden="true">2</span>
              <span className="sg-lever__icon">{ICONS.file}</span>
              <div>
                <h3 className="sg-lever__title">L&apos;état de vos contenus</h3>
                <p className="sg-lever__text">
                  Des vidéos finies ou un cours déjà rédigé pour l&apos;apprenant se mettent en ligne rapidement. Des
                  diaporamas de formateur ou des notes demandent d&apos;être réécrits. Sans aucun support, tout est à
                  créer.
                </p>
              </div>
              <ol className="sg-scale" aria-label="Effort de production selon l'état des contenus">
                {CONTENT_SCALE.map((step) => (
                  <li key={step.label}>
                    <span className="sg-scale__bars" aria-hidden="true">
                      {[1, 2, 3].map((n) => (
                        <i key={n} className={n <= step.level ? "is-on" : undefined} />
                      ))}
                    </span>
                    {step.label}
                  </li>
                ))}
              </ol>
            </article>

            <article className="sg-lever sg-lever--w2">
              <span className="sg-lever__num" aria-hidden="true">3</span>
              <span className="sg-lever__icon">{ICONS.expert}</span>
              <div>
                <h3 className="sg-lever__title">Qui apporte le savoir</h3>
                <p className="sg-lever__text">
                  Si un expert de votre équipe peut transmettre le contenu, le prestataire se concentre sur la mise en
                  forme. Sinon, il doit faire appel à un expert du sujet, un formateur par exemple, pour produire le
                  contenu : c&apos;est un coût en plus.
                </p>
              </div>
              <ChipList chips={[{ label: "Expert de votre équipe" }, { label: "Expert du sujet : coût en plus", more: true }]} />
            </article>

            <article className="sg-lever sg-lever--w2">
              <span className="sg-lever__num" aria-hidden="true">4</span>
              <span className="sg-lever__icon">{ICONS.video}</span>
              <div>
                <h3 className="sg-lever__title">Les vidéos</h3>
                <p className="sg-lever__text">
                  Le tournage, le montage, l&apos;animation ou le motion design pèsent lourd. Une capsule filmée par votre
                  équipe coûte bien moins qu&apos;une vidéo produite par un studio.
                </p>
              </div>
              <ChipList chips={[{ label: "Capsule filmée par votre équipe" }, { label: "Vidéo de studio", more: true }]} />
            </article>

            <article className="sg-lever sg-lever--w2">
              <span className="sg-lever__num" aria-hidden="true">5</span>
              <span className="sg-lever__icon">{ICONS.interactive}</span>
              <div>
                <h3 className="sg-lever__title">Le niveau d&apos;interactivité</h3>
                <p className="sg-lever__text">
                  Des quiz et des exercices classiques restent abordables. Des mises en situation à embranchements, des
                  simulations ou un jeu sérieux demandent beaucoup plus de conception.
                </p>
              </div>
              <ChipList
                chips={[
                  { label: "Quiz et exercices classiques" },
                  { label: "Embranchements", more: true },
                  { label: "Simulations", more: true },
                  { label: "Jeu sérieux", more: true },
                ]}
              />
            </article>

            <div className="sg-levers__more">
              <p>S&apos;y ajoutent souvent des prestations autour du contenu :</p>
              <ul className="sg-chips sg-chips--plus">
                {ADDED_SERVICES.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comparer deux devis */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Comparer</p>
            <h2>Comment comparer deux devis e-learning&nbsp;?</h2>
            <p>
              Deux devis peuvent afficher des prix très différents pour le même projet, simplement parce qu&apos;ils ne
              couvrent pas la même chose. Avant de comparer les montants, comparez ce qu&apos;ils incluent.
            </p>
          </div>
          <ul className="sg-quotes">
            {QUOTE_QUESTIONS.map((row) => (
              <li key={row.question} className="sg-quote">
                <span className="sg-quote__check" aria-hidden="true">?</span>
                <div>
                  <h3 className="sg-quote__q">{row.question}</h3>
                  <p className="sg-quote__why">{row.why}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="sg-verdict">
            <span className="sg-mark sg-mark--light" aria-hidden="true" />
            <span className="sg-verdict__icon">{ICONS.scale}</span>
            <p>
              Un devis plus cher qui inclut la rédaction, les évaluations et l&apos;intégration peut coûter moins au final
              qu&apos;un devis bas qui les facture en supplément.
            </p>
          </div>
        </div>
      </section>

      {/* 4. E-learning ou blended */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Durée</p>
            <h2>E-learning ou blended : bien estimer le nombre d&apos;heures</h2>
          </div>
          <div className="sg-format">
            <article className="sg-format__card sg-format__card--light">
              <span className="sg-mark" aria-hidden="true" />
              <h3 className="sg-format__title">
                100&nbsp;% e-learning
                <span>Tout le parcours est en ligne</span>
              </h3>
              <p className="sg-format__text">
                En 100&nbsp;% e-learning, tout le parcours est produit en ligne : le budget suit la durée totale.
              </p>
              <div className="sg-bar" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="is-on" />
                ))}
              </div>
              <ul className="sg-bar__legend">
                <li className="is-on">En ligne</li>
              </ul>
            </article>
            <article className="sg-format__card sg-format__card--dark">
              <span className="sg-mark sg-mark--light" aria-hidden="true" />
              <h3 className="sg-format__title">
                Blended
                <span>Une partie en ligne, le reste en présentiel</span>
              </h3>
              <p className="sg-format__text">
                En blended, seules certaines séquences passent en ligne (apports, exercices individuels, évaluations), le
                reste se fait en présentiel ou en classe virtuelle.
              </p>
              <div className="sg-bar" aria-hidden="true">
                {[true, false, true, false, true, true, false, true, false, true].map((on, i) => (
                  <span key={i} className={on ? "is-on" : undefined} />
                ))}
              </div>
              <ul className="sg-bar__legend">
                <li className="is-on">En ligne</li>
                <li>Présentiel ou classe virtuelle</li>
              </ul>
            </article>
          </div>
          <div className="sg-equiv">
            <div className="sg-equiv__eq" aria-hidden="true">
              <span className="sg-equiv__pill">1&nbsp;h de présentiel</span>
              <span className="sg-equiv__arrow">{ICONS.arrowRight}</span>
              <span className="sg-equiv__pill sg-equiv__pill--mint">moins d&apos;1&nbsp;h en ligne</span>
            </div>
            <p className="sg-equiv__text">
              Dans les deux cas, une heure de présentiel ne fait pas une heure d&apos;e-learning : en ligne,
              l&apos;apprenant va droit au contenu. Elle donne généralement moins d&apos;une heure en ligne, et
              c&apos;est le séquençage qui fixe la durée réelle.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Les 4 façons de fixer le prix */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Modes de tarification</p>
            <h2>Les 4 façons de fixer le prix d&apos;une formation e-learning</h2>
            <p>Aucune n&apos;est meilleure que les autres : l&apos;important est de savoir ce qu&apos;elle couvre.</p>
          </div>
          <div className="sg-modes">
            {PRICING_MODES.map((item) => (
              <article key={item.mode} className="sg-mode">
                <h3 className="sg-mode__name">{item.mode}</h3>
                <p className="sg-mode__principle">{item.principle}</p>
                <div className="sg-mode__check">
                  <p className="sg-mode__label">
                    <span className="sg-mode__label-icon" aria-hidden="true">{ICONS.search}</span>
                    Ce qu&apos;il faut vérifier
                  </p>
                  <p className="sg-mode__text">{item.check}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Le calcul chez Satisa */}
      <section className="section-tinted">
        <div className="container">
          <div className="sg-calc">
            <div className="sg-calc__aside">
              <div className="section-head">
                <p className="eyebrow">Méthode de calcul</p>
                <h2>Comment est calculé le prix chez Satisa ?</h2>
                <p>Le simulateur applique la même méthode que nos devis : le prix dépend de ce que vous apportez.</p>
              </div>
            </div>

            <div className="sg-devis">
              <div className="sg-devis__line">
                <h3 className="sg-devis__title">Vos heures d&apos;e-learning</h3>
                <p className="sg-devis__text">
                  Le prix part du nombre d&apos;heures d&apos;e-learning à produire, avec un minimum de 20 heures. Le
                  tarif horaire baisse au-delà de 20 heures, puis au-delà de 40 heures.
                </p>
                <p className="sg-hours__caption">Tarif horaire</p>
                <div className="sg-hours" aria-hidden="true">
                  <div><i style={{ width: "100%" }} /><span>jusqu&apos;à 20 h</span></div>
                  <div><i style={{ width: "78%" }} /><span>20 à 40 h</span></div>
                  <div><i style={{ width: "58%" }} /><span>au-delà de 40 h</span></div>
                </div>
              </div>

              <div className="sg-devis__line">
                <h3 className="sg-devis__title">L&apos;état de vos contenus</h3>
                <ul className="sg-formulas">
                  <li>
                    <b>Essentielle</b>
                    <span>Contenus prêts à l&apos;emploi</span>
                  </li>
                  <li>
                    <b>Co-construite</b>
                    <span>Pas prêts, mais un référent métier peut transmettre le savoir</span>
                  </li>
                  <li>
                    <b>Complète</b>
                    <span>Ni contenus prêts, ni référent disponible : Satisa prend tout en charge</span>
                  </li>
                </ul>
              </div>

              <div className="sg-devis__line">
                <h3 className="sg-devis__title">Les options supplémentaires</h3>
                <p className="sg-devis__text">Selon vos réponses, deux options s&apos;ajoutent&nbsp;:</p>
                <ul className="sg-options">
                  <li>
                    <span>Séquençage et scénarisation</span>
                    <b>à partir de 900&nbsp;€&nbsp;HT</b>
                  </li>
                  <li>
                    <span>Configuration de la plateforme</span>
                    <b>à partir de 400&nbsp;€&nbsp;HT</b>
                  </li>
                </ul>
                <p className="sg-step__note">
                  <span className="sg-step__note-icon">{ICONS.check}</span>
                  Ils sont inclus dans la formule Complète.
                </p>
              </div>

              <div className="sg-devis__total">
                <p className="sg-devis__total-label">Prix indicatif</p>
                <p className="sg-devis__total-text">
                  Le résultat est indicatif ; le prix final est confirmé après un échange et le séquençage de votre
                  formation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

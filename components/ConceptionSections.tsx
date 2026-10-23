const CHAIN = [
  {
    label: "Compétence du référentiel",
    text: "Ce que la certification attend d’un titulaire, reprise telle qu’elle figure dans le référentiel.",
  },
  {
    label: "Objectif pédagogique",
    text: "Une formulation observable et évaluable de ce que l’apprenant saura faire.",
  },
  {
    label: "Activité d’apprentissage",
    text: "Des exercices pratiques et des mises en situation qui font pratiquer la compétence.",
  },
  {
    label: "Évaluation",
    text: "Formative, sommative ou certificative : elle mesure l’atteinte de l’objectif.",
  },
];

const DELIVERABLES = [
  {
    title: "Le programme de formation",
    text: "Objectifs, progression, durée et modalités, conformes aux exigences du référentiel Qualiopi.",
    format: "Document",
  },
  {
    title: "Le scénario pédagogique",
    text: "Le déroulé séquence par séquence, avec son accompagnement et sa volumétrie horaire.",
    format: "Document",
  },
  {
    title: "La matrice d’alignement",
    text: "Le tableau qui relie chaque compétence du référentiel à son objectif, son activité et son évaluation.",
    format: "Tableau",
  },
  {
    title: "Les supports et les évaluations",
    text: "Diapositives, fiches, guide formateur, activités d’apprentissage et évaluations.",
    format: "Fichiers modifiables",
  },
];

const QUALIOPI = [
  {
    need: "Analyse du besoin",
    done: "Analyse de la demande, du référentiel et du public cible.",
  },
  {
    need: "Objectifs opérationnels et évaluables",
    done: "Objectifs pédagogiques dérivés du référentiel, dans une progression structurée.",
  },
  {
    need: "Contenus et modalités adaptés",
    done: "Programme, scénario et séquencement construits pour votre public et vos objectifs.",
  },
  {
    need: "Adéquation à la certification visée",
    done: "Alignement avec le référentiel RNCP, RS ou interne, jusqu’aux modalités d’évaluation certificative.",
  },
];

export default function ConceptionSections() {
  return (
    <>
      <section className="section-tinted">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Notre méthode</p>
            <h2>De la compétence à l’évaluation : une chaîne d’alignement</h2>
            <p className="align-chain__lead">
              Notre conception relie les compétences du référentiel aux objectifs, aux activités et aux évaluations.
              C’est ce qui distingue un programme construit d’un simple lot de supports.
            </p>
          </div>
          <ol className="align-chain">
            {CHAIN.map((step, index) => (
              <li key={step.label} className="align-chain__step">
                <span className="align-chain__num" aria-hidden="true">{index + 1}</span>
                <h3 className="align-chain__label">{step.label}</h3>
                <p className="align-chain__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Livrables</p>
            <h2>Ce que nous construisons</h2>
          </div>
          <ul className="deliverable-files">
            {DELIVERABLES.map((item) => (
              <li key={item.title} className="deliverable-file">
                <span className="deliverable-file__format">{item.format}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tinted">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Qualiopi</p>
            <h2>Conformité Qualiopi : ce que la conception couvre</h2>
          </div>
          <div className="qualiopi-rows">
            {QUALIOPI.map((row) => (
              <div key={row.need} className="qualiopi-row">
                <p className="qualiopi-row__need">{row.need}</p>
                <p className="qualiopi-row__done">{row.done}</p>
              </div>
            ))}
          </div>
          <p className="qualiopi-note">
            Le programme et les livrables sont conçus pour répondre aux exigences du référentiel. L’obtention et le
            maintien de votre certification Qualiopi dépendent de l’audit de votre organisme et de ses propres
            pratiques.
          </p>
        </div>
      </section>
    </>
  );
}

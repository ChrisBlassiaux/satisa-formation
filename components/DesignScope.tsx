type Item = { title: string; text: string };

const DESIGN: Item[] = [
  {
    title: "Analyse de la demande, du référentiel et du public cible",
    text: "Nous partons de votre demande, du référentiel visé et de votre public pour cadrer le programme.",
  },
  {
    title: "Progression pédagogique",
    text: "Les objectifs sont dérivés du référentiel, pour une progression cohérente de bout en bout.",
  },
  {
    title: "Programme conforme Qualiopi",
    text: "Un programme de formation construit pour répondre aux exigences du référentiel Qualiopi.",
  },
  {
    title: "Scénario pédagogique, séquencement et volumétrie horaire",
    text: "Le déroulé de la formation, séquence par séquence, avec son scénario d’accompagnement et sa volumétrie horaire.",
  },
  {
    title: "Alignement avec la certification visée",
    text: "RNCP, RS ou référentiel interne : de l’analyse des compétences jusqu’aux modalités d’évaluation certificative.",
  },
];

const CONTENTS: Item[] = [
  { title: "Supports de présentation", text: "Diapositives, fiches et guide formateur." },
  { title: "Activités d’apprentissage", text: "Exercices pratiques et mises en situation." },
  {
    title: "Évaluations formatives, sommatives et certificatives",
    text: "Des évaluations à chaque étape du parcours, jusqu’à l’évaluation certificative.",
  },
];

function Block({ label, title, intro, items }: { label: string; title: string; intro: string; items: Item[] }) {
  return (
    <div className="design-scope__block">
      <span className="design-scope__tag">{label}</span>
      <h3>{title}</h3>
      <p className="design-scope__intro">{intro}</p>
      <ol className="design-scope__list">
        {items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function DesignScope() {
  return (
    <section className="section-tinted">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Ce qui est inclus</p>
          <h2>Ce que comprend notre service de conception</h2>
        </div>
        <div className="design-scope">
          <Block
            label="Formule 6"
            title="Conception de formation"
            intro="Poser les bases : le programme et son scénario, alignés sur votre référentiel."
            items={DESIGN}
          />
          <Block
            label="Formule 7"
            title="Création de contenus de formation"
            intro="Produire la matière : tout ce qui sera utilisé en formation et pour évaluer."
            items={CONTENTS}
          />
        </div>
      </div>
    </section>
  );
}

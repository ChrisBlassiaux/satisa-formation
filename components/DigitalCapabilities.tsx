const FORMULA_POINTS = [
  "Progression pédagogique structurée",
  "Scénario pédagogique complet",
  "Contenus adaptés à votre modalité",
  "Validation avant production",
];

const MODALITIES = [
  { title: "Présentiel / Téléprésentiel", text: "Pack de supports pour vos formateurs" },
  { title: "Blended Learning", text: "Présentiel + contenus digitaux" },
  { title: "E-learning", text: "100 % distanciel interactif" },
];

const DURATIONS = [
  { title: "Formation courte", text: "Jusqu’à 20 h" },
  { title: "Formation moyenne", text: "20 à 39 h" },
  { title: "Formation longue", text: "40 h et plus" },
];

const ELEARNING_OPTIONS = [
  {
    title: "Intégration & paramétrage sur LMS",
    text: "Création des cours, organisation des modules, paramétrage des parcours.",
  },
  { title: "Enregistrement audio", text: "Par une IA ou par un acteur / une actrice." },
  { title: "Vidéos tutoriels", text: "Animées par une IA ou par un acteur / une actrice." },
];

const GENERAL_OPTIONS = [
  { title: "Qualiopi", text: "Conformité aux 7 critères" },
  { title: "Exercices & Évaluations", text: "Quiz, études de cas, grilles" },
  { title: "Exclusivité", text: "Contenus 100 % uniques" },
];

export default function DigitalCapabilities() {
  return (
    <section className="section-tinted">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Sur mesure</p>
          <h2>Ce que nous pouvons construire pour vous</h2>
          <p className="digital-build__lead">
            Un parcours conçu de bout en bout, selon votre modalité, la durée de votre formation et les options dont
            vous avez besoin.
          </p>
        </div>

        <div className="digital-build">
          <div className="digital-build__formula">
            <p className="digital-build__label">Votre parcours</p>
            <h3>Conception complète de votre parcours de formation sur-mesure</h3>
            <ul className="digital-build__checks">
              {FORMULA_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="digital-build__group">
            <p className="digital-build__label">La modalité</p>
            <ul className="digital-build__tiles digital-build__tiles--3">
              {MODALITIES.map((item) => (
                <li key={item.title} className="digital-build__tile">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="digital-build__group">
            <p className="digital-build__label">La durée de votre formation</p>
            <ul className="digital-build__tiles digital-build__tiles--3">
              {DURATIONS.map((item) => (
                <li key={item.title} className="digital-build__tile digital-build__tile--duration">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="digital-build__group">
            <p className="digital-build__label">Les options</p>
            <div className="digital-build__options">
              <div className="digital-build__option-card">
                <h3>Options e-learning</h3>
                <ul>
                  {ELEARNING_OPTIONS.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="digital-build__option-card">
                <h3>Options générales</h3>
                <ul>
                  {GENERAL_OPTIONS.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="digital-build__skill">
            <p className="digital-build__label">Notre compétence en plus</p>
            <p>
              <strong>Développement web :</strong> activités d&apos;apprentissage personnalisées, développées en
              HTML/CSS/JS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

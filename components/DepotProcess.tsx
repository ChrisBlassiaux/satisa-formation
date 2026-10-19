import type { ReactNode } from "react";

type Step = { title: string; text: string };
type Stat = { value: string; label: string };

type Props = {
  title: string;
  intro: string;
  stats: Stat[];
  steps: Step[];
  audience: string[];
  limits: ReactNode;
};

// The six steps are shared by the RNCP and RS offers: two steps per phase.
const PHASE_LABELS = ["Cadrer", "Construire", "Déposer et décider"];
const STEPS_PER_PHASE = 2;

export default function DepotProcess({ title, intro, stats, steps, audience, limits }: Props) {
  const isPhased = steps.length === PHASE_LABELS.length * STEPS_PER_PHASE;

  return (
    <section className="section-tinted">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Notre méthode</p>
          <h2>{title}</h2>
          <p className="depot-process-lead">{intro}</p>
        </div>

        <ul className="depot-stats">
          {stats.map((stat) => (
            <li key={stat.value} className="depot-stats__item">
              <span className="depot-stats__value">{stat.value}</span>
              <span className="depot-stats__label">{stat.label}</span>
            </li>
          ))}
        </ul>

        <ol className="depot-steps">
          {steps.map((step, index) => {
            const phase = isPhased && index % STEPS_PER_PHASE === 0 ? PHASE_LABELS[index / STEPS_PER_PHASE] : null;
            return (
              <li key={step.title} className={`depot-steps__item${phase ? " depot-steps__item--phase" : ""}`}>
                {phase && <p className="depot-steps__phase">{phase}</p>}
                <span className="depot-steps__num" aria-hidden="true">{index + 1}</span>
                <h3 className="depot-steps__title">{step.title}</h3>
                <p className="depot-steps__text">{step.text}</p>
              </li>
            );
          })}
        </ol>

        <div className="depot-info">
          <div className="depot-info__card">
            <h3 className="depot-info__label">À qui s&apos;adresse cet accompagnement</h3>
            <ul className="depot-info__list">
              {audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="depot-info__card depot-info__card--limits">
            <h3 className="depot-info__label">Ce que nous ne promettons pas</h3>
            <p>{limits}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

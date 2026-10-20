import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Formula } from "@/lib/formations";

type Props = {
  formula: Formula;
  featured?: boolean;
  badge?: string;
};

export default function FormulaCard({ formula, featured = false, badge }: Props) {
  return (
    <article className={`formula-card${featured ? " formula-card--featured" : ""}`}>
      <div className="formula-card__top">
        {!featured && (
          <span className="offer-row__index" aria-hidden="true">
            {formula.index}
          </span>
        )}
        {featured && badge && <span className="formula-card__badge">{badge}</span>}
      </div>
      <header className="formula-card__head">
        <h3 className="formula-card__name">{formula.name}</h3>
        <span className="offer-row__price">{formula.price}</span>
      </header>
      {formula.noteBefore && <p className="pricing-card__note formula-card__note">{formula.noteBefore}</p>}
      <ul className="pricing-card__deliverables">
        {formula.deliverables.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {formula.noteAfter && <p className="pricing-card__note formula-card__note">{formula.noteAfter}</p>}
      <Link href={ROUTES.contact} className={`btn ${featured ? "btn--dark" : "btn--primary"} btn--block formula-card__cta`}>
        {formula.cta}
      </Link>
    </article>
  );
}

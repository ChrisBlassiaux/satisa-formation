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
      {featured && badge && <span className="formula-card__badge">{badge}</span>}
      <header className="formula-card__head">
        <span className="offer-row__name-row">
          {!featured && (
            <span className="offer-row__index" aria-hidden="true">
              {formula.index}
            </span>
          )}
          <h3 className="formula-card__name">{formula.name}</h3>
        </span>
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

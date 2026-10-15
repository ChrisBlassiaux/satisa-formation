const ANALYSIS = [
  "Le répertoire adapté",
  "Le besoin en compétences et la possibilité de le démontrer",
  "L'offre de certifications existante sur votre périmètre",
  "L'état de vos promotions et de vos données",
  "Votre dispositif de formation et d'évaluation",
  "La conformité",
  "Le modèle économique de la future certification",
];

const DELIVERABLES = [
  "Un verdict argumenté",
  "Le répertoire recommandé et une estimation de la durée de préparation",
  "Les éléments manquants, les risques identifiés et la formule d'accompagnement adaptée",
  "Un entretien de restitution",
];

// Contenu de la formule 1 (identique sur les pages Dépôt RNCP et Dépôt RS), à placer dans .offer-row__body.
export default function DiagnosticFaisabilite() {
  return (
    <>
      <p className="offer-row__lead">
        Savoir si votre projet peut être déposé, dans quel répertoire, en combien de temps et à quelles conditions.
      </p>

      <p className="offer-row__label">Ce que nous analysons</p>
      <ul className="pricing-card__deliverables">
        {ANALYSIS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="offer-row__label">Ce que vous recevez</p>
      <ul className="pricing-card__deliverables">
        {DELIVERABLES.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <ul className="offer-row__facts">
        <li>
          <strong>Durée :</strong> environ 1 mois à compter de la réception des documents demandés
        </li>
        <li>
          <strong>Tarif :</strong> 700 € HT
        </li>
      </ul>

      <span className="offer-row__highlight">Déductible de toute mission signée dans les 60 jours</span>

      <p className="pricing-card__note">
        La décision d&apos;enregistrement appartient à France Compétences. Le diagnostic évalue la faisabilité du projet,
        il ne garantit pas son enregistrement.
      </p>
    </>
  );
}

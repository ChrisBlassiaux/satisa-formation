import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGV",
  description: "Conditions générales de vente du site Satisa Formation.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.satisa-formation.fr/cgv",
  },
};

export default function CgvPage() {
  return (
    <section>
      <div className="container legal-content">
        <h1>Conditions Générales de Vente</h1>

        <h2>Article 1 - Objet</h2>
        <p>
          Les présentes conditions générales de vente régissent les prestations proposées par Satisa Formation aux
          organismes de formation et organismes certificateurs : ingénierie de certification RNCP/RS, ingénierie
          pédagogique et digitalisation de formations.
        </p>

        <h2>Article 2 - Devis et commande</h2>
        <p>
          Chaque prestation fait l&apos;objet d&apos;un devis détaillant la formule choisie, les livrables
          associés et le tarif applicable. La commande est confirmée à la signature du devis ou à la validation
          écrite du client.
        </p>

        <h2>Article 3 - Tarifs et modalités de paiement</h2>
        <p>
          Les tarifs sont exprimés en euros hors taxes. Selon la formule choisie, le paiement peut être réalisé en
          une fois ou de façon échelonnée, dans les conditions précisées sur la page de l&apos;offre concernée.
        </p>

        <h2>Article 4 - Délais</h2>
        <p>
          Les délais indiqués sont donnés à titre indicatif et dépendent de la disponibilité du client et de ses
          interlocuteurs (référent métier, cohorte pilote, validations intermédiaires).
        </p>

        <h2>Article 5 - Rétractation</h2>
        <p>[Clause à compléter selon le statut du client - professionnel ou consommateur - et le cadre légal applicable.]</p>

        <h2>Article 6 - Résiliation</h2>
        <p>[Clause à compléter, notamment pour les formules avec engagement minimum, comme la formule Maintenance pédagogique mensuelle.]</p>

        <h2>Article 7 - Litiges</h2>
        <p>[Clause de droit applicable et juridiction compétente à compléter.]</p>
      </div>
    </section>
  );
}

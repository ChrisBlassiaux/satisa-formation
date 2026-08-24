import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Satisa Formation.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.satisa-formation.fr/mentions-legales",
  },
};

export default function LegalMentionsPage() {
  return (
    <section>
      <div className="container legal-content">
        <h1>Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          Satisa Formation
          <br />
          [Statut juridique à compléter - ex. Entreprise Individuelle]
          <br />
          SIRET : [à compléter]
          <br />
          Adresse : [à compléter]
          <br />
          Email : chris@satisa.fr
          <br />
          Directeur de la publication : Chris Blassiaux
        </p>

        <h2>Hébergement</h2>
        <p>
          [Nom de l&apos;hébergeur à compléter]
          <br />
          [Adresse de l&apos;hébergeur à compléter]
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, visuels, logo) est la propriété de Satisa
          Formation, sauf mention contraire. Toute reproduction sans autorisation préalable est interdite.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Satisa Formation s&apos;efforce de fournir des informations aussi précises que possible sur ce site.
          Elle ne pourra être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour,
          qu&apos;elles soient de son fait ou du fait de tiers.
        </p>

        <h2>Contact</h2>
        <p>Pour toute question relative à ces mentions légales, contactez-nous à l&apos;adresse chris@satisa.fr.</p>
      </div>
    </section>
  );
}

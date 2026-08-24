import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site Satisa Formation.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.satisa-formation.fr/politique-confidentialite",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section>
      <div className="container legal-content">
        <h1>Politique de confidentialité</h1>

        <h2>Responsable du traitement</h2>
        <p>Satisa Formation, représentée par Chris Blassiaux, est responsable du traitement des données collectées sur ce site.</p>

        <h2>Données collectées</h2>
        <p>Les données collectées via le formulaire de contact (prénom, nom, email, type de projet, message) sont utilisées uniquement pour répondre à votre demande.</p>

        <h2>Finalité du traitement</h2>
        <ul>
          <li>Répondre aux demandes de contact et de rendez-vous</li>
          <li>Assurer le suivi commercial des échanges</li>
        </ul>

        <h2>Durée de conservation</h2>
        <p>[Durée de conservation à préciser, généralement limitée à la durée de la relation commerciale et aux obligations légales applicables.]</p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de
          portabilité de vos données. Pour exercer ces droits, contactez-nous à l&apos;adresse chris@satisa.fr.
        </p>

        <h2>Cookies</h2>
        <p>[À compléter selon les outils effectivement utilisés sur le site : mesure d&apos;audience, prise de rendez-vous Cal.com, etc.]</p>
      </div>
    </section>
  );
}

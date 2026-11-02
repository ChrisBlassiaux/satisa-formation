import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Satisa Formation : données collectées, finalités, cookies et outils tiers, durée de conservation et exercice de vos droits.",
  openGraph: {
    title: "Politique de confidentialité - Satisa Formation",
    description:
      "Politique de confidentialité de Satisa Formation : données collectées, finalités, cookies et outils tiers, durée de conservation et exercice de vos droits.",
    url: "https://www.satisa-formation.fr/politique-confidentialite",
    siteName: "Satisa Formation",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.satisa-formation.fr/politique-confidentialite",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section>
      <div className="container legal-content">
        <h1>Politique de confidentialité</h1>

        <p>
          Chez Satisa Formation (nom commercial de BLASSIAUX Christopher), nous attachons une grande importance à
          la protection de vos données personnelles. La présente politique de confidentialité a pour objectif de
          vous informer sur la manière dont vos données sont collectées, utilisées et protégées lorsque vous
          utilisez notre site satisa-formation.fr.
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          Raison sociale : BLASSIAUX Christopher, micro-entreprise
          <br />
          Nom commercial : Satisa Formation
          <br />
          Adresse : 41 rue Jacquemars Giélée, 59800 Lille, France
          <br />
          Email de contact : chris@satisa.fr
        </p>

        <h2>2. Hébergement du site</h2>
        <p>Le site est hébergé par Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis.</p>

        <h2>3. Données collectées et finalités</h2>
        <p>
          <strong>Formulaire de contact</strong>
          <br />
          Données collectées : prénom, nom, email, type de projet, message.
          <br />
          Finalité : traiter votre demande et assurer le suivi des échanges.
        </p>

        <h2>4. Cookies et outils tiers</h2>
        <p>
          Le site utilise Google Analytics (Google Ireland Limited) pour mesurer son audience : pages vues,
          provenance des visiteurs, durée de visite. Ces cookies ne sont déposés qu&apos;avec votre consentement,
          que vous pouvez refuser ou retirer à tout moment via le lien « Gérer les cookies » en bas de page.
          Votre choix est conservé 6 mois. Les données de mesure sont conservées 14 mois. Elles peuvent être
          transférées vers les États-Unis, dans le cadre du Data Privacy Framework. Le site n&apos;utilise aucun
          cookie publicitaire.
        </p>
        <p>
          La prise de rendez-vous en ligne est assurée par le service tiers Cal.com, intégré directement sur la
          page « Prendre un rendez-vous ». Lorsque vous utilisez cet outil, il peut déposer des cookies
          strictement techniques, nécessaires à son fonctionnement.
        </p>

        <h2>5. Destinataires des données</h2>
        <p>
          Vos données sont utilisées uniquement par Satisa Formation et peuvent être transmises à nos prestataires
          techniques dans le strict cadre de leur mission. Ces prestataires respectent la réglementation en
          matière de protection des données.
        </p>

        <h2>6. Durée de conservation</h2>
        <p>
          Données des formulaires de contact : conservées pendant la durée nécessaire au traitement de la demande
          et jusqu&apos;à 3 ans maximum dans un cadre de suivi commercial BtoB.
        </p>

        <h2>7. Vos droits</h2>
        <p>
          Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits suivants : droit
          d&apos;accès, droit de rectification, droit d&apos;opposition et de suppression, droit à la limitation du
          traitement. Vous pouvez exercer ces droits à tout moment en nous contactant à chris@satisa.fr.
        </p>

        <h2>8. Sécurité des données</h2>
        <p>
          Nous mettons en place toutes les mesures techniques et organisationnelles nécessaires pour assurer la
          sécurité et la confidentialité de vos données.
        </p>

        <h2>9. Mise à jour de la politique</h2>
        <p>
          La présente politique peut être mise à jour pour refléter les évolutions légales ou techniques.
          <br />
          Dernière mise à jour : août 2026.
        </p>
      </div>
    </section>
  );
}

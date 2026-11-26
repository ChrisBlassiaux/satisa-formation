import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

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
      <Breadcrumb />
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
          Christopher Blassiaux, entrepreneur individuel (micro-entrepreneur), nom commercial Satisa Formation,
          SIREN 901 028 613
          <br />
          Adresse : 41 rue Jacquemars Giélée, 59800 Lille, France
          <br />
          Email de contact : chris@satisa.fr
        </p>

        <h2>2. Hébergement du site</h2>
        <p>Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.</p>

        <h2>3. Données collectées et finalités</h2>
        <p>
          <strong>Formulaire de contact et boîte à idées</strong>
          <br />
          Données collectées : prénom, nom, email, type de projet (dépôt RNCP, dépôt RS, conception pédagogique,
          digitalisation ou boîte à idées), formule souhaitée, message.
          <br />
          Finalité : traiter votre demande ou lire votre idée, et assurer le suivi des échanges.
          <br />
          Base légale : mesures précontractuelles et intérêt légitime à répondre aux demandes.
        </p>
        <p>
          <strong>Test RS ou RNCP et simulateur de prix</strong>
          <br />
          Données collectées : prénom, nom, structure, email, téléphone (facultatif), vos réponses et le résultat
          obtenu.
          <br />
          Finalité : vous recontacter au sujet de votre demande.
          <br />
          Base légale : votre consentement, donné en cochant la case prévue.
          <br />
          Ces outils s&apos;utilisent sans inscription. Tant que vous n&apos;envoyez pas de demande, aucune donnée
          personnelle n&apos;est transmise. La demande arrive par email chez Satisa Formation. Aucun email
          automatique ne vous est envoyé.
        </p>
        <p>
          <strong>Statistiques anonymes du test RS ou RNCP</strong>
          <br />
          Pour améliorer l&apos;outil, nous comptons les tests démarrés, les questions atteintes, les résultats
          obtenus et le nombre de demandes de contact. Ces statistiques sont anonymes : aucun cookie, aucune adresse
          email, aucune réponse détaillée, aucune adresse IP enregistrée. L&apos;identifiant du parcours est
          aléatoire, créé pour un seul test et sans lien avec une personne.
        </p>
        <p>
          <strong>Candidatures (page « Nous rejoindre »)</strong>
          <br />
          Données collectées : prénom, nom, email, téléphone, date de début et durée souhaitées, lien LinkedIn /
          portfolio, portfolio en fichier PDF (facultatif), CV et message.
          <br />
          Finalité : étudier votre candidature et vous répondre. Ces données sont utilisées uniquement pour le poste
          auquel vous avez postulé, et pour aucune autre finalité. Elles sont transmises par email et ne sont pas
          enregistrées sur le site.
          <br />
          Base légale : mesures précontractuelles (votre candidature).
        </p>
        <p>
          <strong>Protection contre le spam</strong>
          <br />
          Les formulaires de candidature et du test RS ou RNCP sont protégés par un champ invisible, un délai minimal
          et une limitation du nombre d&apos;envois par adresse IP. L&apos;adresse IP n&apos;est utilisée que
          temporairement en mémoire pour cela et n&apos;est pas conservée.
        </p>

        <h2>4. Cookies et outils tiers</h2>
        <p>
          Le site utilise Google Analytics (Google Ireland Limited) pour mesurer son audience : pages vues,
          provenance des visiteurs, durée de visite. Ces cookies ne sont déposés qu&apos;avec votre consentement,
          que vous pouvez refuser ou retirer à tout moment via le lien « Gérer les cookies » en bas de page.
          Votre choix est conservé 6 mois. Les cookies ont une durée maximale de 13 mois et les données de mesure
          sont conservées 14 mois. Elles peuvent être transférées vers les États-Unis, dans le cadre du Data Privacy
          Framework. Le site n&apos;utilise aucun cookie publicitaire.
        </p>
        <p>
          La prise de rendez-vous est assurée par Cal.com. L&apos;outil ne se charge que lorsque vous cliquez sur le
          bouton de réservation. Il peut alors déposer des cookies techniques et recevoir les informations saisies
          pour réserver (nom, email, créneau), traitées selon sa propre politique de confidentialité.
        </p>
        <p>
          Les boutons « Discuter sur WhatsApp » et « Suivre Satisa sur LinkedIn » sont de simples liens : aucune
          donnée n&apos;est transmise à ces services tant que vous ne cliquez pas. Ensuite, leurs propres politiques
          s&apos;appliquent.
        </p>

        <h2>5. Destinataires et prestataires</h2>
        <p>
          Vos données sont utilisées uniquement par Satisa Formation. Elles peuvent être traitées par nos
          prestataires techniques, strictement pour leur mission : Vercel (hébergement du site), Google (messagerie
          qui reçoit les formulaires et candidatures, et mesure d&apos;audience avec votre accord) et Cal.com
          (prise de rendez-vous). Certains sont situés aux États-Unis : ces transferts sont encadrés par le Data
          Privacy Framework ou des clauses contractuelles types. Nous ne vendons ni ne louons vos données.
        </p>

        <h2>6. Durée de conservation</h2>
        <p>
          Demandes de contact, boîte à idées, test RS ou RNCP et simulateur de prix : le temps de traiter la demande,
          puis 3 ans maximum après le dernier contact dans un cadre de suivi commercial BtoB.
        </p>
        <p>
          Données des candidatures, CV compris : conservées jusqu&apos;à 2 ans maximum après le dernier contact, sauf
          demande de suppression de votre part.
        </p>
        <p>
          Google Analytics : cookies 13 mois, données de mesure 14 mois. Votre choix sur les cookies : 6 mois.
          Statistiques anonymes : aucune donnée personnelle n&apos;est conservée.
        </p>

        <h2>7. Vos droits</h2>
        <p>
          Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits suivants : droit
          d&apos;accès, droit de rectification, droit d&apos;opposition et de suppression, droit à la limitation du
          traitement, droit à la portabilité de vos données. Lorsque le traitement repose sur votre consentement,
          vous pouvez le retirer à tout moment. Vous pouvez exercer ces droits en nous contactant à chris@satisa.fr.
          Vous avez aussi le droit d&apos;introduire une réclamation auprès de la CNIL (cnil.fr).
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
          Dernière mise à jour : novembre 2026.
        </p>
      </div>
    </section>
  );
}

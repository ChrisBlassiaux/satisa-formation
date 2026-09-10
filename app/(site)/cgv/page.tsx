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
        <h1>Conditions générales de vente</h1>

        <p>Dernière mise à jour : septembre 2026</p>

        <p>
          Les présentes Conditions Générales de Vente (ci-après les « CGV ») régissent l&apos;ensemble des
          prestations de services réalisées par Christopher Blassiaux, micro-entrepreneur immatriculé sous le
          numéro 90102861300023, exerçant sous le nom commercial Satisa Formation.
        </p>
        <p>
          Email de contact : chris@satisa.fr
          <br />
          Site internet : www.satisa-formation.fr
        </p>
        <p>Toute commande ou signature de devis implique l&apos;acceptation entière et sans réserve des présentes CGV.</p>

        <h2>1. Objet</h2>
        <p>
          Les présentes CGV définissent les droits et obligations des parties dans le cadre de prestations de
          services en ingénierie de certification RNCP/RS et en ingénierie pédagogique et digitale, réalisées au
          bénéfice exclusif de professionnels (organismes de formation, organismes certificateurs, entreprises).
        </p>

        <h2>2. Devis et commande</h2>
        <p>
          Toute prestation fait l&apos;objet d&apos;un devis préalable établi par Satisa Formation, précisant la
          nature de la prestation, le prix, les modalités de paiement et la durée estimée. Le devis est valable 30
          jours à compter de sa date d&apos;émission.
        </p>
        <p>
          La commande est réputée acceptée à réception du devis signé, accompagné le cas échéant du versement de
          l&apos;acompte prévu. À défaut de réception du devis signé et de l&apos;acompte dans ce délai, le devis
          est considéré comme caduc.
        </p>

        <h2>3. Prix et TVA</h2>
        <p>
          Les prix sont exprimés en euros hors taxes (HT). Satisa Formation étant exercée sous le régime de la
          micro-entreprise, la TVA n&apos;est pas applicable en vertu de l&apos;article 293 B du Code général des
          impôts, sauf dépassement des seuils de franchise. Les prix peuvent être révisés à tout moment, sans effet
          rétroactif sur les devis déjà acceptés.
        </p>

        <h2>4. Modalités de paiement</h2>
        <p>Les modalités de paiement sont définies dans le devis. À défaut de mention contraire, les conditions suivantes s&apos;appliquent :</p>
        <ul>
          <li>Pour les prestations forfaitaires : 50 % à la signature du devis, 50 % à la livraison finale.</li>
          <li>Pour les prestations en TJM : facturation mensuelle sur la base des jours effectivement réalisés.</li>
          <li>Pour les prestations facturées sous forme d&apos;abonnement mensuel : facturation mensuelle récurrente selon les conditions précisées à l&apos;article 9.</li>
        </ul>
        <p>
          Lorsque le devis prévoit des conditions de paiement spécifiques (échéancier, acompte différent),
          celles-ci prévalent sur les conditions générales ci-dessus.
        </p>
        <p>
          Le règlement s&apos;effectue par virement bancaire. Tout retard de paiement entraîne de plein droit : la
          suspension des prestations en cours, l&apos;exigibilité immédiate de toutes les sommes dues,
          l&apos;application de pénalités de retard au taux légal en vigueur, ainsi qu&apos;une indemnité
          forfaitaire de recouvrement de 40 € conformément aux articles L441-6 et D441-5 du Code de commerce.
        </p>

        <h2>5. Diagnostic de faisabilité</h2>
        <p>
          Le diagnostic de faisabilité (Formule 1) est une prestation à part entière donnant lieu à la remise
          d&apos;un rapport avec recommandations et plan d&apos;action. Cette prestation est due dans son
          intégralité dès lors qu&apos;elle a été réalisée, quelle que soit la conclusion du diagnostic.
        </p>
        <p>
          Le montant du diagnostic (700 € HT) est déduit du tarif de la mission signée (Formule 2 ou Formule 3) si
          le client engage une mission de certification dans les 6 mois suivant la date de remise du rapport.
          Passé ce délai, aucune déduction ne sera appliquée.
        </p>

        <h2>6. Réalisation des prestations et délais</h2>
        <p>
          Satisa Formation s&apos;engage à réaliser les prestations définies dans le devis avec soin et
          professionnalisme. La durée estimée de chaque prestation est précisée dans le devis.
        </p>
        <p>
          Pour les Formules 2 (Certification guidée) et 3 (Certification pilotée), la durée maximale de la
          prestation est fixée à 12 mois à compter de la date de signature du devis. Passé ce délai, si la
          prestation n&apos;est pas achevée du fait du client (retards de validation, informations non fournies,
          indisponibilité), Satisa Formation se réserve le droit de proposer un avenant ou de facturer le solde
          restant dû.
        </p>
        <p>
          Le client s&apos;engage à fournir en temps utile les informations, documents et validations nécessaires
          à la bonne réalisation de la prestation. Tout retard imputable au client pourra entraîner un report des
          délais de livraison, sans engagement de responsabilité de Satisa Formation.
        </p>

        <h2>7. Corrections et révisions</h2>
        <p>
          Pour les prestations de certification (Formules 2, 3 et 4) : les corrections et allers-retours sont
          inclus de manière illimitée jusqu&apos;au dépôt du dossier auprès de France Compétences.
        </p>
        <p>
          Pour les prestations pédagogiques et digitales (Formules 6, 7 et 8) : deux rounds de corrections sont
          inclus après la première livraison du livrable. Est considéré comme correction tout ajustement de
          contenu, reformulation ou modification mineure de structure. Toute modification substantielle (ajout de
          modules, changement de cible, refonte complète d&apos;un livrable déjà validé) fera l&apos;objet
          d&apos;un avenant tarifaire.
        </p>
        <p>
          À défaut de remarques formulées par le client dans les 15 jours suivant la livraison d&apos;un livrable,
          la prestation est réputée acceptée.
        </p>

        <h2>8. Modification et annulation</h2>
        <p>
          Toute modification du périmètre de la prestation en cours d&apos;exécution fera l&apos;objet d&apos;un
          avenant au devis initial.
        </p>
        <p>
          En cas d&apos;annulation par le client après signature du devis, l&apos;acompte versé reste acquis à
          Satisa Formation à titre d&apos;indemnité. Les sommes correspondant aux travaux déjà réalisés à la date
          de l&apos;annulation restent également dues.
        </p>

        <h2>9. Abonnements et prestations récurrentes</h2>
        <p>
          Formule 5 — Responsable de certification externalisé : facturation mensuelle sans durée minimale
          d&apos;engagement. Chaque partie peut mettre fin à la prestation à tout moment, sans préavis, la
          résiliation prenant effet à la fin du mois en cours.
        </p>
        <p>
          Formule 9 — Maintenance pédagogique mensuelle : engagement minimum de 3 mois. À l&apos;issue de cet
          engagement, chaque partie peut décider de ne pas renouveler la prestation sans préavis, la résiliation
          prenant effet à la fin du trimestre en cours. Les mois déjà entamés au moment de la résiliation restent
          dus.
        </p>

        <h2>10. Propriété intellectuelle</h2>
        <p>
          Les livrables produits dans le cadre des prestations deviennent la propriété pleine et entière du client
          à réception du paiement intégral. Ces livrables sont conçus comme des documents neutres que le client
          peut s&apos;approprier et adapter librement.
        </p>
        <p>
          Satisa Formation conserve le droit de réutiliser ses trames, méthodes et documents types pour
          d&apos;autres clients. Les données spécifiques au client (nom, informations confidentielles, contenus
          métier) ne seront en aucun cas réutilisées ou transmises à des tiers.
        </p>
        <p>
          Satisa Formation conserve le droit de mentionner la collaboration à des fins de référencement
          commercial, sauf opposition expresse du client notifiée par écrit.
        </p>

        <h2>11. Confidentialité</h2>
        <p>
          Satisa Formation s&apos;engage à traiter avec confidentialité toutes les informations et documents
          transmis par le client dans le cadre de la prestation. Cette obligation de confidentialité s&apos;applique
          pendant toute la durée de la prestation et au-delà, sans limitation de durée.
        </p>
        <p>Un accord de confidentialité spécifique peut être signé à la demande du client.</p>

        <h2>12. Responsabilité</h2>
        <p>
          Satisa Formation est tenue à une obligation de moyens. Sa responsabilité ne saurait être engagée en cas
          de retard ou d&apos;impossibilité d&apos;exécution liés à des causes extérieures à son contrôle,
          notamment les décisions de France Compétences dans le cadre des dossiers de certification, ou tout
          retard imputable au client.
        </p>
        <p>
          La responsabilité de Satisa Formation ne pourra pas être engagée pour une erreur engendrée par un manque
          d&apos;information ou des informations erronées transmises par le client, ni pour un retard occasionné
          par le client.
        </p>
        <p>
          Il appartient au client de vérifier le contenu des livrables remis et d&apos;émettre toutes réserves
          dans le délai prévu à l&apos;article 7.
        </p>

        <h2>13. Force majeure</h2>
        <p>
          Si un événement imprévisible et indépendant de la volonté de Satisa Formation (catastrophe naturelle,
          pandémie, défaillance technique majeure, etc.) empêche la réalisation de la prestation, la
          responsabilité de Satisa Formation ne pourra pas être engagée.
        </p>
        <p>
          Dans ce cas, Satisa Formation informera le client dans les 5 jours ouvrés suivant la survenance de
          l&apos;événement. Si la situation persiste au-delà de 15 jours ouvrés, chaque partie pourra mettre fin à
          la prestation sans indemnité. Les sommes correspondant aux travaux déjà réalisés restent dues.
        </p>

        <h2>14. Protection des données personnelles</h2>
        <p>
          Les données personnelles collectées dans le cadre des prestations sont utilisées exclusivement pour la
          réalisation et le suivi des missions. Elles ne sont ni cédées, ni louées, ni échangées avec des tiers.
          Conformément au RGPD, le client dispose d&apos;un droit d&apos;accès, de rectification et de suppression
          de ses données en contactant chris@satisa.fr.
        </p>

        <h2>15. Droit applicable et litiges</h2>
        <p>
          Les présentes CGV sont régies par le droit français. Les prestations sont destinées exclusivement à des
          professionnels. En cas de litige, une tentative de règlement amiable sera engagée préalablement à toute
          action judiciaire. À défaut de résolution amiable, le Tribunal de commerce de Lille sera seul compétent.
        </p>

        <h2>Acceptation des CGV</h2>
        <p>
          Le client reconnaît avoir pris connaissance des présentes CGV et les accepter sans réserve lors de la
          signature du devis.
        </p>
        <p>Contact : chris@satisa.fr</p>
      </div>
    </section>
  );
}

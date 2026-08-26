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

        <p>Dernière mise à jour : août 2026</p>

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
          bénéfice exclusif de professionnels (organismes de formation, organismes certificateurs).
        </p>

        <h2>2. Devis et commande</h2>
        <p>
          Toute prestation fait l&apos;objet d&apos;un devis préalable établi par Satisa Formation. Le devis est
          valable 30 jours à compter de sa date d&apos;émission. La commande est réputée acceptée à réception du
          devis signé accompagné, le cas échéant, du versement de l&apos;acompte prévu.
        </p>

        <h2>3. Prix et TVA</h2>
        <p>
          Les prix sont exprimés en euros hors taxes (HT). Christopher Blassiaux étant micro-entrepreneur, la TVA
          n&apos;est pas applicable en vertu de l&apos;article 293 B du Code général des impôts, sauf dépassement
          des seuils de franchise. Les prix peuvent être révisés à tout moment, sans effet rétroactif sur les
          devis déjà acceptés.
        </p>

        <h2>4. Modalités de paiement</h2>
        <p>Les modalités de paiement sont définies dans le devis. À défaut de mention contraire, les conditions suivantes s&apos;appliquent :</p>
        <ul>
          <li>Pour les prestations forfaitaires : 50 % à la signature du devis, 50 % à la livraison finale.</li>
          <li>Pour les prestations en TJM : facturation mensuelle sur la base des jours effectivement réalisés.</li>
          <li>Pour les prestations facturées sous forme d&apos;abonnement mensuel : facturation mensuelle récurrente, dans les conditions précisées à l&apos;article 6.</li>
        </ul>
        <p>
          Lorsque le devis prévoit des conditions de paiement spécifiques (échéancier, acompte différent),
          celles-ci prévalent sur les conditions générales ci-dessus.
        </p>
        <p>
          Le règlement s&apos;effectue par virement bancaire. Tout retard de paiement entraîne l&apos;application
          de pénalités de retard au taux légal en vigueur, ainsi qu&apos;une indemnité forfaitaire de recouvrement
          de 40 €.
        </p>

        <h2>5. Réalisation des prestations</h2>
        <p>
          Satisa Formation s&apos;engage à réaliser les prestations définies dans le devis avec soin et
          professionnalisme, dans les délais convenus. Le client s&apos;engage à fournir en temps utile les
          informations, documents et validations nécessaires à la bonne réalisation de la prestation. Tout retard
          imputable au client pourra entraîner un report des délais de livraison.
        </p>

        <h2>6. Modification, annulation et abonnements</h2>
        <p>
          Toute modification du périmètre de la prestation en cours d&apos;exécution fera l&apos;objet d&apos;un
          avenant au devis initial. En cas d&apos;annulation par le client après signature du devis, l&apos;acompte
          versé reste acquis à Satisa Formation à titre d&apos;indemnité.
        </p>
        <p>
          Pour les prestations facturées sous forme d&apos;abonnement mensuel (maintenance pédagogique,
          responsable de certification externalisé), la durée d&apos;engagement minimale, lorsqu&apos;elle existe,
          est précisée sur la page de l&apos;offre concernée. Passé cet engagement minimum, ou en son absence,
          chaque partie peut résilier l&apos;abonnement à tout moment, moyennant un préavis d&apos;un mois notifié
          par écrit (un email suffit). Les mois déjà entamés au moment de la résiliation restent dus.
        </p>

        <h2>7. Propriété intellectuelle</h2>
        <p>
          Les livrables produits dans le cadre des prestations deviennent la propriété du client à réception du
          paiement intégral. Satisa Formation conserve le droit de mentionner la collaboration à des fins de
          référencement commercial, sauf opposition expresse du client.
        </p>

        <h2>8. Confidentialité</h2>
        <p>
          Satisa Formation s&apos;engage à traiter avec confidentialité toutes les informations et documents
          transmis par le client dans le cadre de la prestation. Cette obligation de confidentialité s&apos;applique
          pendant toute la durée de la prestation et au-delà.
        </p>

        <h2>9. Responsabilité</h2>
        <p>
          Satisa Formation est tenue à une obligation de moyens. Sa responsabilité ne saurait être engagée en cas
          de retard ou d&apos;impossibilité d&apos;exécution liés à des causes extérieures à son contrôle,
          notamment les décisions de France Compétences dans le cadre des dossiers de certification.
        </p>

        <h2>10. Droit applicable et litiges</h2>
        <p>
          Les présentes CGV sont régies par le droit français. Les prestations sont destinées exclusivement à des
          professionnels. En cas de litige, une tentative de règlement amiable sera engagée. À défaut, les
          tribunaux français seront seuls compétents.
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

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

        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
          l&apos;économie numérique, il est précisé aux utilisateurs du site Satisa Formation l&apos;identité des
          différents intervenants dans le cadre de sa réalisation et de son suivi.
        </p>

        <h2>Édition du site</h2>
        <p>
          Le présent site, accessible à l&apos;URL satisa-formation.fr (le « Site »), est édité par : Christopher
          Blassiaux, auto-entrepreneur, de nationalité française, né le 30/12/1998.
          <br />
          Domicilié au 41 rue Jacquemars Giélée, 59800 Lille.
        </p>

        <h2>Hébergement</h2>
        <p>
          Le Site est hébergé par la société Vercel Inc., située au 340 Pine Street, Suite 900, San Francisco, CA
          94104, États-Unis.
        </p>

        <h2>Directeur de publication</h2>
        <p>Le Directeur de la publication du Site est Christopher Blassiaux.</p>

        <h2>Nous contacter</h2>
        <p>
          Par téléphone : +33 7 83 45 67 53
          <br />
          Par email : chris@satisa.fr
          <br />
          Par courrier : 41 rue Jacquemars Giélée, 59800 Lille
        </p>
      </div>
    </section>
  );
}

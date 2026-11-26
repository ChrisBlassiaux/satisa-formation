import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de Satisa Formation : éditeur du site, hébergeur, directeur de publication et moyens de contact.",
  openGraph: {
    title: "Mentions légales - Satisa Formation",
    description:
      "Mentions légales de Satisa Formation : éditeur du site, hébergeur, directeur de publication et moyens de contact.",
    url: "https://www.satisa-formation.fr/mentions-legales",
    siteName: "Satisa Formation",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.satisa-formation.fr/mentions-legales",
  },
};

export default function LegalMentionsPage() {
  return (
    <section>
      <Breadcrumb />
      <div className="container legal-content">
        <h1>Mentions légales</h1>

        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
          l&apos;économie numérique, il est précisé aux utilisateurs du site Satisa Formation l&apos;identité des
          différents intervenants dans le cadre de sa réalisation et de son suivi.
        </p>

        <h2>Édition du site</h2>
        <p>
          Le présent site, accessible à l&apos;URL satisa-formation.fr (le « Site »), est édité par Christopher
          Blassiaux, entrepreneur individuel (micro-entrepreneur), exerçant sous le nom commercial Satisa Formation.
          <br />
          SIREN : 901 028 613 – SIRET : 901 028 613 00056.
          <br />
          TVA non applicable, article 293 B du Code général des impôts.
          <br />
          Domicilié au 41 rue Jacquemars Giélée, 59800 Lille.
        </p>

        <h2>Hébergement</h2>
        <p>
          Le Site est hébergé par la société Vercel Inc., située au 440 N Barranca Avenue #4133, Covina, CA 91723,
          États-Unis. Téléphone : +1 559 288 7060.
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

        <h2>Outils en ligne (simulateur de prix, test RS ou RNCP)</h2>
        <p>
          Les outils proposés gratuitement sur le Site fournissent des résultats à titre indicatif. Ils ne constituent
          ni un devis, ni un conseil juridique, ni une garantie de résultat, notamment quant à l&apos;enregistrement
          d&apos;une certification auprès de France Compétences. Seule une étude personnalisée, suivie d&apos;un devis
          accepté, engage Satisa Formation.
        </p>
        <p>L&apos;éditeur ne peut être tenu responsable de l&apos;usage fait de ces résultats.</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus du Site (textes, images, logo, outils) est la propriété de Christopher Blassiaux
          ou utilisé avec autorisation. Toute reproduction sans accord écrit préalable est interdite.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Les informations sur le traitement de vos données personnelles figurent dans notre{" "}
          <Link href={ROUTES.privacy}>politique de confidentialité</Link>.
        </p>
      </div>
    </section>
  );
}

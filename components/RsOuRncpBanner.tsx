import { ROUTES } from "@/lib/routes";
import PromoBanner from "@/components/PromoBanner";
import { Cadeau } from "@/components/AdventDecor";

// Pendant l'Avent, le calendrier prend la place du test sur les 3 pages certification. Passer à false pour rétablir
// le test (le lien vers le test en haut de la page principale disparaît alors).
export const ADVENT_PROMO_ACTIVE = false;

// Bandeau des pages « Certification RNCP/RS » : renvoi vers le test gratuit « RS ou RNCP ? ».
export default function RsOuRncpBanner() {
  if (ADVENT_PROMO_ACTIVE) {
    return (
      <PromoBanner
        variant="avent"
        label="Calendrier de l'Avent"
        icon={<Cadeau className="dg-banner__gift" />}
        shortTitle="Calendrier de l'Avent"
        shortDetail="Enregistrement RNCP/RS"
        shortCta="Ouvrir"
        longText={
          <>
            <span className="dg-banner__kicker">Calendrier de l&apos;Avent :</span> préparez votre enregistrement
            RNCP/RS<span className="dg-banner__extra">, une surprise chaque jour du 1er au 24 décembre</span>
          </>
        }
        cta="Ouvrir le calendrier"
        href={ROUTES.advent}
      />
    );
  }

  return (
    <PromoBanner
      variant="ciel"
      label="Test gratuit RS ou RNCP"
      shortTitle="RS ou RNCP ?"
      shortDetail="Le test en 2 minutes"
      shortCta="Tester"
      longText="RNCP ou RS : quelle certification pour votre organisme ? Faites le test en 2 minutes."
      cta="Faire le test"
      href={ROUTES.certificationRsOuRncp}
    />
  );
}

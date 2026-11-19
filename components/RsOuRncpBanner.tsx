import { ROUTES } from "@/lib/routes";
import PromoBanner from "@/components/PromoBanner";

// Bandeau de la page « Déposer une certification RNCP/RS » : renvoi vers le test gratuit « RS ou RNCP ? ».
export default function RsOuRncpBanner() {
  return (
    <PromoBanner
      variant="ciel"
      label="Test gratuit RS ou RNCP"
      shortText="Test gratuit : RS ou RNCP ?"
      longText="RNCP ou RS : quelle certification pour votre organisme ? Faites le test en 2 minutes."
      cta="Faire le test"
      href={ROUTES.certificationRsOuRncp}
    />
  );
}

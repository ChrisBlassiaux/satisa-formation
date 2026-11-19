import { ROUTES } from "@/lib/routes";
import PromoBanner from "@/components/PromoBanner";

// Bandeau de la page Digitalisation : renvoi vers le simulateur de prix.
export default function SimulatorBanner() {
  return (
    <PromoBanner
      label="Simulateur de prix"
      shortText="Estimez votre prix en 1 minute"
      longText="Combien coûte votre projet de digitalisation ? Estimez-le en 1 minute."
      cta="Calculer mon tarif"
      href={ROUTES.formationsSimulateur}
    />
  );
}

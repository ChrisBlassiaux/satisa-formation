import { ROUTES } from "@/lib/routes";
import PromoBanner from "@/components/PromoBanner";

// Bandeau de la page Digitalisation : renvoi vers le simulateur de prix.
export default function SimulatorBanner() {
  return (
    <PromoBanner
      label="Simulateur de prix"
      shortTitle="Votre prix e-learning"
      shortDetail="Estimé en 1 minute"
      shortCta="Calculer"
      longText="Combien coûte votre projet de digitalisation ? Estimez-le en 1 minute."
      cta="Calculer mon tarif"
      href={ROUTES.formationsSimulateur}
    />
  );
}

import type { EtatCalendrier } from "@/lib/avent";
import { casesOuvertes, jourOuvrable } from "@/lib/aventCases";

// La date est lue sur le serveur : changer l'horloge de l'appareil n'ouvre rien. Cette route est rangée sous la page
// pour disparaître avec elle quand le dossier est rendu non routable.

// Date simulée : en local et sur l'aperçu Vercel (accès réservé à l'équipe) uniquement, jamais en production.
const SIMULATION_POSSIBLE = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

export function GET(request: Request) {
  const demande = new URL(request.url).searchParams.get("jour");
  const simule = SIMULATION_POSSIBLE && demande !== null ? Number(demande) : NaN;
  const jour = Number.isInteger(simule) && simule >= 0 && simule <= 25 ? simule : jourOuvrable(new Date());
  const etat: EtatCalendrier = { jour, cases: casesOuvertes(jour), simulationPossible: SIMULATION_POSSIBLE };
  return Response.json(etat, { headers: { "Cache-Control": "no-store" } });
}

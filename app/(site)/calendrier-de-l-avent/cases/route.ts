import type { EtatCalendrier } from "@/lib/avent";
import { casesOuvertes, jourDeLaRequete } from "@/lib/aventCases";

// La date est lue sur le serveur : changer l'horloge de l'appareil n'ouvre rien. Cette route est rangée sous la page
// pour disparaître avec elle quand le dossier est rendu non routable.

export function GET(request: Request) {
  const { jour, simule, simulationPossible } = jourDeLaRequete(request);
  const etat: EtatCalendrier = { jour, cases: casesOuvertes(jour, simule), simulationPossible };
  return Response.json(etat, { headers: { "Cache-Control": "no-store" } });
}

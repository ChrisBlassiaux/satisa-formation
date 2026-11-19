// Outil « RS ou RNCP ? » : journal local pour le développement (fichiers .jsonl dans `.data/`, ignoré par git).
// Utilisé uniquement par les adaptateurs « simulés » : en production, rien n'est écrit sur le disque.

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const DOSSIER_DONNEES_LOCAL = ".data";

export async function ecrireLigneJson(fichier: string, objet: unknown, dossier: string = DOSSIER_DONNEES_LOCAL): Promise<void> {
  // Écriture réservée au développement : on indique au compilateur de ne pas « tracer » tout le projet pour ce chemin.
  const dossierComplet = path.resolve(/* turbopackIgnore: true */ process.cwd(), dossier);
  await mkdir(dossierComplet, { recursive: true });
  await appendFile(path.join(/* turbopackIgnore: true */ dossierComplet, fichier), `${JSON.stringify(objet)}\n`, "utf8");
}

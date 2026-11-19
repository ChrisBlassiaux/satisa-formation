import { NextResponse } from "next/server";
import { CONFIG } from "@/lib/rsRncp";
import { creerLimiteur } from "@/lib/rsRncp/antispam";
import { choisirAdaptateurEvenements, validerEvenement } from "@/lib/rsRncp/evenements";
import { ecrireLigneJson } from "@/lib/rsRncp/journal";

// Statistiques anonymes de l'outil « RS ou RNCP ? » : aucun cookie, aucune donnée personnelle (voir lib/rsRncp/evenements.ts).
const limiteur = creerLimiteur({ max: 150, fenetreMs: 10 * 60 * 1000 });

function cleClient(request: Request): string {
  const transmis = request.headers.get("x-forwarded-for");
  return transmis?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "inconnu";
}

export async function POST(request: Request) {
  // `sendBeacon` envoie du texte : on lit le corps en texte puis on l'analyse.
  const brut = await request.text().catch(() => "");
  let donnees: unknown = null;
  try {
    donnees = JSON.parse(brut);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const validation = validerEvenement(donnees, CONFIG);
  if (!validation.ok) return new NextResponse(null, { status: 400 });
  if (!limiteur.autoriser(cleClient(request))) return new NextResponse(null, { status: 429 });

  const adaptateur = choisirAdaptateurEvenements(process.env, ecrireLigneJson);
  await adaptateur.enregistrer({ ...validation.evenement, date: new Date().toISOString() });
  return new NextResponse(null, { status: 204 });
}

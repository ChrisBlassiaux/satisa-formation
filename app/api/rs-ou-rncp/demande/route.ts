import { NextResponse } from "next/server";
import { CONFIG, encoder, evaluer } from "@/lib/rsRncp";
import { creerLimiteur, evaluerAntiSpam } from "@/lib/rsRncp/antispam";
import { choisirAdaptateur, construireDemande, envoyerDemande } from "@/lib/rsRncp/demande";
import { ecrireLigneJson } from "@/lib/rsRncp/journal";
import { ROUTES } from "@/lib/routes";

// Demande de contact de l'outil « RS ou RNCP ? », faite après l'affichage du résultat.
// Protections : champ piège, délai minimal de soumission, limitation de débit (5 demandes par adresse et par 10 minutes).
const limiteur = creerLimiteur({ max: 5, fenetreMs: 10 * 60 * 1000 });
const URL_SITE = "https://www.satisa-formation.fr";

function cleClient(request: Request): string {
  const transmis = request.headers.get("x-forwarded-for");
  return transmis?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "inconnu";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  const donnees = body as Record<string, unknown>;

  const verdictAntiSpam = evaluerAntiSpam({ piege: donnees.website, delaiMs: donnees.delaiMs, cle: cleClient(request) }, limiteur);
  if (verdictAntiSpam === "honeypot") {
    // Un robot croit avoir réussi ; rien n'est envoyé.
    return NextResponse.json({ ok: true });
  }
  if (verdictAntiSpam === "trop_rapide") {
    return NextResponse.json({ error: "Merci de patienter quelques secondes avant d'envoyer votre demande." }, { status: 400 });
  }
  if (verdictAntiSpam === "limite") {
    return NextResponse.json({ error: "Trop de demandes depuis votre connexion. Réessayez dans quelques minutes." }, { status: 429 });
  }

  const origine = process.env.NODE_ENV === "production" ? URL_SITE : new URL(request.url).origin;
  const construction = construireDemande(donnees, {
    config: CONFIG,
    evaluer,
    encoder,
    pageOrigine: `${origine}${ROUTES.certificationRsOuRncp}`,
  });
  if (!construction.ok) {
    return NextResponse.json({ error: construction.erreur }, { status: 400 });
  }

  const adaptateur = choisirAdaptateur(process.env, ecrireLigneJson);
  const envoi = await envoyerDemande(construction.payload, adaptateur);
  if (!envoi.ok) {
    console.error(`[rs-ou-rncp] Échec de l'envoi (${adaptateur.nom}) : ${envoi.erreur}`);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou écrivez directement à chris@satisa.fr." },
      { status: adaptateur.nom === "indisponible" ? 503 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

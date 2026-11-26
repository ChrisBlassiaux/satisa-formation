import { readFile } from "node:fs/promises";
import path from "node:path";
import { fichierOuvert, jourDeLaRequete } from "@/lib/aventCases";

// Téléchargement du fichier d'une case : refusé tant que son jour n'est pas arrivé. Les fichiers sont hors de public/
// et ajoutés au déploiement par `outputFileTracingIncludes` (next.config.ts).

const TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".zip": "application/zip",
};

const introuvable = () => new Response("Fichier introuvable", { status: 404, headers: { "Cache-Control": "no-store" } });

export async function GET(request: Request, { params }: { params: Promise<{ jour: string }> }) {
  const numero = Number((await params).jour);
  const nom = fichierOuvert(numero, jourDeLaRequete(request).jour);
  if (!nom) return introuvable();

  try {
    const contenu = await readFile(path.join(process.cwd(), "content", "avent", nom));
    return new Response(contenu, {
      headers: {
        "Content-Type": TYPES[path.extname(nom).toLowerCase()] ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${nom}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    console.error(`[avent] Fichier absent : content/avent/${nom}`);
    return introuvable();
  }
}

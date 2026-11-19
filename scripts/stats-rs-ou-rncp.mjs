// Résume les statistiques ANONYMES de l'outil « RS ou RNCP ? ».
//
// Usage :   npm run stats:rs-rncp                    (lit .data/rs-ou-rncp-evenements.jsonl, le journal de développement)
//           node scripts/stats-rs-ou-rncp.mjs fichier.jsonl
//
// En production, les mêmes lignes arrivent soit dans votre outil d'automatisation (SATISA_STATS_WEBHOOK_URL),
// soit dans les journaux du serveur (lignes commençant par « [rs-ou-rncp-stat] »). Vous pouvez les coller dans
// un fichier .jsonl et lancer ce script dessus : les préfixes « [rs-ou-rncp-stat] » sont ignorés automatiquement.

import { existsSync, readFileSync } from "node:fs";

const fichier = process.argv[2] ?? ".data/rs-ou-rncp-evenements.jsonl";
if (!existsSync(fichier)) {
  console.log(`Aucun fichier de statistiques trouvé (${fichier}). Passez le test en local pour en créer.`);
  process.exit(0);
}

const ORDRE_QUESTIONS = ["objectif", "nature", "duree", "public", "referentiel", "promotion", "insertion", "jury", "temps", "delai"];
const EVENEMENTS = readFileSync(fichier, "utf8")
  .split("\n")
  .map((ligne) => ligne.replace(/^\[rs-ou-rncp-stat\]\s*/, "").trim())
  .filter(Boolean)
  .flatMap((ligne) => {
    try {
      return [JSON.parse(ligne)];
    } catch {
      return [];
    }
  });

const parcours = new Map();
for (const e of EVENEMENTS) {
  if (!e.run) continue;
  const p = parcours.get(e.run) ?? { demarre: false, derniere: -1, termine: false, demande: false, verdict: null, niveau: null };
  if (e.evt === "demarrage") p.demarre = true;
  if (e.evt === "question") p.derniere = Math.max(p.derniere, ORDRE_QUESTIONS.indexOf(e.q));
  if (e.evt === "termine") {
    p.termine = true;
    p.verdict = e.verdict;
    p.niveau = e.preparation ?? null;
  }
  if (e.evt === "demande") p.demande = true;
  parcours.set(e.run, p);
}

const liste = [...parcours.values()];
const demarres = liste.filter((p) => p.demarre).length;
const termines = liste.filter((p) => p.termine).length;
const demandes = liste.filter((p) => p.demande).length;
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)} %` : "n/a");
const compter = (cle) => {
  const m = new Map();
  for (const p of liste.filter((x) => x.termine && x[cle])) m.set(p[cle], (m.get(p[cle]) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

console.log("Statistiques anonymes : test « RS ou RNCP ? »");
console.log("------------------------------------------------");
console.log(`Tests démarrés           : ${demarres}`);
console.log(`Tests terminés           : ${termines}   (${pct(termines, demarres)} des démarrés)`);
console.log(`Demandes de contact      : ${demandes}   (${pct(demandes, termines)} des tests terminés)`);
console.log("\nVerdicts obtenus :");
for (const [verdict, n] of compter("verdict")) console.log(`  ${verdict.padEnd(10)} ${String(n).padStart(4)}  (${pct(n, termines)})`);
console.log("\nNiveau de préparation :");
for (const [niveau, n] of compter("niveau")) console.log(`  ${niveau.padEnd(13)} ${String(n).padStart(4)}  (${pct(n, termines)})`);

const abandons = liste.filter((p) => p.demarre && !p.termine);
console.log(`\nAbandons par question (${abandons.length} parcours non terminés) :`);
for (let i = 0; i < ORDRE_QUESTIONS.length; i += 1) {
  const atteint = liste.filter((p) => p.derniere >= i).length;
  const ici = abandons.filter((p) => p.derniere === i).length;
  if (atteint === 0 && ici === 0) continue;
  console.log(`  ${String(i + 1).padStart(2)}. ${ORDRE_QUESTIONS[i].padEnd(12)} atteinte ${String(atteint).padStart(4)} fois, abandon ici ${String(ici).padStart(3)}  (${pct(ici, atteint)})`);
}

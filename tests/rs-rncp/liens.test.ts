import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONFIG } from "../../lib/rsRncp/config.ts";
import { evaluateWith } from "../../lib/rsRncp/engine.ts";
import { ANCRES_FORMULES, lienFormule } from "../../lib/rsRncp/liens.ts";
import type { Answers } from "../../lib/rsRncp/types.ts";

const PAGES = { rncp: "/deposer-une-certification-rncp-rs/depot-rncp", rs: "/deposer-une-certification-rncp-rs/depot-rs" };

test("« Voir cette formule » : toutes les combinaisons mènent à la page RNCP ou RS, sur la formule recommandée", () => {
  const questions = CONFIG.questions;
  const total = questions.reduce((n, q) => n * q.options.length, 1);
  let verifies = 0;
  for (let i = 0; i < total; i += 7) {
    let reste = i;
    const reponses: Answers = {};
    for (const q of questions) {
      reponses[q.id] = q.options[reste % q.options.length].value;
      reste = Math.floor(reste / q.options.length);
    }
    const resultat = evaluateWith(reponses, CONFIG);
    if (!resultat) continue;
    const lien = lienFormule(resultat, PAGES);
    const [page, ancre] = lien.split("#");
    assert.equal(ancre, ANCRES_FORMULES[resultat.formule.cle]);
    if (resultat.verdict === "rncp") assert.equal(page, PAGES.rncp);
    if (resultat.verdict === "rs") assert.equal(page, PAGES.rs);
    assert.ok(page === PAGES.rncp || page === PAGES.rs, "jamais la page mère");
    verifies++;
  }
  assert.ok(verifies > 1000);
});

test("sans répertoire dominant : tendance des scores, RNCP à égalité", () => {
  const formule = { cle: "diagnostic" as const };
  const lien = (verdict: "deux" | "pas_pret", rncp: number, rs: number) =>
    lienFormule({ verdict, scores: { rncp, rs, preparation: 0 }, formule }, PAGES);
  assert.equal(lien("deux", 3, 3), `${PAGES.rncp}#offre-diagnostic`);
  assert.equal(lien("deux", 2, 5), `${PAGES.rs}#offre-diagnostic`);
  assert.equal(lien("pas_pret", 4, 1), `${PAGES.rncp}#offre-diagnostic`);
  assert.equal(lien("pas_pret", 0, 0), `${PAGES.rncp}#offre-diagnostic`);
});

test("les ancres existent sur les pages Dépôt RNCP et Dépôt RS", () => {
  for (const page of ["depot-rncp", "depot-rs"]) {
    const source = readFileSync(`app/(site)/deposer-une-certification-rncp-rs/${page}/page.tsx`, "utf8");
    for (const ancre of Object.values(ANCRES_FORMULES)) {
      assert.ok(source.includes(`id="${ancre}"`), `${page} : ancre ${ancre} manquante`);
    }
  }
});

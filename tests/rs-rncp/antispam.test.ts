import test from "node:test";
import assert from "node:assert/strict";
import { creerLimiteur, DELAI_MINIMAL_MS, evaluerAntiSpam } from "../../lib/rsRncp/antispam.ts";

test("champ piège rempli : refusé", () => {
  const limiteur = creerLimiteur({ max: 5, fenetreMs: 60_000 });
  assert.equal(evaluerAntiSpam({ piege: "http://spam.example", delaiMs: 20_000, cle: "a" }, limiteur), "honeypot");
  assert.equal(evaluerAntiSpam({ piege: "   ", delaiMs: 20_000, cle: "a" }, limiteur), "ok");
  assert.equal(evaluerAntiSpam({ piege: "", delaiMs: 20_000, cle: "a" }, limiteur), "ok");
});

test("envoi trop rapide : refusé ; délai absent ou invalide : refusé", () => {
  const limiteur = creerLimiteur({ max: 5, fenetreMs: 60_000 });
  assert.equal(evaluerAntiSpam({ delaiMs: 200, cle: "a" }, limiteur), "trop_rapide");
  assert.equal(evaluerAntiSpam({ delaiMs: DELAI_MINIMAL_MS - 1, cle: "a" }, limiteur), "trop_rapide");
  assert.equal(evaluerAntiSpam({ delaiMs: DELAI_MINIMAL_MS, cle: "a" }, limiteur), "ok");
  assert.equal(evaluerAntiSpam({ cle: "a" }, limiteur), "trop_rapide");
  assert.equal(evaluerAntiSpam({ delaiMs: "10000", cle: "a" }, limiteur), "trop_rapide");
  assert.equal(evaluerAntiSpam({ delaiMs: Number.NaN, cle: "a" }, limiteur), "trop_rapide");
});

test("limitation de débit : au-delà du maximum, les envois sont refusés puis de nouveau acceptés après la fenêtre", () => {
  let maintenant = 1_000_000;
  const limiteur = creerLimiteur({ max: 3, fenetreMs: 10 * 60_000, maintenant: () => maintenant });
  const envoi = (cle: string) => evaluerAntiSpam({ delaiMs: 10_000, cle }, limiteur);

  assert.equal(envoi("ip-1"), "ok");
  assert.equal(envoi("ip-1"), "ok");
  assert.equal(envoi("ip-1"), "ok");
  assert.equal(envoi("ip-1"), "limite");
  assert.equal(envoi("ip-1"), "limite");

  // Une autre adresse n'est pas touchée.
  assert.equal(envoi("ip-2"), "ok");

  // Après la fenêtre, l'adresse est de nouveau acceptée.
  maintenant += 10 * 60_000 + 1;
  assert.equal(envoi("ip-1"), "ok");
});

test("les envois refusés par le champ piège ou le délai ne consomment pas le quota", () => {
  const limiteur = creerLimiteur({ max: 2, fenetreMs: 60_000 });
  for (let i = 0; i < 10; i += 1) {
    assert.equal(evaluerAntiSpam({ piege: "x", delaiMs: 10_000, cle: "ip" }, limiteur), "honeypot");
    assert.equal(evaluerAntiSpam({ delaiMs: 100, cle: "ip" }, limiteur), "trop_rapide");
  }
  assert.equal(evaluerAntiSpam({ delaiMs: 10_000, cle: "ip" }, limiteur), "ok");
  assert.equal(evaluerAntiSpam({ delaiMs: 10_000, cle: "ip" }, limiteur), "ok");
  assert.equal(evaluerAntiSpam({ delaiMs: 10_000, cle: "ip" }, limiteur), "limite");
});

test("vider() réinitialise le limiteur", () => {
  const limiteur = creerLimiteur({ max: 1, fenetreMs: 60_000 });
  assert.equal(limiteur.autoriser("a"), true);
  assert.equal(limiteur.autoriser("a"), false);
  limiteur.vider();
  assert.equal(limiteur.autoriser("a"), true);
});

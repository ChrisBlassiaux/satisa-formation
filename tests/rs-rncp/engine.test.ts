import test from "node:test";
import assert from "node:assert/strict";
import { CONFIG } from "../../lib/rsRncp/config.ts";
import { evaluateWith, formaterEuros, validerReponses } from "../../lib/rsRncp/engine.ts";
import { decoderReponses, encoderReponses } from "../../lib/rsRncp/share.ts";
import type { Answers, Resultat } from "../../lib/rsRncp/types.ts";

const evaluer = (reponses: unknown) => evaluateWith(reponses, CONFIG);

// Réponses de départ : un projet de métier complet, entièrement prêt.
const BASE: Answers = {
  objectif: "marche",
  nature: "metier",
  duree: "longue",
  public: "demandeurs",
  referentiel: "complet",
  promotion: "oui",
  insertion: "oui",
  jury: "oui",
  temps: "modere",
  delai: "long",
};
const avec = (changements: Answers): Answers => ({ ...BASE, ...changements });

/** Parcourt TOUTES les combinaisons de réponses possibles. */
function* toutesLesCombinaisons(): Generator<Answers> {
  const questions = CONFIG.questions;
  const rangs = new Array(questions.length).fill(0);
  while (true) {
    const reponses: Answers = {};
    questions.forEach((question, i) => {
      reponses[question.id] = question.options[rangs[i]].value;
    });
    yield reponses;
    let k = questions.length - 1;
    while (k >= 0) {
      rangs[k] += 1;
      if (rangs[k] < questions[k].options.length) break;
      rangs[k] = 0;
      k -= 1;
    }
    if (k < 0) return;
  }
}

// ---------- Cas types ----------
test("métier complet, tout prêt : RNCP, prêt, certification guidée à 5 000 € HT", () => {
  const r = evaluer(BASE) as Resultat;
  assert.equal(r.verdict, "rncp");
  assert.equal(r.preparation, "pret");
  assert.equal(r.formule.cle, "guidee");
  assert.equal(r.formule.prixTexte, "5 000 € HT");
  assert.equal(r.dureeIndicative, "À partir de 10 mois");
});

test("compétence courte pour des salariés : RS, et le même projet avec peu de temps passe en certification pilotée", () => {
  const modere = evaluer(avec({ nature: "competences", duree: "courte", public: "salaries" })) as Resultat;
  assert.equal(modere.verdict, "rs");
  assert.equal(modere.formule.cle, "guidee");
  assert.equal(modere.formule.prixTexte, "4 000 € HT");
  assert.equal(modere.dureeIndicative, "À partir de 8 mois");

  const peuDeTemps = evaluer(avec({ nature: "competences", duree: "courte", public: "salaries", temps: "peu" })) as Resultat;
  assert.equal(peuDeTemps.formule.cle, "pilotee");
  assert.equal(peuDeTemps.formule.prixTexte, "8 000 € HT");
});

test("habilitation réglementaire : RS", () => {
  const r = evaluer(avec({ nature: "habilitation", duree: "courte", public: "salaries" })) as Resultat;
  assert.equal(r.verdict, "rs");
  assert.ok(r.vigilances.some((v) => v.includes("de plein droit")));
});

test("promotion et référentiel absents : pas encore prêt, diagnostic à 700 € HT, manques par ordre de priorité", () => {
  const r = evaluer(avec({ referentiel: "non", promotion: "non" })) as Resultat;
  assert.equal(r.verdict, "pas_pret");
  assert.equal(r.preparation, "a_construire");
  assert.equal(r.formule.cle, "diagnostic");
  assert.equal(r.formule.prixTexte, "700 € HT");
  assert.match(r.raisons[0], /première promotion/);
  assert.match(r.raisons[1], /référentiel/);
});

test("un seul manque bloquant : le verdict reste un répertoire, mais la préparation est « à construire » et le diagnostic est proposé", () => {
  const r = evaluer(avec({ promotion: "non" })) as Resultat;
  assert.equal(r.verdict, "rncp");
  assert.equal(r.preparation, "a_construire");
  assert.equal(r.formule.cle, "diagnostic");
  assert.ok(r.vigilances[0].startsWith("Avant de déposer"));
});

test("projet qui penche des deux côtés : « les deux sont envisageables », avec le critère qui tranche et une fourchette de prix", () => {
  const r = evaluer(avec({ nature: "metier", duree: "courte", public: "salaries", insertion: "possible" })) as Resultat;
  assert.equal(r.verdict, "deux");
  assert.ok(r.critere && r.critere.includes("périmètre"));
  assert.match(r.dureeIndicative, /RNCP : à partir de 10 mois · RS : à partir de 8 mois/);
  assert.equal(r.formule.prixTexte, "4 000 € à 5 000 € HT");
});

// ---------- Règles d'exclusion ----------
test("sensibilisation ou remise à niveau : toujours « pas encore prêt », quelles que soient les autres réponses", () => {
  let total = 0;
  for (const reponses of toutesLesCombinaisons()) {
    if (reponses.nature !== "sensibilisation") continue;
    total += 1;
    const r = evaluer(reponses) as Resultat;
    assert.equal(r.verdict, "pas_pret");
    assert.equal(r.preparation, "a_construire");
    assert.equal(r.formule.cle, "diagnostic");
    assert.match(r.raisons[0], /exclues/);
  }
  assert.ok(total > 1000);
});

// ---------- Exhaustivité ----------
test("toutes les combinaisons de réponses donnent un résultat complet, sans erreur ni résultat vide", () => {
  const verdicts = new Set<string>();
  const niveaux = new Set<string>();
  const formules = new Set<string>();
  let total = 0;

  for (const reponses of toutesLesCombinaisons()) {
    total += 1;
    const r = evaluer(reponses);
    assert.ok(r, "résultat nul");
    assert.ok(["rncp", "rs", "deux", "pas_pret"].includes(r.verdict));
    assert.ok(["pret", "presque_pret", "a_construire"].includes(r.preparation));
    assert.ok(r.titre.length > 0 && r.resume.length > 0, "titre ou résumé vide");
    assert.ok(r.raisons.length >= 1 && r.raisons.length <= 3, `raisons : ${r.raisons.length}`);
    assert.ok(r.raisons.every((t) => t.length > 0));
    assert.ok(r.vigilances.length <= 6);
    assert.ok(r.dureeIndicative.length > 0);
    assert.ok(r.formule.nom.length > 0 && r.formule.prixMin > 0 && r.formule.prixMax >= r.formule.prixMin);
    assert.ok(r.avertissement.includes("orientation générale, pas un avis juridique"));
    assert.ok(r.fraisDepot.includes("gratuit"));
    if (r.verdict === "deux") assert.ok(r.critere && r.critere.length > 0);
    if (r.preparation === "a_construire") assert.equal(r.formule.cle, "diagnostic");
    verdicts.add(r.verdict);
    niveaux.add(r.preparation);
    formules.add(r.formule.cle);
  }

  assert.equal(total, CONFIG.questions.reduce((produit, q) => produit * q.options.length, 1));
  assert.deepEqual([...verdicts].sort(), ["deux", "pas_pret", "rncp", "rs"], "chaque verdict doit pouvoir être atteint");
  assert.deepEqual([...niveaux].sort(), ["a_construire", "presque_pret", "pret"], "chaque niveau doit pouvoir être atteint");
  assert.deepEqual([...formules].sort(), ["diagnostic", "guidee", "pilotee"], "chaque formule doit pouvoir être recommandée");
});

test("le résultat est déterministe : mêmes réponses, même résultat", () => {
  let n = 0;
  for (const reponses of toutesLesCombinaisons()) {
    n += 1;
    if (n % 97 !== 0) continue;
    assert.deepEqual(evaluer(reponses), evaluer({ ...reponses }));
  }
});

// ---------- Réponses invalides ----------
test("réponses incomplètes ou invalides : aucun résultat (jamais d'erreur)", () => {
  assert.equal(evaluer(undefined), null);
  assert.equal(evaluer(null), null);
  assert.equal(evaluer("texte"), null);
  assert.equal(evaluer({}), null);
  assert.equal(evaluer({ nature: "metier" }), null);
  assert.equal(evaluer({ ...BASE, nature: "n'importe quoi" }), null);
  assert.equal(evaluer({ ...BASE, objectif: 3 }), null);
  const sansJury: Answers = { ...BASE };
  delete sansJury.jury;
  assert.equal(evaluer(sansJury), null);
  assert.equal(validerReponses(sansJury, CONFIG).ok, false);
});

test("les champs inconnus sont ignorés", () => {
  const r = evaluer({ ...BASE, intrus: "x", verdict: "rs" }) as Resultat;
  assert.equal(r.verdict, "rncp");
});

// ---------- Intégrité de la configuration ----------
test("configuration : identifiants uniques, règles cohérentes, traçabilité complète", () => {
  const idsQuestions = CONFIG.questions.map((q) => q.id);
  assert.equal(new Set(idsQuestions).size, idsQuestions.length);
  assert.ok(CONFIG.questions.length >= 8 && CONFIG.questions.length <= 10, "8 à 10 questions");

  for (const question of CONFIG.questions) {
    assert.ok(question.pourquoi.length > 0, `aide manquante : ${question.id}`);
    const valeurs = question.options.map((o) => o.value);
    assert.equal(new Set(valeurs).size, valeurs.length, `valeurs en double : ${question.id}`);
  }

  const idsRegles = CONFIG.regles.map((r) => r.id);
  assert.equal(new Set(idsRegles).size, idsRegles.length, "identifiants de règles en double");

  for (const regle of CONFIG.regles) {
    assert.ok(regle.source.length > 0, `source manquante : ${regle.id}`);
    assert.match(regle.verifieLe, /^\d{4}-\d{2}-\d{2}$/, `date de vérification : ${regle.id}`);
    assert.equal(typeof regle.aValiderParChris, "boolean", `drapeau manquant : ${regle.id}`);
    assert.ok(Object.keys(regle.quand).length > 0, `règle sans condition : ${regle.id}`);
    for (const [id, valeurs] of Object.entries(regle.quand)) {
      const question = CONFIG.questions.find((q) => q.id === id);
      assert.ok(question, `question inconnue dans ${regle.id} : ${id}`);
      for (const valeur of valeurs ?? []) {
        assert.ok(question.options.some((o) => o.value === valeur), `option inconnue dans ${regle.id} : ${id}=${valeur}`);
      }
    }
  }
  assert.ok(CONFIG.regles.some((r) => r.aValiderParChris), "des règles doivent être signalées à valider");
});

test("prix et durées : une seule source, conforme aux pages d'offres", () => {
  assert.equal(CONFIG.offres.diagnostic.prix, 700);
  assert.deepEqual(CONFIG.offres.guidee.prix, { rncp: 5000, rs: 4000 });
  assert.deepEqual(CONFIG.offres.pilotee.prix, { rncp: 10000, rs: 8000 });
  assert.equal(CONFIG.durees.rncp, "À partir de 10 mois");
  assert.equal(CONFIG.durees.rs, "À partir de 8 mois");
  assert.match(CONFIG.fraisDepot, /gratuit/);
  assert.match(CONFIG.avertissement, /Ce test est une orientation générale, pas un avis juridique\. L'enregistrement dépend de la décision de France compétences\./);
});

test("formatage des montants", () => {
  assert.equal(formaterEuros(700), "700 €");
  assert.equal(formaterEuros(5000), "5 000 €");
  assert.equal(formaterEuros(10000), "10 000 €");
});

// ---------- Partage par lien ----------
test("partage par lien : encoder puis décoder redonne exactement les réponses, pour toutes les combinaisons", () => {
  for (const reponses of toutesLesCombinaisons()) {
    const code = encoderReponses(reponses, CONFIG);
    assert.ok(code && code.startsWith("v1-"));
    assert.deepEqual(decoderReponses(code, CONFIG), reponses);
  }
});

test("partage par lien : un code invalide ne produit jamais de résultat", () => {
  assert.equal(decoderReponses(null, CONFIG), null);
  assert.equal(decoderReponses("", CONFIG), null);
  assert.equal(decoderReponses("v2-0.0.0.0.0.0.0.0.0.0", CONFIG), null);
  assert.equal(decoderReponses("v1-0.0.0", CONFIG), null);
  assert.equal(decoderReponses("v1-9.0.0.0.0.0.0.0.0.0", CONFIG), null);
  assert.equal(decoderReponses("v1-a.0.0.0.0.0.0.0.0.0", CONFIG), null);
  assert.equal(decoderReponses("v1-0.0.0.0.0.0.0.0.0.0.0", CONFIG), null);
  assert.equal(encoderReponses({ nature: "metier" }, CONFIG), null);
});

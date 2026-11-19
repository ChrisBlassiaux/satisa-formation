import test from "node:test";
import assert from "node:assert/strict";
import { CONFIG } from "../../lib/rsRncp/config.ts";
import { evaluateWith } from "../../lib/rsRncp/engine.ts";
import { encoderReponses } from "../../lib/rsRncp/share.ts";
import {
  adaptateurIndisponible,
  adaptateurSimule,
  adaptateurWebhook,
  choisirAdaptateur,
  construireDemande,
  envoyerDemande,
  type ContexteConstruction,
  type DemandePayload,
} from "../../lib/rsRncp/demande.ts";
import { choisirAdaptateurEvenements, validerEvenement } from "../../lib/rsRncp/evenements.ts";
import type { Answers } from "../../lib/rsRncp/types.ts";

const REPONSES: Answers = {
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

const MAINTENANT = new Date("2026-11-19T10:00:00.000Z");
const contexte: ContexteConstruction = {
  config: CONFIG,
  evaluer: (r) => evaluateWith(r, CONFIG),
  encoder: (r) => encoderReponses(r, CONFIG),
  pageOrigine: "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/rs-ou-rncp",
  maintenant: () => MAINTENANT,
};

const valide = {
  email: "  marie@organisme.fr ",
  prenom: "Marie",
  nom: "Dupont",
  structure: "Organisme Test",
  telephone: " 06 12 34 56 78 ",
  consentement: true,
  reponses: REPONSES,
};

function payloadValide(): DemandePayload {
  const construction = construireDemande(valide, contexte);
  assert.ok(construction.ok);
  return construction.payload;
}

// ---------- Construction et validation de la demande ----------
test("demande valide : le payload contient e-mail, réponses, verdict, préparation, formule, date et page d'origine", () => {
  const p = payloadValide();
  assert.equal(p.type, "demande_rs_ou_rncp");
  assert.equal(p.contact.email, "marie@organisme.fr");
  assert.equal(p.contact.prenom, "Marie");
  assert.equal(p.contact.nom, "Dupont");
  assert.equal(p.contact.structure, "Organisme Test");
  assert.equal(p.contact.telephone, "06 12 34 56 78");
  assert.deepEqual(p.reponses, REPONSES);
  assert.equal(p.resultat.verdict, "rncp");
  assert.equal(p.resultat.preparation, "pret");
  assert.equal(p.resultat.formule.cle, "guidee");
  assert.equal(p.resultat.formule.prixMin, 5000);
  assert.equal(p.date, "2026-11-19T10:00:00.000Z");
  assert.equal(p.pageOrigine, contexte.pageOrigine);
  assert.match(p.lienResultat, /#r=v1-/);
  assert.equal(p.consentement.accepte, true);
  assert.ok(p.consentement.texte.includes("recontacter"));
});

test("le verdict est toujours recalculé : un verdict envoyé par le navigateur est ignoré", () => {
  const construction = construireDemande({ ...valide, verdict: "rs", resultat: { verdict: "rs" } }, contexte);
  assert.ok(construction.ok);
  assert.equal(construction.payload.resultat.verdict, "rncp");
});

test("le téléphone est facultatif, mais prénom, nom, structure et e-mail sont obligatoires", () => {
  const sansTelephone = construireDemande({ ...valide, telephone: undefined }, contexte);
  assert.ok(sansTelephone.ok);
  assert.equal(sansTelephone.payload.contact.telephone, "");
  for (const champ of ["prenom", "nom", "structure"] as const) {
    for (const valeur of ["", "   ", undefined]) {
      assert.equal(construireDemande({ ...valide, [champ]: valeur }, contexte).ok, false, `${champ} ${String(valeur)}`);
    }
  }
});

test("e-mail invalide, consentement absent ou test incomplet : demande refusée", () => {
  for (const email of ["", "pas-un-email", "a@b", "a b@c.fr", 42, undefined]) {
    assert.equal(construireDemande({ ...valide, email }, contexte).ok, false, `e-mail ${String(email)}`);
  }
  for (const consentement of [false, undefined, "true", 1, null]) {
    assert.equal(construireDemande({ ...valide, consentement }, contexte).ok, false, `consentement ${String(consentement)}`);
  }
  assert.equal(construireDemande({ ...valide, reponses: { nature: "metier" } }, contexte).ok, false);
  assert.equal(construireDemande({ ...valide, reponses: undefined }, contexte).ok, false);
  assert.equal(construireDemande(null, contexte).ok, false);
  assert.equal(construireDemande("texte", contexte).ok, false);
});

test("les champs trop longs sont tronqués", () => {
  const construction = construireDemande({ ...valide, prenom: "x".repeat(500), nom: "z".repeat(500), structure: "y".repeat(500), telephone: "0".repeat(500) }, contexte);
  assert.ok(construction.ok);
  assert.equal(construction.payload.contact.prenom.length, 100);
  assert.equal(construction.payload.contact.nom.length, 100);
  assert.equal(construction.payload.contact.structure.length, 150);
  assert.equal(construction.payload.contact.telephone.length, 40);
});

// ---------- Adaptateur simulé ----------
test("adaptateur simulé : journalise la demande, écrit le fichier local, n'envoie rien", async () => {
  const messages: string[] = [];
  const ecritures: { fichier: string; objet: unknown }[] = [];
  const adaptateur = adaptateurSimule({
    ecrire: async (fichier, objet) => {
      ecritures.push({ fichier, objet });
    },
    journal: (m) => messages.push(m),
  });
  const resultat = await envoyerDemande(payloadValide(), adaptateur);
  assert.deepEqual(resultat, { ok: true });
  assert.equal(adaptateur.nom, "simule");
  assert.equal(ecritures.length, 1);
  assert.equal(ecritures[0].fichier, "rs-ou-rncp-demandes.jsonl");
  assert.ok(messages.some((m) => m.includes("aucun envoi réel") && m.includes("marie@organisme.fr")));
});

test("adaptateur simulé : une erreur d'écriture du journal n'empêche pas la demande", async () => {
  const messages: string[] = [];
  const adaptateur = adaptateurSimule({
    ecrire: async () => {
      throw new Error("disque plein");
    },
    journal: (m) => messages.push(m),
  });
  assert.deepEqual(await envoyerDemande(payloadValide(), adaptateur), { ok: true });
  assert.ok(messages.some((m) => m.includes("impossible")));
});

// ---------- Adaptateur webhook ----------
test("adaptateur webhook : envoie le payload JSON à l'URL, avec le secret s'il existe", async () => {
  const appels: { url: string; init: RequestInit }[] = [];
  const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
    appels.push({ url: String(url), init: init ?? {} });
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  const adaptateur = adaptateurWebhook({ url: "https://hook.example/abc", secret: "s3cret", fetchImpl });
  const payload = payloadValide();
  assert.deepEqual(await envoyerDemande(payload, adaptateur), { ok: true });

  assert.equal(appels.length, 1);
  assert.equal(appels[0].url, "https://hook.example/abc");
  assert.equal(appels[0].init.method, "POST");
  const entetes = appels[0].init.headers as Record<string, string>;
  assert.equal(entetes["Content-Type"], "application/json");
  assert.equal(entetes["X-Satisa-Secret"], "s3cret");
  assert.deepEqual(JSON.parse(String(appels[0].init.body)), JSON.parse(JSON.stringify(payload)));
});

test("adaptateur webhook : sans secret, aucun en-tête de secret", async () => {
  let entetes: Record<string, string> = {};
  const fetchImpl = (async (_url: string | URL | Request, init?: RequestInit) => {
    entetes = (init?.headers ?? {}) as Record<string, string>;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;
  await envoyerDemande(payloadValide(), adaptateurWebhook({ url: "https://hook.example/abc", fetchImpl }));
  assert.equal("X-Satisa-Secret" in entetes, false);
});

test("adaptateur webhook : réponse en erreur ou réseau coupé = échec propre, sans exception", async () => {
  const erreur500 = (async () => new Response("boom", { status: 500 })) as typeof fetch;
  const resultat500 = await envoyerDemande(payloadValide(), adaptateurWebhook({ url: "https://hook.example/x", fetchImpl: erreur500 }));
  assert.equal(resultat500.ok, false);

  const reseau = (async () => {
    throw new TypeError("fetch failed");
  }) as typeof fetch;
  const resultatReseau = await envoyerDemande(payloadValide(), adaptateurWebhook({ url: "https://hook.example/x", fetchImpl: reseau }));
  assert.equal(resultatReseau.ok, false);
});

// ---------- Choix de l'adaptateur ----------
test("choix de l'adaptateur : webhook si l'URL existe, simulé en développement, indisponible en production sans URL", async () => {
  const ecrire = async () => undefined;
  assert.equal(choisirAdaptateur({ SATISA_WEBHOOK_URL: "https://hook.example/x", NODE_ENV: "production" }, ecrire).nom, "webhook");
  assert.equal(choisirAdaptateur({ NODE_ENV: "development" }, ecrire).nom, "simule");
  assert.equal(choisirAdaptateur({}, ecrire).nom, "simule");
  const prod = choisirAdaptateur({ NODE_ENV: "production" }, ecrire);
  assert.equal(prod.nom, "indisponible");
  assert.equal((await envoyerDemande(payloadValide(), prod)).ok, false);
  assert.equal((await adaptateurIndisponible().envoyer(payloadValide())).ok, false);
});

// ---------- Statistiques anonymes ----------
test("événements : seuls les événements connus et anonymes sont acceptés", () => {
  const run = "3f2a9c1e-77b4-4d0a-9d1e-0a1b2c3d4e5f";
  assert.deepEqual(validerEvenement({ evt: "demarrage", run }, CONFIG), { ok: true, evenement: { evt: "demarrage", run } });
  assert.deepEqual(validerEvenement({ evt: "question", run, q: "jury" }, CONFIG), { ok: true, evenement: { evt: "question", run, q: "jury" } });
  const termine = validerEvenement({ evt: "termine", run, verdict: "rs", preparation: "pret" }, CONFIG);
  assert.ok(termine.ok && termine.evenement.verdict === "rs");

  assert.equal(validerEvenement({ evt: "inconnu", run }, CONFIG).ok, false);
  assert.equal(validerEvenement({ evt: "question", run, q: "n-importe-quoi" }, CONFIG).ok, false);
  assert.equal(validerEvenement({ evt: "termine", run, verdict: "xx" }, CONFIG).ok, false);
  assert.equal(validerEvenement({ evt: "demarrage", run: "court" }, CONFIG).ok, false);
  assert.equal(validerEvenement({ evt: "demarrage", run: "ABC DEF <script>" }, CONFIG).ok, false);
  assert.equal(validerEvenement(null, CONFIG).ok, false);
});

test("événements : un événement n'emporte jamais d'e-mail ni de réponse détaillée", () => {
  const run = "3f2a9c1e-77b4-4d0a-9d1e-0a1b2c3d4e5f";
  const resultat = validerEvenement(
    { evt: "demande", run, verdict: "rncp", email: "marie@organisme.fr", reponses: REPONSES, ip: "1.2.3.4" },
    CONFIG,
  );
  assert.ok(resultat.ok);
  assert.deepEqual(Object.keys(resultat.evenement).sort(), ["evt", "run", "verdict"]);
});

test("événements : destination selon l'environnement", async () => {
  const lignes: string[] = [];
  const ecritures: string[] = [];
  const ecrire = async (fichier: string) => {
    ecritures.push(fichier);
  };
  const evenement = { evt: "demarrage" as const, run: "3f2a9c1e-77b4-4d0a-9d1e-0a1b2c3d4e5f", date: MAINTENANT.toISOString() };

  const local = choisirAdaptateurEvenements({ NODE_ENV: "development" }, ecrire, (m) => lignes.push(m));
  assert.equal(local.nom, "fichier-local");
  await local.enregistrer(evenement);
  assert.deepEqual(ecritures, ["rs-ou-rncp-evenements.jsonl"]);

  const journal = choisirAdaptateurEvenements({ NODE_ENV: "production" }, ecrire, (m) => lignes.push(m));
  assert.equal(journal.nom, "journal-serveur");
  await journal.enregistrer(evenement);
  assert.ok(lignes[0].startsWith("[rs-ou-rncp-stat] "));

  const appels: string[] = [];
  const fetchImpl = (async (url: string | URL | Request) => {
    appels.push(String(url));
    return new Response(null, { status: 204 });
  }) as typeof fetch;
  const webhook = choisirAdaptateurEvenements({ NODE_ENV: "production", SATISA_STATS_WEBHOOK_URL: "https://stats.example/x" }, ecrire, undefined, fetchImpl);
  assert.equal(webhook.nom, "webhook");
  await webhook.enregistrer(evenement);
  assert.deepEqual(appels, ["https://stats.example/x"]);
});

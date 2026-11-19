// Outil « RS ou RNCP ? » : moteur de calcul du verdict.
//
// Fonction pure : aucune interface, aucun effet de bord, aucune IA, aucune API externe.
// Mêmes réponses + même configuration = même résultat, toujours.
// La configuration est passée en paramètre (voir `index.ts` pour la version liée à la configuration du site).

import type {
  Answers,
  Config,
  Effets,
  Formule,
  FormuleCle,
  PreparationCle,
  QuestionId,
  Regle,
  Repertoire,
  Resultat,
  TexteSelonRepertoire,
  VerdictCle,
} from "./types";

/** Formate un montant en euros, avec une espace insécable entre les milliers : « 5 000 € ». */
export function formaterEuros(montant: number): string {
  const chiffres = String(Math.round(montant)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${chiffres} €`;
}

export type ValidationReponses = { ok: true; reponses: Answers } | { ok: false; erreur: string };

/** Vérifie que chaque question a reçu une réponse valide. Ignore tout ce qui n'est pas une question connue. */
export function validerReponses(brut: unknown, config: Config): ValidationReponses {
  if (!brut || typeof brut !== "object") return { ok: false, erreur: "Réponses manquantes." };
  const source = brut as Record<string, unknown>;
  const reponses: Answers = {};
  for (const question of config.questions) {
    const valeur = source[question.id];
    if (typeof valeur !== "string" || !question.options.some((option) => option.value === valeur)) {
      return { ok: false, erreur: `Réponse manquante ou invalide : ${question.id}.` };
    }
    reponses[question.id] = valeur;
  }
  return { ok: true, reponses };
}

function regleCorrespond(regle: Regle, reponses: Answers): boolean {
  return (Object.entries(regle.quand) as [QuestionId, string[]][]).every(([question, valeurs]) => {
    const reponse = reponses[question];
    return reponse !== undefined && valeurs.includes(reponse);
  });
}

/** Textes d'une rubrique (raison ou vigilance) applicables au verdict, dans l'ordre : commun, RNCP, RS. */
function textesPour(texte: TexteSelonRepertoire | undefined, repertoires: Repertoire[], communInclus: boolean): string[] {
  if (!texte) return [];
  const resultat: string[] = [];
  if (communInclus && texte.commun) resultat.push(texte.commun);
  for (const repertoire of repertoires) {
    const t = texte[repertoire];
    if (t) resultat.push(t);
  }
  return resultat;
}

function unique(textes: string[]): string[] {
  return [...new Set(textes)];
}

function sommeEffet(regles: Regle[], cle: "rncp" | "rs" | "preparation"): number {
  return regles.reduce((total, regle) => total + (regle.effets[cle] ?? 0), 0);
}

function repertoiresVises(verdict: VerdictCle): Repertoire[] {
  if (verdict === "rncp") return ["rncp"];
  if (verdict === "rs") return ["rs"];
  if (verdict === "deux") return ["rncp", "rs"];
  return [];
}

/** Choisit les raisons à afficher (3 au maximum) : les plus prioritaires, avec les deux côtés représentés pour « les deux ». */
function choisirRaisons(regles: Regle[], verdict: VerdictCle): string[] {
  const candidates = regles.filter((r) => r.effets.raison);
  const parPriorite = (a: Regle, b: Regle) => (b.effets.priorite ?? 0) - (a.effets.priorite ?? 0);

  if (verdict === "deux") {
    const rncp = candidates.filter((r) => r.effets.raison?.rncp).sort(parPriorite)[0];
    const rs = candidates.filter((r) => r.effets.raison?.rs).sort(parPriorite)[0];
    const choisies: string[] = [];
    if (rncp?.effets.raison?.rncp) choisies.push(rncp.effets.raison.rncp);
    if (rs?.effets.raison?.rs) choisies.push(rs.effets.raison.rs);
    const reste = candidates
      .filter((r) => r.effets.raison?.commun)
      .sort(parPriorite)
      .map((r) => r.effets.raison?.commun as string);
    return unique([...choisies, ...reste]).slice(0, 3);
  }

  const repertoires = repertoiresVises(verdict);
  const textes = candidates
    .sort(parPriorite)
    .flatMap((r) => textesPour(r.effets.raison, repertoires, true));
  return unique(textes).slice(0, 3);
}

function choisirFormule(
  config: Config,
  verdict: VerdictCle,
  niveau: PreparationCle,
  reponses: Answers,
): FormuleCle {
  if (verdict === "pas_pret") return "diagnostic";
  const regle = config.formules.parNiveau[niveau];
  if (typeof regle === "string") return regle;
  if (regle && reponses.temps && regle[reponses.temps]) return regle[reponses.temps];
  return config.formules.parDefaut;
}

function construireFormule(config: Config, cle: FormuleCle, verdict: VerdictCle): Formule {
  const offre = config.offres[cle];
  let prixMin: number;
  let prixMax: number;
  if (typeof offre.prix === "number") {
    prixMin = prixMax = offre.prix;
  } else if (verdict === "rncp") {
    prixMin = prixMax = offre.prix.rncp;
  } else if (verdict === "rs") {
    prixMin = prixMax = offre.prix.rs;
  } else {
    prixMin = Math.min(offre.prix.rncp, offre.prix.rs);
    prixMax = Math.max(offre.prix.rncp, offre.prix.rs);
  }
  const prixTexte =
    prixMin === prixMax ? `${formaterEuros(prixMin)} HT` : `${formaterEuros(prixMin)} à ${formaterEuros(prixMax)} HT`;
  return { cle, nom: offre.nom, sousTitre: offre.sousTitre, description: offre.description, prixTexte, prixMin, prixMax };
}

function dureeIndicative(config: Config, verdict: VerdictCle): string {
  if (verdict === "rncp") return config.durees.rncp;
  if (verdict === "rs") return config.durees.rs;
  if (verdict === "deux") return `RNCP : ${config.durees.rncp.toLowerCase()} · RS : ${config.durees.rs.toLowerCase()}`;
  return config.duree.apresDiagnostic;
}

type Manque = { texte: string; priorite: number };

/**
 * Calcule le verdict à partir des réponses. Renvoie `null` si les réponses sont incomplètes ou invalides.
 * Pour des réponses valides, le résultat n'est jamais vide.
 */
export function evaluateWith(brut: unknown, config: Config): Resultat | null {
  const validation = validerReponses(brut, config);
  if (!validation.ok) return null;
  const reponses = validation.reponses;

  const regles = config.regles.filter((regle) => regleCorrespond(regle, reponses));
  const scores = {
    rncp: sommeEffet(regles, "rncp"),
    rs: sommeEffet(regles, "rs"),
    preparation: sommeEffet(regles, "preparation"),
  };

  const exclusions = regles.map((r) => r.effets.exclusion).filter((t): t is string => Boolean(t));
  const manques: Manque[] = regles
    .map((r: Regle) => r.effets.manque)
    .filter((m): m is NonNullable<Effets["manque"]> => Boolean(m))
    .sort((a, b) => a.priorite - b.priorite);
  const bloquants = manques.filter((m) => m.priorite <= config.blocageJusqua);

  // ----- Verdict -----
  let verdict: VerdictCle;
  if (exclusions.length > 0 || bloquants.length >= config.pasPretSiBloquants) {
    verdict = "pas_pret";
  } else {
    const ecart = scores.rncp - scores.rs;
    verdict = ecart >= config.ecartMinimal ? "rncp" : ecart <= -config.ecartMinimal ? "rs" : "deux";
  }

  // ----- Niveau de préparation -----
  let preparation: PreparationCle;
  if (exclusions.length > 0 || bloquants.length > 0) preparation = "a_construire";
  else if (scores.preparation >= config.seuilsPreparation.pret) preparation = "pret";
  else if (scores.preparation >= config.seuilsPreparation.presquePret) preparation = "presque_pret";
  else preparation = "a_construire";

  // ----- Raisons et points de vigilance -----
  const repertoires = repertoiresVises(verdict);
  const vigilancesRegles = regles.flatMap((r) => textesPour(r.effets.vigilance, repertoires, true));

  let raisons: string[];
  let vigilances: string[];
  if (verdict === "pas_pret") {
    const aVenir = [...exclusions.map((texte) => ({ texte, priorite: 0 })), ...manques];
    const textes = unique(aVenir.map((m) => m.texte));
    raisons = textes.slice(0, 3);
    vigilances = unique([
      ...textes.slice(3).map((t) => `À prévoir également : ${t}`),
      ...vigilancesRegles,
    ]);
  } else {
    raisons = choisirRaisons(regles, verdict);
    vigilances = unique([
      ...manques.map((m) => `Avant de déposer : ${m.texte}`),
      ...vigilancesRegles,
    ]);
  }
  vigilances = vigilances.slice(0, 6);

  const texteVerdict = config.verdicts[verdict];
  if (raisons.length === 0) raisons = [texteVerdict.raisonParDefaut];
  const texteNiveau = config.preparation[preparation];

  return {
    verdict,
    titre: texteVerdict.titre,
    resume: texteVerdict.resume,
    critere: texteVerdict.critere,
    preparation,
    preparationLabel: texteNiveau.label,
    preparationTexte: texteNiveau.texte,
    raisons,
    vigilances,
    dureeIndicative: dureeIndicative(config, verdict),
    formule: construireFormule(config, choisirFormule(config, verdict, preparation, reponses), verdict),
    avertissement: config.avertissement,
    fraisDepot: config.fraisDepot,
    scores,
    versionRegles: config.version,
  };
}

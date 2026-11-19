// Outil « RS ou RNCP ? » : partage du résultat par lien, sans stocker de donnée personnelle.
//
// Les réponses sont encodées dans l'URL (après le « # », qui n'est jamais envoyé au serveur) sous la forme
// « v1-2.0.1.… » : un chiffre par question (le rang de l'option choisie), dans l'ordre des questions.
// Le résultat est recalculé à l'ouverture du lien : il n'est jamais stocké.

import type { Answers, Config } from "./types";

const PREFIXE = "v1-";

export function encoderReponses(reponses: Answers, config: Config): string | null {
  const rangs: number[] = [];
  for (const question of config.questions) {
    const rang = question.options.findIndex((option) => option.value === reponses[question.id]);
    if (rang < 0) return null;
    rangs.push(rang);
  }
  return `${PREFIXE}${rangs.join(".")}`;
}

export function decoderReponses(code: string | null | undefined, config: Config): Answers | null {
  if (typeof code !== "string" || !code.startsWith(PREFIXE)) return null;
  const parties = code.slice(PREFIXE.length).split(".");
  if (parties.length !== config.questions.length) return null;
  const reponses: Answers = {};
  for (let i = 0; i < config.questions.length; i += 1) {
    const question = config.questions[i];
    if (!/^\d{1,2}$/.test(parties[i])) return null;
    const option = question.options[Number(parties[i])];
    if (!option) return null;
    reponses[question.id] = option.value;
  }
  return reponses;
}

// Outil « RS ou RNCP ? » : point d'entrée utilisé par le site (interface et API).
// Il lie le moteur, le partage par lien et la configuration du site. Les tests, eux, appellent directement
// `engine.ts` et `share.ts` avec une configuration explicite.

import { CONFIG } from "./config";
import { evaluateWith, validerReponses } from "./engine";
import { decoderReponses, encoderReponses } from "./share";
import type { Answers } from "./types";

export { CONFIG };
export { formaterEuros } from "./engine";
export type * from "./types";

/** Verdict, niveau de préparation, raisons, points de vigilance et formule recommandée. `null` si les réponses sont incomplètes. */
export const evaluer = (reponses: unknown) => evaluateWith(reponses, CONFIG);
export const verifierReponses = (reponses: unknown) => validerReponses(reponses, CONFIG);
export const encoder = (reponses: Answers) => encoderReponses(reponses, CONFIG);
export const decoder = (code: string | null | undefined) => decoderReponses(code, CONFIG);

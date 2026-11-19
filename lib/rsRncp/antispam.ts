// Outil « RS ou RNCP ? » : protection anti-spam, sans aucune intervention humaine.
//   1. champ piège invisible (honeypot) : un vrai visiteur ne le remplit jamais ;
//   2. délai minimal de soumission : un robot envoie le formulaire en une fraction de seconde ;
//   3. limitation de débit côté serveur : nombre maximal de demandes par adresse sur une période.

export type VerdictAntiSpam = "ok" | "honeypot" | "trop_rapide" | "limite";

export type LimiteurDebit = {
  /** Enregistre une tentative pour `cle` et dit si elle est autorisée. */
  autoriser(cle: string): boolean;
  /** Réinitialise tout (utile aux tests). */
  vider(): void;
};

/**
 * Limiteur en mémoire à fenêtre glissante.
 * Limite connue : sur un hébergement « serverless », chaque instance a sa propre mémoire. La protection est donc
 * partielle ; elle complète le champ piège et le délai minimal, elle ne remplace pas un pare-feu.
 */
export function creerLimiteur(options: { max: number; fenetreMs: number; maintenant?: () => number }): LimiteurDebit {
  const maintenant = options.maintenant ?? (() => Date.now());
  const tentatives = new Map<string, number[]>();

  return {
    autoriser(cle: string): boolean {
      const t = maintenant();
      const debut = t - options.fenetreMs;
      const recentes = (tentatives.get(cle) ?? []).filter((instant) => instant > debut);
      if (recentes.length >= options.max) {
        tentatives.set(cle, recentes);
        return false;
      }
      recentes.push(t);
      tentatives.set(cle, recentes);
      // Évite que la mémoire grossisse indéfiniment : on purge les clés inactives de temps en temps.
      if (tentatives.size > 5000) {
        for (const [autreCle, instants] of tentatives) {
          if (instants.every((instant) => instant <= debut)) tentatives.delete(autreCle);
        }
      }
      return true;
    },
    vider() {
      tentatives.clear();
    },
  };
}

export const DELAI_MINIMAL_MS = 3000;

/** Analyse une soumission. Ne consomme pas le limiteur si la soumission est déjà refusée par les autres contrôles. */
export function evaluerAntiSpam(
  entree: { piege?: unknown; delaiMs?: unknown; cle: string },
  limiteur: LimiteurDebit,
  delaiMinimalMs: number = DELAI_MINIMAL_MS,
): VerdictAntiSpam {
  if (typeof entree.piege === "string" && entree.piege.trim() !== "") return "honeypot";
  const delai = typeof entree.delaiMs === "number" && Number.isFinite(entree.delaiMs) ? entree.delaiMs : 0;
  if (delai < delaiMinimalMs) return "trop_rapide";
  if (!limiteur.autoriser(entree.cle)) return "limite";
  return "ok";
}

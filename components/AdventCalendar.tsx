"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ANNEE_AVENT, CASES_AVENT, RATTRAPAGE_POSSIBLE, TYPE_LABELS, jourOuvrable, type CaseAvent } from "@/lib/avent";

// Le calendrier : 24 cases-cadeaux. Seule la case du jour (et, si le rattrapage est permis, celles déjà passées)
// peut s'ouvrir ; les autres sont verrouillées. Les cases ouvertes sont mémorisées dans le navigateur.

const CLE_OUVERTES = `avent-${ANNEE_AVENT}-ouvertes`;

function abonnerOuvertes(rappel: () => void) {
  window.addEventListener("storage", rappel);
  window.addEventListener("avent-ouvertes", rappel);
  return () => {
    window.removeEventListener("storage", rappel);
    window.removeEventListener("avent-ouvertes", rappel);
  };
}

function lireOuvertes(): string {
  try {
    return window.localStorage.getItem(CLE_OUVERTES) ?? "[]";
  } catch {
    return "[]";
  }
}

function memoriserOuverte(jour: number, deja: number[]) {
  if (deja.includes(jour)) return;
  try {
    window.localStorage.setItem(CLE_OUVERTES, JSON.stringify([...deja, jour]));
    window.dispatchEvent(new Event("avent-ouvertes"));
  } catch {
    // Sans stockage disponible, la case s'ouvre quand même : on ne la mémorise simplement pas.
  }
}

// Jour réel : lu dans le navigateur (la page est générée à l'avance, la date du serveur serait périmée).
function abonnerJour(rappel: () => void) {
  const minuteur = window.setInterval(rappel, 60_000);
  return () => window.clearInterval(minuteur);
}

const APERCU_LOCAL = process.env.NODE_ENV !== "production";

const ICONES: Record<string, React.ReactNode> = {
  cadenas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  coche: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  ),
};

export default function AdventCalendar() {
  const jourReel = useSyncExternalStore(
    abonnerJour,
    () => jourOuvrable(new Date()),
    () => 0,
  );
  const [simule, setSimule] = useState<number | null>(null);
  const jour = simule ?? jourReel;

  const ouvertesBrut = useSyncExternalStore(abonnerOuvertes, lireOuvertes, () => "[]");
  const ouvertes: number[] = (() => {
    try {
      const valeur = JSON.parse(ouvertesBrut);
      return Array.isArray(valeur) ? valeur : [];
    } catch {
      return [];
    }
  })();

  const [choisie, setChoisie] = useState<CaseAvent | null>(null);
  const boite = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = boite.current;
    if (!element) return;
    if (choisie && !element.open) element.showModal();
    if (!choisie && element.open) element.close();
  }, [choisie]);

  function etat(c: CaseAvent): "verrouillee" | "aujourdhui" | "disponible" | "ouverte" {
    if (c.jour > jour) return "verrouillee";
    if (ouvertes.includes(c.jour)) return "ouverte";
    return c.jour === jour ? "aujourdhui" : "disponible";
  }

  function ouvrir(c: CaseAvent) {
    const peutOuvrir = c.jour === jour || (RATTRAPAGE_POSSIBLE && c.jour < jour);
    if (!peutOuvrir) return;
    memoriserOuverte(c.jour, ouvertes);
    setChoisie(c);
  }

  return (
    <>
      <ol className="avent-grille" aria-label="Les 24 cases du calendrier de l'Avent">
        {CASES_AVENT.map((c) => {
          const e = etat(c);
          const ouvrable = e !== "verrouillee" && (c.jour === jour || RATTRAPAGE_POSSIBLE);
          return (
            <li key={c.jour}>
              <button
                type="button"
                className={`avent-case avent-case--v${c.jour % 4} is-${e}`}
                onClick={() => ouvrir(c)}
                disabled={!ouvrable}
                aria-label={
                  e === "verrouillee"
                    ? `Case du ${c.jour} décembre, pas encore disponible`
                    : e === "aujourdhui"
                      ? `Ouvrir la case du jour, le ${c.jour} décembre`
                      : `Ouvrir la case du ${c.jour} décembre`
                }
              >
                <span className="avent-case__ruban avent-case__ruban--v" aria-hidden="true" />
                <span className="avent-case__ruban avent-case__ruban--h" aria-hidden="true" />
                <span className="avent-case__numero">{c.jour}</span>
                {e === "verrouillee" && <span className="avent-case__icone">{ICONES.cadenas}</span>}
                {e === "ouverte" && <span className="avent-case__icone">{ICONES.coche}</span>}
                {e === "aujourdhui" && <span className="avent-case__etiquette">Aujourd&apos;hui</span>}
              </button>
            </li>
          );
        })}
      </ol>

      <dialog
        ref={boite}
        className="avent-boite"
        onClose={() => setChoisie(null)}
        onClick={(evenement) => {
          if (evenement.target === boite.current) setChoisie(null);
        }}
        aria-labelledby="avent-boite-titre"
      >
        {choisie && (
          <div className="avent-boite__contenu">
            <button type="button" className="avent-boite__fermer" onClick={() => setChoisie(null)} aria-label="Fermer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <p className="avent-boite__jour">
              <span>{choisie.jour}</span> décembre
            </p>
            <p className="avent-boite__type">{TYPE_LABELS[choisie.type]}</p>
            <h2 id="avent-boite-titre" className="avent-boite__titre">
              {choisie.titre}
            </h2>
            <p className="avent-boite__texte">{choisie.texte}</p>
            {choisie.cta &&
              (choisie.cta.href ? (
                choisie.cta.href.startsWith("http") ? (
                  <a href={choisie.cta.href} className="btn btn--dark" target="_blank" rel="noopener noreferrer">
                    {choisie.cta.label}
                  </a>
                ) : (
                  <Link href={choisie.cta.href} className="btn btn--dark">
                    {choisie.cta.label}
                  </Link>
                )
              ) : (
                <button type="button" className="btn btn--outline" disabled>
                  Bientôt disponible
                </button>
              ))}
          </div>
        )}
      </dialog>

      {APERCU_LOCAL && (
        <div className="avent-apercu">
          <label htmlFor="avent-apercu-jour">Aperçu local (absent en production) : simuler la date</label>
          <select
            id="avent-apercu-jour"
            value={simule === null ? "reel" : String(simule)}
            onChange={(e) => setSimule(e.target.value === "reel" ? null : Number(e.target.value))}
          >
            <option value="reel">Date réelle</option>
            <option value="0">Avant le 1er décembre</option>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Le {i + 1} décembre
              </option>
            ))}
            <option value="25">Après le 24 décembre</option>
          </select>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ANNEE_AVENT, NOMBRE_CASES, TYPE_LABELS, type CaseAvent, type EtatCalendrier } from "@/lib/avent";
import { ROUTES } from "@/lib/routes";

// Le calendrier : 24 cases-cadeaux. Le serveur indique le jour et n'envoie que le contenu des cases qui peuvent
// s'ouvrir ; les autres sont verrouillées. Les cases ouvertes sont mémorisées dans le navigateur.

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

const ROUTE_CASES = `${ROUTES.advent}/cases`;

// Tant que le serveur n'a pas répondu, tout reste verrouillé.
const CALENDRIER_FERME: EtatCalendrier = { jour: 0, cases: [], simulationPossible: false };

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
  const [calendrier, setCalendrier] = useState(CALENDRIER_FERME);
  const [simule, setSimule] = useState<number | null>(null);
  const [enErreur, setEnErreur] = useState(false);
  const { jour } = calendrier;
  const contenus = new Map(calendrier.cases.map((c) => [c.jour, c]));

  useEffect(() => {
    const annulation = new AbortController();
    async function charger() {
      try {
        const adresse = simule === null ? ROUTE_CASES : `${ROUTE_CASES}?jour=${simule}`;
        const reponse = await fetch(adresse, { cache: "no-store", signal: annulation.signal });
        if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
        setCalendrier(await reponse.json());
        setEnErreur(false);
      } catch {
        if (!annulation.signal.aborted) setEnErreur(true);
      }
    }
    charger();
    // La case suivante s'ouvre à minuit sans recharger la page.
    const minuteur = window.setInterval(charger, 60_000);
    return () => {
      annulation.abort();
      window.clearInterval(minuteur);
    };
  }, [simule]);

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

  function etat(numero: number): "verrouillee" | "aujourdhui" | "disponible" | "ouverte" {
    if (numero > jour) return "verrouillee";
    if (ouvertes.includes(numero)) return "ouverte";
    return numero === jour ? "aujourdhui" : "disponible";
  }

  function ouvrir(c: CaseAvent) {
    memoriserOuverte(c.jour, ouvertes);
    setChoisie(c);
  }

  return (
    <>
      {enErreur && (
        <p className="avent-erreur" role="alert">
          Le calendrier n&apos;a pas pu se charger. Vérifiez votre connexion : un nouvel essai a lieu dans une minute.
        </p>
      )}

      <ol className="avent-grille" aria-label="Les 24 cases du calendrier de l'Avent">
        {Array.from({ length: NOMBRE_CASES }, (_, i) => i + 1).map((numero) => {
          const e = etat(numero);
          const contenu = contenus.get(numero);
          return (
            <li key={numero}>
              <button
                type="button"
                className={`avent-case avent-case--v${numero % 4} is-${e}`}
                onClick={() => contenu && ouvrir(contenu)}
                disabled={!contenu}
                aria-label={
                  e === "verrouillee"
                    ? `Case du ${numero} décembre, pas encore disponible`
                    : e === "aujourdhui"
                      ? `Ouvrir la case du jour, le ${numero} décembre`
                      : `Ouvrir la case du ${numero} décembre`
                }
              >
                <span className="avent-case__ruban avent-case__ruban--v" aria-hidden="true" />
                <span className="avent-case__ruban avent-case__ruban--h" aria-hidden="true" />
                <span className="avent-case__numero">{numero}</span>
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

      {calendrier.simulationPossible && (
        <div className="avent-apercu">
          <label htmlFor="avent-apercu-jour">Aperçu (absent en production) : simuler la date</label>
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

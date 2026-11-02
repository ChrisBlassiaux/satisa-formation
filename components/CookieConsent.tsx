"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { ROUTES } from "@/lib/routes";

const GA_ID = "G-6XGM7TDKLQ";
const STORAGE_KEY = "satisa-cookie-consent";
const OPEN_EVENT = "satisa:open-cookie-settings";
// CNIL: a consent choice is valid for 6 months at most, then the visitor is asked again.
const CHOICE_LIFETIME_MS = 182 * 24 * 60 * 60 * 1000;

type Choice = "accepted" | "refused";

// The stored choice lives in localStorage, so it is read through an external store: the server render and
// hydration see SERVER_SNAPSHOT (no banner), then the client switches to the real value.
const SERVER_SNAPSHOT = "server";
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getStoredChoice(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseChoice(raw: string | null): Choice | null {
  if (!raw || raw === SERVER_SNAPSHOT) return null;
  try {
    const { choice, savedAt } = JSON.parse(raw) as { choice: Choice; savedAt: number };
    if (Date.now() - savedAt > CHOICE_LIFETIME_MS) return null;
    return choice === "accepted" || choice === "refused" ? choice : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, savedAt: Date.now() }));
  } catch {
    // Storage unavailable (private mode): the choice only lasts for this page view.
  }
  listeners.forEach((listener) => listener());
}

// Withdrawing consent must also remove the cookies Google Analytics already set.
function stopAnalytics(): void {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  const names = ["_ga", `_ga_${GA_ID.replace("G-", "")}`];
  const hosts = [window.location.hostname, `.${window.location.hostname.replace(/^www\./, "")}`];
  for (const name of names) {
    for (const host of hosts) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${host}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

const FOCUSABLE = "button:not([disabled]), a[href], input:not([disabled])";

export default function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getStoredChoice, () => SERVER_SNAPSHOT);
  const [reopened, setReopened] = useState(false);
  const [view, setView] = useState<"main" | "settings">("main");
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const choice = parseChoice(stored);
  const open = stored !== SERVER_SNAPSHOT && (choice === null || reopened);

  // The footer link reopens the dialog straight on the settings, with the current choice pre-selected.
  useEffect(() => {
    const reopen = () => {
      setAnalyticsOn(parseChoice(getStoredChoice()) === "accepted");
      setView("settings");
      setReopened(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = useCallback((next: Choice) => {
    saveChoice(next);
    setReopened(false);
    setView("main");
    if (next === "refused") stopAnalytics();
  }, []);

  // While the dialog is open: lock page scroll, keep keyboard focus inside it, and give focus back on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (event.key === "Escape" && parseChoice(getStoredChoice()) !== null) {
        setReopened(false);
        setView("main");
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <>
      {choice === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {open && (
        <div className="cookie-modal">
          <div
            ref={panelRef}
            className="cookie-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            tabIndex={-1}
          >
            {view === "main" ? (
              <>
                <h2 id="cookie-modal-title" className="cookie-modal__title">
                  Vos choix sur les cookies
                </h2>
                <p className="cookie-modal__text">
                  Nous utilisons des cookies de mesure d’audience (Google Analytics) pour savoir quelles pages vous
                  sont utiles et améliorer le site. Ils ne sont déposés qu’avec votre accord.{" "}
                  <Link href={ROUTES.privacy}>En savoir plus</Link>
                </p>
                <div className="cookie-modal__actions">
                  <button type="button" className="btn btn--dark" onClick={() => decide("accepted")}>
                    Accepter et fermer
                  </button>
                  <button type="button" className="btn btn--dark" onClick={() => decide("refused")}>
                    Refuser tout
                  </button>
                </div>
                <button
                  type="button"
                  className="cookie-modal__link"
                  onClick={() => {
                    setAnalyticsOn(choice === "accepted");
                    setView("settings");
                  }}
                >
                  Personnaliser
                </button>
              </>
            ) : (
              <>
                <h2 id="cookie-modal-title" className="cookie-modal__title">
                  Paramétrer les cookies
                </h2>
                <ul className="cookie-modal__options">
                  <li className="cookie-option">
                    <div>
                      <p className="cookie-option__name">Cookies nécessaires</p>
                      <p className="cookie-option__desc">Fonctionnement du site et prise de rendez-vous en ligne.</p>
                    </div>
                    <span className="cookie-option__always">Toujours actifs</span>
                  </li>
                  <li className="cookie-option">
                    <div>
                      <p className="cookie-option__name" id="cookie-audience-label">
                        Mesure d’audience
                      </p>
                      <p className="cookie-option__desc">
                        Pages vues, provenance des visiteurs, durée de visite (Google Analytics).
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      role="switch"
                      className="cookie-option__switch"
                      aria-labelledby="cookie-audience-label"
                      checked={analyticsOn}
                      onChange={(event) => setAnalyticsOn(event.target.checked)}
                    />
                  </li>
                </ul>
                <div className="cookie-modal__actions">
                  <button type="button" className="btn btn--dark" onClick={() => decide(analyticsOn ? "accepted" : "refused")}>
                    Enregistrer mon choix
                  </button>
                </div>
                <button type="button" className="cookie-modal__link" onClick={() => setView("main")}>
                  ← Retour
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="site-footer__link-button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Gérer les cookies
    </button>
  );
}

"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
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

export default function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getStoredChoice, () => SERVER_SNAPSHOT);
  const [reopened, setReopened] = useState(false);
  const choice = parseChoice(stored);
  const open = stored !== SERVER_SNAPSHOT && (choice === null || reopened);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = useCallback((next: Choice) => {
    saveChoice(next);
    setReopened(false);
    if (next === "refused") stopAnalytics();
  }, []);

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
        <div className="cookie-banner" role="dialog" aria-label="Cookies de mesure d’audience">
          <p className="cookie-banner__text">
            Autorisez-vous les cookies de mesure d’audience ?{" "}
            <Link href={ROUTES.privacy}>En savoir plus</Link>
          </p>
          <div className="cookie-banner__actions">
            <button type="button" className="btn btn--dark" onClick={() => decide("refused")}>
              Non
            </button>
            <button type="button" className="btn btn--dark" onClick={() => decide("accepted")}>
              Oui
            </button>
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

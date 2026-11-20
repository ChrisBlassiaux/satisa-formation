"use client";

import { useEffect, useRef } from "react";

const PAIR_BREAKPOINT = "(min-width: 768px)";

export default function OfferAccordion({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const headers = Array.from(
      container.querySelectorAll<HTMLButtonElement>(".offer-row__header")
    );

    function syncRowState(btn: HTMLButtonElement) {
      const row = btn.closest(".offer-row");
      if (row) {
        row.classList.toggle("is-open", btn.getAttribute("aria-expanded") === "true");
      }
    }

    function setExpanded(btn: HTMLButtonElement, expanding: boolean) {
      btn.setAttribute("aria-expanded", expanding ? "true" : "false");
      const bodyId = btn.getAttribute("aria-controls");
      const body = bodyId ? document.getElementById(bodyId) : null;
      if (body) body.hidden = !expanding;
      syncRowState(btn);
    }

    // Ouvre une formule (et sa voisine quand elles sont côte à côte, comme au clic).
    function expand(btn: HTMLButtonElement) {
      const pairsLinked = window.matchMedia(PAIR_BREAKPOINT).matches;
      const pairKey = btn.getAttribute("data-pair");
      if (pairKey && pairsLinked) {
        container!
          .querySelectorAll<HTMLButtonElement>(`.offer-row__header[data-pair="${pairKey}"]`)
          .forEach((member) => setExpanded(member, true));
        return;
      }
      if (pairKey) {
        // Empilées sur mobile : ouvrir l'une ferme sa voisine.
        container!
          .querySelectorAll<HTMLButtonElement>(`.offer-row__header[data-pair="${pairKey}"]`)
          .forEach((member) => {
            if (member !== btn) setExpanded(member, false);
          });
      }
      setExpanded(btn, true);
    }

    function handleClick(this: HTMLButtonElement) {
      const pairsLinked = window.matchMedia(PAIR_BREAKPOINT).matches;
      const pairKey = this.getAttribute("data-pair");
      const expanding = this.getAttribute("aria-expanded") !== "true";

      if (expanding) {
        expand(this);
        return;
      }
      if (pairKey && pairsLinked) {
        // Côte à côte : les deux formules de la paire se ferment ensemble.
        container!
          .querySelectorAll<HTMLButtonElement>(`.offer-row__header[data-pair="${pairKey}"]`)
          .forEach((member) => setExpanded(member, false));
        return;
      }
      setExpanded(this, false);
    }

    // Lien direct vers une formule (ex. …/depot-rncp#offre-diagnostic, depuis le test « RS ou RNCP ? ») :
    // la formule s'ouvre et la page s'y place.
    function openFromHash() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const row = document.getElementById(id);
      if (!row || !container!.contains(row) || !row.classList.contains("offer-row")) return;
      const header = row.querySelector<HTMLButtonElement>(".offer-row__header");
      if (!header) return;
      expand(header);
      row.scrollIntoView({ block: "start" });
    }

    // Below the breakpoint where paired offers sit side by side, they stack in a
    // single column: only the first row of each pair should start open so two
    // offers can't both be expanded at once on mobile.
    if (!window.matchMedia(PAIR_BREAKPOINT).matches) {
      const seenPairs = new Set<string>();
      headers.forEach((header) => {
        const pairKey = header.getAttribute("data-pair");
        if (!pairKey) return;
        if (seenPairs.has(pairKey)) {
          setExpanded(header, false);
        } else {
          seenPairs.add(pairKey);
        }
      });
    }

    headers.forEach((header) => {
      syncRowState(header);
      header.addEventListener("click", handleClick);
    });

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => {
      headers.forEach((header) => header.removeEventListener("click", handleClick));
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  return (
    <div className="offer-accordion" ref={containerRef}>
      {children}
    </div>
  );
}

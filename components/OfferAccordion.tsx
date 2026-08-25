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

    function handleClick(this: HTMLButtonElement) {
      const pairsLinked = window.matchMedia(PAIR_BREAKPOINT).matches;
      const pairKey = this.getAttribute("data-pair");
      const expanding = this.getAttribute("aria-expanded") !== "true";

      if (pairKey && pairsLinked) {
        // Side by side: both offers of the pair open and close together.
        const group = Array.from(
          container!.querySelectorAll<HTMLButtonElement>(
            `.offer-row__header[data-pair="${pairKey}"]`
          )
        );
        group.forEach((btn) => setExpanded(btn, expanding));
        return;
      }

      if (pairKey && !pairsLinked && expanding) {
        // Stacked on mobile: opening one closes its pair-mate so only one shows at a time.
        const siblings = Array.from(
          container!.querySelectorAll<HTMLButtonElement>(
            `.offer-row__header[data-pair="${pairKey}"]`
          )
        ).filter((btn) => btn !== this);
        siblings.forEach((btn) => setExpanded(btn, false));
      }

      setExpanded(this, expanding);
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

    return () => {
      headers.forEach((header) => header.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <div className="offer-accordion" ref={containerRef}>
      {children}
    </div>
  );
}

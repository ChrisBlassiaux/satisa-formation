"use client";

import { useEffect, useRef } from "react";

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

    function handleClick(this: HTMLButtonElement) {
      const pairKey = this.getAttribute("data-pair");
      const group = pairKey
        ? Array.from(
            container!.querySelectorAll<HTMLButtonElement>(
              `.offer-row__header[data-pair="${pairKey}"]`
            )
          )
        : [this];
      const expanding = this.getAttribute("aria-expanded") !== "true";

      group.forEach((btn) => {
        btn.setAttribute("aria-expanded", expanding ? "true" : "false");
        const bodyId = btn.getAttribute("aria-controls");
        const body = bodyId ? document.getElementById(bodyId) : null;
        if (body) body.hidden = !expanding;
        syncRowState(btn);
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

"use client";

import { useEffect } from "react";

// Ouvre la carte d'une offre quand l'adresse se termine par son ancre (ex. /nous-rejoindre#community-manager),
// pour que le lien partagé sur LinkedIn arrive directement sur l'offre dépliée.
export default function JobsDeepLink() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return null;
}

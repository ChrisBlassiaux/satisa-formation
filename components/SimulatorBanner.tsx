"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import LinkArrow from "@/components/LinkArrow";

// Le bandeau passe en version compacte dès que l'on défile, et reprend sa taille en haut de page.
// Deux seuils (hystérésis) : la hauteur change, le contenu en dessous bouge de quelques pixels,
// ce décalage ne doit pas refaire basculer le bandeau.
const COMPACT_ABOVE = 48;
const EXPAND_BELOW = 12;

export default function SimulatorBanner() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    // setState ne refait rien tant que la valeur ne change pas : pas besoin de limiter la fréquence.
    const update = () => {
      const y = window.scrollY;
      setCompact((current) => (current ? y > EXPAND_BELOW : y > COMPACT_ABOVE));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <aside className={`dg-banner${compact ? " dg-banner--compact" : ""}`} aria-label="Simulateur de prix">
      <div className="container dg-banner__inner">
        <p className="dg-banner__text">
          <svg className="dg-banner__sparkle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path className="dg-banner__sparkle-main" d="M10 4l1.9 5.1L17 11l-5.1 1.9L10 18l-1.9-5.1L3 11l5.1-1.9z" />
            <path className="dg-banner__sparkle-small" d="M18.5 2l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
            <path className="dg-banner__sparkle-tiny" d="M18 15l.6 1.6 1.6.6-1.6.6L18 19.4l-.6-1.6-1.6-.6 1.6-.6z" />
          </svg>
          <span className="dg-banner__short">Estimez votre prix en 1 minute</span>
          <span className="dg-banner__long">Combien coûte votre projet de digitalisation ? Estimez-le en 1 minute.</span>
        </p>
        <Link href={ROUTES.formationsSimulateur} className="btn btn--primary dg-banner__cta">
          Calculer mon tarif <LinkArrow />
        </Link>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LinkArrow from "@/components/LinkArrow";

// Bandeau collé sous l'en-tête, avec un texte et un bouton vers un outil gratuit.
// Il passe en version compacte dès que l'on défile, et reprend sa taille en haut de page.
// Deux seuils (hystérésis) : la hauteur change, le contenu en dessous bouge de quelques pixels,
// ce décalage ne doit pas refaire basculer le bandeau.
const COMPACT_ABOVE = 48;
const EXPAND_BELOW = 12;

type PromoBannerProps = {
  /** Nom du bandeau pour les lecteurs d'écran. */
  label: string;
  /** Texte court (mobile). */
  shortText: React.ReactNode;
  /** Texte complet (tablette et ordinateur). */
  longText: React.ReactNode;
  /** Texte du bouton. */
  cta: React.ReactNode;
  href: string;
  /**
   * « sombre » : fond bleu nuit (simulateur de prix). « ciel » : fond bleu ciel clair (test RS ou RNCP).
   * « avent » : bleu nuit et or (calendrier de l'Avent).
   */
  variant?: "sombre" | "ciel" | "avent";
  /** Remplace les étoiles affichées devant le texte. */
  icon?: React.ReactNode;
};

export default function PromoBanner({
  label,
  shortText,
  longText,
  cta,
  href,
  variant = "sombre",
  icon,
}: PromoBannerProps) {
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

  const classes = ["dg-banner", variant !== "sombre" ? `dg-banner--${variant}` : "", compact ? "dg-banner--compact" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={classes} aria-label={label}>
      <div className="container dg-banner__inner">
        <p className="dg-banner__text">
          {icon ?? (
            <svg className="dg-banner__sparkle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path className="dg-banner__sparkle-main" d="M10 4l1.9 5.1L17 11l-5.1 1.9L10 18l-1.9-5.1L3 11l5.1-1.9z" />
              <path className="dg-banner__sparkle-small" d="M18.5 2l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
              <path className="dg-banner__sparkle-tiny" d="M18 15l.6 1.6 1.6.6-1.6.6L18 19.4l-.6-1.6-1.6-.6 1.6-.6z" />
            </svg>
          )}
          <span className="dg-banner__short">{shortText}</span>
          <span className="dg-banner__long">{longText}</span>
        </p>
        <Link href={href} className={`btn ${variant === "ciel" ? "btn--dark" : "btn--primary"} dg-banner__cta`}>
          {cta} <LinkArrow />
        </Link>
      </div>
    </aside>
  );
}

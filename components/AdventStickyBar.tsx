"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/routes";
import { Cadeau } from "@/components/AdventDecor";

// Version compacte du bandeau du calendrier : elle se colle sous le menu quand le grand bandeau sort de l'écran.
// La croix la ferme pour la visite en cours.
const STORAGE_KEY = "satisa-avent-barre-fermee";

// Le stockage peut être indisponible (navigation privée, cookies bloqués) : la barre reste alors affichée.
function wasClosed() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function AdventStickyBar({ bannerId }: { bannerId: string }) {
  const [placement, setPlacement] = useState({ visible: false, top: 0 });
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const banner = document.getElementById(bannerId);
    if (!banner || closed || wasClosed()) return;
    // Bloc du menu fermé : le menu mobile ouvert passe par-dessus la barre.
    const header = document.querySelector<HTMLElement>(".site-header__inner");
    let observer: IntersectionObserver | undefined;

    const observe = () => {
      observer?.disconnect();
      const top = header?.offsetHeight ?? 0;
      observer = new IntersectionObserver(([entry]) => setPlacement({ visible: !entry.isIntersecting, top }), {
        rootMargin: `-${top}px 0px 0px 0px`,
      });
      observer.observe(banner);
    };

    observe();
    // La hauteur du menu change avec la largeur de l'écran et au chargement du logo.
    const resize = new ResizeObserver(observe);
    if (header) resize.observe(header);
    return () => {
      resize.disconnect();
      observer?.disconnect();
    };
  }, [bannerId, closed]);

  if (closed) return null;

  function close() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Sans stockage, la fermeture vaut jusqu'au prochain chargement de la page.
    }
    setClosed(true);
  }

  return (
    <aside
      className={placement.visible ? "avent-barre is-visible" : "avent-barre"}
      style={{ top: placement.top }}
      aria-label="Calendrier de l'Avent"
    >
      <div className="container avent-barre__contenu">
        <Cadeau className="avent-barre__cadeau" />
        <p className="avent-barre__texte">
          <span className="avent-barre__etiquette">Calendrier de l&apos;Avent</span>
          <span className="avent-barre__titre">
            <span className="avent-barre__long">Préparez votre enregistrement </span>
            <span className="avent-barre__court">Enregistrement </span>
            RNCP/RS
          </span>
        </p>
        <Link href={ROUTES.advent} className="avent-bandeau__bouton avent-barre__bouton">
          <span>
            Ouvrir<span className="avent-barre__long"> le calendrier</span>
          </span>
        </Link>
        <button type="button" className="avent-barre__fermer" onClick={close} aria-label="Fermer le bandeau du calendrier">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

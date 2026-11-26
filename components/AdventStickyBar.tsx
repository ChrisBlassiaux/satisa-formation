"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/routes";
import { Cadeau } from "@/components/AdventDecor";

// Cette version compacte prend le relais du grand bandeau sous le menu. Sur mobile, dès que l'on défile. Sur écran
// plus large, le grand bandeau suit le défilement tant que le hero est à l'écran, jusqu'à ce que la fin du hero le
// rattrape.
const MOBILE_QUERY = "(max-width: 767px)";
const MOBILE_COMPACT_ABOVE = 48;

export default function AdventStickyBar({ bannerId }: { bannerId: string }) {
  const [placement, setPlacement] = useState({ visible: false, top: 0 });

  useEffect(() => {
    const zone = document.getElementById(bannerId)?.parentElement;
    const hero = zone?.parentElement;
    if (!zone || !hero) return;
    // Bloc du menu fermé : le menu mobile ouvert passe par-dessus les bandeaux.
    const header = document.querySelector<HTMLElement>(".site-header__inner");
    const mobile = window.matchMedia(MOBILE_QUERY);
    let observer: IntersectionObserver | undefined;
    let top = 0;

    const show = (visible: boolean) => {
      setPlacement((current) =>
        current.visible === visible && current.top === top ? current : { visible, top },
      );
      zone.classList.toggle("is-compact", visible);
    };
    const onScroll = () => show(window.scrollY > MOBILE_COMPACT_ABOVE);

    const observe = () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      top = header?.offsetHeight ?? 0;
      zone.style.setProperty("--avent-header", `${top}px`);
      if (mobile.matches) {
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return;
      }
      // Moment où la fin du hero commence à pousser le grand bandeau : sa position collée, sa hauteur et la marge
      // basse du hero.
      const line = Math.ceil(
        parseFloat(getComputedStyle(zone).top) + zone.offsetHeight + parseFloat(getComputedStyle(hero).paddingBottom),
      );
      observer = new IntersectionObserver(([entry]) => show(!entry.isIntersecting), {
        rootMargin: `-${line}px 0px 0px 0px`,
      });
      observer.observe(hero);
    };

    observe();
    // Les hauteurs changent avec la largeur de l'écran et au chargement du logo.
    const resize = new ResizeObserver(observe);
    resize.observe(zone);
    if (header) resize.observe(header);
    return () => {
      resize.disconnect();
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      zone.classList.remove("is-compact");
    };
  }, [bannerId]);

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
      </div>
    </aside>
  );
}

import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Etoile, Etoiles, Neige } from "@/components/AdventDecor";

// Bandeau de Noël de la page d'accueil : guirlande, neige, étoiles qui scintillent et un bouton vers le calendrier.
// Texte provisoire, à valider. À retirer (avec la page du calendrier) une fois l'opération terminée.
const AMPOULES = 28;

export default function AdventBanner() {
  return (
    <section className="avent-bandeau" aria-label="Calendrier de l'Avent">
      <div className="avent-guirlande" aria-hidden="true">
        {Array.from({ length: AMPOULES }, (_, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <Neige nombre={22} />
      <Etoiles nombre={12} />
      <div className="container avent-bandeau__contenu">
        <div className="avent-bandeau__cadeau" aria-hidden="true">
          <svg viewBox="0 0 64 64" focusable="false">
            <rect x="8" y="26" width="48" height="32" rx="4" fill="#97e1dc" />
            <rect x="4" y="18" width="56" height="12" rx="4" fill="#d4f3f0" />
            <rect x="28" y="18" width="8" height="40" fill="#fecc01" />
            <path d="M32 18c-6-12-20-10-18-3 2 6 12 4 18 3Zm0 0c6-12 20-10 18-3-2 6-12 4-18 3Z" fill="#fecc01" />
          </svg>
        </div>
        <div className="avent-bandeau__texte">
          <p className="avent-bandeau__etiquette">
            <Etoile className="avent-bandeau__mini-etoile" /> Calendrier de l&apos;Avent
          </p>
          <p className="avent-bandeau__titre">Une surprise chaque jour, du 1er au 24 décembre</p>
        </div>
        <Link href={ROUTES.advent} className="avent-bandeau__bouton">
          <span>Ouvrir le calendrier</span>
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import AdventStickyBar from "@/components/AdventStickyBar";
import { Cadeau, Etoile, Etoiles, Neige } from "@/components/AdventDecor";

// Bandeau de Noël posé sur le haut du hero de la page d'accueil : guirlande, neige, étoiles qui scintillent et un
// bouton vers le calendrier. Texte provisoire, à valider. À retirer (avec la page du calendrier) après l'opération.
const AMPOULES = 28;

export default function AdventBanner() {
  return (
    <>
      <div className="container avent-bandeau-zone">
        <section id="avent-bandeau" className="avent-bandeau" aria-label="Calendrier de l'Avent">
          <div className="avent-guirlande" aria-hidden="true">
            {Array.from({ length: AMPOULES }, (_, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <Neige nombre={22} />
          <Etoiles nombre={12} />
          <div className="avent-bandeau__contenu">
            <Cadeau className="avent-bandeau__cadeau" />
            <div className="avent-bandeau__texte">
              <p className="avent-bandeau__etiquette">
                <Etoile className="avent-bandeau__mini-etoile" /> Calendrier de l&apos;Avent
              </p>
              <p className="avent-bandeau__titre">Préparez votre enregistrement RNCP/RS</p>
              <p className="avent-bandeau__sous-titre">Une surprise chaque jour, du 1er au 24 décembre</p>
            </div>
            <Link href={ROUTES.advent} className="avent-bandeau__bouton">
              <span>Ouvrir le calendrier</span>
            </Link>
          </div>
        </section>
      </div>
      <AdventStickyBar bannerId="avent-bandeau" />
    </>
  );
}

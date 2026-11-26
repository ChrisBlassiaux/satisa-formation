import type { Metadata } from "next";
import AdventCalendar from "@/components/AdventCalendar";
import { Etoiles, Neige } from "@/components/AdventDecor";
import Breadcrumb from "@/components/Breadcrumb";

// Page temporaire : ni indexée par Google, ni dans le plan du site, ni dans le menu. À retirer après l'opération.
export const metadata: Metadata = {
  title: "Calendrier de l'Avent",
  description: "Une surprise chaque jour du 1er au 24 décembre : conseils d'experts, outils et modèles offerts par Satisa Formation.",
  robots: { index: false, follow: false },
};

export default function AdventPage() {
  return (
    <section className="avent-page">
      <Breadcrumb tone="light" />
      <Neige nombre={40} />
      <Etoiles nombre={26} />
      <div className="container avent-page__contenu">
        <header className="avent-page__tete">
          <p className="avent-page__etiquette">Calendrier de l&apos;Avent</p>
          <h1>Une surprise chaque jour, jusqu&apos;à Noël</h1>
          <p className="avent-page__intro">
            Du 1er au 24 décembre, une nouvelle case s&apos;ouvre chaque jour : conseils d&apos;experts, outils et modèles
            offerts par Satisa Formation.
          </p>
        </header>
        <AdventCalendar />
      </div>
    </section>
  );
}

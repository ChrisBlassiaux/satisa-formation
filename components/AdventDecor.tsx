import type { CSSProperties } from "react";

// Décor de Noël partagé par le bandeau de l'accueil et la page du calendrier : neige et étoiles qui scintillent.
// Tout est calculé à partir de l'indice (jamais au hasard) : le rendu est identique côté serveur et navigateur.
// Les animations sont coupées pour les personnes qui demandent moins de mouvement (voir styles/_avent.scss).

export function Etoile({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 0 14.6 9.4 24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6Z" fill="currentColor" />
    </svg>
  );
}

export function Cadeau({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="8" y="26" width="48" height="32" rx="4" fill="#97e1dc" />
      <rect x="4" y="18" width="56" height="12" rx="4" fill="#d4f3f0" />
      <rect x="28" y="18" width="8" height="40" fill="#fecc01" />
      <path d="M32 18c-6-12-20-10-18-3 2 6 12 4 18 3Zm0 0c6-12 20-10 18-3-2 6-12 4-18 3Z" fill="#fecc01" />
    </svg>
  );
}

export function Neige({ nombre = 28 }: { nombre?: number }) {
  return (
    <div className="avent-neige" aria-hidden="true">
      {Array.from({ length: nombre }, (_, i) => {
        const taille = 3 + ((i * 7) % 5);
        const style = {
          left: `${(i * 37) % 100}%`,
          width: `${taille}px`,
          height: `${taille}px`,
          animationDuration: `${9 + ((i * 13) % 9)}s`,
          animationDelay: `-${(i * 17) % 14}s`,
          "--derive": `${((i * 11) % 40) - 20}px`,
        } as CSSProperties;
        return <span key={i} style={style} />;
      })}
    </div>
  );
}

export function Etoiles({ nombre = 14 }: { nombre?: number }) {
  return (
    <div className="avent-etoiles" aria-hidden="true">
      {Array.from({ length: nombre }, (_, i) => {
        const taille = 8 + ((i * 5) % 14);
        const style = {
          left: `${(i * 53 + 7) % 96}%`,
          top: `${(i * 29 + 11) % 86}%`,
          width: `${taille}px`,
          height: `${taille}px`,
          animationDelay: `${((i * 7) % 20) / 10}s`,
          animationDuration: `${2.2 + ((i * 3) % 5) / 2}s`,
        } satisfies CSSProperties;
        return <Etoile key={i} className="avent-etoile" style={style} />;
      })}
    </div>
  );
}

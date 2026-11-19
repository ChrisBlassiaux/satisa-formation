import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export type Tool = {
  tag: string;
  title: string;
  text: string;
  /** Version courte du texte, pour les cartes compactes de la page d'accueil (mêmes mots que les bandeaux du site). */
  short: string;
  meta: string;
  href: string;
  image: string;
  imageAlt: string;
  /** Fond du cadre de l'aperçu : « dark » pour une image sur fond sombre, « mint » (menthe de la charte) pour une image détourée. */
  tone: "dark" | "mint";
};

// Les outils de la boîte à outils, partagés par la page des outils et la page d'accueil.
export const TOOLS: Tool[] = [
  {
    tag: "Simulateur",
    title: "Calculateur de coût e-learning",
    text: "Calculez gratuitement le prix de votre formation e-learning ou blended : recevez votre tarif en 1 minute, sans inscription ni engagement.",
    short: "Combien coûte votre projet de digitalisation ? Estimez-le en 1 minute.",
    meta: "Gratuit · 1 minute",
    href: ROUTES.formationsSimulateur,
    image: "/images/simulateur/apercu-simulateur-v4.webp",
    imageAlt: "Aperçu du calculateur de coût e-learning : une formule recommandée et son tarif",
    tone: "dark",
  },
  {
    tag: "Test",
    title: "Test RS ou RNCP",
    text: "Votre certification doit-elle viser le RS ou le RNCP ? Répondez à 10 questions : verdict en 2 minutes, gratuit, sans inscription.",
    short: "RNCP ou RS : quelle certification pour votre organisme ? Faites le test en 2 minutes.",
    meta: "Gratuit · 2 minutes",
    href: ROUTES.certificationRsOuRncp,
    image: "/images/simulateur/apercu-test-rs-rncp-v1.webp",
    imageAlt: "Aperçu du test RS ou RNCP : une question du test et un exemple de verdict",
    tone: "mint",
  },
];

type ToolCardProps = {
  tool: Tool;
  /** Classe du bouton : « btn--dark » sur la page des outils, « btn--primary » sur la page d'accueil. */
  buttonClass?: string;
  /** Tailles d'affichage de l'image pour le chargement adapté. */
  sizes?: string;
};

export default function ToolCard({
  tool,
  buttonClass = "btn--dark",
  sizes = "(min-width: 1080px) 380px, (min-width: 768px) 45vw, 100vw",
}: ToolCardProps) {
  return (
    <article className="tb-card">
      <div className={`tb-card__media tb-card__media--${tool.tone}`}>
        <Image src={tool.image} alt={tool.imageAlt} fill quality={90} sizes={sizes} />
      </div>
      <div className="tb-card__body">
        <span className="tb-card__tag">{tool.tag}</span>
        <h3 className="tb-card__title">{tool.title}</h3>
        <p className="tb-card__text">{tool.text}</p>
        <p className="tb-card__meta">{tool.meta}</p>
        <Link href={tool.href} className={`btn ${buttonClass} tb-card__cta`}>
          Utiliser l&apos;outil
        </Link>
      </div>
    </article>
  );
}

// Flèche simple (trait et chevron), centrée dans le rond de la carte.
function GoArrow() {
  return (
    <svg
      className="tb-card__arrow"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

// Carte compacte et entièrement cliquable (page d'accueil) : pas de bouton, une petite flèche ronde dans le pied.
export function ToolCardLink({ tool }: { tool: Tool }) {
  return (
    <Link href={tool.href} className="tb-card tb-card--link">
      <div className={`tb-card__media tb-card__media--${tool.tone}`}>
        <Image
          src={tool.image}
          alt={tool.imageAlt}
          fill
          quality={90}
          sizes="(min-width: 1200px) 360px, (min-width: 768px) 45vw, 100vw"
        />
      </div>
      <div className="tb-card__body">
        <span className="tb-card__tag">{tool.tag}</span>
        <h3 className="tb-card__title">{tool.title}</h3>
        <p className="tb-card__text">{tool.short}</p>
        <div className="tb-card__foot">
          <span className="tb-card__meta">{tool.meta}</span>
          <span className="tb-card__go" aria-hidden="true">
            <GoArrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Troisième carte : l'appel à voir toute la boîte à outils.
export function ToolsMoreCard() {
  return (
    <Link href={ROUTES.tools} className="tb-card tb-card--link tb-card--more">
      <div className="tb-card__body">
        <span className="tb-card__tag">Tous les outils</span>
        <h3 className="tb-card__title">Voir tous nos outils</h3>
        <p className="tb-card__text">
          Quelques minutes suffisent pour estimer un budget ou choisir le bon répertoire. Sans inscription.
        </p>
        <div className="tb-card__foot">
          <span className="tb-card__meta">Boîte à outils</span>
          <span className="tb-card__go" aria-hidden="true">
            <GoArrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

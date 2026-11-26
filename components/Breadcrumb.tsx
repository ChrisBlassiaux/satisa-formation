"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { frenchText } from "@/lib/typography";

// Fil d'Ariane visible, placé en haut du hero de chaque page (sauf l'accueil), dans le fond du hero.
// Le parcours de chaque page est déclaré ici, à un seul endroit. Les libellés reprennent ceux du menu.
// Les données structurées (BreadcrumbList) restent déclarées page par page : ce composant n'en ajoute pas.
// Les articles du blog (titre variable) utilisent BreadcrumbNav avec leur propre parcours.
// tone="light" : texte clair, pour les héros à fond sombre.

export type BreadcrumbStep = { name: string; path: string };

const CERTIFICATION: BreadcrumbStep = { name: "Certification RNCP/RS", path: ROUTES.certification };
const FORMATIONS: BreadcrumbStep = { name: "Formations et digital", path: ROUTES.formations };
// Les outils découlent de la boîte à outils, même quand leur adresse est rangée sous une autre rubrique.
const TOOLS: BreadcrumbStep = { name: "Boîte à outils", path: ROUTES.tools };

const TRAILS: Record<string, BreadcrumbStep[]> = {
  [ROUTES.certification]: [CERTIFICATION],
  [ROUTES.certificationRncp]: [CERTIFICATION, { name: "Dépôt RNCP", path: ROUTES.certificationRncp }],
  [ROUTES.certificationRs]: [CERTIFICATION, { name: "Dépôt RS", path: ROUTES.certificationRs }],
  [ROUTES.certificationRsOuRncp]: [TOOLS, { name: "Test RS ou RNCP", path: ROUTES.certificationRsOuRncp }],
  [ROUTES.formations]: [FORMATIONS],
  [ROUTES.formationsConception]: [FORMATIONS, { name: "Conception pédagogique", path: ROUTES.formationsConception }],
  [ROUTES.formationsDigitalisation]: [FORMATIONS, { name: "Digitalisation", path: ROUTES.formationsDigitalisation }],
  [ROUTES.formationsSimulateur]: [TOOLS, { name: "Simulateur de prix e-learning", path: ROUTES.formationsSimulateur }],
  [ROUTES.tools]: [TOOLS],
  [ROUTES.advent]: [{ name: "Calendrier de l'Avent", path: ROUTES.advent }],
  [ROUTES.blog]: [{ name: "Blog", path: ROUTES.blog }],
  [ROUTES.about]: [{ name: "À propos", path: ROUTES.about }],
  [ROUTES.jobs]: [{ name: "Nous rejoindre", path: ROUTES.jobs }],
  [ROUTES.contact]: [{ name: "Prendre rendez-vous", path: ROUTES.contact }],
  [ROUTES.legalMentions]: [{ name: "Mentions légales", path: ROUTES.legalMentions }],
  [ROUTES.cgv]: [{ name: "Conditions générales de vente", path: ROUTES.cgv }],
  [ROUTES.privacy]: [{ name: "Politique de confidentialité", path: ROUTES.privacy }],
};

const LEGAL_PATHS: string[] = [ROUTES.legalMentions, ROUTES.cgv, ROUTES.privacy];

// Affichage seul : la dernière étape est la page courante (non cliquable).
// narrow : classe de largeur du bloc de texte de la page (pages légales, articles), pour aligner le fil sur le titre.
export function BreadcrumbNav({
  trail,
  tone = "dark",
  narrow,
}: {
  trail: BreadcrumbStep[];
  tone?: "dark" | "light";
  narrow?: "legal-content" | "article-header";
}) {
  const steps = [{ name: "Accueil", path: ROUTES.home }, ...trail];
  return (
    <nav className={`breadcrumb${tone === "light" ? " breadcrumb--light" : ""}`} aria-label="Fil d'Ariane">
      <div className={narrow ? `container ${narrow}` : "container"}>
        <ol className="breadcrumb__list">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li key={step.path} className="breadcrumb__item">
                {isLast ? (
                  <span aria-current="page">{frenchText(step.name)}</span>
                ) : (
                  <Link href={step.path}>{step.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default function Breadcrumb({ tone }: { tone?: "dark" | "light" }) {
  const pathname = usePathname();
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const trail = TRAILS[clean];
  if (!trail) return null;
  const narrow = LEGAL_PATHS.includes(clean) ? "legal-content" : undefined;
  return <BreadcrumbNav trail={trail} tone={tone} narrow={narrow} />;
}

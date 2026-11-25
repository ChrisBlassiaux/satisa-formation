"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";

// Fil d'Ariane visible, affiché sous l'en-tête sur toutes les pages sauf l'accueil.
// Le parcours de chaque page est déclaré ici, à un seul endroit. Les libellés reprennent ceux du menu.
// Les données structurées (BreadcrumbList) restent déclarées page par page : ce composant n'en ajoute pas.
// Les articles du blog (titre variable) utilisent BreadcrumbNav directement depuis leur page.

export type BreadcrumbStep = { name: string; path: string };

const CERTIFICATION: BreadcrumbStep = { name: "Certification RNCP/RS", path: ROUTES.certification };
const FORMATIONS: BreadcrumbStep = { name: "Formations et digital", path: ROUTES.formations };

const TRAILS: Record<string, BreadcrumbStep[]> = {
  [ROUTES.certification]: [CERTIFICATION],
  [ROUTES.certificationRncp]: [CERTIFICATION, { name: "Dépôt RNCP", path: ROUTES.certificationRncp }],
  [ROUTES.certificationRs]: [CERTIFICATION, { name: "Dépôt RS", path: ROUTES.certificationRs }],
  [ROUTES.certificationRsOuRncp]: [CERTIFICATION, { name: "Test RS ou RNCP", path: ROUTES.certificationRsOuRncp }],
  [ROUTES.formations]: [FORMATIONS],
  [ROUTES.formationsConception]: [FORMATIONS, { name: "Conception pédagogique", path: ROUTES.formationsConception }],
  [ROUTES.formationsDigitalisation]: [FORMATIONS, { name: "Digitalisation", path: ROUTES.formationsDigitalisation }],
  [ROUTES.formationsSimulateur]: [FORMATIONS, { name: "Simulateur de prix e-learning", path: ROUTES.formationsSimulateur }],
  [ROUTES.tools]: [{ name: "Boîte à outils", path: ROUTES.tools }],
  [ROUTES.advent]: [{ name: "Calendrier de l'Avent", path: ROUTES.advent }],
  [ROUTES.blog]: [{ name: "Blog", path: ROUTES.blog }],
  [ROUTES.about]: [{ name: "À propos", path: ROUTES.about }],
  [ROUTES.contact]: [{ name: "Prendre rendez-vous", path: ROUTES.contact }],
  [ROUTES.legalMentions]: [{ name: "Mentions légales", path: ROUTES.legalMentions }],
  [ROUTES.cgv]: [{ name: "Conditions générales de vente", path: ROUTES.cgv }],
  [ROUTES.privacy]: [{ name: "Politique de confidentialité", path: ROUTES.privacy }],
};

// Affichage seul : la dernière étape est la page courante (non cliquable).
export function BreadcrumbNav({ trail }: { trail: BreadcrumbStep[] }) {
  const steps = [{ name: "Accueil", path: ROUTES.home }, ...trail];
  return (
    <nav className="breadcrumb" aria-label="Fil d'Ariane">
      <div className="container">
        <ol className="breadcrumb__list">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li key={step.path} className="breadcrumb__item">
                {isLast ? (
                  <span aria-current="page">{step.name}</span>
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

export default function Breadcrumb() {
  const pathname = usePathname();
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const trail = TRAILS[clean];
  if (!trail) return null;
  return <BreadcrumbNav trail={trail} />;
}

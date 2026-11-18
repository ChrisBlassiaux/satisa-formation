// Formulaire « Prendre contact » : types de projet et formules, partagés entre le formulaire et l'e-mail envoyé.
// Les numéros suivent l'ordre des offres du site : 01 à 05 pour le dépôt RNCP et le dépôt RS (mêmes offres),
// 06 et 07 pour la conception pédagogique, 08 à 10 pour la digitalisation.

export type FormulaOption = { value: string; label: string };

export const PROJECT_TYPES: FormulaOption[] = [
  { value: "rncp", label: "Dépôt RNCP" },
  { value: "rs", label: "Dépôt RS" },
  { value: "conception", label: "Conception pédagogique" },
  { value: "digitalisation", label: "Digitalisation" },
];

export const PROJECT_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  PROJECT_TYPES.map((type) => [type.value, type.label]),
);

const OTHER: FormulaOption = { value: "autre", label: "Autres" };

const CERTIFICATION_FORMULAS: FormulaOption[] = [
  { value: "01", label: "01 - Diagnostic de faisabilité" },
  { value: "02", label: "02 - Certification guidée" },
  { value: "03", label: "03 - Certification pilotée" },
  { value: "04", label: "04 - Ingénieur de certification intégré" },
  { value: "05", label: "05 - Responsable de certification externalisé" },
  OTHER,
];

export const FORMULA_OPTIONS: Record<string, FormulaOption[]> = {
  rncp: CERTIFICATION_FORMULAS,
  rs: CERTIFICATION_FORMULAS,
  conception: [
    { value: "06", label: "06 - Conception de formation" },
    { value: "07", label: "07 - Création de contenus de formation" },
    OTHER,
  ],
  digitalisation: [
    { value: "08", label: "08 - Essentielle" },
    { value: "09", label: "09 - Co-construite" },
    { value: "10", label: "10 - Complète" },
    OTHER,
  ],
};

export function formulaLabel(projectType: string, value: string): string | undefined {
  return FORMULA_OPTIONS[projectType]?.find((option) => option.value === value)?.label;
}

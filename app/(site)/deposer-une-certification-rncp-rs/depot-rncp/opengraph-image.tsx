import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Accompagnement au dépôt RNCP - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Accompagnement au dépôt RNCP",
    "Diagnostic, référentiel, cohorte pilote, dépôt du dossier auprès de France Compétences."
  );
}

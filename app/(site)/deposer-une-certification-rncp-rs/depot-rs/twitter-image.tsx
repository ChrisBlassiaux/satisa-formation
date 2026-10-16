import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Accompagnement au dépôt RS - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Accompagnement au dépôt RS",
    "Diagnostic, référentiel ciblé, promotion de titulaires, dépôt du dossier auprès de France Compétences."
  );
}

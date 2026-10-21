import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Digitalisation de formation : e-learning et LMS - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Digitalisation de formation",
    "E-learning, blended learning et intégration LMS (Moodle, Digiforma, Teachizy, 360Learning)."
  );
}

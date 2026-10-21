import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Politique de confidentialité - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Politique de confidentialité",
    "Données collectées, cookies, durée de conservation et exercice de vos droits."
  );
}

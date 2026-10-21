import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Conditions générales de vente - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Conditions générales de vente",
    "Prestations, devis, prix, paiement, responsabilité et protection des données."
  );
}

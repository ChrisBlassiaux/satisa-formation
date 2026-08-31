import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Satisa Formation - Certification RNCP/RS et ingénierie pédagogique digitale";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Certification RNCP/RS et ingénierie pédagogique",
    "Référentiel, dépôt, conception et digitalisation de formation pour organismes de formation."
  );
}

import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Prendre un rendez-vous - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Prendre un rendez-vous",
    "Échangeons sur votre projet de certification RNCP/RS ou de formation."
  );
}
